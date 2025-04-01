import sharedConfig, { ssr, browser } from '../../configs/vitest.config.mts';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      workspace: [ssr, browser],
      coverage: {
        thresholds: {
          //
          // Lower the coverage thresholds for the icon package to 90% because
          // the coverage reporter is including `import` statements and
          // `empty lines` as part of the coverage check.
          //
          'src/**.{ts,tsx}': {
            statements: 90,
            functions: 90,
            branches: 90,
            lines: 90
          }
        }
      }
    }
  })
);
