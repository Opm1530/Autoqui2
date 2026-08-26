// Automações de WhatsApp do e-commerce. Portado do EcoQui.
// CRUD autenticado (companyId do loadUser) + helpers de envio/dedupe usados
// pelo webhook e pelos crons.
import { Timestamp } from 'firebase-admin/firestore';
import { db } from '../firebase.js';
import { loadUser } from '../currentUser.js';
import { sendText } from '../evolution.js';

// Gatilhos suportados (o front oferece esses).
export const TRIGGERS = [
  'pedido_confirmado', 'pagamento_aprovado', 'pedido_enviado', 'avaliacao_pos_compra',
  'carrinho_abandonado', 'boleto_lembrete', 'reengajamento',
];

async function companyOf(uid: string): Promise<string> {
  const user = await loadUser(uid);
  if (user.role !== 'owner' && user.role !== 'admin') throw new Error('forbidden');
  if (!user.companyId) throw new Error('no_company');
  return user.companyId;
}

export async function getAutomations(uid: string) {
  const companyId = await companyOf(uid);
  const snap = await db.collection('ecommerce_automations').where('companyId', '==', companyId).get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function saveAutomation(uid: string, body: any) {
  const companyId = await companyOf(uid);
  const trigger = String(body?.trigger || '');
  const messageTemplate = String(body?.messageTemplate || '');
  const whatsappInstance = String(body?.whatsappInstance || '');
  if (!TRIGGERS.includes(trigger)) throw new Error('trigger_invalido');
  if (!messageTemplate || !whatsappInstance) throw new Error('template e instancia obrigatorios');

  const data = {
    companyId, trigger,
    enabled: body?.enabled !== false,
    delayMinutes: Number(body?.delayMinutes) || 0,
    messageTemplate, whatsappInstance,
    updatedAt: Timestamp.now(),
  };
  const snap = await db.collection('ecommerce_automations').where('companyId', '==', companyId).where('trigger', '==', trigger).limit(1).get();
  if (!snap.empty) { await snap.docs[0].ref.update(data); return { ok: true, id: snap.docs[0].id }; }
  const ref = await db.collection('ecommerce_automations').add({ ...data, createdAt: Timestamp.now() });
  return { ok: true, id: ref.id };
}

export async function deleteAutomation(uid: string, trigger: string) {
  const companyId = await companyOf(uid);
  const snap = await db.collection('ecommerce_automations').where('companyId', '==', companyId).where('trigger', '==', trigger).get();
  for (const d of snap.docs) await d.ref.delete();
  return { ok: true };
}

// ── Helpers usados pelo webhook/crons (companyId já resolvido internamente) ──

export async function getAutomationByTrigger(companyId: string, trigger: string): Promise<any | null> {
  const snap = await db.collection('ecommerce_automations')
    .where('companyId', '==', companyId).where('trigger', '==', trigger).where('enabled', '==', true).limit(1).get();
  return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
}

// Dedupe: id determinístico companyId_entityId_trigger.
export async function wasSentRecently(companyId: string, entityId: string, trigger: string, ttlHours = 48): Promise<boolean> {
  const doc = await db.collection('ecommerce_sent_events').doc(`${companyId}_${entityId}_${trigger}`).get();
  if (!doc.exists) return false;
  const sentAt = doc.data()?.sentAt;
  const ms = sentAt?.toMillis ? sentAt.toMillis() : 0;
  return ms > 0 && (Date.now() - ms) / 3600000 < ttlHours;
}

export async function markSent(companyId: string, entityId: string, trigger: string, phone: string) {
  await db.collection('ecommerce_sent_events').doc(`${companyId}_${entityId}_${trigger}`).set({
    companyId, orderId: String(entityId), trigger, phone, sentAt: Timestamp.now(),
  });
}

export function applyTemplate(template: string, vars: Record<string, string>): string {
  return template
    .replace(/\{\{nome\}\}/gi, vars.nome || 'Cliente')
    .replace(/\{\{produtos\}\}/gi, vars.produtos || '')
    .replace(/\{\{total\}\}/gi, vars.total || '')
    .replace(/\{\{rastreio\}\}/gi, vars.rastreio || '')
    .replace(/\{\{url_rastreio\}\}/gi, vars.url_rastreio || '')
    .replace(/\{\{link_carrinho\}\}/gi, vars.link_carrinho || '')
    .replace(/\{\{numero_pedido\}\}/gi, vars.numero_pedido || '')
    .replace(/\{\{loja\}\}/gi, vars.loja || 'nossa loja')
    .replace(/\{\{dias_sem_comprar\}\}/gi, vars.dias_sem_comprar || '')
    .replace(/\{\{chave_pix\}\}/gi, vars.chave_pix || '')
    .replace(/\{\{link_pagamento\}\}/gi, vars.link_pagamento || '')
    .replace(/\{\{tipo_pagamento\}\}/gi, vars.tipo_pagamento || '');
}

export async function sendAutomation(automation: any, phone: string, vars: Record<string, string>): Promise<void> {
  const msg = applyTemplate(automation.messageTemplate, vars);
  await sendText(automation.whatsappInstance, phone.replace(/\D/g, ''), msg);
  console.log(`[ecommerce] automação ${automation.trigger} -> ${phone.replace(/\D/g, '')}`);
}
