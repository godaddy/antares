import { describe, expect, it } from 'vitest';
import path from 'node:path';
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import ts from 'typescript';
import { csfTransformer } from '../src/storybook/csf-transformer.ts';

/**
 * Formats the code using Biome.
 * @see https://github.com/biomejs/biome/discussions/2855
 */
function formatTypeScript(code: string): string {
  const sourceFile = ts.createSourceFile('file.tsx', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const parsedCode = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed, removeComments: true }).printFile(sourceFile);

  return execSync('biome format --stdin-file-path=file.tsx', { input: parsedCode }).toString();
}

describe('csf-transformer', function csfTransformerTests() {
  const fixturesPath = path.join(__dirname, 'fixtures');

  it('should generate correct csf', async function generateCSFFile1() {
    const actual = formatTypeScript(await csfTransformer({ filePath: path.join(fixturesPath, 'comp-stories.tsx') }));
    const expected = formatTypeScript(fs.readFileSync(path.join(fixturesPath, 'comp-stories-expected.tsx'), 'utf8'));

    expect(actual).toEqual(expected);
  }, 20_000);

  it('should support code as a string', async function generateCSFCodeAsString() {
    const code = `
      import { getMeta } from '@bento/storybook-addon-helpers';
      const meta = getMeta({ title: 'meta1' });
    `;
    const actual = formatTypeScript(await csfTransformer({ code }));
    const expected = formatTypeScript(`const meta = { title: 'meta1' };`);

    expect(actual).toEqual(expected);
  });

  it('should support default export getMeta', async function generateCSFDefaultExportGetMeta() {
    const actual = formatTypeScript(await csfTransformer({ code: `export default getMeta({ title: 'meta1' })` }));
    const expected = formatTypeScript(`export default { title: 'meta1' }`);

    expect(actual).toEqual(expected);
  });

  it('should handle no filePath and no code', async function generateCSFNoFilePathAndNoCode() {
    expect(await csfTransformer({})).toBe('');
  });

  it('transforms getTypeDocs with options from code strings', async function transformTypeDocsCode() {
    const code = `
      import { getTypeDocs } from '@bento/storybook-addon-helpers';
      interface Props {
        /** label description */
        label: string;
        hidden?: boolean;
      }
      export const PropsDocs = getTypeDocs<Props>({ include: ['label'] });
    `;

    const actual = await csfTransformer({ code });

    expect(actual.includes('"label"')).toBe(true);
    expect(actual.includes('"hidden"')).toBe(false);
    expect(actual.includes('"!dev"')).toBe(true);
  });

  it('applies global docsDefaults to getComponentDocs', async function appliesDefaults() {
    const code = `
      import { getComponentDocs } from '@bento/storybook-addon-helpers';
      interface WProps { label: string; onPress?: () => void; }
      function W(_p: WProps) { return null; }
      export const Docs = getComponentDocs(W);
    `;

    const actual = await csfTransformer({ code, defaults: { categories: { Events: [/^on/] } } });

    expect(actual.includes('"Events"')).toBe(true);
    expect(actual.includes('category')).toBe(true);
  });

  it('expands getExamples into imports and story exports', async function expandsExamples() {
    const actual = await csfTransformer({ filePath: path.join(fixturesPath, 'examples-fixture/widget.stories.tsx') });

    expect(actual).not.toContain('getExamples()');
    expect(actual).not.toContain('export const examples');
    expect(actual).toContain('import { DefaultExample as __example_Default } from "./examples/default.tsx"');
    expect(actual).toContain('export const Default = __example_Default');
    expect(actual).toContain('export const IconOnly = __example_IconOnly');
    expect(actual).not.toContain('IgnoredExample');
    expect(actual).not.toContain('WidgetPlaygroundExample');
    // getMeta on the same file is still transformed to its object literal.
    expect(actual).toContain("title: 'components/Widget'");
  });

  it('leaves getExamples untouched when transforming from a code string (no folder to resolve)', async function examplesNoPath() {
    const code = `
      import { getExamples } from '@bento/storybook-addon-helpers';
      export const examples = getExamples();
    `;
    const actual = await csfTransformer({ code });
    expect(actual).toContain('getExamples');
  });

  it('drops imports left unused by the transform, keeping the ones still referenced', async function prunesDeadImports() {
    const code = `
      import React from 'react';
      import './side-effect.css';
      import type { Props } from './comp.tsx';
      import { Widget, Unused } from './comp.tsx';
      import { getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
      export const Docs = getComponentDocs(Widget);
      export const Story = getStory(Widget);
    `;

    const actual = await csfTransformer({ code });

    // Widget survives via the generated render function, React and the bare import stay put.
    expect(actual).toContain("import { Widget } from './comp.tsx'");
    expect(actual).toContain("import React from 'react'");
    expect(actual).toContain("import './side-effect.css'");
    expect(actual).toContain("import type { Props } from './comp.tsx'");
    expect(actual).not.toContain('Unused');
    expect(actual).not.toContain('@bento/storybook-addon-helpers');
  });

  it('does not let a docs import collide with a same-named example story export', async function noDuplicateDeclaration() {
    const actual = await csfTransformer({
      filePath: path.join(fixturesPath, 'collision-fixture/collision.stories.tsx')
    });

    expect(actual).toContain('export const Default = __example_Default');
    // The import that fed getComponentDocs is gone, so the story export is the only `Default`.
    expect(actual).not.toContain('collision-comp.tsx');
    expect(actual).toContain('"volume"');
  });

  it('fails when a surviving reference collides with an example story export', async function reportsCollision() {
    await expect(
      csfTransformer({ filePath: path.join(fixturesPath, 'collision-fixture/meta-collision.stories.tsx') })
    ).rejects.toThrow(
      /transformed stories file is invalid.*Default.*Generated example stories: "Default" \(\.\/examples\/default\.tsx\)/s
    );
  });

  it('drops the examples marker when a real file resolves no examples', async function dropsEmptyMarker() {
    const actual = await csfTransformer({
      filePath: path.join(fixturesPath, 'collision-fixture/empty.stories.tsx')
    });

    expect(actual).not.toContain('getExamples');
    expect(actual).not.toContain('@bento/storybook-addon-helpers');
  });

  it('fails when two examples reduce to the same story name', async function reportsDuplicateStoryName() {
    await expect(
      csfTransformer({ filePath: path.join(fixturesPath, 'collision-fixture/duplicate.stories.tsx') })
    ).rejects.toThrow(/one\.tsx and \.\/duplicate-examples\/two\.tsx both generate a story named "Primary"/);
  });

  it('keeps a property named after an import from counting as a use of it', async function propertyKeyIsNotAUse() {
    const code = `
      import { Widget } from './comp.tsx';
      export const Story = { args: { Widget: 'a string' } };
    `;

    expect(await csfTransformer({ code })).not.toContain('import { Widget }');
  });

  it('should skip non-property-assignment in variants', async function nonPropertyAssignment() {
    const code = `
      import { getVariants } from '@bento/storybook-addon-helpers';

      const variants = getVariants(TestComponent, {
        small: { args: { size: 'small' } },
        getValue() { return 'method'; },
      });
    `;

    const actual = formatTypeScript(await csfTransformer({ code }));
    const expected = formatTypeScript(`
      export const VariantsSmall = {
        args: { size: 'small' },
        render: args => <TestComponent {...args} />
      };
    `);

    expect(actual).toEqual(expected);
  });
});
