import { defineConfig, defaultExclude, type TestProjectConfiguration } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import replace from '@rollup/plugin-replace';
import { generateCdnUrl } from '../packages/@godaddy/generate-cdn-url/src/index.ts';

export const ssr: TestProjectConfiguration = {
  extends: true,
  test: {
    globals: true,
    name: 'SSR',
    include: ['./**/**/*.node.test.{ts,tsx}'],
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
};

export const browser: TestProjectConfiguration = {
  extends: true,
  test: {
    globals: true,
    name: 'Browser',
    include: ['./**/**/*.browser.test.{ts,tsx}'],
    browser: {
      instances: [{ browser: 'chromium' }],
      provider: playwright(),
      headless: true,
      enabled: true,
      screenshotFailures: false
    }
  }
};

export const visual: TestProjectConfiguration = {
  extends: true,
  test: {
    ...browser.test,
    name: 'Visual',
    include: ['./**/**/*.visual.test.{ts,tsx}']
  }
};

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    replace({
      preventAssignment: true,
      __CDN_URL__: generateCdnUrl({
        cdn: 'https://img6.wsimg.com/ux-assets',
        version: '5.0.0',
        packageName: '@ux/icon'
      })
    })
  ],
  test: {
    exclude: [...defaultExclude],
    coverage: {
      provider: 'v8',
      enabled: true,
      include: ['dist/**/*', 'src/**/*'],
      exclude: [
        'dist/**/**.d.{ts,cts,mts}',
        'dist/**/**.map',
        'dist/**/**.css',
        'examples/**/!(*.ts|*.tsx)',
        '**/**/*.module.css'
      ],
      reporter: ['text', 'json', 'html'],
      thresholds: {
        autoUpdate: false,
        perFile: true,
        'src/**.{ts,tsx}': {
          statements: 90,
          functions: 90,
          branches: 90,
          lines: 90
        }
      }
    }
  }
});
