import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Duas entradas:
//   index.html  → app atual (vanilla) — em produção, intocado
//   react.html  → novo app React (preview durante a migração)
// Quando o React estiver pronto, o index.html passa a apontar pro entry React.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        react: 'react.html',
      },
    },
  },
});
