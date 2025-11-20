import sharedConfig, { ssr, browser } from '../../configs/vitest.config.mts';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      coverage: {
        exclude: ['examples/dismissal.tsx', 'examples/gestures.tsx']
      },
      projects: [ssr, browser]
    }
  })
);
