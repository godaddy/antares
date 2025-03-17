import { defineConfig, mergeConfig } from 'vitest/config';
import sharedConfig, { ssr, browser } from '../../configs/vitest.config.mts';

export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      workspace: [ssr, browser]
    }
  })
);
