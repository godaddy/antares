import { describe, it, vi } from 'vitest';
import assume from 'assume';

const { getPages, loadBlockManifest } = vi.hoisted(() => ({
  getPages: vi.fn(),
  loadBlockManifest: vi.fn()
}));

vi.mock('../lib/source', () => ({
  blocksSource: { getPages }
}));

vi.mock('@bento/block-explorer/node', () => ({ loadBlockManifest }));

import { getSiteBlockCatalog } from '../lib/antares-blocks/catalog';

describe('site', function siteTests() {
  describe('#getSiteBlockCatalog', function blockCatalogTests() {
    it('sorts block pages by URL and loads each matching manifest', async function sortsAndLoadsManifests() {
      getPages.mockReturnValue([
        { url: '/docs/blocks/zeta', slugs: ['zeta'], data: { title: 'Zeta', description: 'Zeta block' } },
        { url: '/docs/blocks/alpha', slugs: ['alpha'], data: { title: 'Alpha', description: 'Alpha block' } }
      ]);
      loadBlockManifest.mockImplementation(async function loadManifest(directory: string) {
        return { id: directory.split('/').at(-1), files: [] };
      });

      const catalog = await getSiteBlockCatalog();

      assume(catalog.map((block) => block.id)).deep.equals(['alpha', 'zeta']);
      assume(catalog.map((block) => block.manifest.id)).deep.equals(['alpha', 'zeta']);
      assume(loadBlockManifest.mock.calls.length).equals(2);
      assume(loadBlockManifest.mock.calls[0][0]).includes('/packages/@godaddy/antares/blocks/alpha');
    });
  });
});
