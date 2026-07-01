import sharedConfig, { ssr, browser, visual } from '../../../configs/vitest.config.mts';
import { defineConfig, mergeConfig } from 'vitest/config';
import replace from '@rollup/plugin-replace';
import { ICON_CDN_URL } from './utils/icon-types-generated.ts';

export default mergeConfig(
  sharedConfig,
  defineConfig({
    plugins: [
      replace({
        preventAssignment: true,
        __ICON_CDN_URL__: ICON_CDN_URL
      })
    ],
    test: {
      projects: [ssr, browser, visual]
    }
  })
);
