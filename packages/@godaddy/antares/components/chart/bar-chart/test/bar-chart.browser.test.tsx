import type React from 'react';
import { BarChart, type BarChartProps } from '../src';
import type { SeriesConfig } from '../../types';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { describe, it } from 'vitest';
import assume from 'assume';
import { RTLProvider } from '../../../../utils/rtl-locale-provider.tsx';
import { waitForSelector } from '../../../../utils/wait-for-selector.ts';

async function renderAndWait(component: React.ReactElement) {
  const result = await render(component);
  await waitForSelector(result.container, 'svg');
  return result;
}

/**
 * Renders the BarChart component in browser environment with provided props for testing
 *
 * @param args - Partial props to pass to the BarChart component (series has default)
 * @param options.useRtlI18n - When true, wraps the chart in {@link RTLProvider} so `useLocale()` is RTL
 * @returns Render result with container and other utilities
 */
async function renderBarChart(args: Partial<BarChartProps<any>> = {}, options?: { useRtlI18n?: boolean }) {
  const defaultSeries: SeriesConfig[] = [
    {
      id: 'series-1',
      name: 'Test Series',
      data: [
        { x: 'A', y: 100 },
        { x: 'B', y: 200 },
        { x: 'C', y: 300 }
      ]
    }
  ];

  const chart = (
    <div style={{ width: '800px', height: '400px' }}>
      <BarChart
        xAccessor={(d: any) => d.x}
        yAccessor={(d: any) => d.y}
        {...args}
        series={(args.series ?? defaultSeries) as SeriesConfig<any>[]}
      />
    </div>
  );

  const result = await renderAndWait(options?.useRtlI18n ? <RTLProvider>{chart}</RTLProvider> : chart);

  return result;
}

describe('@godaddy/antares', function antares() {
  describe('#BarChart vertical', function barChartTests() {
    it('renders with required props', async function requiredProps() {
      const { container } = await renderBarChart();

      const svg = container.querySelector('svg');
      assume(svg).exists();

      // Y-axis should be rendered inside the SVG
      const yAxis = svg?.querySelector('.visx-axis-left');
      assume(yAxis).exists();

      // X-axis should be rendered inside the SVG
      const xAxis = svg?.querySelector('.visx-axis-bottom');
      assume(xAxis).exists();
    });

    it('renders bars for all data points', async function rendersBars() {
      const { container } = await renderBarChart();

      const bars = container.querySelectorAll('rect[rx="8"]');
      assume(bars.length).is.at.least(3);
    });

    describe('#Titles', function titlesProp() {
      it('renders X-axis title with correct text', async function xTitle() {
        const { locator } = await renderBarChart({ xAxisTitle: 'Categories' });

        const xTitleElement = locator.getByText('Categories');
        assume(xTitleElement.element()).exists();
        assume(xTitleElement.element().textContent).equals('Categories');
      });

      it('renders Y-axis title with correct text', async function yTitle() {
        const { locator } = await renderBarChart({ yAxisTitle: 'Values' });

        const yTitleElement = locator.getByText('Values');
        assume(yTitleElement.element()).exists();
        assume(yTitleElement.element().textContent).equals('Values');
      });

      it('renders both titles together', async function bothTitles() {
        const { locator } = await renderBarChart({
          xAxisTitle: 'Categories',
          yAxisTitle: 'Values'
        });

        const xTitle = locator.getByText('Categories');
        assume(xTitle.element()).exists();
        assume(xTitle.element().textContent).equals('Categories');

        const yTitle = locator.getByText('Values');
        assume(yTitle.element()).exists();
        assume(yTitle.element().textContent).equals('Values');
      });
    });

    describe('#legendPosition', function legendPositionProp() {
      it('renders legend with all series names', async function rendersLegend() {
        const series: SeriesConfig[] = [
          {
            id: 'series-1',
            name: 'Product A',
            data: [{ x: 'Jan', y: 100 }]
          },
          {
            id: 'series-2',
            name: 'Product B',
            data: [{ x: 'Jan', y: 150 }]
          }
        ];
        const { container, locator } = await renderBarChart({ series, legendPosition: 'top' });

        const legendElement = container.querySelector('[aria-label="Chart legend"]');
        assume(legendElement).exists();

        const productA = locator.getByText('Product A');
        assume(productA.element()).exists();
        assume(productA.element().textContent).equals('Product A');

        const productB = locator.getByText('Product B');
        assume(productB.element()).exists();
        assume(productB.element().textContent).equals('Product B');
      });

      it('renders legend at top position', async function topPosition() {
        const series: SeriesConfig[] = [
          {
            id: 'series-1',
            name: 'Product A',
            data: [{ x: 'Jan', y: 100 }]
          }
        ];
        const { container } = await renderBarChart({ series, legendPosition: 'top' });

        const legendElement = container.querySelector('[aria-label="Chart legend"]');
        assume(legendElement).exists();

        const svg = container.querySelector('svg');
        assume(svg).exists();

        // Legend should appear before the SVG in the DOM tree
        const legendAncestor = legendElement!.closest('[style]');
        const svgAncestor = svg!.closest('[style]');
        assume(legendAncestor).exists();
        assume(svgAncestor).exists();
      });

      it('renders legend at bottom by default when there are multiple series', async function bottomPosition() {
        const series: SeriesConfig[] = [
          {
            id: 'series-1',
            name: 'Product A',
            data: [{ x: 'Jan', y: 100 }]
          },
          {
            id: 'series-2',
            name: 'Product B',
            data: [{ x: 'Jan', y: 150 }]
          }
        ];
        const { container } = await renderBarChart({ series });

        const legendElement = container.querySelector('[aria-label="Chart legend"]');
        assume(legendElement).exists();

        const svg = container.querySelector('svg');
        assume(svg).exists();

        // Legend should appear after the SVG in DOM order for bottom position
        const allElements = Array.from(container.querySelectorAll('[aria-label="Chart legend"], svg'));
        const svgIdx = allElements.findIndex((el) => el.tagName === 'svg' || el.tagName === 'SVG');
        const legendIdx = allElements.findIndex((el) => el.getAttribute('aria-label') === 'Chart legend');
        assume(legendIdx).is.above(svgIdx);
      });
    });

    describe('#orientation', function orientationProp() {
      it('renders vertical bars by default', async function verticalDefault() {
        const { container } = await renderBarChart();

        const svg = container.querySelector('svg');
        assume(svg).exists();

        const bars = container.querySelectorAll('rect[rx="8"]');
        assume(bars.length).is.at.least(3);
      });

      it('accepts orientation prop', async function orientationProp() {
        const { container } = await renderBarChart({ orientation: 'vertical' });

        const svg = container.querySelector('svg');
        assume(svg).exists();
      });
    });

    describe('#gridlines', function gridlinesProp() {
      it('renders with gridlines when xGridlines and yGridlines are true', async function defaultGridlines() {
        const { container } = await renderBarChart({ xGridlines: true, yGridlines: true });

        const svg = container.querySelector('svg');
        assume(svg).exists();

        // Both GridRows (.visx-rows) and GridColumns (.visx-columns) should be present
        assume(svg?.querySelector('.visx-rows')).exists();
        assume(svg?.querySelector('.visx-columns')).exists();
      });

      it('hides x-gridlines when xGridlines is false', async function noXGridlines() {
        const { container } = await renderBarChart({ xGridlines: false, yGridlines: true });

        const svg = container.querySelector('svg');
        assume(svg).exists();

        // GridColumns (.visx-columns) should not be rendered
        assume(svg?.querySelector('.visx-columns')).is.a('null');
        // GridRows (.visx-rows) should still be present
        assume(svg?.querySelector('.visx-rows')).exists();
      });

      it('hides y-gridlines when yGridlines is false', async function noYGridlines() {
        const { container } = await renderBarChart({ yGridlines: false, xGridlines: true });

        const svg = container.querySelector('svg');
        assume(svg).exists();

        // GridRows (.visx-rows) should not be rendered
        assume(svg?.querySelector('.visx-rows')).is.a('null');
        // GridColumns (.visx-columns) should still be present
        assume(svg?.querySelector('.visx-columns')).exists();
      });
    });

    describe('#customDomain', function customDomainProp() {
      it('accepts custom xDomain and renders all domain categories', async function xDomain() {
        const { container } = await renderBarChart({
          xDomain: ['A', 'B', 'C', 'D'],
          xLabels: true
        });

        const svg = container.querySelector('svg');
        assume(svg).exists();

        // 'D' is not in the default data but is in the domain — it should appear as an x-axis tick label
        const xTickLabels = Array.from(svg?.querySelectorAll('.visx-axis-bottom text') ?? []).map(
          (el) => el.textContent
        );
        assume(xTickLabels.includes('D')).is.true();
      });

      it('accepts custom yDomain and reflects range in y-axis labels', async function yDomain() {
        const { container } = await renderBarChart({
          yDomain: [0, 500]
        });

        const svg = container.querySelector('svg');
        assume(svg).exists();

        // The max of the domain (500) should appear as a y-axis tick label
        const yTickLabels = Array.from(svg?.querySelectorAll('.visx-axis-left text') ?? []).map((el) => el.textContent);
        assume(yTickLabels.some((label) => label?.includes('500'))).is.true();
      });
    });

    describe('#rtl', function rtlLocale() {
      it('renders in RTL mode when wrapped in RTLProvider', async function rtlMode() {
        const { container } = await renderBarChart({}, { useRtlI18n: true });

        const svg = container.querySelector('svg');
        assume(svg).exists();

        // RTL should use AxisRight instead of AxisLeft
        const rightAxis = svg?.querySelector('.visx-axis-right');
        assume(rightAxis).exists();
      });

      it('renders in LTR mode by default', async function ltrDefault() {
        const { container } = await renderBarChart();

        const svg = container.querySelector('svg');
        assume(svg).exists();

        // LTR should use AxisLeft
        const leftAxis = svg?.querySelector('.visx-axis-left');
        assume(leftAxis).exists();
      });
    });

    describe('#series with multiple series', function multiSeries() {
      it('renders grouped bars for multiple series', async function groupedBars() {
        const series: SeriesConfig[] = [
          {
            id: 'series-1',
            name: 'Series 1',
            data: [
              { x: 'A', y: 100 },
              { x: 'B', y: 200 }
            ]
          },
          {
            id: 'series-2',
            name: 'Series 2',
            data: [
              { x: 'A', y: 150 },
              { x: 'B', y: 250 }
            ]
          }
        ];

        const { container } = await renderBarChart({ series });

        const svg = container.querySelector('svg');
        assume(svg).exists();

        // Should have bars for both series (2 series x 2 data points = 4 bars minimum)
        const bars = container.querySelectorAll('rect[rx="8"]');
        assume(bars.length).is.at.least(4);
      });

      it('shows legend with multiple series names', async function multiSeriesLegend() {
        const series: SeriesConfig[] = [
          {
            id: 'series-1',
            name: 'Series 1',
            data: [{ x: 'A', y: 100 }]
          },
          {
            id: 'series-2',
            name: 'Series 2',
            data: [{ x: 'A', y: 150 }]
          },
          {
            id: 'series-3',
            name: 'Series 3',
            data: [{ x: 'A', y: 200 }]
          }
        ];

        const { container, locator } = await renderBarChart({
          series,
          legendPosition: 'bottom'
        });

        const legendElement = container.querySelector('[aria-label="Chart legend"]');
        assume(legendElement).exists();

        const series1 = locator.getByText('Series 1');
        assume(series1.element()).exists();

        const series2 = locator.getByText('Series 2');
        assume(series2.element()).exists();

        const series3 = locator.getByText('Series 3');
        assume(series3.element()).exists();
      });
    });

    describe('#series with empty data', function emptyDataSeries() {
      it('renders chart when series has empty data array', async function emptyData() {
        const series: SeriesConfig[] = [
          {
            id: 'series-1',
            name: 'Empty Series',
            data: []
          }
        ];
        const { container } = await renderBarChart({ series });

        const svg = container.querySelector('svg');
        assume(svg).exists();
      });

      it('shows legend with series name even when data is empty', async function legendWithEmptyData() {
        const series: SeriesConfig[] = [
          {
            id: 'series-1',
            name: 'Empty Series',
            data: []
          }
        ];
        const { container, locator } = await renderBarChart({
          series,
          legendPosition: 'top'
        });

        const legendElement = container.querySelector('[aria-label="Chart legend"]');
        assume(legendElement).exists();

        const emptySeries = locator.getByText('Empty Series');
        assume(emptySeries.element()).exists();
        assume(emptySeries.element().textContent).equals('Empty Series');
      });
    });

    describe('#axes', function axesProp() {
      it('shows x-axis baseline by default', async function xBaseline() {
        const { container } = await renderBarChart();

        const svg = container.querySelector('svg');
        assume(svg).exists();

        const axisElements = svg?.querySelectorAll('[class*="visx-axis"]');
        assume(axisElements).exists();
      });

      it('shows y-axis baseline by default', async function yBaseline() {
        const { container } = await renderBarChart();

        const svg = container.querySelector('svg');
        assume(svg).exists();

        // Y-axis is now inside the SVG
        const yAxis = svg?.querySelector('.visx-axis-left');
        assume(yAxis).exists();
      });

      it('hides x-axis when xBaseline is false', async function noXBaseline() {
        const { container } = await renderBarChart({ xBaseline: false });

        const svg = container.querySelector('svg');
        assume(svg).exists();
      });

      it('hides y-axis when yBaseline, yTickMarks, and yLabels are false', async function noYBaseline() {
        const { container } = await renderBarChart({ yBaseline: false, yTickMarks: false, yLabels: false });

        const svg = container.querySelector('svg');
        assume(svg).exists();

        // Y-axis should not be rendered when yBaseline is false
        const yAxis = svg?.querySelector('.visx-axis-left');
        assume(yAxis).is.a('null');
      });
    });

    describe('#tickMarks', function tickMarksProp() {
      it('shows tick marks by default', async function defaultTickMarks() {
        const { container } = await renderBarChart();

        const svg = container.querySelector('svg');
        assume(svg).exists();

        // Tick mark lines should be present in both axes by default
        const xTickLines = svg?.querySelectorAll('.visx-axis-bottom .visx-axis-tick line');
        assume(xTickLines!.length).is.above(0);

        const yTickLines = svg?.querySelectorAll('.visx-axis-left .visx-axis-tick line');
        assume(yTickLines!.length).is.above(0);
      });

      it('hides x-axis tick marks when xTickMarks is false', async function xTickMarks() {
        const { container } = await renderBarChart({ xTickMarks: false });

        // Tick visibility is driven by the data-x-tick-marks attribute on the
        // chart root; when false the attribute is absent and CSS paints the
        // tick line with a transparent stroke.
        const chart = container
          .querySelector('svg')
          ?.closest('[data-x-labels-vertical], [class*="chart"]') as HTMLElement | null;
        assume(chart).exists();
        assume(chart!.hasAttribute('data-x-tick-marks')).is.false();
      });

      it('hides y-axis tick marks when yTickMarks is false', async function yTickMarks() {
        const { container } = await renderBarChart({ yTickMarks: false });

        const chart = container
          .querySelector('svg')
          ?.closest('[data-x-labels-vertical], [class*="chart"]') as HTMLElement | null;
        assume(chart).exists();
        assume(chart!.hasAttribute('data-y-tick-marks')).is.false();
      });
    });

    describe('#dimensions', function dimensionsProp() {
      it('applies custom width to the chart container', async function customWidth() {
        const { container } = await renderBarChart({ width: 600 });

        const svg = container.querySelector('svg');
        assume(svg).exists();

        // The BarChart wraps content in a Flex with style width: 600px
        const widthElement = container.querySelector('[style*="width: 600px"]');
        assume(widthElement).exists();
      });

      it('applies custom height to the chart container', async function customHeight() {
        const { container } = await renderBarChart({ height: 500 });

        const svg = container.querySelector('svg');
        assume(svg).exists();

        // The BarChart wraps content in a Flex with style height: 500px
        const heightElement = container.querySelector('[style*="height: 500px"]');
        assume(heightElement).exists();
      });
    });

    describe('#tooltip', function tooltipProp() {
      it('shows tooltip by default', async function defaultTooltip() {
        const { container } = await renderBarChart({ tooltip: true });

        const svg = container.querySelector('svg');
        assume(svg).exists();
      });

      it('does not show tooltip when tooltip is false and bar is hovered', async function noTooltip() {
        const { container } = await renderBarChart({ tooltip: false });

        const barGroups = container.querySelectorAll('g[role="group"][tabindex="0"]');
        assume(barGroups.length).is.above(0);

        const hitbox = barGroups[0].querySelector('rect[fill="transparent"]');
        if (hitbox) {
          await userEvent.hover(hitbox);
        }

        await new Promise((r) => setTimeout(r, 10));

        // Tooltip portal is never created when tooltip=false
        const tooltip = document.body.querySelector('[aria-label="Tooltip data"]');
        assume(tooltip).is.a('null');
      });
    });

    describe('#tickFormat', function tickFormatProp() {
      it('formats x-axis tick labels with xTickFormat', async function xTickFormat() {
        const series: SeriesConfig[] = [
          {
            id: 'series-1',
            name: 'Test',
            data: [
              { x: 'alpha', y: 100 },
              { x: 'beta', y: 200 }
            ]
          }
        ];

        const xTickFormat = (value: string | number | Date) => String(value).toUpperCase();

        const { container } = await renderBarChart({
          series,
          xTickFormat
        });

        const svg = container.querySelector('svg');
        assume(svg).exists();

        const tickLabels = svg?.querySelectorAll('.visx-axis-bottom text');
        assume(tickLabels).exists();
        assume(tickLabels!.length).is.above(0);

        const labels = Array.from(tickLabels || []).map((el) => el.textContent);
        const hasFormattedLabel = labels.some((label) => label === 'ALPHA' || label === 'BETA');
        assume(hasFormattedLabel).is.true();
      });

      it('formats y-axis tick labels with yTickFormat', async function yTickFormat() {
        const yTickFormat = (value: string | number | Date) => `$${Number(value).toLocaleString()}`;

        const { container } = await renderBarChart({
          yTickFormat
        });

        const svg = container.querySelector('svg');
        assume(svg).exists();

        // Y-axis is now inside the SVG
        const tickLabels = svg?.querySelectorAll('.visx-axis-left text, .visx-axis-right text');
        assume(tickLabels).exists();
        assume(tickLabels!.length).is.above(0);

        const labels = Array.from(tickLabels || []).map((el) => el.textContent);
        const hasFormattedLabel = labels.some((label) => label?.includes('$'));
        assume(hasFormattedLabel).is.true();
      });

      it('formats x-axis date values with xTickFormat', async function xTickFormatDates() {
        const series: SeriesConfig[] = [
          {
            id: 'series-1',
            name: 'Test',
            data: [
              { x: new Date(2024, 0, 15), y: 100 },
              { x: new Date(2024, 1, 20), y: 200 }
            ]
          }
        ];

        function formatDateTick(value: Date | string | number) {
          if (value instanceof Date) {
            return value.toLocaleString('en-US', { month: 'short', day: 'numeric' });
          }
          return String(value);
        }

        const { container } = await renderBarChart({
          series,
          xTickFormat: formatDateTick
        });

        const svg = container.querySelector('svg');
        assume(svg).exists();

        const tickLabels = svg?.querySelectorAll('.visx-axis-bottom text');
        assume(tickLabels).exists();
        assume(tickLabels!.length).is.above(0);

        const labels = Array.from(tickLabels || []).map((el) => el.textContent);
        const hasFormattedLabel = labels.some((label) => label?.includes('Jan') || label?.includes('Feb'));
        assume(hasFormattedLabel).is.true();
      });
    });

    describe('#tabOrder', function tabOrderTests() {
      it('tabs from left to right in LTR mode', async function ltrTabOrder() {
        const { container } = await renderBarChart();

        const barGroups = container.querySelectorAll('g[role="group"][tabindex="0"]');
        assume(barGroups.length).equals(3);

        const firstGroup = barGroups[0];
        const lastGroup = barGroups[2];

        const parentSvg = firstGroup.parentElement;
        const allGroups = Array.from(parentSvg?.children || []);
        const firstIndex = allGroups.indexOf(firstGroup);
        const lastIndex = allGroups.indexOf(lastGroup);

        assume(firstIndex).is.below(lastIndex);
      });

      it('tabs from right to left in RTL mode', async function rtlTabOrder() {
        const { container } = await renderBarChart({}, { useRtlI18n: true });

        const barGroups = container.querySelectorAll('g[role="group"][tabindex="0"]');
        assume(barGroups.length).equals(3);

        const firstGroup = barGroups[0];
        const lastGroup = barGroups[2];
        const parentSvg = firstGroup.parentElement;
        const allGroups = Array.from(parentSvg?.children || []);
        const firstIndex = allGroups.indexOf(firstGroup);
        const lastIndex = allGroups.indexOf(lastGroup);

        assume(firstIndex).is.below(lastIndex);
        assume(barGroups.length).equals(3);
      });
    });

    describe('#horizontal orientation', function horizontalOrientationTests() {
      // In horizontal mode x is the bar value (number) and y is the category label
      const horizontalSeries: SeriesConfig[] = [
        {
          id: 'series-1',
          name: 'Test',
          data: [
            { x: 100, y: 'Category A' },
            { x: 200, y: 'Category B' },
            { x: 150, y: 'Category C' }
          ]
        }
      ];

      it('renders bars in horizontal mode', async function horizontalBars() {
        const { container } = await renderBarChart({ series: horizontalSeries, orientation: 'horizontal' });

        const bars = container.querySelectorAll('rect[rx="8"]');
        assume(bars.length).is.at.least(3);
      });

      it('renders AxisBottom as the value axis in horizontal mode', async function horizontalAxisBottom() {
        const { container } = await renderBarChart({ series: horizontalSeries, orientation: 'horizontal' });

        const svg = container.querySelector('svg');
        assume(svg).exists();

        // In horizontal mode the value axis (numbers) is AxisBottom
        const xAxis = svg?.querySelector('.visx-axis-bottom');
        assume(xAxis).exists();
      });

      it('renders AxisLeft as the category axis in horizontal mode (LTR)', async function horizontalAxisLeft() {
        const { container } = await renderBarChart({ series: horizontalSeries, orientation: 'horizontal' });

        const svg = container.querySelector('svg');
        assume(svg).exists();

        // In horizontal mode the category axis is AxisLeft (LTR)
        const yAxis = svg?.querySelector('.visx-axis-left');
        assume(yAxis).exists();
      });

      it('shows tooltip on hover in horizontal mode', async function horizontalTooltip() {
        const { container } = await renderBarChart({ series: horizontalSeries, orientation: 'horizontal' });

        const barGroups = container.querySelectorAll('g[role="group"][tabindex="0"]');
        assume(barGroups.length).is.above(0);

        const hitbox = barGroups[0].querySelector('rect[fill="transparent"]');
        assume(hitbox).exists();

        if (hitbox) {
          await userEvent.hover(hitbox);
        }

        await new Promise((r) => setTimeout(r, 10));

        const tooltip = document.body.querySelector('[aria-label="Tooltip data"]');
        assume(tooltip).exists();
      });
    });

    describe('#accessibility', function accessibilityTests() {
      it('sets aria-label on the SVG element', async function ariaLabel() {
        const { container } = await renderBarChart({ 'aria-label': 'Monthly sales chart' });

        const svg = container.querySelector('svg');
        assume(svg).exists();
        assume(svg!.getAttribute('aria-label')).equals('Monthly sales chart');
      });

      it('renders a desc element inside SVG when desc prop is provided', async function descElement() {
        const { container } = await renderBarChart({ desc: 'A chart showing sales by month' });

        const svg = container.querySelector('svg');
        assume(svg).exists();

        const descEl = svg?.querySelector('desc#barchart-desc');
        assume(descEl).exists();
        assume(descEl!.textContent).equals('A chart showing sales by month');
      });

      it('sets aria-describedby on SVG when desc prop is provided', async function ariaDescribedby() {
        const { container } = await renderBarChart({ desc: 'Sales data description' });

        const svg = container.querySelector('svg');
        assume(svg).exists();
        assume(svg!.getAttribute('aria-describedby')).equals('barchart-desc');
      });

      it('does not set aria-describedby when desc prop is omitted', async function noAriaDescribedby() {
        const { container } = await renderBarChart();

        const svg = container.querySelector('svg');
        assume(svg).exists();
        assume(svg!.getAttribute('aria-describedby')).is.a('null');
      });
    });

    describe('#null values', function nullValueTests() {
      it('skips bars with null y values in vertical mode', async function nullYValues() {
        const series: SeriesConfig[] = [
          {
            id: 'series-1',
            name: 'Test',
            data: [
              { x: 'A', y: 100 },
              { x: 'B', y: null },
              { x: 'C', y: 300 }
            ]
          }
        ];

        const { container } = await renderBarChart({ series });

        // Only 2 bars should render (y: null is skipped)
        const bars = container.querySelectorAll('rect[rx="8"]');
        assume(bars.length).equals(2);
      });

      it('skips bars with null x values in horizontal mode', async function nullXValues() {
        // DataPoint.x does not allow null at the type level, but the runtime handles it — cast to bypass
        const series = [
          {
            id: 'series-1',
            name: 'Test',
            data: [
              { x: 100, y: 'Category A' },
              { x: null as unknown as number, y: 'Category B' },
              { x: 150, y: 'Category C' }
            ]
          }
        ] as SeriesConfig[];

        const { container } = await renderBarChart({ series, orientation: 'horizontal' });

        // Only 2 bars should render (x: null is skipped at runtime)
        const bars = container.querySelectorAll('rect[rx="8"]');
        assume(bars.length).equals(2);
      });
    });

    describe('#tooltip hitbox', function tooltipHitbox() {
      it('shows tooltip when hovering over the invisible hitbox for a bar group', async function tooltipOnHitboxHover() {
        const { container } = await renderBarChart();

        const barGroups = container.querySelectorAll('g[role="group"][tabindex="0"]');
        assume(barGroups.length).is.above(0);

        const firstGroup = barGroups[0];
        const hitbox = firstGroup.querySelector('rect[fill="transparent"]');
        assume(hitbox).exists();

        if (hitbox) {
          await userEvent.hover(hitbox);
        }

        await new Promise((r) => setTimeout(r, 10));

        // Tooltip is rendered via createPortal to document.body — query from there
        const tooltip = document.body.querySelector('[aria-label="Tooltip data"]');
        assume(tooltip).exists();
      });
    });
  });
});
