// import { defineConfig } from 'vitest/config';
// import { join } from 'path';

// export default defineConfig({
//   test: {
//     root: __dirname,
//     globals: true,
//     setupFiles: [join(process.cwd(), 'test-helpers/test-setup.ts')],
//     environment: 'jsdom',
//     include: ['src/**/*.spec.ts'],
//     reporters: ['default']
//   },
// });

import { getConfig } from '../../test-helpers/vitest-base';

export default getConfig(__dirname);