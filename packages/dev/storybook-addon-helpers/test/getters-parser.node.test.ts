import path from 'node:path';
import type ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { getExportedVariables, extractVariantNames } from '../src/storybook/getters-parser.ts';
import { toTsExpression } from '../src/storybook/literal.ts';

describe('parser', function parserTests() {
  describe('getExportedVariables', function getExportedVariablesTests() {
    it('should extract exported variables from a file', async function getExportedVariablesTest() {
      const result = await getExportedVariables({ filePath: path.join(__dirname, 'fixtures/comp-stories.tsx') });

      expect(Object.fromEntries(result)).toEqual({
        default: { title: 'meta1' },
        ButtonProps: { tags: ['!dev'] },
        FromTypeProps: { tags: ['!dev'] },
        FromTypeIncludeProps: { tags: ['!dev'] },
        FromTypeExcludeProps: { tags: ['!dev'] },
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

      expect(Object.fromEntries(result)).toEqual({
        default: { title: 'Test' },
        story: { args: { prop: 'value' }, values: ['1', '2'] },
        docs: { tags: ['!dev'] }
      });
    });

    it('should handle no filePath and no code', async function generateCSFNoFilePathAndNoCode() {
      expect(Object.fromEntries(await getExportedVariables({}))).toEqual({});
    });

    it('should some edge cases', async function getVariantsTest() {
      const result = await getExportedVariables({ code: `export const Button` });
      expect(Object.fromEntries(result)).toEqual({ Button: {} });

      const result2 = await getExportedVariables({ code: `export default Button` });
      expect(Object.fromEntries(result2)).toEqual({});
    });

    it('should handle type assertions and satisfies expressions', async function testTypeExpressions() {
      const code = `
        export const story1 = getMeta({ title: 'Test1' } as const);
        export const story2 = getMeta({ title: 'Test2' } satisfies object);
        const defaultMeta = getMeta({ title: 'Default' } as const);
        export default defaultMeta;
      `;
      const result = await getExportedVariables({ code });

      expect(Object.fromEntries(result)).toEqual({
        story1: { title: 'Test1' },
        story2: { title: 'Test2' },
        default: { title: 'Default' }
      });
    });

    it('unwraps getTypeDocs as a docs-only story for the indexer', async function unwrapsGetTypeDocs() {
      const exported = await getExportedVariables({
        code: `
          import { getTypeDocs } from '@bento/storybook-addon-helpers';
          export const Props = getTypeDocs<PropsType>({ include: ['name'] });
        `
      });

      expect(exported.get('Props')).toEqual({ tags: ['!dev'] });
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
      expect(result).toEqual(['ButtonVariant1', 'ButtonVariant2']);
    });
  });
});
