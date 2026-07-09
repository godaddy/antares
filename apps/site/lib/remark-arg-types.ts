import { basename, dirname, join } from 'node:path';
import type { MdxJsxFlowElement, MdxJsxAttribute } from 'mdast-util-mdx-jsx';
import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import { valueToEstree } from 'estree-util-value-to-estree';
import { visit, SKIP } from 'unist-util-visit';
import { resolvePropsDoc, toFumadocsPropTable } from '@bento/storybook-addon-helpers/docs';
import { addMdxDependency } from './remark-mdx-utils';

/**
 * Extracts the Stories export name from an `<ArgTypes of={Stories.X}>` node.
 *
 * @param node - The MDX JSX flow element to inspect
 * @returns The export name (e.g. `"Props"`, `"LinkButtonProps"`), or undefined
 */
function getArgTypesExportName(node: MdxJsxFlowElement): string | undefined {
  if (node.name !== 'ArgTypes') return;
  const ofAttr = node.attributes.find(
    (attr): attr is MdxJsxAttribute => attr.type === 'mdxJsxAttribute' && attr.name === 'of'
  );
  if (!ofAttr || typeof ofAttr.value !== 'object' || ofAttr.value?.type !== 'mdxJsxAttributeValueExpression') return;
  return ofAttr.value.value.split('.').at(-1);
}

/** Wraps a plain JS value as an MDX JSX attribute value (embedded estree). */
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

/** Builds a `<PropTable entries={...} categories={...} />` node. */
function buildPropTable(entries: unknown, categories: unknown): MdxJsxFlowElement {
  return {
    type: 'mdxJsxFlowElement',
    name: 'PropTable',
    attributes: [
      { type: 'mdxJsxAttribute', name: 'entries', value: toEstreeAttrValue(entries) },
      { type: 'mdxJsxAttribute', name: 'categories', value: toEstreeAttrValue(categories) }
    ],
    children: []
  };
}

/**
 * Replaces `<ArgTypes of={Stories.X}>` with a `<PropTable>` generated from the
 * component's `*.stories.tsx` docs getter, via the shared type engine
 * (`@bento/storybook-addon-helpers/docs`). The stories file is resolved by
 * convention as `<dir>/<dir>.stories.tsx` relative to the README, and both it
 * and the component source are registered as MDX dependencies so edits trigger
 * a rebuild.
 *
 * The transform is invisible to Storybook, which sees the real `ArgTypes` block.
 */
export const remarkArgTypes: Plugin<[], Root> = function remarkArgTypes() {
  return function transform(tree, file) {
    const promises: Promise<void>[] = [];

    visit(tree, 'mdxJsxFlowElement', function visitArgTypes(node, index, parent) {
      if (typeof index !== 'number' || !parent) return;
      const exportName = getArgTypesExportName(node);
      if (!exportName) return;

      const componentDir = dirname(file.path);
      const storiesPath = join(componentDir, `${basename(componentDir)}.stories.tsx`);
      addMdxDependency(file, storiesPath);
      addMdxDependency(file, join(componentDir, 'src/index.tsx'));

      const placeholder: MdxJsxFlowElement = {
        type: 'mdxJsxFlowElement',
        name: 'span',
        attributes: [],
        children: []
      };
      parent.children.splice(index, 1, placeholder);

      promises.push(
        resolvePropsDoc({ filePath: storiesPath, exportName }).then(function applyResult(doc) {
          const table = doc ? toFumadocsPropTable(doc) : { entries: [], categories: {} };
          const idx = parent.children.indexOf(placeholder);
          parent.children.splice(idx, 1, buildPropTable(table.entries, table.categories));
        })
      );

      return [SKIP, index];
    });

    return Promise.all(promises).then(() => undefined);
  };
};
