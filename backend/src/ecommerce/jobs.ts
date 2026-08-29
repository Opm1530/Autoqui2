// Jobs periódicos do e-commerce (não chegam por webhook). Portado do EcoQui.
//  - carrinho abandonado (30/30min), boleto/PIX (15/15min), reengajamento (09h)
//  - avaliação pós-compra agendada (doc ecommerce_scheduled) — a cada 10min
import cron from 'node-cron';
import { Timestamp } from 'firebase-admin/firestore';
import { db } from '../firebase.js';
import { getAbandonedCheckouts, listPendingOrders, listCustomers, extractPhone, extractName, extractProducts, formatTotal } from './nuvemshop.js';
import { getAutomationByTrigger, wasSentEver, markSent, sendAutomation } from './automations.js';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const logErr = (e: any) => console.error('[ecommerce/jobs]', e?.message);

async function activeIntegrations() {
  const snap = await db.collection('ecommerce_integrations').where('active', '==', true).get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as any[];
}

export function startEcommerceJobs() {
  cron.schedule('*/30 * * * *', () => runAbandonedCart().catch(logErr));
  cron.schedule('*/15 * * * *', () => runBoleto().catch(logErr));
  cron.schedule('0 9 * * *', () => runReengagement().catch(logErr));
  cron.schedule('*/10 * * * *', () => runScheduled().catch(logErr));
  console.log('[ecommerce] jobs iniciados (carrinho/boleto/reengajamento/agendados)');
}

// ── Carrinho abandonado ──
async function runAbandonedCart() {
  for (const it of await activeIntegrations()) {
    const automation = await getAutomationByTrigger(it.companyId, 'carrinho_abandonado');
    if (automation) await processCarts(it, automation);
    await sleep(2000);
  }
}
async function processCarts(it: any, automation: any) {
  const delayMs = (automation.delayMinutes || 60) * 60 * 1000;
  const now = Date.now();
  const carts = await getAbandonedCheckouts(it.storeId, it.accessToken, new Date(now - 24 * 3600 * 1000).toISOString(), new Date(now - delayMs).toISOString());
  for (const cart of carts) {
    const cartId = String(cart.id);
    const phone = extractPhone(cart);
    if (!phone || await wasSentEver(it.companyId, cartId, 'carrinho_abandonado')) continue;
    try {
      await sendAutomation(automation, phone, {
        nome: extractName(cart).split(' ')[0], produtos: extractProducts(cart), total: formatTotal(cart.total || cart.subtotal),
        link_carrinho: cart.abandoned_checkout_url || cart.checkout_url || '', loja: it.storeName || 'nossa loja',
      });
      await markSent(it.companyId, cartId, 'carrinho_abandonado', phone);
    } catch (e) { logErr(e); }
    await sleep(800);
  }
}

// ── Lembrete boleto/PIX ──
async function runBoleto() {
  for (const it of await activeIntegrations()) {
    const automation = await getAutomationByTrigger(it.companyId, 'boleto_lembrete');
    if (automation) await processBoleto(it, automation);
    await sleep(1500);
  }
}
async function processBoleto(it: any, automation: any) {
  const cutoff = new Date(Date.now() - (automation.delayMinutes || 1440) * 60 * 1000).toISOString();
  const orders = await listPendingOrders(it.storeId, it.accessToken, cutoff);
  for (const order of orders) {
    const method = (order.payment_details?.method || '').toLowerCase();
    if (!method.includes('boleto') && !method.includes('pix')) continue;
    const orderId = String(order.id);
    const phone = extractPhone(order);
    if (!phone || await wasSentEver(it.companyId, orderId, 'boleto_lembrete')) continue;
    const isPix = method.includes('pix');
    try {
      await sendAutomation(automation, phone, {
        nome: extractName(order).split(' ')[0], total: formatTotal(order.total), numero_pedido: String(order.number || orderId),
        loja: it.storeName || 'nossa loja', chave_pix: isPix ? (order.payment_details?.barcode || '') : '',
        link_pagamento: order.payment_details?.external_resource_url || order.payment_details?.ticket_url || '', tipo_pagamento: isPix ? 'PIX' : 'boleto',
      });
      await markSent(it.companyId, orderId, 'boleto_lembrete', phone);
    } catch (e) { logErr(e); }
    await sleep(600);
  }
}

// ── Reengajamento ──
async function runReengagement() {
  for (const it of await activeIntegrations()) {
    const automation = await getAutomationByTrigger(it.companyId, 'reengajamento');
    if (automation) await processReengagement(it, automation);
    await sleep(3000);
  }
}
async function processReengagement(it: any, automation: any) {
  const days = Math.floor((automation.delayMinutes || 43200) / 1440);
  const customers = await listCustomers(it.storeId, it.accessToken, new Date(Date.now() - days * 24 * 3600 * 1000).toISOString());
  for (const c of customers) {
    const customerId = String(c.id);
    const phone = (c.phone || '').replace(/\D/g, '');
    if (!phone || await wasSentEver(it.companyId, customerId, 'reengajamento')) continue;
    const last = c.last_order_id ? new Date(c.updated_at) : null;
    const dias = last ? Math.floor((Date.now() - last.getTime()) / 86400000) : days;
    try {
      await sendAutomation(automation, phone, { nome: (c.first_name || c.name || 'Cliente').split(' ')[0], dias_sem_comprar: String(dias), loja: it.storeName || 'nossa loja' });
      await markSent(it.companyId, customerId, 'reengajamento', phone);
    } catch (e) { logErr(e); }
    await sleep(800);
  }
}

// ── Avaliação pós-compra agendada (docs ecommerce_scheduled prontos) ──
async function runScheduled() {
  const snap = await db.collection('ecommerce_scheduled').where('done', '==', false).where('runAt', '<=', Timestamp.now()).limit(100).get();
  for (const doc of snap.docs) {
    const s = doc.data() as any;
    try {
      if (!(await wasSentEver(s.companyId, s.orderId, s.trigger))) {
        const automation = await getAutomationByTrigger(s.companyId, s.trigger);
        if (automation && s.phone) {
          await sendAutomation(automation, s.phone, s.vars || {});
          await markSent(s.companyId, s.orderId, s.trigger, s.phone);
        }
      }
      await doc.ref.update({ done: true });
    } catch (e) { logErr(e); }
    await sleep(500);
  }
}
