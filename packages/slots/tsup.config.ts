import { shared } from '../../configs/tsup.config.mts';
import { defineConfig } from 'tsup';

export default defineConfig({
  ...shared,
  entry: ['src/index.tsx', 'src/context.ts', 'src/override.ts', 'src/replace.ts']
});
