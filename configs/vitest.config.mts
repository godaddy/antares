import { defineConfig, defaultExclude, type UserProjectConfigExport } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';

export const ssr = {
  test: {
    globals: true,
    name: 'SSR',
    include: ['./components/**/*.node.test.{ts,tsx}'],
    environment: 'node',
    css: {
      modules: {
        classNameStrategy: 'non-scoped'
      }
    },
    server: {
      deps: {
        inline: [/@bento\/.*/]
      }
    }
  }
} satisfies UserProjectConfigExport;

export const browser = {
  test: {
    globals: true,
    name: 'Browser',
    include: ['./components/**/*.browser.test.{ts,tsx}'],
    browser: {
      instances: [{ browser: 'chromium' }],
      provider: playwright(),
      headless: true,
      enabled: true,
      screenshotFailures: false
    }
  }
} satisfies UserProjectConfigExport;

export const visual: UserProjectConfigExport = {
  test: {
    ...browser.test,
    name: 'Visual',
    include: ['./components/**/*.visual.test.{ts,tsx}']
  }
};

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    exclude: [...defaultExclude],
    coverage: {
      provider: 'v8',
      enabled: true,
      include: ['dist/**/*', 'src/**/*', 'examples/**/*'],
      exclude: ['dist/**.d.{ts,cts,mts}', 'dist/**.map', 'dist/**.css'],
      reporter: ['text', 'json', 'html'],
      thresholds: {
        autoUpdate: false,
        perFile: true,
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
