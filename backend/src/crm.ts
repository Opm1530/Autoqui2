// CRM Kanban — configuração (colunas + paleta de tags) guardada no doc da empresa.
// Os cards são os próprios `leads` (campo `crmColuna` + `crmArquivado`), então o
// CRM reaproveita a base de leads/clientes já existente (catálogo, vitrine, FarmaQui).
import { db, getDoc } from './firebase.js';
import { loadUser } from './currentUser.js';

const DEFAULT_COLUNAS = [
  { id: 'novo', nome: 'Novos', cor: '#84cc16', ordem: 0 },
  { id: 'contato', nome: 'Em contato', cor: '#0ea5e9', ordem: 1 },
  { id: 'negociando', nome: 'Negociando', cor: '#f59e0b', ordem: 2 },
  { id: 'fechado', nome: 'Fechado', cor: '#22c55e', ordem: 3 },
];

const s = (v: any, max: number) => String(v ?? '').slice(0, max);

export async function getCrmConfig(uid: string) {
  const user = await loadUser(uid);
  if (!user.companyId) throw new Error('no_company');
  const company = await getDoc('companies', user.companyId);
  const crm = (company as any)?.crm || {};
  return {
    colunas: Array.isArray(crm.colunas) && crm.colunas.length ? crm.colunas : DEFAULT_COLUNAS,
    tags: Array.isArray(crm.tags) ? crm.tags : [],
  };
}

export async function saveCrmConfig(uid: string, payload: any) {
  const user = await loadUser(uid);
  if (!user.companyId) throw new Error('no_company');
  const colunas = (Array.isArray(payload?.colunas) ? payload.colunas : []).slice(0, 30).map((c: any, i: number) => ({
    id: s(c.id, 40) || `col_${Date.now()}_${i}`,
    nome: s(c.nome, 40) || 'Coluna',
    cor: s(c.cor, 9) || '#84cc16',
    ordem: Number.isFinite(Number(c.ordem)) ? Number(c.ordem) : i,
  }));
  const tags = (Array.isArray(payload?.tags) ? payload.tags : []).slice(0, 80)
    .map((t: any) => ({ nome: s(t.nome, 30), cor: s(t.cor, 9) || '#84cc16' }))
    .filter((t: any) => t.nome);
  await db.collection('companies').doc(user.companyId).set(
    { crm: { colunas, tags, atualizadoEm: new Date().toISOString() } },
    { merge: true },
  );
  return { ok: true, colunas, tags };
}
