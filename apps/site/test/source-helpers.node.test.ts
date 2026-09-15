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
      files: [{ path: 'sign-in-form/README.mdx', data: {}, type: 'page' }]
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
    it('inserts Blocks immediately after the docs home page', function insertsBlocksAfterHome() {
      getPageTree.mockReturnValue({
        children: [
          { type: 'page', name: 'Welcome', url: '/docs' },
          { type: 'page', name: 'Components', url: '/docs/components' }
        ]
      });

      const tree = getDocsPageTree();

      assume(tree.children.map((node) => ('url' in node ? node.url : undefined))).deep.equals([
        '/docs',
        '/docs/blocks',
        '/docs/components'
      ]);
    });

    it('places Blocks first when the docs home page is absent', function placesBlocksWithoutHome() {
      getPageTree.mockReturnValue({ children: [{ type: 'page', name: 'Components', url: '/docs/components' }] });

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
