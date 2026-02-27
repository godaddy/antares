import { shared } from '../../../configs/tsdown.config.mts';
import { defineConfig } from 'tsdown';

export default defineConfig({
  ...shared,
  entry: ['src/index.ts']
});
