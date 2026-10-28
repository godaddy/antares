import sharedConfig, { ssr } from '../../../configs/vitest.config.mts';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      // Each parsing operation owns a native compiler process.
      maxWorkers: 2,
      projects: [ssr]
    }
  })
);
