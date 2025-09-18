import { type StoryIndexInput } from 'storybook/internal/types';
import { getExportedVariables } from './getters-parser.ts';

/**
 * Custom indexer for a given *.stories.tsx file.
 * It will generate all the story indexes for the stories file, including the examples.
 *
 * @param storiesFilePath - The path to the *.stories.tsx file.
 * @returns The StoryIndexInput[] for the stories file.
 */
export async function storiesIndexer(storiesFilePath: string): Promise<StoryIndexInput[]> {
  const stories: StoryIndexInput[] = [];

  const exportedVariables = getExportedVariables({ filePath: storiesFilePath });
  const title = exportedVariables.get('default')?.title ?? '';

  if (!title) {
    return stories;
  }

  // add stories found (exported variables) in the *.stories.tsx file
  for (const [exportName, { tags }] of exportedVariables) {
    if (exportName === 'default') {
      continue;
    }

    stories.push({
      title,
      tags,
      exportName,
      importPath: storiesFilePath,
      type: 'story'
    });
  }

  return stories;
}
