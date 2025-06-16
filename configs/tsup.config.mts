import { type Options } from 'tsup';
import browserslistToEsbuild from 'browserslist-to-esbuild';

export const shared: Options = {
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: true,
  treeshake: true,
  loader: {'.css': 'copy'},
  target: browserslistToEsbuild(),
  dts: true
};
