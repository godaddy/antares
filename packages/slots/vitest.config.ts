import sharedConfig, { ssr, browser } from '../../configs/vitest.config.mts';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      coverage: {
        exclude: ['src/index.ts'],
        thresholds: {
          'src/**.{ts,tsx}': {
            statements: 90,
            functions: 100,
            branches: 90,
            lines: 95
          }
        }
      },
      projects: [ssr, browser]
    }
  })
);
