import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/WebCard/',
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Heavy 3D libs go into their own chunk so the initial bundle
          // doesn't carry them — they hydrate after the hero markup paints.
          three: ['three', '@react-three/fiber'],
        },
      },
    },
  },
  server: {
    host: true,
  },
});
