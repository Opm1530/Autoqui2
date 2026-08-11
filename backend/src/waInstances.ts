// Autorização e compartilhamento seguro de instâncias de WhatsApp.
// VULN-004: endpoints wa/* checam se a instância pertence à empresa do usuário.
// VULN-005: o link público de QR usa um token temporário, não o nome adivinhável.
import { randomBytes } from 'crypto';
import { getAll, db } from './firebase.js';
import { loadUser } from './currentUser.js';
import * as wa from './evolution.js';
import { Timestamp } from 'firebase-admin/firestore';

const QR_TOKEN_TTL_MS = 15 * 60 * 1000; // link de QR válido por 15 min

async function instanceByName(name: string): Promise<any | null> {
  const list = await getAll('instancias', { field: 'nome', operator: '==', value: name });
  return list[0] || null;
}

// Garante que o usuário logado é dono (ou admin) da instância existente.
export async function assertInstanceOwner(uid: string, name: string): Promise<any> {
  const user = await loadUser(uid);
  const inst = await instanceByName(name);
  if (!inst) throw new Error('instancia_nao_encontrada');
  if (user.role !== 'admin' && inst.empresaId !== user.companyId) throw new Error('forbidden');
  return inst;
}

// Na criação, o nome deve terminar com o sufixo da empresa do usuário
// (padrão `<identificador>_<5 chars do companyId>`), impedindo criar em nome de outra.
export async function assertCanCreate(uid: string, name: string): Promise<void> {
  const user = await loadUser(uid);
  if (user.role === 'admin') return;
  if (!user.companyId) throw new Error('no_company');
  const suffix = '_' + String(user.companyId).substring(0, 5);
  if (!name.endsWith(suffix)) throw new Error('nome_invalido');
}

// Gera (ou renova) o token público de QR da instância. Só o dono/admin.
export async function shareQr(uid: string, name: string): Promise<{ token: string }> {
  const inst = await assertInstanceOwner(uid, name);
  const token = randomBytes(24).toString('hex');
  await db.collection('instancias').doc(inst.id).update({
    qrToken: token,
    qrTokenExp: Timestamp.fromMillis(Date.now() + QR_TOKEN_TTL_MS),
  });
  return { token };
}

async function resolveToken(token: string): Promise<any> {
  if (!token) throw new Error('token_invalido');
  const list = await getAll('instancias', { field: 'qrToken', operator: '==', value: token });
  const inst = list[0];
  if (!inst) throw new Error('token_invalido');
  const exp = inst.qrTokenExp?.toDate ? inst.qrTokenExp.toDate().getTime() : 0;
  if (!exp || Date.now() > exp) throw new Error('token_expirado');
  return inst;
}

// Endpoints públicos por token (a página /qr usa isso, sem login):
export async function qrByToken(token: string): Promise<{ base64: string } | null> {
  const inst = await resolveToken(token);
  return wa.getQRCode(inst.nome);
}
export async function statusByToken(token: string): Promise<{ state: string; connected: boolean }> {
  const inst = await resolveToken(token);
  return wa.getInstanceStatus(inst.nome);
}
