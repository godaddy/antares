import path from 'node:path';
import { type StorybookConfig } from '@storybook/react-vite';
import type { Indexer, IndexerOptions } from 'storybook/internal/types';

export const experimental_indexers: StorybookConfig['experimental_indexers'] = async function experimentalIndexers(
  existingIndexers?: Indexer[]
) {
  return existingIndexers?.map(function addInternalTag(indexer) {
    return {
      ...indexer,

      async createIndex(fileName: string, options: IndexerOptions) {
        const entries = await indexer.createIndex(fileName, options);

        const isInternal = fileName.includes(`${path.sep}_internal${path.sep}`);

        if (!isInternal) {
          return entries;
        }

        return entries.map((entry) => ({
          ...entry,

          tags: [...(entry.tags || []), 'internal']
        }));
      }
    };
  });
};
