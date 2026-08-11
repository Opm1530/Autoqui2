// CRUD genérico com escopo por empresa via backend (grupo 2/3).
// Substitui dbService.create/update/delete para as coleções de operação.
import { API_BASE_URL } from './api';
import { auth } from '../firebase/config';

async function post(path: string, body: any) {
  const user = auth.currentUser;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (user) { try { headers['Authorization'] = `Bearer ${await user.getIdToken()}`; } catch { /* ignore */ } }
  const resp = await fetch(`${API_BASE_URL}${path}`, { method: 'POST', headers, body: JSON.stringify(body) });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data.error || 'erro');
  return data;
}

export const dataApi = {
  create: (collection: string, data: any): Promise<{ id: string }> => post('/api/data/create', { collection, data }),
  update: (collection: string, id: string, fields: any): Promise<{ ok: boolean }> => post('/api/data/update', { collection, id, fields }),
  remove: (collection: string, id: string): Promise<{ ok: boolean }> => post('/api/data/delete', { collection, id }),
};
