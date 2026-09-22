import { createMDX } from 'fumadocs-mdx/next';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Injects `'use client'` into component example modules at build time, so the
// example source files stay free of the directive (see lib/use-client-loader.cjs).
const useClientLoader = join(__dirname, 'lib/use-client-loader.cjs');
const EXAMPLE_MODULE = /[\\/]components[\\/].+[\\/]examples[\\/][^\\/]+\.tsx$/;
const BLOCK_MODULE = /[\\/]packages[\\/]@godaddy[\\/]antares[\\/]blocks[\\/].+\.tsx$/;

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  ...(isGitHubPages && {
    output: 'export',
    basePath,
    assetPrefix: basePath ? `${basePath}/` : '',
    trailingSlash: true,
    images: { unoptimized: true }
  }),
  turbopack: {
    root: join(__dirname, '../..'),
    resolveAlias: {
      '@storybook/addon-docs/blocks': './lib/storybook-bridge/blocks.tsx',
      '@storybook/react-vite': './lib/storybook-bridge/react-vite.ts',
      '@bento/storybook-addon-helpers': '@bento/storybook-addon-helpers/runtime',
      '@bento/block-explorer/runtime': '../../packages/dev/block-explorer/src/runtime.tsx'
    },
    rules: {
      '**/components/**/examples/*.tsx': {
        loaders: [useClientLoader]
      },
      '**/packages/@godaddy/antares/blocks/**/*.tsx': {
        loaders: [useClientLoader]
      }
    }
  },
  ...(!isGitHubPages && {
    async redirects() {
      return [{ source: '/', destination: '/docs', permanent: false }];
    },
    async rewrites() {
      return [
        {
          source: '/docs/:path*.mdx',
          destination: '/llms-mdx/docs/:path*'
        }
      ];
    }
  }),
  /**
   * Mirrors the Turbopack documentation aliases and client boundaries for webpack builds.
   *
   * @param config - Next.js webpack configuration, updated in place.
   * @returns The configuration with documentation aliases and client-module rules.
   */
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@storybook/addon-docs/blocks': join(__dirname, 'lib/storybook-bridge/blocks.tsx'),
      '@storybook/react-vite': join(__dirname, 'lib/storybook-bridge/react-vite.ts'),
      '@bento/storybook-addon-helpers$': '@bento/storybook-addon-helpers/runtime',
      '@bento/block-explorer/runtime': join(__dirname, '../../packages/dev/block-explorer/src/runtime.tsx')
    };

    config.module.rules.push({
      test: new RegExp(`${EXAMPLE_MODULE.source}|${BLOCK_MODULE.source}`),
      enforce: 'pre',
      use: [useClientLoader]
    });

    return config;
  }
};

export default createMDX()(config);
