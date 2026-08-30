// Domínios/subdomínios das lojas. Fase 1: subdomínio *.autoqui.com.br.
// Coleção `dominios/{host}` = { companyId, storeId, tipo } → lookup O(1) + unicidade.
import { db } from './firebase.js';
import { loadUser } from './currentUser.js';

const BASE_DOMAIN = 'autoqui.com.br';
const RESERVADOS = new Set(['www', 'api', 'app', 'admin', 'painel', 'dashboard', 'mail', 'ns1', 'ns2', 'autoqui', 'loja', 'lojas', 'suporte']);
const SUB_RE = /^[a-z0-9][a-z0-9-]{1,30}[a-z0-9]$/;

async function companyOf(uid: string): Promise<string> {
  const user = await loadUser(uid);
  if (user.role !== 'owner' && user.role !== 'admin') throw new Error('forbidden');
  if (!user.companyId) throw new Error('no_company');
  return user.companyId;
}

// Define/troca o subdomínio de uma loja da empresa.
export async function setStoreSubdomain(uid: string, storeId: string, subRaw: string) {
  const companyId = await companyOf(uid);
  const sub = String(subRaw || '').trim().toLowerCase();
  if (!SUB_RE.test(sub) || RESERVADOS.has(sub)) throw new Error('subdominio_invalido');
  const host = `${sub}.${BASE_DOMAIN}`;

  // Unicidade: se o host já existe e não é desta mesma loja, recusa.
  const existing = await db.collection('dominios').doc(host).get();
  if (existing.exists && (existing.data() as any).storeId !== storeId) throw new Error('subdominio_em_uso');

  const company = await db.collection('companies').doc(companyId).get();
  const stores: any[] = (company.data() as any)?.stores || [];
  const store = stores.find((s) => s.id === storeId);
  if (!store) throw new Error('loja_nao_encontrada');

  // Remove o host antigo desta loja (se estava trocando de subdomínio).
  if (store.subdominio && store.subdominio !== host) {
    await db.collection('dominios').doc(store.subdominio).delete().catch(() => {});
  }

  await db.collection('dominios').doc(host).set({ companyId, storeId, tipo: 'subdominio', host });
  const novos = stores.map((s) => (s.id === storeId ? { ...s, subdominio: host } : s));
  await db.collection('companies').doc(companyId).update({ stores: novos });
  return { ok: true, host };
}

export async function removeStoreSubdomain(uid: string, storeId: string) {
  const companyId = await companyOf(uid);
  const company = await db.collection('companies').doc(companyId).get();
  const stores: any[] = (company.data() as any)?.stores || [];
  const store = stores.find((s) => s.id === storeId);
  if (store?.subdominio) await db.collection('dominios').doc(store.subdominio).delete().catch(() => {});
  await db.collection('companies').doc(companyId).update({ stores: stores.map((s) => (s.id === storeId ? { ...s, subdominio: null } : s)) });
  return { ok: true };
}

// Público: resolve o host (subdomínio ou domínio próprio) → loja ou landing.
export async function storeByHost(host: string) {
  const h = String(host || '').trim().toLowerCase().replace(/:\d+$/, '');
  if (!h) return {};
  const doc = await db.collection('dominios').doc(h).get();
  if (!doc.exists) return {};
  const d = doc.data() as any;
  return { storeId: d.storeId || null, companyId: d.companyId, tipo: d.tipo || 'subdominio' };
}

// Valida um subdomínio e devolve o host completo (sem gravar).
export function normalizeSubdomain(subRaw: string): string {
  const sub = String(subRaw || '').trim().toLowerCase();
  if (!SUB_RE.test(sub) || RESERVADOS.has(sub)) throw new Error('subdominio_invalido');
  return `${sub}.${BASE_DOMAIN}`;
}

// Liga um subdomínio a uma landing da empresa (tipo: 'landing').
export async function setLandingSubdomain(uid: string, host: string) {
  const companyId = await companyOf(uid);
  const existing = await db.collection('dominios').doc(host).get();
  if (existing.exists && (existing.data() as any).companyId !== companyId) throw new Error('subdominio_em_uso');
  await db.collection('dominios').doc(host).set({ companyId, tipo: 'landing', host, storeId: null });
  return { ok: true, host };
}

export async function removeLandingSubdomain(uid: string, host: string) {
  const companyId = await companyOf(uid);
  const doc = await db.collection('dominios').doc(host).get();
  if (doc.exists && (doc.data() as any).companyId === companyId) await db.collection('dominios').doc(host).delete();
  return { ok: true };
}
