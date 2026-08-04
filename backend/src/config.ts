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
