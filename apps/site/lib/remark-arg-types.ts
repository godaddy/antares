import { basename, dirname, join } from 'node:path';
import type { MdxJsxFlowElement, MdxJsxAttribute } from 'mdast-util-mdx-jsx';
import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import type { Generator } from 'fumadocs-typescript';
import { valueToEstree } from 'estree-util-value-to-estree';
import { visit, SKIP } from 'unist-util-visit';
import type { CategorizedTypeTable } from './filtered-generator';
import { addMdxDependency } from './remark-mdx-utils';

/** Options accepted by the remarkArgTypes plugin. */
export interface RemarkArgTypesOptions {
  /**
   * Filtered generator used to resolve and categorize prop types.
   * When provided, emits a `<PropTable>` component with full prop data.
   * When absent, falls back to emitting `<auto-type-table>` (fumadocs default).
   */
  generator?: Generator & {
    generateCategorizedTypeTable(props: Parameters<Generator['generateTypeTable']>[0]): Promise<CategorizedTypeTable>;
  };
}

/**
 * Derives the TypeScript type name from a Stories property name and file path.
 *
 * - `Props` → `{PascalCase(dirname)}Props` (e.g. `RadioProps` for `radio/README.mdx`)
 * - Anything else → used as-is (e.g. `LinkButtonProps`)
 *
 * @param propertyName - The property name from the `of={Stories.X}` expression
 * @param filePath - Path to the MDX file (used to derive component dirname)
 * @returns The resolved TypeScript type name
 */
function getTypeName(propertyName: string, filePath: string): string {
  if (propertyName !== 'Props') return propertyName;
  return `${basename(dirname(filePath))
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')}Props`;
}

/**
 * Extracts the Stories property name from an `<ArgTypes of={Stories.X}>` node.
 *
 * @param node - The MDX JSX flow element to inspect
 * @returns The property name (e.g. `"Props"`, `"LinkButtonProps"`), or undefined if not a valid ArgTypes node
 */
function getArgTypesPropertyName(node: MdxJsxFlowElement): string | undefined {
  if (node.name !== 'ArgTypes') return;
  const ofAttr = node.attributes.find(
    (attr): attr is MdxJsxAttribute => attr.type === 'mdxJsxAttribute' && attr.name === 'of'
  );
  if (!ofAttr || typeof ofAttr.value !== 'object' || ofAttr.value?.type !== 'mdxJsxAttributeValueExpression') return;
  return ofAttr.value.value.split('.').at(-1);
}

/**
 * Builds an `mdxJsxAttributeValueExpression` wrapping the given value as
 * an estree expression, suitable for use as a JSX attribute value.
 *
 * @param value - Plain JS value to serialize (object, array, string, etc.)
 * @returns An MDX JSX attribute value node with embedded estree AST
 */
function toEstreeAttrValue(value: unknown): MdxJsxAttribute['value'] {
  return {
    type: 'mdxJsxAttributeValueExpression',
    value: '',
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [{ type: 'ExpressionStatement', expression: valueToEstree(value) }]
      }
    }
  };
}

/**
 * Transforms `<ArgTypes of={Stories.X}>` MDX nodes.
 *
 * When a `generator` option is provided (recommended for component docs):
 *  - Resolves prop types via `generateCategorizedTypeTable`
 *  - Emits `<PropTable entries={[...]} categories={{...}} />`
 *
 * Without `generator`:
 *  - Falls back to `<auto-type-table path="./src/index.tsx" name="XProps" />`
 *  - Filtering is then delegated to `remarkAutoTypeTable`'s filtered generator
 *
 * The accordion title and type name are derived from the Stories property:
 * - `of={Stories.Props}` → `{PascalCase(dirname)}Props` (e.g. `RadioProps`)
 * - `of={Stories.LinkButtonProps}` → `LinkButtonProps` (used as-is)
 *
 * The transform is invisible to Storybook, which sees the real `ArgTypes` block.
 */
export const remarkArgTypes: Plugin<[RemarkArgTypesOptions?], Root> = function remarkArgTypes(options) {
  const generator = options?.generator;

  if (!generator) {
    return function transform(tree, file) {
      visit(tree, 'mdxJsxFlowElement', function visitArgTypes(node, index, parent) {
        if (typeof index !== 'number' || !parent) return;
        const propertyName = getArgTypesPropertyName(node);
        if (!propertyName) return;

        const srcPath = join(dirname(file.path), 'src/index.tsx');
        addMdxDependency(file, srcPath);

        parent.children.splice(index, 1, buildAutoTypeTable(getTypeName(propertyName, file.path)));
        return [SKIP, index];
      });
    };
  }

  return function transform(tree, file) {
    const promises: Promise<void>[] = [];

    visit(tree, 'mdxJsxFlowElement', function visitArgTypes(node, index, parent) {
      if (typeof index !== 'number' || !parent) return;
      const propertyName = getArgTypesPropertyName(node);
      if (!propertyName) return;

      const typeName = getTypeName(propertyName, file.path);
      const srcPath = join(dirname(file.path), 'src/index.tsx');
      addMdxDependency(file, srcPath);

      const placeholder: MdxJsxFlowElement = {
        type: 'mdxJsxFlowElement',
        name: 'span',
        attributes: [],
        children: []
      };
      parent.children.splice(index, 1, placeholder);

      promises.push(
        generator.generateCategorizedTypeTable({ path: srcPath, name: typeName }).then(function applyResult({
          docs,
          categories
        }) {
          const entries = docs.flatMap((doc) =>
            doc.entries.map(function toEntry(entry) {
              const defaultTag = entry.tags.find((t) => t.name === 'default');
              return {
                name: entry.name,
                type: entry.type,
                typeHref: entry.typeHref,
                default: defaultTag?.text,
                description: entry.description || undefined,
                required: entry.required,
                deprecated: entry.deprecated
              };
            })
          );

          const propTable: MdxJsxFlowElement = {
            type: 'mdxJsxFlowElement',
            name: 'PropTable',
            attributes: [
              {
                type: 'mdxJsxAttribute',
                name: 'entries',
                value: toEstreeAttrValue(entries)
              },
              {
                type: 'mdxJsxAttribute',
                name: 'categories',
                value: toEstreeAttrValue(categories)
              }
            ],
            children: []
          };

          const idx = parent.children.indexOf(placeholder);
          parent.children.splice(idx, 1, propTable);
        })
      );

      return [SKIP, index];
    });

    return Promise.all(promises).then(() => undefined);
  };
};

/**
 * Builds an `<auto-type-table>` element for the fallback (no-generator) path.
 *
 * @param typeName - The TypeScript type name to display
 * @returns An MDX JSX flow element for the auto-type-table
 */
function buildAutoTypeTable(typeName: string): MdxJsxFlowElement {
  return {
    type: 'mdxJsxFlowElement',
    name: 'auto-type-table',
    attributes: [
      { type: 'mdxJsxAttribute', name: 'path', value: './src/index.tsx' },
      { type: 'mdxJsxAttribute', name: 'name', value: typeName }
    ],
    children: []
  };
}
