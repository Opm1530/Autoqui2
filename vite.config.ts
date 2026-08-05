import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Duas entradas:
//   index.html  → app atual (vanilla) — em produção, intocado
//   react.html  → novo app React (preview durante a migração)
// Quando o React estiver pronto, o index.html passa a apontar pro entry React.
export default defineConfig({
  plugins: [react()],
  // Em dev, repassa /api pro backend real (evita CORS no localhost:5173).
  // O proxy é server-side, então o backend não recebe Origin de navegador.
  server: {
    proxy: {
      '/api': {
        target: 'https://api.autoqui.com.br',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        react: 'react.html',
      },
    },
  },
});
