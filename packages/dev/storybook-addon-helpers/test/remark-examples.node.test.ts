import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { remarkExamples } from '../src/remark-examples.ts';

const FIXTURE_DIR = path.join(__dirname, 'fixtures/examples-fixture');

// The plugin operates on a loosely-typed mdast; tests use `any` to poke at nodes.
type AnyNode = { type: string; [key: string]: any };

function makeTree(attributes: AnyNode[] = []): { type: 'root'; children: AnyNode[] } {
  return {
    type: 'root',
    children: [{ type: 'mdxJsxFlowElement', name: 'Examples', attributes, children: [] }]
  };
}

/** Builds an `of={Stories.<name>}` mdast attribute. */
function ofAttr(reference: string): AnyNode {
  return {
    type: 'mdxJsxAttribute',
    name: 'of',
    value: { type: 'mdxJsxAttributeValueExpression', value: reference }
  };
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
  it('expands <Examples /> into heading + story + source per example (storybook)', async function storybook() {
    const tree = makeTree();
    const onDependency = vi.fn();

    await remarkExamples({ target: 'storybook', onDependency })(tree, {
      path: path.join(FIXTURE_DIR, 'README.mdx'),
      data: {}
    });

    expect(tree.children[0]).toMatchObject({ type: 'heading', depth: 3, children: [{ value: 'Basic Usage' }] });
    expect(byName(tree.children, 'Story')).toHaveLength(6);
    expect(byName(tree.children, 'Source')).toHaveLength(6);
    // One dependency for the resolved stories file, plus one per example.
    expect(onDependency).toHaveBeenCalledTimes(7);
    expect(onDependency).toHaveBeenCalledWith(expect.anything(), path.join(FIXTURE_DIR, 'widget.stories.tsx'));

    // No direct imports are injected for the Storybook target.
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

  it('injects direct component imports and identifier refs (fumadocs)', async function fumadocs() {
    const tree = makeTree();

    await remarkExamples({ target: 'fumadocs' })(tree, { path: path.join(FIXTURE_DIR, 'README.mdx'), data: {} });

    const imports = tree.children.filter((c) => c.type === 'mdxjsEsm');
    expect(imports).toHaveLength(6);
    expect(imports[0].data.estree.body[0].source.value).toBe('./examples/default.tsx');

    const story = byName(tree.children, 'Story')[0];
    expect(expression(story, 'of')).toMatchObject({ type: 'Identifier', name: 'DefaultExample' });
    expect(attr(story, 'inline')).toBeUndefined();
  });

  it('resolves the folder via of={Stories.<name>} and an explicit getExamples path', async function ofReference() {
    const tree = makeTree([ofAttr('Stories.examples')]);

    await remarkExamples({ target: 'fumadocs' })(tree, {
      path: path.join(__dirname, 'fixtures/examples-edge/README.mdx'),
      data: {}
    });

    expect(byName(tree.children, 'Story').length).toBeGreaterThan(0);
    const story = byName(tree.children, 'Story').find((s) => expression(s, 'of').name === 'Example');
    expect(story).toBeDefined();
  });

  it('drops the marker when of={Stories.<name>} names an unknown export', async function unknownExport() {
    const tree = makeTree([ofAttr('Stories.missing')]);

    await remarkExamples({ target: 'fumadocs' })(tree, {
      path: path.join(FIXTURE_DIR, 'README.mdx'),
      data: {}
    });

    expect(byName(tree.children, 'Story')).toHaveLength(0);
  });

  it('leaves the tree untouched when there is no <Examples /> node', async function noNode() {
    const tree: { type: 'root'; children: AnyNode[] } = {
      type: 'root',
      children: [{ type: 'paragraph', children: [] }]
    };
    await remarkExamples({ target: 'storybook' })(tree, { path: path.join(FIXTURE_DIR, 'README.mdx'), data: {} });
    expect(tree.children).toHaveLength(1);
  });

  it('does nothing without a file path', async function noPath() {
    const tree = makeTree();
    await remarkExamples({ target: 'storybook' })(tree, { data: {} });
    expect(tree.children).toHaveLength(1);
  });
});
