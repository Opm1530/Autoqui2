// Recebe os webhooks da NuvemShop e dispara as automações por evento.
import { Timestamp } from 'firebase-admin/firestore';
import { db } from '../firebase.js';
import { getIntegration } from './integrations.js';
import { getOrder, extractPhone, extractName, extractProducts, formatTotal } from './nuvemshop.js';
import { getAutomationByTrigger, wasSentRecently, markSent, sendAutomation } from './automations.js';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const EVENT_TRIGGER: Record<string, string | null> = {
  'order/created': 'pedido_confirmado',
  'order/paid': 'pagamento_aprovado',
  'order/packed': null,
  'order/fulfilled': 'pedido_enviado',
  'order/updated': null,
  'order/cancelled': null,
};

export async function processEcommerceEvent(companyId: string, event: string, payload: any): Promise<void> {
  const integration = await getIntegration(companyId);
  if (!integration) return;

  const orderId = String(payload.id);
  const trigger = EVENT_TRIGGER[event];
  if (trigger === undefined) return; // evento desconhecido
  if (!trigger) return;              // mapeado, mas sem automação (updated/packed/cancelled)

  if (await wasSentRecently(companyId, orderId, trigger)) return;
  const automation = await getAutomationByTrigger(companyId, trigger);
  if (!automation) return;

  // Payload da NuvemShop é resumido — busca o pedido completo se faltar telefone.
  let order = payload;
  if (!extractPhone(payload)) {
    const full = await getOrder(integration.storeId, integration.accessToken, orderId);
    if (full) order = full;
  }

  const phone = extractPhone(order);
  if (!phone) { console.warn(`[ecommerce] pedido ${orderId}: telefone não encontrado`); return; }

  const nome = extractName(order).split(' ')[0];
  const numero_pedido = String(order.number || orderId);
  const loja = integration.storeName || 'nossa loja';

  let rastreio = '', url_rastreio = '';
  if (trigger === 'pedido_enviado') {
    const cod = order.shipping_tracking_number || order.shipping?.number || '';
    rastreio = cod || 'em processamento';
    url_rastreio = cod ? `https://rastreamento.correios.com.br/app/index.php?objetos=${cod}` : '';
  }

  const vars = { nome, produtos: extractProducts(order), total: formatTotal(order.total || order.subtotal), rastreio, url_rastreio, numero_pedido, loja };

  // Delay opcional (roda em background — o webhook já respondeu 200).
  if (automation.delayMinutes > 0) await sleep(automation.delayMinutes * 60 * 1000);

  try {
    await sendAutomation(automation, phone, vars);
    await markSent(companyId, orderId, trigger, phone);
    // Avaliação pós-compra: agenda 2 dias depois (doc persistente; processado por cron na Fase 2b).
    if (trigger === 'pedido_enviado') {
      await db.collection('ecommerce_scheduled').doc(`${companyId}_${orderId}_avaliacao_pos_compra`).set({
        companyId, orderId, trigger: 'avaliacao_pos_compra', phone,
        vars: { nome, loja, produtos: vars.produtos, numero_pedido },
        runAt: Timestamp.fromMillis(Date.now() + 2 * 24 * 60 * 60 * 1000), done: false,
      });
    }
  } catch (err: any) {
    console.error(`[ecommerce] erro ao enviar ${trigger}: ${err?.message}`);
  }
}
