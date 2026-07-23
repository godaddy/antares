import sharedConfig, { ssr, browser, visual } from '../../../configs/vitest.config.mts';
import { defineConfig, mergeConfig } from 'vitest/config';
import replace from '@rollup/plugin-replace';
import { generateCdnUrl } from '@godaddy/generate-cdn-url';
import { CDN, ICON_PACKAGE, DESIGN_ASSETS_MAJOR_VERSION } from './utils/icon-cdn.generated.ts';

export default mergeConfig(
  sharedConfig,
  defineConfig({
    plugins: [
      replace({
        preventAssignment: true,
        __ICON_CDN_URL__: generateCdnUrl({
          cdn: CDN,
          packageName: ICON_PACKAGE,
          version: DESIGN_ASSETS_MAJOR_VERSION
        })
      })
    ],
    test: {
      projects: [ssr, browser, visual]
    }
  })
);
