// Assinaturas recorrentes da PLATAFORMA (mensalidade dos clientes via Mercado Pago).
// Usa a conta MP da plataforma (token em platform_secrets/mercadopago), separada
// dos tokens por empresa. Modelo: planos fixos (tiers) + auto-serviço no painel.
import { getDoc, db } from './firebase.js';
import { loadUser } from './currentUser.js';
import { PUBLIC_BASE_URL, PANEL_URL } from './config.js';
import { Timestamp } from 'firebase-admin/firestore';

const MP_API = 'https://api.mercadopago.com';

const getUser = loadUser;
function assertAdmin(u: any) { if (u.role !== 'admin') throw new Error('forbidden'); }

// ── Token da plataforma ────────────────────────────────────────────────────
async function platformToken(): Promise<string> {
  const secret = await getDoc('platform_secrets', 'mercadopago');
  const token = secret?.accessToken || '';
  if (!token) throw new Error('plataforma_sem_token');
  return token;
}

export async function connectPlatformMp(uid: string, accessToken: string): Promise<{ ok: boolean; userId?: string }> {
  const user = await getUser(uid); assertAdmin(user);
  const me = await fetch(`${MP_API}/users/me`, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!me.ok) throw new Error('token_invalido');
  const data = await me.json().catch(() => ({}));
  await db.collection('platform_secrets').doc('mercadopago').set({ accessToken, userId: String(data?.id || '') }, { merge: true });
  return { ok: true, userId: String(data?.id || '') };
}

export async function platformMpStatus(uid: string): Promise<{ connected: boolean; userId: string }> {
  const user = await getUser(uid); assertAdmin(user);
  const secret = await getDoc('platform_secrets', 'mercadopago');
  return { connected: !!secret?.accessToken, userId: secret?.userId || '' };
}

export async function disconnectPlatformMp(uid: string): Promise<{ ok: boolean }> {
  const user = await getUser(uid); assertAdmin(user);
  await db.collection('platform_secrets').doc('mercadopago').delete().catch(() => {});
  return { ok: true };
}

// ── Planos (admin) ─────────────────────────────────────────────────────────
// Cada plano cria/atualiza um preapproval_plan no MP e guarda em `planos`.
export async function savePlan(uid: string, payload: { id?: string; nome: string; valor: number; toleranciaDias?: number }): Promise<{ id: string }> {
  const user = await getUser(uid); assertAdmin(user);
  const token = await platformToken();
  const valor = Number(payload.valor);
  if (!payload.nome || !valor || valor <= 0) throw new Error('dados_invalidos');
  const tolerancia = payload.toleranciaDias != null ? Number(payload.toleranciaDias) : 5;

  const body = {
    reason: payload.nome,
    auto_recurring: { frequency: 1, frequency_type: 'months', transaction_amount: valor, currency_id: 'BRL' },
    back_url: `${PANEL_URL}/billing`,
    status: 'active',
  };

  if (payload.id) {
    const existing = await getDoc('planos', payload.id);
    if (existing?.mpPlanId) {
      await fetch(`${MP_API}/preapproval_plan/${existing.mpPlanId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ reason: payload.nome, auto_recurring: body.auto_recurring, back_url: body.back_url }),
      });
    }
    await db.collection('planos').doc(payload.id).update({ nome: payload.nome, valor, toleranciaDias: tolerancia });
    return { id: payload.id };
  }

  const resp = await fetch(`${MP_API}/preapproval_plan`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(body),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok || !data?.id) { console.error('[sub] erro criar plano:', resp.status, data); throw new Error('mp_erro_plano'); }
  const ref = await db.collection('planos').add({ nome: payload.nome, valor, toleranciaDias: tolerancia, mpPlanId: String(data.id), ativo: true, criadoEm: Timestamp.now() });
  return { id: ref.id };
}

export async function deletePlan(uid: string, id: string): Promise<{ ok: boolean }> {
  const user = await getUser(uid); assertAdmin(user);
  await db.collection('planos').doc(id).update({ ativo: false });
  return { ok: true };
}

// ── Assinatura (auto-serviço do dono) ──────────────────────────────────────
// Cria um preapproval vinculado ao plano e devolve o init_point pro dono autorizar.
export async function subscribe(uid: string, planId: string): Promise<{ init_point: string }> {
  const user = await getUser(uid);
  if (user.role !== 'owner' && user.role !== 'admin') throw new Error('forbidden');
  if (!user.companyId) throw new Error('no_company');
  const plano = await getDoc('planos', planId);
  if (!plano?.mpPlanId) throw new Error('plano_invalido');
  const token = await platformToken();

  const resp = await fetch(`${MP_API}/preapproval`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      preapproval_plan_id: plano.mpPlanId,
      payer_email: user.email,
      back_url: `${PANEL_URL}/billing`,
      external_reference: user.companyId,
      reason: plano.nome,
    }),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok || !data?.init_point) { console.error('[sub] erro criar assinatura:', resp.status, data); throw new Error('mp_erro_assinatura'); }

  await db.collection('companies').doc(user.companyId).set({
    assinatura: { planId, planoNome: plano.nome, valor: plano.valor, mpPreapprovalId: String(data.id || ''), status: 'pending', inadimplenteDesde: null, atualizadoEm: Timestamp.now() },
  }, { merge: true });

  return { init_point: data.init_point };
}

export async function cancelSubscription(uid: string, companyId?: string): Promise<{ ok: boolean }> {
  const user = await getUser(uid);
  const targetId = user.role === 'admin' && companyId ? companyId : user.companyId;
  if (!targetId) throw new Error('no_company');
  if (user.role !== 'admin' && user.role !== 'owner') throw new Error('forbidden');
  const company = await getDoc('companies', targetId);
  const preId = company?.assinatura?.mpPreapprovalId;
  if (preId) {
    const token = await platformToken();
    await fetch(`${MP_API}/preapproval/${preId}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ status: 'cancelled' }),
    }).catch(() => {});
  }
  await db.collection('companies').doc(targetId).set({ assinatura: { ...(company?.assinatura || {}), status: 'cancelled', atualizadoEm: Timestamp.now() } }, { merge: true });
  return { ok: true };
}

// Estado da assinatura da empresa do usuário logado (pro painel decidir a parede).
export async function mySubscription(uid: string): Promise<any> {
  const user = await getUser(uid);
  if (!user.companyId) return { assinatura: null, bloqueada: false };
  const company = await getDoc('companies', user.companyId);
  const a = company?.assinatura || null;
  const tolerancia = a?.planId ? (await getDoc('planos', a.planId))?.toleranciaDias ?? 5 : 5;
  return { assinatura: a, bloqueada: computeBlocked(a, tolerancia), toleranciaDias: tolerancia };
}

// Regra: bloqueia se cancelada OU inadimplente há mais que a tolerância.
export function computeBlocked(a: any, toleranciaDias: number): boolean {
  if (!a) return false;
  if (a.status === 'cancelled') return true;
  if (a.inadimplenteDesde) {
    const ms = a.inadimplenteDesde?.toDate ? a.inadimplenteDesde.toDate().getTime() : new Date(a.inadimplenteDesde).getTime();
    if (!isNaN(ms) && Date.now() - ms > toleranciaDias * 86400000) return true;
  }
  return false;
}

// ── Webhook do Mercado Pago (assinaturas) ──────────────────────────────────
export async function handleSubscriptionWebhook(body: any): Promise<void> {
  const type = body?.type || body?.topic;
  const token = await platformToken();

  if (type === 'subscription_preapproval' || type === 'preapproval') {
    const id = body?.data?.id || body?.id;
    if (!id) return;
    const resp = await fetch(`${MP_API}/preapproval/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    const pre = await resp.json().catch(() => null);
    if (!pre?.external_reference) return;
    const companyId = String(pre.external_reference);
    const patch: any = { status: pre.status, mpPreapprovalId: String(pre.id), atualizadoEm: Timestamp.now() };
    if (pre.status === 'authorized') patch.inadimplenteDesde = null;
    const company = await getDoc('companies', companyId);
    await db.collection('companies').doc(companyId).set({ assinatura: { ...(company?.assinatura || {}), ...patch } }, { merge: true });
    return;
  }

  if (type === 'subscription_authorized_payment' || type === 'authorized_payment') {
    const id = body?.data?.id || body?.id;
    if (!id) return;
    const resp = await fetch(`${MP_API}/authorized_payments/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    const pay = await resp.json().catch(() => null);
    if (!pay) return;
    const preId = String(pay.preapproval_id || '');
    // Acha a empresa pelo preapproval id
    const snap = await db.collection('companies').where('assinatura.mpPreapprovalId', '==', preId).limit(1).get();
    if (snap.empty) return;
    const doc = snap.docs[0];
    const a = doc.data().assinatura || {};
    const status = pay.status || pay.payment?.status;
    if (status === 'approved') {
      await doc.ref.set({ assinatura: { ...a, status: 'authorized', inadimplenteDesde: null, ultimaCobranca: Timestamp.now(), atualizadoEm: Timestamp.now() } }, { merge: true });
    } else if (status === 'rejected') {
      await doc.ref.set({ assinatura: { ...a, inadimplenteDesde: a.inadimplenteDesde || Timestamp.now(), atualizadoEm: Timestamp.now() } }, { merge: true });
    }
    return;
  }
}
