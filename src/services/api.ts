// URL base do backend próprio (Fase 1 da migração).
// Em produção aponta para api.autoqui.com.br; em dev, localhost.
// Em dev (npm run dev), usa caminho relativo ('') para passar pelo proxy do Vite
// e evitar CORS. Em produção, aponta para o backend próprio.
export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL ??
  ((import.meta as any).env?.DEV ? '' : 'https://api.autoqui.com.br');
