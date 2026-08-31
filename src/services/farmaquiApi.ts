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
  deactivate: () => req('/api/farmaqui/deactivate', 'POST'),
  config: (): Promise<{ capturaAtiva: boolean; capturaInstancia: string; recompra: { enabled: boolean; mensagem: string; cicloDiasPadrao: number } }> => req('/api/farmaqui/config', 'GET'),
  saveRecompra: (r: { enabled: boolean; mensagem: string; cicloDiasPadrao: number }) => req('/api/farmaqui/recompra', 'POST', r),
  setUltimaCompra: (leadId: string, data: string, cicloDias: number) => req('/api/farmaqui/ultima-compra', 'POST', { leadId, data, cicloDias }),
  metrics: (): Promise<{ leadsTotal: number; clientes: number; conversao: number; recompraAgendadas: number; recompraEnviadas: number }> => req('/api/farmaqui/metrics', 'GET'),
  landingMetrics: (days = 30): Promise<{ days: number; views: number; uniques: number; cliques: number; leadsPeriodo: number; leadsTotal: number; conversao: number; serie: { dia: string; views: number; cliques: number }[] }> => req(`/api/farmaqui/landing-metrics?days=${days}`, 'GET'),
  recompraList: (): Promise<{ items: { leadId: string; nome: string; phone: string; runAt: number }[] }> => req('/api/farmaqui/recompra/list', 'GET'),
  recompraCancel: (leadId: string) => req('/api/farmaqui/recompra/cancel', 'POST', { leadId }),
  recompraSendNow: (leadId: string) => req('/api/farmaqui/recompra/send-now', 'POST', { leadId }),
  groups: (): Promise<{ instancia: string; grupos: { id: string; subject: string; size?: number }[] }> => req('/api/farmaqui/groups', 'GET'),
  groupOffers: (): Promise<{ items: { id: string; grupoNome: string; mensagem: string; runAt: number; done: boolean }[] }> => req('/api/farmaqui/group-offers', 'GET'),
  createGroupOffer: (o: { grupoJid: string; grupoNome: string; mensagem: string; runAt?: string }) => req('/api/farmaqui/group-offers', 'POST', o),
  deleteGroupOffer: (id: string) => req('/api/farmaqui/group-offers/delete', 'POST', { id }),
  extractGroup: (grupoJid: string): Promise<{ total: number; criados: number }> => req('/api/farmaqui/extract-group', 'POST', { grupoJid }),
  extractAgenda: (): Promise<{ total: number; criados: number }> => req('/api/farmaqui/extract-agenda', 'POST'),
  manualLead: (nome: string, telefone: string) => req('/api/farmaqui/manual-lead', 'POST', { nome, telefone }),
  getLanding: (): Promise<any> => req('/api/farmaqui/landing', 'GET'),
  saveLanding: (l: any) => req('/api/farmaqui/landing', 'POST', l),
  setLandingHost: (subdominio: string): Promise<{ host: string }> => req('/api/farmaqui/landing/host', 'POST', { subdominio }),
};
