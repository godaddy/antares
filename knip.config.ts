import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignoreBinaries: ['storybook', 'next'],
  ignore: ['**/*.mdx'],
  workspaces: {
    '.': {
      entry: ['configs/*.mts'],
      project: ['configs/**/*.{ts,mts}']
    },
    'apps/site': {
      ignore: ['lib/use-client-loader.cjs', 'lib/storybook-bridge/**/*']
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
      ignore: ['src/*.d.ts']
    },
    'packages/dev/*': {
      ignore: ['test/**/*']
    },
    'packages/dev/storybook-addon-helpers': {
      ignore: ['test/fixtures/**/*']
    }
  },
  ignoreDependencies: ['@types/css-modules', '@types/mdx']
};

export default config;
