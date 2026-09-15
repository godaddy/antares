import type { ComponentType } from 'react';
import { BlockCatalogEntry, BlocksCatalog } from '../../../../../packages/@godaddy/antares/blocks/blocks-catalog.tsx';
import { SignInForm } from '../../../../../packages/@godaddy/antares/blocks/sign-in-form/index.tsx';
import { SiteBlockExplorer } from '@/lib/antares-blocks/block-explorer';
import { getSiteBlockCatalog } from '@/lib/antares-blocks/catalog';

const BLOCK_PREVIEWS: Record<string, ComponentType> = {
  'sign-in-form': SignInForm
};

export const metadata = {
  title: 'Blocks',
  description: 'Production-ready compositions built from accessible Antares components.'
};

/** Renders the Antares blocks catalog for the Site documentation. */
export default async function DocsBlocksPage() {
  const blocks = await getSiteBlockCatalog();

  return (
    <BlocksCatalog>
      {blocks.map(function renderBlock(block) {
        const Preview = BLOCK_PREVIEWS[block.id];
        if (!Preview) {
          throw new Error(`No preview is registered for block "${block.id}".`);
        }

        return (
          <BlockCatalogEntry key={block.id}>
            <SiteBlockExplorer block={block.manifest}>
              <Preview />
            </SiteBlockExplorer>
          </BlockCatalogEntry>
        );
      })}
    </BlocksCatalog>
  );
}
