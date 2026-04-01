/**
 * BarChart node (SSR) tests. Chart dimensions come from the parent via visx useParentSize
 * (ResizeObserver). On SSR there is no DOM, so width/height stay 0 and the SVG is not rendered —
 * no SVG in the output. The chart renders SVG only after mount when the parent has size.
 */
import type React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { BarChartCustomDomainExample } from '../examples/custom-domain';
import { BarChartFormattedTickMarksExample } from '../examples/formatted-tick-marks';
import { BarChartHorizontalMultiSeriesExample } from '../examples/horizontal-multi-series';
import { BarChartHorizontalSingleSeriesExample } from '../examples/horizontal-single-series';
import { BarChartMultiSeriesExample } from '../examples/multi-series';
import { BarChartRTLHorizontalMultiSeriesExample } from '../examples/rtl-horizontal-multi-series';
import { BarChartRTLMultiSeriesExample } from '../examples/rtl-multi-series';
import { BarChartExample } from '../examples/single-series';

const SSR_EXAMPLES: Array<[string, React.ComponentType]> = [
  ['custom-domain', BarChartCustomDomainExample],
  ['formatted-tick-marks', BarChartFormattedTickMarksExample],
  ['horizontal-multi-series', BarChartHorizontalMultiSeriesExample],
  ['horizontal-single-series', BarChartHorizontalSingleSeriesExample],
  ['multi-series', BarChartMultiSeriesExample],
  ['rtl-horizontal-multi-series', BarChartRTLHorizontalMultiSeriesExample],
  ['rtl-multi-series', BarChartRTLMultiSeriesExample],
  ['single-series', BarChartExample]
];

describe('@godaddy/uxcore', function uxcore() {
  describe('#BarChart', function barChartTests() {
    it('does not render SVG on SSR (dimensions from parent ResizeObserver)', function noSvgOnSsr() {
      const result = renderToString(<BarChartExample />);
      expect(result).not.toContain('<svg');
    });

    it.each(SSR_EXAMPLES)('renders %s example', function ssrSnapshot(_name, Example) {
      const result = renderToString(<Example />);
      expect(result).toMatchSnapshot();
    });
  });
});
