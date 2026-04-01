import sharedConfig, { ssr, browser, visual } from '../../../configs/vitest.config.mts';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      projects: [ssr, browser, visual]
    }
  })
);
