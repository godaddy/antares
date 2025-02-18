import { shared } from '../../configs/tsup.config.mjs';
import { defineConfig } from 'tsup';

export default defineConfig({
  ...shared,
  entryPoints: ['src/index.tsx', 'src/context.ts', 'src/override.ts', 'src/replace.ts']
});
