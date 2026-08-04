// Lógica de notificação de pedido — portada do frontend (orderService.ts).
// Roda no servidor: lê o pedido do Firestore, resolve a instância, o telefone e o
// template da mensagem, e envia pela Evolution. O cliente só informa o orderId.

import { getAll, getDoc, db } from './firebase.js';
import { sendText } from './evolution.js';
import { Timestamp } from 'firebase-admin/firestore';

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

// Resolve o nome da instância vinculada à loja.
async function resolveInstanceName(companyId: string, sid: string): Promise<string | null> {
  const lojaConfigs = await getAll('loja_config', [
    { field: 'empresaId', operator: '==', value: companyId },
    { field: 'lojaId', operator: '==', value: sid },
  ]);
  let targetInstId = lojaConfigs[0]?.instancia_id;

  if (!targetInstId) {
    const company = await getDoc('companies', companyId);
    const storeInfo = company?.stores?.find((s: any) => s.id === sid);
    targetInstId = storeInfo?.instancia_id;
  }
  if (!targetInstId) return null;

  const instDoc = await getDoc('instancias', targetInstId);
  return instDoc?.nome || null;
}

// Envia a mensagem de "pedido recebido". Retorna o motivo caso não envie.
export async function notifyNewOrder(
  orderId: string
): Promise<{ sent: boolean; reason?: string }> {
  const order = await getDoc('pedidos', orderId);
  if (!order) return { sent: false, reason: 'order_not_found' };

  const companyId = order.empresaId;
  const sid = order.storeId || order.lojaId;
  if (!companyId || !sid) return { sent: false, reason: 'missing_company_or_store' };

  const instanceName = await resolveInstanceName(companyId, sid);
  if (!instanceName) return { sent: false, reason: 'instance_not_resolved' };

  const customMsgs = await fetchMensagensConfig(companyId, sid);
  const template = customMsgs['pedido_recebido'];
  if (!template) return { sent: false, reason: 'template_empty' };

  const lead = order.leadId ? await getDoc('leads', order.leadId) : null;
  const vars = buildVars(order, lead);
  const message = substituirVariaveis(template, vars);

  const phone = order.clientPhone || order.telefone || lead?.telefone;
  if (!phone || !message) return { sent: false, reason: 'missing_phone_or_message' };

  const ok = await sendText(instanceName, phone, message);

  if (ok && order.leadId) {
    await db.collection('messages').add({
      conteudo: message,
      createdAt: Timestamp.now(),
      empresaId: companyId,
      leadId: order.leadId,
      role: 'assistente',
      tipo: 'conversation',
    });
  }

  return { sent: ok, reason: ok ? undefined : 'evolution_failed' };
}
