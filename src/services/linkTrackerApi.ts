import { API_BASE_URL } from './api';
import { auth } from '../firebase/config';

export interface TrackedLink {
  codigo: string; nome: string; destino: string; origem: string; ativo: boolean;
  cliques: number; cliquesUnicos: number; conversoes: number;
  serie: { dia: string; n: number }[];
}
export interface TrackedLinksResult { links: TrackedLink[]; totais: { cliques: number; unicos: number; conversoes: number } }

async function authReq(path: string, method: 'GET' | 'POST', body?: any) {
  const user = auth.currentUser;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (user) { try { headers['Authorization'] = `Bearer ${await user.getIdToken()}`; } catch { /* ignore */ } }
  const resp = await fetch(`${API_BASE_URL}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data.error || 'erro');
  return data;
}

export const linkTrackerApi = {
  list: (): Promise<TrackedLinksResult> => authReq('/api/links-tracker/list', 'GET'),
  create: (payload: { nome: string; destino: string; origem?: string }): Promise<{ codigo: string }> => authReq('/api/links-tracker/create', 'POST', payload),
  update: (codigo: string, fields: Partial<Pick<TrackedLink, 'nome' | 'destino' | 'origem' | 'ativo'>>): Promise<{ ok: boolean }> => authReq('/api/links-tracker/update', 'POST', { codigo, fields }),
  remove: (codigo: string): Promise<{ ok: boolean }> => authReq('/api/links-tracker/delete', 'POST', { codigo }),
};

// Resolução pública (usada pela rota /r/:code) — não precisa de auth.
export async function resolveTrackedLinkPublic(code: string, first: boolean): Promise<{ destino: string; origem: string; codigo: string } | null> {
  try {
    const resp = await fetch(`${API_BASE_URL}/api/r/resolve?code=${encodeURIComponent(code)}&first=${first ? '1' : '0'}`);
    if (!resp.ok) return null;
    const d = await resp.json().catch(() => null);
    return d && d.destino ? d : null;
  } catch { return null; }
}
