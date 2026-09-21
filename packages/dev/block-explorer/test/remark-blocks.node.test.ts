import { resolve } from 'node:path';
import { unified } from 'unified';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { VFile } from 'vfile';
import { describe, expect, it, vi } from 'vitest';
import { remarkBlocks } from '../src/remark-blocks.ts';

type AnyNode = {
  type: string;
  name?: string;
  attributes?: AnyNode[];
  children?: AnyNode[];
  value?: unknown;
  data?: AnyNode;
  [key: string]: unknown;
};

interface AnyTree extends AnyNode {
  children: AnyNode[];
}

const fixtureReadme = resolve(import.meta.dirname, 'fixtures/block/README.mdx');

describe('remarkBlocks', function remarkBlocksTests() {
  it('expands a Block marker into a site explorer and registers discovered files', async function expandsBlock() {
    const { tree, addDependency } = await transform(
      '<Block id="fixture-block" description="Fixture description." of={Stories.Preview} />'
    );
    const explorer = tree.children[0] as AnyNode;

    expect(explorer).toMatchObject({ type: 'mdxJsxFlowElement', name: 'SiteBlockExplorer' });
    expect((explorer.children as AnyNode[])[0]).toMatchObject({
      type: 'mdxJsxFlowElement',
      name: 'Stories.Preview'
    });
    expect(JSON.parse(getExpressionValue(explorer, 'block'))).toMatchObject({
      id: 'fixture-block',
      description: 'Fixture description.'
    });
    expect(
      addDependency.mock.calls.map(function getDependency([path]) {
        return path;
      })
    ).toEqual([
      expect.stringContaining('README.mdx'),
      expect.stringContaining('index.tsx'),
      expect.stringContaining('nested/README.mdx'),
      expect.stringContaining('styles/theme.css')
    ]);
  });

  it('expands nested Block markers', async function expandsNestedBlock() {
    const { tree, addDependency } = await transform(
      '<Wrapper><Entry><Block id="fixture-block" description="Fixture description." of={Stories.Preview} /></Entry></Wrapper>'
    );
    const catalog = tree.children[0] as AnyNode;
    const entry = (catalog.children as AnyNode[])[0];
    const explorer = (entry.children as AnyNode[])[0];

    expect(explorer).toMatchObject({ name: 'SiteBlockExplorer' });
    expect((explorer.children as AnyNode[])[0]).toMatchObject({ name: 'Stories.Preview' });
    expect(JSON.parse(getExpressionValue(explorer, 'block'))).toMatchObject({
      id: 'fixture-block',
      description: 'Fixture description.'
    });
    expect(addDependency).toHaveBeenCalledWith(expect.stringContaining('index.tsx'));
  });

  it('expands a Block marker without a description', async function expandsBlockWithoutDescription() {
    const { tree } = await transform('<Block id="fixture-block" of={Stories.Preview} />');
    const explorer = tree.children[0] as AnyNode;

    expect(explorer).toMatchObject({ name: 'SiteBlockExplorer' });
    expect(JSON.parse(getExpressionValue(explorer, 'block'))).not.toHaveProperty('description');
  });

  it('expands a BlockLink marker into a site link collection', async function expandsBlockLink() {
    const { tree } = await transform('<BlockLink id="fixture-block" />');
    const links = tree.children[0] as AnyNode;
    const blocks = JSON.parse(getExpressionValue(links, 'blocks'));

    expect(links).toMatchObject({ type: 'mdxJsxFlowElement', name: 'BlockLinks' });
    expect(blocks).toEqual([
      {
        id: 'fixture-block',
        href: '/docs/blocks/fixture-block'
      }
    ]);
  });

  it('uses the host resolver for BlockLink URLs', async function resolvesHostLinks() {
    const { tree } = await transform('<BlockLink id="fixture-block" />', (id) => `/antares/docs/blocks/${id}`);
    const links = tree.children[0] as AnyNode;
    const blocks = JSON.parse(getExpressionValue(links, 'blocks'));

    expect(blocks[0].href).toBe('/antares/docs/blocks/fixture-block');
  });

  it('leaves the tree unchanged when the file has no path', async function skipsPathlessFiles() {
    const tree = { type: 'root', children: [{ type: 'paragraph', children: [] }] } as AnyTree;
    const file = new VFile({ value: '<Block id="fixture-block" of={Stories.Preview} />' });

    await remarkBlocks({ resolveBlockHref: (id) => `/docs/blocks/${id}` })(tree as never, file as never);

    expect(tree.children).toHaveLength(1);
    expect(tree.children[0]).toMatchObject({ type: 'paragraph' });
  });

  it('reports the required attributes for a Block marker', async function requiresBlockAttributes() {
    await expect(transform('<Block of={Stories.Preview} />')).rejects.toThrow(
      `${fixtureReadme}: <Block> requires id="..." and of={Stories.Preview}.`
    );
    await expect(transform('<Block id="fixture-block" description="Fixture description." />')).rejects.toThrow(
      `${fixtureReadme}: <Block> requires id="..." and of={Stories.Preview}.`
    );
  });

  it('reports the required id for a BlockLink marker', async function requiresBlockLinkId() {
    await expect(transform('<BlockLink />')).rejects.toThrow(`${fixtureReadme}: <BlockLink> requires id="...".`);
  });
});

async function transform(markdown: string, resolveBlockHref = (id: string) => `/docs/blocks/${id}`) {
  const processor = unified().use(remarkParse).use(remarkMdx).use(remarkBlocks, { resolveBlockHref });
  const file = new VFile({ path: fixtureReadme, value: markdown });
  const addDependency = vi.fn();
  Object.assign(file.data, { _compiler: { addDependency } });

  return {
    tree: (await processor.run(processor.parse(file), file)) as AnyTree,
    addDependency
  };
}

function getAttribute(node: AnyNode, name: string) {
  return node.attributes?.find(function findAttribute(attribute) {
    return attribute.name === name;
  });
}

function getExpressionValue(node: AnyNode, name: string) {
  const value = getAttribute(node, name)?.value;
  if (!value || typeof value !== 'object') throw new Error(`Missing expression attribute: ${name}`);
  return String((value as { value?: unknown }).value);
}
