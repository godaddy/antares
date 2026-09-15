import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { BlockCatalogEntry, BlocksCatalog } from '../blocks/blocks-catalog.tsx';
import { SignInForm } from '../blocks/sign-in-form/index.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#BlocksCatalog', function blocksCatalogTests() {
    it('renders the populated catalog structure', function rendersPopulatedCatalog() {
      const html = renderToString(
        <BlocksCatalog>
          <BlockCatalogEntry>Explorer content</BlockCatalogEntry>
        </BlocksCatalog>
      );

      expect(html).toMatchSnapshot();
    });

    it('renders the empty catalog state', function rendersEmptyCatalog() {
      expect(renderToString(<BlocksCatalog />)).toMatchSnapshot();
    });
  });

  describe('#SignInForm', function signInFormTests() {
    it('renders the accessible sign-in composition', function rendersSignInForm() {
      expect(renderToString(<SignInForm />)).toMatchSnapshot();
    });
  });
});
