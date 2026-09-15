import { resolve } from 'node:path';
import { loadBlockManifest } from '@bento/block-explorer/node';
import { blocksSource } from '@/lib/source';

/** Converts block documentation metadata into the Site catalog shape. */
export async function getSiteBlockCatalog() {
  const blocksDirectory = resolve(process.cwd(), '../../packages/@godaddy/antares/blocks');

  return Promise.all(
    blocksSource
      .getPages()
      .sort(function comparePages(a, b) {
        return a.url.localeCompare(b.url);
      })
      .map(async function loadBlockPage(page) {
        const id = page.slugs.at(-1) ?? '';

        return {
          id,
          manifest: await loadBlockManifest(resolve(blocksDirectory, id))
        };
      })
  );
}
