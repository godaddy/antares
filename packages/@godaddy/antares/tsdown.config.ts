import packageJson from './package.json' with { type: 'json' };
import { replacePlugin } from 'rolldown/plugins';
import { generateCdnUrl } from '@godaddy/generate-cdn-url';
import { mergeConfig } from 'tsdown';
import { config } from '../../../configs/tsdown.config.mts';

//
// Package versions can include prerelease tags (e.g. 1.2.3-alpha) or build metadata
// (e.g. 1.2.3+20230315). We only want the core version numbers for build-time
// constants, so we use regex to extract just the major.minor.patch parts.
//
// @see https://semver.org/
//
const versionMatch = packageJson.version.match(/^(\d+)\.(\d+)\.(\d+)/);
const versionParts = versionMatch ? versionMatch.slice(1) : ['0', '0', '0'];

//
// The source of our icon files is deployed to a CDN, we need to introduce
// the CDN URL as a build-time constant.
//
// NOTE: We use the major version of the design assets package version
// as the version of the icons, this needs to be in-sync with the version
// of `@ux/icons` as we share the same source files, and that package
// deploys the assets to the CDN.
//
// TODO: Import the design assets package.json when the dependency is available.
// For now, fall back to the current package version.
//
const cdnUrl = generateCdnUrl({
  cdn: 'https://img6.wsimg.com/ux-assets',
  version: '5.0.0',
  packageName: '@ux/icon'
});

const mergedConfig = mergeConfig(config, {
  plugins: [
    config.plugins,
    replacePlugin({
      major: versionParts[0],
      minor: versionParts[1],
      patch: versionParts[2],
      __CDN_URL__: cdnUrl
    })
  ],
  entry: ['./index.tsx'],
  dts: {
    sourcemap: true
  },
  sourcemap: true,
  clean: true,
  treeshake: true
});

export default mergedConfig;
