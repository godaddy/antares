import { describe, it, vi } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import { VFile } from 'vfile';
import assume from 'assume';
import type { RemarkArgTypesOptions } from '../lib/remark-arg-types';
import { remarkArgTypes } from '../lib/remark-arg-types';

async function run(
  mdx: string,
  filePath: string,
  options?: RemarkArgTypesOptions,
  compilerData?: Record<string, unknown>
) {
  const processor = unified().use(remarkParse).use(remarkMdx).use(remarkArgTypes, options);
  const file = new VFile({ path: filePath, value: mdx });
  if (compilerData) Object.assign(file.data, compilerData);
  return processor.run(processor.parse(file), file);
}

function firstChild(tree: any): any {
  return tree.children[0];
}

function makeRootArgTypesTree() {
  return {
    type: 'mdxJsxFlowElement',
    name: 'ArgTypes',
    attributes: [
      {
        type: 'mdxJsxAttribute',
        name: 'of',
        value: { type: 'mdxJsxAttributeValueExpression', value: 'Stories.Props', data: {} }
      }
    ],
    children: []
  };
}

describe('site', function siteTests() {
  describe('#remarkArgTypes', function remarkArgTypesTests() {
    it('skips non-ArgTypes JSX elements', async function skipsNonArgTypes() {
      const tree = await run('<Foo of={Stories.Props} />', '/fake/radio/README.mdx');
      assume(firstChild(tree).name).equals('Foo');
    });

    it('skips ArgTypes with no attributes', async function skipsNoAttributes() {
      const tree = await run('<ArgTypes />', '/fake/radio/README.mdx');
      const node = firstChild(tree);
      assume(node.name).equals('ArgTypes');
      assume(node.attributes).deep.equals([]);
    });

    it('skips ArgTypes with a string of= attribute (not expression)', async function skipsMalformedOf() {
      const tree = await run('<ArgTypes of="Stories.Props" />', '/fake/radio/README.mdx');
      assume(firstChild(tree).name).equals('ArgTypes');
    });

    it('skips ArgTypes when expression value produces empty propertyName', async function skipsEmptyPropertyName() {
      const tree = {
        type: 'root',
        children: [
          {
            type: 'mdxJsxFlowElement',
            name: 'ArgTypes',
            attributes: [
              {
                type: 'mdxJsxAttribute',
                name: 'of',
                value: { type: 'mdxJsxAttributeValueExpression', value: '.', data: {} }
              }
            ],
            children: []
          }
        ]
      };
      const file = new VFile({ path: '/fake/radio/README.mdx' });
      const result = await unified()
        .use(remarkArgTypes)
        .run(tree as any, file);
      assume(firstChild(result).name).equals('ArgTypes');
    });

    it('transforms Props branch using kebab dirname into PascalCase + Props', async function transformsPropsKebab() {
      const tree = await run('<ArgTypes of={Stories.Props} />', '/fake/radio/README.mdx');
      assume(firstChild(tree).name).equals('auto-type-table');
      assume(firstChild(tree).attributes.find((a: { name: string }) => a.name === 'name')?.value).equals('RadioProps');
    });

    it('transforms multi-segment kebab dirname into PascalCase + Props', async function transformsMultiKebab() {
      const tree = await run('<ArgTypes of={Stories.Props} />', '/fake/text-field/README.mdx');
      assume(firstChild(tree).attributes.find((a: { name: string }) => a.name === 'name')?.value).equals(
        'TextFieldProps'
      );
    });

    it('uses the Stories property name as-is for non-Props named exports', async function usesNamedExport() {
      const tree = await run('<ArgTypes of={Stories.LinkButtonProps} />', '/fake/radio/README.mdx');
      assume(firstChild(tree).attributes.find((a: { name: string }) => a.name === 'name')?.value).equals(
        'LinkButtonProps'
      );
    });

    it('produces auto-type-table with correct path and name attributes', async function producesCorrectAst() {
      const tree = await run('<ArgTypes of={Stories.Props} />', '/fake/radio/README.mdx');
      const typeTable = firstChild(tree);
      assume(typeTable.name).equals('auto-type-table');
      assume(typeTable.attributes.find((a: { name: string }) => a.name === 'path')?.value).equals('./src/index.tsx');
      assume(typeTable.attributes.find((a: { name: string }) => a.name === 'name')?.value).equals('RadioProps');
    });

    it('calls addMdxDependency with the src/index.tsx path', async function callsDependency() {
      const addDependency = vi.fn();
      await run('<ArgTypes of={Stories.Props} />', '/fake/radio/README.mdx', undefined, {
        _compiler: { addDependency }
      });
      assume(addDependency.mock.calls.length).equals(1);
      assume(addDependency.mock.calls[0][0]).equals('/fake/radio/src/index.tsx');
    });

    it('skips ArgTypes node when it is the root (no parent)', async function skipsRootNode() {
      const file = new VFile({ path: '/fake/radio/README.mdx' });
      const result = await unified()
        .use(remarkArgTypes)
        .run(makeRootArgTypesTree() as any, file);
      assume((result as any).name).equals('ArgTypes');
    });
  });

  describe('#remarkArgTypes with generator', function withGeneratorTests() {
    function makeGenerator(entries = [{ name: 'size', type: 'string' }]) {
      return {
        generateDocumentation: vi.fn(),
        generateTypeTable: vi.fn(),
        generateCategorizedTypeTable: vi.fn().mockResolvedValue({
          docs: [
            {
              id: 'test',
              name: 'RadioProps',
              entries: entries.map((e) => ({
                ...e,
                description: 'A prop',
                simplifiedType: e.type,
                tags: [],
                required: false,
                deprecated: false
              }))
            }
          ],
          categories: { Events: ['onPress'] }
        })
      };
    }

    it('emits PropTable instead of auto-type-table when generator provided', async function emitsPropTable() {
      const generator = makeGenerator();
      const tree = await run('<ArgTypes of={Stories.Props} />', '/fake/radio/README.mdx', {
        generator
      });
      assume((tree as any).children[0].name).equals('PropTable');
    });

    it('passes entries as estree attribute on PropTable', async function passesEntries() {
      const generator = makeGenerator([{ name: 'variant', type: 'string' }]);
      const tree = await run('<ArgTypes of={Stories.Props} />', '/fake/radio/README.mdx', {
        generator
      });
      const propTable = (tree as any).children[0];
      const entriesAttr = propTable.attributes.find((a: { name: string }) => a.name === 'entries');
      assume(entriesAttr).not.equals(undefined);
      assume(entriesAttr.value.type).equals('mdxJsxAttributeValueExpression');
    });

    it('passes categories as estree attribute on PropTable', async function passesCategories() {
      const generator = makeGenerator();
      const tree = await run('<ArgTypes of={Stories.Props} />', '/fake/radio/README.mdx', {
        generator
      });
      const propTable = (tree as any).children[0];
      const categoriesAttr = propTable.attributes.find((a: { name: string }) => a.name === 'categories');
      assume(categoriesAttr).not.equals(undefined);
      assume(categoriesAttr.value.type).equals('mdxJsxAttributeValueExpression');
    });

    it('calls generateCategorizedTypeTable with correct path and type name', async function callsCategorizedApi() {
      const generator = makeGenerator();
      await run('<ArgTypes of={Stories.Props} />', '/fake/radio/README.mdx', { generator });
      assume(generator.generateCategorizedTypeTable.mock.calls.length).equals(1);
      const [callArgs] = generator.generateCategorizedTypeTable.mock.calls[0];
      assume(callArgs.name).equals('RadioProps');
      assume(callArgs.path).equals('/fake/radio/src/index.tsx');
    });

    it('skips ArgTypes with malformed of= attribute when generator provided', async function skipsInvalidOfWithGenerator() {
      const generator = makeGenerator();
      const tree = await run('<ArgTypes of="Stories.Props" />', '/fake/radio/README.mdx', { generator });
      assume((tree as any).children[0].name).equals('ArgTypes');
      assume(generator.generateCategorizedTypeTable.mock.calls.length).equals(0);
    });

    it('skips ArgTypes when expression produces empty propertyName in generator path', async function skipsEmptyPropertyNameWithGenerator() {
      const generator = makeGenerator();
      const tree = {
        type: 'root',
        children: [
          {
            type: 'mdxJsxFlowElement',
            name: 'ArgTypes',
            attributes: [
              {
                type: 'mdxJsxAttribute',
                name: 'of',
                value: { type: 'mdxJsxAttributeValueExpression', value: '.', data: {} }
              }
            ],
            children: []
          }
        ]
      };
      const file = new VFile({ path: '/fake/radio/README.mdx' });
      const result = await unified()
        .use(remarkArgTypes, { generator })
        .run(tree as any, file);
      assume((result as any).children[0].name).equals('ArgTypes');
    });

    it('uses non-Props named export as-is in generator path', async function usesNamedExportWithGenerator() {
      const generator = makeGenerator();
      const tree = await run('<ArgTypes of={Stories.LinkButtonProps} />', '/fake/radio/README.mdx', { generator });
      assume((tree as any).children[0].name).equals('PropTable');
      assume(generator.generateCategorizedTypeTable.mock.calls[0][0].name).equals('LinkButtonProps');
    });

    it('skips ArgTypes node when it is the root in generator path (no parent)', async function skipsRootNodeWithGenerator() {
      const generator = makeGenerator();
      const file = new VFile({ path: '/fake/radio/README.mdx' });
      const result = await unified()
        .use(remarkArgTypes, { generator })
        .run(makeRootArgTypesTree() as any, file);
      assume((result as any).name).equals('ArgTypes');
      assume(generator.generateCategorizedTypeTable.mock.calls.length).equals(0);
    });

    it('maps @default tag to the default field in entries', async function mapsDefaultTag() {
      const generator = {
        generateDocumentation: vi.fn(),
        generateTypeTable: vi.fn(),
        generateCategorizedTypeTable: vi.fn().mockResolvedValue({
          docs: [
            {
              id: 'test',
              name: 'RadioProps',
              entries: [
                {
                  name: 'size',
                  type: 'string',
                  description: '',
                  simplifiedType: 'string',
                  tags: [{ name: 'default', text: 'medium' }],
                  required: false,
                  deprecated: false
                }
              ]
            }
          ],
          categories: {}
        })
      };

      const tree = await run('<ArgTypes of={Stories.Props} />', '/fake/radio/README.mdx', {
        generator
      });
      const propTable = (tree as any).children[0];
      const entriesAttr = propTable.attributes.find((a: { name: string }) => a.name === 'entries');
      const body = entriesAttr.value.data.estree.body[0].expression;
      const firstEntry = body.elements[0];
      const defaultProp = firstEntry.properties.find((p: { key: { value: string } }) => p.key.value === 'default');
      assume(defaultProp.value.value).equals('medium');
    });
  });
});
