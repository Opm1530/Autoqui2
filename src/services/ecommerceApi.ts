// Cliente do backend para o módulo E-commerce (NuvemShop).
import { API_BASE_URL } from './api';
import { auth } from '../firebase/config';

async function req(path: string, method: 'GET' | 'POST' | 'DELETE', body?: any) {
  const user = auth.currentUser;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (user) { try { headers['Authorization'] = `Bearer ${await user.getIdToken()}`; } catch { /* ignore */ } }
  const resp = await fetch(`${API_BASE_URL}/api/ecommerce${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data.error || 'erro');
  return data;
}

export const ecommerceApi = {
  integration: () => req('/integration', 'GET'),
  oauthUrl: (): Promise<{ url: string }> => req('/oauth/url', 'GET'),
  test: (storeId: string, accessToken: string) => req('/integration/test', 'POST', { storeId, accessToken }),
  connectManual: (storeId: string, accessToken: string) => req('/integration', 'POST', { storeId, accessToken }),
  reregister: () => req('/integration/reregister', 'POST'),
  disconnect: () => req('/integration', 'DELETE'),
};
