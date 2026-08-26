// Rotas do módulo E-commerce (montado em /api/ecommerce).
// O callback do OAuth é PÚBLICO (a NuvemShop redireciona o browser, sem token);
// o resto exige login.
import { Router, type Request, type Response } from 'express';
import { requireAuth } from '../auth.js';
import { integrationStatus, oauthUrl, testConnection, connectManual, reregister, disconnect, oauthCallback } from './integrations.js';
import { getAutomations, saveAutomation, deleteAutomation } from './automations.js';
import { processEcommerceEvent } from './webhook.js';

const wrap = (fn: (req: any) => Promise<any>) => async (req: any, res: any) => {
  try { res.json(await fn(req)); }
  catch (err: any) { console.warn(`[ecommerce] ${req.method} ${req.originalUrl} recusado: ${err?.message}`); res.status(400).json({ error: err?.message || 'erro' }); }
};

export const ecommerceRouter = Router();

// Público — a NuvemShop redireciona o navegador do lojista pra cá.
ecommerceRouter.get('/oauth/callback', async (req: Request, res: Response) => {
  const dest = await oauthCallback(String(req.query.code || ''), String(req.query.state || ''));
  res.redirect(dest);
});

// Público — a NuvemShop chama com o companyId no path (URL que NÓS registramos).
ecommerceRouter.post('/webhook/:companyId', (req: Request, res: Response) => {
  res.status(200).json({ ok: true }); // responde rápido; processa em background
  const companyId = String(req.params.companyId);
  const payload = req.body || {};
  const event = payload.event || req.headers['x-linked-store-event'] || req.headers['x-tiendanube-event'] || req.headers['x-nuvemshop-event'] || '';
  if (!payload.id) return;
  processEcommerceEvent(companyId, String(event), payload).catch((err) => console.error('[ecommerce] webhook erro:', err?.message));
});

// Autenticados (dono/admin).
ecommerceRouter.get('/integration', requireAuth, wrap((req) => integrationStatus(req.uid)));
ecommerceRouter.get('/oauth/url', requireAuth, wrap((req) => oauthUrl(req.uid)));
ecommerceRouter.post('/integration/test', requireAuth, wrap((req) => testConnection(req.uid, req.body || {})));
ecommerceRouter.post('/integration', requireAuth, wrap((req) => connectManual(req.uid, req.body || {})));
ecommerceRouter.post('/integration/reregister', requireAuth, wrap((req) => reregister(req.uid)));
ecommerceRouter.delete('/integration', requireAuth, wrap((req) => disconnect(req.uid)));

// Automações (CRUD).
ecommerceRouter.get('/automations', requireAuth, wrap((req) => getAutomations(req.uid)));
ecommerceRouter.post('/automations', requireAuth, wrap((req) => saveAutomation(req.uid, req.body || {})));
ecommerceRouter.delete('/automations/:trigger', requireAuth, wrap((req) => deleteAutomation(req.uid, String(req.params.trigger))));
