// Gestão de usuários, clientes (companies) e settings — SERVER-SIDE (autenticado).
// A empresa e o papel vêm do doc users/{uid}; o cliente não escolhe de quem é o dado.
import { getAuth } from 'firebase-admin/auth';
import { Timestamp } from 'firebase-admin/firestore';
import { getDoc, getAll, db } from './firebase.js';
import { loadUser } from './currentUser.js';
import { getPricing, computeTotal, CANAIS as PRICE_CANAIS, ADICIONAIS as PRICE_ADICIONAIS } from './pricing.js';

const GRACA_DIAS = 7; // prazo pra assinar quando o admin atribui plano a um cliente existente

const getUser = loadUser;
function assertAdmin(user: any) {
  if (user.role !== 'admin') throw new Error('forbidden');
}

// ─── COMPANIES (admin) ───────────────────────────────────────────────────────

// Cria (com dono) ou atualiza um cliente. Admin apenas.
export async function saveCompany(uid: string, payload: { id?: string; data: any; owner?: { email: string; password: string } }): Promise<{ id: string }> {
  const user = await getUser(uid);
  assertAdmin(user);
  const data = payload.data || {};
  const stores = Array.isArray(data.stores) ? data.stores : [];
  if (stores.length === 0) throw new Error('stores_obrigatorio');

  if (payload.id) {
    const patch: any = {
      name: data.name,
      stores,
      limite_instancias: data.limite_instancias || 1,
      modulos_ativos: data.modulos_ativos || ['atendimento'],
    };
    if (typeof data.isento === 'boolean') patch.isento = data.isento;

    // Admin atribuindo um plano ao cliente: define o tier (teto de lojas + módulos)
    // e dá um prazo de graça pra assinar antes da parede — a menos que já esteja ativo.
    if (data.planId) {
      const plano = await getDoc('planos', data.planId);
      if (!plano) throw new Error('plano_invalido');
      const company = await getDoc('companies', payload.id);
      const jaAtivo = company?.assinatura?.status === 'authorized';
      patch.limite_lojas = plano.maxLojas || 1;
      if (Array.isArray(plano.modulos) && plano.modulos.length) patch.modulos_ativos = plano.modulos;
      patch.assinatura = {
        ...(company?.assinatura || {}),
        planId: data.planId, planoNome: plano.nome, valor: plano.valor, maxLojas: plano.maxLojas || 1,
        status: jaAtivo ? 'authorized' : 'pending',
        trialAte: jaAtivo ? (company?.assinatura?.trialAte || null) : Timestamp.fromMillis(Date.now() + GRACA_DIAS * 86400000),
        atualizadoEm: Timestamp.now(),
      };
    }

    await db.collection('companies').doc(payload.id).update(patch);
    return { id: payload.id };
  }

  // Criação: cria o usuário dono no Firebase Auth
  if (!payload.owner?.email || !payload.owner?.password) throw new Error('owner_obrigatorio');
  const owner = await getAuth().createUser({ email: payload.owner.email, password: payload.owner.password });
  const ref = await db.collection('companies').add({
    name: data.name,
    stores,
    limite_instancias: data.limite_instancias || 1,
    status: 'active',
    ownerId: owner.uid,
    modulos_ativos: data.modulos_ativos || ['atendimento'],
    metrics: { totalMessages: 0, totalPayments: 0 },
  });
  await db.collection('users').doc(owner.uid).set({ uid: owner.uid, email: payload.owner.email, role: 'owner', companyId: ref.id });
  return { id: ref.id };
}

// ─── FERRAMENTAS (hub) — o dono liga/desliga módulos na própria empresa ───────
// Auto-serviço. Dois tipos: CANAIS ("como você vende") são mutuamente exclusivos
// — só um por conta; CAMADAS (IA, campanhas) somam livremente.
const TOOLS = new Set(['venda_catalogo', 'vitrine', 'atendimento', 'agendamento', 'disparo', 'ecommerce', 'farmaqui', 'crm']);
// Páginas que um colaborador pode receber acesso (validação das permissões).
const PAGE_KEYS = new Set(['orders', 'products', 'categories', 'combos', 'catalog-settings', 'leads', 'crm', 'campaigns', 'farmaqui', 'ecommerce', 'schedule', 'business', 'instances']);
const sanitizePermissions = (v: any): string[] => (Array.isArray(v) ? v : []).map((k) => String(k)).filter((k) => PAGE_KEYS.has(k));
const CANAIS = new Set(['venda_catalogo', 'vitrine', 'agendamento', 'ecommerce', 'farmaqui']);
export async function toggleTool(uid: string, toolKey: string, active: boolean): Promise<{ modulos: string[]; valor?: number }> {
  const user = await getUser(uid);
  if (user.role !== 'owner' && user.role !== 'admin') throw new Error('forbidden');
  const companyId = user.companyId;
  if (!companyId) throw new Error('no_company');
  if (!TOOLS.has(toolKey)) throw new Error('ferramenta_invalida');

  const company = await getDoc('companies', companyId);
  let mods: string[] = Array.isArray(company?.modulos_ativos) ? [...company.modulos_ativos] : [];
  if (active) {
    // Ativar um canal desativa os outros canais (escolha um).
    if (CANAIS.has(toolKey)) mods = mods.filter((m) => !CANAIS.has(m));
    if (!mods.includes(toolKey)) mods.push(toolKey);
  } else {
    mods = mods.filter((m) => m !== toolKey);
  }
  // À la carte: as funcionalidades ativas definem a assinatura. Recalcula o total.
  const valid = new Set([...PRICE_CANAIS, ...PRICE_ADICIONAIS]);
  const features = mods.filter((m) => valid.has(m));
  const { total } = computeTotal(features, await getPricing());
  const assinatura = { ...((company as any)?.assinatura || {}), features, valor: total, atualizadoEm: Timestamp.now() };
  await db.collection('companies').doc(companyId).update({ modulos_ativos: mods, assinatura });
  return { modulos: mods, valor: total };
}

export async function toggleCompanyStatus(uid: string, id: string, status: string): Promise<{ ok: boolean }> {
  const user = await getUser(uid);
  assertAdmin(user);
  if (status !== 'active' && status !== 'inactive') throw new Error('status_invalido');
  await db.collection('companies').doc(id).update({ status });
  return { ok: true };
}

// Atualiza o array de lojas da empresa (toggles de ativo/frete). Dono só na própria.
export async function setCompanyStores(uid: string, companyId: string | undefined, stores: any[]): Promise<{ ok: boolean }> {
  const user = await getUser(uid);
  const targetId = user.role === 'admin' && companyId ? companyId : user.companyId;
  if (!targetId) throw new Error('no_company');
  if (!Array.isArray(stores)) throw new Error('stores_invalido');

  // Teto de lojas do plano (admin passa livre; dono é limitado).
  if (user.role !== 'admin') {
    const company = await getDoc('companies', targetId);
    const max = company?.assinatura?.maxLojas || company?.limite_lojas || 0;
    if (max && stores.length > max) throw new Error('limite_lojas_excedido');
  }

  // Colaborador só pode ligar/desligar o frete — não altera nome, endereço,
  // instância, nem cria/remove lojas. Valida contra o estado atual.
  if (user.role === 'employee') {
    const company = await getDoc('companies', targetId);
    const atuais: any[] = company?.stores || [];
    if (stores.length !== atuais.length) throw new Error('forbidden');
    for (const nova of stores) {
      const orig = atuais.find((s: any) => s.id === nova.id);
      if (!orig) throw new Error('forbidden');
      // Toda diferença permitida se resume ao campo frete_ativo.
      for (const k of new Set([...Object.keys(orig), ...Object.keys(nova)])) {
        if (k === 'frete_ativo') continue;
        if (JSON.stringify(orig[k]) !== JSON.stringify(nova[k])) throw new Error('forbidden');
      }
    }
  }

  await db.collection('companies').doc(targetId).update({ stores });
  return { ok: true };
}

// ─── REMOÇÃO DE LOJA (admin) ─────────────────────────────────────────────────
// Pedidos e leads NUNCA são apagados: o histórico da loja removida é preservado.

// Coleta o que será afetado pela remoção (usado no preview e na execução).
async function collectStoreImpact(companyId: string, storeId: string) {
  const [products, combos, configs, instances, orders] = await Promise.all([
    getAll('products', { field: 'companyId', operator: '==', value: companyId }),
    getAll('combos', { field: 'empresaId', operator: '==', value: companyId }),
    getAll('loja_config', { field: 'empresaId', operator: '==', value: companyId }),
    getAll('instancias', { field: 'empresaId', operator: '==', value: companyId }),
    getAll('pedidos', { field: 'empresaId', operator: '==', value: companyId }),
  ]);

  const belongs = (p: any) => (p.storeIds || []).includes(storeId) || p.storeId === storeId;
  const productsOfStore = products.filter(belongs);
  // Exclusivo = não sobra nenhuma outra loja depois de tirar esta.
  const exclusive = productsOfStore.filter((p) => {
    const ids: string[] = p.storeIds || (p.storeId ? [p.storeId] : []);
    return ids.filter((id) => id !== storeId).length === 0;
  });
  const shared = productsOfStore.filter((p) => !exclusive.includes(p));

  return {
    exclusiveProducts: exclusive,
    sharedProducts: shared,
    combos: combos.filter((c: any) => c.lojaId === storeId),
    configs: configs.filter((c: any) => c.lojaId === storeId),
    instances: instances.filter((i: any) => i.lojaId === storeId),
    ordersCount: orders.filter((o: any) => o.lojaId === storeId || o.storeId === storeId).length,
  };
}

export async function previewRemoveStore(uid: string, companyId: string, storeId: string) {
  const user = await getUser(uid);
  assertAdmin(user);
  const company = await getDoc('companies', companyId);
  const stores = company?.stores || [];
  const store = stores.find((s: any) => s.id === storeId);
  if (!store) throw new Error('loja_nao_encontrada');
  if (stores.length <= 1) throw new Error('ultima_loja');

  const i = await collectStoreImpact(companyId, storeId);
  return {
    storeName: store.name,
    productsToDelete: i.exclusiveProducts.length,
    productsToUnlink: i.sharedProducts.length,
    combosToDelete: i.combos.length,
    configsToDelete: i.configs.length,
    instancesToUnlink: i.instances.length,
    ordersPreserved: i.ordersCount,
  };
}

export async function removeStore(uid: string, companyId: string, storeId: string) {
  const user = await getUser(uid);
  assertAdmin(user);
  const company = await getDoc('companies', companyId);
  const stores = company?.stores || [];
  if (!stores.find((s: any) => s.id === storeId)) throw new Error('loja_nao_encontrada');
  if (stores.length <= 1) throw new Error('ultima_loja');

  const i = await collectStoreImpact(companyId, storeId);

  // 1. Produtos exclusivos da loja → excluídos; compartilhados → perdem só o vínculo.
  for (const p of i.exclusiveProducts) await db.collection('products').doc(p.id).delete();
  for (const p of i.sharedProducts) {
    const ids: string[] = (p.storeIds || (p.storeId ? [p.storeId] : [])).filter((id: string) => id !== storeId);
    await db.collection('products').doc(p.id).update({ storeIds: ids, storeId: null });
  }
  // 2. Combos e config da loja
  for (const c of i.combos) await db.collection('combos').doc(c.id).delete();
  for (const c of i.configs) await db.collection('loja_config').doc(c.id).delete();
  // 3. Instâncias desvinculadas (ficam livres para outra loja)
  for (const inst of i.instances) await db.collection('instancias').doc(inst.id).update({ lojaId: null, funcao: null });
  // 4. Remove a loja do array (pedidos e leads permanecem intactos)
  await db.collection('companies').doc(companyId).update({ stores: stores.filter((s: any) => s.id !== storeId) });

  return {
    ok: true,
    deletedProducts: i.exclusiveProducts.length,
    unlinkedProducts: i.sharedProducts.length,
    deletedCombos: i.combos.length,
    unlinkedInstances: i.instances.length,
    preservedOrders: i.ordersCount,
  };
}

// ─── USERS ───────────────────────────────────────────────────────────────────

// Dono cria colaborador na própria empresa. Cria no Auth + doc users.
export async function createEmployee(uid: string, payload: { name: string; email: string; password: string; storeIds?: string[]; permissions?: string[] }): Promise<{ id: string }> {
  const user = await getUser(uid);
  if (user.role !== 'owner' && user.role !== 'admin') throw new Error('forbidden');
  if (!user.companyId) throw new Error('no_company');
  if (!payload.email || !payload.password) throw new Error('credenciais_obrigatorias');
  const created = await getAuth().createUser({ email: payload.email, password: payload.password, displayName: payload.name || undefined });
  await db.collection('users').doc(created.uid).set({
    uid: created.uid, name: payload.name || '', email: payload.email, role: 'employee',
    companyId: user.companyId, storeIds: payload.storeIds || [], active: true,
    permissions: sanitizePermissions(payload.permissions),
  });
  return { id: created.uid };
}

// Atualiza campos de um usuário. Admin em qualquer; dono só na própria empresa.
export async function updateUser(uid: string, targetId: string, fields: { name?: string; storeIds?: string[]; permissions?: string[] }): Promise<{ ok: boolean }> {
  const user = await getUser(uid);
  const target = await getDoc('users', targetId);
  if (!target) throw new Error('not_found');
  if (user.role !== 'admin' && target.companyId !== user.companyId) throw new Error('forbidden');
  const clean: any = {};
  if (typeof fields.name === 'string') clean.name = fields.name;
  if (Array.isArray(fields.storeIds)) clean.storeIds = fields.storeIds;
  if (Array.isArray(fields.permissions)) clean.permissions = sanitizePermissions(fields.permissions);
  if (Object.keys(clean).length === 0) throw new Error('nada_para_atualizar');
  await db.collection('users').doc(targetId).update(clean);
  return { ok: true };
}

export async function setUserActive(uid: string, targetId: string, active: boolean): Promise<{ ok: boolean }> {
  const user = await getUser(uid);
  const target = await getDoc('users', targetId);
  if (!target) throw new Error('not_found');
  if (user.role !== 'admin' && target.companyId !== user.companyId) throw new Error('forbidden');
  await db.collection('users').doc(targetId).update({ active });
  return { ok: true };
}

export async function deleteUser(uid: string, targetId: string): Promise<{ ok: boolean }> {
  const user = await getUser(uid);
  const target = await getDoc('users', targetId);
  if (!target) throw new Error('not_found');
  if (user.role !== 'admin' && target.companyId !== user.companyId) throw new Error('forbidden');
  if (target.role === 'owner') throw new Error('nao_pode_excluir_dono');
  await db.collection('users').doc(targetId).delete();
  try { await getAuth().deleteUser(targetId); } catch { /* auth pode já não existir */ }
  return { ok: true };
}

// ─── SETTINGS (admin) ─────────────────────────────────────────────────────────

export async function saveWebhooks(uid: string, data: any): Promise<{ ok: boolean }> {
  const user = await getUser(uid);
  assertAdmin(user);
  await db.collection('settings').doc('webhooks').set({
    atendimento: data.atendimento || '', agendamento: data.agendamento || '',
    venda: data.venda || '', disparo: data.disparo || '', updatedAt: new Date(),
  });
  return { ok: true };
}
