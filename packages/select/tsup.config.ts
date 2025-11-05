import { defineConfig } from 'tsup';

import { shared } from '../../configs/tsup.config.mjs';

export default defineConfig({
  ...shared,
  entry: ['src/index.tsx']
});
