import { describe, expect, it } from 'vitest';
import path from 'node:path';
import fs from 'node:fs';
import { tmpdir } from 'node:os';
import { storiesIndexer } from '../src/storybook/stories-indexer.ts';
import { csfTransformer } from '../src/storybook/csf-transformer.ts';
import { getExportedVariables } from '../src/storybook/getters-parser.ts';

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
        exportName: 'FromTypeProps',
        importPath: storiesFilePath,
        type: 'story'
      },
      {
        title: 'meta1',
        tags: ['!dev'],
        exportName: 'FromTypeIncludeProps',
        importPath: storiesFilePath,
        type: 'story'
      },
      {
        title: 'meta1',
        tags: ['!dev'],
        exportName: 'FromTypeExcludeProps',
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

    expect(actual).toEqual(expected);
  });

  it.each([
    { kind: 'spreads only', properties: '...variants', expected: [] },
    { kind: 'accessors only', properties: 'get primary() { return {}; }', expected: [] },
    { kind: 'shorthand properties only', properties: 'primary', expected: [] },
    {
      kind: 'mixed variants',
      properties: `...before,
        primary: { args: { size: 'small' } },
        ...between,
        get accessor() { return {}; },
        shorthand,
        secondary: { args: { size: 'large' } },
        ...after`,
      expected: ['StylesPrimary', 'StylesSecondary']
    }
  ])('indexes only generated stories for $kind', async function generatedVariantStories({ properties, expected }) {
    const dir = fs.mkdtempSync(path.join(tmpdir(), 'storybook-variant-index-'));
    const storiesFilePath = path.join(dir, 'button.stories.tsx');
    try {
      fs.writeFileSync(
        storiesFilePath,
        `export default { title: 'components/Button' };
        export const Styles = getVariants(Button, { ${properties} });`
      );

      const actual = await storiesIndexer(storiesFilePath);
      const generated = await getExportedVariables({ code: await csfTransformer({ filePath: storiesFilePath }) });

      expect(actual).toEqual(
        expected.map((exportName) => ({
          title: 'components/Button',
          tags: undefined,
          exportName,
          importPath: storiesFilePath,
          type: 'story'
        }))
      );
      expect([...generated.keys()].filter((name) => name !== 'default')).toEqual(expected);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it('should return an empty array if the file has no stories', async function noStories() {
    const storiesFilePath = path.join(__dirname, 'fixtures/no-stories.tsx');
    const actual = await storiesIndexer(storiesFilePath);

    expect(actual).toEqual([]);
  });
});
