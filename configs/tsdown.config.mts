import { defineConfig } from 'tsdown';

export const config = defineConfig({
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: true,
  treeshake: true,
  dts: {
    sourcemap: true
  }
})
