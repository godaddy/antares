import { useEffect, useRef, useState } from 'react';
import { useParentSize } from '@visx/responsive';
import { Margin } from '@visx/xychart';
import { type XLabelsOrientation } from '../../types.ts';

/** Minimum vertical gap between Y-axis labels (px). Implementation detail for min-height calculation. */
const MIN_Y_LABEL_GAP_PX = 16;
/** Minimum horizontal gap between X-axis labels (px). Implementation detail for min-width calculation. */
const MIN_X_LABEL_GAP_PX = 8;
/** Default chart margin (px) when axis dimensions are unknown. */
const DEFAULT_MARGIN_PX = 50;
/** Padding added to axis bbox for margin calculation (px). */
const AXIS_PADDING_PX = 8;
/** Multiplier for bottom axis padding (axis height + padding on both sides). */
const BOTTOM_PADDING_MULTIPLIER = 2;
/** Debounce time for parent size observer (ms). */
const RESIZE_DEBOUNCE_MS = 150;

/**
 * Computes minimum chart height from Y-axis label dimensions so all labels fit.
 * Uses the sum of actual label heights plus gaps so the result is accurate when labels vary in height.
 *
 * @param yAxisElement - Y-axis DOM element (visx group) containing label nodes
 * @returns Minimum height in px (sum of label heights + gaps between labels)
 */
function getChartMinHeight(yAxisElement: Element): number {
  let totalLabelHeight = 0;
  let labelsCount = 0;

  Array.from(yAxisElement.querySelectorAll('g.visx-group')).forEach(function getDimensions(g) {
    totalLabelHeight += g.getBoundingClientRect().height;
    labelsCount++;
  });

  const spaceBetweenLabels = labelsCount * MIN_Y_LABEL_GAP_PX;

  return totalLabelHeight + spaceBetweenLabels;
}

/**
 * Measures X-axis label dimensions for min-width calculation (horizontal vs vertical layout).
 *
 * @param xAxisElement - X-axis DOM element (visx group) containing label nodes
 * @returns longestLabel (px), labelsCount, maxLabelHeight (px)
 */
function getXAxisLabelMetrics(xAxisElement: Element): {
  longestLabel: number;
  labelsCount: number;
  maxLabelHeight: number;
} {
  let longestLabel = 0;
  let labelsCount = 0;
  let maxLabelHeight = 0;

  Array.from(xAxisElement.querySelectorAll('g.visx-group')).forEach(function getDimensions(g) {
    const width = g.getBoundingClientRect().width;
    const height = g.getBoundingClientRect().height;

    if (height > maxLabelHeight) {
      maxLabelHeight = height;
    }

    if (width > longestLabel) {
      longestLabel = width;
    }

    labelsCount++;
  });

  return { longestLabel, labelsCount, maxLabelHeight };
}

/**
 * Computes minimum X-axis width for horizontal and vertical label layouts.
 *
 * @param xAxisElement - X-axis DOM element (visx group) containing label nodes
 * @returns minWidthVertical (px) and minWidthHorizontal (px)
 */
function getChartMinWidth(xAxisElement: Element) {
  const { longestLabel, labelsCount, maxLabelHeight } = getXAxisLabelMetrics(xAxisElement);
  const spaceBetweenLabels = labelsCount * MIN_X_LABEL_GAP_PX;

  const minWidthHorizontal = longestLabel * labelsCount + spaceBetweenLabels;
  const minWidthVertical = maxLabelHeight * labelsCount + spaceBetweenLabels;

  return { minWidthVertical, minWidthHorizontal };
}

/**
 * Left margin width from Y-axis bbox plus padding, or default if axis not measured.
 *
 * @param yAxisElement - Y-axis SVG group element, or null
 * @returns Left margin in px
 */
function getLeftMargin(yAxisElement: SVGGraphicsElement | null): number {
  return Math.max((yAxisElement?.getBBox().width ?? 0) + AXIS_PADDING_PX, DEFAULT_MARGIN_PX);
}

/**
 * Bottom margin height from X-axis bbox plus padding, or default if axis not measured.
 *
 * @param xAxisElement - X-axis SVG group element, or null
 * @returns Bottom margin in px
 */
function getBottomMargin(xAxisElement: SVGGraphicsElement | null): number {
  return Math.max(
    (xAxisElement?.getBBox().height ?? 0) + AXIS_PADDING_PX * BOTTOM_PADDING_MULTIPLIER,
    DEFAULT_MARGIN_PX
  );
}

/** Axis-derived layout state updated by MutationObserver and ResizeObserver per axis. */
interface AxisState {
  margin: Margin;
  minHeight: number;
  minXAxisWidthHorizontal: number;
  minXAxisWidthVertical: number;
  yAxisRect: SVGRect | null;
}

const INITIAL_AXIS_STATE: AxisState = {
  margin: {
    top: DEFAULT_MARGIN_PX,
    right: DEFAULT_MARGIN_PX,
    bottom: DEFAULT_MARGIN_PX,
    left: DEFAULT_MARGIN_PX
  },
  minHeight: 0,
  minXAxisWidthHorizontal: 0,
  minXAxisWidthVertical: 0,
  yAxisRect: null
};

interface UseChartContainerOptions {
  /** When 'auto', labels rotate vertical when container is narrow; 'horizontal' or 'vertical' force that orientation. */
  xLabelsOrientation?: XLabelsOrientation;
}

/**
 * Provides container dimensions, margins, and axis refs for a scrollable line chart.
 * Depends on xAxisRef and yAxisRef being attached to the chart axis DOM nodes so it can measure them.
 * Uses MutationObserver and ResizeObserver on both axes; layout or DOM changes can trigger several
 * state updates in one frame and cause multiple re-renders. The hook is sensitive to layout
 * thrashing when many things resize at once.
 *
 * @param options - Optional config (e.g. xLabelsOrientation)
 * @returns parentRef - Ref for the scrollable chart container
 * @returns chartWidth - Chart width in px (visible width or min from axis labels)
 * @returns minHeight - Minimum height from Y-axis labels
 * @returns chartHeight - Chart height in px (visible or minHeight)
 * @returns margin - Chart margin (top, right, bottom, left) in px
 * @returns scrollLeft - Current horizontal scroll offset of the container
 * @returns scrollTop - Current vertical scroll offset of the container
 * @returns xAxisRef - Ref to attach to the X-axis DOM node
 * @returns yAxisRef - Ref to attach to the Y-axis DOM node
 * @returns xLabelsVertical - True when X labels are rotated vertical (narrow container or vertical orientation)
 * @returns yAxisRect - Bounding box of the Y-axis (for background/positioning)
 */
export function useChartContainer(options?: UseChartContainerOptions) {
  const { xLabelsOrientation = 'auto' } = options ?? {};
  const {
    parentRef,
    width: visibleChartWidth,
    height: visibleChartHeight
  } = useParentSize({
    debounceTime: RESIZE_DEBOUNCE_MS
  });
  const xAxisRef = useRef<SVGGElement>(null);
  const yAxisRef = useRef<SVGGElement>(null);
  const [axisState, setAxisState] = useState<AxisState>(INITIAL_AXIS_STATE);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const isVisibleChart = visibleChartWidth > 0 && visibleChartHeight > 0;
  const { margin, minHeight, minXAxisWidthHorizontal, minXAxisWidthVertical, yAxisRect } = axisState;
  const yAxisWidth = yAxisRect?.width ?? 0;
  const chartHeight = Math.max(visibleChartHeight, minHeight);
  const autoVertical = visibleChartWidth <= minXAxisWidthHorizontal + yAxisWidth;
  const xLabelsVertical =
    xLabelsOrientation === 'vertical' ? true : xLabelsOrientation === 'horizontal' ? false : autoVertical;
  const minXAxisWidth = xLabelsVertical ? minXAxisWidthVertical : minXAxisWidthHorizontal;
  const chartWidth = Math.max(visibleChartWidth, minXAxisWidth + yAxisWidth);

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

    function onScroll() {
      setScrollLeft(el?.scrollLeft ?? 0);
      setScrollTop(el?.scrollTop ?? 0);

      // Re-dispatch a pointermove on the stored target so visx recomputes the nearest
      // datum and updates the tooltip data, crosshair, and glyph positions.
      // localPoint() inside visx re-derives svgPoint from clientX/clientY via
      // SVGSVGElement.getScreenCTM(), which already reflects the new scroll position,
      // so the same screen coordinates now resolve to the correct datum after scrolling.
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

  useEffect(
    function syncYAxis() {
      if (!isVisibleChart || !yAxisRef.current) {
        return;
      }

      const observer = new MutationObserver(function onMutation() {
        const yAxisElement = yAxisRef.current as SVGGraphicsElement;

        setAxisState(function updateYAxis(prev) {
          return {
            ...prev,
            margin: { ...prev.margin, left: getLeftMargin(yAxisElement) },
            minHeight: getChartMinHeight(yAxisElement)
          };
        });
      });
      observer.observe(yAxisRef.current, { childList: true, subtree: true });

      return function cleanup() {
        observer.disconnect();
      };
    },
    [isVisibleChart]
  );

  useEffect(
    function syncXAxis() {
      if (!isVisibleChart || !xAxisRef.current) {
        return;
      }

      const xAxisElement = xAxisRef.current as SVGGraphicsElement;

      function measure() {
        const { minWidthHorizontal, minWidthVertical } = getChartMinWidth(xAxisElement);
        setAxisState(function updateXAxis(prev) {
          return {
            ...prev,
            minXAxisWidthHorizontal: minWidthHorizontal,
            minXAxisWidthVertical: minWidthVertical
          };
        });
      }

      measure();

      const observer = new MutationObserver(measure);

      observer.observe(xAxisRef.current, { childList: true, subtree: true });

      return function cleanup() {
        observer.disconnect();
      };
    },
    [isVisibleChart]
  );

  useEffect(
    function observeXAxisResize() {
      if (!isVisibleChart || !xAxisRef.current) {
        return;
      }

      const xAxisElement = xAxisRef.current;

      const resizeObserver = new ResizeObserver(function onResize() {
        setAxisState(function updateXAxisResize(prev) {
          return {
            ...prev,
            margin: { ...prev.margin, bottom: getBottomMargin(xAxisElement) }
          };
        });
      });

      resizeObserver.observe(xAxisElement);

      return function cleanup() {
        resizeObserver.disconnect();
      };
    },
    [isVisibleChart]
  );

  useEffect(
    function observeYAxisResize() {
      if (!isVisibleChart || !yAxisRef.current) {
        return;
      }

      const yAxisElement = yAxisRef.current;

      const resizeObserver = new ResizeObserver(function onResize() {
        setAxisState(function updateYAxisResize(prev) {
          return {
            ...prev,
            yAxisRect: yAxisElement.getBBox(),
            margin: { ...prev.margin, left: getLeftMargin(yAxisElement) }
          };
        });
      });

      resizeObserver.observe(yAxisElement);

      return function cleanup() {
        resizeObserver.disconnect();
      };
    },
    [isVisibleChart]
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
