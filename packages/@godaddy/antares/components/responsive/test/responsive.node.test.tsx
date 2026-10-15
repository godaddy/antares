import { describe, expect, it } from 'vitest';
import { globSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { ContainerLayoutExample } from '../examples/container-layout.tsx';
import { ViewportLayoutExample } from '../examples/viewport-layout.tsx';
import { FormExample } from '../examples/form.tsx';
import { ResponsiveSizeExample } from '../examples/responsive-size.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Responsive', function responsiveTests() {
    it('renders the intrinsic layout example', function intrinsicLayout() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders the container query example', function containerLayout() {
      expect(renderToString(<ContainerLayoutExample />)).toMatchSnapshot();
    });

    it('renders the viewport media query example', function viewportLayout() {
      expect(renderToString(<ViewportLayoutExample />)).toMatchSnapshot();
    });

    it('renders the form without choosing a viewport on the server', function form() {
      expect(renderToString(<FormExample />)).toMatchSnapshot();
    });

    it('renders the responsive size example', function responsiveSize() {
      expect(renderToString(<ResponsiveSizeExample />)).toMatchSnapshot();
    });

    it.each([
      { query: '(min-width: 64rem) and (min-resolution: 2dppx)', features: ['min-width: 64rem'] },
      { query: '(min-width: 64rem) and (min-height: 50rem)', features: ['min-width: 64rem'] },
      { query: '((min-width: 64rem) and (min-resolution: 2dppx))', features: ['min-width: 64rem'] },
      { query: '(min-width: calc(max(63rem, 48rem)))', features: ['min-width: calc(max(63rem, 48rem))'] },
      { query: '(40rem <= width < 64rem)', features: ['40rem <= width < 64rem'] },
      { query: '(width > 0)', features: ['width > 0'] },
      { query: '(max-width: 40rem), (min-width: 64rem)', features: ['max-width: 40rem', 'min-width: 64rem'] },
      { query: '(min-device-width: 40rem)', features: ['min-device-width: 40rem'] },
      { query: '(MIN-WIDTH: 63REM) AND (MIN-RESOLUTION: 2DPPX)', features: ['MIN-WIDTH: 63REM'] },
      { query: '(min-resolution: 2dppx) and (min-height: 50rem)', features: [] },
      { query: '(prefers-reduced-motion: reduce)', features: [] }
    ])('extracts only viewport width features from $query', function widthFeatures({ query, features }) {
      expect(viewportWidthFeatures(`@media ${query} { .example { display: grid; } }`)).toEqual(features);
    });

    it('matches the at-rule name case-insensitively', function atRuleCase() {
      expect(viewportWidthFeatures('@MEDIA (min-width: 63rem) { .example { display: grid; } }')).toEqual([
        'min-width: 63rem'
      ]);
    });

    it('ignores media queries in comments', function comments() {
      expect(viewportWidthFeatures('/* @media (min-width: 63rem) */ .example { display: grid; }')).toEqual([]);
    });

    it('keeps viewport widths out of component CSS', function componentStyles() {
      const components = new URL('../../', import.meta.url);
      const files = globSync('**/*.module.css', { cwd: fileURLToPath(components) });
      const features = files.flatMap(function read(file) {
        return viewportWidthFeatures(readFileSync(new URL(file, components), 'utf8')).map(function entry(feature) {
          return { file, feature };
        });
      });

      expect(files).not.toHaveLength(0);
      expect(features).toEqual([]);
    });
  });
});

/**
 * Collects the width features of `@media` preludes, such as `min-width: 64rem` or `width < 40rem`.
 * @param source - CSS.
 * @returns The features as written.
 */
function viewportWidthFeatures(source: string) {
  const preludes = source.replace(/\/\*[\s\S]*?\*\//g, '').match(/@media[^{]*/gi) ?? [];
  return preludes.flatMap(function widths(prelude) {
    const features: { start: number; value: string }[] = [];
    const widthFeatures: string[] = [];

    for (let index = 0; index < prelude.length; index++) {
      const character = prelude[index];
      if (character === '(') {
        features.push({ start: index + 1, value: '' });
      } else if (character === ')') {
        const feature = features.pop();
        if (feature && /(?:^|[\s<>=])(?:min-|max-)?(?:device-)?width(?=$|[\s:<>=])/i.test(feature.value)) {
          widthFeatures.push(prelude.slice(feature.start, index).trim());
        }
      } else {
        const feature = features.at(-1);
        if (feature) feature.value += character;
      }
    }

    return widthFeatures;
  });
}
