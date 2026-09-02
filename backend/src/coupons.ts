// Cupons de desconto do SISTEMA (mensalidade), geridos pelo admin.
// Aplicados no cadastro (cliente digita o código) e refletem no valor cobrado.
import { db, getDoc, getAll } from './firebase.js';
import { loadUser } from './currentUser.js';
import { Timestamp } from 'firebase-admin/firestore';

export interface Coupon {
  id?: string;
  codigo: string;
  tipo: 'percent' | 'fixo';
  valor: number;
  duracaoMeses: number | null; // null = para sempre
  validade: string | null;     // ISO ou null (sem expiração de cadastro)
  limiteUsos: number | null;   // null = ilimitado
  usados: number;
  ativo: boolean;
}

const up = (s: any) => String(s || '').trim().toUpperCase();

async function assertAdmin(uid: string) {
  const u = await loadUser(uid);
  if (u.role !== 'admin') throw new Error('forbidden');
}

export async function listCoupons(uid: string): Promise<Coupon[]> {
  await assertAdmin(uid);
  const list = await getAll('cupons_sistema', []).catch(() => []);
  return (list as any[]).sort((a, b) => up(a.codigo).localeCompare(up(b.codigo)));
}

export async function saveCoupon(uid: string, p: any): Promise<{ id: string }> {
  await assertAdmin(uid);
  const codigo = up(p?.codigo);
  if (!codigo) throw new Error('codigo_obrigatorio');
  const tipo = p?.tipo === 'fixo' ? 'fixo' : 'percent';
  const valor = Math.max(0, Number(p?.valor) || 0);
  if (valor <= 0) throw new Error('valor_invalido');
  const data: any = {
    codigo, tipo, valor,
    duracaoMeses: p?.duracaoMeses == null || p.duracaoMeses === '' ? null : Math.max(1, Math.round(Number(p.duracaoMeses))),
    validade: p?.validade ? String(p.validade) : null,
    limiteUsos: p?.limiteUsos == null || p.limiteUsos === '' ? null : Math.max(1, Math.round(Number(p.limiteUsos))),
    ativo: p?.ativo !== false,
    atualizadoEm: new Date().toISOString(),
  };
  if (p?.id) {
    await db.collection('cupons_sistema').doc(p.id).set(data, { merge: true });
    return { id: p.id };
  }
  // Código único
  const existe = await getAll('cupons_sistema', [{ field: 'codigo', operator: '==', value: codigo }]).catch(() => []);
  if (existe.length) throw new Error('codigo_ja_existe');
  const ref = await db.collection('cupons_sistema').add({ ...data, usados: 0, criadoEm: new Date().toISOString() });
  return { id: ref.id };
}

export async function deleteCoupon(uid: string, id: string): Promise<{ ok: boolean }> {
  await assertAdmin(uid);
  await db.collection('cupons_sistema').doc(id).delete().catch(() => {});
  return { ok: true };
}

// Valida um código (público — usado no cadastro). Retorna o cupom ou lança.
export async function findValidCoupon(codigoRaw: string): Promise<Coupon> {
  const codigo = up(codigoRaw);
  if (!codigo) throw new Error('cupom_invalido');
  const list = await getAll('cupons_sistema', [{ field: 'codigo', operator: '==', value: codigo }]).catch(() => []);
  const c = (list as any[])[0] as Coupon | undefined;
  if (!c || c.ativo === false) throw new Error('cupom_invalido');
  if (c.validade && Date.now() > new Date(c.validade).getTime()) throw new Error('cupom_expirado');
  if (c.limiteUsos != null && (c.usados || 0) >= c.limiteUsos) throw new Error('cupom_esgotado');
  return c;
}

// Endpoint público de validação (mostra o desconto no cadastro).
export async function validateCoupon(codigo: string): Promise<{ codigo: string; tipo: string; valor: number; duracaoMeses: number | null }> {
  const c = await findValidCoupon(codigo);
  return { codigo: c.codigo, tipo: c.tipo, valor: c.valor, duracaoMeses: c.duracaoMeses };
}

// Aplica o desconto do cupom sobre um total mensal.
export function applyCoupon(total: number, c: { tipo: string; valor: number } | null | undefined): number {
  if (!c) return total;
  const v = c.tipo === 'percent' ? total * (1 - c.valor / 100) : total - c.valor;
  return Math.max(0, Math.round(v * 100) / 100);
}

// Marca +1 uso (no cadastro, quando o cupom é de fato aplicado).
export async function incCouponUse(id: string): Promise<void> {
  await db.collection('cupons_sistema').doc(id).set({ usados: (Number((await getDoc('cupons_sistema', id))?.usados) || 0) + 1 }, { merge: true }).catch(() => {});
}

// Snapshot do cupom pra guardar na assinatura (com data de expiração do desconto).
export function couponSnapshot(c: Coupon) {
  const expiraEm = c.duracaoMeses == null ? null : Timestamp.fromMillis(Date.now() + c.duracaoMeses * 30 * 86400000);
  return { codigo: c.codigo, tipo: c.tipo, valor: c.valor, duracaoMeses: c.duracaoMeses, expiraEm, aplicadoEm: Timestamp.now() };
}
