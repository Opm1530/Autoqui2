// Rastreador de links (encurtador de campanha). Cada link tem um código curto
// GLOBAL (tracked_links/{codigo}) que aponta pra empresa + destino. A rota
// pública /r/:codigo conta o clique e redireciona, propagando ?fonte=codigo
// para o destino carimbar a origem no lead/pedido.
import { FieldValue } from 'firebase-admin/firestore';
import { db, getAll } from './firebase.js';
import { loadUser } from './currentUser.js';

const diaOf = (ms: number) => new Date(ms).toISOString().slice(0, 10);
const COL = 'tracked_links';

async function companyOf(uid: string): Promise<string> {
  const user = await loadUser(uid);
  if (!user.companyId) throw new Error('no_company');
  return user.companyId;
}

// Código curto único (base36, 6 chars). Tenta poucas vezes até achar livre.
async function novoCodigo(): Promise<string> {
  for (let i = 0; i < 6; i++) {
    const c = Math.random().toString(36).slice(2, 8);
    const snap = await db.collection(COL).doc(c).get();
    if (!snap.exists) return c;
  }
  return Math.random().toString(36).slice(2, 10); // fallback mais longo
}

function limpaUrl(raw: string): string {
  let u = String(raw || '').trim();
  if (!u) throw new Error('destino_obrigatorio');
  if (!/^https?:\/\//i.test(u) && !u.startsWith('/')) u = 'https://' + u;
  return u;
}

// ── CRUD (painel, autenticado) ──
export async function createTrackedLink(uid: string, payload: { nome: string; destino: string; origem?: string }) {
  const empresaId = await companyOf(uid);
  const nome = String(payload?.nome || '').trim();
  if (!nome) throw new Error('nome_obrigatorio');
  const destino = limpaUrl(payload?.destino);
  const origem = String(payload?.origem || nome).trim().slice(0, 60);
  const codigo = await novoCodigo();
  await db.collection(COL).doc(codigo).set({
    codigo, empresaId, nome, destino, origem, ativo: true,
    cliques: 0, cliquesUnicos: 0, conversoes: 0, porDia: {},
    criadoEm: FieldValue.serverTimestamp(),
  });
  return { codigo };
}

export async function updateTrackedLink(uid: string, codigo: string, fields: { nome?: string; destino?: string; origem?: string; ativo?: boolean }) {
  const empresaId = await companyOf(uid);
  const ref = db.collection(COL).doc(codigo);
  const snap = await ref.get();
  if (!snap.exists || (snap.data() as any).empresaId !== empresaId) throw new Error('not_found');
  const patch: any = {};
  if (typeof fields.nome === 'string') patch.nome = fields.nome.trim();
  if (typeof fields.destino === 'string') patch.destino = limpaUrl(fields.destino);
  if (typeof fields.origem === 'string') patch.origem = fields.origem.trim().slice(0, 60);
  if (typeof fields.ativo === 'boolean') patch.ativo = fields.ativo;
  await ref.update(patch);
  return { ok: true };
}

export async function deleteTrackedLink(uid: string, codigo: string) {
  const empresaId = await companyOf(uid);
  const ref = db.collection(COL).doc(codigo);
  const snap = await ref.get();
  if (!snap.exists || (snap.data() as any).empresaId !== empresaId) throw new Error('not_found');
  await ref.delete();
  return { ok: true };
}

// Lista os links da empresa + série dos últimos 14 dias (a partir do mapa porDia).
export async function listTrackedLinks(uid: string) {
  const empresaId = await companyOf(uid);
  const rows = await getAll(COL, [{ field: 'empresaId', operator: '==', value: empresaId }]).catch(() => []) as any[];
  const dias: string[] = [];
  for (let i = 13; i >= 0; i--) dias.push(diaOf(Date.now() - i * 86400000));
  const links = rows.map((r) => ({
    codigo: r.codigo, nome: r.nome, destino: r.destino, origem: r.origem, ativo: r.ativo !== false,
    cliques: Number(r.cliques || 0), cliquesUnicos: Number(r.cliquesUnicos || 0), conversoes: Number(r.conversoes || 0),
    serie: dias.map((d) => ({ dia: d, n: Number((r.porDia || {})[d] || 0) })),
  })).sort((a, b) => b.cliques - a.cliques);
  const totais = links.reduce((s, l) => ({ cliques: s.cliques + l.cliques, unicos: s.unicos + l.cliquesUnicos, conversoes: s.conversoes + l.conversoes }), { cliques: 0, unicos: 0, conversoes: 0 });
  return { links, totais };
}

// ── Público: resolve o código, conta o clique e devolve o destino ──
export async function resolveTrackedLink(codigo: string, firstToday: boolean): Promise<{ destino: string; origem: string; codigo: string } | null> {
  const c = String(codigo || '').trim();
  if (!c) return null;
  const ref = db.collection(COL).doc(c);
  const snap = await ref.get();
  if (!snap.exists) return null;
  const d = snap.data() as any;
  if (d.ativo === false) return null;
  const dia = diaOf(Date.now());
  const inc: any = { cliques: FieldValue.increment(1), [`porDia.${dia}`]: FieldValue.increment(1), ultimoClique: FieldValue.serverTimestamp() };
  if (firstToday) inc.cliquesUnicos = FieldValue.increment(1);
  ref.update(inc).catch(() => {}); // fire-and-forget: não segura o redirect
  return { destino: d.destino, origem: d.origem || d.nome || c, codigo: c };
}

// Marca uma conversão (lead/pedido) atribuída a um código. Chamado internamente.
export async function registrarConversao(codigo: string, empresaId: string): Promise<void> {
  const c = String(codigo || '').trim();
  if (!c) return;
  const ref = db.collection(COL).doc(c);
  const snap = await ref.get();
  if (!snap.exists || (snap.data() as any).empresaId !== empresaId) return;
  await ref.update({ conversoes: FieldValue.increment(1) }).catch(() => {});
}
