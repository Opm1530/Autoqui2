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

// Captação de leads no WhatsApp (mesma engine da FarmaQui, uso genérico).
export const leadCaptureApi = {
  status: (): Promise<{ ativa: boolean; instancia: string; origem: string }> => req('/api/leadcapture/status', 'GET'),
  activate: (instanceName: string, origem = 'whatsapp') => req('/api/leadcapture/activate', 'POST', { instanceName, origem }),
  deactivate: () => req('/api/leadcapture/deactivate', 'POST'),
};
