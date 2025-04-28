import { defineConfig } from 'vitest/config'
import { join } from 'path';
console.log('***dirname from top***',join(__dirname));
export default defineConfig({
  test: {
    workspace: ['apps/*/vitest.config.ts'],
    coverage: {
      enabled: true,
      extension: ['.ts'],
      include: ['**/src/**/*.ts'],
      exclude: [
        '**/*.spec.ts',
        '**/*.test.ts',
        '**/test-setup.ts',
        '**/tests/**',
      ],
      reporter: ['json'],
      reportsDirectory: join(__dirname, '.nyc_output'),
      provider: 'istanbul',
    },
  },
});
