import { type Options } from 'tsup';
import browserslistToEsbuild from 'browserslist-to-esbuild';

export const shared: Options = {
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: true,
  treeshake: true,
  // TODO: figure out why splitting: false breaks builds
  splitting: true,
  loader: {".css": "local-css"},
  target: browserslistToEsbuild(),
  // TODO: Renable this once TS is fixed in packages
  // dts: true
};
