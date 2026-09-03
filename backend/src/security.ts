// Camadas leves de proteção para os endpoints públicos.
// VULN-007: rate limiting em memória (sem dependência extra).
// VULN-008: validação do x-signature dos webhooks do Mercado Pago.
import { createHmac, timingSafeEqual } from 'crypto';
import type { Request, Response, NextFunction } from 'express';
import { MP_WEBHOOK_SECRET } from './config.js';

// ── Rate limiting (janela deslizante simples, por IP + rota) ─────────────────
interface Bucket { count: number; resetAt: number; }
const buckets = new Map<string, Bucket>();

// Limpa buckets vencidos de tempos em tempos (evita vazamento de memória).
setInterval(() => {
  const now = Date.now();
  for (const [key, b] of buckets) if (b.resetAt <= now) buckets.delete(key);
}, 60_000).unref?.();

function clientIp(req: Request): string {
  const fwd = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return fwd || req.ip || req.socket?.remoteAddress || 'unknown';
}

// Cria um middleware que permite `max` requisições por `windowMs` para cada IP.
export function rateLimit(max: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = `${req.baseUrl || ''}${req.path}|${clientIp(req)}`;
    const now = Date.now();
    let b = buckets.get(key);
    if (!b || b.resetAt <= now) { b = { count: 0, resetAt: now + windowMs }; buckets.set(key, b); }
    b.count++;
    if (b.count > max) {
      const retry = Math.ceil((b.resetAt - now) / 1000);
      res.setHeader('Retry-After', String(retry));
      console.warn(`[ratelimit] ${key} bloqueado (${b.count}/${max})`);
      return res.status(429).json({ error: 'rate_limited', retryAfter: retry });
    }
    next();
  };
}

// ── Assinatura do webhook do Mercado Pago (x-signature) ──────────────────────
// O MP manda: x-signature: "ts=<ts>,v1=<hmac>" e x-request-id.
// O manifesto é `id:<data.id>;request-id:<x-request-id>;ts:<ts>;` e o HMAC-SHA256
// usa a "Assinatura secreta" da aplicação. Doc: MP → Webhooks.
export function verifyMpSignature(req: Request): boolean {
  if (!MP_WEBHOOK_SECRET) return true; // sem segredo configurado → não bloqueia (re-verifica na API)

  const sig = String(req.headers['x-signature'] || '');
  const requestId = String(req.headers['x-request-id'] || '');
  // O MP exige o data.id alfanumérico em minúsculo no manifesto.
  const dataId = String((req.body?.data?.id ?? req.query['data.id'] ?? req.query['id'] ?? '')).trim().toLowerCase();

  const parts = Object.fromEntries(
    sig.split(',').map((kv) => kv.split('=').map((s) => s.trim())).filter((p) => p.length === 2)
  );
  const ts = parts['ts'];
  const v1 = parts['v1'];
  if (!ts || !v1) return false;

  // O manifesto omite campos vazios (dataId pode faltar em alguns eventos).
  let manifest = '';
  if (dataId) manifest += `id:${dataId};`;
  if (requestId) manifest += `request-id:${requestId};`;
  manifest += `ts:${ts};`;

  const expected = createHmac('sha256', MP_WEBHOOK_SECRET).update(manifest).digest('hex');
  try {
    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(v1, 'hex');
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
