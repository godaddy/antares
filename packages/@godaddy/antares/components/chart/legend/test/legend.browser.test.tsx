import { SingleSeriesLegendExample } from '../examples/single-series.tsx';
import { MultiSeriesLegendExample } from '../examples/multi-series.tsx';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';

describe('@godaddy/antares', function antares() {
  describe('#Legend', function legendTests() {
    describe('#single-series', function singleSeriesTests() {
      it('renders single-series legend', async function singleSeries() {
        const { locator } = await render(<SingleSeriesLegendExample />);
        const element = locator.getByText('Sales');

        assume(element).exists();
      });
    });

    describe('#multi-series', function multiSeriesTests() {
      it('renders multi-series legend', async function multiSeries() {
        const { locator } = await render(<MultiSeriesLegendExample />);
        assume(locator.getByText('Product A')).exists();
        assume(locator.getByText('Product B')).exists();
        assume(locator.getByText('Product C')).exists();
      });
    });

    describe('#className', function classNameTests() {
      it('applies custom className for styling', async function customClass() {
        const { container } = await render(<SingleSeriesLegendExample className="custom-legend" />);
        const root = container.firstElementChild;

        assume(root).exists();
        assume(root?.className).includes('custom-legend');
      });
    });
  });
});
