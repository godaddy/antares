import sharedConfig, {
  ssr,
  browser as browserConfig,
  visual as visualConfig
} from '../../../configs/vitest.config.mts';
import { defineConfig, mergeConfig, type TestProjectInlineConfiguration } from 'vitest/config';
import replace from '@rollup/plugin-replace';
import { generateCdnUrl } from '../generate-cdn-url/src/index.ts';
import { CDN, ICON_PACKAGE, DESIGN_ASSETS_VERSION } from './utils/icon-cdn.ts';

// Opt into React Aria's normal windowing in browser tests; preserve the SSR test fallback.
const virtualizerConfig: Pick<TestProjectInlineConfiguration, 'define'> = {
  define: { 'process.env.VIRT_ON': JSON.stringify('1') }
};

const browser: TestProjectInlineConfiguration = {
  ...browserConfig,
  ...virtualizerConfig
};

const visual: TestProjectInlineConfiguration = {
  ...visualConfig,
  ...virtualizerConfig
};

export default mergeConfig(
  sharedConfig,
  defineConfig({
    plugins: [
      replace({
        preventAssignment: true,
        __ICON_CDN_URL__: generateCdnUrl({
          cdn: CDN,
          packageName: ICON_PACKAGE,
          version: DESIGN_ASSETS_VERSION
        })
      })
    ],
    test: {
      coverage: {
        include: ['components/**/*.{ts,tsx}', 'utils/**/*.{ts,tsx}'],
        exclude: ['**/examples/**', '**/test/**', '**/*.stories.tsx']
      },
      projects: [ssr, browser, visual]
    }
  })
);
