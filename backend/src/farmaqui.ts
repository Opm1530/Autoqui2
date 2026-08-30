// FarmaQui — CRM de relacionamento (marca pra farmácias).
// Fase A: captura automática de leads a partir das mensagens recebidas no WhatsApp.
import { db, getAll } from './firebase.js';
import { loadUser } from './currentUser.js';
import { PUBLIC_BASE_URL } from './config.js';
import { setWebhook } from './evolution.js';
import { assertInstanceOwner } from './waInstances.js';

const incomingUrl = (companyId: string) => `${PUBLIC_BASE_URL}/api/wa/incoming/${companyId}`;

// Cria/atualiza um lead a partir de uma mensagem recebida. Dedupe por telefone.
async function upsertLeadFromMessage(companyId: string, phone: string, name: string, message: string) {
  let cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length === 13 && cleanPhone.startsWith('55')) cleanPhone = cleanPhone.substring(2);
  if (!cleanPhone) return;

  const now = new Date().toISOString();
  let leads = await getAll('leads', [
    { field: 'empresaId', operator: '==', value: companyId },
    { field: 'whatsapp', operator: '==', value: cleanPhone },
  ]);
  if (leads.length === 0) {
    leads = await getAll('leads', [
      { field: 'empresaId', operator: '==', value: companyId },
      { field: 'telefone', operator: '==', value: cleanPhone },
    ]);
  }
  const existing = leads[0];
  if (existing) {
    await db.collection('leads').doc(existing.id).update({ ultimaMensagem: message.slice(0, 500), ultimoContato: now, updatedAt: now });
    return;
  }
  await db.collection('leads').add({
    nome: name || cleanPhone,
    telefone: cleanPhone,
    whatsapp: cleanPhone,
    empresaId: companyId,
    origem: 'whatsapp',
    statusLead: 'lead',
    ultimaMensagem: message.slice(0, 500),
    ultimoContato: now,
    criadoEm: now,
  });
}

// Webhook do Evolution (MESSAGES_UPSERT). Só mensagens RECEBIDAS de contato individual.
export async function handleIncoming(companyId: string, payload: any): Promise<void> {
  const data = Array.isArray(payload?.data) ? payload.data[0] : payload?.data || payload;
  const key = data?.key || {};
  if (!key.remoteJid || key.fromMe) return;                 // só recebidas
  if (String(key.remoteJid).endsWith('@g.us')) return;      // ignora grupos
  const phone = String(key.remoteJid).split('@')[0];
  const name = data.pushName || '';
  const msg = data.message?.conversation || data.message?.extendedTextMessage?.text || data.message?.imageMessage?.caption || '';
  await upsertLeadFromMessage(companyId, phone, name, msg);
}

// ── Painel (autenticado) ──
async function companyOf(uid: string): Promise<string> {
  const user = await loadUser(uid);
  if (user.role !== 'owner' && user.role !== 'admin') throw new Error('forbidden');
  if (!user.companyId) throw new Error('no_company');
  return user.companyId;
}

// Liga a captura: aponta o webhook da instância pro nosso endpoint e marca na empresa.
export async function activateCapture(uid: string, instanceName: string) {
  const companyId = await companyOf(uid);
  await assertInstanceOwner(uid, instanceName); // valida posse
  const ok = await setWebhook(instanceName, incomingUrl(companyId), true);
  if (!ok) throw new Error('falha_ao_configurar_webhook');
  await db.collection('companies').doc(companyId).set({ farmaqui: { capturaInstancia: instanceName, capturaAtiva: true, atualizadoEm: new Date().toISOString() } }, { merge: true });
  return { ok: true };
}

export async function captureStatus(uid: string) {
  const companyId = await companyOf(uid);
  const doc = await db.collection('companies').doc(companyId).get();
  const f = (doc.data() as any)?.farmaqui || {};
  return { ativa: !!f.capturaAtiva, instancia: f.capturaInstancia || '' };
}
