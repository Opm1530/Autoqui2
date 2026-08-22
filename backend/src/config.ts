// Configuração central — lê tudo de variáveis de ambiente.
// Nenhum segredo fica no código.

export const PORT = Number(process.env.PORT || 3005);

export const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://autoqui.com.br')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

export const EVOLUTION_API_URL =
  process.env.EVOLUTION_API_URL || 'https://evolution.vps.pequi.digital';

export const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || '';

if (!EVOLUTION_API_KEY) {
  console.warn('[config] EVOLUTION_API_KEY não definida — envios de WhatsApp vão falhar.');
}

// URL pública do próprio backend — usada como notification_url do Mercado Pago
// (é aqui que o MP avisa quando o pagamento é aprovado).
export const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL || 'https://api.autoqui.com.br';

// URL do painel (usada como back_url do checkout de assinatura do Mercado Pago).
export const PANEL_URL = process.env.PANEL_URL || 'https://autoqui.com.br';

// E-mails tratados como admin da plataforma mesmo sem documento em `users`
// (mesma regra de bootstrap que o frontend já usava).
export const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'ginannymoreira@gmail.com')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

// Segredo do webhook do Mercado Pago (Painel MP → Webhooks → "Assinatura secreta").
// Se definido, o backend valida o header x-signature (HMAC-SHA256) e recusa
// chamadas forjadas. Se vazio, mantém o comportamento antigo (só re-verifica na
// API do MP) — assim não quebra em produção antes de você configurar o segredo.
export const MP_WEBHOOK_SECRET = process.env.MP_WEBHOOK_SECRET || '';

// App NuvemShop (módulo E-commerce). client_id/secret do app no Partner Portal.
export const NUVEMSHOP_APP_ID = process.env.NUVEMSHOP_APP_ID || '';
export const NUVEMSHOP_APP_SECRET = process.env.NUVEMSHOP_APP_SECRET || '';
