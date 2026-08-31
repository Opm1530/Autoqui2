// FarmaQui — CRM de relacionamento (marca pra farmácias).
// Fase A: captura automática de leads a partir das mensagens recebidas no WhatsApp.
import cron from 'node-cron';
import { Timestamp } from 'firebase-admin/firestore';
import { db, getAll } from './firebase.js';
import { loadUser } from './currentUser.js';
import { PUBLIC_BASE_URL } from './config.js';
import { setWebhook, sendText } from './evolution.js';
import { assertInstanceOwner } from './waInstances.js';
import { normalizeSubdomain, setLandingSubdomain, removeLandingSubdomain } from './domains.js';

const incomingUrl = (companyId: string) => `${PUBLIC_BASE_URL}/api/wa/incoming/${companyId}`;

// Lê a config de captação de leads da empresa (novo formato genérico `leadCapture`,
// com fallback para o legado `farmaqui.captura*`).
async function readCapture(companyId: string): Promise<{ ativa: boolean; instancia: string; origem: string }> {
  const doc = await db.collection('companies').doc(companyId).get();
  const d = doc.data() as any || {};
  const lc = d.leadCapture;
  if (lc) return { ativa: !!lc.ativa, instancia: lc.instancia || '', origem: lc.origem || 'whatsapp' };
  const f = d.farmaqui || {};
  return { ativa: !!f.capturaAtiva, instancia: f.capturaInstancia || '', origem: 'whatsapp' };
}

// Cria/atualiza um lead a partir de uma mensagem recebida. Dedupe por telefone.
async function upsertLeadFromMessage(companyId: string, phone: string, name: string, message: string, origem = 'whatsapp') {
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
    origem,
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
  const cap = await readCapture(companyId);
  if (!cap.ativa) return; // captação desligada
  await upsertLeadFromMessage(companyId, phone, name, msg, cap.origem);
}

// ── Painel (autenticado) ──
async function companyOf(uid: string): Promise<string> {
  const user = await loadUser(uid);
  if (user.role !== 'owner' && user.role !== 'admin') throw new Error('forbidden');
  if (!user.companyId) throw new Error('no_company');
  return user.companyId;
}

// Liga a captura: aponta o webhook da instância pro nosso endpoint e marca na empresa.
// `origem` identifica de onde vieram os leads (whatsapp | vitrine | ...).
export async function activateCapture(uid: string, instanceName: string, origem = 'whatsapp') {
  const companyId = await companyOf(uid);
  await assertInstanceOwner(uid, instanceName); // valida posse
  const ok = await setWebhook(instanceName, incomingUrl(companyId), true);
  if (!ok) throw new Error('falha_ao_configurar_webhook');
  await db.collection('companies').doc(companyId).set({ leadCapture: { instancia: instanceName, ativa: true, origem, atualizadoEm: new Date().toISOString() } }, { merge: true });
  return { ok: true };
}

// Desliga a captura: desabilita o webhook e marca inativa.
export async function deactivateCapture(uid: string) {
  const companyId = await companyOf(uid);
  const cap = await readCapture(companyId);
  if (cap.instancia) { try { await setWebhook(cap.instancia, incomingUrl(companyId), false); } catch { /* ignore */ } }
  await db.collection('companies').doc(companyId).set({ leadCapture: { ativa: false, atualizadoEm: new Date().toISOString() } }, { merge: true });
  return { ok: true };
}

export async function captureStatus(uid: string) {
  const companyId = await companyOf(uid);
  const cap = await readCapture(companyId);
  return { ativa: cap.ativa, instancia: cap.instancia, origem: cap.origem };
}

const DEFAULT_RECOMPRA = { enabled: false, mensagem: 'Olá {{nome}}! 💊 Já faz um tempinho da sua última compra. Precisa repor algum remédio? É só me chamar por aqui!', cicloDiasPadrao: 30 };

export async function getConfig(uid: string) {
  const companyId = await companyOf(uid);
  const doc = await db.collection('companies').doc(companyId).get();
  const f = (doc.data() as any)?.farmaqui || {};
  const cap = await readCapture(companyId);
  return { capturaAtiva: cap.ativa, capturaInstancia: cap.instancia, recompra: { ...DEFAULT_RECOMPRA, ...(f.recompra || {}) } };
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

// ── Landing page (Google Ads / campanhas) ──
const DEFAULT_LANDING = {
  publicado: false,
  host: '',
  titulo: 'Sua farmácia de confiança',
  subtitulo: 'Atendimento rápido pelo WhatsApp, entrega no mesmo dia e os melhores preços da região.',
  corPrimaria: '#14b8a6',
  logoUrl: '',
  destaques: [
    { icone: '🚚', texto: 'Entrega no mesmo dia' },
    { icone: '💊', texto: 'Grande variedade de medicamentos' },
    { icone: '💬', texto: 'Atendimento humano no WhatsApp' },
  ],
  whatsapp: '',
  ctaTexto: 'Chamar no WhatsApp',
  mensagemWhatsapp: 'Olá! Vim pela página e gostaria de mais informações.',
  endereco: '',
};

export async function getLanding(uid: string) {
  const companyId = await companyOf(uid);
  const doc = await db.collection('companies').doc(companyId).get();
  const l = (doc.data() as any)?.farmaqui?.landing || {};
  return { ...DEFAULT_LANDING, ...l };
}

export async function saveLanding(uid: string, body: any) {
  const companyId = await companyOf(uid);
  const cur = await getLanding(uid);
  const landing = {
    ...cur,
    publicado: body?.publicado !== false,
    titulo: String(body?.titulo ?? cur.titulo),
    subtitulo: String(body?.subtitulo ?? cur.subtitulo),
    corPrimaria: String(body?.corPrimaria ?? cur.corPrimaria),
    logoUrl: String(body?.logoUrl ?? cur.logoUrl ?? ''),
    destaques: Array.isArray(body?.destaques) ? body.destaques.slice(0, 6).map((d: any) => ({ icone: String(d?.icone || '✅').slice(0, 4), texto: String(d?.texto || '').slice(0, 80) })) : cur.destaques,
    whatsapp: String(body?.whatsapp ?? cur.whatsapp ?? '').replace(/\D/g, ''),
    ctaTexto: String(body?.ctaTexto ?? cur.ctaTexto),
    mensagemWhatsapp: String(body?.mensagemWhatsapp ?? cur.mensagemWhatsapp ?? ''),
    endereco: String(body?.endereco ?? cur.endereco ?? ''),
  };
  await db.collection('companies').doc(companyId).set({ farmaqui: { landing } }, { merge: true });
  return { ok: true, landing };
}

// Vincula/troca o subdomínio da landing.
export async function setLandingHost(uid: string, subRaw: string) {
  const companyId = await companyOf(uid);
  const host = normalizeSubdomain(subRaw);
  const cur = await getLanding(uid);
  if (cur.host && cur.host !== host) await removeLandingSubdomain(uid, cur.host);
  await setLandingSubdomain(uid, host);
  await db.collection('companies').doc(companyId).set({ farmaqui: { landing: { host } } }, { merge: true });
  return { ok: true, host };
}

// Público: config da landing por companyId (pra renderização do host).
export async function publicLanding(companyId: string) {
  const doc = await db.collection('companies').doc(String(companyId)).get();
  const l = (doc.data() as any)?.farmaqui?.landing;
  if (!l || !l.publicado) return {};
  return { ...DEFAULT_LANDING, ...l };
}

// Cron: envia os lembretes de recompra vencidos.
async function processRecompra() {
  const snap = await db.collection('farmaqui_scheduled').where('done', '==', false).where('runAt', '<=', Timestamp.now()).limit(100).get();
  for (const doc of snap.docs) {
    const s = doc.data() as any;
    try {
      const company = await db.collection('companies').doc(s.companyId).get();
      const f = (company.data() as any)?.farmaqui || {};
      const cap = await readCapture(s.companyId);
      if (f.recompra?.enabled && cap.instancia && s.phone) {
        const msg = String(f.recompra.mensagem || '').replace(/\{\{nome\}\}/gi, s.nome || 'tudo bem');
        await sendText(cap.instancia, String(s.phone).replace(/\D/g, ''), msg);
      }
      await doc.ref.update({ done: true });
    } catch (e: any) { console.error('[farmaqui] recompra erro:', e?.message); }
  }
}

export function startFarmaquiJobs() {
  cron.schedule('0 * * * *', () => processRecompra().catch((e) => console.error('[farmaqui/jobs]', e?.message)));
  console.log('[farmaqui] jobs iniciados (recompra)');
}
