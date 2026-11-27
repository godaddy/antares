import { ChartLegendContext, DonutChartCenterContext } from '@godaddy/antares';
import assume from 'assume';
import { createRef, type ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { waitForSelector } from '#test/utils/wait-for-selector.ts';
import { AllSmallSlicesExample } from '../examples/all-small-slices.tsx';
import { CenterOverrideExample } from '../examples/center-override.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { DynamicDescriptionExample } from '../examples/dynamic-description.tsx';
import { FormatValueExample } from '../examples/format-value.tsx';
import { InteractiveCenterExample } from '../examples/interactive-center.tsx';
import { LegendLayoutExample } from '../examples/legend-layout.tsx';
import { RegionRefsExample } from '../examples/region-refs.tsx';
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
      it.each([false, true])(
        'lays out a single slice and center labels (description first: %s)',
        async function singleSlice(descriptionFirst) {
          const { container, locator } = await renderDonutExample(
            <SingleSliceExample descriptionFirst={descriptionFirst} />
          );

          const svg = container.querySelector('svg') as SVGSVGElement;
          assume(svg).exists();
          assume(svg.getAttribute('role')).equals('img');
          assume(svg.getAttribute('aria-label')).equals('Donut chart with a single full ring');

          const paths = svg.querySelectorAll('path');
          assume(paths.length).equals(1);

          const value = locator.getByText('$1,000').element();
          const description = locator.getByText('Sub label').element();
          const valueBounds = value.getBoundingClientRect();
          const descriptionBounds = description.getBoundingClientRect();
          const ringBounds = svg.getBoundingClientRect();

          expect(valueBounds.left + valueBounds.width / 2).toBeCloseTo(ringBounds.left + ringBounds.width / 2, 1);
          expect(valueBounds.bottom).toBeLessThanOrEqual(descriptionBounds.top);
          expect((valueBounds.top + descriptionBounds.bottom) / 2).toBeCloseTo(
            ringBounds.top + ringBounds.height / 2,
            0
          );
          expect(Number.parseFloat(getComputedStyle(value).fontSize)).toBeCloseTo(ringBounds.width * 0.1573, 1);
          expect(Number.parseFloat(getComputedStyle(description).fontSize)).toBeCloseTo(ringBounds.width * 0.0681, 1);
        }
      );

      it('honors explicit text sizing and emphasis in the center slots', async function overrides() {
        const { locator } = await renderDonutExample(<CenterOverrideExample size="xs" emphasis="critical" />);

        for (const text of ['$1,000', 'Sub label']) {
          await expect.element(locator.getByText(text)).toHaveStyle({ fontSize: '12px', color: 'rgb(219, 24, 2)' });
        }
      });

      it('preserves external descriptions when the description slot changes', async function dynamicDescription() {
        const { locator } = await renderDonutExample(<DynamicDescriptionExample />);
        const chart = locator.getByRole('img', { name: 'Total sales' });
        const changeDescription = locator.getByRole('button', { name: 'Change description' });

        await expect.element(chart).toHaveAttribute('aria-describedby', 'external-description sales-description');
        await expect.element(chart).toHaveAccessibleDescription('Updated daily. Online sales.');
        await changeDescription.click();
        await expect.element(chart).toHaveAttribute('aria-describedby', 'external-description renamed-description');
        await expect.element(chart).toHaveAccessibleDescription('Updated daily. Online sales.');
        await changeDescription.click();
        await expect.element(chart).toHaveAttribute('aria-describedby', 'external-description');
        await expect.element(chart).toHaveAccessibleDescription('Updated daily.');
        await changeDescription.click();
        await expect.element(chart).toHaveAttribute('aria-describedby', 'external-description sales-description');
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
      it('keeps the legend in place with consumer context overrides', async function legendLayout() {
        const centerRef = createRef<HTMLDivElement>();
        const legendRef = createRef<HTMLDivElement>();
        const { locator } = await renderDonutExample(
          <DonutChartCenterContext.Provider value={{ className: 'custom-center', ref: centerRef }}>
            <ChartLegendContext.Provider
              value={{ className: 'custom-legend', orientation: 'horizontal', ref: legendRef }}
            >
              <LegendLayoutExample />
            </ChartLegendContext.Provider>
          </DonutChartCenterContext.Provider>,
          600,
          900
        );
        const sideLegend = locator.getByRole('list', { name: 'Side legend' });
        const bottomLegend = locator.getByRole('list', { name: 'Bottom legend' });
        const sideChart = locator.getByRole('img', { name: 'Donut with legend beside it' });
        const bottomChart = locator.getByRole('img', { name: 'Donut with legend below' });

        await expect.element(bottomChart).toBeVisible();
        expect(sideLegend.element().closest('.custom-legend')).not.toBeNull();
        expect(locator.getByText('100%').all()[0].element().closest('.custom-center')).not.toBeNull();
        expect(centerRef.current?.classList.contains('custom-center')).toBe(true);
        expect(legendRef.current?.contains(bottomLegend.element())).toBe(true);
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

      it('forwards refs to the center and legend roots', async function regionRefs() {
        const centerRef = createRef<HTMLDivElement>();
        const legendRef = createRef<HTMLDivElement>();
        const { locator } = await renderDonutExample(<RegionRefsExample centerRef={centerRef} legendRef={legendRef} />);

        expect(centerRef.current?.contains(locator.getByText('100%').element())).toBe(true);
        expect(legendRef.current?.contains(locator.getByRole('list', { name: 'Channel' }).element())).toBe(true);
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
      it('keeps the ring hoverable when center text overlaps a slice', async function overlappingCenter() {
        const { locator } = await renderDonutExample(<CenterOverrideExample value="WWWWWWWWWWWWWW" />, 180, 300);
        const chart = locator.getByRole('img').element();
        const slice = chart.querySelector('path')!;
        const { width, height } = chart.getBoundingClientRect();

        await page.elementLocator(slice).hover({ position: { x: width - 5, y: height / 2 } });
        await expect.element(page.getByRole('tooltip')).toHaveTextContent('Total100%100');
      });

      it('keeps the full target of interactive center content clickable', async function interactiveCenter() {
        const onPress = vi.fn();
        const { locator } = await renderDonutExample(<InteractiveCenterExample onPress={onPress} />, 200, 200);
        const button = locator.getByRole('button', { name: 'View details' });
        const { width, height } = button.element().getBoundingClientRect();

        await button.click({ position: { x: width - 3, y: height / 2 } });
        expect(onPress).toHaveBeenCalledOnce();
      });

      it('opens tooltip on slice hover and closes when the pointer moves into the ring hole', async function hoverAndLeave() {
        const { locator } = await renderDonutExample(<DefaultExample />);

        const chart = locator.getByRole('img');
        const slice = chart.element().querySelectorAll('path')[0];
        await page.elementLocator(slice).hover({ position: { x: 1, y: 1 } });

        const tooltip = page.getByRole('tooltip');

        assume(tooltip).exists();
        assume(tooltip.element().textContent).includes('Category A35%35');

        await chart.hover();
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
        const { container } = await renderDonutExample(<AllSmallSlicesExample />);

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
