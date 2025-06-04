import { shared } from '../../configs/tsup.config.mjs';
import { version } from './package.json';
import { defineConfig } from 'tsup';

export default defineConfig({
  ...shared,
  entryPoints: ['src/index.ts'],

  /**
   * Introduces the version of the package as a define variable in the build,
   * allowing the code to reference major, minor, and patch versions numbers.
   *
   * @param {import('esbuild').BuildOptions} options - The options object passed to esbuild.
   * @returns {void}
   * @private
   */
  esbuildOptions(options) {
    //
    // Package versions can include prerelease tags (e.g. 1.2.3-alpha) or build metadata
    // (e.g. 1.2.3+20230315). We only want the core version numbers for build-time
    // constants, so we use regex to extract just the major.minor.patch parts.
    //
    // @see https://semver.org/
    //
    const versionMatch = version.match(/^(\d+)\.(\d+)\.(\d+)/);
    const semver = versionMatch ? versionMatch.slice(1) : ['0', '0', '0'];

    options.define ??= {};
    ['major', 'minor', 'patch'].forEach((key, index) => {
      options.define[key] = semver[index];
    });
  }
});
