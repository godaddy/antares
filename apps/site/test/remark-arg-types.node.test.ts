import { describe, it, expect, vi, beforeEach } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import { VFile } from 'vfile';

const { resolvePropsDoc, toFumadocsPropTable } = vi.hoisted(() => ({
  resolvePropsDoc: vi.fn(),
  toFumadocsPropTable: vi.fn()
}));

vi.mock('@bento/storybook-addon-helpers/docs', () => ({ resolvePropsDoc, toFumadocsPropTable }));

const { remarkArgTypes } = await import('../lib/remark-arg-types');

async function run(mdx: string, filePath: string, compilerData?: Record<string, unknown>) {
  const processor = unified().use(remarkParse).use(remarkMdx).use(remarkArgTypes);
  const file = new VFile({ path: filePath, value: mdx });
  if (compilerData) Object.assign(file.data, compilerData);
  return processor.run(processor.parse(file), file);
}

function firstChild(tree: any): any {
  return tree.children[0];
}

function attr(node: any, name: string) {
  return node.attributes.find((a: { name: string }) => a.name === name);
}

describe('remarkArgTypes', function remarkArgTypesTests() {
  beforeEach(function reset() {
    resolvePropsDoc.mockReset();
    toFumadocsPropTable.mockReset();
  });

  it('skips non-ArgTypes JSX elements', async function skipsNonArgTypes() {
    const tree = await run('<Foo of={Stories.Props} />', '/fake/radio/README.mdx');
    expect(firstChild(tree).name).toBe('Foo');
    expect(resolvePropsDoc).not.toHaveBeenCalled();
  });

  it('skips ArgTypes with no of= attribute', async function skipsNoAttributes() {
    const tree = await run('<ArgTypes />', '/fake/radio/README.mdx');
    expect(firstChild(tree).name).toBe('ArgTypes');
    expect(resolvePropsDoc).not.toHaveBeenCalled();
  });

  it('skips ArgTypes with a string of= attribute (not expression)', async function skipsMalformedOf() {
    const tree = await run('<ArgTypes of="Stories.Props" />', '/fake/radio/README.mdx');
    expect(firstChild(tree).name).toBe('ArgTypes');
    expect(resolvePropsDoc).not.toHaveBeenCalled();
  });

  it('skips ArgTypes when the expression produces an empty export name', async function skipsEmptyName() {
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
    expect(firstChild(result).name).toBe('ArgTypes');
    expect(resolvePropsDoc).not.toHaveBeenCalled();
  });

  it('skips ArgTypes node when it is the root (no parent)', async function skipsRootNode() {
    const rootNode = {
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
    const file = new VFile({ path: '/fake/radio/README.mdx' });
    const result = await unified()
      .use(remarkArgTypes)
      .run(rootNode as any, file);
    expect((result as any).name).toBe('ArgTypes');
    expect(resolvePropsDoc).not.toHaveBeenCalled();
  });

  it('replaces <ArgTypes of={Stories.Props}> with a populated <PropTable>', async function populated() {
    resolvePropsDoc.mockResolvedValue({ name: 'Radio', props: [] });
    toFumadocsPropTable.mockReturnValue({
      entries: [{ name: 'size', type: 'string', required: false }],
      categories: { Events: ['onPress'] }
    });

    const addDependency = vi.fn();
    const tree = await run('<ArgTypes of={Stories.Props} />', '/fake/radio/README.mdx', {
      _compiler: { addDependency }
    });

    const propTable = firstChild(tree);
    expect(propTable.name).toBe('PropTable');
    expect(attr(propTable, 'entries').value.type).toBe('mdxJsxAttributeValueExpression');
    expect(attr(propTable, 'categories').value.type).toBe('mdxJsxAttributeValueExpression');

    expect(resolvePropsDoc).toHaveBeenCalledWith({
      filePath: '/fake/radio/radio.stories.tsx',
      exportName: 'Props',
      defaults: undefined
    });
    expect(toFumadocsPropTable).toHaveBeenCalledWith({ name: 'Radio', props: [] });

    // Both the stories file and the component source are registered as deps.
    expect(addDependency).toHaveBeenCalledWith('/fake/radio/radio.stories.tsx');
    expect(addDependency).toHaveBeenCalledWith('/fake/radio/src/index.tsx');
  });

  it('emits an empty <PropTable> when the export resolves to nothing', async function empty() {
    resolvePropsDoc.mockResolvedValue(undefined);

    const tree = await run('<ArgTypes of={Stories.Missing} />', '/fake/radio/README.mdx');

    const propTable = firstChild(tree);
    expect(propTable.name).toBe('PropTable');
    expect(toFumadocsPropTable).not.toHaveBeenCalled();
    expect(resolvePropsDoc).toHaveBeenCalledWith({
      filePath: '/fake/radio/radio.stories.tsx',
      exportName: 'Missing',
      defaults: undefined
    });
  });

  it('uses the Stories export name as-is for non-Props exports', async function usesNamedExport() {
    resolvePropsDoc.mockResolvedValue(undefined);

    await run('<ArgTypes of={Stories.LinkButtonProps} />', '/fake/radio/README.mdx');

    expect(resolvePropsDoc).toHaveBeenCalledWith({
      filePath: '/fake/radio/radio.stories.tsx',
      exportName: 'LinkButtonProps',
      defaults: undefined
    });
  });

  it('forwards docsDefaults to resolvePropsDoc', async function forwardsDefaults() {
    resolvePropsDoc.mockResolvedValue(undefined);
    const docsDefaults = { categories: { Events: [/^on/] } };

    const processor = unified().use(remarkParse).use(remarkMdx).use(remarkArgTypes, { docsDefaults });
    const file = new VFile({ path: '/fake/radio/README.mdx', value: '<ArgTypes of={Stories.Props} />' });
    await processor.run(processor.parse(file), file);

    expect(resolvePropsDoc).toHaveBeenCalledWith({
      filePath: '/fake/radio/radio.stories.tsx',
      exportName: 'Props',
      defaults: docsDefaults
    });
  });
});
