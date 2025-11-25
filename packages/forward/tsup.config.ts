import { defineConfig } from 'tsup';
import browserslistToEsbuild from 'browserslist-to-esbuild';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: browserslistToEsbuild()
});



