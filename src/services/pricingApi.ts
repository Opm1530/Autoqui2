import { API_BASE_URL } from './api';
import { auth } from '../firebase/config';

export interface Pricing { precos: Record<string, number>; descontos: { min: number; pct: number }[] }

async function req(path: string, method: 'GET' | 'POST', body?: any) {
  const user = auth.currentUser;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (user) { try { headers['Authorization'] = `Bearer ${await user.getIdToken()}`; } catch { /* ignore */ } }
  const resp = await fetch(`${API_BASE_URL}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data.error || 'erro');
  return data;
}

export const pricingApi = {
  get: (): Promise<Pricing> => req('/api/pricing', 'GET'),
  save: (precos: Record<string, number>, descontos: { min: number; pct: number }[]): Promise<{ ok: boolean } & Pricing> =>
    req('/api/pricing/save', 'POST', { precos, descontos }),
};

// Catálogo de funcionalidades (rótulos + tipo) usado no admin e no cadastro.
export const CANAIS_FEAT = [
  { key: 'venda_catalogo', label: 'Catálogo', icon: 'fa-bag-shopping', desc: 'Loja com carrinho e pagamento (PIX/Mercado Pago)' },
  { key: 'vitrine', label: 'Vitrine', icon: 'fa-image', desc: 'Mostruário; pedido direto no WhatsApp' },
  { key: 'farmaqui', label: 'FarmaQui', icon: 'fa-prescription-bottle-medical', desc: 'Captação de leads, recompra e automações para farmácia' },
  { key: 'ecommerce', label: 'E-commerce (NuvemShop)', icon: 'fa-store', desc: 'Integração com loja NuvemShop' },
  { key: 'agendamento', label: 'Agendamento', icon: 'fa-calendar-check', desc: 'Agenda de serviços com lembretes' },
];
export const ADICIONAIS_FEAT = [
  { key: 'crm', label: 'CRM (Kanban)', icon: 'fa-table-columns', desc: 'Quadro de leads/clientes com tags e etapas' },
  { key: 'disparo', label: 'Campanhas', icon: 'fa-bullhorn', desc: 'Disparo em massa no WhatsApp' },
  { key: 'atendimento', label: 'Atendente IA', icon: 'fa-robot', desc: 'IA que atende no WhatsApp (em breve)' },
  { key: 'links', label: 'Página de Links', icon: 'fa-link', desc: 'Página de links (estilo Linktree) personalizável' },
];
export const ALL_FEAT = [...CANAIS_FEAT, ...ADICIONAIS_FEAT];
