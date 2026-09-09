import { API_BASE_URL } from './api';

export interface PublicStore {
  companyId: string; name: string; logoUrl: string;
  modulos_ativos: string[]; mercadoPagoAtivo: boolean; store: any | null;
}

// Dados públicos e seguros da loja (não expõe o doc de companies ao cliente).
export async function getPublicStore(p: { storeId?: string; companyId?: string }): Promise<PublicStore | null> {
  try {
    const qs = new URLSearchParams();
    if (p.storeId) qs.set('storeId', p.storeId);
    if (p.companyId) qs.set('companyId', p.companyId);
    const resp = await fetch(`${API_BASE_URL}/api/store/public?${qs.toString()}`);
    if (!resp.ok) return null;
    const d = await resp.json().catch(() => null);
    return d && d.companyId ? d : null;
  } catch { return null; }
}
