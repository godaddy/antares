import { describe, it } from 'vitest';
import path from 'node:path';
import assume from 'assume';
import { storiesIndexer } from '../src/stories-indexer.ts';

describe('stories-indexer', function bento() {
  it('should return the correct story indexes for component', async function correctStoryIndexes() {
    const storiesFilePath = path.join(__dirname, 'fixtures/comp-stories.tsx');
    const actual = await storiesIndexer(storiesFilePath);

    const expected = [
      {
        title: 'meta1',
        tags: ['!dev'],
        exportName: 'ButtonProps',
        importPath: storiesFilePath,
        type: 'story'
      },
      {
        title: 'meta1',
        tags: ['!dev'],
        exportName: 'FromInterfaceProps',
        importPath: storiesFilePath,
        type: 'story'
      },
      {
        title: 'meta1',
        tags: ['!dev'],
        exportName: 'FromInterfacePickProps',
        importPath: storiesFilePath,
        type: 'story'
      },
      {
        title: 'meta1',
        tags: ['!dev'],
        exportName: 'FromInterfaceOmitProps',
        importPath: storiesFilePath,
        type: 'story'
      },
      {
        title: 'meta1',
        tags: undefined,
        exportName: 'NewButton1',
        importPath: storiesFilePath,
        type: 'story'
      },
      {
        title: 'meta1',
        tags: undefined,
        exportName: 'NewButton2',
        importPath: storiesFilePath,
        type: 'story'
      },
      {
        title: 'meta1',
        tags: undefined,
        exportName: 'NewButton3',
        importPath: storiesFilePath,
        type: 'story'
      },
      {
        title: 'meta1',
        tags: undefined,
        exportName: 'StylesPrimary',
        importPath: storiesFilePath,
        type: 'story'
      },
      {
        title: 'meta1',
        tags: undefined,
        exportName: 'StylesSecondary',
        importPath: storiesFilePath,
        type: 'story'
      },
      {
        title: 'meta1',
        tags: undefined,
        exportName: 'StylesCustomElement',
        importPath: storiesFilePath,
        type: 'story'
      }
    ];

    assume(actual).deep.equals(expected);
  });

  it('should return an empty array if the file has no stories', async function noStories() {
    const storiesFilePath = path.join(__dirname, 'fixtures/no-stories.tsx');
    const actual = await storiesIndexer(storiesFilePath);

    assume(actual).deep.equals([]);
  });
});
