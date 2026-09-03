// Métricas da Vitrine — funil de acessos, cliques, idas pro WhatsApp e leads.
// Coleta leve: cada evento incrementa contadores num doc diário por empresa
// (vitrine_daily/{empresaId}__{dia}). Sem varredura de coleção, poucas leituras.
import { FieldValue } from 'firebase-admin/firestore';
import { db, getAll } from './firebase.js';
import { loadUser } from './currentUser.js';

const TIPOS = new Set(['view', 'produto', 'whatsapp', 'lp_view', 'lp_cta', 'cart_add', 'checkout', 'pay_start', 'links_view', 'links_click']);
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
  if (tipo === 'lp_view' && body?.firstToday) inc['lpUnique'] = FieldValue.increment(1);
  if (tipo === 'links_view' && body?.firstToday) inc['linksUnique'] = FieldValue.increment(1);
  // Cliques por produto (mapa produtoId → contagem).
  if (tipo === 'produto' && body?.produtoId) inc[`prod.${String(body.produtoId).replace(/[.#$/[\]]/g, '_')}`] = FieldValue.increment(1);
  // Cliques por link da página de links (mapa linkId → contagem).
  if (tipo === 'links_click' && body?.linkId) inc[`link.${String(body.linkId).replace(/[.#$/[\]]/g, '_')}`] = FieldValue.increment(1);

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

// Funil de conversão do catálogo: carrinho → checkout → pagamento → comprou → recomprou.
const funnelCache = new Map<string, { at: number; data: any }>();
// Converte o período pedido em: lista de dias (YYYY-MM-DD) + janela [startMs, endMs).
function rangeWindow(rangeRaw: string): { range: string; dias: string[]; startMs: number; endMs: number } {
  const range = ['hoje', 'ontem', '7', '30'].includes(rangeRaw) ? rangeRaw : '30';
  const DAY = 86400000;
  const meiaNoite = (ms: number) => { const d = new Date(ms); d.setHours(0, 0, 0, 0); return d.getTime(); };
  const hojeIni = meiaNoite(Date.now());
  if (range === 'hoje') return { range, dias: [diaOf(hojeIni)], startMs: hojeIni, endMs: Date.now() };
  if (range === 'ontem') return { range, dias: [diaOf(hojeIni - DAY)], startMs: hojeIni - DAY, endMs: hojeIni };
  const n = range === '7' ? 7 : 30;
  const dias: string[] = [];
  for (let i = 0; i < n; i++) dias.push(diaOf(Date.now() - i * DAY));
  return { range, dias, startMs: Date.now() - n * DAY, endMs: Date.now() };
}

export async function getCatalogFunnel(uid: string, rangeRaw: string) {
  const companyId = await companyOf(uid);
  const { range, dias, startMs, endMs } = rangeWindow(rangeRaw);
  const key = `${companyId}:${range}`;
  const hit = funnelCache.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.data;

  // Eventos rastreados (acesso/carrinho/checkout/pagamento) do vitrine_daily.
  const refs = dias.map((d) => db.collection('vitrine_daily').doc(docId(companyId, d)));
  const snaps = await db.getAll(...refs);
  let acessou = 0, carrinho = 0, checkout = 0, pagamento = 0;
  snaps.forEach((s) => { const d = (s.exists ? s.data() : {}) as any; acessou += Number(d.view || 0); carrinho += Number(d.cart_add || 0); checkout += Number(d.checkout || 0); pagamento += Number(d.pay_start || 0); });

  // Comprou / recomprou a partir dos pedidos (recompra = cliente com pedido anterior).
  const orders = await getAll('pedidos', [{ field: 'empresaId', operator: '==', value: companyId }]).catch(() => []);
  const dated = orders
    .map((o: any) => ({ phone: String(o.clientPhone || o.telefone || '').replace(/\D/g, ''), ms: new Date(o.criadoEm || o.createdAt || 0).getTime() }))
    .filter((o: any) => o.phone)
    .sort((a: any, b: any) => a.ms - b.ms);
  const vistos = new Set<string>();
  let comprou = 0, recomprou = 0;
  for (const o of dated) {
    const repeat = vistos.has(o.phone);
    vistos.add(o.phone);
    if (o.ms >= startMs && o.ms < endMs) { comprou++; if (repeat) recomprou++; }
  }

  const data = { range, acessou, carrinho, checkout, pagamento, comprou, recomprou };
  funnelCache.set(key, { at: Date.now(), data });
  return data;
}

// Métricas do funil da Landing Page (FarmaQui): visitas → cliques no WhatsApp → leads.
const lpCache = new Map<string, { at: number; data: any }>();
export async function getLandingMetrics(uid: string, daysRaw: number) {
  const companyId = await companyOf(uid);
  const days = [7, 30, 90].includes(daysRaw) ? daysRaw : 30;
  const key = `${companyId}:${days}`;
  const hit = lpCache.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.data;

  const dias: string[] = [];
  for (let i = 0; i < days; i++) dias.push(diaOf(Date.now() - i * 86400000));
  const refs = dias.map((d) => db.collection('vitrine_daily').doc(docId(companyId, d)));
  const snaps = await db.getAll(...refs);

  let views = 0, uniques = 0, cliques = 0;
  const serie: { dia: string; views: number; cliques: number }[] = [];
  snaps.forEach((s, i) => {
    const d = (s.exists ? s.data() : {}) as any;
    const v = Number(d.lp_view || 0), c = Number(d.lp_cta || 0);
    views += v; uniques += Number(d.lpUnique || 0); cliques += c;
    serie.push({ dia: dias[i], views: v, cliques: c });
  });
  serie.reverse();

  // Leads capturados no período (a LP leva pro WhatsApp, que captura o lead).
  const leadsAll = await getAll('leads', [{ field: 'empresaId', operator: '==', value: companyId }]).catch(() => []);
  const cutoff = Date.now() - days * 86400000;
  const leadsPeriodo = leadsAll.filter((l: any) => new Date(l.criadoEm || l.ultimoContato || 0).getTime() >= cutoff).length;

  const conversao = views > 0 ? Math.round((cliques / views) * 1000) / 10 : 0;
  const data = { days, views, uniques, cliques, leadsPeriodo, leadsTotal: leadsAll.length, conversao, serie };
  lpCache.set(key, { at: Date.now(), data });
  return data;
}

// Métricas da Página de Links (estilo Linktree): visitas → cliques por link.
const linksCache = new Map<string, { at: number; data: any }>();
export async function getLinksMetrics(uid: string, daysRaw: number) {
  const companyId = await companyOf(uid);
  const days = [7, 30, 90].includes(daysRaw) ? daysRaw : 30;
  const key = `${companyId}:${days}`;
  const hit = linksCache.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.data;

  const dias: string[] = [];
  for (let i = 0; i < days; i++) dias.push(diaOf(Date.now() - i * 86400000));
  const refs = dias.map((d) => db.collection('vitrine_daily').doc(docId(companyId, d)));
  const snaps = await db.getAll(...refs);

  let views = 0, uniques = 0, cliques = 0;
  const linkClicks: Record<string, number> = {};
  const serie: { dia: string; views: number; cliques: number }[] = [];
  snaps.forEach((s, i) => {
    const d = (s.exists ? s.data() : {}) as any;
    const v = Number(d.links_view || 0), c = Number(d.links_click || 0);
    views += v; uniques += Number(d.linksUnique || 0); cliques += c;
    Object.entries(d.link || {}).forEach(([lid, n]) => { linkClicks[lid] = (linkClicks[lid] || 0) + Number(n); });
    serie.push({ dia: dias[i], views: v, cliques: c });
  });
  serie.reverse();

  // Resolve os títulos dos links a partir da config (loja_config.linksPage.links).
  const topIds = Object.entries(linkClicks).sort((a, b) => b[1] - a[1]).slice(0, 6);
  let topLinks: { titulo: string; cliques: number }[] = [];
  if (topIds.length) {
    const cfgs = await getAll('loja_config', [{ field: 'empresaId', operator: '==', value: companyId }]).catch(() => []);
    const nameById = new Map<string, string>();
    (cfgs as any[]).forEach((c) => (c?.linksPage?.links || []).forEach((l: any) => {
      if (l?.id) nameById.set(String(l.id).replace(/[.#$/[\]]/g, '_'), l.titulo || 'Link');
    }));
    topLinks = topIds.map(([id, c]) => ({ titulo: nameById.get(id) || 'Link', cliques: c }));
  }

  const conversao = views > 0 ? Math.round((cliques / views) * 1000) / 10 : 0;
  const data = { days, views, uniques, cliques, conversao, serie, topLinks };
  linksCache.set(key, { at: Date.now(), data });
  return data;
}
