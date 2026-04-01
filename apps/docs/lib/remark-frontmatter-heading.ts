import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import { parse } from 'yaml';

/**
 * Remark plugin that injects an h1 heading and description paragraph from
 * MDX frontmatter into the Storybook docs page AST.
 *
 * Intended for Storybook only — fumadocs renders title and description via
 * `<DocsTitle>` / `<DocsDescription>`, so this must not be added there.
 */
export const remarkFrontmatterHeading: Plugin<[], Root> = function remarkFrontmatterHeading() {
  return function transform(tree) {
    const yamlNode = tree.children.find((n) => n.type === 'yaml');
    if (!yamlNode || !('value' in yamlNode)) return;

    const data = parse(yamlNode.value as string) ?? {};
    const { title, description } = data;
    if (!title) return;

    const nodes = [
      { type: 'heading' as const, depth: 1 as const, children: [{ type: 'text' as const, value: String(title) }] },
      ...(description
        ? [{ type: 'paragraph' as const, children: [{ type: 'text' as const, value: String(description) }] }]
        : [])
    ];

    const metaIdx = tree.children.findIndex((n) => n.type === 'mdxJsxFlowElement' && 'name' in n && n.name === 'Meta');
    const insertAt = metaIdx !== -1 ? metaIdx + 1 : tree.children.indexOf(yamlNode) + 1;

    tree.children.splice(insertAt, 0, ...nodes);
  };
};
