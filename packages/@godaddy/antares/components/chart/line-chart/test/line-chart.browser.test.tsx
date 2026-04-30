import assume from 'assume';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { waitForSelector } from '../../../../utils/wait-for-selector.ts';
import { BitcoinPriceExample } from '../examples/bitcoin-price';
import { CityTemperatureExample } from '../examples/city-temperature';
import { LegendExample } from '../examples/legend';
import { MultipleSeriesExample } from '../examples/multiple-series';
import { SingleSeriesExample } from '../examples/single-series';
import { TitlesExample } from '../examples/titles';
import { FormattingExample } from '../examples/formatting.tsx';
import { CustomTooltipFormattingExample } from '../examples/custom-tooltip-formatting.tsx';
import { CustomAccessorsExample } from '../examples/custom-accessors.tsx';
import { BrowserUsageExample } from '../examples/browser-usage.tsx';
import { RTLExample } from '../examples/rtl.tsx';

/**
 * Renders a node in a sized container and waits for chart SVG
 *
 * @param node - React node to render (e.g. <Example />)
 * @param width - Container width in px (default: 800)
 * @param height - Container height in px (default: 400)
 * @returns Render result after SVG is present
 */
async function renderExampleAndWait(node: React.ReactNode, width = 800, height = 400) {
  await page.viewport(width, height);
  const result = await render(<div style={{ width: `${width}px`, height: `${height}px` }}>{node}</div>);
  await waitForSelector(result.container, 'svg');

  return result;
}

describe('@godaddy/antares', function antares() {
  describe('#LineChart', function lineChartTests() {
    describe('#single-series', function singleSeries() {
      it('renders chart with one series and shows series label', async function renders() {
        const { container, locator } = await renderExampleAndWait(<SingleSeriesExample />);

        assume(container.querySelector('svg')).exists();
        assume(locator.getByText('Series 1')).exists();
      });
    });

    describe('#multiple-series', function multipleSeries() {
      it('renders chart with multiple series and shows all series labels', async function renders() {
        const { container, locator } = await renderExampleAndWait(<MultipleSeriesExample />);

        assume(container.querySelector('svg')).exists();
        assume(locator.getByText('Product A')).exists();
        assume(locator.getByText('Product B')).exists();
      });

      it('render chart with multiple series and legend listing all series', async function renders() {
        const { container, locator, baseElement } = await renderExampleAndWait(<BrowserUsageExample />);
        await waitForSelector(baseElement, 'path', { timeout: 1000 });

        const svg = container.querySelector('svg') as SVGGraphicsElement;
        const paths = svg.querySelectorAll('path');

        assume(paths.length).equals(6);
        assume(locator.getByText('Google Chrome')).exists();
        assume(locator.getByText('Internet Explorer')).exists();
        assume(locator.getByText('Firefox')).exists();
        assume(locator.getByText('Safari')).exists();
        assume(locator.getByText('Microsoft Edge')).exists();
        assume(locator.getByText('Opera')).exists();

        await locator.hover({ position: { x: 120, y: 50 } });
        await waitForSelector(baseElement, '.visx-tooltip', { timeout: 1000 });

        assume(locator.getByText('Google Chrome50.53%')).exists();
        assume(locator.getByText('Internet Explorer22.64%')).exists();
        assume(locator.getByText('Firefox18.04%')).exists();
        assume(locator.getByText('Safari17.33%')).exists();
        assume(locator.getByText('Microsoft Edge0.07%')).exists();
        assume(locator.getByText('Opera1.27%')).exists();
      });
    });

    describe('#axis-titles', function axisTitles() {
      it('renders chart with x and y axis titles', async function renders() {
        const { container, locator } = await renderExampleAndWait(<TitlesExample />);

        assume(container.querySelector('svg')).exists();
        assume(locator.getByText('Date')).exists();
        assume(locator.getByText('Value')).exists();
      });
    });

    describe('#legend', function legend() {
      it('renders chart with legend listing all series', async function renders() {
        const { container, locator } = await renderExampleAndWait(<LegendExample />);

        assume(container.querySelector('svg')).exists();
        assume(locator.getByText('Series 1')).exists();
        assume(locator.getByText('Series 2')).exists();
        assume(locator.getByText('Series 3')).exists();
      });

      it('shows legend at bottom by default when multiple series and legendPosition omitted', async function defaultLegendBottom() {
        const { container, locator } = await renderExampleAndWait(<MultipleSeriesExample legendPosition={undefined} />);

        assume(container.querySelector('[data-legend-position="bottom"]')).exists();

        assume(locator.getByText('Product A')).exists();
        assume(locator.getByText('Product B')).exists();
        assume(locator.getByText('Product C')).exists();
        assume(locator.getByText('Product D')).exists();
      });
    });

    describe('#horizontal-scroll', function horizontalScroll() {
      it('chart area is scrollable when content overflows width', async function scrollable() {
        const { container } = await renderExampleAndWait(
          <BitcoinPriceExample xLabelsOrientation="horizontal" />,
          400,
          600
        );
        const svg = container.querySelector('svg') as SVGGraphicsElement;
        assume(svg).exists();
        const area = svg.parentNode as HTMLElement;
        assume(area).exists();

        await vi.waitUntil(
          function scrollable() {
            return area.scrollWidth > area.clientWidth;
          },
          { timeout: 10000 }
        );
        assume(area.scrollWidth).greaterThan(area.clientWidth);

        area.scrollLeft = 100;
        assume(area.scrollLeft).equals(100);
      });

      it('hides tooltip when pointer moves to viewport y-axis after scroll', async function hidesTooltipOnYAxisHover() {
        const { container, locator, baseElement } = await renderExampleAndWait(
          <BitcoinPriceExample xLabelsOrientation="horizontal" />,
          400,
          600
        );
        const area = (container.querySelector('svg') as SVGElement).parentElement as HTMLElement;
        await vi.waitUntil(
          function wideEnough() {
            return area.scrollWidth > area.clientWidth;
          },
          { timeout: 10000 }
        );
        function syncScroll() {
          area.scrollLeft = 120;
          area.dispatchEvent(new Event('scroll'));
        }
        syncScroll();
        assume(area.scrollLeft).equals(120);

        await vi.waitUntil(
          function layerReady() {
            return area.querySelector('[data-tooltip-dismiss-strip]') != null;
          },
          { timeout: 5000 }
        );

        await locator.hover({ position: { x: 250, y: 120 } });
        await waitForSelector(baseElement, '.visx-tooltip', { timeout: 2000 });
        assume(locator.getByText('Bitcoin Price')).exists();

        syncScroll();
        await vi.waitUntil(
          function layerReadyAgain() {
            return area.querySelector('[data-tooltip-dismiss-strip]') != null;
          },
          { timeout: 2000 }
        );
        const layerEl = area.querySelector('[data-tooltip-dismiss-strip]') as HTMLElement;
        await new Promise(function nextTick(r) {
          setTimeout(r, 0);
        });
        layerEl.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true, cancelable: true }));

        await vi.waitUntil(
          function tooltipClosed() {
            return document.querySelector('.visx-tooltip') == null;
          },
          { timeout: 2000 }
        );
      });

      it('tooltip updates on scroll and disappears when pointer leaves', async function tooltipScrollAndLeave() {
        const { container, locator, baseElement } = await renderExampleAndWait(
          <BitcoinPriceExample xLabelsOrientation="horizontal" />,
          400,
          600
        );
        const area = (container.querySelector('svg') as SVGElement).parentElement as HTMLElement;
        await vi.waitUntil(
          function wideEnough() {
            return area.scrollWidth > area.clientWidth;
          },
          { timeout: 10000 }
        );

        // hover to open tooltip and register the pointer target for re-dispatch on scroll
        await locator.hover({ position: { x: 250, y: 120 } });
        await waitForSelector(baseElement, '.visx-tooltip', { timeout: 2000 });
        assume(locator.getByText('Bitcoin Price$660.73')).exists();

        // scroll — pointer still inside, handler re-dispatches pointermove so tooltip updates
        area.scrollLeft = 80;
        area.dispatchEvent(new Event('scroll'));

        await new Promise(function nextTick(r) {
          setTimeout(r, 50);
        });

        assume(locator.getByText('Bitcoin Price$742.72')).exists();

        // pointer leaves the chart area: clear lastTarget and let visx close its tooltip
        area
          .querySelector('svg')
          ?.lastElementChild?.dispatchEvent(new PointerEvent('pointerout', { bubbles: true, cancelable: true }));

        await vi.waitUntil(
          function tooltipGone() {
            return document.querySelector('.visx-tooltip') == null;
          },
          { timeout: 2000 }
        );
      });
    });

    describe('#tooltips', function tooltips() {
      it('hover shows tooltips for all series at cursor position', async function hoverShowsTooltips() {
        const { container, locator, baseElement } = await renderExampleAndWait(<CityTemperatureExample />);

        assume(container.querySelector('svg')).exists();
        assume(locator.getByText('Austin')).exists();

        await locator.hover({ position: { x: 199, y: 100 } });
        await waitForSelector(baseElement, '.visx-tooltip', { timeout: 1000 });

        const tooltipElements = document.querySelectorAll('.visx-tooltip');
        const lastTooltip = tooltipElements[tooltipElements.length - 1];

        assume(tooltipElements.length).equals(5);
        assume(lastTooltip.children.length).greaterThan(0);
      });

      it('displays glyphs but no tooltips for all series on hover when tooltips are disabled', async function displaysGlyphsWithoutTooltipsWhenDisabled() {
        const { container, locator, baseElement } = await renderExampleAndWait(
          <CityTemperatureExample tooltip={false} />
        );

        assume(container.querySelector('svg')).exists();
        assume(locator.getByText('Austin')).exists();

        await locator.hover({ position: { x: 199, y: 100 } });
        await waitForSelector(baseElement, '.visx-tooltip', { timeout: 1000 });

        const tooltipElements = document.querySelectorAll('.visx-tooltip');
        const lastTooltip = tooltipElements[tooltipElements.length - 1];

        assume(tooltipElements.length).equals(5);
        assume(lastTooltip.children).empty();
      });
    });

    describe('#formatting', function formatting() {
      it('renders chart with formatted axis and tooltip values', async function renders() {
        const { container, locator, baseElement } = await renderExampleAndWait(<FormattingExample />);

        assume(container.querySelector('svg')).exists();
        assume(locator.getByText('$70.00')).exists();

        await locator.hover({ position: { x: 120, y: 50 } });
        await waitForSelector(baseElement, '.visx-tooltip', { timeout: 1000 });

        const tooltipElements = document.querySelectorAll('.visx-tooltip');
        const lastTooltip = tooltipElements[tooltipElements.length - 1];

        assume(lastTooltip.children.length).greaterThan(0);
        assume(lastTooltip.children[0].textContent).equals('Series 1$58.00');
      });

      it('render formatted tooltip with bitcoin price example', async function renders() {
        const { locator, baseElement } = await renderExampleAndWait(<BitcoinPriceExample />);

        await locator.hover({ position: { x: 120, y: 50 } });
        await waitForSelector(baseElement, '.visx-tooltip', { timeout: 1000 });

        assume(locator.getByText('Bitcoin Price$660.73')).exists();
      });
    });

    it('render chart with formatted tooltip value', async function renders() {
      const { locator, baseElement } = await renderExampleAndWait(<CustomTooltipFormattingExample />);

      await locator.hover({ position: { x: 400, y: 200 } });
      await waitForSelector(baseElement, '.visx-tooltip', { timeout: 1000 });

      const tooltipElements = document.querySelectorAll('.visx-tooltip');
      const lastTooltip = tooltipElements[tooltipElements.length - 1];

      assume(lastTooltip.children.length).greaterThan(0);
      expect(lastTooltip.children[0].textContent).toMatch(/^Series 1Value: \d+\.\d{2} units$/);
    });

    describe('#accessors', function accessors() {
      it('renders chart with custom accessor function', async function renders() {
        const { container } = await renderExampleAndWait(<CustomAccessorsExample />);

        assume(container.querySelector('svg')).exists();
      });
    });

    describe('#rtl', function rtl() {
      function getXYAxisGroups(svg: SVGGraphicsElement): { xAxis: SVGGraphicsElement; yAxis: SVGGraphicsElement } {
        const axes = Array.from(svg.querySelectorAll<SVGGraphicsElement>('g.visx-axis'));
        let xAxis: SVGGraphicsElement | null = null;
        let yAxis: SVGGraphicsElement | null = null;
        for (const axis of axes) {
          const tickLine = axis.querySelector('line');
          if (!tickLine) continue;
          const x1 = parseFloat(tickLine.getAttribute('x1') ?? '0');
          const x2 = parseFloat(tickLine.getAttribute('x2') ?? '0');
          const y1 = parseFloat(tickLine.getAttribute('y1') ?? '0');
          const y2 = parseFloat(tickLine.getAttribute('y2') ?? '0');

          if (Math.abs(x1 - x2) > Math.abs(y1 - y2)) {
            yAxis = axis;
          } else {
            xAxis = axis;
          }
        }

        return { xAxis: xAxis as SVGGraphicsElement, yAxis: yAxis as SVGGraphicsElement };
      }

      it('renders the chart wrapper with dir="rtl" when locale is RTL', async function rtlWrapperDir() {
        const { container } = await renderExampleAndWait(<RTLExample />);
        const wrapper = container.querySelector('[data-x-labels-vertical], [data-y-labels]');

        assume(wrapper).exists();
        assume(wrapper?.getAttribute('dir')).equals('rtl');
      });

      it('positions Y-axis on the visual right when locale is RTL', async function rtlYAxisRight() {
        const { container } = await renderExampleAndWait(<RTLExample />);

        const svg = container.querySelector('svg') as SVGGraphicsElement;
        assume(svg).exists();

        await vi.waitUntil(
          function yAxisTicksRendered() {
            return svg.querySelectorAll('.visx-axis-tick').length >= 4;
          },
          { timeout: 5000 }
        );

        const { yAxis } = getXYAxisGroups(svg);
        assume(yAxis).exists();

        const svgRect = svg.getBoundingClientRect();
        const yAxisRect = yAxis.getBoundingClientRect();
        assume(yAxisRect.left).is.above(svgRect.left + svgRect.width / 2);
      });

      it('positions Y-axis on the visual left in default LTR locale', async function ltrYAxisLeft() {
        const { container } = await renderExampleAndWait(<CityTemperatureExample />);

        const svg = container.querySelector('svg') as SVGGraphicsElement;
        assume(svg).exists();

        await vi.waitUntil(
          function yAxisTicksRendered() {
            return svg.querySelectorAll('.visx-axis-tick').length >= 4;
          },
          { timeout: 5000 }
        );

        const { yAxis } = getXYAxisGroups(svg);
        assume(yAxis).exists();

        const svgRect = svg.getBoundingClientRect();
        const yAxisRect = yAxis.getBoundingClientRect();
        assume(yAxisRect.right).is.below(svgRect.left + svgRect.width / 2);
      });

      it('flips X-axis tick order in RTL so first DOM tick renders to the right of the last', async function rtlXAxisTickOrder() {
        const { container } = await renderExampleAndWait(<RTLExample />);

        const svg = container.querySelector('svg') as SVGGraphicsElement;

        // Wait for series data to register so ticks span real pixel positions (visx renders a
        // default [0,1] scale until then).
        await vi.waitUntil(
          function xScaleReady() {
            const { xAxis } = getXYAxisGroups(svg);
            if (!xAxis) {
              return false;
            }

            const tickLines = Array.from(xAxis.querySelectorAll<SVGLineElement>('.visx-axis-tick line'));
            if (tickLines.length < 2) {
              return false;
            }

            const tickPositions = tickLines.map((line) => parseFloat(line.getAttribute('x1') ?? '0'));
            return Math.max(...tickPositions) - Math.min(...tickPositions) > 50;
          },
          { timeout: 5000 }
        );

        const { xAxis } = getXYAxisGroups(svg);
        const xTickLines = Array.from(xAxis.querySelectorAll<SVGLineElement>('.visx-axis-tick line'));
        const firstTickX = parseFloat(xTickLines[0].getAttribute('x1') ?? '0');
        const lastTickX = parseFloat(xTickLines[xTickLines.length - 1].getAttribute('x1') ?? '0');

        assume(firstTickX).is.above(lastTickX);
      });
    });

    describe('#unique-id', function uniqueId() {
      it('renders chart with unique id', async function renders() {
        const noIdSeries = [
          {
            name: 'Series 1',
            data: [
              { x: 'Q1', y: '100' },
              { x: 'Q2', y: '200' }
            ]
          }
        ];
        const { container } = await renderExampleAndWait(<SingleSeriesExample series={noIdSeries} />);
        await waitForSelector(container, 'path', { timeout: 1000 });

        assume(container.querySelector('svg')).exists();
        assume(container.querySelector('path')!.getAttribute('id')).includes('line-series-');
      });
    });
  });
});
