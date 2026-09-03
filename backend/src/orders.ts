// Criação de pedido do catálogo — SERVER-SIDE.
// O navegador manda só o carrinho e as escolhas; o servidor recalcula preços,
// taxa e cupom lendo o Firestore (fonte da verdade), valida/baixa estoque,
// cria o pedido e dispara a notificação. O cliente não controla os valores.

import { getAll, getDoc, db } from './firebase.js';
import { loadUser } from './currentUser.js';
import { notifyNewOrder, notifyPaymentReceived, notifyStatusChange } from './notify.js';
import { createPixCharge, getPayment } from './mercadopago.js';
import { Timestamp } from 'firebase-admin/firestore';

type CartLine = { id: string; qty: number; isCombo?: boolean; opcoes?: string[] };

export interface CreateOrderInput {
  storeId: string;
  cart: CartLine[];
  deliveryType: 'entrega' | 'retirada';
  bairro?: string;
  couponCode?: string | null;
  customer: { name: string; phone: string; address?: string; bairro?: string };
  paymentMethod: 'na_entrega' | 'pix_manual' | 'pix_mercadopago';
  paymentSubMethod?: string | null;
  troco?: number | null;
}

function num(v: any, def = 0): number {
  const n = parseFloat(v);
  return isNaN(n) ? def : n;
}

// Baixa de estoque agregada (combo + avulso podem abater o mesmo produto).
// Baixa de estoque ATÔMICA: lê e decrementa dentro de uma transação, revalidando
// o estoque no commit — dois pedidos simultâneos não vendem além do disponível.
async function deductStock(deductions: { productId: string; qty: number }[]) {
  const byProduct = new Map<string, number>();
  for (const d of deductions) byProduct.set(d.productId, (byProduct.get(d.productId) || 0) + d.qty);
  if (byProduct.size === 0) return;
  const entries = [...byProduct.entries()];
  await db.runTransaction(async (tx) => {
    const refs = entries.map(([id]) => db.collection('products').doc(id));
    const snaps = await Promise.all(refs.map((r) => tx.get(r)));
    // Valida com a leitura fresca da transação.
    for (let i = 0; i < entries.length; i++) {
      const data = snaps[i].exists ? (snaps[i].data() as any) : null;
      const stock = data?.stock;
      if (stock != null && stock < entries[i][1]) throw new Error(`sem_estoque:${data?.name || entries[i][0]}`);
    }
    // Decrementa.
    for (let i = 0; i < entries.length; i++) {
      const data = snaps[i].exists ? (snaps[i].data() as any) : null;
      if (data?.stock != null) tx.update(refs[i], { stock: Math.max(0, data.stock - entries[i][1]) });
    }
  });
}

async function findOrCreateLead(
  companyId: string,
  storeId: string,
  name: string,
  phone: string
): Promise<string> {
  let cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length === 13 && cleanPhone.startsWith('55')) cleanPhone = cleanPhone.substring(2);

  let leads = await getAll('leads', [
    { field: 'empresaId', operator: '==', value: companyId },
    { field: 'whatsapp', operator: '==', value: cleanPhone },
  ]);
  if (leads.length === 0) {
    leads = await getAll('leads', [
      { field: 'empresaId', operator: '==', value: companyId },
      { field: 'whatsapp', operator: '==', value: '55' + cleanPhone },
    ]);
  }
  let existing = leads[0];
  if (!existing) {
    const byPhone = await getAll('leads', [
      { field: 'empresaId', operator: '==', value: companyId },
      { field: 'telefone', operator: '==', value: cleanPhone },
    ]);
    existing = byPhone[0];
  }
  if (existing) {
    if (existing.statusLead !== 'cliente_ativo') {
      await db.collection('leads').doc(existing.id).update({ statusLead: 'cliente_ativo' });
    }
    return existing.id;
  }
  const ref = await db.collection('leads').add({
    nome: name,
    telefone: cleanPhone,
    whatsapp: cleanPhone,
    empresaId: companyId,
    lojaId: storeId,
    origem: 'catalogo',
    statusLead: 'cliente_ativo',
    criadoEm: new Date().toISOString(),
  });
  return ref.id;
}

export async function createCatalogOrder(
  input: CreateOrderInput
): Promise<{ orderId: string; total: number; mpData?: any }> {
  const { storeId } = input;

  // 1. Resolve config + companyId a partir da loja (não confia no cliente).
  const configs = await getAll('loja_config', { field: 'lojaId', operator: '==', value: storeId });
  const config = configs[0];
  if (!config) throw new Error('loja_nao_encontrada');
  const companyId = config.empresaId;

  // 2. Carrega produtos, combos e complementos da empresa.
  const [products, combos, complementos] = await Promise.all([
    getAll('products', { field: 'companyId', operator: '==', value: companyId }),
    getAll('combos', { field: 'empresaId', operator: '==', value: companyId }),
    getAll('complementos', { field: 'empresaId', operator: '==', value: companyId }).catch(() => []),
  ]);
  const productById = new Map(products.map((p: any) => [p.id, p]));
  const comboById = new Map(combos.map((c: any) => [c.id, c]));
  const compById = new Map((complementos as any[]).map((g: any) => [g.id, g]));
  // Grupos de complementos de um produto: referências (complementoIds) ou embutido (legado).
  const gruposDoProduto = (prod: any): any[] =>
    Array.isArray(prod.complementoIds) && prod.complementoIds.length
      ? prod.complementoIds.map((id: string) => compById.get(id)).filter(Boolean)
      : (Array.isArray(prod.gruposOpcoes) ? prod.gruposOpcoes : []);

  // 3. Monta itens com PREÇO DO SERVIDOR e valida estoque.
  const items: any[] = [];
  const deductions: { productId: string; qty: number }[] = [];
  let subtotal = 0;

  if (!Array.isArray(input.cart) || input.cart.length === 0) throw new Error('carrinho_vazio');

  for (const line of input.cart) {
    const qty = Math.max(1, parseInt(String(line.qty)) || 1);

    if (line.isCombo) {
      const combo: any = comboById.get(line.id);
      if (!combo || combo.ativo === false) throw new Error('combo_indisponivel');
      const price = num(combo.preco);
      subtotal += price * qty;
      items.push({
        productId: `combo_${combo.id}`,
        name: combo.nome,
        qty,
        price,
        subtotal: price * qty,
        isCombo: true,
        itensCombo: (combo.produtos || []).map((p: any) => p.name).join(' + '),
      });
      for (const cp of combo.produtos || []) {
        const prod: any = productById.get(cp.id);
        if (prod && prod.stock != null) {
          if (prod.stock < qty) throw new Error(`sem_estoque:${prod.name}`);
          deductions.push({ productId: prod.id, qty });
        }
      }
    } else {
      const prod: any = productById.get(line.id);
      if (!prod || prod.active === false) throw new Error('produto_indisponivel');
      if (prod.stock != null && prod.stock < qty) throw new Error(`sem_estoque:${prod.name}`);
      const base = prod.promotionalActive ? num(prod.promotionalPrice, num(prod.price)) : num(prod.price);

      // Complementos: recalcula preço e valida mín/máx a partir dos grupos SALVOS (nunca confia no preço do cliente).
      let extra = 0;
      const opcoesNomes: string[] = [];
      const grupos: any[] = gruposDoProduto(prod);
      if (grupos.length) {
        const escolhidos: string[] = Array.isArray(line.opcoes) ? line.opcoes.map(String) : [];
        for (const g of grupos) {
          const itensG = (g.itens || []).filter((it: any) => escolhidos.includes(String(it.id)));
          const minReq = g.obrigatorio ? Math.max(1, Number(g.min) || 0) : (Number(g.min) || 0);
          if (itensG.length < minReq) throw new Error(`opcao_obrigatoria:${g.nome}`);
          if (Number(g.max) > 0 && itensG.length > Number(g.max)) throw new Error(`opcao_excedida:${g.nome}`);
          for (const it of itensG) { extra += num(it.preco); opcoesNomes.push(it.nome); }
        }
      }
      const price = base + extra;
      subtotal += price * qty;
      const item: any = { productId: prod.id, name: prod.name, qty, price, subtotal: price * qty };
      if (opcoesNomes.length) item.opcoes = opcoesNomes;
      items.push(item);
      if (prod.stock != null) deductions.push({ productId: prod.id, qty });
    }
  }

  // 4. Taxa de entrega (server-side).
  let taxaAplicada = 0;
  let taxaNome = 'Retirada';
  if (input.deliveryType !== 'retirada') {
    const taxaGenerica = num(config.taxaGenerica);
    const flat: { nome: string; preco: number }[] = [];
    for (const b of config.bairrosEntrega || []) {
      const nomes = String(b.bairros || '').split(',').map((s) => s.trim()).filter(Boolean);
      for (const n of nomes) flat.push({ nome: n, preco: num(b.preco) });
    }
    const bairro = (input.bairro || input.customer?.bairro || '').trim();
    const match = flat.find((x) => x.nome.toLowerCase() === bairro.toLowerCase());
    taxaAplicada = match ? match.preco : taxaGenerica;
    taxaNome = bairro ? `Entrega (${bairro})` : 'Taxa de Entrega';
  }

  // 5. Cupom (valida ativo + valor mínimo, server-side).
  let desconto = 0;
  let codigoCupom: string | null = null;
  if (input.couponCode) {
    const code = String(input.couponCode).trim().toUpperCase();
    const found: any = (config.cupons || []).find((c: any) => c.codigo === code && c.ativo !== false);
    if (found) {
      const expirado = found.validade && Date.now() > new Date(found.validade).getTime();
      const esgotado = num(found.limiteUsos) > 0 && num(found.usados) >= num(found.limiteUsos);
      const minOk = !(num(found.valorMinimo) > 0 && subtotal < num(found.valorMinimo));
      if (!expirado && !esgotado && minOk) {
        desconto = found.tipo === 'percent' ? (subtotal * num(found.desconto)) / 100 : num(found.desconto);
        codigoCupom = found.codigo;
      }
    }
  }

  // 6. Total autoritativo do servidor.
  const total = Math.max(0, subtotal + taxaAplicada - desconto);

  // 7. Baixa estoque e resolve lead.
  await deductStock(deductions);
  const leadId = await findOrCreateLead(companyId, storeId, input.customer.name, input.customer.phone);

  // 8. Cria o pedido com os valores do servidor.
  const pagamento = input.paymentMethod === 'na_entrega' ? 'na_entrega' : 'pagamento_no_pix';
  const orderData: any = {
    lojaId: storeId,
    storeId,
    companyId,
    empresaId: companyId,
    clientName: input.customer.name,
    clientPhone: input.customer.phone,
    endereco: input.customer.address || '',
    bairro: input.customer.bairro || input.bairro || '',
    entrega: input.deliveryType,
    leadId,
    nome: input.customer.name,
    items,
    total,
    taxaAplicada,
    taxaNome,
    desconto,
    codigoCupom,
    paymentMethod: input.paymentMethod,
    pagamento,
    status: 'em_montagem',
    source: 'catalog',
    criadoEm: new Date().toISOString(),
  };
  if (input.paymentMethod === 'na_entrega') {
    orderData.paymentSubMethod = input.paymentSubMethod || null;
    orderData.troco = input.troco != null ? num(input.troco) : null;
  }
  // Pré-pago (MP): pedido nasce PENDENTE — fica invisível no painel e não apita
  // até o pagamento cair (o webhook marca pago:true).
  const isPrePago = input.paymentMethod === 'pix_mercadopago';
  if (isPrePago) {
    orderData.pendentePagamento = true;
    orderData.pago = false;
  }

  const ref = await db.collection('pedidos').add(orderData);
  const orderId = ref.id;

  // Contabiliza o uso do cupom (para o limite de usos). Best-effort.
  if (codigoCupom && config.id) {
    try {
      const novos = (config.cupons || []).map((c: any) => c.codigo === codigoCupom ? { ...c, usados: num(c.usados) + 1 } : c);
      await db.collection('loja_config').doc(config.id).update({ cupons: novos });
    } catch { /* limite de cupom é best-effort */ }
  }

  // 9. Mercado Pago: cria a cobrança DIRETO na API do MP (external_reference = orderId,
  //    pra a confirmação do pagamento achar o pedido depois). Atualiza com o payment_id.
  let mpData: any = null;
  if (isPrePago) {
    try {
      mpData = await createPixCharge(companyId, total, input.customer.name, orderId);
      if (mpData?.payment_id) {
        await db.collection('pedidos').doc(orderId).update({ mpPaymentId: mpData.payment_id });
      }
    } catch (err) {
      console.error('[orders] cobrança MP falhou:', err);
    }
  }

  // 10. Notificação — só pra pedidos NÃO pré-pagos. No MP, quem avisa é o webhook
  //     quando o pagamento cair (senão apitaria antes de pagar).
  if (!isPrePago) {
    try {
      await notifyNewOrder(orderId);
    } catch (err) {
      console.error('[orders] notify falhou:', err);
    }
  }

  return { orderId, total, mpData };
}

// Chamado pelo webhook do Mercado Pago. Confere o pagamento na fonte (MP) e,
// se aprovado, marca o pedido como pago e avisa o cliente. O pedido segue
// aguardando a loja aceitar (o dono decide aceitar ou recusar/estornar).
export async function handleMpPaymentApproved(
  paymentId: string
): Promise<{ handled: boolean; orderId?: string; status?: string; novo?: boolean }> {
  const orders = await getAll('pedidos', { field: 'mpPaymentId', operator: '==', value: paymentId });
  const order = orders[0];
  if (!order) return { handled: false };

  const payment = await getPayment(order.empresaId, paymentId);
  const status = payment?.status;
  if (status !== 'approved') return { handled: false, orderId: order.id, status };

  // O MP manda o webhook várias vezes. Marca pago de forma ATÔMICA (transação):
  // só o PRIMEIRO webhook concorrente vence e dispara a notificação — os demais
  // saem sem reprocessar.
  const orderRef = db.collection('pedidos').doc(order.id);
  const primeiraVez = await db.runTransaction(async (tx) => {
    const snap = await tx.get(orderRef);
    if (snap.data()?.pago === true) return false;
    tx.update(orderRef, { pago: true });
    return true;
  });

  if (!primeiraVez) return { handled: true, orderId: order.id, status, novo: false };

  try {
    await notifyPaymentReceived(order.id);
  } catch (err) {
    console.error('[mp-webhook] notifyPaymentReceived falhou:', err);
  }
  return { handled: true, orderId: order.id, status, novo: true };
}

// ── Mudança de status pelo painel (autenticado, valida dono) ──
// Só o dono/admin muda status. Campos extras são whitelist (o dono pode ajustar
// itens/total ao aceitar; NUNCA mexe em pago/estornado/mpPaymentId).
const STATUS_EXTRA_WHITELIST = new Set([
  'value', 'total', 'itens', 'taxaAplicada', 'taxaEntrega', 'manuallyConfirmed',
]);

async function assertOrderOwner(uid: string, orderId: string): Promise<{ user: any; order: any }> {
  const user = await loadUser(uid);
  const order = await getDoc('pedidos', orderId);
  if (!order) throw new Error('not_found');
  if (user.role !== 'admin' && order.empresaId !== user.companyId) throw new Error('forbidden');
  return { user, order };
}

export async function changeOrderStatus(
  uid: string,
  payload: { orderId: string; newStatus: string; reason?: string; extraUpdates?: any }
): Promise<{ ok: boolean; sent: boolean }> {
  const { orderId, newStatus, reason, extraUpdates } = payload;
  const { order } = await assertOrderOwner(uid, orderId);
  const prevStatus = order.status;

  const updates: any = { status: newStatus, updatedAt: Timestamp.now() };
  if (reason) updates.rejectionReason = reason;
  if (extraUpdates && typeof extraUpdates === 'object') {
    for (const [k, v] of Object.entries(extraUpdates)) {
      if (STATUS_EXTRA_WHITELIST.has(k)) updates[k] = v;
    }
  }
  await db.collection('pedidos').doc(orderId).update(updates);

  if (newStatus === 'finalizado' && order.leadId) {
    await db.collection('leads').doc(order.leadId).update({
      statusAtendimento: 'finalizado',
      updatedAt: Timestamp.now(),
    });
  }

  // Notifica (mensagem + estorno se cancelar pedido pago). Lê o pedido já atualizado.
  const result = await notifyStatusChange(orderId, newStatus as any, prevStatus, reason);
  return { ok: true, sent: result.sent };
}

export async function archiveOrder(uid: string, orderId: string, arquivado = true): Promise<{ ok: boolean }> {
  await assertOrderOwner(uid, orderId);
  await db.collection('pedidos').doc(orderId).update({ arquivado: !!arquivado });
  return { ok: true };
}

// Exclusão definitiva do pedido — SÓ admin da plataforma (usado para limpar testes).
// Não devolve estoque: o pedido some do sistema como se nunca tivesse existido.
export async function deleteOrder(uid: string, orderId: string): Promise<{ ok: boolean }> {
  const user = await loadUser(uid);
  if (user.role !== 'admin') throw new Error('forbidden');
  const order = await getDoc('pedidos', orderId);
  if (!order) return { ok: true };
  await db.collection('pedidos').doc(orderId).delete();
  return { ok: true };
}

// Anexa o comprovante (PIX manual). Público — o cliente do catálogo não tem login.
// Só grava a URL do comprovante, nada mais.
export async function setComprovante(
  orderId: string,
  comprovanteUrl: string
): Promise<{ ok: boolean }> {
  const order = await getDoc('pedidos', orderId);
  if (!order) throw new Error('not_found');
  await db.collection('pedidos').doc(orderId).update({
    comprovanteUrl: String(comprovanteUrl).slice(0, 2000),
  });
  return { ok: true };
}
