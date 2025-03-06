import { defineConfig, defaultExclude } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export const ssr = {
  test: {
    name: 'SSR',
    include: ['./test/**/*.node.test.{ts,tsx}'],
    environment: 'node'
  }
};

export const browser = {
  test: {
    name: 'Browser',
    include: ['./test/**/*.browser.test.{ts,tsx}'],
    browser: {
      provider: 'playwright',
      enabled: true
    }
  }
};

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    exclude: [...defaultExclude, 'test/**/*.visual.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      enabled: true,
      include: [
        'src/**/*' // Track source files
      ],
      reporter: ['text', 'json', 'html'],
      thresholds: {
        functions: 100,
        statements: 100,
        branches: 100,
        lines: 100
      }
    }
  }
});
