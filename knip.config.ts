import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignoreBinaries: ['playwright', 'storybook', 'next'],
  ignore: ['**/*.mdx'],
  workspaces: {
    '.': {
      entry: ['configs/*.mts'],
      project: ['configs/**/*.{ts,mts}']
    },
    'apps/site': {
      entry: ['source.config.ts'],
      ignore: [
        'lib/remark-arg-types.ts',
        'lib/remark-mdx-utils.ts',
        'lib/remark-raw-loader.ts',
        'lib/storybook-bridge/**/*'
      ]
    },
    'apps/docs': {
      ignore: ['.storybook/addons/why-did-you-render/**/*', '.storybook/why-did-you-render.ts'],
      ignoreDependencies: [
        '@vitejs/plugin-react',
        '@welldone-software/why-did-you-render',
        '@bento/*',
        'react-diff-viewer-continued'
      ]
    },
    'packages/@bento/*': {
      ignore: ['*.stories.tsx', 'examples/**/*', 'test/**/*']
    },
    'packages/@godaddy/*': {
      ignore: []
    },
    'packages/dev/*': {
      ignore: ['*.stories.tsx', 'examples/**/*', 'test/**/*', '**/tsdown.config.{ts,mts}']
    },
    'packages/dev/storybook-addon-helpers': {
      ignore: ['test/fixtures/**/*']
    }
  },
  ignoreDependencies: ['@types/css-modules', '@types/mdx', '@typescript/native-preview']
};

export default config;
