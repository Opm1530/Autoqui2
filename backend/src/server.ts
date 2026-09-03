import express from 'express';
import cors from 'cors';
import { PORT, ALLOWED_ORIGINS } from './config.js';
import { notifyNewOrder, notifyStatusChange, sendIntervention } from './notify.js';
import { requireAuth } from './auth.js';
import * as wa from './evolution.js';
import {
  createCatalogOrder, handleMpPaymentApproved,
  changeOrderStatus, archiveOrder, setComprovante, deleteOrder,
} from './orders.js';
import { saveProduct, deleteProduct, updateProductFields } from './products.js';
import { connectMp, disconnectMp, mpStatus } from './mercadopago.js';
import {
  saveCompany, toggleCompanyStatus, setCompanyStores,
  createEmployee, updateUser, setUserActive, deleteUser, saveWebhooks,
  previewRemoveStore, removeStore, toggleTool, getAdminMetrics,
} from './admin.js';
import {
  connectPlatformMp, platformMpStatus, disconnectPlatformMp,
  savePlan, deletePlan, subscribe, subscribePix, subscriptionPixStatus, refreshSubscriptionStatus, paymentHistory, cancelSubscription, mySubscription,
  handleSubscriptionWebhook, provisionSignup, listPublicPlans, isCompanyBlocked,
} from './subscriptions.js';
import { startCampaignJobs } from './campaigns.js';
import { getCrmConfig, saveCrmConfig } from './crm.js';
import { getPricing, savePricing } from './pricing.js';
import { listCoupons, saveCoupon, deleteCoupon, validateCoupon, applyCouponToCompany } from './coupons.js';
import { createDoc, updateDoc, deleteDoc } from './collections.js';
import { loadUser } from './currentUser.js';
import { assertInstanceOwner, assertCanCreate, shareQr, qrByToken, statusByToken } from './waInstances.js';
import { rateLimit, verifyMpSignature } from './security.js';
import { ecommerceRouter } from './ecommerce/router.js';
import { startEcommerceJobs } from './ecommerce/jobs.js';
import { storefrontPublicRouter, storefrontAuthRouter } from './ecommerce/storefront.js';
import { handleIncoming, activateCapture, deactivateCapture, clearCaptureForInstance, captureStatus, getConfig, saveRecompra, saveAutomacoes, saveFidelidade, sendFidelidade, sendLeadMessage, setUltimaCompra, startFarmaquiJobs, getLanding, saveLanding, setLandingHost, publicLanding, farmaMetrics, listRecompra, cancelRecompra, sendRecompraNow, groupsList, listGroupOffers, createGroupOffer, deleteGroupOffer, extractGroupLeads, extractAgendaLeads, createManualLead, numberHealth } from "./farmaqui.js";
import { trackEvent, getVitrineMetrics, getLandingMetrics, getCatalogFunnel, getLinksMetrics } from "./vitrineMetrics.js";
import { setStoreSubdomain, removeStoreSubdomain, storeByHost } from './domains.js';

// Enforcement de assinatura no backend: bloqueia escrita se inadimplente além
// da tolerância. Roda depois de requireAuth (usa req.uid). Fail-open em erro.
async function requireActiveSubscription(req: any, res: any, next: any) {
  try {
    if (await isCompanyBlocked(req.uid)) return res.status(402).json({ error: 'subscription_blocked' });
  } catch (e: any) { console.error('[sub-guard] erro (fail-open):', e?.message); }
  next();
}

// Empresa do usuário logado (a partir do doc users/{uid}).
async function companyOf(uid: string): Promise<string> {
  const user = await loadUser(uid);
  const companyId = user?.companyId;
  if (!companyId) throw new Error('no_company');
  return companyId;
}

const app = express();

// Atrás do nginx/docker: confia no primeiro proxy para ler o IP real (X-Forwarded-For).
app.set('trust proxy', 1);

app.use(express.json({ limit: '256kb' }));

// Storefront (widgets na loja NuvemShop): CORS ABERTO, montado ANTES do cors
// global, porque roda em domínios de loja que não estão na lista de origens.
app.use('/api/ecommerce/storefront', storefrontPublicRouter);

app.use(
  cors({
    origin(origin, cb) {
      // Permite: sem Origin (curl/health), origens autorizadas, e qualquer
      // subdomínio *.autoqui.com.br (catálogos/landings servidos por subdomínio).
      if (!origin || ALLOWED_ORIGINS.includes(origin) || /^https?:\/\/([a-z0-9-]+\.)+autoqui\.com\.br$/i.test(origin)) return cb(null, true);
      cb(new Error('Origin não permitida'));
    },
  })
);

// Healthcheck
app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

// Notificação de novo pedido.
// O cliente manda só { orderId }. O servidor lê o pedido no Firestore e resolve
// instância, telefone e mensagem — nada disso vem do navegador.
app.post('/api/notify-order', rateLimit(20, 60_000), async (req, res) => {
  const orderId = String(req.body?.orderId || '').trim();
  if (!orderId) return res.status(400).json({ error: 'orderId obrigatório' });

  try {
    const result = await notifyNewOrder(orderId);
    console.log(
      `[notify-order] ${orderId} -> ${result.sent ? 'ENVIADO' : 'nao (' + result.reason + ')'}`
    );
    return res.json(result);
  } catch (err: any) {
    console.error('[notify-order] erro:', err?.message || err);
    return res.status(500).json({ error: 'internal_error' });
  }
});

// Notificação de mudança de status (aceitar, pronto, saiu, finalizado, cancelado).
// O painel manda { orderId, newStatus, prevStatus?, reason? }. O servidor lê o
// pedido, monta a mensagem certa e envia pela Evolution.
// VULN-006: mudança de status é ação do painel (autenticada). O fluxo real do
// front já usa /api/orders/status; este fica protegido para não permitir a
// qualquer um disparar mensagens de WhatsApp em nome de um pedido.
app.post('/api/notify-status', requireAuth, async (req, res) => {
  const orderId = String(req.body?.orderId || '').trim();
  const newStatus = String(req.body?.newStatus || '').trim();
  const prevStatus = req.body?.prevStatus ? String(req.body.prevStatus) : undefined;
  const reason = req.body?.reason ? String(req.body.reason) : undefined;

  if (!orderId || !newStatus) {
    return res.status(400).json({ error: 'orderId e newStatus obrigatórios' });
  }

  try {
    const result = await notifyStatusChange(orderId, newStatus as any, prevStatus, reason);
    console.log(
      `[notify-status] ${orderId} ${newStatus} -> ${result.sent ? 'ENVIADO' : 'nao (' + result.reason + ')'}`
    );
    return res.json(result);
  } catch (err: any) {
    console.error('[notify-status] erro:', err?.message || err);
    return res.status(500).json({ error: 'internal_error' });
  }
});

// ── Criação de pedido do catálogo (público; preço recalculado no servidor) ──
app.post('/api/orders', rateLimit(15, 60_000), async (req, res) => {
  const b = req.body || {};
  if (!b.storeId || !Array.isArray(b.cart) || !b.customer?.name || !b.customer?.phone) {
    return res.status(400).json({ error: 'dados_incompletos' });
  }
  try {
    const result = await createCatalogOrder(b);
    console.log(`[orders] criado ${result.orderId} total=${result.total.toFixed(2)}`);
    return res.json(result);
  } catch (err: any) {
    const reason = err?.message || 'erro';
    console.warn(`[orders] recusado: ${reason}`);
    return res.status(400).json({ error: reason });
  }
});

// ── Mudança de status do pedido (autenticado; painel) ──
app.post('/api/orders/status', requireAuth, requireActiveSubscription, async (req, res) => {
  const { orderId, newStatus, reason, extraUpdates } = req.body || {};
  if (!orderId || !newStatus) return res.status(400).json({ error: 'orderId e newStatus obrigatórios' });
  try {
    const result = await changeOrderStatus((req as any).uid, { orderId, newStatus, reason, extraUpdates });
    console.log(`[orders/status] ${orderId} -> ${newStatus} (msg ${result.sent ? 'ok' : 'nao'})`);
    res.json(result);
  } catch (err: any) {
    console.warn(`[orders/status] recusado ${orderId}: ${err?.message}`);
    res.status(400).json({ error: err?.message || 'erro' });
  }
});

app.post('/api/orders/archive', requireAuth, requireActiveSubscription, async (req, res) => {
  const orderId = String(req.body?.orderId || '');
  const arquivado = req.body?.arquivado !== false; // default true
  if (!orderId) return res.status(400).json({ error: 'orderId obrigatório' });
  try {
    const result = await archiveOrder((req as any).uid, orderId, arquivado);
    res.json(result);
  } catch (err: any) {
    console.warn(`[orders/archive] recusado ${orderId}: ${err?.message}`);
    res.status(400).json({ error: err?.message || 'erro' });
  }
});

// Anexar comprovante (PIX manual) — público (o cliente do catálogo não tem login).
app.post('/api/orders/comprovante', rateLimit(20, 60_000), async (req, res) => {
  const { orderId, comprovanteUrl } = req.body || {};
  if (!orderId || !comprovanteUrl) return res.status(400).json({ error: 'orderId e comprovanteUrl obrigatórios' });
  try {
    const result = await setComprovante(String(orderId), String(comprovanteUrl));
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err?.message || 'erro' });
  }
});

// ── Gestão de produtos (autenticado; valida dono) ──
app.post('/api/products/save', requireAuth, requireActiveSubscription, async (req, res) => {
  const { id, data, companyId } = req.body || {};
  if (!data) return res.status(400).json({ error: 'data obrigatório' });
  try {
    const result = await saveProduct((req as any).uid, { id, data, companyId });
    console.log(`[products/save] ${id ? 'update ' + id : 'create ' + result.id}`);
    res.json(result);
  } catch (err: any) {
    console.warn(`[products/save] recusado: ${err?.message}`);
    res.status(400).json({ error: err?.message || 'erro' });
  }
});

app.post('/api/products/delete', requireAuth, requireActiveSubscription, async (req, res) => {
  const id = String(req.body?.id || '');
  if (!id) return res.status(400).json({ error: 'id obrigatório' });
  try {
    const result = await deleteProduct((req as any).uid, id);
    console.log(`[products/delete] ${id}`);
    res.json(result);
  } catch (err: any) {
    console.warn(`[products/delete] recusado: ${err?.message}`);
    res.status(400).json({ error: err?.message || 'erro' });
  }
});

app.post('/api/products/update-fields', requireAuth, requireActiveSubscription, async (req, res) => {
  const { id, fields } = req.body || {};
  if (!id || !fields) return res.status(400).json({ error: 'id e fields obrigatórios' });
  try {
    const result = await updateProductFields((req as any).uid, String(id), fields);
    console.log(`[products/update-fields] ${id} ${JSON.stringify(fields)}`);
    res.json(result);
  } catch (err: any) {
    console.warn(`[products/update-fields] recusado ${id}: ${err?.message}`);
    res.status(400).json({ error: err?.message || 'erro' });
  }
});

// ── Clientes (companies) / Usuários / Settings — grupo 1 (server-side) ──
const wrap = (fn: (req: any) => Promise<any>) => async (req: any, res: any) => {
  try { res.json(await fn(req)); }
  catch (err: any) { console.warn(`[api] ${req.method} ${req.originalUrl} recusado: ${err?.message} | body=${JSON.stringify(req.body || {}).slice(0, 300)}`); res.status(400).json({ error: err?.message || 'erro' }); }
};

app.post('/api/companies/save', requireAuth, wrap((req) => saveCompany(req.uid, { id: req.body?.id, data: req.body?.data, owner: req.body?.owner })));
app.get('/api/admin/metrics', requireAuth, wrap((req) => getAdminMetrics(req.uid)));
app.post('/api/companies/toggle-status', requireAuth, wrap((req) => toggleCompanyStatus(req.uid, String(req.body?.id), String(req.body?.status))));
app.post('/api/companies/preview-remove-store', requireAuth, wrap((req) => previewRemoveStore(req.uid, String(req.body?.companyId), String(req.body?.storeId))));
app.post('/api/companies/remove-store', requireAuth, wrap((req) => removeStore(req.uid, String(req.body?.companyId), String(req.body?.storeId))));
app.post('/api/orders/delete', requireAuth, wrap((req) => deleteOrder(req.uid, String(req.body?.orderId))));
app.post('/api/companies/set-stores', requireAuth, wrap((req) => setCompanyStores(req.uid, req.body?.companyId, req.body?.stores)));

app.post('/api/users/create-employee', requireAuth, wrap((req) => createEmployee(req.uid, req.body || {})));
app.post('/api/users/update', requireAuth, wrap((req) => updateUser(req.uid, String(req.body?.id), req.body?.fields || {})));
app.post('/api/users/set-active', requireAuth, wrap((req) => setUserActive(req.uid, String(req.body?.id), !!req.body?.active)));
app.post('/api/users/delete', requireAuth, wrap((req) => deleteUser(req.uid, String(req.body?.id))));

app.post('/api/settings/webhooks', requireAuth, wrap((req) => saveWebhooks(req.uid, req.body?.data || {})));
app.post('/api/tools/toggle', requireAuth, wrap((req) => toggleTool(req.uid, String(req.body?.toolKey), !!req.body?.active)));

// ── Módulo E-commerce (NuvemShop) ──
app.use('/api/ecommerce', ecommerceRouter);
app.use('/api/ecommerce', storefrontAuthRouter);

// ── FarmaQui (CRM) ──
// Público: o Evolution chama quando chega mensagem (captura de lead). Responde rápido.
app.post('/api/wa/incoming/:companyId', (req, res) => {
  res.status(200).json({ ok: true });
  handleIncoming(String(req.params.companyId), req.body || {}).catch((err) => console.error('[farmaqui] incoming erro:', err?.message));
});
app.post('/api/farmaqui/activate', requireAuth, wrap((req) => activateCapture(req.uid, String(req.body?.instanceName || ''))));
// Captação de leads genérica (usada pela Vitrine; mesma engine da FarmaQui).
app.get('/api/leadcapture/status', requireAuth, wrap((req) => captureStatus(req.uid)));
app.post('/api/leadcapture/activate', requireAuth, wrap((req) => activateCapture(req.uid, String(req.body?.instanceName || ''), String(req.body?.origem || 'whatsapp'))));
app.post('/api/leadcapture/deactivate', requireAuth, wrap((req) => deactivateCapture(req.uid)));
// Métricas da Vitrine: coleta pública (rate-limited) + leitura autenticada (cache 30min).
app.post('/api/track', rateLimit(120, 60_000), (req, res) => {
  trackEvent(req.body || {}).catch((err) => console.error('[vitrine] track erro:', err?.message));
  res.json({ ok: true }); // fire-and-forget
});
app.get('/api/vitrine/metrics', requireAuth, wrap((req) => getVitrineMetrics(req.uid, Number(req.query.days) || 30)));
app.get('/api/catalog/funnel', requireAuth, wrap((req) => getCatalogFunnel(req.uid, String(req.query.range || req.query.days || '30'))));
app.get('/api/farmaqui/landing-metrics', requireAuth, wrap((req) => getLandingMetrics(req.uid, Number(req.query.days) || 30)));
app.get('/api/links/metrics', requireAuth, wrap((req) => getLinksMetrics(req.uid, Number(req.query.days) || 30)));
app.get('/api/farmaqui/status', requireAuth, wrap((req) => captureStatus(req.uid)));
app.post('/api/farmaqui/deactivate', requireAuth, wrap((req) => deactivateCapture(req.uid)));
app.get('/api/farmaqui/config', requireAuth, wrap((req) => getConfig(req.uid)));
app.get('/api/farmaqui/metrics', requireAuth, wrap((req) => farmaMetrics(req.uid)));
app.get('/api/farmaqui/health', requireAuth, wrap((req) => numberHealth(req.uid)));
app.get('/api/farmaqui/recompra/list', requireAuth, wrap((req) => listRecompra(req.uid)));
app.post('/api/farmaqui/recompra/cancel', requireAuth, wrap((req) => cancelRecompra(req.uid, String(req.body?.leadId || ''))));
app.post('/api/farmaqui/recompra/send-now', requireAuth, wrap((req) => sendRecompraNow(req.uid, String(req.body?.leadId || ''))));
app.get('/api/farmaqui/groups', requireAuth, wrap((req) => groupsList(req.uid)));
app.get('/api/farmaqui/group-offers', requireAuth, wrap((req) => listGroupOffers(req.uid)));
app.post('/api/farmaqui/group-offers', requireAuth, wrap((req) => createGroupOffer(req.uid, req.body || {})));
app.post('/api/farmaqui/group-offers/delete', requireAuth, wrap((req) => deleteGroupOffer(req.uid, String(req.body?.id || ''))));
app.post('/api/farmaqui/extract-group', requireAuth, wrap((req) => extractGroupLeads(req.uid, String(req.body?.grupoJid || ''))));
app.post('/api/farmaqui/extract-agenda', requireAuth, wrap((req) => extractAgendaLeads(req.uid)));
app.post('/api/farmaqui/manual-lead', requireAuth, wrap((req) => createManualLead(req.uid, String(req.body?.nome || ''), String(req.body?.telefone || ''))));
app.post('/api/farmaqui/send-message', requireAuth, wrap((req) => sendLeadMessage(req.uid, String(req.body?.leadId || ''), String(req.body?.text || ''))));
app.post('/api/farmaqui/recompra', requireAuth, wrap((req) => saveRecompra(req.uid, req.body || {})));
app.post('/api/farmaqui/automacoes', requireAuth, wrap((req) => saveAutomacoes(req.uid, req.body || {})));
app.post('/api/farmaqui/fidelidade', requireAuth, wrap((req) => saveFidelidade(req.uid, req.body || {})));
app.post('/api/farmaqui/fidelidade/enviar', requireAuth, wrap((req) => sendFidelidade(req.uid, String(req.body?.leadId || ''))));
app.post('/api/farmaqui/ultima-compra', requireAuth, wrap((req) => setUltimaCompra(req.uid, String(req.body?.leadId || ''), String(req.body?.data || ''), Number(req.body?.cicloDias) || 30, String(req.body?.produto || ''))));
app.get('/api/farmaqui/landing', requireAuth, wrap((req) => getLanding(req.uid)));
app.post('/api/farmaqui/landing', requireAuth, wrap((req) => saveLanding(req.uid, req.body || {})));
app.post('/api/farmaqui/landing/host', requireAuth, wrap((req) => setLandingHost(req.uid, String(req.body?.subdominio || ''))));
app.get('/api/farmaqui/public-landing', wrap((req) => publicLanding(String(req.query.companyId || ''))));

// ── Domínios / subdomínios ──
app.get('/api/domains/store-by-host', wrap((req) => storeByHost(String(req.query.host || ''))));
app.post('/api/domains/subdomain', requireAuth, wrap((req) => setStoreSubdomain(req.uid, String(req.body?.storeId || ''), String(req.body?.subdominio || ''))));
app.delete('/api/domains/subdomain', requireAuth, wrap((req) => removeStoreSubdomain(req.uid, String(req.body?.storeId || ''))));

// ── Assinaturas (mensalidade dos clientes via MP da plataforma) ──
app.post('/api/platform-mp/connect', requireAuth, wrap((req) => connectPlatformMp(req.uid, String(req.body?.accessToken || ''))));
app.get('/api/platform-mp/status', requireAuth, wrap((req) => platformMpStatus(req.uid)));
app.post('/api/platform-mp/disconnect', requireAuth, wrap((req) => disconnectPlatformMp(req.uid)));

app.get('/api/plans/public', rateLimit(60, 60_000), wrap(() => listPublicPlans()));
app.post('/api/plans/save', requireAuth, wrap((req) => savePlan(req.uid, req.body || {})));
app.post('/api/plans/delete', requireAuth, wrap((req) => deletePlan(req.uid, String(req.body?.id))));

// Autocadastro: o front cria a conta no Firebase e chama isto com o ID token.
// Rate-limit pra não permitir criação de empresas em massa.
app.post('/api/signup/provision', requireAuth, rateLimit(5, 60_000), wrap((req) => provisionSignup(req.uid, { companyName: String(req.body?.companyName || ''), features: Array.isArray(req.body?.features) ? req.body.features : [], cupom: req.body?.cupom ? String(req.body.cupom) : undefined })));

app.get('/api/pricing', wrap(() => getPricing()));
app.post('/api/pricing/save', requireAuth, wrap((req) => savePricing(req.uid, req.body || {})));

app.get('/api/coupons', requireAuth, wrap((req) => listCoupons(req.uid)));
app.post('/api/coupons/save', requireAuth, wrap((req) => saveCoupon(req.uid, req.body || {})));
app.post('/api/coupons/delete', requireAuth, wrap((req) => deleteCoupon(req.uid, String(req.body?.id))));
app.get('/api/coupons/validate', wrap((req) => validateCoupon(String(req.query.codigo || ''))));
app.post('/api/coupons/apply-company', requireAuth, wrap((req) => applyCouponToCompany(req.uid, String(req.body?.companyId), String(req.body?.codigo || ''))));

app.get('/api/crm/config', requireAuth, wrap((req) => getCrmConfig(req.uid)));
app.post('/api/crm/config', requireAuth, wrap((req) => saveCrmConfig(req.uid, req.body || {})));

app.post('/api/subscription/subscribe', requireAuth, wrap((req) => subscribe(req.uid, req.body?.planId ? String(req.body.planId) : undefined)));
app.post('/api/subscription/pix', requireAuth, wrap((req) => subscribePix(req.uid, req.body?.planId ? String(req.body.planId) : undefined)));
app.get('/api/subscription/pix-status', requireAuth, wrap((req) => subscriptionPixStatus(req.uid, String(req.query.paymentId || ''))));
app.post('/api/subscription/cancel', requireAuth, wrap((req) => cancelSubscription(req.uid, req.body?.companyId)));
app.get('/api/subscription/mine', requireAuth, wrap((req) => mySubscription(req.uid)));
app.post('/api/subscription/refresh', requireAuth, wrap((req) => refreshSubscriptionStatus(req.uid)));
app.get('/api/subscription/payments', requireAuth, wrap((req) => paymentHistory(req.uid)));

app.post('/api/orders/intervene', requireAuth, wrap((req) => sendIntervention(req.uid, String(req.body?.orderId), String(req.body?.message || ''))));

// ── CRUD genérico (grupo 2/3): categorias, combos, loja_config, leads, clientes, agendamentos, campanhas, instancias ──
app.post('/api/data/create', requireAuth, requireActiveSubscription, wrap((req) => createDoc(req.uid, String(req.body?.collection), req.body?.data || {})));
app.post('/api/data/update', requireAuth, requireActiveSubscription, wrap((req) => updateDoc(req.uid, String(req.body?.collection), String(req.body?.id), req.body?.fields || {})));
app.post('/api/data/delete', requireAuth, requireActiveSubscription, wrap((req) => deleteDoc(req.uid, String(req.body?.collection), String(req.body?.id))));

// Webhook do MP para assinaturas (sem auth — o MP chama direto).
app.post('/api/mp/subscription-webhook', async (req, res) => {
  // A assinatura (x-signature) é defesa extra — mas o handler SEMPRE reconsulta o
  // status real na API do MP (com o token da plataforma), então um webhook forjado
  // não consegue "ativar" nada falso. Se a assinatura falhar, logamos e processamos
  // mesmo assim (evita perder confirmações reais por config/formato de assinatura).
  if (!verifyMpSignature(req)) console.warn('[sub-webhook] x-signature inválida — processando via reconsulta na API do MP');
  res.sendStatus(200);
  try { await handleSubscriptionWebhook(req.body || {}); }
  catch (err: any) { console.error('[sub-webhook] erro:', err?.message); }
});

// ── Conectar/gerenciar Mercado Pago (autenticado; token vai pro secrets) ──
app.get('/api/mp/status', requireAuth, async (req, res) => {
  try {
    const companyId = await companyOf((req as any).uid);
    res.json(await mpStatus(companyId));
  } catch (err: any) {
    res.status(400).json({ error: err?.message || 'erro' });
  }
});

app.post('/api/mp/connect', requireAuth, async (req, res) => {
  const accessToken = String(req.body?.accessToken || '').trim();
  if (!accessToken) return res.status(400).json({ error: 'accessToken obrigatório' });
  try {
    const companyId = await companyOf((req as any).uid);
    const result = await connectMp(companyId, accessToken);
    console.log(`[mp/connect] empresa ${companyId} -> ok (userId ${result.userId})`);
    res.json(result);
  } catch (err: any) {
    console.warn(`[mp/connect] recusado: ${err?.message}`);
    res.status(400).json({ error: err?.message || 'erro' });
  }
});

app.post('/api/mp/disconnect', requireAuth, async (req, res) => {
  try {
    const companyId = await companyOf((req as any).uid);
    const result = await disconnectMp(companyId);
    console.log(`[mp/disconnect] empresa ${companyId}`);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err?.message || 'erro' });
  }
});

// ── Webhook do Mercado Pago (público; o MP avisa quando o pagamento aprova) ──
// Confere o status na fonte (API do MP), então não confia cegamente no corpo.
app.post('/api/mp/webhook', async (req, res) => {
  if (!verifyMpSignature(req)) {
    console.warn('[mp-webhook] x-signature inválida — recusado');
    return res.status(401).json({ error: 'invalid_signature' });
  }
  // MP manda o id do pagamento no corpo (data.id) ou na query (?data.id= / ?id=).
  const paymentId = String(
    req.body?.data?.id || req.query['data.id'] || req.query['id'] || ''
  ).trim();

  // Responde 200 rápido (o MP reenvia se não receber 200).
  res.json({ received: true });

  if (!paymentId) return;
  try {
    const result = await handleMpPaymentApproved(paymentId);
    const label = result.handled
      ? `PAGO ${result.orderId}${result.novo ? ' (notificado)' : ' (ja processado)'}`
      : `ignorado (${result.status || 'sem pedido'})`;
    console.log(`[mp-webhook] pagamento ${paymentId} -> ${label}`);
  } catch (err: any) {
    console.error('[mp-webhook] erro:', err?.message || err);
  }
});

// ── WhatsApp / Evolution (proxy server-side; a chave não sai daqui) ──

// PÚBLICOS por TOKEN (a página /qr é sem login, mas o token não é adivinhável
// como o nome e expira em 15 min). VULN-005.
app.get('/api/wa/public-status/:token', rateLimit(60, 60_000), wrap((req) => statusByToken(String(req.params.token))));
app.get('/api/wa/public-qr/:token', rateLimit(60, 60_000), wrap((req) => qrByToken(String(req.params.token))));

// Gera o link de QR compartilhável (dono/admin da instância). VULN-005.
app.post('/api/wa/share-qr', requireAuth, wrap((req) => shareQr(req.uid, String(req.body?.instanceName || ''))));

// Autenticados + posse da instância (painel logado). VULN-004.
app.get('/api/wa/status/:name', requireAuth, wrap(async (req) => {
  await assertInstanceOwner(req.uid, String(req.params.name));
  return wa.getInstanceStatus(String(req.params.name));
}));

app.get('/api/wa/qrcode/:name', requireAuth, wrap(async (req) => {
  await assertInstanceOwner(req.uid, String(req.params.name));
  return wa.getQRCode(String(req.params.name));
}));

app.post('/api/wa/send-text', requireAuth, wrap(async (req) => {
  const { instanceName, number, text } = req.body || {};
  if (!instanceName || !number || !text) throw new Error('instanceName, number e text obrigatórios');
  await assertInstanceOwner(req.uid, String(instanceName));
  return { sent: await wa.sendText(instanceName, number, text) };
}));

app.post('/api/wa/create-instance', requireAuth, wrap(async (req) => {
  const { instanceName } = req.body || {};
  if (!instanceName) throw new Error('instanceName obrigatório');
  await assertCanCreate(req.uid, String(instanceName));
  return wa.createInstance(instanceName);
}));

app.post('/api/wa/set-webhook', requireAuth, wrap(async (req) => {
  const { instanceName, url, enabled } = req.body || {};
  if (!instanceName) throw new Error('instanceName obrigatório');
  await assertInstanceOwner(req.uid, String(instanceName));
  return { ok: await wa.setWebhook(instanceName, url || '', enabled !== false) };
}));

app.delete('/api/wa/instance/:name', requireAuth, wrap(async (req) => {
  const inst = await assertInstanceOwner(req.uid, String(req.params.name));
  const ok = await wa.deleteInstance(String(req.params.name));
  // Se a captação do FarmaQui apontava pra essa instância, desliga (não deixa a instância morta pendurada).
  try { await clearCaptureForInstance(String(inst?.empresaId || ''), String(req.params.name)); } catch { /* não bloqueia a exclusão */ }
  return { ok };
}));

app.post('/api/wa/logout/:name', requireAuth, wrap(async (req) => {
  await assertInstanceOwner(req.uid, String(req.params.name));
  return { ok: await wa.logoutInstance(String(req.params.name)) };
}));

app.get('/api/wa/instance-exists/:name', requireAuth, wrap(async (req) => {
  return { exists: await wa.instanceExists(String(req.params.name)) };
}));

app.listen(PORT, () => {
  console.log(`[autoqui-backend] ouvindo na porta ${PORT}`);
  startEcommerceJobs();
  startFarmaquiJobs();
  startCampaignJobs();
});
