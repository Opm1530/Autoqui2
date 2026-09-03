// Cliente do backend para gestão de clientes/usuários/settings (grupo 1).
import { API_BASE_URL } from './api';
import { auth } from '../firebase/config';

export interface AdminMetrics {
  totalClientes: number; pagantes: number; emTeste: number; isentos: number; bloqueados: number; semAssinatura: number;
  mrr: number; ticketMedio: number;
  statusDist: { label: string; count: number; color: string }[];
  receitaPorCanal: { canal: string; valor: number }[];
  novosPorMes: { label: string; count: number }[];
}

async function authFetch(path: string, body: any) {
  const user = auth.currentUser;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (user) { try { headers['Authorization'] = `Bearer ${await user.getIdToken()}`; } catch { /* ignore */ } }
  const resp = await fetch(`${API_BASE_URL}${path}`, { method: 'POST', headers, body: JSON.stringify(body) });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data.error || 'erro');
  return data;
}

async function authGet(path: string) {
  const user = auth.currentUser;
  const headers: Record<string, string> = {};
  if (user) { try { headers['Authorization'] = `Bearer ${await user.getIdToken()}`; } catch { /* ignore */ } }
  const resp = await fetch(`${API_BASE_URL}${path}`, { headers });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data.error || 'erro');
  return data;
}

export const adminApi = {
  // dashboard admin
  metrics: (): Promise<AdminMetrics> => authGet('/api/admin/metrics'),
  // companies
  saveCompany: (data: any, id?: string, owner?: { email: string; password: string }) => authFetch('/api/companies/save', { id, data, owner }),
  toggleCompanyStatus: (id: string, status: string) => authFetch('/api/companies/toggle-status', { id, status }),
  setCompanyStores: (stores: any[], companyId?: string) => authFetch('/api/companies/set-stores', { stores, companyId }),
  previewRemoveStore: (companyId: string, storeId: string) => authFetch('/api/companies/preview-remove-store', { companyId, storeId }),
  removeStore: (companyId: string, storeId: string) => authFetch('/api/companies/remove-store', { companyId, storeId }),
  // pedidos
  deleteOrder: (orderId: string) => authFetch('/api/orders/delete', { orderId }),
  // users
  createEmployee: (payload: { name: string; email: string; password: string; storeIds?: string[]; permissions?: string[] }) => authFetch('/api/users/create-employee', payload),
  updateUser: (id: string, fields: { name?: string; storeIds?: string[]; permissions?: string[] }) => authFetch('/api/users/update', { id, fields }),
  setUserActive: (id: string, active: boolean) => authFetch('/api/users/set-active', { id, active }),
  deleteUser: (id: string) => authFetch('/api/users/delete', { id }),
  // settings
  saveWebhooks: (data: any) => authFetch('/api/settings/webhooks', { data }),
  // ferramentas (hub)
  toggleTool: (toolKey: string, active: boolean): Promise<{ modulos: string[] }> => authFetch('/api/tools/toggle', { toolKey, active }),
};
