/// <reference types="vitest" />
import { join } from 'path';
import { defineConfig } from 'vite';

import angular from '@analogjs/vite-plugin-angular';

process.env.TZ = 'UTC';
process.env.LANG = 'en_US';
console.log(process.env.TZ);

export default defineConfig(({ mode }) => ({
  plugins: [angular()],
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));