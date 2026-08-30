// FarmaQui — CRM de relacionamento (marca pra farmácias).
// Fase A: captura automática de leads a partir das mensagens recebidas no WhatsApp.
import cron from 'node-cron';
import { Timestamp } from 'firebase-admin/firestore';
import { db, getAll } from './firebase.js';
import { loadUser } from './currentUser.js';
import { PUBLIC_BASE_URL } from './config.js';
import { setWebhook, sendText } from './evolution.js';
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

const DEFAULT_RECOMPRA = { enabled: false, mensagem: 'Olá {{nome}}! 💊 Já faz um tempinho da sua última compra. Precisa repor algum remédio? É só me chamar por aqui!', cicloDiasPadrao: 30 };

export async function getConfig(uid: string) {
  const companyId = await companyOf(uid);
  const doc = await db.collection('companies').doc(companyId).get();
  const f = (doc.data() as any)?.farmaqui || {};
  return { capturaAtiva: !!f.capturaAtiva, capturaInstancia: f.capturaInstancia || '', recompra: { ...DEFAULT_RECOMPRA, ...(f.recompra || {}) } };
}

export async function saveRecompra(uid: string, body: any) {
  const companyId = await companyOf(uid);
  const recompra = { enabled: body?.enabled !== false, mensagem: String(body?.mensagem || ''), cicloDiasPadrao: Number(body?.cicloDiasPadrao) || 30 };
  if (recompra.enabled && !recompra.mensagem.trim()) throw new Error('mensagem_obrigatoria');
  await db.collection('companies').doc(companyId).set({ farmaqui: { recompra } }, { merge: true });
  return { ok: true };
}

// Registra a última compra do lead e agenda o lembrete de recompra.
export async function setUltimaCompra(uid: string, leadId: string, dataISO: string, cicloDias: number) {
  const companyId = await companyOf(uid);
  const leadRef = db.collection('leads').doc(leadId);
  const lead = await leadRef.get();
  if (!lead.exists || (lead.data() as any).empresaId !== companyId) throw new Error('lead_nao_encontrado');
  const ciclo = Number(cicloDias) || 30;
  const dataMs = dataISO ? new Date(dataISO).getTime() : Date.now();
  const data = new Date(dataMs).toISOString();
  await leadRef.update({ ultimaCompra: data, cicloRecompraDias: ciclo, statusLead: 'cliente_ativo', updatedAt: new Date().toISOString() });

  const company = await db.collection('companies').doc(companyId).get();
  const f = (company.data() as any)?.farmaqui || {};
  const phone = (lead.data() as any).telefone || (lead.data() as any).whatsapp || '';
  if (f.recompra?.enabled && phone) {
    await db.collection('farmaqui_scheduled').doc(leadId).set({
      companyId, leadId, phone, nome: String((lead.data() as any).nome || '').split(' ')[0],
      runAt: Timestamp.fromMillis(dataMs + ciclo * 86400000), done: false,
    });
  }
  return { ok: true, agendado: !!(f.recompra?.enabled && phone) };
}

// Cron: envia os lembretes de recompra vencidos.
async function processRecompra() {
  const snap = await db.collection('farmaqui_scheduled').where('done', '==', false).where('runAt', '<=', Timestamp.now()).limit(100).get();
  for (const doc of snap.docs) {
    const s = doc.data() as any;
    try {
      const company = await db.collection('companies').doc(s.companyId).get();
      const f = (company.data() as any)?.farmaqui || {};
      if (f.recompra?.enabled && f.capturaInstancia && s.phone) {
        const msg = String(f.recompra.mensagem || '').replace(/\{\{nome\}\}/gi, s.nome || 'tudo bem');
        await sendText(f.capturaInstancia, String(s.phone).replace(/\D/g, ''), msg);
      }
      await doc.ref.update({ done: true });
    } catch (e: any) { console.error('[farmaqui] recompra erro:', e?.message); }
  }
}

export function startFarmaquiJobs() {
  cron.schedule('0 * * * *', () => processRecompra().catch((e) => console.error('[farmaqui/jobs]', e?.message)));
  console.log('[farmaqui] jobs iniciados (recompra)');
}
