import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true
  },
  test: {
    globals: true,
    name: 'Scripts Tests',
    include: [join(__dirname, '**/*.node.test.{ts,tsx}')],
    environment: 'node'
  }
});
