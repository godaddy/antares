import sharedConfig, { ssr } from '../../../configs/vitest.config.mts';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      projects: [ssr]
    }
  })
);
