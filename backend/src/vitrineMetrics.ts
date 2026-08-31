// Métricas da Vitrine — funil de acessos, cliques, idas pro WhatsApp e leads.
// Coleta leve: cada evento incrementa contadores num doc diário por empresa
// (vitrine_daily/{empresaId}__{dia}). Sem varredura de coleção, poucas leituras.
import { FieldValue } from 'firebase-admin/firestore';
import { db, getAll } from './firebase.js';
import { loadUser } from './currentUser.js';

const TIPOS = new Set(['view', 'produto', 'whatsapp']);
const diaOf = (ms: number) => new Date(ms).toISOString().slice(0, 10); // YYYY-MM-DD
const docId = (empresaId: string, dia: string) => `${empresaId}__${dia}`;

// ── Coleta (público, rate-limited) ──
export async function trackEvent(body: any) {
  const empresaId = String(body?.empresaId || '').trim();
  const tipo = String(body?.tipo || '').trim();
  if (!empresaId || !TIPOS.has(tipo)) return { ok: false };

  const now = Date.now();
  const dia = diaOf(now);
  const ref = db.collection('vitrine_daily').doc(docId(empresaId, dia));

  const inc: Record<string, any> = { [tipo]: FieldValue.increment(1) };
  // Visitante único do dia: o front sinaliza quando é a 1ª visita dele hoje.
  if (tipo === 'view' && body?.firstToday) inc['uniqueVisitors'] = FieldValue.increment(1);
  // Cliques por produto (mapa produtoId → contagem).
  if (tipo === 'produto' && body?.produtoId) inc[`prod.${String(body.produtoId).replace(/[.#$/[\]]/g, '_')}`] = FieldValue.increment(1);

  await ref.set({ empresaId, dia, lojaId: String(body?.lojaId || ''), updatedAt: now, ...inc }, { merge: true });
  return { ok: true };
}

// ── Leitura (painel, autenticado) com cache de 30 min ──
const cache = new Map<string, { at: number; data: any }>();
const TTL = 30 * 60 * 1000;

async function companyOf(uid: string): Promise<string> {
  const user = await loadUser(uid);
  if (!user.companyId) throw new Error('no_company');
  return user.companyId;
}

export async function getVitrineMetrics(uid: string, daysRaw: number) {
  const companyId = await companyOf(uid);
  const days = [7, 30, 90].includes(daysRaw) ? daysRaw : 30;
  const key = `${companyId}:${days}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.data;

  // Lista de dias do período e leitura direta dos docs (sem query composta).
  const dias: string[] = [];
  for (let i = 0; i < days; i++) dias.push(diaOf(Date.now() - i * 86400000));
  const refs = dias.map((d) => db.collection('vitrine_daily').doc(docId(companyId, d)));
  const snaps = await db.getAll(...refs);

  let views = 0, uniques = 0, cliquesProduto = 0, whatsapp = 0;
  const prod: Record<string, number> = {};
  const serie: { dia: string; views: number; whatsapp: number }[] = [];
  snaps.forEach((s, i) => {
    const d = (s.exists ? s.data() : {}) as any;
    const v = Number(d.view || 0), w = Number(d.whatsapp || 0);
    views += v; uniques += Number(d.uniqueVisitors || 0); cliquesProduto += Number(d.produto || 0); whatsapp += w;
    Object.entries(d.prod || {}).forEach(([pid, c]) => { prod[pid] = (prod[pid] || 0) + Number(c); });
    serie.push({ dia: dias[i], views: v, whatsapp: w });
  });
  serie.reverse(); // do mais antigo pro mais recente

  // Leads capturados pela vitrine (equality-only, filtra período em memória).
  const leadsAll = await getAll('leads', [
    { field: 'empresaId', operator: '==', value: companyId },
    { field: 'origem', operator: '==', value: 'vitrine' },
  ]).catch(() => []);
  const cutoff = Date.now() - days * 86400000;
  const leadsPeriodo = leadsAll.filter((l: any) => new Date(l.criadoEm || l.ultimoContato || 0).getTime() >= cutoff).length;

  // Top produtos clicados (resolve nomes).
  const topIds = Object.entries(prod).sort((a, b) => b[1] - a[1]).slice(0, 5);
  let topProdutos: { nome: string; cliques: number }[] = [];
  if (topIds.length) {
    const produtos = await getAll('products', [{ field: 'companyId', operator: '==', value: companyId }]).catch(() => []);
    const nameById = new Map(produtos.map((p: any) => [p.id, p.name || p.nome || 'Produto']));
    topProdutos = topIds.map(([id, c]) => ({ nome: (nameById.get(id) as string) || 'Produto', cliques: c }));
  }

  const conversao = views > 0 ? Math.round((whatsapp / views) * 1000) / 10 : 0; // % com 1 casa
  const data = {
    days,
    views, uniques, cliquesProduto, whatsapp,
    leadsTotal: leadsAll.length, leadsPeriodo,
    conversao, // whatsapp ÷ views (%)
    serie, topProdutos,
  };
  cache.set(key, { at: Date.now(), data });
  return data;
}
