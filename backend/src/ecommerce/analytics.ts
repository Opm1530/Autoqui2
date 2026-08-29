// Analytics + CRM do e-commerce (leitura, com cache de 30 min). Portado do EcoQui.
import { Timestamp } from 'firebase-admin/firestore';
import { db } from '../firebase.js';
import { loadUser } from '../currentUser.js';
import { getIntegration } from './integrations.js';
import { listOrders } from './nuvemshop.js';

const CACHE_MS = 30 * 60 * 1000;

async function companyOf(uid: string): Promise<string> {
  const user = await loadUser(uid);
  if (!user.companyId) throw new Error('no_company');
  return user.companyId;
}

function clamp(v: any, min: number, max: number, def: number) {
  const n = parseInt(String(v ?? def), 10);
  return isNaN(n) ? def : Math.min(Math.max(n, min), max);
}

// Lê do cache ou recomputa via NuvemShop. `collection` = ecommerce_analytics | ecommerce_crm.
async function cachedCompute(companyId: string, collection: string, days: number, compute: (orders: any[]) => any) {
  const integration = await getIntegration(companyId);
  if (!integration) return { connected: false };
  const ref = db.collection(collection).doc(companyId);
  const snap = await ref.get();
  const cache: any = snap.exists ? snap.data() : {};
  const key = `d${days}`;
  const at = cache[key]?.computedAt?.toMillis?.() || 0;
  if (cache[key] && Date.now() - at < CACHE_MS) return { connected: true, cached: true, days, ...cache[key].data };

  const sinceISO = new Date(Date.now() - days * 86400000).toISOString();
  const orders = await listOrders(integration.storeId, integration.accessToken, sinceISO);
  const data = compute(orders);
  await ref.set({ [key]: { data, computedAt: Timestamp.now() } }, { merge: true });
  return { connected: true, cached: false, days, ...data };
}

export async function analytics(uid: string, daysParam: any) {
  const companyId = await companyOf(uid);
  return cachedCompute(companyId, 'ecommerce_analytics', clamp(daysParam, 7, 365, 90), computeAnalytics);
}

export async function crm(uid: string, daysParam: any) {
  const companyId = await companyOf(uid);
  return cachedCompute(companyId, 'ecommerce_crm', clamp(daysParam, 30, 365, 365), computeCRM);
}

// ── Cálculos ──
function computeAnalytics(orders: any[]) {
  const paid = orders.filter((o) => o.payment_status === 'paid' && o.status !== 'cancelled');
  let revenue = 0;
  const byCustomer: Record<string, number> = {};
  const byMonth: Record<string, { revenue: number; count: number }> = {};
  const byProduct: Record<string, { qty: number; revenue: number }> = {};

  for (const o of paid) {
    const total = parseFloat(o.total || 0) || 0;
    revenue += total;
    const cid = o.customer?.id ? String(o.customer.id) : (o.customer?.email || `anon_${o.id}`);
    byCustomer[cid] = (byCustomer[cid] || 0) + 1;
    const month = (o.created_at || '').slice(0, 7);
    if (month) { byMonth[month] = byMonth[month] || { revenue: 0, count: 0 }; byMonth[month].revenue += total; byMonth[month].count += 1; }
    (o.products || []).forEach((p: any) => {
      const nm = p.name && typeof p.name === 'object' ? (p.name.pt || 'Produto') : (p.name || 'Produto');
      const qty = Number(p.quantity || 1);
      byProduct[nm] = byProduct[nm] || { qty: 0, revenue: 0 };
      byProduct[nm].qty += qty; byProduct[nm].revenue += (parseFloat(p.price || 0) || 0) * qty;
    });
  }
  const orderCount = paid.length;
  const customers = Object.keys(byCustomer).length;
  const recurring = Object.values(byCustomer).filter((c) => c >= 2).length;
  return {
    revenue, orderCount, customers, recurring, newCustomers: customers - recurring,
    repurchaseRate: customers ? (recurring / customers) * 100 : 0,
    avgTicket: orderCount ? revenue / orderCount : 0,
    ltv: customers ? revenue / customers : 0,
    months: Object.keys(byMonth).sort().map((m) => ({ month: m, revenue: byMonth[m].revenue, count: byMonth[m].count })),
    topProducts: Object.entries(byProduct).map(([name, v]) => ({ name, qty: v.qty, revenue: v.revenue })).sort((a, b) => b.revenue - a.revenue).slice(0, 5),
  };
}

const SEGMENTS: Record<string, string> = { campeao: 'Campeões', fiel: 'Fiéis', novo: 'Novos', risco: 'Em risco', perdido: 'Perdidos', ocasional: 'Ocasionais' };

function computeCRM(orders: any[]) {
  const paid = orders.filter((o) => o.payment_status === 'paid' && o.status !== 'cancelled');
  const now = Date.now();
  const byCust: Record<string, any> = {};
  for (const o of paid) {
    const cust = o.customer || {};
    const cid = cust.id ? String(cust.id) : (cust.email || `anon_${o.id}`);
    const c = byCust[cid] || (byCust[cid] = { id: cid, name: cust.name || 'Cliente', email: cust.email || '', phone: cust.phone || '', orders: 0, total: 0, last: 0 });
    c.orders += 1; c.total += parseFloat(o.total || 0) || 0;
    if (cust.phone && !c.phone) c.phone = cust.phone;
    const t = o.created_at ? Date.parse(o.created_at) : 0;
    if (t > c.last) c.last = t;
  }
  const list: any[] = Object.values(byCust);
  const maxTotal = list.reduce((m, c) => Math.max(m, c.total), 0) || 1;
  const segCounts: Record<string, { count: number; revenue: number }> = {};
  for (const c of list) {
    const r = c.recencyDays = c.last ? Math.floor((now - c.last) / 86400000) : 999;
    const recScore = r <= 30 ? 100 : r <= 60 ? 80 : r <= 90 ? 60 : r <= 180 ? 40 : r <= 365 ? 20 : 5;
    const freqScore = Math.min(100, c.orders * 22);
    const monScore = Math.round((c.total / maxTotal) * 100);
    c.score = Math.round(recScore * 0.4 + freqScore * 0.3 + monScore * 0.3);
    c.risk = r > 120 ? 'alto' : r > 60 ? 'medio' : 'baixo';
    if (c.orders >= 3 && r <= 60) c.segment = 'campeao';
    else if (c.orders >= 2 && r <= 90) c.segment = 'fiel';
    else if (c.orders === 1 && r <= 30) c.segment = 'novo';
    else if (r > 180) c.segment = 'perdido';
    else if (r > 90) c.segment = 'risco';
    else c.segment = 'ocasional';
    segCounts[c.segment] = segCounts[c.segment] || { count: 0, revenue: 0 };
    segCounts[c.segment].count += 1; segCounts[c.segment].revenue += c.total;
  }
  list.sort((a, b) => b.total - a.total);
  return {
    totalCustomers: list.length,
    segments: Object.keys(SEGMENTS).map((k) => ({ key: k, label: SEGMENTS[k], count: segCounts[k]?.count || 0, revenue: segCounts[k]?.revenue || 0 })),
    customers: list.slice(0, 500).map((c) => ({ name: c.name, email: c.email, phone: c.phone, orders: c.orders, total: c.total, recencyDays: c.recencyDays, score: c.score, risk: c.risk, segment: c.segment })),
  };
}
