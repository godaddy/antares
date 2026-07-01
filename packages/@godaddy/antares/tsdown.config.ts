import packageJson from './package.json' with { type: 'json' };
import { replacePlugin } from 'rolldown/plugins';
import { generateCdnUrl } from '@godaddy/generate-cdn-url';
import { mergeConfig } from 'tsdown';
import { config } from '../../../configs/tsdown.config.mts';
import { DESIGN_ASSETS_MAJOR_VERSION, CDN, ICON_PACKAGE } from './utils/icon-types-generated.ts';

//
// Package versions can include prerelease tags (e.g. 1.2.3-alpha) or build metadata
// (e.g. 1.2.3+20230315). We only want the core version numbers for build-time
// constants, so we use regex to extract just the major.minor.patch parts.
//
// @see https://semver.org/
//
const versionMatch = packageJson.version.match(/^(\d+)\.(\d+)\.(\d+)/);
const versionParts = versionMatch ? versionMatch.slice(1) : ['0', '0', '0'];

const mergedConfig = mergeConfig(config, {
  plugins: [
    replacePlugin({
      major: versionParts[0],
      minor: versionParts[1],
      patch: versionParts[2],

      // The CDN URL our icons are deployed to, introduced as a build-time constant.
      __ICON_CDN_URL__: generateCdnUrl({
        cdn: CDN,
        version: DESIGN_ASSETS_MAJOR_VERSION,
        packageName: ICON_PACKAGE
      })
    })
  ],
  entry: ['./index.ts', './exports/*.ts'],
  css: {
    inject: true,
    modules: {
      generateScopedName: 'gda_[hash]_[local]'
    },
    splitting: true,
    minify: true
  }
});

export default mergedConfig;
