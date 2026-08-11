// Lógica de notificação de pedido — portada do frontend (orderService.ts).
// Roda no servidor: lê o pedido do Firestore, resolve a instância, o telefone e o
// template da mensagem, e envia pela Evolution. O cliente só informa o orderId.

import { getAll, getDoc, db } from './firebase.js';
import { sendText } from './evolution.js';
import { refundPayment } from './mercadopago.js';
import { Timestamp } from 'firebase-admin/firestore';

type OrderStatus =
  | 'em_montagem'
  | 'aguardando_pagamento'
  | 'em_preparo'
  | 'pedido_pronto'
  | 'saiu_para_entrega'
  | 'finalizado'
  | 'cancelado';

function substituirVariaveis(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) =>
    vars[key] !== undefined ? vars[key] : match
  );
}

function buildVars(order: any, lead: any): Record<string, string> {
  const rawItems = Array.isArray(order.itens)
    ? order.itens
    : Array.isArray(order.items)
    ? order.items
    : [];
  const itens = rawItems.map((i: any) => ({
    item: i.item || i.name || '',
    quantidade: i.quantidade || i.qty || 1,
    preco: i.preco || i.price || 0,
  }));
  const lista = itens.map((i: any) => `${i.quantidade}x ${i.item}`).join(', ');
  return {
    nome_lead: lead?.nome || lead?.name || order.clientName || order.nome || 'Cliente',
    telefone_lead: (lead?.telefone || '').split('@')[0] || order.clientPhone || '',
    numero_pedido: order.id?.slice(-6).toUpperCase() || '',
    lista_produtos: lista,
    valor_total: (Number(order.value || order.total) || 0).toFixed(2),
    endereco_entrega: order.endereco || order.clientAddress || 'Não informado',
    forma_pagamento: (() => {
      const base =
        order.formaPagamento || order.paymentMethod || order.pagamento || 'Não informado';
      if (base === 'na_entrega' || base === 'pagamento_na_entrega') {
        const sub =
          order.paymentSubMethod === 'dinheiro'
            ? 'Dinheiro'
            : order.paymentSubMethod === 'cartao'
            ? 'Cartão'
            : '';
        const troco = order.troco
          ? ` (Troco para R$ ${parseFloat(order.troco).toFixed(2)})`
          : '';
        if (sub) return `Na Entrega (${sub}${troco})`;
      }
      return base;
    })(),
  };
}

// Textos padrão (mesmos do painel) — usados quando a loja não personalizou.
const DEFAULT_MESSAGES: Record<string, string> = {
  pedido_aceito_entrega_pago:
    'Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado (Pagamento Adiantado). \n\n📦 Itens: {{lista_produtos}}\n💰 Total: R$ {{valor_total}}',
  pedido_aceito_entrega_pendente:
    'Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado. O pagamento será feito na entrega. \n\n📦 Itens: {{lista_produtos}}\n💰 Total: R$ {{valor_total}}',
  pedido_aceito_retirada:
    'Olá {{nome_lead}}! Pedido #{{numero_pedido}} aceito para retirada. Valor: R$ {{valor_total}}. Aguardamos você!',
  pagamento_confirmado:
    'Olá {{nome_lead}}! Pagamento do pedido #{{numero_pedido}} confirmado. Já estamos preparando!',
  pedido_pronto: 'Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} está pronto para retirada!',
  saiu_para_entrega:
    'Olá {{nome_lead}}! Pedido #{{numero_pedido}} saiu para entrega: {{endereco_entrega}}',
  pedido_entregue:
    'Olá {{nome_lead}}! Pedido #{{numero_pedido}} finalizado. Obrigado pela preferência!',
  pedido_cancelado: 'Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi cancelado.',
};

// Mapa base status → chave de mensagem.
function getMsgKey(newStatus: OrderStatus): string | null {
  switch (newStatus) {
    case 'aguardando_pagamento':
      return 'pedido_aceito_entrega_pago';
    case 'em_preparo':
      return 'pagamento_confirmado';
    case 'pedido_pronto':
      return 'pedido_pronto';
    case 'saiu_para_entrega':
      return 'saiu_para_entrega';
    case 'finalizado':
      return 'pedido_entregue';
    case 'cancelado':
      return 'pedido_cancelado';
    default:
      return null;
  }
}

async function fetchMensagensConfig(
  companyId: string,
  lojaId?: string
): Promise<Record<string, string>> {
  try {
    if (lojaId) {
      const lojaConfigs = await getAll('loja_config', [
        { field: 'empresaId', operator: '==', value: companyId },
        { field: 'lojaId', operator: '==', value: lojaId },
      ]);
      if (lojaConfigs.length > 0 && lojaConfigs[0].mensagens_automaticas) {
        return lojaConfigs[0].mensagens_automaticas;
      }
    }
    const configs = await getAll('empresa_config', {
      field: 'empresaId',
      operator: '==',
      value: companyId,
    });
    if (configs.length > 0) {
      return configs[0].mensagens_automaticas || {};
    }
  } catch (err) {
    console.error('[notify] Erro buscando config de mensagens:', err);
  }
  return {};
}

// Resolve o nome da instância vinculada à loja (ou fallbacks).
async function resolveInstanceName(companyId: string, order: any): Promise<string | null> {
  if (order.instancia) return order.instancia;

  const sid = order.storeId || order.lojaId;
  if (!sid) return null;

  const lojaConfigs = await getAll('loja_config', [
    { field: 'empresaId', operator: '==', value: companyId },
    { field: 'lojaId', operator: '==', value: sid },
  ]);
  let targetInstId = lojaConfigs[0]?.instancia_id;

  const company = await getDoc('companies', companyId);
  if (!targetInstId) {
    const storeInfo = company?.stores?.find((s: any) => s.id === sid);
    targetInstId = storeInfo?.instancia_id;
  }

  let instanceName: string | null = null;
  if (targetInstId) {
    const instDoc = await getDoc('instancias', targetInstId);
    instanceName = instDoc?.nome || null;
  }
  if (!instanceName && company?.whatsappInstance?.instanceName) {
    instanceName = company.whatsappInstance.instanceName;
  }
  return instanceName;
}

function getPhone(order: any, lead: any): string | null {
  return (
    lead?.telefone ||
    lead?.whatsapp ||
    (order.clientPhone ? order.clientPhone.replace(/\D/g, '') : null) ||
    order.telefone ||
    order.leadId ||
    null
  );
}

// ── Envio na criação do pedido (checkout do catálogo) ──
// Usa o template "pedido_recebido". A loja bonsprecosexpress deixa vazio de
// propósito (não avisa no recebimento — só quando o atendente aceita).
export async function notifyNewOrder(
  orderId: string
): Promise<{ sent: boolean; reason?: string }> {
  const order = await getDoc('pedidos', orderId);
  if (!order) return { sent: false, reason: 'order_not_found' };

  const companyId = order.empresaId;
  const sid = order.storeId || order.lojaId;
  if (!companyId || !sid) return { sent: false, reason: 'missing_company_or_store' };

  const customMsgs = await fetchMensagensConfig(companyId, sid);
  const template = customMsgs['pedido_recebido'];
  if (!template) return { sent: false, reason: 'template_empty' };

  const instanceName = await resolveInstanceName(companyId, order);
  if (!instanceName) return { sent: false, reason: 'instance_not_resolved' };

  const lead = order.leadId ? await getDoc('leads', order.leadId) : null;
  const message = substituirVariaveis(template, buildVars(order, lead));
  const phone = getPhone(order, lead);
  if (!phone || !message) return { sent: false, reason: 'missing_phone_or_message' };

  const ok = await sendText(instanceName, phone, message);
  if (ok && order.leadId) await saveMessageLog(companyId, order.leadId, message);
  return { sent: ok, reason: ok ? undefined : 'evolution_failed' };
}

// ── Envio na mudança de status (aceitar, pronto, saiu, finalizado, cancelado) ──
// prevStatus é o status ANTES da mudança — necessário pra escolher a variação
// certa de "pedido aceito".
export async function notifyStatusChange(
  orderId: string,
  newStatus: OrderStatus,
  prevStatus?: string,
  reason?: string
): Promise<{ sent: boolean; reason?: string }> {
  const order = await getDoc('pedidos', orderId);
  if (!order) return { sent: false, reason: 'order_not_found' };

  const companyId = order.empresaId;
  if (!companyId) return { sent: false, reason: 'missing_company' };

  const instanceName = await resolveInstanceName(companyId, order);
  if (!instanceName) return { sent: false, reason: 'instance_not_resolved' };

  const lead = order.leadId ? await getDoc('leads', order.leadId) : null;
  const vars = buildVars(order, lead);
  const customMsgs = await fetchMensagensConfig(companyId, order.lojaId || order.storeId);

  // Escolhe a chave da mensagem.
  let msgKey = getMsgKey(newStatus);
  const isWithdrawal = order.entrega === 'retirada' || order.deliveryType === 'retirada';
  const paymentMethod = String(
    order.formaPagamento || order.paymentMethod || order.pagamento || ''
  );
  const isPayOnDelivery =
    paymentMethod.includes('entrega') ||
    paymentMethod.includes('dinheiro') ||
    paymentMethod.includes('maquininha') ||
    paymentMethod === 'na_entrega';

  if (newStatus === 'aguardando_pagamento' || newStatus === 'em_preparo') {
    if (isPayOnDelivery) {
      msgKey = isWithdrawal ? 'pedido_aceito_retirada' : 'pedido_aceito_entrega_pendente';
    } else if (prevStatus === 'em_montagem' || !prevStatus) {
      msgKey = isWithdrawal ? 'pedido_aceito_retirada' : 'pedido_aceito_entrega_pago';
    }
  }

  if (!msgKey) return { sent: false, reason: 'no_message_for_status' };

  // Cancelamento de pedido JÁ PAGO no Mercado Pago → estorna automaticamente.
  let refundNote = '';
  if (
    newStatus === 'cancelado' &&
    order.paymentMethod === 'pix_mercadopago' &&
    order.pago === true &&
    order.mpPaymentId
  ) {
    const refunded = await refundPayment(companyId, order.mpPaymentId);
    await db.collection('pedidos').doc(orderId).update({ estornado: refunded });
    console.log(`[refund] ${orderId} pagamento ${order.mpPaymentId} -> ${refunded ? 'ESTORNADO' : 'FALHOU'}`);
    refundNote = refunded
      ? ' O valor pago foi estornado e voltará para a sua conta em alguns instantes. 💸'
      : '';
  }

  const template = customMsgs[msgKey] || DEFAULT_MESSAGES[msgKey] || '';
  if (!template) return { sent: false, reason: 'template_empty' };

  let message = substituirVariaveis(template, vars);
  if (newStatus === 'cancelado') {
    if (reason) message = `${message} Motivo: ${reason}`;
    message = `${message}${refundNote}`;
  }

  const phone = getPhone(order, lead);
  if (!phone || !message) return { sent: false, reason: 'missing_phone_or_message' };

  const ok = await sendText(instanceName, phone, message);
  if (ok && order.leadId) await saveMessageLog(companyId, order.leadId, message);
  return { sent: ok, reason: ok ? undefined : 'evolution_failed' };
}

async function saveMessageLog(companyId: string, leadId: string, message: string) {
  await db.collection('messages').add({
    conteudo: message,
    createdAt: Timestamp.now(),
    empresaId: companyId,
    leadId,
    role: 'assistente',
    tipo: 'conversation',
  });
}

// Mensagem de intervenção do atendente (via modal do pedido). Autenticado:
// confere que o pedido é da empresa do usuário, resolve instância/telefone,
// envia pela Evolution e grava o log em messages.
export async function sendIntervention(uid: string, orderId: string, message: string): Promise<{ ok: boolean }> {
  const user = await getDoc('users', uid);
  if (!user) throw new Error('user_not_found');
  const order = await getDoc('pedidos', orderId);
  if (!order) throw new Error('pedido_nao_encontrado');
  if (user.role !== 'admin' && order.empresaId !== user.companyId) throw new Error('forbidden');
  if (!message || !message.trim()) throw new Error('mensagem_vazia');

  const companyId = order.empresaId;
  const lead = order.leadId ? await getDoc('leads', order.leadId) : null;
  const instanceName = await resolveInstanceName(companyId, order);
  if (!instanceName) throw new Error('sem_instancia');
  const phone = getPhone(order, lead);
  if (!phone) throw new Error('sem_telefone');

  const ok = await sendText(instanceName, phone, message.trim());
  if (!ok) throw new Error('falha_envio');
  await saveMessageLog(companyId, order.leadId || phone, message.trim());
  return { ok: true };
}

// Avisa o cliente que o pagamento PIX (MP) caiu — o pedido segue aguardando a loja aceitar.
export async function notifyPaymentReceived(orderId: string): Promise<boolean> {
  const order = await getDoc('pedidos', orderId);
  if (!order) return false;
  const companyId = order.empresaId;
  const instanceName = await resolveInstanceName(companyId, order);
  if (!instanceName) return false;
  const lead = order.leadId ? await getDoc('leads', order.leadId) : null;
  const vars = buildVars(order, lead);
  const numero = vars.numero_pedido;
  const message = `✅ Recebemos seu pagamento do pedido #${numero}! Já vamos confirmar e preparar. 🎉`;
  const phone = getPhone(order, lead);
  if (!phone) return false;
  const ok = await sendText(instanceName, phone, message);
  if (ok && order.leadId) await saveMessageLog(companyId, order.leadId, message);
  return ok;
}
