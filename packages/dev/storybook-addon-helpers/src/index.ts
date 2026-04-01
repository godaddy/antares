import { type StorybookConfig } from '@storybook/react-vite';
import { type Indexer } from 'storybook/internal/types';
import { generateCSFPlugin } from './plugin.ts';
import { storiesIndexer } from './stories-indexer.ts';
export * from './getters.ts';

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
export const viteFinal: StorybookConfig['viteFinal'] = async function viteFinal(config: any) {
  config.plugins = config.plugins || [];
  config.plugins.push(generateCSFPlugin(STORIES_FILE_REGEX));
  return config;
};
