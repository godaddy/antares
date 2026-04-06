import assume from 'assume';
import path from 'node:path';
import ts from 'typescript';
import { describe, it } from 'vitest';
import { getExportedVariables, extractVariantNames } from '../src/getters-parser.ts';
import { toTsExpression } from '../src/ats-utils.ts';

describe('parser', function parserTests() {
  describe('getExportedVariables', function getExportedVariablesTests() {
    it('should extract exported variables from a file', async function getExportedVariablesTest() {
      const result = await getExportedVariables({ filePath: path.join(__dirname, 'fixtures/comp-stories.tsx') });

      assume(Object.fromEntries(result)).to.deep.equal({
        default: { title: 'meta1' },
        ButtonProps: { tags: ['!dev'] },
        FromInterfaceProps: { tags: ['!dev'] },
        FromInterfacePickProps: { tags: ['!dev'] },
        FromInterfaceOmitProps: { tags: ['!dev'] },
        NewButton1: {},
        NewButton2: {},
        NewButton3: {},
        StylesPrimary: {},
        StylesSecondary: {},
        StylesCustomElement: {}
      });
    });

    it('should extract exported variables from code', async function getExportedVariablesTest() {
      const code = `
        export default { title: 'Test' };
        export const story = { args: { prop: 'value' }, values: ['1', '2'] };
        export const docs = getComponentDocs(Component);
      `;
      const result = await getExportedVariables({ code });

      assume(Object.fromEntries(result)).to.deep.equal({
        default: { title: 'Test' },
        story: { args: { prop: 'value' }, values: ['1', '2'] },
        docs: { tags: ['!dev'] }
      });
    });

    it('should handle no filePath and no code', async function generateCSFNoFilePathAndNoCode() {
      assume(Object.fromEntries(await getExportedVariables({}))).to.deep.equal({});
    });

    it('should some edge cases', async function getVariantsTest() {
      const result = await getExportedVariables({ code: `export const Button` });
      assume(Object.fromEntries(result)).to.deep.equal({ Button: {} });

      const result2 = await getExportedVariables({ code: `export default Button` });
      assume(Object.fromEntries(result2)).to.deep.equal({});
    });

    it('should handle type assertions and satisfies expressions', async function testTypeExpressions() {
      const code = `
        export const story1 = getMeta({ title: 'Test1' } as const);
        export const story2 = getMeta({ title: 'Test2' } satisfies object);
        const defaultMeta = getMeta({ title: 'Default' } as const);
        export default defaultMeta;
      `;
      const result = await getExportedVariables({ code });

      assume(Object.fromEntries(result)).to.deep.equal({
        story1: { title: 'Test1' },
        story2: { title: 'Test2' },
        default: { title: 'Default' }
      });
    });
  });

  describe('extractVariantNames', function extractVariantNamesTests() {
    it('should extract variant names', function extractVariantNamesTest() {
      const result = extractVariantNames(
        'Button',
        toTsExpression({
          variant1: { args: {} },
          variant2: { args: {}, 3: {}, '4': {} }
        }) as ts.ObjectLiteralExpression
      );
      assume(result).to.deep.equal(['ButtonVariant1', 'ButtonVariant2']);
    });
  });
});
