// Dispatcher de campanhas (disparo em massa no WhatsApp).
// Varre a coleção `campanhas` com status 'agendada' vencidas, envia a cada lead
// com intervalo aleatório (anti-ban), substitui variáveis, revalida descadastro,
// respeita cancelamento e checa se a instância está online.
import cron from 'node-cron';
import { Timestamp } from 'firebase-admin/firestore';
import { db } from './firebase.js';
import { sendText, getInstanceStatus } from './evolution.js';
import { sentToday, dailyLimit } from './waHealth.js';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const randSec = (min: number, max: number) => Math.floor(min + Math.random() * Math.max(0, max - min));
const running = new Set<string>();

// Substitui as variáveis suportadas ({{nome}}, {{telefone}}, {{endereco}}).
function fillVars(tpl: string, lead: any, phone: string): string {
  const primeiroNome = String(lead?.nome || '').split(' ')[0] || 'tudo bem';
  return String(tpl || '')
    .replace(/\{\{\s*nome\s*\}\}/gi, primeiroNome)
    .replace(/\{\{\s*telefone\s*\}\}/gi, phone)
    .replace(/\{\{\s*endereco\s*\}\}/gi, String(lead?.endereco || ''));
}

async function runCampaign(id: string) {
  const ref = db.collection('campanhas').doc(id);
  const snap = await ref.get();
  if (!snap.exists) return;
  const c = snap.data() as any;
  if (c.status !== 'agendada') return; // outra execução já pegou

  // Resolve o nome da instância (Evolution usa o nome).
  let instanceName = '';
  if (c.instancia_id) {
    const inst = await db.collection('instancias').doc(String(c.instancia_id)).get();
    instanceName = (inst.data() as any)?.nome || '';
  }
  if (!instanceName) { await ref.update({ status: 'erro', ultimoErro: 'instancia_nao_encontrada' }); return; }

  // Instância precisa estar conectada; senão tenta de novo depois (até 10x).
  const st = await getInstanceStatus(instanceName).catch(() => ({ connected: false, state: 'close' }));
  if (!st.connected) {
    const tent = (c.tentativas || 0) + 1;
    await ref.update(tent >= 10 ? { status: 'erro', ultimoErro: 'instancia_desconectada' } : { tentativas: tent, ultimoErro: 'instancia_desconectada' });
    return;
  }

  await ref.update({ status: 'processando', data_inicio: new Date().toISOString() });

  const mensagens: string[] = (Array.isArray(c.mensagens) ? c.mensagens : []).filter((m: string) => m && m.trim());
  const ids: string[] = Array.isArray(c.lead_ids) ? c.lead_ids : [];
  const dMin = Number(c.config?.delay_min) || 20;
  const dMax = Math.max(dMin, Number(c.config?.delay_max) || 60);
  let enviados = 0, falhas = 0;

  // Limite diário do número (anti-ban): pausa e reagenda para amanhã se estourar.
  const limite = await dailyLimit(instanceName);
  let enviadosHoje = await sentToday(instanceName);

  for (let i = 0; i < ids.length; i++) {
    // Respeita cancelamento feito pelo painel.
    const cur = await ref.get();
    if ((cur.data() as any)?.status === 'cancelada') return;

    if (enviadosHoje >= limite) {
      const amanha = new Date(); amanha.setDate(amanha.getDate() + 1); amanha.setHours(9, 0, 0, 0);
      // Remove os já processados e reagenda o restante para amanhã.
      await ref.update({ status: 'agendada', agendamento_imediato: false, data_agendamento: Timestamp.fromMillis(amanha.getTime()), lead_ids: ids.slice(i), ultimoErro: 'limite_diario_atingido' });
      return;
    }

    const leadSnap = await db.collection('leads').doc(String(ids[i])).get();
    const lead = leadSnap.exists ? (leadSnap.data() as any) : null;
    const phone = String(lead?.telefone || lead?.whatsapp || '').replace(/\D/g, '');

    // LGPD: não envia para descadastrado (revalidado no momento do envio).
    if (!lead || lead.descadastrado || !phone) { falhas++; await ref.update({ falhas }); continue; }

    const tpl = mensagens.length ? mensagens[Math.floor(Math.random() * mensagens.length)] : '';
    const msg = fillVars(tpl, lead, phone);
    const ok = msg.trim() ? await sendText(instanceName, phone, msg) : false;
    if (ok) { enviados++; enviadosHoje++; } else falhas++;
    await ref.update({ enviados, falhas });

    // Intervalo anti-ban entre envios (menos após o último).
    if (i < ids.length - 1) await sleep(randSec(dMin, dMax) * 1000);
  }

  const final = await ref.get();
  if ((final.data() as any)?.status !== 'cancelada') {
    await ref.update({ status: 'finalizada', data_fim: new Date().toISOString() });
  }
}

async function processCampaigns() {
  const now = Date.now();
  const snap = await db.collection('campanhas').where('status', '==', 'agendada').limit(20).get();
  for (const doc of snap.docs) {
    const c = doc.data() as any;
    const dueMs = c.data_agendamento?.toMillis ? c.data_agendamento.toMillis() : (typeof c.data_agendamento === 'number' ? c.data_agendamento : 0);
    if (!c.agendamento_imediato && dueMs && dueMs > now) continue; // agendada para o futuro
    if (running.has(doc.id)) continue;
    running.add(doc.id);
    runCampaign(doc.id)
      .catch((e) => console.error('[campaigns] erro', doc.id, e?.message))
      .finally(() => running.delete(doc.id));
  }
}

export function startCampaignJobs() {
  cron.schedule('* * * * *', () => processCampaigns().catch((e) => console.error('[campaigns/jobs]', e?.message)));
  console.log('[campaigns] dispatcher iniciado (varre agendadas a cada 1 min)');
}
