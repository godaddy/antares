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

    it.each([
      { query: '(min-width: 64rem) and (min-resolution: 2dppx)', widths: ['64rem'] },
      { query: '(min-width: 64rem) and (min-height: 50rem)', widths: ['64rem'] },
      { query: '((min-width: 64rem) and (min-resolution: 2dppx))', widths: ['64rem'] },
      { query: '(min-width: calc(max(63rem, 48rem))) and (min-resolution: 2dppx)', widths: ['63rem', '48rem'] },
      { query: '(40rem <= width < 64rem)', widths: ['40rem', '64rem'] },
      { query: '(calc(40rem) <= width)', widths: ['40rem'] },
      { query: '(max-width: 40rem), (min-width: 64rem)', widths: ['40rem', '64rem'] },
      { query: '(min-resolution: 2dppx) and (min-height: 50rem)', widths: [] },
      { query: '(MIN-WIDTH: 63REM) AND (MIN-RESOLUTION: 2DPPX)', widths: ['63rem'] }
    ])('extracts only viewport widths from $query', function featureWidths({ query, widths }) {
      expect(mediaQueryWidths(`@media ${query} { .example { display: grid; } }`)).toEqual(widths);
    });

    it('matches the at-rule name case-insensitively', function atRuleCase() {
      expect(mediaQueryWidths('@MEDIA (min-width: 63rem) { .example { display: grid; } }')).toEqual(['63rem']);
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
 * Collects lengths only from width features in `@media` preludes. CSS at-rules, feature names, and units are
 * case-insensitive, so lengths are returned lowercased.
 * @param source - CSS, or a module with inline CSS.
 * @returns The lengths, such as `64rem`.
 */
function mediaQueryWidths(source: string) {
  const preludes = source.match(/@media[^{]*/gi) ?? [];
  return preludes.flatMap(function lengths(prelude) {
    const features: { start: number; value: string }[] = [];
    const widths: string[] = [];

    for (let index = 0; index < prelude.length; index++) {
      const character = prelude[index];
      if (character === '(') {
        features.push({ start: index + 1, value: '' });
      } else if (character === ')') {
        const feature = features.pop();
        if (feature && /(?:^|[\s<>=])(?:min-|max-)?width(?=$|[\s:<>=])/i.test(feature.value)) {
          const lengths = prelude.slice(feature.start, index).match(/[\d.]+[a-z]+/gi) ?? [];
          widths.push(
            ...lengths.map(function lowercase(length) {
              return length.toLowerCase();
            })
          );
        }
      } else {
        const feature = features.at(-1);
        if (feature) feature.value += character;
      }
    }

    return widths;
  });
}
