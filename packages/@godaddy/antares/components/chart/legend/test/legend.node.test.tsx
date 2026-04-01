import { SingleSeriesLegendExample } from '../examples/single-series.tsx';
import { MultiSeriesLegendExample } from '../examples/multi-series.tsx';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

describe('@godaddy/uxcore', function uxcore() {
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
  });
});
