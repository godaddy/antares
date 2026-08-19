import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { remarkExamples } from '../src/remark-examples.ts';

const FIXTURE_DIR = path.join(__dirname, 'fixtures/examples-fixture');

// The plugin operates on a loosely-typed mdast; tests use `any` to poke at nodes.
type AnyNode = { type: string; [key: string]: any };

/** Builds a `<Examples of={Stories.<name>} />` root, as authored in a README. */
function makeTree(reference = 'Stories.examples'): { type: 'root'; children: AnyNode[] } {
  const attributes = [
    { type: 'mdxJsxAttribute', name: 'of', value: { type: 'mdxJsxAttributeValueExpression', value: reference } }
  ];
  return { type: 'root', children: [{ type: 'mdxJsxFlowElement', name: 'Examples', attributes, children: [] }] };
}

function byName(children: AnyNode[], name: string): AnyNode[] {
  return children.filter((c) => c.type === 'mdxJsxFlowElement' && c.name === name);
}

function attr(node: AnyNode, name: string): AnyNode | undefined {
  return node.attributes.find((a: AnyNode) => a.name === name);
}

function expression(node: AnyNode, name: string): AnyNode {
  return attr(node, name)?.value.data.estree.body[0].expression;
}

describe('remark-examples', function remarkExamplesTests() {
  it('expands <Examples of={Stories.examples} /> into heading + story + source per example (stories)', async function stories() {
    const tree = makeTree();
    const onDependency = vi.fn();

    await remarkExamples({ target: 'stories', onDependency })(tree, {
      path: path.join(FIXTURE_DIR, 'README.mdx'),
      data: {}
    });

    expect(tree.children[0]).toMatchObject({ type: 'heading', depth: 3, children: [{ value: 'Basic Usage' }] });
    expect(byName(tree.children, 'Story')).toHaveLength(4);
    expect(byName(tree.children, 'Source')).toHaveLength(4);
    // One dependency for the resolved stories file, plus one per example.
    expect(onDependency).toHaveBeenCalledTimes(5);
    expect(onDependency).toHaveBeenCalledWith(expect.anything(), path.join(FIXTURE_DIR, 'widget.stories.tsx'));

    // No direct imports are injected for the `stories` target.
    expect(tree.children.some((c) => c.type === 'mdxjsEsm')).toBe(false);

    const story = byName(tree.children, 'Story')[0];
    expect(expression(story, 'of')).toMatchObject({
      type: 'MemberExpression',
      object: { name: 'Stories' },
      property: { name: 'Default' }
    });
    expect(attr(story, 'inline')).toBeDefined();

    const source = byName(tree.children, 'Source')[0];
    expect(expression(source, 'code').value).toContain('DefaultExample');
    expect(expression(source, 'code').value).not.toContain('@order');
  });

  it('injects direct component imports and identifier refs (components)', async function components() {
    const tree = makeTree();

    await remarkExamples({ target: 'components' })(tree, { path: path.join(FIXTURE_DIR, 'README.mdx'), data: {} });

    const imports = tree.children.filter((c) => c.type === 'mdxjsEsm');
    // One import per example component, plus the doc-blocks import the expansion emits.
    expect(imports).toHaveLength(5);
    expect(imports[0].data.estree.body[0].source.value).toBe('./examples/default.tsx');
    expect(imports.some((i) => i.value === 'import { Source, Story } from "@storybook/addon-docs/blocks";')).toBe(true);

    const story = byName(tree.children, 'Story')[0];
    expect(expression(story, 'of')).toMatchObject({ type: 'Identifier', name: 'DefaultExample' });
    expect(attr(story, 'inline')).toBeUndefined();
  });

  it('does not re-import doc blocks the README already imports (components)', async function dedupesBlocks() {
    const tree = makeTree();
    tree.children.unshift({ type: 'mdxjsEsm', value: "import { Source, Story } from '@storybook/addon-docs/blocks';" });

    await remarkExamples({ target: 'components' })(tree, { path: path.join(FIXTURE_DIR, 'README.mdx'), data: {} });

    const blocksImports = tree.children.filter(
      (c) => c.type === 'mdxjsEsm' && String(c.value).includes('addon-docs/blocks')
    );
    expect(blocksImports).toHaveLength(1);
  });

  it('drops the marker when of={Stories.<name>} names an unknown export', async function unknownExport() {
    const tree = makeTree('Stories.missing');

    await remarkExamples({ target: 'components' })(tree, { path: path.join(FIXTURE_DIR, 'README.mdx'), data: {} });

    expect(byName(tree.children, 'Story')).toHaveLength(0);
  });

  it('leaves the tree untouched when there is no <Examples /> node', async function noNode() {
    const tree: { type: 'root'; children: AnyNode[] } = {
      type: 'root',
      children: [{ type: 'paragraph', children: [] }]
    };
    await remarkExamples({ target: 'stories' })(tree, { path: path.join(FIXTURE_DIR, 'README.mdx'), data: {} });
    expect(tree.children).toHaveLength(1);
  });

  it('does nothing without a file path', async function noPath() {
    const tree = makeTree();
    await remarkExamples({ target: 'stories' })(tree, { data: {} });
    expect(tree.children).toHaveLength(1);
  });

  it('emits the description as literal text without a parser', async function literalDescription() {
    const tree = makeTree();

    await remarkExamples({ target: 'components' })(tree, { path: path.join(FIXTURE_DIR, 'README.mdx'), data: {} });

    const paragraph = tree.children.find((c) => c.type === 'paragraph');
    expect(paragraph?.children).toEqual([{ type: 'text', value: 'A default button with a text label.' }]);
  });

  it('splices parsed description blocks when a parser is supplied', async function parsedDescription() {
    const tree = makeTree();
    const parseMarkdown = vi.fn((markdown: string) => [
      { type: 'paragraph', children: [{ type: 'inlineCode', value: markdown.split(' ')[0] }] }
    ]);

    await remarkExamples({ target: 'components', parseMarkdown })(tree, {
      path: path.join(FIXTURE_DIR, 'README.mdx'),
      data: {}
    });

    expect(parseMarkdown).toHaveBeenCalledWith('A default button with a text label.');
    const paragraph = tree.children.find((c) => c.type === 'paragraph');
    expect(paragraph?.children).toEqual([{ type: 'inlineCode', value: 'A' }]);
  });

  it('falls back to literal text when the parser yields nothing', async function emptyParse() {
    const tree = makeTree();

    await remarkExamples({ target: 'components', parseMarkdown: () => [] })(tree, {
      path: path.join(FIXTURE_DIR, 'README.mdx'),
      data: {}
    });

    const paragraph = tree.children.find((c) => c.type === 'paragraph');
    expect(paragraph?.children).toEqual([{ type: 'text', value: 'A default button with a text label.' }]);
  });
});
