/**
 * HeatmapChart node (SSR) tests. Chart dimensions come from the parent via ResizeObserver.
 * On SSR there is no DOM, so width/height stay 0 and the SVG is not rendered —
 * no SVG in the output. The chart renders SVG only after mount when the parent has size.
 */
import type React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { CustomTooltipPeriodComparisonExample } from '../examples/custom-tooltip-period-comparison.tsx';
import { CustomBucketsExample } from '../examples/custom-buckets.tsx';
import { FixedHeightExample } from '../examples/fixed-height.tsx';
import { MaxCellHeightExample } from '../examples/max-cell-height.tsx';
import { ScrollingExample } from '../examples/scrolling.tsx';
import { SingleRowExample } from '../examples/single-row.tsx';
import { WrapContentExample } from '../examples/wrap-content.tsx';

const SSR_EXAMPLES: Array<[string, React.ComponentType]> = [
  ['default', DefaultExample],
  ['custom-tooltip-period-comparison', CustomTooltipPeriodComparisonExample],
  ['custom-buckets', CustomBucketsExample],
  ['wrap-content', WrapContentExample],
  ['fixed-height', FixedHeightExample],
  ['scrolling', ScrollingExample],
  ['max-cell-height', MaxCellHeightExample],
  ['single-row', SingleRowExample]
];

describe('@godaddy/antares', function antares() {
  describe('#HeatmapChart', function heatmapTests() {
    it('does not render SVG on SSR (dimensions from parent ResizeObserver)', function noSvgOnSsr() {
      const result = renderToString(<DefaultExample />);
      expect(result).not.toContain('<svg');
    });

    it.each(SSR_EXAMPLES)('renders %s example without error', function ssrSnapshot(_name, Example) {
      const result = renderToString(<Example />);
      expect(result).toMatchSnapshot();
    });
  });
});
