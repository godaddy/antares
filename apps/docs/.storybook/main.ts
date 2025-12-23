import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { mergeConfig } from 'vite';
import packageJson from '@bento/internal-props/package.json' with { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 *
 * @param value - The package name
 * @returns The absolute path of the package.
 * @private
 */
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: [
    // Package stories and documentation
    '../../../packages/*/*.mdx',
    '../../../packages/*/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../../packages/*/src/**/*.mdx',
    '../../../packages/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../../packages/*/examples/**/*.mdx',
    '../../../packages/*/examples/**/*.stories.@(js|jsx|mjs|ts|tsx)',

    // Documentation (PDRs, Architecture, etc.) - excluding templates
    '../../../docs/**/!(*TEMPLATE)*.mdx'
  ],

  addons: [
    {
      name: getAbsolutePath('@storybook/addon-docs'),
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
    name: getAbsolutePath('@storybook/react-vite'),
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
          {
            find: /^@bento\/(.*)$/,
            replacement: resolve(__dirname, '../../../packages/$1/src')
          }
        ]
      }
    });
  }
};

export default config;
