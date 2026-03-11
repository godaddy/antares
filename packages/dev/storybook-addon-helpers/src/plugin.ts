import type { Plugin } from 'vite';
import { csfTransformer } from './csf-transformer.ts';

/**
 * Vite plugin to generate the CSF for a given Bento *.stories.tsx file.
 *
 * @param storiesFileRegex - The regex to test the loaded files against.
 *
 */
export function generateCSFPlugin(storiesFileRegex: RegExp): Plugin {
  return {
    name: 'bento-storybook-addon-helpers',
    async load(fileName) {
      if (storiesFileRegex.test(fileName)) {
        this.addWatchFile(fileName);

        return csfTransformer({ filePath: fileName });
      }
    }
  };
}
