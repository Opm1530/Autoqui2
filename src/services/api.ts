// URL base do backend próprio (Fase 1 da migração).
// Em produção aponta para api.autoqui.com.br; em dev, localhost.
// Em dev (npm run dev), usa caminho relativo ('') para passar pelo proxy do Vite
// e evitar CORS. Em produção, aponta para o backend próprio.
export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL ??
  ((import.meta as any).env?.DEV ? '' : 'https://api.autoqui.com.br');

// Domínio curto dedicado do encurtador de links do Rastreador (ex.: 'aqui.li').
// Deixe '' até comprar/apontar o domínio. Quando preenchido, o painel passa a
// mostrar/copiar os links como https://<host>/<codigo> (sem o /r/). O redirect
// em si já funciona automaticamente em qualquer domínio que não seja autoqui.com.br.
export const SHORT_LINK_HOST = '';
