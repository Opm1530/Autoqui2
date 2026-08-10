// Cliente do backend para assinaturas (mensalidade dos clientes via MP da plataforma).
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

export const subscriptionApi = {
  // plataforma (admin)
  platformStatus: () => req('/api/platform-mp/status', 'GET'),
  connectPlatform: (accessToken: string) => req('/api/platform-mp/connect', 'POST', { accessToken }),
  disconnectPlatform: () => req('/api/platform-mp/disconnect', 'POST'),
  // planos (admin)
  savePlan: (data: { id?: string; nome: string; valor: number; toleranciaDias?: number }) => req('/api/plans/save', 'POST', data),
  deletePlan: (id: string) => req('/api/plans/delete', 'POST', { id }),
  // assinatura (dono)
  subscribe: (planId: string) => req('/api/subscription/subscribe', 'POST', { planId }),
  cancel: (companyId?: string) => req('/api/subscription/cancel', 'POST', { companyId }),
  mine: () => req('/api/subscription/mine', 'GET'),
};
