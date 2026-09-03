// Preços por funcionalidade (à la carte) + desconto progressivo nos adicionais.
// Editável pelo admin (platform_config/pricing). O canal principal não entra no desconto.
import { db, getDoc } from './firebase.js';
import { loadUser } from './currentUser.js';

// Canais (escolha 1) e adicionais (somam). Espelha CANAIS do admin.
export const CANAIS = new Set(['venda_catalogo', 'vitrine', 'farmaqui', 'ecommerce', 'agendamento']);
export const ADICIONAIS = new Set(['crm', 'disparo', 'atendimento', 'links']);
const FEATURES = [...CANAIS, ...ADICIONAIS];

const DEFAULT_PRECOS: Record<string, number> = {
  venda_catalogo: 163, vitrine: 43, farmaqui: 0, ecommerce: 0, agendamento: 0,
  crm: 0, disparo: 0, atendimento: 0, links: 0,
};
// Desconto aplicado sobre a soma dos ADICIONAIS, conforme a quantidade deles.
const DEFAULT_DESCONTOS = [{ min: 2, pct: 10 }, { min: 3, pct: 20 }];

export interface Pricing { precos: Record<string, number>; descontos: { min: number; pct: number }[] }

export async function getPricing(): Promise<Pricing> {
  const doc = (await getDoc('platform_config', 'pricing')) as any;
  const p = doc || {};
  return {
    precos: { ...DEFAULT_PRECOS, ...(p.precos || {}) },
    descontos: Array.isArray(p.descontos) && p.descontos.length ? p.descontos : DEFAULT_DESCONTOS,
  };
}

export async function savePricing(uid: string, payload: any): Promise<{ ok: boolean } & Pricing> {
  const user = await loadUser(uid);
  if (user.role !== 'admin') throw new Error('forbidden');
  const precos: Record<string, number> = {};
  for (const k of FEATURES) precos[k] = Math.max(0, Math.round(Number(payload?.precos?.[k]) || 0));
  const descontos = (Array.isArray(payload?.descontos) ? payload.descontos : [])
    .map((d: any) => ({ min: Math.max(2, Math.round(Number(d.min) || 0)), pct: Math.max(0, Math.min(100, Math.round(Number(d.pct) || 0))) }))
    .filter((d: any) => d.min >= 2)
    .sort((a: any, b: any) => a.min - b.min);
  await db.collection('platform_config').doc('pricing').set({ precos, descontos, atualizadoEm: new Date().toISOString() }, { merge: true });
  return { ok: true, precos, descontos };
}

// Calcula o total mensal a partir das funcionalidades escolhidas.
export function computeTotal(features: string[], pricing: Pricing): { total: number; base: number; adicionais: number; descontoPct: number; descontoValor: number } {
  const canal = features.find((f) => CANAIS.has(f));
  const base = canal ? (pricing.precos[canal] || 0) : 0;
  const addKeys = features.filter((f) => ADICIONAIS.has(f));
  const adicionaisBruto = addKeys.reduce((s, k) => s + (pricing.precos[k] || 0), 0);
  const tier = [...pricing.descontos].filter((d) => addKeys.length >= d.min).sort((a, b) => b.pct - a.pct)[0];
  const descontoPct = tier ? tier.pct : 0;
  const descontoValor = Math.round(adicionaisBruto * descontoPct) / 100;
  const adicionais = adicionaisBruto - descontoValor;
  return { total: base + adicionais, base, adicionais, descontoPct, descontoValor };
}
