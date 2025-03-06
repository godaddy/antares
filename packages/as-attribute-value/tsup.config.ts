import { shared } from '../../configs/tsup.config.mts';
import { defineConfig } from 'tsup';

export default defineConfig({
  ...shared,
  entryPoints: ['src/index.ts']
});
