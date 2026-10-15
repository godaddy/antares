import { join } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true
  },
  test: {
    globals: true,
    name: 'Scripts Tests',
    include: [join(import.meta.dirname, '**/*.node.test.{ts,tsx}')],
    environment: 'node'
  }
});
