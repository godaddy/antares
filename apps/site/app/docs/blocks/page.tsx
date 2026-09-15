import { BlockCatalogEntry, BlocksCatalog } from '../../../../../packages/@godaddy/antares/blocks/blocks-catalog.tsx';
import { SignInForm } from '../../../../../packages/@godaddy/antares/blocks/sign-in-form/index.tsx';
import { SiteBlockExplorer } from '@/lib/antares-blocks/block-explorer';
import { getSiteBlockCatalog } from '@/lib/antares-blocks/catalog';

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
        return (
          <BlockCatalogEntry key={block.id}>
            <SiteBlockExplorer block={block.manifest}>
              <SignInForm />
            </SiteBlockExplorer>
          </BlockCatalogEntry>
        );
      })}
    </BlocksCatalog>
  );
}
