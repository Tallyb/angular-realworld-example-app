import { defineConfig } from 'vitest/config';
import { join } from 'path';

export const getConfig = (root: string) => defineConfig({
  test: {
    root,
    globals: true,
    setupFiles: [join(__dirname, 'test-setup.ts')],
    include: [join(root, 'src/**/*.spec.ts')],
    environment: 'jsdom',
    reporters: ['default']
  },
});