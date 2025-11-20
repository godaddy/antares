import sharedConfig, { ssr, browser } from '../../configs/vitest.config.mts';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      coverage: {
        exclude: ['examples/form.tsx']
      },
      projects: [ssr, browser]
    }
  })
);
