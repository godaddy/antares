import type { MdxJsxAttribute, MdxJsxExpressionAttribute, MdxJsxFlowElement } from 'mdast-util-mdx-jsx';
import type { Root } from 'mdast';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

interface MdNode {
  type: string;
  name?: string;
  children?: MdNode[];
  position?: {
    start?: { offset?: number };
    end?: { offset?: number };
  };
}

/** A live `<Block>` or `<BlockLink>` flow element found in authored MDX. */
export interface BlockMarker {
  /** Marker component name. */
  name: 'Block' | 'BlockLink';

  /** Block identifier from the `id` attribute. */
  id?: string;

  /** Optional explorer description. */
  description?: string;

  /** Storybook `of={...}` expression for `<Block>`. */
  ofExpression?: string;

  /** Inclusive start offset in the original source. */
  start: number;

  /** Exclusive end offset in the original source. */
  end: number;
}

/**
 * Collects live block markers from MDX structure so fenced examples and comments
 * are not treated as explorers.
 *
 * @param source - Authored MDX to inspect.
 */
export function collectBlockMarkers(source: string): BlockMarker[] {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(source) as Root;
  const markers: BlockMarker[] = [];
  visitMarkers(tree as unknown as MdNode, markers);
  return markers;
}

function visitMarkers(node: MdNode, markers: BlockMarker[]) {
  if (node.type === 'mdxJsxFlowElement' && (node.name === 'Block' || node.name === 'BlockLink')) {
    const start = node.position?.start?.offset;
    const end = node.position?.end?.offset;
    if (start === undefined || end === undefined) {
      throw new Error(`<${node.name}> is missing source offsets and cannot be expanded.`);
    }

    const marker = node as unknown as MdxJsxFlowElement;
    markers.push({
      name: node.name,
      id: getStringAttribute(marker, 'id'),
      description: getStringAttribute(marker, 'description'),
      ofExpression: getExpressionAttribute(marker, 'of'),
      start,
      end
    });
    return;
  }

  if (!node.children) return;
  for (const child of node.children) visitMarkers(child, markers);
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
