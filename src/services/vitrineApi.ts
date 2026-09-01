import { API_BASE_URL } from './api';
import { auth } from '../firebase/config';

export interface VitrineMetrics {
  days: number;
  views: number; uniques: number; cliquesProduto: number; whatsapp: number;
  leadsTotal: number; leadsPeriodo: number;
  conversao: number;
  serie: { dia: string; views: number; whatsapp: number }[];
  topProdutos: { nome: string; cliques: number }[];
}

export interface CatalogFunnel {
  range: string; acessou: number; carrinho: number; checkout: number; pagamento: number; comprou: number; recomprou: number;
}

export const vitrineApi = {
  async catalogFunnel(range: string = '30'): Promise<CatalogFunnel> {
    const user = auth.currentUser;
    const headers: Record<string, string> = {};
    if (user) { try { headers['Authorization'] = `Bearer ${await user.getIdToken()}`; } catch { /* ignore */ } }
    const resp = await fetch(`${API_BASE_URL}/api/catalog/funnel?range=${encodeURIComponent(range)}`, { headers });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) throw new Error(data.error || 'erro');
    return data;
  },
  async metrics(days = 30): Promise<VitrineMetrics> {
    const user = auth.currentUser;
    const headers: Record<string, string> = {};
    if (user) { try { headers['Authorization'] = `Bearer ${await user.getIdToken()}`; } catch { /* ignore */ } }
    const resp = await fetch(`${API_BASE_URL}/api/vitrine/metrics?days=${days}`, { headers });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) throw new Error(data.error || 'erro');
    return data;
  },
};
