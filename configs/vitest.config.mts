import { defineConfig, defaultExclude } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export const ssr = {
  test: {
    globals: true,
    name: 'SSR',
    include: ['./test/**/*.node.test.{ts,tsx}'],
    environment: 'node',
    plugins: [react(), tsconfigPaths()]
  }
};

export const browser = {
  test: {
    globals: true,
    name: 'Browser',
    include: ['./test/**/*.browser.test.{ts,tsx}'],
    browser: {
      instances: [{ browser: 'chromium' }],
      provider: 'playwright',
      headless: true,
      enabled: true
    },
    plugins: [react(), tsconfigPaths()]
  }
};

export default defineConfig({
  test: {
    exclude: [...defaultExclude, 'test/**/*.visual.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      enabled: true,
      include: ['dist/**/*', 'src/**/*', 'examples/**/*'],
      exclude: ['dist/**.d.ts'],
      ignoreEmptyLines: true,
      reporter: ['text', 'json', 'html'],
      thresholds: {
        'src/**.{ts,tsx}': {
          statements: 100,
          functions: 100,
          branches: 100,
          lines: 100
        },
        'examples/**.{ts,tsx}': {
          statements: 100,
          functions: 100,
          branches: 100,
          lines: 100
        }
      }
    }
  }
});
