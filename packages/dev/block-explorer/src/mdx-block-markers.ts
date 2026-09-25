import type { MdxJsxAttribute, MdxJsxExpressionAttribute, MdxJsxFlowElement } from 'mdast-util-mdx-jsx';
import type { Root, Yaml } from 'mdast';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

const MDX_PARSER = unified().use(remarkParse).use(remarkFrontmatter).use(remarkMdx);

interface MdNode {
  type: string;
  name?: string;
  children?: MdNode[];
  data?: { estree?: EstreeNode };
  position?: {
    start?: { offset?: number };
    end?: { offset?: number };
  };
}

interface EstreeNode {
  type: string;
  importKind?: string;
  source?: { value?: string };
  specifiers?: EstreeSpecifier[];
  body?: EstreeNode[];
}

interface EstreeSpecifier {
  type: string;
  importKind?: string;
  local?: { name?: string };
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
 * Parses authored MDX, including frontmatter, without evaluating its expressions.
 *
 * @param source - MDX source to parse.
 * @param filePath - Optional path included in parse errors.
 * @returns The MDX syntax tree with original source positions.
 * @throws If the source contains invalid MDX.
 */
export function parseBlockMdx(source: string, filePath?: string): Root {
  try {
    return MDX_PARSER.parse(source) as Root;
  } catch (error) {
    if (!filePath) throw error;
    throw new Error(`${filePath}: ${error instanceof Error ? error.message : String(error)}`, { cause: error });
  }
}

/**
 * Finds YAML frontmatter without matching delimiters inside authored content.
 *
 * @param tree - Parsed MDX tree.
 * @returns The leading YAML node with its source positions, or `undefined` when absent.
 */
export function getYamlFrontmatter(tree: Root): Yaml | undefined {
  const node = tree.children[0];
  return node?.type === 'yaml' ? node : undefined;
}

/**
 * Collects live block markers, excluding fenced examples, inline code, and comments.
 *
 * @param tree - Parsed MDX tree with source positions.
 * @returns Markers in source order, each with its attributes and replacement offsets.
 * @throws If a marker has no source offsets.
 */
export function collectBlockMarkers(tree: Root): BlockMarker[] {
  const markers: BlockMarker[] = [];
  visitMarkers(tree as unknown as MdNode, markers);
  return markers;
}

/**
 * Checks whether the tree already binds a runtime import under the required local name.
 *
 * @param tree - Parsed MDX tree containing import declarations.
 * @param name - Local binding required by generated JSX.
 * @param moduleId - Module that must supply the binding.
 * @returns Whether a named value import supplies the binding; type imports are ignored.
 */
export function hasNamedRuntimeImport(tree: Root, name: string, moduleId: string): boolean {
  return (tree.children as unknown as MdNode[]).some((node) => declarationBindsRuntimeName(node, name, moduleId));
}

/**
 * Walks MDX elements in source order, treating each marker as one replacement.
 *
 * @param node - Current node in the traversal.
 * @param markers - Accumulator receiving live markers and their source offsets.
 */
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

/**
 * Inspects actual import declarations, excluding type imports and other modules.
 *
 * @param node - MDX node that may contain an ESTree import declaration.
 * @param name - Required local binding.
 * @param moduleId - Expected source module.
 * @returns Whether the node declares the named runtime binding.
 */
function declarationBindsRuntimeName(node: MdNode, name: string, moduleId: string): boolean {
  if (node.type !== 'mdxjsEsm') return false;

  for (const statement of node.data?.estree?.body ?? []) {
    if (statement.type !== 'ImportDeclaration' || statement.importKind === 'type') continue;
    if (statement.source?.value !== moduleId) continue;

    for (const specifier of statement.specifiers ?? []) {
      if (specifier.type !== 'ImportSpecifier' || specifier.importKind === 'type') continue;
      if (specifier.local?.name === name) return true;
    }
  }

  return false;
}

/**
 * Reads a literal JSX string without evaluating expressions or spreads.
 *
 * @param node - JSX element containing the attribute.
 * @param name - Explicit attribute name to look up.
 * @returns The string value, or `undefined` for absent or non-string attributes.
 */
export function getStringAttribute(node: MdxJsxFlowElement, name: string): string | undefined {
  const attribute = findNamedAttribute(node, name);
  return typeof attribute?.value === 'string' ? attribute.value : undefined;
}

/**
 * Reads an authored JSX expression for the host compiler to evaluate.
 *
 * @param node - JSX element containing the attribute.
 * @param name - Explicit attribute name to look up.
 * @returns Trimmed expression source, or `undefined` for absent or non-expression attributes.
 */
export function getExpressionAttribute(node: MdxJsxFlowElement, name: string): string | undefined {
  const attribute = findNamedAttribute(node, name);
  const value = attribute?.value;
  if (!value || typeof value === 'string' || value.type !== 'mdxJsxAttributeValueExpression') return undefined;
  return value.value?.trim();
}

/**
 * Finds an explicit attribute, ignoring spread expressions.
 *
 * @param node - JSX element to inspect.
 * @param name - Attribute name to match.
 * @returns The first matching attribute, or `undefined` when absent.
 */
function findNamedAttribute(node: MdxJsxFlowElement, name: string): MdxJsxAttribute | undefined {
  for (const attribute of node.attributes as (MdxJsxAttribute | MdxJsxExpressionAttribute)[]) {
    if (attribute.type === 'mdxJsxAttribute' && attribute.name === name) return attribute;
  }

  return undefined;
}
