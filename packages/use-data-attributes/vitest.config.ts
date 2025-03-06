import sharedConfig, { ssr } from '../../configs/vitest.config.mts';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      // TODO: re-enable coverage once able to get it to track source files even though we are using dist in the exports
      coverage: { enabled: false },
      workspace: [ssr]
    }
  })
);
