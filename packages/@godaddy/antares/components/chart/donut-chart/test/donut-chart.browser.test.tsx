import assume from 'assume';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { waitForSelector } from '#test/utils/wait-for-selector.ts';
import { DefaultExample } from '../examples/default.tsx';
import { FormatValueExample } from '../examples/format-value.tsx';
import { LegendLayoutExample } from '../examples/legend-layout.tsx';
import { SingleSliceExample } from '../examples/single-slice.tsx';
import { SmallSlicesExample } from '../examples/small-slices.tsx';
/**
 * Renders a donut example in a fixed box and waits for SVG arcs (ResizeObserver + layout).
 *
 * @param node - Example component
 * @param width - Container width in px
 * @param height - Container height in px
 */
async function renderDonutExample(node: ReactNode, width = 400, height = 400) {
  await page.viewport(width, height);
  const result = await render(<div style={{ width: `${width}px`, height: `${height}px` }}>{node}</div>);

  await waitForSelector(result.container, 'svg');
  await waitForSelector(result.container, 'svg path');

  return result;
}

describe('@godaddy/antares', function antares() {
  describe('#DonutChart', function donutChartTests() {
    describe('#render', function renderTests() {
      it('renders single slice with aria-label, one path, and center labels', async function singleSlice() {
        const { container, locator } = await renderDonutExample(<SingleSliceExample />);

        const svg = container.querySelector('svg') as SVGSVGElement;
        assume(svg).exists();
        assume(svg.getAttribute('role')).equals('img');
        assume(svg.getAttribute('aria-label')).equals('Donut chart with a single full ring');

        const paths = svg.querySelectorAll('path');
        assume(paths.length).equals(1);

        const value = locator.getByText('$1,000').element();
        const description = locator.getByText('Sub label').element();
        const valueBounds = value.getBoundingClientRect();
        const ringBounds = svg.getBoundingClientRect();

        expect(valueBounds.left + valueBounds.width / 2).toBeCloseTo(ringBounds.left + ringBounds.width / 2, 1);
        expect(valueBounds.bottom).toBeLessThanOrEqual(description.getBoundingClientRect().top);
        expect(Number.parseFloat(getComputedStyle(value).fontSize)).toBeCloseTo(ringBounds.width * 0.1573, 1);
        expect(Number.parseFloat(getComputedStyle(description).fontSize)).toBeCloseTo(ringBounds.width * 0.0681, 1);
      });

      it('renders basic chart with central label and category names', async function basicChart() {
        const { container, locator } = await renderDonutExample(<DefaultExample />);

        const svg = container.querySelector('svg') as SVGSVGElement;
        assume(svg).exists();
        assume(svg.querySelectorAll('path').length).equals(5);
        assume(locator.getByText('100%').element()).exists();
      });
    });

    describe('#legend', function legendTests() {
      it('places the legend below or at the inline end and displays the slice names', async function legendLayout() {
        const { locator } = await renderDonutExample(<LegendLayoutExample />, 600, 900);
        const sideLegend = locator.getByRole('list', { name: 'Side legend' });
        const bottomLegend = locator.getByRole('list', { name: 'Bottom legend' });
        const sideChart = locator.getByRole('img', { name: 'Donut with legend beside it' });
        const bottomChart = locator.getByRole('img', { name: 'Donut with legend below' });

        await expect.element(bottomChart).toBeVisible();
        expect(sideLegend.element().getBoundingClientRect().left).toBeGreaterThan(
          sideChart.element().getBoundingClientRect().right
        );
        expect(bottomLegend.element().getBoundingClientRect().top).toBeGreaterThan(
          bottomChart.element().getBoundingClientRect().bottom
        );

        [sideLegend, bottomLegend].forEach(function assertLegendContent(legend) {
          const expectedItems = ['Product A', 'Product B', 'Product C', 'Product D'];
          const items = legend.getByRole('listitem').all();
          assume(items.length).equals(expectedItems.length);
          items.forEach(function assertItemContent(item) {
            assume(item.getByText(expectedItems.shift()!).element()).exists();
          });
        });
      });

      it('places an inline-end legend to the left in right-to-left layouts', async function rtlLegendLayout() {
        const { locator } = await renderDonutExample(
          <div dir="rtl">
            <LegendLayoutExample />
          </div>
        );
        const legend = locator.getByRole('list', { name: 'Side legend' }).element();
        const chart = locator.getByRole('img', { name: 'Donut with legend beside it' }).element();

        expect(legend.getBoundingClientRect().right).toBeLessThan(chart.getBoundingClientRect().left);
      });

      it('matches legend swatches to slices when zero values are omitted from the ring', async function legendColors() {
        const { locator } = await renderDonutExample(
          <LegendLayoutExample
            data={[
              { name: 'No sales', value: 0 },
              { name: 'Sales', value: 100 }
            ]}
          />
        );
        const chart = locator.getByRole('img', { name: 'Donut with legend beside it' }).element();
        const legend = locator.getByRole('list', { name: 'Side legend' });
        const slices = chart.querySelectorAll('path');
        const swatches = legend.element().querySelectorAll<HTMLElement>('[style*="background-color"]');

        expect(slices).toHaveLength(1);
        expect(swatches).toHaveLength(2);
        expect(swatches[0].style.backgroundColor).not.toBe(swatches[1].style.backgroundColor);
        expect(slices[0].getAttribute('fill')).toBe(swatches[1].style.backgroundColor);
      });
    });

    describe('#tooltip', function tooltipTests() {
      it('opens tooltip on slice hover and closes when pointer leaves the svg', async function hoverAndLeave() {
        const { locator } = await renderDonutExample(<DefaultExample />);

        const chart = locator.getByRole('img');
        const slice = chart.element().querySelectorAll('path')[0];
        await page.elementLocator(slice).hover({ position: { x: 1, y: 1 } });

        const tooltip = page.getByRole('tooltip');

        assume(tooltip).exists();
        assume(tooltip.element().textContent).includes('Category A35%35');

        await locator.getByText('100%').hover();
        await expect.element(tooltip).not.toBeInTheDocument();
      });

      it('shows formatValue output in tooltip for FormatValueExample', async function formatValueTooltip() {
        const { locator } = await renderDonutExample(<FormatValueExample />);

        const chart = locator.getByRole('img');
        const slice = chart.element().querySelectorAll('path')[0];
        await page.elementLocator(slice).hover({ position: { x: 1, y: 1 } });

        const tooltip = page.getByRole('tooltip');
        assume(tooltip).exists();
        const text = tooltip.element().textContent ?? '';
        assume(text).includes('Sales');
        assume(text).includes('$42.00');
      });
    });

    describe('#small-slices', function smallSlicesTests() {
      it('groups first contiguous small slices in one tooltip', async function firstCluster() {
        const { container } = await renderDonutExample(<SmallSlicesExample />);

        const paths = container.querySelectorAll('svg path');
        assume(paths.length).equals(8);

        const pathA = paths[1] as SVGPathElement;
        await page.elementLocator(pathA).hover({ position: { x: 5, y: 5 } });

        const tooltip = page.getByRole('tooltip');
        const text = tooltip.element().textContent;
        assume(text).includes('Slice A');
        assume(text).includes('Slice B');
        assume(text).includes('Slice C');

        const items = page.getByRole('listitem').all();
        assume(items.length).equals(3);
      });

      it('groups second cluster of small slices E–G in one tooltip', async function secondCluster() {
        const { container } = await renderDonutExample(<SmallSlicesExample />);

        const paths = container.querySelectorAll('svg path');
        const pathF = paths[6] as SVGPathElement;
        await page.elementLocator(pathF).hover({ position: { x: 5, y: 5 } });

        const tooltip = page.getByRole('tooltip');
        const text = tooltip.element().textContent;
        assume(text).includes('Slice E');
        assume(text).includes('Slice F');
        assume(text).includes('Slice G');

        const items = page.getByRole('listitem').all();
        assume(items.length).equals(3);
      });

      it('groups all small slices in one tooltip', async function allSmallSlices() {
        const data = Array.from({ length: 20 }, (_, i) => ({ id: `slice-${i}`, name: `Slice ${i}`, value: 1 }));
        const { container } = await renderDonutExample(<DefaultExample data={data} />);

        const paths = container.querySelectorAll('svg path');
        assume(paths.length).equals(20);

        const path = paths[0] as SVGPathElement;
        await page.elementLocator(path).hover({ position: { x: 15, y: 15 } });

        const items = page.getByRole('listitem').all();
        assume(items.length).equals(20);
        items.forEach(function assertRowShowsSliceName(item, i) {
          assume((item.element().textContent ?? '').includes(`Slice ${i}`)).is.true();
        });
      });
    });
  });
});
