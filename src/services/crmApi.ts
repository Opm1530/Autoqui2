import { API_BASE_URL } from './api';
import { auth } from '../firebase/config';

export interface CrmColuna { id: string; nome: string; cor: string; ordem: number }
export interface CrmTag { nome: string; cor: string }

async function req(path: string, method: 'GET' | 'POST', body?: any) {
  const user = auth.currentUser;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (user) { try { headers['Authorization'] = `Bearer ${await user.getIdToken()}`; } catch { /* ignore */ } }
  const resp = await fetch(`${API_BASE_URL}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data.error || 'erro');
  return data;
}

export const crmApi = {
  getConfig: (): Promise<{ colunas: CrmColuna[]; tags: CrmTag[] }> => req('/api/crm/config', 'GET'),
  saveConfig: (colunas: CrmColuna[], tags: CrmTag[]): Promise<{ ok: boolean; colunas: CrmColuna[]; tags: CrmTag[] }> =>
    req('/api/crm/config', 'POST', { colunas, tags }),
};
