import { type Options } from 'tsup';
import browserslistToEsbuild from 'browserslist-to-esbuild';

export const shared: Options = {
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: browserslistToEsbuild(),
  external: ['react', 'react-dom']
  // TODO: Renable this once TS is fixed in packages
  // dts: true
};
