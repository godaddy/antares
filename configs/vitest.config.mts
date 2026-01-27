import { defineConfig, defaultExclude, type UserProjectConfigExport } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export const ssr = {
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    name: 'SSR',
    include: ['./test/**/*.node.test.{ts,tsx}'],
    environment: 'node'
  }
} as const satisfies UserProjectConfigExport;

export const browser = {
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    name: 'Browser',
    include: ['./test/**/*.browser.test.{ts,tsx}'],
    browser: {
      instances: [{ browser: 'chromium' }],
      provider: 'playwright',
      headless: true,
      enabled: true
    }
  }
} as const satisfies UserProjectConfigExport;

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
        autoUpdate: false,
        perFile: true,
        statements: 100,
        functions: 100,
        branches: 100,
        lines: 100,
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
} as const satisfies ReturnType<typeof defineConfig>);
