import { API_BASE_URL } from './api';
import { auth } from '../firebase/config';

async function req(path: string, method: 'POST' | 'DELETE', body: any) {
  const user = auth.currentUser;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (user) { try { headers['Authorization'] = `Bearer ${await user.getIdToken()}`; } catch { /* ignore */ } }
  const resp = await fetch(`${API_BASE_URL}${path}`, { method, headers, body: JSON.stringify(body) });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data.error || 'erro');
  return data;
}

export const domainsApi = {
  setSubdomain: (storeId: string, subdominio: string): Promise<{ host: string }> => req('/api/domains/subdomain', 'POST', { storeId, subdominio }),
  removeSubdomain: (storeId: string) => req('/api/domains/subdomain', 'DELETE', { storeId }),
};
