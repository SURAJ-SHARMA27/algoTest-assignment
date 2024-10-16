import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://prices.algotest.xyz',  // The target URL for the proxy
        changeOrigin: true,   // Required to handle CORS
        rewrite: (path) => path.replace(/^\/api/, ''),  // Remove /api prefix when forwarding the request
      },
    },
  },
});
