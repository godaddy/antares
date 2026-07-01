import sharedConfig, { ssr, browser, visual } from '../../../configs/vitest.config.mts';
import { defineConfig, mergeConfig } from 'vitest/config';
import replace from '@rollup/plugin-replace';
import { DESIGN_ASSETS_MAJOR_VERSION, CDN, ICON_PACKAGE } from './utils/icon-types-generated.ts';
import { generateCdnUrl } from '../../../packages/@godaddy/generate-cdn-url/src/index.ts';

export default mergeConfig(
  sharedConfig,
  defineConfig({
    plugins: [
      replace({
        preventAssignment: true,
        __ICON_CDN_URL__: generateCdnUrl({
          cdn: CDN,
          version: DESIGN_ASSETS_MAJOR_VERSION,
          packageName: ICON_PACKAGE
        })
      })
    ],
    test: {
      projects: [ssr, browser, visual]
    }
  })
);
