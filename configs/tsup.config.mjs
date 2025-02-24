import browserslistToEsbuild from 'browserslist-to-esbuild';
import { spawn } from 'node:child_process';

export const shared = {
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: browserslistToEsbuild(),
  external: ['react', 'react-dom'],
  onSuccess: function onSuccess() {
    spawn('npx', ['tsc'], { stdio: 'inherit' });
  }
};
