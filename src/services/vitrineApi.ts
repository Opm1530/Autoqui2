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

export const vitrineApi = {
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
