import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// CUTOVER FEITO: index.html agora aponta pro app React (src/react/main.tsx).
// react.html permanece só como entrada legada de preview (remover na limpeza,
// junto com o app vanilla em src/pages + src/main.ts).
export default defineConfig({
  plugins: [react()],
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
