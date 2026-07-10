import type { StorybookConfig } from '@storybook/react-vite';
import type { Indexer } from 'storybook/internal/types';
import { generateCSFPlugin } from './storybook/plugin.ts';
import { storiesIndexer } from './storybook/stories-indexer.ts';
import type { DocsDefaults } from './types.ts';
export { toStorybookArgTypes } from './adapters/storybook.ts';
export * from './storybook/getters.ts';
export { processPropsDoc } from './process.ts';
export type * from './types.ts';

const STORIES_FILE_REGEX = /\.stories\.tsx$/;

/**
 * Adds the custom stories indexer to the existing indexers.
 */
export const experimental_indexers: StorybookConfig['experimental_indexers'] = async function experimentalIndexers(
  existingIndexers?: Indexer[]
) {
  const customIndexer: Indexer = {
    test: STORIES_FILE_REGEX,
    createIndex: storiesIndexer
  };

  if (!existingIndexers) {
    return [customIndexer];
  }

  return [customIndexer, ...existingIndexers];
};

/**
 * Adds the plugin to the Storybook config.
 */
export const viteFinal: StorybookConfig['viteFinal'] = async function viteFinal(config: any, options) {
  const docsDefaults = (options as unknown as { docsDefaults?: DocsDefaults } | undefined)?.docsDefaults;
  config.plugins = config.plugins || [];
  config.plugins.push(generateCSFPlugin(STORIES_FILE_REGEX, docsDefaults));
  return config;
};
