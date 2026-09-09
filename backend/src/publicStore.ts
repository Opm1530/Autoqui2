// Dados PÚBLICOS e seguros de uma loja/empresa para o storefront (catálogo,
// página de links). Devolve só o necessário — nunca assinatura, métricas,
// tokens ou leadCapture. Assim a coleção `companies` pode ser fechada a
// leituras públicas sem quebrar as páginas abertas.
import { getAll, getDoc } from './firebase.js';

export interface PublicStore {
  companyId: string;
  name: string;
  logoUrl: string;
  modulos_ativos: string[];
  mercadoPagoAtivo: boolean;
  store: any | null;
}

const SAFE_STORE = (s: any) => s ? {
  id: s.id, name: s.name || '', address: s.address || '', active: s.active !== false,
  frete_ativo: s.frete_ativo !== false, subdominio: s.subdominio || null, instancia_id: s.instancia_id || null,
} : null;

export async function getPublicStore(params: { storeId?: string; companyId?: string }): Promise<PublicStore | null> {
  let companyId = String(params.companyId || '').trim();
  const storeId = String(params.storeId || '').trim();

  // Sem companyId: resolve pela loja (loja_config.lojaId → empresaId).
  if (!companyId && storeId) {
    const cfgs = await getAll('loja_config', [{ field: 'lojaId', operator: '==', value: storeId }]).catch(() => []) as any[];
    companyId = cfgs[0]?.empresaId || '';
  }
  if (!companyId) return null;

  const company = await getDoc('companies', companyId);
  if (!company) return null;

  const store = storeId ? (company.stores || []).find((s: any) => s.id === storeId) : null;
  // MP ativo = flag na empresa OU token guardado em company_secrets (bloqueado ao cliente).
  let mpAtivo = company.mercadoPagoAtivo === true;
  if (!mpAtivo) { const sec = await getDoc('company_secrets', companyId).catch(() => null); mpAtivo = !!sec?.mercadoPagoToken; }

  return {
    companyId,
    name: company.name || '',
    logoUrl: company.logoUrl || '',
    modulos_ativos: Array.isArray(company.modulos_ativos) ? company.modulos_ativos : [],
    mercadoPagoAtivo: mpAtivo,
    store: SAFE_STORE(store),
  };
}
