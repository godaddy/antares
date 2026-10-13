import { describe, it, vi, expect } from 'vitest';
import assume from 'assume';

vi.mock('fumadocs-mdx:collections/server', async function mockCollections() {
  const { readFileSync } = await import('node:fs');
  const metadata = (path: string) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
  return {
    docs: {
      toFumadocsSource: () => ({
        files: [
          { path: 'index.mdx', type: 'page', data: { title: 'Welcome' } },
          { path: 'meta.json', type: 'meta', data: metadata('../content/docs/meta.json') }
        ]
      })
    },
    components: {
      toFumadocsSource: () => ({
        files: [
          { path: 'text-field/README.mdx', type: 'page', data: { title: 'TextField' } },
          { path: 'meta.json', type: 'meta', data: metadata('../../../packages/@godaddy/antares/components/meta.json') }
        ]
      })
    },
    blocks: {
      toFumadocsSource: () => ({
        files: [
          { path: 'README.mdx', type: 'page', data: { title: 'Build product experiences with Antares.' } },
          { path: 'sign-in-form/README.mdx', type: 'page', data: { title: 'Sign-in form' } },
          { path: 'meta.json', type: 'meta', data: metadata('../../../packages/@godaddy/antares/blocks/meta.json') }
        ]
      })
    }
  };
});

import { source, getLLMText, getPageImage } from '../lib/source';

describe('site', function siteTests() {
  describe('#source', function sourceTests() {
    it('preserves catalog, block and component URLs in the shared source', function preservesRoutes() {
      expect(source.getPage(['blocks'])?.url).toBe('/docs/blocks');
      expect(source.getPage(['blocks', 'sign-in-form'])?.url).toBe('/docs/blocks/sign-in-form');
      expect(source.getPage(['components', 'text-field'])?.url).toBe('/docs/components/text-field');
      expect(source.getPage(['blocks', 'missing'])).toBeUndefined();
    });

    it('includes blocks in the page and route listings used by search, LLM and OG endpoints', function listsBlocks() {
      expect(source.getPages().map((page) => page.url)).toEqual(
        expect.arrayContaining(['/docs', '/docs/components/text-field', '/docs/blocks', '/docs/blocks/sign-in-form'])
      );
      expect(source.generateParams()).toEqual(
        expect.arrayContaining([{ slug: ['blocks'] }, { slug: ['blocks', 'sign-in-form'] }])
      );
    });

    it('places the Blocks folder after Components, with a catalog index and discovered children', function buildsNavigation() {
      const tree = source.getPageTree();
      expect(tree.children.map((node) => node.name)).toEqual(['Welcome', 'Components', 'Blocks']);
      expect(tree.children[2]).toMatchObject({
        type: 'folder',
        name: 'Blocks',
        defaultOpen: true,
        index: { type: 'page', url: '/docs/blocks' },
        children: [{ type: 'page', name: 'Sign-in form', url: '/docs/blocks/sign-in-form' }]
      });
    });
  });

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
});
