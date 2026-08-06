// Gestão de usuários, clientes (companies) e settings — SERVER-SIDE (autenticado).
// A empresa e o papel vêm do doc users/{uid}; o cliente não escolhe de quem é o dado.
import { getAuth } from 'firebase-admin/auth';
import { getDoc, db } from './firebase.js';

async function getUser(uid: string): Promise<any> {
  const user = await getDoc('users', uid);
  if (!user) throw new Error('user_not_found');
  return user;
}
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
    await db.collection('companies').doc(payload.id).update({
      name: data.name,
      stores,
      limite_instancias: data.limite_instancias || 1,
      modulos_ativos: data.modulos_ativos || ['atendimento'],
    });
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
  await db.collection('companies').doc(targetId).update({ stores });
  return { ok: true };
}

// ─── USERS ───────────────────────────────────────────────────────────────────

// Dono cria colaborador na própria empresa. Cria no Auth + doc users.
export async function createEmployee(uid: string, payload: { name: string; email: string; password: string; storeIds?: string[] }): Promise<{ id: string }> {
  const user = await getUser(uid);
  if (user.role !== 'owner' && user.role !== 'admin') throw new Error('forbidden');
  if (!user.companyId) throw new Error('no_company');
  if (!payload.email || !payload.password) throw new Error('credenciais_obrigatorias');
  const created = await getAuth().createUser({ email: payload.email, password: payload.password, displayName: payload.name || undefined });
  await db.collection('users').doc(created.uid).set({
    uid: created.uid, name: payload.name || '', email: payload.email, role: 'employee',
    companyId: user.companyId, storeIds: payload.storeIds || [], active: true, permissions: ['orders', 'products'],
  });
  return { id: created.uid };
}

// Atualiza campos de um usuário. Admin em qualquer; dono só na própria empresa.
export async function updateUser(uid: string, targetId: string, fields: { name?: string; storeIds?: string[] }): Promise<{ ok: boolean }> {
  const user = await getUser(uid);
  const target = await getDoc('users', targetId);
  if (!target) throw new Error('not_found');
  if (user.role !== 'admin' && target.companyId !== user.companyId) throw new Error('forbidden');
  const clean: any = {};
  if (typeof fields.name === 'string') clean.name = fields.name;
  if (Array.isArray(fields.storeIds)) clean.storeIds = fields.storeIds;
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
