import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Duas entradas:
//   index.html  → app atual (vanilla) — em produção, intocado
//   react.html  → novo app React (preview durante a migração)
// Quando o React estiver pronto, o index.html passa a apontar pro entry React.
// Em dev, serve o entry React (react.html) para as rotas públicas do catálogo/QR,
// para dá pra testar o React sem o cutover (que só acontece quando estiver 100%).
function reactPreviewRoutes() {
  return {
    name: 'react-preview-routes',
    configureServer(server: any) {
      server.middlewares.use((req: any, _res: any, next: any) => {
        if (req.url && (req.url.startsWith('/catalog/') || req.url.startsWith('/qr/'))) {
          req.url = '/react.html';
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), reactPreviewRoutes()],
  // Em dev, repassa /api pro backend real (evita CORS no localhost:5173).
  // O proxy é server-side, então o backend não recebe Origin de navegador.
  server: {
    proxy: {
      '/api': {
        // Aponte pro backend local com: VITE_API_TARGET=http://localhost:3005 npm run dev
        target: process.env.VITE_API_TARGET || 'https://api.autoqui.com.br',
        changeOrigin: true,
        secure: true,
        // O backend rejeita Origins fora da lista (autoqui.com.br) com erro 500.
        // Como o proxy é server-side, removemos o Origin do navegador (localhost)
        // para o backend tratar como requisição sem Origin (permitida).
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.removeHeader('origin');
          });
        },
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
