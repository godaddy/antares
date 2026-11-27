import type React from 'react';
import { useState } from 'react';
import {
  HeatmapChart,
  HeatmapLegend,
  HeatmapPlot,
  HeatmapTooltip,
  type HeatmapChartProps,
  type ColorBucket
} from '../src';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { describe, it, vi } from 'vitest';
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

/**
 * Waits until the chart's layout has settled: the first margin measurement happens after mount (resize
 * debounce plus a frame), so the plot is only stable once its size has stopped changing for a few frames.
 */
async function layoutSettled(container: Element) {
  function readSize() {
    const svg = container.querySelector('svg');
    if (!svg) return '';
    return `${svg.getAttribute('width')}x${svg.getAttribute('height')}:${container.querySelector('g')?.getAttribute('transform')}`;
  }
  let last = '';
  let stable = 0;
  await vi.waitFor(
    async function sizeStopsChanging() {
      await nextFrame();
      const now = readSize();
      stable = now === last ? stable + 1 : 0;
      last = now;
      // The shared scroll hook debounces its parent measurement by 150ms (about 9 frames), so the size has to
      // hold for longer than that before it can be trusted.
      if (stable < 20) throw new Error(`layout still changing: ${now}`);
    },
    { timeout: 4000, interval: 16 }
  );
}

/** Waits for several frames, for checks that something does NOT happen and so have no condition to await. */
async function frames(count: number) {
  for (let i = 0; i < count; i++) await nextFrame();
}

/** Waits for a frame, so a layout or scroll change that was just made has been applied. */
function nextFrame() {
  return new Promise((r) => requestAnimationFrame(() => r(null)));
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

      const xAxis = container.querySelector('.visx-axis-bottom');
      assume(xAxis).exists();
    });

    it('hides X-axis when xLabels is false', async function noXLabels() {
      const { container } = await renderHeatmap({ xLabels: false });
      const svg = container.querySelector('svg');
      assume(svg).exists();

      const xAxis = container.querySelector('.visx-axis-bottom');
      assume(xAxis).is.a('null');
    });

    it('renders Y-axis (left) in LTR mode', async function yAxisLtr() {
      const { container } = await renderHeatmap();
      const svg = container.querySelector('svg');
      assume(svg).exists();

      const yAxis = container.querySelector('.visx-axis-left');
      assume(yAxis).exists();
    });

    it('renders Y-axis (right) in RTL mode', async function yAxisRtl() {
      const { container } = await renderHeatmap({}, { useRtlI18n: true });
      const svg = container.querySelector('svg');
      assume(svg).exists();

      const yAxis = container.querySelector('.visx-axis-right');
      assume(yAxis).exists();
    });

    describe('#tap target size', function tapTargetTests() {
      function cellBox(container: Element) {
        return container.querySelector('rect[role="img"]')!.getBoundingClientRect();
      }

      async function renderWide(args: Partial<HeatmapChartProps> = {}, width = 800) {
        const columns = Array.from({ length: 30 }, (_, i) => `c${i}`);
        const data = ['Mon', 'Tue', 'Wed'].flatMap((y) => columns.map((x, j) => ({ x, y, value: j * 10 })));
        const result = await renderAndWait(
          <div style={{ width: `${width}px` }}>
            <HeatmapChart data={data} colorBuckets={COLOR_BUCKETS} {...args} />
          </div>
        );
        await layoutSettled(result.container);
        return result;
      }

      it('gives every cell at least 40px of width and height by default', async function defaultTapTarget() {
        const { container } = await renderWide();
        const box = cellBox(container);
        assume(Math.round(box.width)).is.at.least(40);
        assume(Math.round(box.height)).is.at.least(40);
      });

      it('raises a minCellSize below 44 so the cell stays 40px wide', async function floorWidth() {
        const { container } = await renderWide({ minCellSize: 20 });
        assume(Math.round(cellBox(container).width)).is.at.least(40);
      });

      it('keeps the 40px floor when cellPadding changes', async function floorWithPadding() {
        const { container } = await renderWide({ cellPadding: 8, minCellSize: 10 });
        assume(Math.round(cellBox(container).width)).is.at.least(40);
      });

      for (const [name, width] of [
        ['mobile', 375],
        ['tablet', 768],
        ['desktop', 1280]
      ] as const) {
        it(`keeps cells at 40px or more at ${name} width`, async function tapTargetByWidth() {
          await page.viewport(width, 900);
          const { container } = await renderWide({}, width - 32);
          const box = cellBox(container);
          assume(Math.round(box.width)).is.at.least(40);
          assume(Math.round(box.height)).is.at.least(40);
        });
      }
    });

    describe('#optional parts and formatters', function optionalPartsTests() {
      it('opens the tooltip with both axes hidden', async function tooltipWithoutAxes() {
        const { container } = await renderHeatmap({ xLabels: false, yLabels: false });
        const cell = container.querySelector('rect[role="img"]') as SVGElement;
        cell.focus({ preventScroll: true });
        await waitForSelector(document.body, '[class*="tooltipContainer"]');
        assume(document.body.querySelector('[class*="tooltipContainer"]')).exists();
        assume(container.querySelector('.visx-axis-bottom')).is.a('null');
        assume(container.querySelector('.visx-axis-left')).is.a('null');
      });

      it('formats column labels with xTickFormat', async function xFormat() {
        const { container } = await renderHeatmap({ xTickFormat: (v) => `col-${String(v)}` });
        await layoutSettled(container);
        assume(container.querySelector('.visx-axis-bottom')?.textContent).contains('col-Mon');
      });

      it('shows no tooltip when the render function returns null', async function nullTooltip() {
        const { container } = await renderHeatmap({ renderTooltip: () => null });
        (container.querySelector('rect[role="img"]') as SVGElement).focus({ preventScroll: true });
        await frames(6);
        assume(document.body.querySelector('[class*="tooltipContainer"]')).is.a('null');
      });

      it('shows no tooltip when the render function returns false', async function falseTooltip() {
        const { container } = await renderHeatmap({ renderTooltip: () => false });
        (container.querySelector('rect[role="img"]') as SVGElement).focus({ preventScroll: true });
        await frames(6);
        assume(document.body.querySelector('[class*="tooltipContainer"]')).is.a('null');
      });
    });

    describe('#axis label styles', function axisStyleTests() {
      it('styles tick labels and keeps tick marks invisible', async function labelStyles() {
        const { container } = await renderHeatmap();
        await layoutSettled(container);
        const label = container.querySelector('.visx-axis-bottom text') as SVGTextElement;
        const style = getComputedStyle(label);
        assume(style.fontSize).does.not.equal('');
        assume(style.fill).does.not.equal('none');
        const tick = container.querySelector('.visx-axis-bottom .visx-axis-tick line') as SVGLineElement;
        assume(getComputedStyle(tick).stroke).matches(/transparent|rgba\(0, 0, 0, 0\)/);
      });

      it('thickens a hovered label with a stroke instead of a bolder weight', async function hoveredLabel() {
        const { container } = await renderHeatmap();
        await layoutSettled(container);
        const label = container.querySelector('.visx-axis-bottom text') as SVGTextElement;
        const before = getComputedStyle(label);
        assume(before.strokeWidth === '0px' || before.stroke === 'none').is.true();
        await userEvent.hover(container.querySelector('rect[role="img"]') as Element);
        await nextFrame();
        const hovered = [...container.querySelectorAll('.visx-axis-bottom text')].find(
          (t) => getComputedStyle(t).strokeWidth !== '0px' && getComputedStyle(t).stroke !== 'none'
        );
        assume(hovered).exists();
        assume(getComputedStyle(hovered as Element).fontWeight).equals(before.fontWeight);
      });
    });

    describe('#hover layout', function hoverLayoutTests() {
      it('does not move or resize the grid when a cell is hovered', async function noHoverShift() {
        const data = ['Mon', 'Tuesday long label', 'Wed'].flatMap((y, i) =>
          ['8am', '9am', '10am'].map((x, j) => ({ x, y, value: i * 100 + j * 10 }))
        );
        const { container } = await renderHeatmap({ data });
        await layoutSettled(container);
        const svg = container.querySelector('svg') as SVGSVGElement;
        const cells = [...container.querySelectorAll('rect[role="img"]')] as SVGElement[];
        // Measured in the SVG's own coordinates: hovering can scroll the page in a small viewport, which
        // moves everything on screen without the grid itself changing.
        function layout() {
          return {
            plotOffset: svg.querySelector('g')!.getAttribute('transform'),
            svgWidth: svg.getAttribute('width'),
            cells: cells.map((c) => [c.getAttribute('x'), c.getAttribute('y'), c.getAttribute('width')])
          };
        }
        const before = layout();
        for (const index of [0, 4, 8]) {
          await userEvent.hover(cells[index]);
          await frames(8);
          assume(layout()).eql(before);
        }
      });
    });

    describe('#tooltip while scrolling', function tooltipScrollTests() {
      it('keeps the tooltip on its cell when the plot scrolls', async function tooltipFollowsCell() {
        const hours = Array.from({ length: 24 }, (_, h) => `${h}h`);
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const data = days.flatMap((y, i) => hours.map((x, j) => ({ x, y, value: (i * 7 + j * 13) % 400 })));
        const { container } = await renderAndWait(
          <div style={{ width: '500px', height: '260px' }}>
            <HeatmapChart data={data} colorBuckets={COLOR_BUCKETS} colorLegend={false} />
          </div>
        );
        await layoutSettled(container);
        const cell = [...container.querySelectorAll('rect[role="img"]')][30] as SVGElement;
        const area = container.querySelector('svg')!.closest('[class*="area"]') as HTMLElement;
        // Keyboard focus has no pointer to re-target after a scroll, so only the tooltip's own anchoring can
        // keep it on the cell (a hovered cell is re-targeted by the browser's own pointer events).
        cell.focus({ preventScroll: true });
        await waitForSelector(document.body, '[class*="tooltipContainer"]');
        const tip = () => document.body.querySelector('[class*="tooltipContainer"]') as HTMLElement | null;

        function gap() {
          const c = cell.getBoundingClientRect();
          const t = tip()!.getBoundingClientRect();
          return { dx: t.left + t.width / 2 - (c.left + c.width / 2), dy: t.bottom - c.top };
        }
        const before = gap();
        area.scrollLeft += 40;
        await vi.waitFor(function followsCell() {
          assume(tip()).exists();
          const after = gap();
          assume(Math.abs(after.dx - before.dx)).is.below(2);
          assume(Math.abs(after.dy - before.dy)).is.below(2);
        });
      });

      it('closes the tooltip when its cell scrolls out of view', async function tooltipClosesOutOfView() {
        const hours = Array.from({ length: 24 }, (_, h) => `${h}h`);
        const data = ['Mon', 'Tue'].flatMap((y, i) => hours.map((x, j) => ({ x, y, value: i * 50 + j })));
        const { container } = await renderAndWait(
          <div style={{ width: '400px', height: '200px' }}>
            <HeatmapChart data={data} colorBuckets={COLOR_BUCKETS} colorLegend={false} />
          </div>
        );
        await layoutSettled(container);
        const cells = [...container.querySelectorAll('rect[role="img"]')] as SVGElement[];
        const area = container.querySelector('svg')!.closest('[class*="area"]') as HTMLElement;
        cells[0].focus({ preventScroll: true });
        await waitForSelector(document.body, '[class*="tooltipContainer"]');
        area.scrollLeft = area.scrollWidth;
        await vi.waitFor(function closes() {
          assume(document.body.querySelector('[class*="tooltipContainer"]')).is.a('null');
        });
      });
    });

    describe('#tooltip input modes', function inputModeTests() {
      const tipSelector = '[class*="tooltipContainer"]';
      const tapData = [
        { x: 'Mon', y: 'AM', value: 50 },
        { x: 'Tue', y: 'AM', value: 150 }
      ];

      function tapChart(content?: (props: { value: number | null }) => React.ReactNode) {
        return (
          <div style={{ width: '600px', height: '300px' }}>
            <HeatmapChart data={tapData} colorBuckets={COLOR_BUCKETS}>
              <HeatmapPlot />
              <HeatmapTooltip>{content}</HeatmapTooltip>
            </HeatmapChart>
          </div>
        );
      }

      // The order a phone sends for one tap, recorded from real touch input in Chrome: pointerover,
      // pointerenter, pointerdown, pointerup, pointerout, pointerleave, then focus and click.
      // The pointer leaves before the cell gets focus, so the tooltip is hidden and then shown again.
      function tap(el: Element) {
        const r = el.getBoundingClientRect();
        const init = {
          bubbles: true,
          pointerType: 'touch',
          isPrimary: true,
          clientX: r.x + r.width / 2,
          clientY: r.y + r.height / 2
        };
        el.dispatchEvent(new PointerEvent('pointerover', init));
        el.dispatchEvent(new PointerEvent('pointerenter', { ...init, bubbles: false }));
        el.dispatchEvent(new PointerEvent('pointerdown', init));
        el.dispatchEvent(new PointerEvent('pointerup', init));
        el.dispatchEvent(new PointerEvent('pointerout', init));
        el.dispatchEvent(new PointerEvent('pointerleave', { ...init, bubbles: false }));
        (el as SVGElement).focus({ preventScroll: true });
        el.dispatchEvent(new MouseEvent('click', init));
      }

      it('keeps the built-in tooltip open after a tap, once the finger lifts', async function builtInTap() {
        const { container } = await renderAndWait(tapChart());
        tap(container.querySelector('rect[role="img"]') as Element);
        await frames(8);
        assume(document.body.querySelector(tipSelector)).exists();
      });

      it('keeps a custom tooltip open after a tap', async function customTap() {
        const { container } = await renderAndWait(
          tapChart(({ value }) => <span data-testid="tap-tip">{value} visitors</span>)
        );
        tap(container.querySelector('rect[role="img"]') as Element);
        await frames(8);
        assume(document.body.querySelector('[data-testid="tap-tip"]')?.textContent).contains('visitors');
      });

      it('moves the tooltip to the next tapped cell', async function tapNext() {
        const { container } = await renderAndWait(tapChart(({ value }) => <span data-testid="tap-tip">{value}</span>));
        const cells = container.querySelectorAll('rect[role="img"]');
        tap(cells[0]);
        await frames(6);
        tap(cells[1]);
        await vi.waitFor(function moved() {
          assume(document.body.querySelector('[data-testid="tap-tip"]')?.textContent).equals('150');
        });
        assume(document.body.querySelector('[data-testid="tap-tip"]')?.textContent).equals('150');
      });

      it('dismisses the tooltip when the tap lands outside the chart', async function tapOutside() {
        const { container } = await renderAndWait(tapChart());
        tap(container.querySelector('rect[role="img"]') as Element);
        await frames(6);
        (document.activeElement as HTMLElement).blur();
        await vi.waitFor(function dismissed() {
          assume(document.body.querySelector(tipSelector)).is.a('null');
        });
        assume(document.body.querySelector(tipSelector)).is.a('null');
      });

      it('shows the custom tooltip on keyboard focus, and hides it on blur', async function customFocus() {
        const { container } = await renderAndWait(
          tapChart(({ value }) => <span data-testid="focus-tip">{value}</span>)
        );
        const cell = container.querySelector('rect[role="img"]') as SVGElement;
        cell.focus({ preventScroll: true });
        await waitForSelector(document.body, '[data-testid="focus-tip"]');
        assume(document.body.querySelector('[data-testid="focus-tip"]')?.textContent).equals('50');
        cell.blur();
        await vi.waitFor(function hidden() {
          assume(document.body.querySelector('[data-testid="focus-tip"]')).is.a('null');
        });
      });

      it('moves the custom tooltip with Tab between cells', async function tabBetweenCells() {
        await renderAndWait(tapChart(({ value }) => <span data-testid="focus-tip">{value}</span>));
        await userEvent.tab();
        await waitForSelector(document.body, '[data-testid="focus-tip"]');
        const first = document.body.querySelector('[data-testid="focus-tip"]')?.textContent;
        await userEvent.tab();
        await vi.waitFor(function moved() {
          assume(document.body.querySelector('[data-testid="focus-tip"]')?.textContent).does.not.equal(first);
        });
      });
    });

    describe('#composition legend and RTL', function compositionLegendTests() {
      const wide = ['0–10', '10–20', '20–30', '30–40', '40–50', '50–60', '60–70'].map((label, i) => ({
        min: i * 10,
        max: i === 6 ? null : (i + 1) * 10,
        color: `hsl(${180 + i * 8} 60% ${85 - i * 8}%)`,
        label
      }));
      const data = [
        { x: 'Mon', y: 'AM', value: 5 },
        { x: 'Tue', y: 'AM', value: 35 }
      ];

      function composedLegend(width: number, rtl = false) {
        const chart = (
          <div style={{ width: `${width}px`, height: '300px' }}>
            <HeatmapChart data={data} colorBuckets={wide} colorLegendLabel="Visitors per two-hour window">
              <HeatmapPlot />
              <HeatmapLegend />
              <HeatmapTooltip>{({ value }) => <span data-testid="rtl-tip">{value} visitors</span>}</HeatmapTooltip>
            </HeatmapChart>
          </div>
        );
        return rtl ? <RTLProvider>{chart}</RTLProvider> : chart;
      }

      it('wraps the legend entries onto several lines on a narrow screen', async function wrapsNarrow() {
        await page.viewport(375, 800);
        const { container } = await renderAndWait(composedLegend(343));
        const legend = container.querySelector('[role="list"]') as HTMLElement;
        const entries = [...legend.querySelectorAll('[role="listitem"]')] as HTMLElement[];
        const rows = new Set(entries.map((el) => Math.round(el.getBoundingClientRect().top)));
        assume(rows.size).is.above(1);
        // Wrapping keeps every entry inside the legend instead of running off its edge.
        const box = legend.getBoundingClientRect();
        for (const el of entries) {
          assume(el.getBoundingClientRect().right).is.at.most(box.right + 1);
          assume(el.getBoundingClientRect().left).is.at.least(box.left - 1);
        }
        assume(getComputedStyle(legend).flexWrap).equals('wrap');
      });

      it('keeps the legend entries on one line when there is room', async function oneLineWide() {
        await page.viewport(1280, 800);
        const { container } = await renderAndWait(composedLegend(1200));
        const entries = [...container.querySelectorAll('[role="list"] [role="listitem"]')] as HTMLElement[];
        assume(new Set(entries.map((el) => Math.round(el.getBoundingClientRect().top))).size).equals(1);
      });

      it('never wraps the divider onto a line of its own', async function dividerNotAlone() {
        await page.viewport(375, 800);
        const { container } = await renderAndWait(composedLegend(343));
        const divider = container.querySelector('[class*="legendDivider"]') as HTMLElement;
        const closedEntry = divider.parentElement as HTMLElement;
        const label = closedEntry.querySelector('[class*="legendSwatchClosed"]') as HTMLElement;
        assume(Math.abs(divider.getBoundingClientRect().top - label.getBoundingClientRect().top)).is.below(8);
      });

      it('mirrors the legend and the tooltip in RTL', async function legendRtl() {
        await page.viewport(800, 800);
        const { container } = await renderAndWait(composedLegend(700, true));
        const legend = container.querySelector('[role="list"]') as HTMLElement;
        const chart = container.querySelector('[class*="chart"]') as HTMLElement;
        assume(chart.getAttribute('dir')).equals('rtl');
        // The first bucket sits to the right of the last one: entries read right to left.
        const swatches = [...legend.querySelectorAll('[class*="legendSwatch"]')] as HTMLElement[];
        assume(swatches[0].getBoundingClientRect().left).is.above(swatches[3].getBoundingClientRect().left);
        // The legend stays inside the chart.
        assume(legend.getBoundingClientRect().left).is.at.least(chart.getBoundingClientRect().left - 1);
        assume(legend.getBoundingClientRect().right).is.at.most(chart.getBoundingClientRect().right + 1);
        const cell = container.querySelector('rect[role="img"]') as SVGElement;
        cell.focus({ preventScroll: true });
        await waitForSelector(document.body, '[data-testid="rtl-tip"]');
        const tip = document.body.querySelector('[data-testid="rtl-tip"]')!.getBoundingClientRect();
        const target = cell.getBoundingClientRect();
        assume(Math.abs(tip.left + tip.width / 2 - (target.left + target.width / 2))).is.below(40);
      });
    });

    describe('#pinned axes while scrolling', function pinnedAxesTests() {
      function renderScrolling(rtl = false) {
        const hours = Array.from({ length: 24 }, (_, h) => `${h}h`);
        const days = Array.from({ length: 14 }, (_, i) => `Day ${i + 1}`);
        const data = days.flatMap((y, i) => hours.map((x, j) => ({ x, y, value: (i * 7 + j * 13) % 400 })));
        const chart = (
          <div style={{ width: '500px', height: '260px' }}>
            <HeatmapChart data={data} colorBuckets={COLOR_BUCKETS} colorLegend={false} />
          </div>
        );
        return renderAndWait(rtl ? <RTLProvider>{chart}</RTLProvider> : chart);
      }

      async function settle(container: Element) {
        await layoutSettled(container);
      }

      it('keeps both axis layers at the viewport edges while scrolling', async function layersStayPinned() {
        const { container } = await renderScrolling();
        await settle(container);
        const area = container.querySelector('svg')!.closest('[class*="area"]') as HTMLElement;
        const xLayer = container.querySelector('[class*="xAxisLayer"]') as HTMLElement;
        const yLayer = container.querySelector('[class*="yAxisLayer"]') as HTMLElement;
        function edges() {
          const a = area.getBoundingClientRect();
          return {
            yLeft: Math.round(yLayer.getBoundingClientRect().left - a.left),
            xBottom: Math.round(xLayer.getBoundingClientRect().bottom - (a.top + area.clientHeight))
          };
        }
        const rest = edges();
        for (const [left, top] of [
          [60, 40],
          [200, 120]
        ]) {
          area.scrollLeft = left;
          area.scrollTop = top;
          // Sticky positioning needs no scroll handler, so the very next frame already has it in place.
          await new Promise((r) => requestAnimationFrame(() => r(null)));
          assume(edges()).eql(rest);
        }
      });

      it('never draws a cell over the row labels or the column labels', async function noCellUnderAxes() {
        const { container } = await renderScrolling();
        await settle(container);
        const area = container.querySelector('svg')!.closest('[class*="area"]') as HTMLElement;
        area.scrollLeft = 150;
        area.scrollTop = 80;
        await new Promise((r) => requestAnimationFrame(() => r(null)));
        const yRect = container.querySelector('[class*="yAxisLayer"]')!.getBoundingClientRect();
        const xRect = container.querySelector('[class*="xAxisLayer"]')!.getBoundingClientRect();
        // Whatever is on top at a point just past the label column is a cell, never the axis layer.
        const probeY = area.getBoundingClientRect().top + 40;
        const pointBesideLabels = document.elementFromPoint(yRect.right + 4, probeY);
        assume(pointBesideLabels?.getAttribute('role')).equals('img');
        const pointInLabels = document.elementFromPoint(yRect.left + 4, probeY);
        assume(pointInLabels?.closest('[class*="yAxisLayer"]')).exists();
        const pointBelowCells = document.elementFromPoint(area.getBoundingClientRect().left + 200, xRect.top + 4);
        assume(pointBelowCells?.closest('[class*="xAxisLayer"]')).exists();
      });

      it('hides the label of a partly visible row under the column labels', async function noLabelInStrip() {
        const { container } = await renderScrolling();
        await settle(container);
        const area = container.querySelector('svg')!.closest('[class*="area"]') as HTMLElement;
        const xRect = container.querySelector('[class*="xAxisLayer"]')!.getBoundingClientRect();
        const yRect = container.querySelector('[class*="yAxisLayer"]')!.getBoundingClientRect();
        // Scroll so a row is cut by the strip, then probe inside the strip beside the row labels.
        for (const top of [0, 25, 47, 90]) {
          area.scrollTop = top;
          await new Promise((r) => requestAnimationFrame(() => r(null)));
          const a = area.getBoundingClientRect();
          const stripTop = container.querySelector('[class*="xAxisLayer"]')!.getBoundingClientRect().top;
          for (const dx of [4, yRect.width / 2, yRect.width - 4]) {
            const hit = document.elementFromPoint(a.left + dx, stripTop + 6);
            assume(hit?.closest('[class*="yAxisLayer"]')).is.a('null');
          }
        }
        assume(xRect.height).is.above(0);
      });

      it('fits every row label inside the pinned layer in RTL', async function rtlLabelsFit() {
        const { container } = await renderScrolling(true);
        await settle(container);
        const layer = container.querySelector('[class*="yAxisLayer"]') as HTMLElement;
        const box = layer.getBoundingClientRect();
        const labels = [...layer.querySelectorAll('text')];
        assume(labels.length).is.above(0);
        for (const label of labels) {
          const r = label.getBoundingClientRect();
          assume(r.left).is.at.least(box.left - 0.5);
          assume(r.right).is.at.most(box.right + 0.5);
        }
      });

      it('fits every row label inside the pinned layer in LTR', async function ltrLabelsFit() {
        const { container } = await renderScrolling();
        await settle(container);
        const layer = container.querySelector('[class*="yAxisLayer"]') as HTMLElement;
        const box = layer.getBoundingClientRect();
        for (const label of layer.querySelectorAll('text')) {
          const r = label.getBoundingClientRect();
          assume(r.left).is.at.least(box.left - 0.5);
          assume(r.right).is.at.most(box.right + 0.5);
        }
      });

      it('pins the row labels to the right edge in RTL', async function rtlPinned() {
        const { container } = await renderScrolling(true);
        await settle(container);
        const area = container.querySelector('svg')!.closest('[class*="area"]') as HTMLElement;
        const yLayer = container.querySelector('[class*="yAxisLayer"]') as HTMLElement;
        area.scrollLeft = -150;
        await new Promise((r) => requestAnimationFrame(() => r(null)));
        const a = area.getBoundingClientRect();
        assume(Math.round(a.right - yLayer.getBoundingClientRect().right)).equals(0);
      });
    });

    describe('#rtl column order', function rtlOrderTests() {
      it('runs columns right to left, starting beside the row labels', async function rtlColumns() {
        const { container } = await renderHeatmap({}, { useRtlI18n: true });
        const first = container.querySelector('rect[role="img"]') as SVGElement;
        const ticks = [...container.querySelector('.visx-axis-bottom')!.querySelectorAll('.visx-axis-tick text')];
        const monX = ticks.find((t) => t.textContent === 'Mon')!.getBoundingClientRect().x;
        const tueX = ticks.find((t) => t.textContent === 'Tue')!.getBoundingClientRect().x;
        assume(monX).is.above(tueX);
        const yAxisX = container.querySelector('.visx-axis-right')!.getBoundingClientRect().x;
        assume(first.getBoundingClientRect().x).is.below(yAxisX);
        assume(first.getBoundingClientRect().right).is.above(tueX);
      });

      it('keeps columns left to right in LTR', async function ltrColumns() {
        const { container } = await renderHeatmap();
        const ticks = [...container.querySelector('.visx-axis-bottom')!.querySelectorAll('.visx-axis-tick text')];
        const monX = ticks.find((t) => t.textContent === 'Mon')!.getBoundingClientRect().x;
        const tueX = ticks.find((t) => t.textContent === 'Tue')!.getBoundingClientRect().x;
        assume(monX).is.below(tueX);
      });
    });

    describe('#axis labels', function axisLabelTests() {
      it('labels every column and row of a large grid', async function allLabels() {
        const hours = Array.from({ length: 24 }, (_, h) => `${h}h`);
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const data = days.flatMap((y, i) => hours.map((x, j) => ({ x, y, value: (i * 7 + j) % 400 })));
        const { container } = await renderHeatmap({ data });
        const xTicks = container.querySelector('.visx-axis-bottom')?.querySelectorAll('.visx-axis-tick');
        const yTicks = container.querySelector('.visx-axis-left')?.querySelectorAll('.visx-axis-tick');
        assume(xTicks!.length).equals(24);
        assume(yTicks!.length).equals(7);
      });
    });

    describe('#composition', function compositionTests() {
      function composed(args: Partial<HeatmapChartProps> = {}) {
        return (
          <div style={{ width: '100%', height: '400px' }}>
            <HeatmapChart data={DEFAULT_DATA} colorBuckets={COLOR_BUCKETS} {...args}>
              <header data-testid="title">
                <h2 id="composed-title">Weekly activity</h2>
                <HeatmapLegend label="Visitors" />
              </header>
              <HeatmapPlot />
              <footer data-testid="footer">Visitors per window</footer>
              <HeatmapTooltip>{({ value }) => <span data-testid="composed-tip">{value} visitors</span>}</HeatmapTooltip>
            </HeatmapChart>
          </div>
        );
      }

      it('renders only the given children instead of the default layout', async function onlyChildren() {
        const { container } = await renderAndWait(composed());
        assume(container.querySelectorAll('[role="list"]').length).equals(1);
        assume(container.querySelector('[data-testid="footer"]')).exists();
        assume(container.querySelector('svg')).exists();
      });

      it('places the legend where it is rendered', async function legendPlacement() {
        const { container } = await renderAndWait(composed());
        const title = container.querySelector('[data-testid="title"]') as HTMLElement;
        assume(title.querySelector('[role="list"]')).exists();
      });

      it('uses the legend label prop over the chart label', async function legendLabel() {
        const { container } = await renderAndWait(composed({ colorLegendLabel: 'Chart label' }));
        assume(container.querySelector('[role="list"]')?.getAttribute('aria-label')).equals('Visitors');
      });

      it('falls back to the chart color legend label and closed label', async function legendFallback() {
        const { container } = await renderAndWait(
          <div style={{ width: '800px', height: '400px' }}>
            <HeatmapChart
              data={DEFAULT_DATA}
              colorBuckets={COLOR_BUCKETS}
              colorLegendLabel="From chart"
              closedLabel="Nothing"
            >
              <HeatmapPlot />
              <HeatmapLegend />
            </HeatmapChart>
          </div>
        );
        const legend = container.querySelector('[role="list"]') as HTMLElement;
        assume(legend.getAttribute('aria-label')).equals('From chart');
        assume(legend.textContent).contains('Nothing');
      });

      it('shows the tooltip render function content on hover', async function composedTooltip() {
        const { container } = await renderAndWait(composed());
        const cells = container.querySelectorAll('rect[role="img"]');
        await userEvent.hover(cells[0] as Element);
        await waitForSelector(document.body, '[data-testid="composed-tip"]');
        assume(document.body.querySelector('[data-testid="composed-tip"]')?.textContent).contains('visitors');
      });

      it('shows the built-in tooltip on keyboard focus when no render function is given', async function builtInOnFocus() {
        const { container } = await renderAndWait(
          <div style={{ width: '800px', height: '400px' }}>
            <HeatmapChart data={DEFAULT_DATA} colorBuckets={COLOR_BUCKETS}>
              <HeatmapPlot />
              <HeatmapTooltip />
            </HeatmapChart>
          </div>
        );
        (container.querySelector('rect[role="img"]') as SVGElement).focus();
        await waitForSelector(document.body, '[class*="tooltipContainer"]');
        assume(document.body.querySelector('[class*="tooltipContainer"]')).exists();
      });

      it('shows no tooltip without a HeatmapTooltip part', async function noTooltipPart() {
        const { container } = await renderAndWait(
          <div style={{ width: '800px', height: '400px' }}>
            <HeatmapChart data={DEFAULT_DATA} colorBuckets={COLOR_BUCKETS}>
              <HeatmapPlot />
            </HeatmapChart>
          </div>
        );
        await userEvent.hover(container.querySelector('rect[role="img"]') as Element);
        assume(document.body.querySelector('[class*="tooltipContainer"]')).is.a('null');
      });

      it('passes aria-labelledby to the svg', async function labelledBy() {
        const { container } = await renderAndWait(composed({ 'aria-labelledby': 'composed-title' }));
        assume(container.querySelector('svg')?.getAttribute('aria-labelledby')).equals('composed-title');
      });

      it('throws when a part is used outside a HeatmapChart', async function outsideChart() {
        const original = console.error;
        console.error = function silence() {
          // The thrown error is the expected outcome; React also logs it.
        };
        let message = '';
        try {
          await render(<HeatmapPlot />);
        } catch (error) {
          message = (error as Error).message;
        } finally {
          console.error = original;
        }
        assume(message).contains('HeatmapPlot must be rendered inside a HeatmapChart');
      });

      for (const [name, width] of [
        ['mobile', 375],
        ['tablet', 768],
        ['desktop', 1280]
      ] as const) {
        it(`keeps the composed legend inside the chart at ${name} width`, async function composedWidths() {
          await page.viewport(width, 800);
          const { container } = await renderAndWait(composed());
          const chart = container.firstElementChild as HTMLElement;
          const legend = container.querySelector('[role="list"]') as HTMLElement;
          assume(legend.getBoundingClientRect().right).is.at.most(chart.getBoundingClientRect().right + 1);
          assume(container.scrollWidth).is.at.most(width + 1);
        });
      }

      it('mirrors the composed chart in RTL', async function composedRtl() {
        const { container } = await renderAndWait(<RTLProvider>{composed()}</RTLProvider>);
        assume(container.querySelector('.visx-axis-right')).exists();
        assume(container.querySelector('[role="list"]')).exists();
      });
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
        await layoutSettled(container);

        const area = container.querySelector('svg')!.closest('[class*="area"]') as HTMLElement;
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
        await layoutSettled(container);
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
        await layoutSettled(container);
        const text = container.textContent ?? '';
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
        await layoutSettled(container);
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
        await vi.waitFor(function hidden() {
          assume(document.body.querySelector('[aria-label="Tooltip data"]')).is.a('null');
        });
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
        await layoutSettled(container);
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
        await layoutSettled(result.container);
        return result;
      }

      function cellHeight(container: Element) {
        return container.querySelector('svg rect[rx]')!.getBoundingClientRect().height;
      }

      function area(container: Element) {
        return container.querySelector('svg')!.closest('[class*="area"]') as HTMLElement;
      }

      function lowestXLabelBottom(container: Element) {
        const axes = Array.from(container.querySelectorAll('.visx-axis-bottom'));
        const labels = Array.from(axes[axes.length - 1].querySelectorAll('text'));
        return Math.max(...labels.map((label) => label.getBoundingClientRect().bottom));
      }

      describe('wrap content (no height)', function wrapContentTests() {
        it('renders without any height and uses minCellHeight 40 by default', async function naturalHeight() {
          const { container } = await renderSized();
          assume(Math.round(cellHeight(container))).equals(40);
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
          assume(Math.round(cellHeight(container))).equals(40);
        });

        it('raises a minCellHeight below 40 to the tap target size', async function floorHeight() {
          const { container } = await renderSized({ minCellHeight: 24 });
          assume(Math.round(cellHeight(container))).equals(40);
        });

        it('ignores maxCellHeight below minCellHeight', async function maxBelowMin() {
          const { container } = await renderSized({ maxCellHeight: 20 });
          assume(Math.round(cellHeight(container))).equals(40);
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
          await layoutSettled(container);
          const svgHeight = () => container.querySelector('svg')!.getBoundingClientRect().height;
          const before = svgHeight();
          (container.querySelector('[data-testid="fewer"]') as HTMLElement).click();
          await vi.waitFor(function shrinks() {
            assume(svgHeight()).is.below(before - 80);
          });
          const fewer = svgHeight();
          (container.querySelector('[data-testid="more"]') as HTMLElement).click();
          await vi.waitFor(function grows() {
            assume(svgHeight()).is.above(fewer + 100);
          });
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
          assume(Math.round(cellHeight(container))).equals(40);
          assume(el.scrollHeight > el.clientHeight + 1).is.true();
        });

        it('keeps the x-axis labels pinned in view while scrolled', async function pinnedAxis() {
          const { container } = await renderSized({ height: 160 });
          const el = area(container);
          el.scrollTop = el.scrollHeight;
          await nextFrame();
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
          await layoutSettled(container);
          const before = cellHeight(container);
          (container.querySelector('[data-testid="shorter"]') as HTMLElement).click();
          await vi.waitFor(function shorter() {
            assume(cellHeight(container)).is.below(before - 10);
          });
        });
      });

      describe('maxCellHeight', function maxCellHeightTests() {
        it('stops rows stretching past the maximum', async function capsRows() {
          const { container } = await renderSized({ height: 500, maxCellHeight: 56 });
          assume(Math.round(cellHeight(container))).equals(56);
        });

        it('ends the chart after the last row, with the legend following', async function endsAfterRows() {
          const { container } = await renderSized({ height: 500, maxCellHeight: 56 });
          // The root keeps the `height` it was given; the grid, axis and legend end early inside it.
          const svgHeight = container.querySelector('svg')!.getBoundingClientRect().height;
          const legend = container.querySelector('[role="list"]')!.getBoundingClientRect();
          const gridBottom = area(container).getBoundingClientRect().bottom;
          // 7 rows at the 56px cap, plus the 4px gaps and the axis: well short of the 500px the root was given.
          assume(svgHeight).is.below(480);
          assume(legend.top - gridBottom).is.below(24);
        });

        it('caps a single row in a tall chart', async function capsSingleRow() {
          const { container } = await renderSized({ height: 400, maxCellHeight: 64 }, 1);
          assume(Math.round(cellHeight(container))).equals(64);
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
          assume(Math.round(cellHeight(container))).equals(40);
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
          await vi.waitFor(function rtlHeight() {
            assume(Math.round(cellHeight(container))).equals(40);
          });
        });

        it('still scrolls horizontally with many columns in wrap-content mode', async function manyColumns() {
          const columns = Array.from({ length: 40 }, (_, i) => `col${i}`);
          const { container } = await renderAndWait(
            <div style={{ width: '500px' }}>
              <HeatmapChart data={gridData(2, columns)} colorBuckets={COLOR_BUCKETS} />
            </div>
          );
          await layoutSettled(container);
          const el = area(container);
          assume(el.scrollWidth > el.clientWidth + 1).is.true();
          assume(Math.round(cellHeight(container))).equals(40);
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
        await layoutSettled(container);
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
        await waitForSelector(document.body, '[aria-label="Tooltip data"]');

        const tip = document.body.querySelector('[aria-label="Tooltip data"]');
        assume(tip).exists();
      });

      it('does not show tooltip when tooltip is false', async function noTooltip() {
        const { container } = await renderHeatmap({ tooltip: false });

        const cells = container.querySelectorAll('rect[role="img"]');
        assume(cells.length).is.above(0);

        await userEvent.hover(cells[0] as Element);
        await frames(6);

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
