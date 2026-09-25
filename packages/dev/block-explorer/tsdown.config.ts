import { config } from '../../../configs/tsdown.config.mts';
import { mergeConfig } from 'tsdown';

export default mergeConfig(config, {
  entry: ['src/index.ts', 'src/runtime.tsx', 'src/node-entry.ts', 'src/storybook.tsx', 'src/storybook-runtime.tsx'],
  deps: {
    neverBundle: [/^@godaddy\/antares$/, /^@storybook\//, /^react(?:$|\/)/],
    dts: {
      neverBundle: true
    }
  },
  css: {
    inject: true,
    modules: {
      generateScopedName: 'gda_[hash]_[local]'
    },
    splitting: true,
    minify: true
  }
});
