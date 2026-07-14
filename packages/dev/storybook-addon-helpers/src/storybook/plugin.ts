import type { Plugin } from 'vite';
import { csfTransformer } from './csf-transformer.ts';
import type { DocsDefaults } from '../types.ts';

/**
 * Vite plugin to generate the CSF for a given Bento *.stories.tsx file.
 *
 * @param storiesFileRegex - The regex to test the loaded files against.
 * @param defaults - Optional global docs defaults merged under each docs getter's options.
 */
export function generateCSFPlugin(storiesFileRegex: RegExp, defaults?: DocsDefaults): Plugin {
  return {
    name: 'bento-storybook-addon-helpers',
    async load(fileName) {
      if (storiesFileRegex.test(fileName)) {
        this.addWatchFile(fileName);

        return await csfTransformer({ filePath: fileName, defaults });
      }
      return null;
    }
  };
}
