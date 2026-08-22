// Wrapper da API NuvemShop (Tiendanube). Portado do EcoQui.
// Auth: header "Authentication: bearer {token}". Base: /v1/{store_id}/...
import { NUVEMSHOP_APP_ID, NUVEMSHOP_APP_SECRET } from '../config.js';

const BASE_URL = 'https://api.nuvemshop.com.br/v1';
const USER_AGENT = 'AutoQui/1.0 (suporte@autoqui.com.br)';

function headers(accessToken: string) {
  return {
    'Content-Type': 'application/json',
    Authentication: `bearer ${accessToken}`,
    'User-Agent': USER_AGENT,
  };
}

type ApiRes = { ok: boolean; status?: number; data?: any; error?: string };

async function request(method: string, storeId: string, accessToken: string, path: string, body?: any): Promise<ApiRes> {
  const url = `${BASE_URL}/${storeId}${path}`;
  try {
    const res = await fetch(url, { method, headers: headers(accessToken), body: body ? JSON.stringify(body) : undefined });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.warn(`[nuvemshop] ${method} ${path} -> HTTP ${res.status}: ${text.slice(0, 200)}`);
      return { ok: false, status: res.status, error: text };
    }
    if (res.status === 204) return { ok: true, data: null };
    const data = await res.json().catch(() => null);
    return { ok: true, data };
  } catch (err: any) {
    console.error(`[nuvemshop] ${method} ${path} -> ${err?.message}`);
    return { ok: false, error: err?.message };
  }
}

// ── OAuth: troca o code pelo access_token permanente ──
export async function exchangeToken(code: string): Promise<{ access_token: string; user_id: string | number } | null> {
  const res = await fetch('https://www.nuvemshop.com.br/apps/authorize/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: NUVEMSHOP_APP_ID,
      client_secret: NUVEMSHOP_APP_SECRET,
      grant_type: 'authorization_code',
      code: String(code),
    }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    console.error(`[nuvemshop] token exchange falhou: ${res.status} ${t.slice(0, 200)}`);
    return null;
  }
  return res.json().catch(() => null);
}

// ── Store ──
export async function getStoreInfo(storeId: string, accessToken: string): Promise<any | null> {
  const res = await request('GET', storeId, accessToken, '/');
  return res.ok ? res.data : null;
}

// ── Webhooks ──
const WEBHOOK_EVENTS = ['order/created', 'order/updated', 'order/paid', 'order/packed', 'order/fulfilled', 'order/cancelled'];

export async function registerWebhooks(storeId: string, accessToken: string, callbackUrl: string) {
  const listRes = await request('GET', storeId, accessToken, '/webhooks');
  const existing: any[] = listRes.ok ? (listRes.data || []) : [];
  const registered: { event: string; status: string; detail?: string }[] = [];
  for (const event of WEBHOOK_EVENTS) {
    if (existing.some((w) => w.event === event && w.url === callbackUrl)) {
      registered.push({ event, status: 'already_exists' });
      continue;
    }
    const res = await request('POST', storeId, accessToken, '/webhooks', { event, url: callbackUrl });
    registered.push({ event, status: res.ok ? 'created' : 'error', detail: res.error });
  }
  return registered;
}

export async function removeWebhooks(storeId: string, accessToken: string, callbackUrl: string) {
  const listRes = await request('GET', storeId, accessToken, '/webhooks');
  if (!listRes.ok) return;
  const mine = (listRes.data || []).filter((w: any) => w.url === callbackUrl);
  for (const wh of mine) await request('DELETE', storeId, accessToken, `/webhooks/${wh.id}`);
}

// ── Orders / Checkouts / Customers / Products (fases seguintes) ──
export const getOrder = (storeId: string, token: string, orderId: string) =>
  request('GET', storeId, token, `/orders/${orderId}`).then((r) => (r.ok ? r.data : null));

export const getOrdersByCustomer = (storeId: string, token: string, customerId: string) =>
  request('GET', storeId, token, `/orders?customer_id=${customerId}&per_page=5&sort_by=created_at&sort_direction=desc`).then((r) => (r.ok ? r.data || [] : []));

export async function getAbandonedCheckouts(storeId: string, token: string, minISO?: string, maxISO?: string) {
  const params = new URLSearchParams({ status: 'open', per_page: '50', ...(minISO && { created_at_min: minISO }), ...(maxISO && { created_at_max: maxISO }) });
  const res = await request('GET', storeId, token, `/checkouts?${params}`);
  return res.ok ? res.data || [] : [];
}

// ── Helpers de payload ──
export function extractPhone(order: any): string | null {
  const raw = order?.customer?.phone || order?.contact_phone || order?.billing_address?.phone || order?.shipping_address?.phone || '';
  let digits = String(raw).replace(/\D/g, '');
  if (digits.startsWith('55') && digits.length > 11) digits = digits.slice(2);
  return digits || null;
}
export const extractName = (order: any): string =>
  order?.customer?.name || order?.customer?.first_name || order?.contact_name || 'Cliente';
export const extractProducts = (order: any): string => {
  const products = order?.products || order?.items || [];
  return products.map((p: any) => `• ${p.name || p.product_name || 'Produto'} (x${p.quantity || 1})`).join('\n');
};
