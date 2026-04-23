import { resolve } from 'path';
import sharedConfig, { ssr, browser, visual } from '../../../configs/vitest.config.mts';
import { defineConfig, mergeConfig } from 'vitest/config';

const sourceAlias = {
  resolve: {
    alias: {
      '@godaddy/antares': resolve(__dirname, 'index.ts')
    }
  }
};

export default mergeConfig(
  sharedConfig,
  defineConfig({
    ...sourceAlias,
    test: {
      projects: [ssr, browser, visual]
    }
  })
);
