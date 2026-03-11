import { describe, it } from 'vitest';
import path from 'node:path';
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import ts from 'typescript';
import assume from 'assume';
import { csfTransformer } from '../src/csf-transformer.ts';

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

  it('should generate correct csf', function generateCSFFile1() {
    const actual = formatTypeScript(csfTransformer({ filePath: path.join(fixturesPath, 'comp-stories.tsx') }));
    const expected = formatTypeScript(fs.readFileSync(path.join(fixturesPath, 'comp-stories-expected.tsx'), 'utf8'));

    assume(actual).deep.equals(expected);
  }, 20_000);

  it('should support code as a string', function generateCSFCodeAsString() {
    const code = `
      import { getMeta } from '@bento/storybook-addon-helpers';
      const meta = getMeta({ title: 'meta1' });
    `;
    const actual = formatTypeScript(csfTransformer({ code }));
    const expected = formatTypeScript(`
      import { getMeta } from '@bento/storybook-addon-helpers';
      const meta = { title: 'meta1' };
    `);

    assume(actual).deep.equals(expected);
  });

  it('should support default export getMeta', function generateCSFDefaultExportGetMeta() {
    const actual = formatTypeScript(csfTransformer({ code: `export default getMeta({ title: 'meta1' })` }));
    const expected = formatTypeScript(`export default { title: 'meta1' }`);

    assume(actual).deep.equals(expected);
  });

  it('should handle no filePath and no code', function generateCSFNoFilePathAndNoCode() {
    assume(csfTransformer({})).to.equals('');
  });

  it('should skip non-property-assignment in variants', function nonPropertyAssignment() {
    const code = `
      import { getVariants } from '@bento/storybook-addon-helpers';

      const variants = getVariants(TestComponent, {
        small: { args: { size: 'small' } },
        getValue() { return 'method'; },
      });
    `;

    const actual = formatTypeScript(csfTransformer({ code }));
    const expected = formatTypeScript(`
      import { getVariants } from '@bento/storybook-addon-helpers';

      export const VariantsSmall = {
        args: { size: 'small' },
        render: args => <TestComponent {...args} />
      };
    `);

    assume(actual).deep.equals(expected);
  });
});
