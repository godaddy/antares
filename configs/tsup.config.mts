import { type Options } from 'tsup';
import browserslistToEsbuild from 'browserslist-to-esbuild';

export const shared: Options = {
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: true,
  treeshake: true,
  // TODO: figure out why splitting: false breaks builds
  splitting: false,
  loader: {".css": "local-css"},
  target: browserslistToEsbuild(),
  dts: true
};
