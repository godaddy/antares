import { defineConfig, mergeConfig } from 'vitest/config';

import sharedConfig, { browser, ssr } from '../../configs/vitest.config.mts';

export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      projects: [ssr, browser]
    }
  })
);
