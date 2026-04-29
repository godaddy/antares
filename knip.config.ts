import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignoreBinaries: ['playwright', 'storybook'],
  workspaces: {
    '.': {
      entry: ['configs/*.mts'],
      project: ['configs/**/*.{ts,mts}']
    },
    'apps/site': {
      entry: ['source.config.ts'],
      ignore: [
        'content/docs/index.mdx',
        'lib/remark-arg-types.ts',
        'lib/remark-mdx-utils.ts',
        'lib/remark-raw-loader.ts',
        'lib/storybook-addon-helpers-shim.ts',
        'lib/storybook-bridge/**/*'
      ]
    },
    'apps/docs': {
      ignore: [
        '.storybook/addons/why-did-you-render/**/*',
        '.storybook/addons/theme-token-switcher/**/*',
        '.storybook/why-did-you-render.ts'
      ],
      ignoreDependencies: [
        '@vitejs/plugin-react',
        '@welldone-software/why-did-you-render',
        '@bento/*',
        'react-diff-viewer-continued',
        'camelcase'
      ]
    },
    'packages/@bento/*': {
      ignore: ['*.stories.tsx', 'examples/**/*', 'test/**/*']
    },
    'packages/@godaddy/*': {
      ignore: ['*.stories.tsx', 'examples/**/*', '**/examples/**/*', 'test/**/*']
    },
    'packages/dev/*': {
      ignore: ['*.stories.tsx', 'examples/**/*', 'test/**/*', '**/tsup.config.{ts,mts}']
    },
    'packages/dev/storybook-addon-helpers': {
      ignore: ['test/fixtures/**/*', 'test/**/*', 'tsup.config.ts']
    }
  },
  ignoreDependencies: ['@types/css-modules', '@types/mdx']
};

export default config;
