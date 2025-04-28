import { defineConfig } from 'vitest/config';
import { join } from 'path';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: [join(__dirname, 'tests/test-setup.ts')],
    environment: 'jsdom',
    include: ['**/src/**/*.spec.ts'],
    reporters: ['default'],
  },
});
