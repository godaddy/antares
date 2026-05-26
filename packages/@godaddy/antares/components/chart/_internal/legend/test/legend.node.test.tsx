import { SingleSeriesLegendExample } from '../examples/single-series.tsx';
import { MultiSeriesLegendExample } from '../examples/multi-series.tsx';
import { LegendWithLabelExample } from '../examples/with-label.tsx';
import { LegendVerticalExample } from '../examples/vertical.tsx';
import { LegendSizeChartExample } from '../examples/legend-size-chart-example.tsx';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

describe('@godaddy/antares', function antares() {
  describe('#Legend', function legendTests() {
    describe('#single-series', function singleSeriesTests() {
      it('renders single-series example', function singleSeriesSnapshot() {
        const result = renderToString(<SingleSeriesLegendExample />);
        expect(result).toMatchSnapshot();
      });
    });

    describe('#multi-series', function multiSeriesTests() {
      it('renders multi-series example', function multiSeriesSnapshot() {
        const result = renderToString(<MultiSeriesLegendExample />);
        expect(result).toMatchSnapshot();
      });
    });

    describe('#with-label', function withLabelTests() {
      it('renders labelled legend example', function withLabelSnapshot() {
        const result = renderToString(<LegendWithLabelExample />);
        expect(result).toMatchSnapshot();
      });
    });

    describe('#vertical', function verticalTests() {
      it('renders vertical legend example', function verticalSnapshot() {
        const result = renderToString(<LegendVerticalExample />);
        expect(result).toMatchSnapshot();
      });
    });

    describe('#size', function sizeTests() {
      it('renders size chart legend example', function sizeChartSnapshot() {
        const result = renderToString(<LegendSizeChartExample />);
        expect(result).toMatchSnapshot();
      });
    });
  });
});
