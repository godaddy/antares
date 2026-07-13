import { createMDX } from 'fumadocs-mdx/next';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

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
      '@bento/storybook-addon-helpers': '@bento/storybook-addon-helpers/runtime'
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
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@storybook/addon-docs/blocks': join(__dirname, 'lib/storybook-bridge/blocks.tsx'),
      '@storybook/react-vite': join(__dirname, 'lib/storybook-bridge/react-vite.ts'),
      '@bento/storybook-addon-helpers$': '@bento/storybook-addon-helpers/runtime'
    };

    return config;
  }
};

export default createMDX()(config);
