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
  children?: MdNode[];
  [key: string]: unknown;
}

export interface RemarkBlocksOptions {
  /** Resolves a block overview URL for the current documentation host. */
  resolveBlockHref: (blockId: string) => string;
}

/**
 * Expands the build-time `<Block>` and `<BlockLink>` markers in Fumadocs MDX.
 */
export function remarkBlocks({ resolveBlockHref }: RemarkBlocksOptions) {
  return async function transform(tree: Root, file: RemarkFile): Promise<void> {
    if (!file.path) return;

    await replaceMarkers(tree.children as unknown as MdNode[], file, resolveBlockHref);
  };
}

async function replaceMarkers(
  nodes: MdNode[],
  file: RemarkFile,
  resolveBlockHref: RemarkBlocksOptions['resolveBlockHref']
) {
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index];

    if (node.type === 'mdxJsxFlowElement' && node.name === 'Block') {
      await replaceExplorer(nodes, file, index);
      continue;
    }

    if (node.type === 'mdxJsxFlowElement' && node.name === 'BlockLink') {
      await replaceBlockLink(nodes, file, index, resolveBlockHref);
      continue;
    }

    if (node.children) await replaceMarkers(node.children, file, resolveBlockHref);
  }
}

async function replaceExplorer(nodes: MdNode[], file: RemarkFile, index: number) {
  const marker = nodes[index] as unknown as MdxJsxFlowElement;
  const id = getStringAttribute(marker, 'id');
  const description = getStringAttribute(marker, 'description');
  const ofExpression = getExpressionAttribute(marker, 'of');

  if (!id || !ofExpression) {
    throw new Error(`${file.path}: <Block> requires id="..." and of={Stories.Preview}.`);
  }

  const blockDirectory = await resolveBlockDirectory(file.path as string, id);
  const manifest = await loadBlockManifest(blockDirectory, { id, description });
  addManifestDependencies(file, blockDirectory, manifest);

  nodes[index] = renderSiteBlock(manifest, ofExpression);
}

async function replaceBlockLink(
  nodes: MdNode[],
  file: RemarkFile,
  index: number,
  resolveBlockHref: RemarkBlocksOptions['resolveBlockHref']
) {
  const marker = nodes[index] as unknown as MdxJsxFlowElement;
  const id = getStringAttribute(marker, 'id');

  if (!id) throw new Error(`${file.path}: <BlockLink> requires id="...".`);

  const blockDirectory = await resolveBlockDirectory(file.path as string, id);
  const manifest = await loadBlockManifest(blockDirectory, { id });
  addManifestDependencies(file, blockDirectory, manifest);

  nodes[index] = renderSiteBlockLink(manifest, resolveBlockHref);
}

function addManifestDependencies(
  file: RemarkFile,
  blockDirectory: string,
  manifest: Awaited<ReturnType<typeof loadBlockManifest>>
) {
  addMdxDependency(file, `${blockDirectory}/README.mdx`);
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

function renderSiteBlockLink(
  manifest: Awaited<ReturnType<typeof loadBlockManifest>>,
  resolveBlockHref: RemarkBlocksOptions['resolveBlockHref']
): MdNode {
  const block = {
    id: manifest.id,
    href: resolveBlockHref(manifest.id)
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
