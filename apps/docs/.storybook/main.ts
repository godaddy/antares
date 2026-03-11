import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';
import { join, resolve } from 'node:path';
import { mergeConfig } from 'vite';
import packageJson from '@bento/internal-props/package.json' with { type: 'json' };

const config: StorybookConfig = {
  stories: [
    // Package stories and documentation
    '../../../packages/@bento/*/*.mdx',
    '../../../packages/@bento/*/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../../packages/@bento/*/src/**/*.mdx',
    '../../../packages/@bento/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../../packages/@bento/*/examples/**/*.mdx',
    '../../../packages/@bento/*/examples/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../../packages/dev/*/*.mdx',
    '../../../packages/dev/*/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../../packages/dev/*/src/**/*.mdx',
    '../../../packages/dev/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../../packages/dev/*/examples/**/*.mdx',
    '../../../packages/dev/*/examples/**/*.stories.@(js|jsx|mjs|ts|tsx)',

    // Documentation (PDRs, Architecture, etc.) - excluding templates
    '../../../docs/**/!(*TEMPLATE)*.mdx'
  ],

  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm]
          }
        }
      }
    },
    join(__dirname, './addons/why-did-you-render/index.ts'),
    '@bento/storybook-addon-helpers'
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {}
  },

  core: {
    disableTelemetry: true,
    enableCrashReports: false
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  },

  async viteFinal(config) {
    const versionMatch = packageJson.version.match(/^(\d+)\.(\d+)\.(\d+)/);
    const semver = versionMatch ? versionMatch.slice(1) : ['0', '0', '0'];

    const define = {
      major: semver[0],
      minor: semver[1],
      patch: semver[2]
    };

    // Packages that are in dev/ folder but still use @bento namespace
    const devPackages = ['storybook-addon-helpers', 'environment'];

    return mergeConfig(config, {
      // Set envDir to workspace root for proper monorepo support
      envDir: resolve(__dirname, '../../../'),

      esbuild: {
        define
      },

      // Exclude @bento packages from optimization so they can be watched and hot-reloaded
      optimizeDeps: {
        exclude: ['@bento/*']
      },

      // Resolve @bento packages to their source files instead of built dist
      resolve: {
        alias: [
          // Dev packages with @bento namespace
          ...devPackages.map((pkg) => ({
            find: new RegExp(`^@bento/${pkg}$`),
            replacement: resolve(__dirname, `../../../packages/dev/${pkg}/src`)
          })),
          // Regular @bento packages
          {
            find: /^@bento\/(.*)$/,
            replacement: resolve(__dirname, '../../../packages/@bento/$1/src')
          }
        ]
      }
    });
  }
};

export default config;
