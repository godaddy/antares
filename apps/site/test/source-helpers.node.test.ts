import { describe, it, vi } from 'vitest';
import assume from 'assume';

const { getPageTree } = vi.hoisted(() => ({
  getPageTree: vi.fn()
}));

vi.mock('fumadocs-mdx:collections/server', () => ({
  docs: { toFumadocsSource: () => ({ files: [] }) },
  components: {
    toFumadocsSource: () => ({
      files: [{ path: 'radio/README.mdx', data: {}, type: 'page' }]
    })
  },
  blocks: {
    toFumadocsSource: () => ({
      files: [
        { path: 'README.mdx', data: {}, type: 'page' },
        { path: 'sign-in-form/README.mdx', data: {}, type: 'page' }
      ]
    })
  }
}));

vi.mock('fumadocs-core/source', () => ({
  loader: () => ({ getPageTree }),
  multiple: () => ({})
}));

vi.mock('fumadocs-core/source/lucide-icons', () => ({
  lucideIconsPlugin: () => ({})
}));

import { getDocsPageTree, getLLMText, getPageImage } from '../lib/source';

describe('site', function siteTests() {
  describe('#getPageImage', function getPageImageTests() {
    it('returns correct segments and URL for nested slugs', function nestedSlugs() {
      const result = getPageImage({ slugs: ['components', 'button'] } as never);
      assume(result.segments).deep.equals(['components', 'button', 'image.png']);
      assume(result.url).equals('/og/docs/components/button/image.png');
    });

    it('returns correct segments and URL for a root-level slug', function rootSlug() {
      const result = getPageImage({ slugs: ['index'] } as never);
      assume(result.segments).deep.equals(['index', 'image.png']);
      assume(result.url).equals('/og/docs/index/image.png');
    });
  });

  describe('#getLLMText', function getLLMTextTests() {
    it('formats page title and processed content as markdown', async function formatsMarkdown() {
      const getText = vi.fn().mockResolvedValue('some content');
      const page = { data: { title: 'Button', getText }, slugs: [] } as never;
      const result = await getLLMText(page);
      assume(getText.mock.calls[0][0]).equals('processed');
      assume(result).equals('# Button\n\nsome content');
    });
  });

  describe('#getDocsPageTree', function getDocsPageTreeTests() {
    it('inserts Blocks immediately after the Components root page', function insertsBlocksAfterComponents() {
      getPageTree.mockReturnValue({
        children: [
          { type: 'page', name: 'Welcome', url: '/docs' },
          { type: 'page', name: 'Components', url: '/docs/components' }
        ]
      });

      const tree = getDocsPageTree();

      assume(tree.children.map((node) => ('url' in node ? node.url : undefined))).deep.equals([
        '/docs',
        '/docs/components',
        '/docs/blocks'
      ]);
    });

    it('places Blocks after Components when the docs home page is absent', function placesBlocksWithoutHome() {
      getPageTree.mockReturnValue({ children: [{ type: 'page', name: 'Components', url: '/docs/components' }] });

      const tree = getDocsPageTree();

      assume(tree.children.map((node) => ('url' in node ? node.url : undefined))).deep.equals([
        '/docs/components',
        '/docs/blocks'
      ]);
      assume(tree.children[1]).deep.equals({
        $id: 'antares-blocks-index',
        type: 'page',
        name: 'Blocks',
        url: '/docs/blocks'
      });
    });

    it('recognizes a Components-named page root', function recognizesNamedPageRoot() {
      getPageTree.mockReturnValue({ children: [{ type: 'page', name: 'Components', url: '/docs/other' }] });

      const tree = getDocsPageTree();

      assume(tree.children.map((node) => ('url' in node ? node.url : undefined))).deep.equals([
        '/docs/other',
        '/docs/blocks'
      ]);
    });

    it('recognizes generated Components folder roots', function recognizesFolderRoots() {
      getPageTree.mockReturnValue({
        children: [
          { type: 'separator', name: 'Other' },
          { type: 'folder', name: 'Other', root: false, children: [] },
          { type: 'folder', name: null, root: true, children: [] },
          { type: 'folder', name: 'Components', root: true, children: [] }
        ]
      });

      const tree = getDocsPageTree();

      assume(tree.children[4]).deep.equals({
        $id: 'antares-blocks-index',
        type: 'page',
        name: 'Blocks',
        url: '/docs/blocks'
      });
    });

    it('recognizes a Components folder by its index URL', function recognizesFolderIndex() {
      getPageTree.mockReturnValue({
        children: [
          {
            type: 'folder',
            name: 'Component library',
            root: false,
            index: { type: 'page', name: 'Components', url: '/docs/components' },
            children: []
          }
        ]
      });

      const tree = getDocsPageTree();

      assume(tree.children[1]).deep.equals({
        $id: 'antares-blocks-index',
        type: 'page',
        name: 'Blocks',
        url: '/docs/blocks'
      });
    });

    it('falls back after Welcome when Components is unavailable', function fallsBackAfterWelcome() {
      getPageTree.mockReturnValue({ children: [{ type: 'page', name: 'Welcome', url: '/docs' }] });

      const tree = getDocsPageTree();

      assume(tree.children.map((node) => ('url' in node ? node.url : undefined))).deep.equals([
        '/docs',
        '/docs/blocks'
      ]);
    });

    it('falls back to the beginning when Welcome and Components are unavailable', function fallsBackToBeginning() {
      getPageTree.mockReturnValue({ children: [] });

      const tree = getDocsPageTree();

      assume(tree.children[0]).deep.equals({
        $id: 'antares-blocks-index',
        type: 'page',
        name: 'Blocks',
        url: '/docs/blocks'
      });
    });
  });
});
