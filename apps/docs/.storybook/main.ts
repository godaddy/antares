import packageJson from '@godaddy/antares/package.json' with { type: 'json' };
import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig, type UserConfig } from 'vite';
import { remarkFrontmatterHeading } from '../lib/remark-frontmatter-heading.ts';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import replace from '@rollup/plugin-replace';
import { generateCdnUrl } from '@godaddy/generate-cdn-url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    // Package stories and documentation
    '../../../packages/@bento/*/*.mdx',
    '../../../packages/@bento/*/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../../packages/@godaddy/antares/components/**/*.mdx',
    '../../../packages/@godaddy/antares/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',

    // Documentation (PDRs, Architecture, etc.) - excluding templates
    '../../../docs/**/!(*TEMPLATE)*.mdx'
  ],

  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkFrontmatter, remarkFrontmatterHeading, remarkGfm]
          }
        }
      }
    },
    // join(__dirname, './addons/why-did-you-render/index.ts'),
    '@storybook/addon-a11y',
    '@storybook/addon-onboarding',
    '@storybook/addon-themes',
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

  async viteFinal(config: UserConfig) {
    const versionMatch = packageJson.version.match(/^(\d+)\.(\d+)\.(\d+)/)?.slice(1) ?? ['0', '0', '0'];

    const define = {
      major: versionMatch[0],
      minor: versionMatch[1],
      patch: versionMatch[2]
    };

    // Packages that are in dev/ folder but still use @bento namespace
    const devPackages = ['storybook-addon-helpers', 'environment'];

    return mergeConfig(config, {
      // Set base path for GitHub Pages subpath deployment
      ...(process.env.STORYBOOK_BASE_PATH ? { base: process.env.STORYBOOK_BASE_PATH } : {}),

      // Set envDir to workspace root for proper monorepo support
      envDir: resolve(__dirname, '../../../'),

      esbuild: {
        define
      },

      plugins: [
        replace({
          preventAssignment: true,
          __CDN_URL__: generateCdnUrl({
            cdn: 'https://img6.wsimg.com/ux-assets',
            version: '5.0.0',
            packageName: '@ux/icon'
          })
        })
      ],

      // Exclude @bento and packages from optimization so they can be watched and hot-reloaded
      optimizeDeps: {
        exclude: ['@bento/*', '@godaddy/*']
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
          },
          {
            find: /^@godaddy\/(.*)$/,
            replacement: resolve(__dirname, '../../../packages/@godaddy/$1/index.ts')
          }
        ]
      }
    });
  }
};

export default config;
