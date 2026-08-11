import express from 'express';
import cors from 'cors';
import { PORT, ALLOWED_ORIGINS } from './config.js';
import { notifyNewOrder, notifyStatusChange, sendIntervention } from './notify.js';
import { requireAuth } from './auth.js';
import * as wa from './evolution.js';
import {
  createCatalogOrder, handleMpPaymentApproved,
  changeOrderStatus, archiveOrder, setComprovante,
} from './orders.js';
import { saveProduct, deleteProduct, updateProductFields } from './products.js';
import { connectMp, disconnectMp, mpStatus } from './mercadopago.js';
import {
  saveCompany, toggleCompanyStatus, setCompanyStores,
  createEmployee, updateUser, setUserActive, deleteUser, saveWebhooks,
} from './admin.js';
import {
  connectPlatformMp, platformMpStatus, disconnectPlatformMp,
  savePlan, deletePlan, subscribe, cancelSubscription, mySubscription,
  handleSubscriptionWebhook,
} from './subscriptions.js';
import { createDoc, updateDoc, deleteDoc } from './collections.js';
import { getDoc } from './firebase.js';

// Empresa do usuário logado (a partir do doc users/{uid}).
async function companyOf(uid: string): Promise<string> {
  const user = await getDoc('users', uid);
  const companyId = user?.companyId;
  if (!companyId) throw new Error('no_company');
  return companyId;
}

const app = express();

app.use(express.json({ limit: '256kb' }));
app.use(
  cors({
    origin(origin, cb) {
      // Permite requisições sem Origin (curl/health) e as origens autorizadas.
      if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
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
app.post('/api/notify-order', async (req, res) => {
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
app.post('/api/notify-status', async (req, res) => {
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
app.post('/api/orders', async (req, res) => {
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
app.post('/api/orders/status', requireAuth, async (req, res) => {
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

app.post('/api/orders/archive', requireAuth, async (req, res) => {
  const orderId = String(req.body?.orderId || '');
  if (!orderId) return res.status(400).json({ error: 'orderId obrigatório' });
  try {
    const result = await archiveOrder((req as any).uid, orderId);
    res.json(result);
  } catch (err: any) {
    console.warn(`[orders/archive] recusado ${orderId}: ${err?.message}`);
    res.status(400).json({ error: err?.message || 'erro' });
  }
});

// Anexar comprovante (PIX manual) — público (o cliente do catálogo não tem login).
app.post('/api/orders/comprovante', async (req, res) => {
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
app.post('/api/products/save', requireAuth, async (req, res) => {
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

app.post('/api/products/delete', requireAuth, async (req, res) => {
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

app.post('/api/products/update-fields', requireAuth, async (req, res) => {
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
  catch (err: any) { console.warn(`[admin] recusado: ${err?.message}`); res.status(400).json({ error: err?.message || 'erro' }); }
};

app.post('/api/companies/save', requireAuth, wrap((req) => saveCompany(req.uid, { id: req.body?.id, data: req.body?.data, owner: req.body?.owner })));
app.post('/api/companies/toggle-status', requireAuth, wrap((req) => toggleCompanyStatus(req.uid, String(req.body?.id), String(req.body?.status))));
app.post('/api/companies/set-stores', requireAuth, wrap((req) => setCompanyStores(req.uid, req.body?.companyId, req.body?.stores)));

app.post('/api/users/create-employee', requireAuth, wrap((req) => createEmployee(req.uid, req.body || {})));
app.post('/api/users/update', requireAuth, wrap((req) => updateUser(req.uid, String(req.body?.id), req.body?.fields || {})));
app.post('/api/users/set-active', requireAuth, wrap((req) => setUserActive(req.uid, String(req.body?.id), !!req.body?.active)));
app.post('/api/users/delete', requireAuth, wrap((req) => deleteUser(req.uid, String(req.body?.id))));

app.post('/api/settings/webhooks', requireAuth, wrap((req) => saveWebhooks(req.uid, req.body?.data || {})));

// ── Assinaturas (mensalidade dos clientes via MP da plataforma) ──
app.post('/api/platform-mp/connect', requireAuth, wrap((req) => connectPlatformMp(req.uid, String(req.body?.accessToken || ''))));
app.get('/api/platform-mp/status', requireAuth, wrap((req) => platformMpStatus(req.uid)));
app.post('/api/platform-mp/disconnect', requireAuth, wrap((req) => disconnectPlatformMp(req.uid)));

app.post('/api/plans/save', requireAuth, wrap((req) => savePlan(req.uid, req.body || {})));
app.post('/api/plans/delete', requireAuth, wrap((req) => deletePlan(req.uid, String(req.body?.id))));

app.post('/api/subscription/subscribe', requireAuth, wrap((req) => subscribe(req.uid, String(req.body?.planId))));
app.post('/api/subscription/cancel', requireAuth, wrap((req) => cancelSubscription(req.uid, req.body?.companyId)));
app.get('/api/subscription/mine', requireAuth, wrap((req) => mySubscription(req.uid)));

app.post('/api/orders/intervene', requireAuth, wrap((req) => sendIntervention(req.uid, String(req.body?.orderId), String(req.body?.message || ''))));

// ── CRUD genérico (grupo 2/3): categorias, combos, loja_config, leads, clientes, agendamentos, campanhas, instancias ──
app.post('/api/data/create', requireAuth, wrap((req) => createDoc(req.uid, String(req.body?.collection), req.body?.data || {})));
app.post('/api/data/update', requireAuth, wrap((req) => updateDoc(req.uid, String(req.body?.collection), String(req.body?.id), req.body?.fields || {})));
app.post('/api/data/delete', requireAuth, wrap((req) => deleteDoc(req.uid, String(req.body?.collection), String(req.body?.id))));

// Webhook do MP para assinaturas (sem auth — o MP chama direto).
app.post('/api/mp/subscription-webhook', async (req, res) => {
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

// Públicos (a página de QR é acessada sem login):
app.get('/api/wa/status/:name', async (req, res) => {
  const name = String(req.params.name);
  const result = await wa.getInstanceStatus(name);
  console.log(`[wa/status] ${name} -> ${result.state}`);
  res.json(result);
});

app.get('/api/wa/qrcode/:name', async (req, res) => {
  const name = String(req.params.name);
  const result = await wa.getQRCode(name);
  console.log(`[wa/qrcode] ${name} -> ${result ? 'qr gerado' : 'sem qr'}`);
  res.json(result);
});

// Protegidos por ID token (gestão de instâncias e envio):
app.post('/api/wa/send-text', requireAuth, async (req, res) => {
  const { instanceName, number, text } = req.body || {};
  if (!instanceName || !number || !text) {
    return res.status(400).json({ error: 'instanceName, number e text obrigatórios' });
  }
  const ok = await wa.sendText(instanceName, number, text);
  console.log(`[wa/send-text] ${instanceName} -> ${ok ? 'ENVIADO' : 'falhou'}`);
  res.json({ sent: ok });
});

app.post('/api/wa/create-instance', requireAuth, async (req, res) => {
  const { instanceName } = req.body || {};
  if (!instanceName) return res.status(400).json({ error: 'instanceName obrigatório' });
  try {
    const result = await wa.createInstance(instanceName);
    console.log(`[wa/create-instance] ${instanceName} -> ok`);
    res.json(result);
  } catch (err: any) {
    console.log(`[wa/create-instance] ${instanceName} -> erro: ${err?.message}`);
    res.status(500).json({ error: err?.message || 'erro' });
  }
});

app.post('/api/wa/set-webhook', requireAuth, async (req, res) => {
  const { instanceName, url, enabled } = req.body || {};
  if (!instanceName) return res.status(400).json({ error: 'instanceName obrigatório' });
  const ok = await wa.setWebhook(instanceName, url || '', enabled !== false);
  console.log(`[wa/set-webhook] ${instanceName} -> ${ok ? 'ok' : 'falhou'}`);
  res.json({ ok });
});

app.delete('/api/wa/instance/:name', requireAuth, async (req, res) => {
  const name = String(req.params.name);
  const ok = await wa.deleteInstance(name);
  console.log(`[wa/delete] ${name} -> ${ok ? 'ok' : 'falhou'}`);
  res.json({ ok });
});

app.post('/api/wa/logout/:name', requireAuth, async (req, res) => {
  const name = String(req.params.name);
  const ok = await wa.logoutInstance(name);
  console.log(`[wa/logout] ${name} -> ${ok ? 'ok' : 'falhou'}`);
  res.json({ ok });
});

app.get('/api/wa/instance-exists/:name', requireAuth, async (req, res) => {
  const name = String(req.params.name);
  const exists = await wa.instanceExists(name);
  console.log(`[wa/exists] ${name} -> ${exists}`);
  res.json({ exists });
});

app.listen(PORT, () => {
  console.log(`[autoqui-backend] ouvindo na porta ${PORT}`);
});
