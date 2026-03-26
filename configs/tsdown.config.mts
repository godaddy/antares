import { type UserConfig } from 'tsdown';

export const shared: UserConfig = {
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: true,
  treeshake: true,
  dts: true
};
