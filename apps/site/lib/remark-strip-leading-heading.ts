import { visit, EXIT } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root } from 'mdast';

/**
 * Strips the first h1 and its immediately following paragraph from the AST.
 *
 * Fumadocs renders the page title from frontmatter, so an h1 pulled in via
 * `<include>` (e.g. from a README) would duplicate it. The paragraph right
 * after the h1 is typically the repo description, which also duplicates the
 * frontmatter `description`.
 *
 * Uses `visit` instead of a flat `children` scan because `remarkInclude`
 * may nest the inlined content inside a replaced node rather than flattening
 * it into the top-level tree.
 */
export const remarkStripLeadingHeading: Plugin<[], Root> = function remarkStripLeadingHeading() {
  return function transform(tree) {
    visit(tree, 'heading', function findH1(node, index, parent) {
      if (node.depth !== 1 || index === undefined || !parent) return;

      const next = parent.children[index + 1];
      const count = next?.type === 'paragraph' ? 2 : 1;
      parent.children.splice(index, count);

      return EXIT;
    });
  };
};
