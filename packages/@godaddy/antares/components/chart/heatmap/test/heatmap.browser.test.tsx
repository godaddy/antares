import type React from 'react';
import { useState } from 'react';
import { HeatmapChart, type HeatmapChartProps, type ColorBucket } from '../src';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { describe, it } from 'vitest';
import assume from 'assume';
import { RTLProvider } from '#utils/rtl-locale-provider.tsx';
import { waitForSelector } from '#test/utils/wait-for-selector.ts';

const COLOR_BUCKETS: ColorBucket[] = [
  { min: 0, max: 100, color: '#dbeafe', label: '0–100' },
  { min: 100, max: 300, color: '#3b82f6', label: '100–300' },
  { min: 300, max: null, color: '#1e3a8a', label: '300+' }
];

const DEFAULT_DATA = [
  { x: 'Mon', y: 'Morning', value: 50 },
  { x: 'Mon', y: 'Afternoon', value: 200 },
  { x: 'Mon', y: 'Evening', value: null },
  { x: 'Tue', y: 'Morning', value: 120 },
  { x: 'Tue', y: 'Afternoon', value: 380 },
  { x: 'Tue', y: 'Evening', value: 80 }
];

async function renderAndWait(component: React.ReactElement) {
  const result = await render(component);
  await waitForSelector(result.container, 'svg');
  return result;
}

async function renderHeatmap(args: Partial<HeatmapChartProps> = {}, options?: { useRtlI18n?: boolean }) {
  const chart = (
    <div style={{ width: '800px', height: '400px' }}>
      <HeatmapChart data={DEFAULT_DATA} colorBuckets={COLOR_BUCKETS} {...args} />
    </div>
  );

  return renderAndWait(options?.useRtlI18n ? <RTLProvider>{chart}</RTLProvider> : chart);
}

describe('@godaddy/antares', function antares() {
  describe('#HeatmapChart', function heatmapTests() {
    it('renders SVG after mount', async function rendersSvg() {
      const { container } = await renderHeatmap();
      const svg = container.querySelector('svg');
      assume(svg).exists();
    });

    it('renders cells for data points', async function rendersCells() {
      const { container } = await renderHeatmap();
      const svg = container.querySelector('svg');
      assume(svg).exists();

      const cells = svg?.querySelectorAll('rect[role="img"]');
      assume(cells!.length).is.at.least(1);
    });

    it('renders closed cells with dashed style for null values', async function rendersClosed() {
      const { container } = await renderHeatmap();
      const svg = container.querySelector('svg');
      assume(svg).exists();

      const closedCells = svg?.querySelectorAll('rect[role="presentation"]');
      assume(closedCells!.length).is.at.least(1);
    });

    it('renders X-axis when xLabels is true', async function xLabels() {
      const { container } = await renderHeatmap({ xLabels: true });
      const svg = container.querySelector('svg');
      assume(svg).exists();

      const xAxis = svg?.querySelector('.visx-axis-bottom');
      assume(xAxis).exists();
    });

    it('hides X-axis when xLabels is false', async function noXLabels() {
      const { container } = await renderHeatmap({ xLabels: false });
      const svg = container.querySelector('svg');
      assume(svg).exists();

      const xAxis = svg?.querySelector('.visx-axis-bottom');
      assume(xAxis).is.a('null');
    });

    it('renders Y-axis (left) in LTR mode', async function yAxisLtr() {
      const { container } = await renderHeatmap();
      const svg = container.querySelector('svg');
      assume(svg).exists();

      const yAxis = svg?.querySelector('.visx-axis-left');
      assume(yAxis).exists();
    });

    it('renders Y-axis (right) in RTL mode', async function yAxisRtl() {
      const { container } = await renderHeatmap({}, { useRtlI18n: true });
      const svg = container.querySelector('svg');
      assume(svg).exists();

      const yAxis = svg?.querySelector('.visx-axis-right');
      assume(yAxis).exists();
    });

    describe('#legend', function legendTests() {
      it('renders the color legend by default', async function legendDefault() {
        const { container } = await renderHeatmap();
        const legend = container.querySelector('[aria-label="Heatmap legend"]');
        assume(legend).exists();
      });

      it('hides the legend when colorLegend is false', async function legendHidden() {
        const { container } = await renderHeatmap({ colorLegend: false });
        const legend = container.querySelector('[aria-label="Heatmap legend"]');
        assume(legend).is.a('null');
      });

      it('shows bucket labels in the legend', async function legendLabels() {
        const { locator } = await renderHeatmap();
        const label = locator.getByText('0–100');
        assume(label.element()).exists();
      });

      it('shows a closed swatch in the legend', async function legendClosed() {
        const { locator } = await renderHeatmap({ closedLabel: 'Unavailable' });
        const closedLabel = locator.getByText('Unavailable');
        assume(closedLabel.element()).exists();
      });
    });

    describe('#axis ticks', function tickTests() {
      it('hides tick marks so no stray dots render beside labels', async function ticksHidden() {
        const { container } = await renderHeatmap();
        const ticks = container.querySelectorAll('svg .visx-axis-tick line');
        ticks.forEach(function checkTick(line) {
          assume(getComputedStyle(line).stroke).does.not.equal('rgb(34, 34, 34)');
        });
      });
    });

    describe('#axis layout', function axisLayoutTests() {
      it('does not clip the x-axis labels at the bottom of the chart area', async function noClippedLabels() {
        const { container } = await renderHeatmap();
        await new Promise((r) => setTimeout(r, 400));

        const area = container.querySelector('svg')!.parentElement!;
        const visibleBottom = area.getBoundingClientRect().top + area.clientHeight;
        const labels = Array.from(container.querySelectorAll('svg .visx-axis-bottom text'));
        assume(labels.length).is.above(0);

        const lowest = Math.max(...labels.map((label) => label.getBoundingClientRect().bottom));
        assume(lowest <= visibleBottom + 0.5).is.true();
      });
    });

    describe('#cell padding', function cellPaddingTests() {
      it('uses cellPadding as the gap between cells in px', async function cellPaddingGap() {
        const { container } = await renderHeatmap({ cellPadding: 10 });
        await new Promise((r) => setTimeout(r, 300));
        const rects = Array.from(
          container.querySelectorAll('svg rect[role="img"], svg rect[role="presentation"]')
        ).filter((rect) => rect.getAttribute('rx') !== null);
        const xs = Array.from(new Set(rects.map((rect) => Number(rect.getAttribute('x'))))).sort((a, b) => a - b);
        const widths = Number(rects[0].getAttribute('width'));
        assume(xs.length).is.above(1);
        assume(Math.round(xs[1] - xs[0] - widths)).equals(10);
      });
    });

    describe('#date categories', function dateCategoryTests() {
      it('passes the original Date to tick formatters', async function dateTickFormat() {
        const days = [new Date(2026, 0, 5), new Date(2026, 0, 6)];
        const data = days.flatMap((day) => [{ x: 'AM', y: day, value: 10 }]);
        const { container } = await renderHeatmap({
          data,
          xDomain: ['AM'],
          yDomain: days,
          yTickFormat: (v) => (v instanceof Date ? `D${v.getDate()}` : 'NOT-A-DATE')
        });
        await new Promise((r) => setTimeout(r, 300));
        const text = container.querySelector('svg')!.textContent ?? '';
        assume(text).contains('D5');
        assume(text).contains('D6');
        assume(text).does.not.contain('NOT-A-DATE');
      });
    });

    describe('#closed values', function closedValueTests() {
      it('treats NaN and undefined values as closed cells', async function nanClosed() {
        const { container } = await renderHeatmap({
          data: [
            { x: 'a', y: 'r', value: Number.NaN },
            { x: 'b', y: 'r', value: undefined as unknown as number },
            { x: 'c', y: 'r', value: 500 }
          ]
        });
        await new Promise((r) => setTimeout(r, 300));
        assume(container.querySelectorAll('svg rect[role="presentation"]').length).equals(2);
        assume(container.querySelectorAll('svg rect[role="img"]').length).equals(1);
      });

      it('colors values above every bucket max with the last bucket and reports it to the tooltip', async function aboveMax() {
        const buckets: ColorBucket[] = [
          { min: 0, max: 100, color: '#dbeafe', label: '0–100' },
          { min: 100, max: 200, color: '#1e3a8a', label: '100–200' }
        ];
        let seen: string | undefined;
        const { container } = await renderHeatmap({
          data: [{ x: 'a', y: 'r', value: 999 }],
          colorBuckets: buckets,
          renderTooltip: function capture({ bucket }) {
            seen = bucket?.color;
            return <div data-testid="custom-tip">tip</div>;
          }
        });
        const cell = container.querySelector('rect[role="img"]') as Element;
        assume(cell.getAttribute('fill')).equals('#1e3a8a');
        await userEvent.hover(cell);
        await waitForSelector(document.body, '[data-testid="custom-tip"]');
        assume(seen).equals('#1e3a8a');
      });
    });

    describe('#keyboard', function keyboardTests() {
      it('shows the tooltip when a cell receives focus and hides it on blur', async function focusTooltip() {
        // Earlier tests leave the pointer resting where this chart renders; park it elsewhere so only focus drives the tooltip.
        await userEvent.unhover(document.body);
        const { container } = await renderHeatmap();
        const cell = container.querySelector('rect[role="img"]') as SVGRectElement;
        cell.focus();
        await waitForSelector(document.body, '[aria-label="Tooltip data"]');
        assume(document.body.querySelector('[aria-label="Tooltip data"]')).exists();
        cell.blur();
        await new Promise((r) => setTimeout(r, 400));
        assume(document.body.querySelector('[aria-label="Tooltip data"]')).is.a('null');
      });
    });

    describe('#keys and ids', function keysAndIdsTests() {
      it('renders every cell when category labels contain dashes', async function dashKeys() {
        const { container } = await renderHeatmap({
          data: [
            { x: 'a-b', y: 'c', value: 10 },
            { x: 'a', y: 'b-c', value: 20 }
          ],
          xDomain: ['a-b', 'a'],
          yDomain: ['c', 'b-c']
        });
        await new Promise((r) => setTimeout(r, 300));
        const cells = container.querySelectorAll('svg rect[rx]');
        assume(cells.length).equals(4);
      });

      it('gives each chart its own description id', async function uniqueDescIds() {
        const { container } = await render(
          <div style={{ width: '400px', height: '300px' }}>
            <HeatmapChart data={DEFAULT_DATA} colorBuckets={COLOR_BUCKETS} desc="first" />
            <HeatmapChart data={DEFAULT_DATA} colorBuckets={COLOR_BUCKETS} desc="second" />
          </div>
        );
        await waitForSelector(container, 'svg desc');
        const ids = Array.from(container.querySelectorAll('svg desc')).map((el) => el.id);
        assume(ids.length).equals(2);
        assume(ids[0]).does.not.equal(ids[1]);
      });
    });

    describe('#legend layout', function legendLayoutTests() {
      it('keeps the divider in the same list item as the closed label', async function dividerWithClosed() {
        const { container } = await renderHeatmap({ closedLabel: 'No Activity (0)' });
        const items = Array.from(container.querySelectorAll('[role="listitem"]'));
        const closed = items.find(
          (el) => el.textContent?.includes('No Activity (0)') && el.querySelector('[class*="legendDivider"]')
        );
        assume(closed).exists();
      });
    });

    describe('#sizing', function sizingTests() {
      const ROW_KEYS = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7'];
      const COLUMNS = ['c1', 'c2', 'c3', 'c4'];

      function gridData(rows: number, columns = COLUMNS) {
        return ROW_KEYS.slice(0, rows).flatMap((y) => columns.map((x) => ({ x, y, value: 10 })));
      }

      /** Renders with no height on the parent, so only the `height` prop (if any) sizes the chart. */
      async function renderSized(args: Partial<HeatmapChartProps> = {}, rows = 7) {
        const result = await renderAndWait(
          <div style={{ width: '800px' }}>
            <HeatmapChart data={gridData(rows)} colorBuckets={COLOR_BUCKETS} {...args} />
          </div>
        );
        await new Promise((r) => setTimeout(r, 500));
        return result;
      }

      function cellHeight(container: Element) {
        return container.querySelector('svg rect[rx]')!.getBoundingClientRect().height;
      }

      function area(container: Element) {
        return container.querySelector('svg')!.parentElement!;
      }

      function lowestXLabelBottom(container: Element) {
        const axes = Array.from(container.querySelectorAll('svg .visx-axis-bottom'));
        const labels = Array.from(axes[axes.length - 1].querySelectorAll('text'));
        return Math.max(...labels.map((label) => label.getBoundingClientRect().bottom));
      }

      describe('wrap content (no height)', function wrapContentTests() {
        it('renders without any height and uses minCellHeight 32 by default', async function naturalHeight() {
          const { container } = await renderSized();
          assume(Math.round(cellHeight(container))).equals(32);
        });

        it('uses a custom minCellHeight', async function customMinCellHeight() {
          const { container } = await renderSized({ minCellHeight: 48 });
          assume(Math.round(cellHeight(container))).equals(48);
        });

        it('is as tall as its rows and neither scrolls nor clips', async function noScrollNoClip() {
          const { container } = await renderSized();
          const el = area(container);
          assume(el.scrollHeight <= el.clientHeight + 1).is.true();
          assume(lowestXLabelBottom(container) <= el.getBoundingClientRect().top + el.clientHeight + 0.5).is.true();
        });

        it('is exactly one row tall for a single row', async function singleRowWrap() {
          const { container } = await renderSized({}, 1);
          assume(Math.round(cellHeight(container))).equals(32);
        });

        it('ignores maxCellHeight below minCellHeight', async function maxBelowMin() {
          const { container } = await renderSized({ maxCellHeight: 20 });
          assume(Math.round(cellHeight(container))).equals(32);
        });

        it('shrinks and grows as rows are removed and added', async function resizeWithRows() {
          function Harness() {
            const [rows, setRows] = useState(5);
            return (
              <div style={{ width: '600px' }}>
                <button type="button" data-testid="fewer" onClick={() => setRows(2)}>
                  fewer
                </button>
                <button type="button" data-testid="more" onClick={() => setRows(6)}>
                  more
                </button>
                <HeatmapChart data={gridData(rows)} colorBuckets={COLOR_BUCKETS} />
              </div>
            );
          }
          const { container } = await renderAndWait(<Harness />);
          await new Promise((r) => setTimeout(r, 500));
          const svgHeight = () => container.querySelector('svg')!.getBoundingClientRect().height;
          const before = svgHeight();
          (container.querySelector('[data-testid="fewer"]') as HTMLElement).click();
          await new Promise((r) => setTimeout(r, 600));
          const fewer = svgHeight();
          assume(fewer).is.below(before - 80);
          (container.querySelector('[data-testid="more"]') as HTMLElement).click();
          await new Promise((r) => setTimeout(r, 600));
          assume(svgHeight()).is.above(fewer + 100);
        });
      });

      describe('fixed height', function fixedHeightTests() {
        it('stretches rows to fill a larger height', async function stretchRows() {
          const { container } = await renderSized({ height: 500 });
          assume(cellHeight(container)).is.above(55);
        });

        it('treats height as the total, including axis and legend', async function heightIsTotal() {
          const { container } = await renderSized({ height: 500 });
          const root = container.querySelector('[class*="chart"]') as HTMLElement;
          assume(Math.round(root.getBoundingClientRect().height)).equals(500);
        });

        it('keeps minCellHeight and scrolls when the height is too small', async function scrollWhenSmall() {
          const { container } = await renderSized({ height: 120 });
          const el = area(container);
          assume(Math.round(cellHeight(container))).equals(32);
          assume(el.scrollHeight > el.clientHeight + 1).is.true();
        });

        it('keeps the x-axis labels pinned in view while scrolled', async function pinnedAxis() {
          const { container } = await renderSized({ height: 160 });
          const el = area(container);
          el.scrollTop = el.scrollHeight;
          await new Promise((r) => setTimeout(r, 300));
          assume(lowestXLabelBottom(container) <= el.getBoundingClientRect().top + el.clientHeight + 0.5).is.true();
        });

        it('lets a single row fill the height', async function singleRowFills() {
          const { container } = await renderSized({ height: 400 }, 1);
          assume(cellHeight(container)).is.above(250);
        });

        it('keeps the x-axis labels inside the chart at the fitted height', async function fittedNoClip() {
          const { container } = await renderSized({ height: 330 });
          const el = area(container);
          assume(lowestXLabelBottom(container) <= el.getBoundingClientRect().top + el.clientHeight + 0.5).is.true();
        });

        it('adjusts when the height changes', async function heightChanges() {
          function Harness() {
            const [height, setHeight] = useState(500);
            return (
              <div style={{ width: '600px' }}>
                <button type="button" data-testid="shorter" onClick={() => setHeight(330)}>
                  shorter
                </button>
                <HeatmapChart data={gridData(7)} colorBuckets={COLOR_BUCKETS} height={height} />
              </div>
            );
          }
          const { container } = await renderAndWait(<Harness />);
          await new Promise((r) => setTimeout(r, 500));
          const before = cellHeight(container);
          (container.querySelector('[data-testid="shorter"]') as HTMLElement).click();
          await new Promise((r) => setTimeout(r, 700));
          assume(cellHeight(container)).is.below(before - 10);
        });
      });

      describe('maxCellHeight', function maxCellHeightTests() {
        it('stops rows stretching past the maximum', async function capsRows() {
          const { container } = await renderSized({ height: 500, maxCellHeight: 40 });
          assume(Math.round(cellHeight(container))).equals(40);
        });

        it('ends the chart after the last row, with the legend following', async function endsAfterRows() {
          const { container } = await renderSized({ height: 500, maxCellHeight: 40 });
          // The root keeps the `height` it was given; the grid, axis and legend end early inside it.
          const svgHeight = container.querySelector('svg')!.getBoundingClientRect().height;
          const legend = container.querySelector('[role="list"]')!.getBoundingClientRect();
          const gridBottom = area(container).getBoundingClientRect().bottom;
          assume(svgHeight).is.below(400);
          assume(legend.top - gridBottom).is.below(24);
        });

        it('caps a single row in a tall chart', async function capsSingleRow() {
          const { container } = await renderSized({ height: 400, maxCellHeight: 48 }, 1);
          assume(Math.round(cellHeight(container))).equals(48);
        });

        it('does not affect rows that are below the maximum', async function belowMaxUnaffected() {
          const { container } = await renderSized({ height: 330, maxCellHeight: 200 });
          const without = (await renderSized({ height: 330 })).container;
          assume(Math.round(cellHeight(container))).equals(Math.round(cellHeight(without)));
        });
      });

      describe('align', function alignTests() {
        /** Space above the grid and below the legend, inside the chart's own box. */
        async function renderAligned(align?: 'start' | 'center' | 'end', args: Partial<HeatmapChartProps> = {}) {
          const { container } = await renderSized({ height: 400, maxCellHeight: 48, align, ...args }, 1);
          const root = container.querySelector('[class*="chart"]') as HTMLElement;
          const box = root.getBoundingClientRect();
          const cell = container.querySelector('svg rect[rx]')!.getBoundingClientRect();
          const legend = container.querySelector('[role="list"]')!.getBoundingClientRect();
          return { above: cell.top - box.top, below: box.bottom - legend.bottom };
        }

        it('keeps the chart at the top by default', async function alignDefault() {
          const { above, below } = await renderAligned();
          assume(above).is.below(10);
          assume(below).is.above(200);
        });

        it('keeps the chart at the top for start', async function alignStart() {
          const { above, below } = await renderAligned('start');
          assume(above).is.below(10);
          assume(below).is.above(200);
        });

        it('moves the chart to the bottom for end', async function alignEnd() {
          const { above, below } = await renderAligned('end');
          assume(below).is.below(10);
          assume(above).is.above(200);
        });

        it('splits the leftover space for center', async function alignCenter() {
          const { above, below } = await renderAligned('center');
          assume(Math.abs(above - below)).is.below(6);
          assume(above).is.above(100);
        });

        it('has no effect when the rows fill the height', async function alignNoEffect() {
          const start = await renderAligned('start', { maxCellHeight: undefined });
          const end = await renderAligned('end', { maxCellHeight: undefined });
          assume(Math.abs(start.above - end.above)).is.below(2);
          assume(Math.abs(start.below - end.below)).is.below(2);
        });
      });

      describe('with labels and legend toggled', function togglesTests() {
        it('sizes from its rows with the legend hidden', async function noLegendWrap() {
          const { container } = await renderSized({ colorLegend: false });
          assume(Math.round(cellHeight(container))).equals(32);
          assume(container.querySelector('[role="list"]')).is.a('null');
        });

        it('fills the height with the legend hidden', async function noLegendFixed() {
          const { container } = await renderSized({ colorLegend: false, height: 330 });
          assume(cellHeight(container)).is.above(35);
        });

        it('sizes from its rows in RTL', async function rtlWrap() {
          const { container } = await renderAndWait(
            <RTLProvider>
              <div style={{ width: '800px' }}>
                <HeatmapChart data={gridData(7)} colorBuckets={COLOR_BUCKETS} />
              </div>
            </RTLProvider>
          );
          await new Promise((r) => setTimeout(r, 500));
          assume(Math.round(cellHeight(container))).equals(32);
        });

        it('still scrolls horizontally with many columns in wrap-content mode', async function manyColumns() {
          const columns = Array.from({ length: 40 }, (_, i) => `col${i}`);
          const { container } = await renderAndWait(
            <div style={{ width: '500px' }}>
              <HeatmapChart data={gridData(2, columns)} colorBuckets={COLOR_BUCKETS} />
            </div>
          );
          await new Promise((r) => setTimeout(r, 500));
          const el = area(container);
          assume(el.scrollWidth > el.clientWidth + 1).is.true();
          assume(Math.round(cellHeight(container))).equals(32);
        });
      });
    });

    describe('#label spacing', function labelSpacingTests() {
      async function measureSpacing(args: Partial<HeatmapChartProps> = {}) {
        const { container } = await renderAndWait(
          <div style={{ width: '800px' }}>
            <HeatmapChart data={DEFAULT_DATA} colorBuckets={COLOR_BUCKETS} {...args} />
          </div>
        );
        await new Promise((r) => setTimeout(r, 500));
        const cells = Array.from(container.querySelectorAll('svg rect[rx]')).map((rect) =>
          rect.getBoundingClientRect()
        );
        const lastRowBottom = Math.max(...cells.map((cell) => cell.bottom));
        const yLabels = Array.from(container.querySelectorAll('svg .visx-axis-left text')).map((text) =>
          text.getBoundingClientRect()
        );
        const xAxes = Array.from(container.querySelectorAll('svg .visx-axis-bottom'));
        const xLabels = Array.from(xAxes[xAxes.length - 1].querySelectorAll('text')).map((text) =>
          text.getBoundingClientRect()
        );
        const xCenter = (Math.min(...xLabels.map((r) => r.top)) + Math.max(...xLabels.map((r) => r.bottom))) / 2;
        return {
          yLabelToCell: cells[0].left - Math.max(...yLabels.map((r) => r.right)),
          xLabelCenterBelowCell: xCenter - lastRowBottom
        };
      }

      it('leaves 8px between the y-axis labels and the first column', async function yLabelGap() {
        const { yLabelToCell } = await measureSpacing();
        assume(Math.abs(yLabelToCell - 8)).is.below(1);
      });

      it('keeps the y-axis label gap at 8px whatever the cellPadding', async function yGapAcrossPadding() {
        for (const cellPadding of [0, 8]) {
          const { yLabelToCell } = await measureSpacing({ cellPadding });
          assume(Math.abs(yLabelToCell - 8)).is.below(1);
        }
      });

      it('keeps the x-axis label gap the same whatever the cellPadding', async function xGapAcrossPadding() {
        const tight = await measureSpacing({ cellPadding: 0 });
        const loose = await measureSpacing({ cellPadding: 8 });
        assume(Math.abs(tight.xLabelCenterBelowCell - loose.xLabelCenterBelowCell)).is.below(1);
      });

      it('puts the x-axis labels close below the last row', async function xLabelGap() {
        const { xLabelCenterBelowCell } = await measureSpacing();
        assume(xLabelCenterBelowCell).is.above(12);
        assume(xLabelCenterBelowCell).is.below(22);
      });
    });

    describe('#default labels', function defaultLabelTests() {
      it('uses "No data" as the default closed label', async function defaultClosedLabel() {
        const { locator } = await renderHeatmap();
        assume(locator.getByText('No data').element()).exists();
      });
    });

    describe('#tooltip', function tooltipTests() {
      it('shows tooltip on cell hover', async function tooltipOnHover() {
        const { container } = await renderHeatmap({ tooltip: true });

        const cells = container.querySelectorAll('rect[role="img"]');
        assume(cells.length).is.above(0);

        await userEvent.hover(cells[0] as Element);
        await new Promise((r) => setTimeout(r, 20));

        const tip = document.body.querySelector('[aria-label="Tooltip data"]');
        assume(tip).exists();
      });

      it('does not show tooltip when tooltip is false', async function noTooltip() {
        const { container } = await renderHeatmap({ tooltip: false });

        const cells = container.querySelectorAll('rect[role="img"]');
        assume(cells.length).is.above(0);

        await userEvent.hover(cells[0] as Element);
        await new Promise((r) => setTimeout(r, 20));

        const tip = document.body.querySelector('[aria-label="Tooltip data"]');
        assume(tip).is.a('null');
      });

      it('shows the row and column label and value in the tooltip', async function tooltipRow() {
        const { container } = await renderHeatmap({ tooltip: true });

        const cells = container.querySelectorAll('rect[role="img"]');
        assume(cells.length).is.above(0);

        await userEvent.hover(cells[0] as Element);
        await waitForSelector(document.body, '[aria-label="Tooltip data"]');

        const tip = document.body.querySelector('[aria-label="Tooltip data"]');
        assume(tip).exists();
        // Row label is "row · column", followed by the value
        assume(tip!.textContent).contains('Morning · Mon');
        assume(tip!.textContent).contains('50');
      });

      it('formats the value with tooltipValueFormatter', async function tooltipFormatter() {
        const { container } = await renderHeatmap({
          tooltipValueFormatter: (d) => `${d.value} visitors`
        });

        const cells = container.querySelectorAll('rect[role="img"]');
        await userEvent.hover(cells[0] as Element);
        await waitForSelector(document.body, '[aria-label="Tooltip data"]');

        const tip = document.body.querySelector('[aria-label="Tooltip data"]');
        assume(tip!.textContent).contains('50 visitors');
      });

      it('shows the tooltip arrow for the built-in tooltip', async function tooltipArrow() {
        const { container } = await renderHeatmap();

        const cells = container.querySelectorAll('rect[role="img"]');
        await userEvent.hover(cells[0] as Element);
        await waitForSelector(document.body, '[aria-label="Tooltip data"]');

        const arrow = document.body.querySelector('[class*="tooltipArrow"]');
        assume(arrow).exists();
      });
    });

    describe('#accessibility', function accessibilityTests() {
      it('sets aria-label on the SVG element', async function ariaLabel() {
        const { container } = await renderHeatmap({ 'aria-label': 'Test heatmap' });
        const svg = container.querySelector('svg');
        assume(svg).exists();
        assume(svg!.getAttribute('aria-label')).equals('Test heatmap');
      });

      it('renders desc element inside SVG when desc prop is provided', async function descElement() {
        const { container } = await renderHeatmap({ desc: 'Chart description for screen readers' });
        const svg = container.querySelector('svg');
        assume(svg).exists();

        const descEl = svg?.querySelector('desc');
        assume(descEl).exists();
        assume(descEl!.textContent).equals('Chart description for screen readers');
        // The SVG is described by this element, via a per-instance id
        assume(svg!.getAttribute('aria-describedby')).equals(descEl!.id);
      });
    });

    describe('#dimensions', function dimensionTests() {
      it('applies custom width to the chart container', async function customWidth() {
        const { container } = await renderHeatmap({ width: 600 });
        const widthEl =
          container.querySelector('[style*="--chart-width: 600px"]') ??
          container.querySelector('[style*="--chart-width:600px"]');
        assume(widthEl ?? container.querySelector('svg')).exists();
      });

      it('applies custom height to the chart container', async function customHeight() {
        const { container } = await renderHeatmap({ height: 500 });
        const heightEl =
          container.querySelector('[style*="--chart-height: 500px"]') ??
          container.querySelector('[style*="--chart-height:500px"]');
        assume(heightEl ?? container.querySelector('svg')).exists();
      });
    });

    describe('#customTooltip', function customTooltipTests() {
      it('renders custom tooltip content on cell hover', async function customTooltipRender() {
        const { container } = await renderHeatmap({
          tooltip: true,
          renderTooltip: ({ x, y, value }) => (
            <div data-testid="custom-tip" data-x={String(x)} data-y={String(y)}>
              {value !== null ? String(value) : 'closed'}
            </div>
          )
        });

        const cells = container.querySelectorAll('rect[role="img"]');
        assume(cells.length).is.above(0);

        await userEvent.hover(cells[0] as Element);
        await waitForSelector(document.body, '[data-testid="custom-tip"]');

        const tip = document.body.querySelector('[data-testid="custom-tip"]');
        assume(tip).exists();
      });

      it('does not draw an arrow for custom tooltip content', async function customNoArrow() {
        const { container } = await renderHeatmap({
          renderTooltip: () => <div data-testid="custom-tip">custom</div>
        });

        const cells = container.querySelectorAll('rect[role="img"]');
        await userEvent.hover(cells[0] as Element);
        await waitForSelector(document.body, '[data-testid="custom-tip"]');

        assume(document.body.querySelector('[class*="tooltipArrow"]')).is.a('null');
      });
    });
  });
});
