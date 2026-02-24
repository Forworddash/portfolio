import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  build: {
    // Optimize for production
    minify: 'terser',
    // Terser type definitions can conflict with some TS setups. Cast to `any`
    // so we can keep `drop_console` without a type error.
    terserOptions: ({
      compress: {
        drop_console: true, // Remove console logs in production
      },
    } as any),
    // Code splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    // Security headers for development
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
});
