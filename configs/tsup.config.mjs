import browserslistToEsbuild from 'browserslist-to-esbuild';

export const shared = {
  format: ['esm', 'cjs'],
  sourcemap: true,
  experimentalDts: true,
  clean: true,
  treeshake: true,
  target: browserslistToEsbuild(),
  external: ['react', 'react-dom']
};
