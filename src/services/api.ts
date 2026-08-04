// URL base do backend próprio (Fase 1 da migração).
// Em produção aponta para api.autoqui.com.br; em dev, localhost.
export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL || 'https://api.autoqui.com.br';
