import { valueToEstree } from 'estree-util-value-to-estree';
import type { MdxJsxFlowElement, MdxJsxTextElement } from 'mdast-util-mdx-jsx';
import type { Root } from 'mdast';
import { getExpressionAttribute, getStringAttribute } from './mdx-block-markers.ts';
import { addMdxContextDependency, addMdxDependency } from './remark-utils.ts';
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

/** Host configuration for {@link remarkBlocks}. */
export interface RemarkBlocksOptions {
  /** Resolves a block overview URL for the current documentation host. */
  resolveBlockHref: (blockId: string) => string;
}

/**
 * Expands the build-time `<Block>` and `<BlockLink>` markers in Fumadocs MDX.
 *
 * @param options - {@link RemarkBlocksOptions}
 * @returns An async remark transformer that replaces markers and tracks source dependencies.
 */
export function remarkBlocks({ resolveBlockHref }: RemarkBlocksOptions) {
  /** Replaces live markers only when their source README can be resolved. */
  return async function transform(tree: Root, file: RemarkFile): Promise<void> {
    if (!file.path) return;

    await replaceMarkers(tree.children as unknown as MdNode[], file, resolveBlockHref);
  };
}

/**
 * Recursively replaces block elements without traversing generated replacements.
 *
 * @param nodes - Sibling nodes to update in place.
 * @param file - Source README and its compiler data.
 * @param resolveBlockHref - Host resolver for block overview URLs.
 */
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

    if ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && node.name === 'BlockLink') {
      await replaceBlockLink(nodes, file, index, resolveBlockHref);
      continue;
    }

    if (node.children) await replaceMarkers(node.children, file, resolveBlockHref);
  }
}

/**
 * Loads the requested block and replaces its marker with the site explorer.
 *
 * @param nodes - Sibling nodes containing the marker.
 * @param file - Source README used to resolve the block.
 * @param index - Marker position to replace in the array.
 */
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

/**
 * Replaces a block reference with a link resolved by the documentation host.
 *
 * @param nodes - Sibling nodes containing the marker.
 * @param file - Source README used to resolve the block.
 * @param index - Marker position to replace in the array.
 * @param resolveBlockHref - Host resolver for the overview URL.
 */
async function replaceBlockLink(
  nodes: MdNode[],
  file: RemarkFile,
  index: number,
  resolveBlockHref: RemarkBlocksOptions['resolveBlockHref']
) {
  const marker = nodes[index] as unknown as MdxJsxFlowElement | MdxJsxTextElement;
  const id = getStringAttribute(marker, 'id');

  if (!id) throw new Error(`${file.path}: <BlockLink> requires id="...".`);

  const blockDirectory = await resolveBlockDirectory(file.path as string, id);
  addMdxDependency(file, `${blockDirectory}/README.mdx`);

  const link = renderSiteBlockLink(id, resolveBlockHref);
  nodes[index] = marker.type === 'mdxJsxTextElement' ? link : { type: 'paragraph', children: [link] };
}

/**
 * Tracks README and source changes for documentation rebuilds.
 *
 * @param file - MDX file carrying the compiler's dependency tracker.
 * @param blockDirectory - Block root used to resolve dependency paths.
 * @param manifest - Discovered block source files.
 */
function addManifestDependencies(
  file: RemarkFile,
  blockDirectory: string,
  manifest: Awaited<ReturnType<typeof loadBlockManifest>>
) {
  addMdxContextDependency(file, blockDirectory);
  addMdxDependency(file, `${blockDirectory}/README.mdx`);
  for (const sourceFile of manifest.files) addMdxDependency(file, `${blockDirectory}/${sourceFile.path}`);
}

/**
 * Builds the explorer node with the authored preview component.
 *
 * @param manifest - Block metadata and source files to embed.
 * @param ofExpression - Authored preview component reference.
 * @returns The explorer JSX node containing the preview.
 */
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

/**
 * Builds the related-block navigation node using the host's URL.
 *
 * @param id - Identifier of the referenced block.
 * @param resolveBlockHref - Host resolver for the overview URL.
 * @returns A Markdown link using the host's document styling.
 */
function renderSiteBlockLink(id: string, resolveBlockHref: RemarkBlocksOptions['resolveBlockHref']): MdNode {
  return {
    type: 'link',
    url: resolveBlockHref(id),
    children: [{ type: 'text', value: id }]
  };
}

/**
 * Attaches an ESTree expression so MDX compilers preserve generated attribute values.
 *
 * @param name - Generated JSX attribute name.
 * @param expression - ESTree value consumed by the MDX compiler.
 * @param value - Source representation of the expression.
 * @returns A JSX expression attribute containing both source and ESTree data.
 */
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
