import { valueToEstree } from 'estree-util-value-to-estree';
import type { MdxJsxAttribute, MdxJsxExpressionAttribute, MdxJsxFlowElement } from 'mdast-util-mdx-jsx';
import type { Root } from 'mdast';
import { addMdxDependency } from './remark-utils.ts';
import { loadBlockManifest, resolveBlockDirectory } from './node.ts';

interface RemarkFile {
  path?: string;
  data: Record<string, unknown>;
}

interface MdNode {
  type: string;
  [key: string]: unknown;
}

/**
 * Expands the build-time `<Block>` and `<BlockLink>` markers in Fumadocs MDX.
 */
export function remarkBlocks() {
  return async function transform(tree: Root, file: RemarkFile): Promise<void> {
    if (!file.path) return;

    const explorerIndex = tree.children.findIndex(function isBlockMarker(node: {
      type?: string;
      name?: string | null;
    }) {
      return node.type === 'mdxJsxFlowElement' && node.name === 'Block';
    });
    if (explorerIndex !== -1) {
      await replaceExplorer(tree, file, explorerIndex);
      return;
    }

    const linkIndex = tree.children.findIndex(function isBlockLinkMarker(node: {
      type?: string;
      name?: string | null;
    }) {
      return node.type === 'mdxJsxFlowElement' && node.name === 'BlockLink';
    });
    if (linkIndex !== -1) await replaceBlockLink(tree, file, linkIndex);
  };
}

async function replaceExplorer(tree: Root, file: RemarkFile, index: number) {
  const marker = tree.children[index] as unknown as MdxJsxFlowElement;
  const id = getStringAttribute(marker, 'id');
  const ofExpression = getExpressionAttribute(marker, 'of');

  if (!id || !ofExpression) {
    throw new Error(`${file.path}: <Block> requires id="..." and of={Stories.Preview}.`);
  }

  const blockDirectory = await resolveBlockDirectory(file.path as string, id);
  const manifest = await loadBlockManifest(blockDirectory);
  addManifestDependencies(file, blockDirectory, manifest);

  tree.children[index] = renderSiteBlock(manifest, ofExpression) as (typeof tree.children)[number];
}

async function replaceBlockLink(tree: Root, file: RemarkFile, index: number) {
  const marker = tree.children[index] as unknown as MdxJsxFlowElement;
  const id = getStringAttribute(marker, 'id');

  if (!id) throw new Error(`${file.path}: <BlockLink> requires id="...".`);

  const blockDirectory = await resolveBlockDirectory(file.path as string, id);
  const manifest = await loadBlockManifest(blockDirectory);
  addManifestDependencies(file, blockDirectory, manifest);

  tree.children[index] = renderSiteBlockLink(manifest) as (typeof tree.children)[number];
}

function addManifestDependencies(
  file: RemarkFile,
  blockDirectory: string,
  manifest: Awaited<ReturnType<typeof loadBlockManifest>>
) {
  addMdxDependency(file, `${blockDirectory}/block.json`);
  for (const sourceFile of manifest.files) addMdxDependency(file, `${blockDirectory}/${sourceFile.path}`);
}

function renderSiteBlock(manifest: Awaited<ReturnType<typeof loadBlockManifest>>, ofExpression: string): MdNode {
  return {
    type: 'mdxJsxFlowElement',
    name: 'SiteBlockExplorer',
    attributes: [expressionAttribute('block', valueToEstree(manifest), JSON.stringify(manifest))],
    children: [
      {
        type: 'mdxJsxFlowElement',
        name: ofExpression,
        attributes: [],
        children: []
      }
    ]
  };
}

function renderSiteBlockLink(manifest: Awaited<ReturnType<typeof loadBlockManifest>>): MdNode {
  const block = {
    id: manifest.id,
    title: manifest.title,
    href: `/docs/blocks/${manifest.id}`
  };

  return {
    type: 'mdxJsxFlowElement',
    name: 'BlockLinks',
    attributes: [expressionAttribute('blocks', valueToEstree([block]), JSON.stringify([block]))],
    children: []
  };
}

function getStringAttribute(node: MdxJsxFlowElement, name: string): string | undefined {
  const attribute = findNamedAttribute(node, name);
  return typeof attribute?.value === 'string' ? attribute.value : undefined;
}

function getExpressionAttribute(node: MdxJsxFlowElement, name: string): string | undefined {
  const attribute = findNamedAttribute(node, name);
  const value = attribute?.value;
  if (!value || typeof value === 'string' || value.type !== 'mdxJsxAttributeValueExpression') return undefined;
  return value.value?.trim();
}

function findNamedAttribute(node: MdxJsxFlowElement, name: string): MdxJsxAttribute | undefined {
  for (const attribute of node.attributes as (MdxJsxAttribute | MdxJsxExpressionAttribute)[]) {
    if (attribute.type === 'mdxJsxAttribute' && attribute.name === name) return attribute;
  }

  return undefined;
}

function expressionAttribute(name: string, expression: unknown, value: string): MdNode {
  return {
    type: 'mdxJsxAttribute',
    name,
    value: {
      type: 'mdxJsxAttributeValueExpression',
      value,
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [{ type: 'ExpressionStatement', expression }]
        }
      }
    }
  };
}
