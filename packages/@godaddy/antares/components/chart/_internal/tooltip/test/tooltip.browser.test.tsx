import type { TooltipData } from '@visx/xychart';
import assume from 'assume';
import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import type { DataPoint } from '../../../types.ts';
import { ArrowExample } from '../examples/arrow.tsx';
import { MultipleSeriesExample } from '../examples/multiple-series.tsx';
import { SingleSeriesExample } from '../examples/single-series.tsx';

describe('@godaddy/antares', function antares() {
  describe('#single-series', function singleSeriesTests() {
    it('renders single-series tooltip', async function singleSeries() {
      const { locator } = await render(<SingleSeriesExample />);
      assume(locator.getByText('Sales')).exists();
      assume(locator.getByText('100')).exists();
    });
  });

  describe('#multiple-series', function multipleSeriesTests() {
    it('renders multiple-series tooltip', async function multipleSeries() {
      const { locator } = await render(<MultipleSeriesExample />);
      assume(locator.getByText('Product A')).exists();
      assume(locator.getByText('Product B')).exists();
      assume(locator.getByText('Product C')).exists();
      assume(locator.getByText('100')).exists();
      assume(locator.getByText('150')).exists();
      assume(locator.getByText('200')).exists();
    });

    it('filters out series with no matching datum', async function filtersNonMatching() {
      const tooltipData: TooltipData<DataPoint> = {
        datumByKey: {
          'series-1': { key: 'series-1', datum: { x: 'Jan', y: 100 }, index: 0 },
          'series-3': { key: 'series-3', datum: { x: 'Jan', y: 200 }, index: 0 }
        }
      };
      const { container, locator } = await render(<MultipleSeriesExample tooltipData={tooltipData} />);
      assume(locator.getByText('Product A')).exists();
      assume(locator.getByText('Product C')).exists();
      assume(locator.getByText('100')).exists();
      assume(locator.getByText('200')).exists();
      assume(container.textContent?.includes('Product B')).equals(false);
      assume(container.textContent?.includes('150')).equals(false);
    });
  });

  describe('#formatValue', function formatValueTests() {
    it('uses custom formatValue function', async function customFormatter() {
      const formatValue = function formatCurrency(d: DataPoint) {
        return typeof d.y === 'number' ? `$${d.y.toFixed(2)}` : '';
      };
      const { locator } = await render(<SingleSeriesExample formatValue={formatValue} />);
      assume(locator.getByText('$100.00')).exists();
    });

    it('uses default formatter when formatValue is not provided', async function defaultFormatter() {
      const { locator } = await render(<SingleSeriesExample />);
      assume(locator.getByText('100')).exists();
    });

    it('formats null Y value as empty string', async function nullYValue() {
      const tooltipData: TooltipData<DataPoint> = {
        datumByKey: {
          'series-1': { key: 'series-1', datum: { x: 'Jan', y: null }, index: 0 }
        }
      };
      const { container, locator } = await render(<SingleSeriesExample tooltipData={tooltipData} />);
      assume(locator.getByText('Sales')).exists();
      assume(container.firstElementChild).exists();
    });
  });

  describe('#className', function classNameTests() {
    it('applies custom className for styling', async function customClass() {
      const { container } = await render(<SingleSeriesExample className="custom-tooltip" />);
      const root = container.firstElementChild;
      assume(root).exists();
      assume(root?.className).includes('custom-tooltip');
    });

    it('handles multiple class names', async function multipleClasses() {
      const { container } = await render(<SingleSeriesExample className="class1 class2 class3" />);
      const root = container.firstElementChild;
      assume(root?.className).includes('class1');
      assume(root?.className).includes('class2');
      assume(root?.className).includes('class3');
    });
  });

  describe('#showArrow', function showArrowTests() {
    it('renders tooltip with arrow', async function tooltipWithArrow() {
      const { container, locator } = await render(<ArrowExample />);
      assume(locator.getByText('Sales')).exists();
      assume(locator.getByText('100')).exists();
      const arrow = Array.from(container.querySelectorAll('[class]')).find(
        (el) => el.className && el.className.toString().includes('tooltipArrow')
      );
      assume(arrow).exists();
    });

    it('does not render arrow when showArrow is false', async function noArrow() {
      const { container } = await render(<SingleSeriesExample showArrow={false} />);
      const arrow = Array.from(container.querySelectorAll('[class]')).find(
        (el) => el.className && el.className.toString().includes('tooltipArrow')
      );
      assume(arrow).equals(undefined);
    });
  });
});
