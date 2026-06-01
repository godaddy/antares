import { config } from '../../../configs/tsdown.config.mts';
import pkg from './package.json' with { type: 'json' };
import { mergeConfig } from 'tsdown';

const { version } = pkg;

//
// Package versions can include prerelease tags (e.g. 1.2.3-alpha) or build
// metadata (e.g. 1.2.3+20230315). We only want the core version numbers for
// build-time constants, so we use regex to extract just the major.minor.patch
// parts.
//
// @see https://semver.org/
//
const versionMatch = version.match(/^(\d+)\.(\d+)\.(\d+)/);
const semver = versionMatch ? versionMatch.slice(1) : ['0', '0', '0'];

export default mergeConfig(config, {
  entry: ['src/index.ts'],
  define: {
    major: JSON.stringify(semver[0]),
    minor: JSON.stringify(semver[1]),
    patch: JSON.stringify(semver[2])
  }
});
