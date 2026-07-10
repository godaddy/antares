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
    const expected = formatTypeScript(`
      import { getMeta } from '@bento/storybook-addon-helpers';
      const meta = { title: 'meta1' };
    `);

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
      import { getVariants } from '@bento/storybook-addon-helpers';

      export const VariantsSmall = {
        args: { size: 'small' },
        render: args => <TestComponent {...args} />
      };
    `);

    expect(actual).toEqual(expected);
  });
});
