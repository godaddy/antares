import { defineConfig, defaultExclude } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

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
      instances: [{ browser: 'chromium' }],
      provider: 'playwright',
      headless: true,
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
      include: ['dist/**', 'examples/**/*', 'src/**/*'],
      exclude: ['dist/**.d.ts'],
      reporter: ['text', 'json', 'html'],
      thresholds: {
        'examples/**.{ts,tsx}': {
          statements: 100,
          functions: 100,
          lines: 100,
          //
          // Every example seems to have 1 line introduced by the compiler that
          // cannot be reached, making it impossible to reach 100% coverage on
          // branches. So we're ignoring branches for the examples and have a
          // 100% threshold for the rest of the code.
          //
        },
        'src/**.{ts,tsx}': {
          statements: 100,
          functions: 100,
          branches: 100,
          lines: 100
        }
      }
    }
  }
});
