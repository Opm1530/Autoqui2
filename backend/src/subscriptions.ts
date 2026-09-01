// Assinaturas recorrentes da PLATAFORMA (mensalidade dos clientes via Mercado Pago).
// Usa a conta MP da plataforma (token em platform_secrets/mercadopago), separada
// dos tokens por empresa. Modelo: planos fixos (tiers) + auto-serviço no painel.
import { getAuth } from 'firebase-admin/auth';
import { randomUUID } from 'crypto';
import { getDoc, db } from './firebase.js';
import { loadUser } from './currentUser.js';
import { PUBLIC_BASE_URL, PANEL_URL } from './config.js';
import { Timestamp } from 'firebase-admin/firestore';

const MP_API = 'https://api.mercadopago.com';
const TRIAL_DIAS = 7; // teste grátis do autocadastro

const getUser = loadUser;
function assertAdmin(u: any) { if (u.role !== 'admin') throw new Error('forbidden'); }

// ── Autocadastro (self-service) ────────────────────────────────────────────
// O front cria a conta no Firebase (senha não passa por aqui) e chama isto com o
// ID token. Cria a empresa em teste de 7 dias + o doc users (role owner). O
// backend força o papel e deriva o teto de lojas/módulos do PLANO — o usuário
// não escolhe isso.
export async function provisionSignup(uid: string, payload: { companyName: string; planId: string }): Promise<{ companyId: string }> {
  const companyName = String(payload?.companyName || '').trim();
  const planId = String(payload?.planId || '').trim();
  if (!companyName || !planId) throw new Error('dados_incompletos');

  // Já tem empresa? Não provisiona de novo (evita duplicar no F5 / reenvio).
  const existing = await getDoc('users', uid);
  if (existing?.companyId) throw new Error('ja_provisionado');

  const plano = await getDoc('planos', planId);
  if (!plano || plano.ativo === false) throw new Error('plano_invalido');

  const authUser = await getAuth().getUser(uid);
  const email = authUser.email || '';
  const maxLojas = plano.maxLojas || 1;
  const modulos = Array.isArray(plano.modulos) && plano.modulos.length ? plano.modulos : ['venda_catalogo'];

  const baseStore = { id: randomUUID(), name: companyName, active: true };
  const trialAte = Timestamp.fromMillis(Date.now() + TRIAL_DIAS * 86400000);

  const ref = await db.collection('companies').add({
    name: companyName,
    stores: [baseStore],
    limite_instancias: 1,
    limite_lojas: maxLojas,
    status: 'active',
    ownerId: uid,
    origem: 'self-signup',
    isento: false,
    modulos_ativos: modulos,
    metrics: { totalMessages: 0, totalPayments: 0 },
    assinatura: {
      planId, planoNome: plano.nome, valor: plano.valor, maxLojas,
      status: 'trial', trialAte, inadimplenteDesde: null, atualizadoEm: Timestamp.now(),
    },
  });
  await db.collection('users').doc(uid).set({ uid, email, role: 'owner', companyId: ref.id });
  console.log(`[signup] empresa ${ref.id} criada (plano ${plano.nome}, teste ${TRIAL_DIAS}d) por ${email}`);
  return { companyId: ref.id };
}

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
export async function savePlan(uid: string, payload: { id?: string; nome: string; valor: number; toleranciaDias?: number; maxLojas?: number; modulos?: string[] }): Promise<{ id: string }> {
  const user = await getUser(uid); assertAdmin(user);
  const token = await platformToken();
  const valor = Number(payload.valor);
  if (!payload.nome || !valor || valor <= 0) throw new Error('dados_invalidos');
  const tolerancia = payload.toleranciaDias != null ? Number(payload.toleranciaDias) : 5;
  // Tier: quantas lojas o plano libera e quais módulos vêm inclusos.
  const maxLojas = payload.maxLojas != null ? Math.max(1, Number(payload.maxLojas)) : 1;
  const modulos = Array.isArray(payload.modulos) && payload.modulos.length ? payload.modulos : ['venda_catalogo'];

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
    await db.collection('planos').doc(payload.id).update({ nome: payload.nome, valor, toleranciaDias: tolerancia, maxLojas, modulos });
    return { id: payload.id };
  }

  const resp = await fetch(`${MP_API}/preapproval_plan`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(body),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok || !data?.id) { console.error('[sub] erro criar plano:', resp.status, data); throw new Error('mp_erro_plano'); }
  const ref = await db.collection('planos').add({ nome: payload.nome, valor, toleranciaDias: tolerancia, maxLojas, modulos, mpPlanId: String(data.id), ativo: true, criadoEm: Timestamp.now() });
  return { id: ref.id };
}

export async function deletePlan(uid: string, id: string): Promise<{ ok: boolean }> {
  const user = await getUser(uid); assertAdmin(user);
  await db.collection('planos').doc(id).update({ ativo: false });
  return { ok: true };
}

// Lista pública dos planos ativos (pra vitrine/cadastro, sem login). Só campos
// que podem ser públicos — nada de mpPlanId.
export async function listPublicPlans(): Promise<Array<{ id: string; nome: string; valor: number; maxLojas: number }>> {
  const snap = await db.collection('planos').where('ativo', '==', true).get();
  return snap.docs
    .map((d) => ({ id: d.id, nome: d.data().nome, valor: d.data().valor, maxLojas: d.data().maxLojas || 1 }))
    .sort((a, b) => a.valor - b.valor);
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
  if (!resp.ok || !data?.init_point) {
    console.error('[sub] erro criar assinatura:', resp.status, JSON.stringify(data));
    const detalhe = data?.message || (Array.isArray(data?.cause) && data.cause[0]?.description) || `HTTP ${resp.status}`;
    throw new Error(`mp_erro_assinatura: ${detalhe}`);
  }

  const company = await getDoc('companies', user.companyId);
  await db.collection('companies').doc(user.companyId).set({
    assinatura: {
      ...(company?.assinatura || {}),
      planId, planoNome: plano.nome, valor: plano.valor, maxLojas: plano.maxLojas || 1,
      mpPreapprovalId: String(data.id || ''), status: 'pending', inadimplenteDesde: null, atualizadoEm: Timestamp.now(),
    },
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

// Normaliza Timestamp | Date | number | string ISO → ms (ou null).
function toMs(v: any): number | null {
  if (!v) return null;
  const ms = v?.toDate ? v.toDate().getTime() : new Date(v).getTime();
  return isNaN(ms) ? null : ms;
}

// Estado da assinatura da empresa do usuário logado (pro painel decidir a parede).
export async function mySubscription(uid: string): Promise<any> {
  const user = await getUser(uid);
  if (!user.companyId) return { assinatura: null, bloqueada: false, emTrial: false };
  const company = await getDoc('companies', user.companyId);
  const a = company?.assinatura || null;
  const tolerancia = a?.planId ? (await getDoc('planos', a.planId))?.toleranciaDias ?? 5 : 5;
  return { ...computeAccess(company, tolerancia), assinatura: a, toleranciaDias: tolerancia, maxLojas: a?.maxLojas || company?.limite_lojas || 1 };
}

// Bloqueio de assinatura para enforcement no backend (rotas de escrita).
// Admin nunca é bloqueado; erro transitório = fail-open (não trava o painel).
export async function isCompanyBlocked(uid: string): Promise<boolean> {
  const user = await getUser(uid);
  if (!user?.companyId || user.role === 'admin') return false;
  const company = await getDoc('companies', user.companyId);
  const a = (company as any)?.assinatura || null;
  const tolerancia = a?.planId ? (await getDoc('planos', a.planId) as any)?.toleranciaDias ?? 5 : 5;
  return computeAccess(company, tolerancia).bloqueada;
}

// Decide o acesso da empresa. Ordem: isento → livre; sem plano → livre (clientes
// atuais sem plano seguem funcionando); authorized → livre; dentro do teste →
// livre (mesmo se cancelou — o teste de 7 dias sempre roda até o fim); depois do
// teste: cancelada / teste vencido / inadimplente além da tolerância → bloqueia.
export function computeAccess(company: any, toleranciaDias: number): { bloqueada: boolean; emTrial: boolean; diasRestantesTrial: number } {
  const livre = (emTrial = false, dias = 0) => ({ bloqueada: false, emTrial, diasRestantesTrial: dias });
  if (!company || company.isento) return livre();
  const a = company.assinatura;
  if (!a || !a.planId) return livre();
  if (a.status === 'authorized') return livre();

  // Teste vale até o fim, independentemente de ter cancelado no meio.
  const now = Date.now();
  const trialMs = toMs(a.trialAte);
  if (trialMs && now < trialMs) {
    return livre(true, Math.ceil((trialMs - now) / 86400000));
  }

  // Fora do teste: cancelada bloqueia.
  if (a.status === 'cancelled') return { bloqueada: true, emTrial: false, diasRestantesTrial: 0 };

  const inadMs = toMs(a.inadimplenteDesde);
  if (inadMs && now - inadMs <= toleranciaDias * 86400000) return livre();

  // pending sem teste, teste vencido, ou inadimplente além da tolerância.
  return { bloqueada: true, emTrial: false, diasRestantesTrial: 0 };
}

// Mantido por compatibilidade — bloqueia por assinatura (sem teste/isento).
export function computeBlocked(a: any, toleranciaDias: number): boolean {
  return computeAccess({ assinatura: a }, toleranciaDias).bloqueada;
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
