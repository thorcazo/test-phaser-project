import { defineConfig } from 'vite';

export default defineConfig({
  base: '/', // Cambia esto a tu base URL si es diferente
  server: {
    port: 4321
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['phaser']
        }
      }
    }
  }
});
