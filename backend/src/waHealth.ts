// Saúde/limite de envio por número (anti-ban): contador diário + limite com warm-up.
import { FieldValue } from 'firebase-admin/firestore';
import { db } from './firebase.js';

const TETO = 400;          // teto diário por número já aquecido
const WARMUP_START = 40;   // limite no 1º dia
const WARMUP_STEP = 40;    // +40 por dia de idade da instância

const hoje = () => new Date().toISOString().slice(0, 10);
const docId = (inst: string) => `${inst}__${hoje()}`;
const limitCache = new Map<string, { at: number; v: number }>();

// Incrementa o contador de envios do dia (chamado a cada mensagem enviada).
export async function incSent(instancia: string): Promise<void> {
  if (!instancia) return;
  try {
    await db.collection('wa_daily').doc(docId(instancia)).set(
      { instancia, dia: hoje(), enviados: FieldValue.increment(1), updatedAt: Date.now() },
      { merge: true },
    );
  } catch { /* contador é best-effort */ }
}

export async function sentToday(instancia: string): Promise<number> {
  if (!instancia) return 0;
  const s = await db.collection('wa_daily').doc(docId(instancia)).get().catch(() => null);
  return s?.exists ? Number((s.data() as any).enviados || 0) : 0;
}

// Limite diário com aquecimento pela idade da instância (cacheado 10 min).
export async function dailyLimit(instancia: string): Promise<number> {
  if (!instancia) return TETO;
  const c = limitCache.get(instancia);
  if (c && Date.now() - c.at < 600000) return c.v;
  let ageDays = 999;
  try {
    const q = await db.collection('instancias').where('nome', '==', instancia).limit(1).get();
    const d = q.docs[0]?.data() as any;
    const created = d?.criadoEm || d?.createdAt || d?.data_criacao;
    if (created) ageDays = Math.max(0, Math.floor((Date.now() - new Date(created).getTime()) / 86400000));
  } catch { /* usa teto */ }
  const v = Math.min(TETO, Math.max(WARMUP_START, WARMUP_START + WARMUP_STEP * ageDays));
  limitCache.set(instancia, { at: Date.now(), v });
  return v;
}
