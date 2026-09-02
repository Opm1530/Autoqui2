import { API_BASE_URL } from './api';
import { auth } from '../firebase/config';

export interface Coupon {
  id?: string; codigo: string; tipo: 'percent' | 'fixo'; valor: number;
  duracaoMeses: number | null; validade: string | null; limiteUsos: number | null; usados?: number; ativo: boolean;
}

async function req(path: string, method: 'GET' | 'POST', body?: any) {
  const user = auth.currentUser;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (user) { try { headers['Authorization'] = `Bearer ${await user.getIdToken()}`; } catch { /* ignore */ } }
  const resp = await fetch(`${API_BASE_URL}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data.error || 'erro');
  return data;
}

export const couponApi = {
  list: (): Promise<Coupon[]> => req('/api/coupons', 'GET'),
  save: (c: Partial<Coupon>): Promise<{ id: string }> => req('/api/coupons/save', 'POST', c),
  remove: (id: string): Promise<{ ok: boolean }> => req('/api/coupons/delete', 'POST', { id }),
  validate: (codigo: string): Promise<{ codigo: string; tipo: 'percent' | 'fixo'; valor: number; duracaoMeses: number | null }> =>
    req(`/api/coupons/validate?codigo=${encodeURIComponent(codigo)}`, 'GET'),
};
