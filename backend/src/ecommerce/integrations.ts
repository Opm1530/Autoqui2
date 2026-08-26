// Conexão da loja NuvemShop (módulo E-commerce). Fase 1.
// Segurança: companyId SEMPRE vem do usuário logado (loadUser), nunca do cliente.
import { randomBytes } from 'crypto';
import { Timestamp } from 'firebase-admin/firestore';
import { db } from '../firebase.js';
import { loadUser } from '../currentUser.js';
import { PUBLIC_BASE_URL, PANEL_URL, NUVEMSHOP_APP_ID } from '../config.js';
import { exchangeToken, getStoreInfo, registerWebhooks, removeWebhooks } from './nuvemshop.js';

const STATE_TTL_MS = 15 * 60 * 1000; // link de autorização válido por 15 min

async function companyOf(uid: string, needOwner = false): Promise<string> {
  const user = await loadUser(uid);
  if (needOwner && user.role !== 'owner' && user.role !== 'admin') throw new Error('forbidden');
  if (!user.companyId && user.role !== 'admin') throw new Error('no_company');
  if (!user.companyId) throw new Error('no_company');
  return user.companyId;
}

const webhookUrl = (companyId: string) => `${PUBLIC_BASE_URL}/api/ecommerce/webhook/${companyId}`;

export async function getIntegration(companyId: string): Promise<any | null> {
  const snap = await db.collection('ecommerce_integrations')
    .where('companyId', '==', companyId).where('active', '==', true).limit(1).get();
  return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
}

// Grava a integração (desativa a anterior + registra webhooks). Reutilizado no OAuth e no manual.
async function saveIntegration(companyId: string, storeId: string, accessToken: string, storeName: string, storeUrl: string) {
  const existing = await getIntegration(companyId);
  if (existing) {
    await db.collection('ecommerce_integrations').doc(existing.id).update({ active: false });
    try { await removeWebhooks(existing.storeId, existing.accessToken, webhookUrl(companyId)); } catch { /* ignora */ }
  }
  const whUrl = webhookUrl(companyId);
  const webhooks = await registerWebhooks(storeId, accessToken, whUrl).catch(() => [] as any[]);
  await db.collection('ecommerce_integrations').add({
    companyId, platform: 'nuvemshop', storeId: String(storeId), accessToken,
    storeName: storeName || '', storeUrl: storeUrl || '', webhookUrl: whUrl,
    webhooksRegistered: webhooks.filter((w: any) => w?.status !== 'error').length > 0,
    active: true, connectedAt: Timestamp.now(),
  });
  return { webhooks };
}

// ── Endpoints autenticados ──

// Status da integração (sem expor o accessToken).
export async function integrationStatus(uid: string) {
  const companyId = await companyOf(uid);
  const it = await getIntegration(companyId);
  if (!it) return { connected: false };
  const { accessToken, ...safe } = it;
  return { connected: true, ...safe, hasToken: !!accessToken };
}

// Gera a URL de autorização com um state opaco (mapeado à empresa, expira em 15 min).
export async function oauthUrl(uid: string) {
  const companyId = await companyOf(uid, true);
  if (!NUVEMSHOP_APP_ID) throw new Error('app_nao_configurado');
  const state = randomBytes(24).toString('hex');
  await db.collection('ecommerce_oauth_states').doc(state).set({
    companyId, exp: Timestamp.fromMillis(Date.now() + STATE_TTL_MS),
  });
  return { url: `https://www.nuvemshop.com.br/apps/${NUVEMSHOP_APP_ID}/authorize?state=${state}` };
}

// Valida credenciais manuais (storeId + token) sem salvar.
export async function testConnection(uid: string, body: any) {
  await companyOf(uid, true);
  const storeId = String(body?.storeId || '').trim();
  const accessToken = String(body?.accessToken || '').trim();
  if (!storeId || !accessToken) throw new Error('storeId e accessToken obrigatórios');
  const info = await getStoreInfo(storeId, accessToken);
  if (!info) throw new Error('credenciais_invalidas');
  return { ok: true, storeName: info.name?.pt || info.name || 'Loja sem nome', storeUrl: info.main_domain || '' };
}

// Conecta manualmente (loja que prefere colar o token em vez de OAuth).
export async function connectManual(uid: string, body: any) {
  const companyId = await companyOf(uid, true);
  const storeId = String(body?.storeId || '').trim();
  const accessToken = String(body?.accessToken || '').trim();
  if (!storeId || !accessToken) throw new Error('storeId e accessToken obrigatórios');
  const info = await getStoreInfo(storeId, accessToken);
  if (!info) throw new Error('credenciais_invalidas');
  const { webhooks } = await saveIntegration(companyId, storeId, accessToken, info.name?.pt || info.name || '', info.main_domain || '');
  return { ok: true, webhooks };
}

export async function reregister(uid: string) {
  const companyId = await companyOf(uid, true);
  const it = await getIntegration(companyId);
  if (!it) throw new Error('integracao_nao_encontrada');
  try { await removeWebhooks(it.storeId, it.accessToken, webhookUrl(companyId)); } catch { /* ignora */ }
  const webhooks = await registerWebhooks(it.storeId, it.accessToken, webhookUrl(companyId));
  await db.collection('ecommerce_integrations').doc(it.id).update({
    webhooksRegistered: webhooks.filter((w) => w.status !== 'error').length > 0, webhooksDetail: webhooks, updatedAt: Timestamp.now(),
  });
  return { ok: true, webhooks };
}

export async function disconnect(uid: string) {
  const companyId = await companyOf(uid, true);
  const it = await getIntegration(companyId);
  if (!it) return { ok: true };
  await db.collection('ecommerce_integrations').doc(it.id).update({ active: false });
  try { await removeWebhooks(it.storeId, it.accessToken, webhookUrl(companyId)); } catch { /* ignora */ }
  return { ok: true };
}

// ── Callback público (browser redirect da NuvemShop) ──
// Resolve o state → companyId, troca o code por token e salva. Redireciona pro painel.
export async function oauthCallback(code: string, state: string): Promise<string> {
  const fail = (msg: string) => `${PANEL_URL}/ecommerce?oauth=error&msg=${encodeURIComponent(msg)}`;
  if (!code || !state) return fail('Parâmetros inválidos');
  try {
    const stateDoc = await db.collection('ecommerce_oauth_states').doc(state).get();
    if (!stateDoc.exists) return fail('Sessão de autorização inválida');
    const { companyId, exp } = stateDoc.data() as any;
    await stateDoc.ref.delete().catch(() => {});
    const expMs = exp?.toDate ? exp.toDate().getTime() : 0;
    if (!companyId || !expMs || Date.now() > expMs) return fail('Sessão de autorização expirada');

    const tok = await exchangeToken(String(code));
    if (!tok?.access_token || !tok?.user_id) return fail('Falha na autenticação com a NuvemShop');
    const storeId = String(tok.user_id);
    const info = await getStoreInfo(storeId, tok.access_token).catch(() => null);
    await saveIntegration(companyId, storeId, tok.access_token, info?.name?.pt || info?.name || '', info?.main_domain || '');
    console.log(`[ecommerce] empresa ${companyId} conectou loja NuvemShop ${storeId}`);
    return `${PANEL_URL}/ecommerce?oauth=success`;
  } catch (err: any) {
    console.error('[ecommerce] oauth callback erro:', err?.message);
    return fail(err?.message || 'erro');
  }
}
