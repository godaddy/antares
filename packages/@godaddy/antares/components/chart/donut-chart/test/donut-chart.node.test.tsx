/**
 * DonutChart node (SSR) tests. Chart diameter comes from the parent via `useLayoutEffect` +
 * ResizeObserver. On SSR there is no DOM, so measured `chartSizePx` stays 0 and the SVG is not
 * rendered — no SVG in the output. The ring renders only after mount when the wrapper has size.
 */
import type React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { BasicExample } from '../examples/basic';
import { FormatValueExample } from '../examples/format-value';
import { LegendLayoutExample } from '../examples/legend-layout';
import { SingleSliceExample } from '../examples/single-slice';
import { SmallSlicesExample } from '../examples/small-slices';

const SSR_EXAMPLES: Array<[string, React.ComponentType]> = [
  ['basic', BasicExample],
  ['format-value', FormatValueExample],
  ['legend-layout', LegendLayoutExample],
  ['single-slice', SingleSliceExample],
  ['small-slices', SmallSlicesExample]
];

describe('@godaddy/antares', function antares() {
  describe('#DonutChart', function donutChartTests() {
    it('does not render SVG on SSR (dimensions from parent ResizeObserver)', function noSvgOnSsr() {
      const result = renderToString(<SingleSliceExample />);
      expect(result).not.toContain('<svg');
    });

    it.each(SSR_EXAMPLES)('renders %s example', function ssrSnapshot(_name, Example) {
      const result = renderToString(<Example />);
      expect(result).toMatchSnapshot();
    });
  });
});
