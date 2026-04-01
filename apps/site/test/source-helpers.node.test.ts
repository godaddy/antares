import { describe, it, vi } from 'vitest';
import assume from 'assume';

vi.mock('fumadocs-mdx:collections/server', () => ({
  docs: { toFumadocsSource: () => ({ files: [] }) },
  components: {
    toFumadocsSource: () => ({
      files: [{ path: 'radio/README.mdx', data: {}, type: 'page' }]
    })
  }
}));

vi.mock('fumadocs-core/source', () => ({
  loader: () => ({}),
  multiple: () => ({})
}));

vi.mock('fumadocs-core/source/lucide-icons', () => ({
  lucideIconsPlugin: () => ({})
}));

import { getPageImage, getLLMText } from '../lib/source';

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
});
