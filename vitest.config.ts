import { defineConfig } from 'vitest/config'
import { join } from 'path';
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

// export const getConfig = (root: string) => defineConfig({
//   test: {
//     root,
//     globals: true,
//     setupFiles: [join(__dirname, 'test-setup.ts')],
//     include: [join(root, 'src/**/*.spec.ts')],
//     environment: 'jsdom',
//     reporters: ['default']
//   },
// });

console.log(__dirname);
export default defineConfig({
  plugins: [angular(), nxViteTsPaths()],
  test: {
    workspace: [{
      extends: true,
      test: {
        name: 'vite',
        dir: join(__dirname, 'apps/vite'),
        include: ['**/src/**/*.spec.ts']
      },
    }],
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
