import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.gltf'], // Include GLTF files
  build: {
    assetsInlineLimit: 4096,
    assetsDir: 'assets',
  },
});
