import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DefaultExample } from '../examples/default.tsx';
import { OutsideChartExample } from '../examples/outside-chart.tsx';

describe('@godaddy/antares', function antares() {
  describe('#ChartLegend', function chartLegendTests() {
    it('renders the default example', function ssrSnapshot() {
      expect(renderToString(<DefaultExample />)).toMatchSnapshot();
    });

    it('renders nothing outside a chart', function outsideChart() {
      expect(renderToString(<OutsideChartExample />)).toMatchSnapshot();
    });
  });
});
