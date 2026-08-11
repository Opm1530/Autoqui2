// CRUD genérico com escopo por empresa para as coleções de operação.
// A empresa vem do doc users/{uid}; o cliente não escolhe de quem é o dado.
// Timestamps são gerados/convertidos no servidor (não sobrevivem ao JSON).
import { getDoc, db } from './firebase.js';
import { loadUser } from './currentUser.js';
import { Timestamp } from 'firebase-admin/firestore';

interface CollCfg {
  company: string;            // campo que guarda o id da empresa
  serverTs?: string[];        // campos setados com Timestamp.now() no create (e updatedAt no update)
  tsFields?: string[];        // campos vindos do cliente que devem virar Timestamp
  updateTs?: string;          // campo de "atualizado em" setado a cada update
}

const COLL: Record<string, CollCfg> = {
  categories: { company: 'companyId' },
  combos: { company: 'empresaId', serverTs: ['criadoEm'] },
  loja_config: { company: 'empresaId' },
  leads: { company: 'empresaId', updateTs: 'updatedAt' },
  clientes: { company: 'companyId' },
  agendamentos: { company: 'companyId' },
  campanhas: { company: 'cliente_id', serverTs: ['criadoEm'], tsFields: ['data_agendamento'] },
  instancias: { company: 'empresaId', serverTs: ['createdAt'] },
};

const getUser = loadUser;
function cfgOf(collection: string): CollCfg {
  const c = COLL[collection];
  if (!c) throw new Error('colecao_nao_permitida');
  return c;
}
// Converte ms / ISO / {seconds} em Timestamp do Firestore.
function toTimestamp(v: any): Timestamp | any {
  if (v == null) return v;
  if (typeof v === 'number') return Timestamp.fromMillis(v);
  if (typeof v === 'string') { const ms = new Date(v).getTime(); return isNaN(ms) ? v : Timestamp.fromMillis(ms); }
  if (typeof v?.seconds === 'number') return new Timestamp(v.seconds, v.nanoseconds || 0);
  return v;
}
function convertTsFields(data: any, cfg: CollCfg) {
  if (!cfg.tsFields) return;
  for (const f of cfg.tsFields) if (f in data) data[f] = toTimestamp(data[f]);
}

export async function createDoc(uid: string, collection: string, data: any): Promise<{ id: string }> {
  const cfg = cfgOf(collection);
  const user = await getUser(uid);
  if (!user.companyId) throw new Error('no_company');
  const clean = { ...(data || {}) };
  delete clean.id;
  clean[cfg.company] = user.companyId;           // empresa imposta pelo servidor
  convertTsFields(clean, cfg);
  for (const f of cfg.serverTs || []) clean[f] = Timestamp.now();
  const ref = await db.collection(collection).add(clean);
  return { id: ref.id };
}

export async function updateDoc(uid: string, collection: string, id: string, fields: any): Promise<{ ok: boolean }> {
  const cfg = cfgOf(collection);
  const user = await getUser(uid);
  const existing = await getDoc(collection, id);
  if (!existing) throw new Error('not_found');
  if (user.role !== 'admin' && existing[cfg.company] !== user.companyId) throw new Error('forbidden');
  const clean = { ...(fields || {}) };
  delete clean.id; delete clean[cfg.company];    // não deixa trocar id/empresa
  convertTsFields(clean, cfg);
  if (cfg.updateTs) clean[cfg.updateTs] = Timestamp.now();
  if (Object.keys(clean).length === 0) throw new Error('nada_para_atualizar');
  await db.collection(collection).doc(id).update(clean);
  return { ok: true };
}

export async function deleteDoc(uid: string, collection: string, id: string): Promise<{ ok: boolean }> {
  const cfg = cfgOf(collection);
  const user = await getUser(uid);
  const existing = await getDoc(collection, id);
  if (!existing) return { ok: true };
  if (user.role !== 'admin' && existing[cfg.company] !== user.companyId) throw new Error('forbidden');
  await db.collection(collection).doc(id).delete();
  return { ok: true };
}
