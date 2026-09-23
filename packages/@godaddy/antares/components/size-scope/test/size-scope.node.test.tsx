import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { OverlaysExample } from '../examples/overlays.tsx';
import { PlainHtmlExample } from '../examples/plain-html.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#SizeScope', function sizeScopeTests() {
    it('renders DefaultExample', function defaultExample() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders SizesExample', function sizesExample() {
      expect(renderToString(<SizesExample />)).toMatchSnapshot();
    });

    it('renders OverlaysExample', function overlaysExample() {
      expect(renderToString(<OverlaysExample />)).toMatchSnapshot();
    });

    it('renders no element of its own', function plainHtmlExample() {
      const html = renderToString(<PlainHtmlExample />);

      expect(html).toMatch(/^<p>/);
      expect(html).toMatchSnapshot();
    });
  });
});
