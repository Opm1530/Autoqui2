// Assinaturas recorrentes da PLATAFORMA (mensalidade dos clientes via Mercado Pago).
// Usa a conta MP da plataforma (token em platform_secrets/mercadopago), separada
// dos tokens por empresa. Modelo: planos fixos (tiers) + auto-serviço no painel.
import { getAuth } from 'firebase-admin/auth';
import { randomUUID } from 'crypto';
import { getDoc, db } from './firebase.js';
import { loadUser } from './currentUser.js';
import { PUBLIC_BASE_URL, PANEL_URL } from './config.js';
import { Timestamp } from 'firebase-admin/firestore';
import { getPricing, computeTotal, CANAIS as PRICE_CANAIS, ADICIONAIS as PRICE_ADICIONAIS } from './pricing.js';
import { findValidCoupon, applyCoupon, couponSnapshot, incCouponUse } from './coupons.js';

const MP_API = 'https://api.mercadopago.com';
const TRIAL_DIAS = 7; // teste grátis do autocadastro

const getUser = loadUser;
function assertAdmin(u: any) { if (u.role !== 'admin') throw new Error('forbidden'); }

// ── Autocadastro (self-service) ────────────────────────────────────────────
// O front cria a conta no Firebase (senha não passa por aqui) e chama isto com o
// ID token. Cria a empresa em teste de 7 dias + o doc users (role owner). O
// backend força o papel e deriva o teto de lojas/módulos do PLANO — o usuário
// não escolhe isso.
export async function provisionSignup(uid: string, payload: { companyName: string; features?: string[]; cupom?: string }): Promise<{ companyId: string }> {
  const companyName = String(payload?.companyName || '').trim();
  if (!companyName) throw new Error('dados_incompletos');

  // Já tem empresa? Não provisiona de novo (evita duplicar no F5 / reenvio).
  const existing = await getDoc('users', uid);
  if (existing?.companyId) throw new Error('ja_provisionado');

  // Funcionalidades escolhidas (à la carte). Precisa de ao menos 1 canal.
  const pricing = await getPricing();
  const valid = new Set([...PRICE_CANAIS, ...PRICE_ADICIONAIS]);
  const features = (Array.isArray(payload?.features) ? payload.features : []).map(String).filter((f) => valid.has(f));
  const canal = features.find((f) => PRICE_CANAIS.has(f));
  if (!canal) throw new Error('sem_canal');
  const { total } = computeTotal(features, pricing);

  // Cupom opcional (valida; se ok, aplica no total e guarda snapshot na assinatura).
  let cupomSnap: any = null;
  let totalFinal = total;
  if (payload?.cupom) {
    try { const c = await findValidCoupon(payload.cupom); cupomSnap = couponSnapshot(c); totalFinal = applyCoupon(total, c); await incCouponUse(c.id!); } catch { /* cupom inválido: ignora silenciosamente no cadastro */ }
  }

  const authUser = await getAuth().getUser(uid);
  const email = authUser.email || '';

  const baseStore = { id: randomUUID(), name: companyName, active: true };
  const trialAte = Timestamp.fromMillis(Date.now() + TRIAL_DIAS * 86400000);

  const ref = await db.collection('companies').add({
    name: companyName,
    stores: [baseStore],
    limite_instancias: 1,
    limite_lojas: 1,
    status: 'active',
    ownerId: uid,
    origem: 'self-signup',
    isento: false,
    modulos_ativos: features,
    metrics: { totalMessages: 0, totalPayments: 0 },
    assinatura: {
      // Modelo à la carte: guarda as features e o total calculado (sem plano fixo).
      features, valor: totalFinal, planoNome: canal === 'vitrine' ? 'Vitrine' : 'Personalizado', maxLojas: 1,
      ...(cupomSnap ? { cupom: cupomSnap } : {}),
      status: 'trial', trialAte, inadimplenteDesde: null, atualizadoEm: Timestamp.now(),
    },
  });
  await db.collection('users').doc(uid).set({ uid, email, role: 'owner', companyId: ref.id });
  console.log(`[signup] empresa ${ref.id} criada (features ${features.join('+')}, R$${total}, teste ${TRIAL_DIAS}d) por ${email}`);
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

// Resolve quanto/por quê cobrar: plano legado (planId) OU total à la carte
// (recalculado das features salvas na empresa, refletindo os preços atuais).
async function resolveCharge(uid: string, _planId?: string): Promise<{ user: any; company: any; valor: number; reason: string; extra: any }> {
  const user = await getUser(uid);
  if (!user.companyId) throw new Error('no_company');
  const company = await getDoc('companies', user.companyId);
  // Modelo à la carte: total sempre calculado das funcionalidades ativas (sem plano).
  const a = (company as any)?.assinatura || {};
  // Sem features na assinatura (cliente antigo migrando): usa os módulos ativos da empresa.
  const modulos: string[] = Array.isArray((company as any)?.modulos_ativos) ? (company as any).modulos_ativos : [];
  const valid = new Set([...PRICE_CANAIS, ...PRICE_ADICIONAIS]);
  const features: string[] = (Array.isArray(a.features) && a.features.length ? a.features : modulos).filter((f: string) => valid.has(f));
  let valor = features.length ? computeTotal(features, await getPricing()).total : Number(a.valor);
  if (!valor || valor <= 0) throw new Error('valor_invalido');
  // Cupom do sistema (se ainda dentro da duração) desconta a mensalidade.
  const cupom = a.cupom;
  const cupomVigente = cupom && (!cupom.expiraEm || Date.now() < (cupom.expiraEm?.toMillis ? cupom.expiraEm.toMillis() : new Date(cupom.expiraEm).getTime()));
  if (cupomVigente) valor = applyCoupon(valor, cupom);
  return { user, company, valor, reason: 'AutoQui — assinatura', extra: { features, valor } };
}

// ── Assinatura (auto-serviço do dono) ──────────────────────────────────────
// Cria um preapproval e devolve o init_point pro dono autorizar. Sem planId,
// cobra o total à la carte da empresa.
export async function subscribe(uid: string, planId?: string): Promise<{ init_point: string }> {
  const { user, company, valor, reason, extra } = await resolveCharge(uid, planId);
  const token = await platformToken();

  // Preapproval SEM plano fixo (auto_recurring próprio) + status 'pending':
  // o MP devolve init_point pro dono autorizar (checkout hospedado, sem cartão aqui).
  // Assim conseguimos external_reference por empresa e o redirect de volta ao painel.
  const resp = await fetch(`${MP_API}/preapproval`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      reason,
      external_reference: user.companyId,
      payer_email: user.email,
      back_url: `${PANEL_URL}/billing`,
      status: 'pending',
      auto_recurring: { frequency: 1, frequency_type: 'months', transaction_amount: valor, currency_id: 'BRL' },
    }),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok || !data?.init_point) {
    console.error('[sub] erro criar assinatura:', resp.status, JSON.stringify(data));
    const detalhe = data?.message || (Array.isArray(data?.cause) && data.cause[0]?.description) || `HTTP ${resp.status}`;
    throw new Error(`mp_erro_assinatura: ${detalhe}`);
  }

  await db.collection('companies').doc(user.companyId).set({
    assinatura: {
      ...(company?.assinatura || {}), ...extra, valor,
      mpPreapprovalId: String(data.id || ''), status: 'pending', inadimplenteDesde: null, atualizadoEm: Timestamp.now(),
    },
  }, { merge: true });

  return { init_point: data.init_point };
}

// "Já paguei?" — consulta o Mercado Pago e sincroniza o status (caso o webhook
// não tenha chegado). Se o preapproval está autorizado, marca a assinatura como ativa.
export async function refreshSubscriptionStatus(uid: string): Promise<{ status: string }> {
  const user = await getUser(uid);
  if (!user.companyId) throw new Error('no_company');
  const company = await getDoc('companies', user.companyId);
  const a = (company as any)?.assinatura || {};
  const token = await platformToken();

  // 1) Cartão recorrente (preapproval): autorizado → assinatura ativa.
  const preId = a.mpPreapprovalId;
  if (preId) {
    const resp = await fetch(`${MP_API}/preapproval/${preId}`, { headers: { Authorization: `Bearer ${token}` } });
    const pre = await resp.json().catch(() => null);
    if (pre?.status === 'authorized') {
      await db.collection('companies').doc(user.companyId).set({ assinatura: { ...a, status: 'authorized', inadimplenteDesde: null, atualizadoEm: Timestamp.now() } }, { merge: true });
      return { status: 'authorized' };
    }
  }

  // 2) PIX avulso: último pagamento aprovado → libera +30 dias.
  const pixId = a.ultimoPixId;
  if (pixId) {
    const r = await fetch(`${MP_API}/v1/payments/${pixId}`, { headers: { Authorization: `Bearer ${token}` } });
    const pay = await r.json().catch(() => null);
    if (pay?.status === 'approved') {
      await aplicarPixAssinatura(user.companyId, String(pay?.metadata?.plan_id || ''), String(pay.id));
      return { status: 'pix_ok' };
    }
  }

  return { status: a.status || 'pending' };
}

// Histórico de pagamentos da empresa no Mercado Pago (busca por external_reference).
export async function paymentHistory(uid: string): Promise<{ pagamentos: any[] }> {
  const user = await getUser(uid);
  if (!user.companyId) throw new Error('no_company');
  const token = await platformToken();
  const url = `${MP_API}/v1/payments/search?external_reference=${encodeURIComponent(user.companyId)}&sort=date_created&criteria=desc&limit=30`;
  const resp = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const data = await resp.json().catch(() => ({}));
  const results = Array.isArray((data as any)?.results) ? (data as any).results : [];
  const pagamentos = results.map((p: any) => ({
    id: String(p.id),
    data: p.date_approved || p.date_created || null,
    valor: Number(p.transaction_amount) || 0,
    metodo: p.payment_method_id || p.payment_type_id || '',
    status: p.status || 'unknown',
    descricao: p.description || '',
  }));
  return { pagamentos };
}

// ── PIX avulso (1 mês) — alternativa manual ao cartão recorrente ────────────
// Gera um pagamento PIX pontual. Quando aprovado (webhook ou polling), libera
// +30 dias via `pixPagoAte`. Não renova sozinho — o cliente paga a cada mês.
export async function subscribePix(uid: string, planId?: string): Promise<{ paymentId: string; qrCode: string; qrCodeBase64: string; ticketUrl: string; valor: number; expiraEm: string }> {
  const { user, valor, reason } = await resolveCharge(uid, planId);
  const token = await platformToken();

  const resp = await fetch(`${MP_API}/v1/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, 'X-Idempotency-Key': randomUUID() },
    body: JSON.stringify({
      transaction_amount: valor,
      description: `${reason} (1 mês)`,
      payment_method_id: 'pix',
      payer: { email: user.email },
      external_reference: user.companyId,
      notification_url: `${PUBLIC_BASE_URL}/api/mp/subscription-webhook`,
      metadata: { tipo: 'assinatura_pix', company_id: user.companyId, plan_id: planId || '' },
    }),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok || !data?.id) {
    console.error('[sub-pix] erro criar pix:', resp.status, JSON.stringify(data));
    const det = data?.message || (Array.isArray(data?.cause) && data.cause[0]?.description) || `HTTP ${resp.status}`;
    throw new Error(`mp_erro_pix: ${det}`);
  }
  const tx = data.point_of_interaction?.transaction_data || {};
  const company = await getDoc('companies', user.companyId);
  await db.collection('companies').doc(user.companyId).set({
    assinatura: { ...(company?.assinatura || {}), ...(planId ? { planId } : {}), valor, ultimoPixId: String(data.id), atualizadoEm: Timestamp.now() },
  }, { merge: true });

  return { paymentId: String(data.id), qrCode: tx.qr_code || '', qrCodeBase64: tx.qr_code_base64 || '', ticketUrl: tx.ticket_url || '', valor, expiraEm: data.date_of_expiration || '' };
}

// Consulta o status do PIX (o front faz polling). Se aprovado, aplica na hora
// (redundância ao webhook, que pode atrasar).
export async function subscriptionPixStatus(uid: string, paymentId: string): Promise<{ status: string }> {
  const user = await getUser(uid);
  if (!user.companyId) throw new Error('no_company');
  const token = await platformToken();
  const resp = await fetch(`${MP_API}/v1/payments/${paymentId}`, { headers: { Authorization: `Bearer ${token}` } });
  const pay = await resp.json().catch(() => ({}));
  const status = String(pay?.status || 'unknown');
  if (status === 'approved' && String(pay.external_reference) === user.companyId) {
    await aplicarPixAssinatura(user.companyId, String(pay?.metadata?.plan_id || ''), String(pay.id));
  }
  return { status };
}

// Aplica +30 dias de acesso via PIX. Idempotente por paymentId (não soma 2x).
async function aplicarPixAssinatura(companyId: string, planId: string, paymentId: string): Promise<void> {
  const company = await getDoc('companies', companyId);
  const a = company?.assinatura || {};
  if (paymentId && a.pixAplicadoId === paymentId) return; // já creditado
  const plano = planId ? await getDoc('planos', planId) : null;
  const base = Math.max(Date.now(), toMs(a.pixPagoAte) || 0);
  const novo = base + 30 * 86400000;
  await db.collection('companies').doc(companyId).set({
    assinatura: {
      ...a,
      ...(plano ? { planId, planoNome: plano.nome, valor: plano.valor, maxLojas: plano.maxLojas || 1 } : {}),
      pixPagoAte: Timestamp.fromMillis(novo), pixAplicadoId: paymentId, metodoPagamento: 'pix',
      inadimplenteDesde: null, atualizadoEm: Timestamp.now(),
    },
  }, { merge: true });
  console.log(`[sub-pix] empresa ${companyId} liberada até ${new Date(novo).toISOString()} (pix ${paymentId})`);
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
  // Sujeito a teste/cobrança quem tem plano legado OU funcionalidades/valor (à la carte).
  const temAssinatura = a && (a.planId || (Array.isArray(a.features) && a.features.length) || Number(a.valor) > 0);
  if (!temAssinatura) return livre();
  if (a.status === 'authorized') return livre();

  // PIX avulso: liberado enquanto os 30 dias pagos não venceram.
  const pixMs = toMs(a.pixPagoAte);
  if (pixMs && Date.now() < pixMs) return livre();

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

  // PIX avulso da assinatura (pagamento pontual aprovado).
  if (type === 'payment') {
    const id = body?.data?.id || body?.id;
    if (!id) return;
    const resp = await fetch(`${MP_API}/v1/payments/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    const pay = await resp.json().catch(() => null);
    if (!pay || pay.status !== 'approved') return;
    if (pay?.metadata?.tipo !== 'assinatura_pix') return; // só pagamentos de assinatura
    const companyId = String(pay.external_reference || pay?.metadata?.company_id || '');
    if (!companyId) return;
    await aplicarPixAssinatura(companyId, String(pay?.metadata?.plan_id || ''), String(pay.id));
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
