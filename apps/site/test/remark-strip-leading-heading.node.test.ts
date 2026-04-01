import { remarkStripLeadingHeading } from '../lib/remark-strip-leading-heading';
import remarkParse from 'remark-parse';
import { describe, it } from 'vitest';
import { unified } from 'unified';
import assume from 'assume';

function run(md: string) {
  const processor = unified().use(remarkParse).use(remarkStripLeadingHeading);
  const tree = processor.parse(md);
  return processor.runSync(tree);
}

function headings(tree: any): string[] {
  return tree.children.filter((n: any) => n.type === 'heading').map((n: any) => n.children[0]?.value);
}

describe('site', function siteTests() {
  describe('#remarkStripLeadingHeading', function remarkStripLeadingHeadingTests() {
    it('strips leading h1 and following paragraph', function stripsH1AndParagraph() {
      const tree = run('# Title\n\nDescription paragraph\n\n## Quick Start\n\nContent');
      assume(headings(tree)).deep.equals(['Quick Start']);
      assume(tree.children[0].type).equals('heading');
      assume((tree.children[0] as any).depth).equals(2);
    });

    it('strips only the h1 when no paragraph follows', function stripsH1Only() {
      const tree = run('# Title\n\n## Quick Start\n\nContent');
      assume(headings(tree)).deep.equals(['Quick Start']);
    });

    it('strips h1 nested inside a root child', function nestedH1() {
      const tree: any = {
        type: 'root',
        children: [
          {
            type: 'root',
            children: [
              { type: 'heading', depth: 1, children: [{ type: 'text', value: 'Title' }] },
              { type: 'paragraph', children: [{ type: 'text', value: 'Description' }] },
              { type: 'heading', depth: 2, children: [{ type: 'text', value: 'Quick Start' }] }
            ]
          }
        ]
      };
      unified().use(remarkStripLeadingHeading).runSync(tree);
      const nested = tree.children[0].children;
      assume(nested.length).equals(1);
      assume(nested[0].type).equals('heading');
      assume(nested[0].depth).equals(2);
    });

    it('leaves content without h1 untouched', function noH1() {
      const tree = run('## Section\n\nContent');
      assume(headings(tree)).deep.equals(['Section']);
      assume(tree.children.length).equals(2);
    });

    it('handles empty document', function emptyDoc() {
      const tree = run('');
      assume(tree.children.length).equals(0);
    });
  });
});
