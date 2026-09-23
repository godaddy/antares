import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { FormExample } from '../examples/form.tsx';
import { NestedScopesExample } from '../examples/nested-scopes.tsx';
import { ExplicitSizeExample } from '../examples/explicit-size.tsx';
import { OverlaysExample } from '../examples/overlays.tsx';
import { PlainHtmlExample } from '../examples/plain-html.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#SizeProvider', function sizeProviderTests() {
    it('renders DefaultExample', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders SizesExample', function sizesExample() {
      expect(renderToString(<SizesExample />)).toMatchSnapshot();
    });

    it('renders FormExample', function formExample() {
      expect(renderToString(<FormExample />)).toMatchSnapshot();
    });

    it('renders NestedScopesExample', function nestedScopesExample() {
      expect(renderToString(<NestedScopesExample />)).toMatchSnapshot();
    });

    it('renders ExplicitSizeExample', function explicitSizeExample() {
      expect(renderToString(<ExplicitSizeExample />)).toMatchSnapshot();
    });

    it('renders OverlaysExample', function overlaysExample() {
      expect(renderToString(<OverlaysExample />)).toMatchSnapshot();
    });

    it('renders no element of its own', function plainHtmlExample() {
      expect(renderToString(<PlainHtmlExample />)).toMatchSnapshot();
    });
  });
});
