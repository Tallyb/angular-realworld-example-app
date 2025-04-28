/// <reference types="vitest" />

import { defineConfig } from 'vite';

import angular from '@analogjs/vite-plugin-angular';

export default defineConfig(({ mode }) => ({
  plugins: [angular()],
  server: {
    port: 4200,
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));