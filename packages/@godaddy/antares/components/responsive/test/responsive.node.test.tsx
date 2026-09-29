import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { BreakpointsExample } from '../examples/breakpoints.tsx';
import { ViewportLayoutExample } from '../examples/viewport-layout.tsx';
import { ContainerLayoutExample } from '../examples/container-layout.tsx';
import { FormExample } from '../examples/form.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Responsive', function responsiveTests() {
    it('renders the non-matching server fallback without a browser', function serverFalse() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders the matching server fallback without a browser', function serverTrue() {
      expect(renderToString(<DefaultExample ssrMatch />)).toMatchSnapshot();
    });

    it('publishes the agreed breakpoint widths and matching queries', function breakpoints() {
      expect(renderToString(<BreakpointsExample />)).toMatchSnapshot();
    });

    it('renders the CSS viewport example', function viewportLayout() {
      expect(renderToString(<ViewportLayoutExample />)).toMatchSnapshot();
    });

    it('renders the CSS container example', function containerLayout() {
      expect(renderToString(<ContainerLayoutExample />)).toMatchSnapshot();
    });

    it('renders the form without choosing a viewport on the server', function form() {
      expect(renderToString(<FormExample />)).toMatchSnapshot();
    });
  });
});
