import { useEffect, useRef, useState, type RefObject } from 'react';
import { useParentSize } from '@visx/responsive';
import type { Margin } from '@visx/xychart';
import { useLocale } from 'react-aria-components';
import type { XLabelsOrientation } from '../../../types.ts';
import {
  getBlockEndMargin,
  getBlockStartMargin,
  getInlineEndMargin,
  getInlineStartMargin
} from './chart-container-margins.ts';

/** Minimum vertical gap between Y-axis labels (px). */
const MIN_Y_LABEL_GAP_PX = 16;
/** Minimum horizontal gap between X-axis labels (px). */
const MIN_X_LABEL_GAP_PX = 8;
/** Debounce time for the parent size observer (ms). */
const RESIZE_DEBOUNCE_MS = 150;

/**
 * Returns the minimum chart height needed to render every Y-axis label without overlap.
 *
 * @param yAxisElement - Y-axis SVG group element
 * @returns Minimum chart height in pixels
 */
function getChartMinHeight(yAxisElement: Element): number {
  let totalLabelHeight = 0;
  let labelsCount = 0;

  yAxisElement.querySelectorAll<SVGGraphicsElement>('g.visx-group').forEach(function getDimensions(g) {
    totalLabelHeight += g.getBBox().height;
    labelsCount++;
  });

  const spaceBetweenLabels = labelsCount * MIN_Y_LABEL_GAP_PX;

  return totalLabelHeight + spaceBetweenLabels;
}

/**
 * Returns the minimum X-axis width for both horizontal and vertical label layouts.
 *
 * @param xAxisElement - X-axis SVG group element
 * @returns `minWidthHorizontal` (px) for upright labels and `minWidthVertical` (px) for rotated labels
 */
function getChartMinWidth(xAxisElement: Element): { minWidthHorizontal: number; minWidthVertical: number } {
  let longestLabel = 0;
  let labelsCount = 0;
  let maxLabelHeight = 0;

  xAxisElement.querySelectorAll<SVGGraphicsElement>('g.visx-group text').forEach(function getDimensions(g) {
    const { width, height } = g.getBBox();

    if (height > maxLabelHeight) {
      maxLabelHeight = height;
    }

    if (width > longestLabel) {
      longestLabel = width;
    }

    labelsCount++;
  });

  const spaceBetweenLabels = labelsCount * MIN_X_LABEL_GAP_PX;
  const minWidthHorizontal = Math.max(longestLabel, maxLabelHeight) * labelsCount + spaceBetweenLabels;
  const minWidthVertical = Math.min(longestLabel, maxLabelHeight) * labelsCount + spaceBetweenLabels;

  return { minWidthHorizontal, minWidthVertical };
}

/**
 * Returns whether two `SVGRect`s describe the same rectangle (two nulls are equal).
 *
 * @param a - First rect, or null
 * @param b - Second rect, or null
 * @returns True when both are null or all four coordinates match
 */
function rectsEqual(a: SVGRect | null, b: SVGRect | null): boolean {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}

/**
 * Axis-derived layout state recomputed when either axis mutates or resizes. Margins are stored
 * in CSS-logical terms (`inline-start` is the Y-axis side, `inline-end` is the opposite side,
 * `block-start`/`block-end` are top/bottom in horizontal writing modes) and mapped to physical
 * `Margin` keys at the hook boundary so consumers can pass the result straight to visx.
 */
interface AxisState {
  inlineStart: number;
  inlineEnd: number;
  blockStart: number;
  blockEnd: number;
  minHeight: number;
  minXAxisWidthHorizontal: number;
  minXAxisWidthVertical: number;
  yAxisRect: SVGRect | null;
}

const INITIAL_AXIS_STATE: AxisState = {
  inlineStart: 0,
  inlineEnd: 0,
  blockStart: 0,
  blockEnd: 0,
  minHeight: 0,
  minXAxisWidthHorizontal: 0,
  minXAxisWidthVertical: 0,
  yAxisRect: null
};

/** Options passed to {@link useScrollableXYChart}. */
export interface UseScrollableXYChartProps {
  /** X-axis label orientation. `'auto'` rotates labels vertical when the container is too narrow. @default 'auto' */
  xLabelsOrientation?: XLabelsOrientation;
}

/** Result returned by {@link useScrollableXYChart}. */
interface UseScrollableXYChartResult {
  /** Ref for the scrollable chart container. */
  parentRef: RefObject<HTMLDivElement | null>;
  /** Chart width in pixels (visible width or minimum from axis labels). */
  chartWidth: number;
  /** Minimum chart height (px) derived from Y-axis label dimensions. */
  minHeight: number;
  /** Chart height in pixels (visible height or `minHeight`). */
  chartHeight: number;
  /** Chart margin (`top`, `right`, `bottom`, `left`) in pixels. */
  margin: Margin;
  /** Current horizontal scroll offset of the parent container. */
  scrollLeft: number;
  /** Current vertical scroll offset of the parent container. */
  scrollTop: number;
  /** Ref to attach to the X-axis SVG group via visx `Axis` `innerRef`. */
  xAxisRef: RefObject<SVGGElement | null>;
  /** Ref to attach to the Y-axis SVG group via visx `Axis` `innerRef`. */
  yAxisRef: RefObject<SVGGElement | null>;
  /** True when X-axis labels are rendered rotated to vertical. */
  xLabelsVertical: boolean;
  /** Bounding box of the Y-axis SVG group. */
  yAxisRect: SVGRect | null;
}

/**
 * Hook that returns refs and layout state for a scrollable visx `XYChart` parent.
 *
 * @param props - {@link UseScrollableXYChartProps}
 * @returns {@link UseScrollableXYChartResult}
 */
export function useScrollableXYChart(props?: UseScrollableXYChartProps): UseScrollableXYChartResult {
  const { xLabelsOrientation = 'auto' } = props ?? {};
  const {
    parentRef,
    width: visibleChartWidth,
    height: visibleChartHeight
  } = useParentSize({
    debounceTime: RESIZE_DEBOUNCE_MS
  });
  const { direction } = useLocale();
  const isRtl = direction === 'rtl';
  const xAxisRef = useRef<SVGGElement>(null);
  const yAxisRef = useRef<SVGGElement>(null);
  const [axisState, setAxisState] = useState<AxisState>(INITIAL_AXIS_STATE);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const isVisibleChart = visibleChartWidth > 0 && visibleChartHeight > 0;
  const {
    inlineStart,
    inlineEnd,
    blockStart,
    blockEnd,
    minHeight,
    minXAxisWidthHorizontal,
    minXAxisWidthVertical,
    yAxisRect
  } = axisState;
  const yAxisWidth = yAxisRect?.width ?? 0;
  const chartHeight = Math.max(visibleChartHeight, minHeight);
  const autoVertical = visibleChartWidth <= minXAxisWidthHorizontal + yAxisWidth;
  const xLabelsVertical =
    xLabelsOrientation === 'vertical' ? true : xLabelsOrientation === 'horizontal' ? false : autoVertical;
  const minXAxisWidth = xLabelsVertical ? minXAxisWidthVertical : minXAxisWidthHorizontal;
  const chartWidth = Math.max(visibleChartWidth, minXAxisWidth + yAxisWidth);
  // Logical → physical: inline-start lives on the visual right in RTL (where the Y-axis renders
  // via `AxisRight`), and inline-end lives on the visual left.
  const margin: Margin = isRtl
    ? { top: blockStart, right: inlineStart, bottom: blockEnd, left: inlineEnd }
    : { top: blockStart, right: inlineEnd, bottom: blockEnd, left: inlineStart };

  // Track scroll offsets and re-dispatch the last pointermove on scroll so visx tooltips,
  // crosshairs, and glyphs follow the cursor while the chart scrolls under it.
  useEffect(function onParentScroll() {
    const el = parentRef.current;
    if (!el) return;

    // Track the last pointer state so we can re-dispatch on scroll.
    // Storing the actual event target avoids relying on visx's internal DOM structure.
    let lastClientX = 0;
    let lastClientY = 0;
    let lastTarget: EventTarget | null = null;

    function onPointerMove(e: PointerEvent) {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      lastTarget = e.target;
    }

    function onPointerLeave() {
      lastTarget = null;
    }

    /**
     * Mirrors the container's scroll offsets into state and re-dispatches the last pointermove
     * on the cached target. visx's `localPoint()` re-derives the SVG point from `clientX/clientY`
     * via `SVGSVGElement.getScreenCTM()`, which already reflects the new scroll position, so the
     * same screen coordinates now resolve to the correct datum after scrolling.
     */
    function onScroll() {
      setScrollLeft(el?.scrollLeft ?? 0);
      setScrollTop(el?.scrollTop ?? 0);

      if (lastTarget) {
        lastTarget.dispatchEvent(
          new PointerEvent('pointermove', {
            bubbles: true,
            cancelable: true,
            clientX: lastClientX,
            clientY: lastClientY
          })
        );
      }
    }

    el.addEventListener('pointermove', onPointerMove, { passive: true });
    el.addEventListener('pointerleave', onPointerLeave, { passive: true });
    el.addEventListener('scroll', onScroll, { passive: true });

    return function cleanup() {
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerleave', onPointerLeave);
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Observe both axes and recompute axis-derived layout state when their DOM mutates or they
  // resize. Measurements are batched into a single rAF so concurrent observer callbacks
  // produce at most one re-render.
  useEffect(
    function syncAxes() {
      if (!isVisibleChart) {
        return;
      }

      const xAxis = xAxisRef.current;
      const yAxis = yAxisRef.current;

      if (!xAxis && !yAxis) {
        return;
      }

      let rafId = 0;

      function measureAll(prev: AxisState): AxisState {
        // Cluster all DOM reads in one pass so the browser pays a single forced reflow per
        // batch instead of one per observer callback.
        const inlineStart = getInlineStartMargin(yAxis, xAxis);
        const blockEnd = getBlockEndMargin(xAxis, yAxis);
        const blockStart = yAxis ? getBlockStartMargin(yAxis, prev.blockStart) : prev.blockStart;
        const inlineEnd = xAxis ? getInlineEndMargin(xAxis, prev.inlineEnd, isRtl) : prev.inlineEnd;
        const minHeight = yAxis ? getChartMinHeight(yAxis) : prev.minHeight;
        const xWidths = xAxis
          ? getChartMinWidth(xAxis)
          : { minWidthHorizontal: prev.minXAxisWidthHorizontal, minWidthVertical: prev.minXAxisWidthVertical };
        const yAxisRect = yAxis ? yAxis.getBBox() : prev.yAxisRect;

        // Bail out on no-op so React skips the re-render.
        if (
          prev.blockStart === blockStart &&
          prev.inlineEnd === inlineEnd &&
          prev.blockEnd === blockEnd &&
          prev.inlineStart === inlineStart &&
          prev.minHeight === minHeight &&
          prev.minXAxisWidthHorizontal === xWidths.minWidthHorizontal &&
          prev.minXAxisWidthVertical === xWidths.minWidthVertical &&
          rectsEqual(prev.yAxisRect, yAxisRect)
        ) {
          return prev;
        }

        return {
          inlineStart,
          inlineEnd,
          blockStart,
          blockEnd,
          minHeight,
          minXAxisWidthHorizontal: xWidths.minWidthHorizontal,
          minXAxisWidthVertical: xWidths.minWidthVertical,
          yAxisRect
        };
      }

      function schedule() {
        if (rafId) {
          return;
        }
        rafId = requestAnimationFrame(function flush() {
          rafId = 0;
          setAxisState(measureAll);
        });
      }

      schedule();

      const mutationObserver = new MutationObserver(schedule);
      const resizeObserver = new ResizeObserver(schedule);

      if (xAxis) {
        mutationObserver.observe(xAxis, { childList: true, subtree: true });
        resizeObserver.observe(xAxis);
      }
      if (yAxis) {
        mutationObserver.observe(yAxis, { childList: true, subtree: true });
        resizeObserver.observe(yAxis);
      }

      return function cleanup() {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        mutationObserver.disconnect();
        resizeObserver.disconnect();
      };
    },
    [isVisibleChart, isRtl]
  );

  return {
    parentRef,
    chartWidth,
    minHeight,
    chartHeight,
    margin,
    scrollLeft,
    scrollTop,
    xAxisRef,
    yAxisRef,
    xLabelsVertical,
    yAxisRect
  };
}
