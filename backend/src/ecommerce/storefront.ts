// Widgets de vitrine (rodam DENTRO da loja NuvemShop via script injetado).
// Fase 4 — Passo 0 (fundação) + Brinde no carrinho.
import { Router, type Request, type Response } from 'express';
import { Timestamp } from 'firebase-admin/firestore';
import { db } from '../firebase.js';
import { loadUser } from '../currentUser.js';
import { requireAuth } from '../auth.js';
import { PUBLIC_BASE_URL } from '../config.js';

const SECTIONS = ['roulette', 'videos', 'shoppable', 'reward', 'product', 'checkout'];

async function companyOf(uid: string): Promise<string> {
  const user = await loadUser(uid);
  if (user.role !== 'owner' && user.role !== 'admin') throw new Error('forbidden');
  if (!user.companyId) throw new Error('no_company');
  return user.companyId;
}

async function integrationByStore(storeId: string): Promise<any | null> {
  const snap = await db.collection('ecommerce_integrations').where('storeId', '==', String(storeId)).where('active', '==', true).limit(1).get();
  return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
}

// ── Config do painel (autenticado) ──
export async function getStorefront(uid: string) {
  const companyId = await companyOf(uid);
  const doc = await db.collection('ecommerce_storefront').doc(companyId).get();
  return doc.exists ? doc.data() : {};
}

export async function saveStorefront(uid: string, body: any) {
  const companyId = await companyOf(uid);
  const section = String(body?.section || '');
  if (!SECTIONS.includes(section)) throw new Error('secao_invalida');
  await db.collection('ecommerce_storefront').doc(companyId).set({ [section]: body?.data || {}, updatedAt: Timestamp.now() }, { merge: true });
  return { ok: true };
}

// ── Config pública (lida pelo script na loja; sem segredos/pesos) ──
async function publicConfig(storeId: string) {
  const integ = await integrationByStore(storeId);
  if (!integ) return {};
  const doc = await db.collection('ecommerce_storefront').doc(integ.companyId).get();
  const cfg: any = doc.exists ? doc.data() : {};
  // Por enquanto expõe só o brinde (reward). Roleta virá com os pesos removidos.
  return { reward: cfg.reward || null };
}

// ── Loader JS (servido inline; BASE fixado no domínio do AutoQui) ──
export function loaderScript(): string {
  const BASE = JSON.stringify(PUBLIC_BASE_URL);
  return `(function(){'use strict';
if(window.__autoquiLoaded)return;window.__autoquiLoaded=true;
var BASE=${BASE};
function selfScript(){if(document.currentScript)return document.currentScript;var s=document.getElementsByTagName('script');for(var i=s.length-1;i>=0;i--){if((s[i].src||'').indexOf('/storefront/loader.js')!==-1)return s[i];}return null;}
var script=selfScript();var src=(script&&script.src)||'';
function getStoreId(){try{var u=new URL(src);var q=u.searchParams.get('store')||u.searchParams.get('store_id');if(q)return q;}catch(e){}if(window.LS&&window.LS.store&&window.LS.store.id)return String(window.LS.store.id);if(window.LS&&window.LS.storeId)return String(window.LS.storeId);return null;}
var STORE_ID=getStoreId();if(!STORE_ID)return;
var isCheckout=!!window.SDKCheckout||/\\/checkout(\\/|$)/.test(location.pathname);
function el(tag,css,html){var n=document.createElement(tag);if(css)n.style.cssText=css;if(html!=null)n.innerHTML=html;return n;}
function brl(n){return 'R$ '+(Number(n)||0).toFixed(2).replace('.',',');}
function escapeHtml(s){return String(s||'').replace(/[&<>"']/g,function(m){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m];});}
function readCartSubtotal(){try{if(window.LS&&window.LS.cart&&window.LS.cart.subtotal!=null)return Number(window.LS.cart.subtotal)/100;}catch(e){}var node=document.querySelector('.js-cart-subtotal,[data-cart-subtotal]');if(node){var dp=node.getAttribute('data-price');if(dp!=null&&dp!==''){var c=Number(dp);if(!isNaN(c))return c/100;}var t=(node.textContent||'').replace(/[^\\d.,]/g,'').replace(/\\./g,'').replace(',','.');var n=parseFloat(t);if(!isNaN(n))return n;}return null;}
function initReward(r){var threshold=Number(r.threshold)||0;if(threshold<=0)return;var color=r.color||'#10b981';var atBottom=r.position==='bottom';
var bar=el('div','position:fixed;left:0;right:0;'+(atBottom?'bottom:0;':'top:0;')+'z-index:2147481800;background:'+color+';color:#fff;font-family:system-ui,Arial;font-size:13px;padding:8px 14px;text-align:center;display:none;');
var msg=el('div','font-weight:700;margin-bottom:5px;');var track=el('div','height:6px;border-radius:6px;background:rgba(255,255,255,.35);max-width:420px;margin:0 auto;overflow:hidden;');var fill=el('div','height:100%;width:0%;background:#fff;border-radius:6px;transition:width .4s;');
track.appendChild(fill);bar.appendChild(msg);bar.appendChild(track);document.body.appendChild(bar);
function render(){var subtotal=readCartSubtotal();if(subtotal==null||subtotal<=0){bar.style.display='none';return;}bar.style.display='block';
if(subtotal>=threshold){var reached=(r.msgReached||'\\uD83C\\uDF89 Voce desbloqueou {{recompensa}}!').replace(/\\{\\{recompensa\\}\\}/g,escapeHtml(r.rewardLabel||''));msg.innerHTML=reached+(r.couponCode?' <strong style="text-decoration:underline;cursor:pointer;" title="Copiar">'+escapeHtml(r.couponCode)+'</strong>':'');fill.style.width='100%';if(r.couponCode){var strong=msg.querySelector('strong');if(strong)strong.onclick=function(){try{navigator.clipboard.writeText(r.couponCode);strong.textContent='Copiado!';}catch(e){}};}}
else{var falta=threshold-subtotal;msg.innerHTML=(r.msgBefore||'Faltam {{falta}} para ganhar {{recompensa}}! \\uD83C\\uDF81').replace(/\\{\\{falta\\}\\}/g,'<strong>'+brl(falta)+'</strong>').replace(/\\{\\{recompensa\\}\\}/g,'<strong>'+escapeHtml(r.rewardLabel||'')+'</strong>');fill.style.width=Math.max(4,Math.min(100,(subtotal/threshold)*100))+'%';}}
render();try{var node=document.querySelector('.js-cart-subtotal,[data-cart-subtotal]');if(node&&window.MutationObserver){new MutationObserver(render).observe(node,{childList:true,characterData:true,subtree:true,attributes:true});}}catch(e){}setInterval(render,2500);}
fetch(BASE+'/api/ecommerce/storefront/config/'+STORE_ID).then(function(r){return r.json();}).then(function(cfg){try{if(!isCheckout&&cfg.reward&&cfg.reward.enabled)initReward(cfg.reward);}catch(e){}}).catch(function(){});
})();`;
}

// ── Routers ──
// Público (CORS aberto): montar ANTES do cors global do server.
export const storefrontPublicRouter = Router();
storefrontPublicRouter.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  if (_req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
storefrontPublicRouter.get('/loader.js', (_req: Request, res: Response) => {
  res.type('application/javascript').set('Cache-Control', 'public, max-age=300').send(loaderScript());
});
storefrontPublicRouter.get('/config/:storeId', async (req: Request, res: Response) => {
  try { res.json(await publicConfig(String(req.params.storeId))); }
  catch { res.json({}); }
});

// Autenticado (painel) — montar no router principal do ecommerce.
export const storefrontAuthRouter = Router();
const wrap = (fn: (req: any) => Promise<any>) => async (req: any, res: any) => {
  try { res.json(await fn(req)); } catch (err: any) { res.status(400).json({ error: err?.message || 'erro' }); }
};
storefrontAuthRouter.get('/widgets', requireAuth, wrap((req) => getStorefront(req.uid)));
storefrontAuthRouter.post('/widgets', requireAuth, wrap((req) => saveStorefront(req.uid, req.body || {})));
