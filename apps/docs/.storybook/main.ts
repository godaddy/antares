import type { StorybookConfig } from '@storybook/react-vite';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

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
  stories: ['../../../packages/**/*.mdx', '../../../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-storysource'),
    join(__dirname, './addons/why-did-you-render/index.ts')
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
  }
};

export default config;
