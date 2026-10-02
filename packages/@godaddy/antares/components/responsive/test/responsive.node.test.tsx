import { describe, expect, it } from 'vitest';
import { globSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { renderToString } from 'react-dom/server';
import { viewportBreakpoints } from '@godaddy/antares';
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

    it('uses published widths in every viewport media query', function publishedWidths() {
      const components = new URL('../../', import.meta.url);
      const files = globSync('**/{*.module.css,examples/*.tsx}', { cwd: fileURLToPath(components) });
      const widths = files.flatMap(function read(file) {
        return mediaQueryWidths(readFileSync(new URL(file, components), 'utf8')).map(function entry(width) {
          return { file, width };
        });
      });
      const published = new Set<string>(Object.values(viewportBreakpoints));

      expect(widths).not.toHaveLength(0);
      expect(
        widths.filter(function unpublished({ width }) {
          return !published.has(width);
        })
      ).toEqual([]);
    });
  });
});

/**
 * Collects every length in the `@media` preludes of a source file that test width.
 * @param source - CSS, or a module with inline CSS.
 * @returns The lengths, such as `64rem`.
 */
function mediaQueryWidths(source: string) {
  const preludes = source.match(/@media[^{]*/g) ?? [];
  return preludes.flatMap(function lengths(prelude) {
    return prelude.includes('width') ? (prelude.match(/[\d.]+[a-z]+/g) ?? []) : [];
  });
}
