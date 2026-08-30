import { API_BASE_URL } from './api';
import { auth } from '../firebase/config';

async function req(path: string, method: 'GET' | 'POST', body?: any) {
  const user = auth.currentUser;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (user) { try { headers['Authorization'] = `Bearer ${await user.getIdToken()}`; } catch { /* ignore */ } }
  const resp = await fetch(`${API_BASE_URL}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data.error || 'erro');
  return data;
}

export const farmaquiApi = {
  status: (): Promise<{ ativa: boolean; instancia: string }> => req('/api/farmaqui/status', 'GET'),
  activate: (instanceName: string) => req('/api/farmaqui/activate', 'POST', { instanceName }),
};
