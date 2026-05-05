/**
 * LineChart node (SSR) tests. Chart dimensions come from the parent via visx useParentSize
 * (ResizeObserver). On SSR there is no DOM, so width/height stay 0 and XYChart is not rendered —
 * no SVG in the output. The chart renders SVG only after mount when the parent has size.
 */
import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CustomTooltipFormattingExample } from '../examples/custom-tooltip-formatting';
import { CityTemperatureExample } from '../examples/city-temperature';
import { TooltipDisabledExample } from '../examples/tooltip-disabled';
import { MissingValuesExample } from '../examples/missing-values';
import { MultipleSeriesExample } from '../examples/multiple-series';
import { CustomAccessorsExample } from '../examples/custom-accessors';
import { CrosshairOnlyExample } from '../examples/crosshair-only';
import { RTLExample } from '../examples/rtl';
import { SingleSeriesExample } from '../examples/single-series';
import { ZeroIncludedExample } from '../examples/zero-included';
import { BitcoinPriceExample } from '../examples/bitcoin-price';
import { BrowserUsageExample } from '../examples/browser-usage';
import { FixedDomainExample } from '../examples/fixed-domain';
import { BandPaddingExample } from '../examples/band-padding';
import { FixedSizeExample } from '../examples/fixed-size';
import { FormattingExample } from '../examples/formatting';
import { GridlinesExample } from '../examples/gridlines';
import { NiceValuesExample } from '../examples/nice-values';
import { CustomTicksExample } from '../examples/custom-ticks';
import { BaselinesExample } from '../examples/baselines';
import { LabelsExample } from '../examples/labels';
import { LegendExample } from '../examples/legend';
import { TitlesExample } from '../examples/titles';
import { TicksExample } from '../examples/ticks';

const SSR_EXAMPLES: Array<[string, React.ComponentType]> = [
  ['band-padding', BandPaddingExample],
  ['baselines', BaselinesExample],
  ['bitcoin-price', BitcoinPriceExample],
  ['browser-usage', BrowserUsageExample],
  ['city-temperature', CityTemperatureExample],
  ['crosshair-only', CrosshairOnlyExample],
  ['custom-accessors', CustomAccessorsExample],
  ['custom-ticks', CustomTicksExample],
  ['custom-tooltip-formatting', CustomTooltipFormattingExample],
  ['fixed-domain', FixedDomainExample],
  ['fixed-size', FixedSizeExample],
  ['formatting', FormattingExample],
  ['gridlines', GridlinesExample],
  ['labels', LabelsExample],
  ['legend', LegendExample],
  ['missing-values', MissingValuesExample],
  ['multiple-series', MultipleSeriesExample],
  ['nice-values', NiceValuesExample],
  ['rtl', RTLExample],
  ['single-series', SingleSeriesExample],
  ['ticks', TicksExample],
  ['titles', TitlesExample],
  ['tooltip-disabled', TooltipDisabledExample],
  ['zero-included', ZeroIncludedExample]
];

describe('@godaddy/antares', function antares() {
  describe('#LineChart', function lineChartTests() {
    it('does not render SVG on SSR (dimensions from parent ResizeObserver)', function noSvgOnSsr() {
      const result = renderToString(<SingleSeriesExample />);
      expect(result).not.toContain('<svg');
    });

    it.each(SSR_EXAMPLES)('renders %s example', function ssrSnapshot(name, Example) {
      const result = renderToString(<Example />);
      expect(result).toMatchSnapshot();
    });
  });
});
