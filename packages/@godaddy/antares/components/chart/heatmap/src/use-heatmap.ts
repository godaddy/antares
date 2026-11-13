import { useCallback, useMemo, useRef, useState } from 'react';
import { scaleBand } from '@visx/scale';
import { useTooltip } from '@visx/tooltip';
import type { ColorBucket, HeatmapCell } from '../../types.ts';

export type { ColorBucket };

/**
 * Resolves the bucket for a cell value using a discrete threshold bucket list: the first bucket whose
 * `max` is above the value, falling back to the last bucket for values above every `max`.
 * Returns undefined for closed cells: a missing value (`null`, `undefined`, `NaN`) or no buckets.
 * The cell color and the tooltip both come from this, so they cannot disagree.
 */
function resolveBucket(value: number | null | undefined, buckets: ColorBucket[]): ColorBucket | undefined {
  if (typeof value !== 'number' || Number.isNaN(value)) return undefined;
  for (const bucket of buckets) {
    if (bucket.max === null || value < bucket.max) return bucket;
  }
  return buckets[buckets.length - 1];
}

/**
 * Resolves the color for a cell value. Returns null for closed cells.
 */
export function resolveColor(value: number | null | undefined, buckets: ColorBucket[]): string | null {
  return resolveBucket(value, buckets)?.color ?? null;
}

export interface HeatmapTooltipData<T extends object> {
  datum: T | undefined;
  x: string | Date;
  y: string | Date;
  value: number | null;
  bucket: ColorBucket | undefined;
  tooltipX: number;
  tooltipY: number;
}

interface UseHeatmapOptions<T extends object> {
  data: T[];
  xAccessor: (d: T) => string | Date;
  yAccessor: (d: T) => string | Date;
  valueAccessor: (d: T) => number | null;
  xDomain?: (string | Date)[];
  yDomain?: (string | Date)[];
  colorBuckets: ColorBucket[];
  minCellSize: number;
  minCellHeight: number;
  maxCellHeight: number;
  cellPadding: number;
  /** Smallest chart height that keeps the y-axis labels apart (from the shared scrollable chart hook). */
  minChartHeight: number;
  chartWidth: number;
  chartHeight: number;
  margin: { top: number; right: number; bottom: number; left: number };
}

export function useHeatmap<T extends object>({
  data,
  xAccessor,
  yAccessor,
  valueAccessor,
  xDomain,
  yDomain,
  colorBuckets,
  minCellSize,
  minCellHeight,
  maxCellHeight,
  cellPadding,
  minChartHeight,
  chartWidth,
  chartHeight,
  margin
}: UseHeatmapOptions<T>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredX, setHoveredX] = useState<string | Date | null>(null);
  const [hoveredY, setHoveredY] = useState<string | Date | null>(null);
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip<HeatmapTooltipData<T>>();

  const xValues = useMemo(
    function deriveXValues() {
      if (xDomain) return xDomain;
      const seen = new Set<string>();
      const result: (string | Date)[] = [];
      for (const d of data) {
        const key = String(xAccessor(d));
        if (!seen.has(key)) {
          seen.add(key);
          result.push(xAccessor(d));
        }
      }
      return result;
    },
    [data, xAccessor, xDomain]
  );

  const yValues = useMemo(
    function deriveYValues() {
      if (yDomain) return yDomain;
      const seen = new Set<string>();
      const result: (string | Date)[] = [];
      for (const d of data) {
        const key = String(yAccessor(d));
        if (!seen.has(key)) {
          seen.add(key);
          result.push(yAccessor(d));
        }
      }
      return result;
    },
    [data, yAccessor, yDomain]
  );

  // The band scales work on string keys, so tick values come back as strings. These maps recover the
  // original category (e.g. a Date) so custom tick formatters receive what the types promise.
  const xByKey = useMemo(
    function buildXByKey() {
      return new Map(xValues.map((v) => [String(v), v] as const));
    },
    [xValues]
  );
  const yByKey = useMemo(
    function buildYByKey() {
      return new Map(yValues.map((v) => [String(v), v] as const));
    },
    [yValues]
  );

  // Two-level index: xKey -> yKey -> datum
  const datumIndex = useMemo(
    function buildIndex() {
      const index = new Map<string, Map<string, T>>();
      for (const d of data) {
        const xKey = String(xAccessor(d));
        const yKey = String(yAccessor(d));
        let inner = index.get(xKey);
        if (!inner) {
          inner = new Map();
          index.set(xKey, inner);
        }
        inner.set(yKey, d);
      }
      return index;
    },
    [data, xAccessor, yAccessor]
  );

  // Columns keep at least `minCellSize` of width. Rows are sized between `minCellHeight` and
  // `maxCellHeight` (each plus the gap):
  //  - no available height (chartHeight 0): the chart is exactly `naturalHeight`, as tall as its rows;
  //  - more height than `naturalHeight`: the rows stretch to fill it, up to `maxCellHeight`;
  //  - less height: the SVG stays at `naturalHeight` and the chart scrolls.
  const minSvgWidth = Math.max(chartWidth, xValues.length * minCellSize + margin.left + margin.right);
  const axisHeight = margin.top + margin.bottom;
  const naturalHeight = Math.max(yValues.length * (minCellHeight + cellPadding) + axisHeight, minChartHeight);
  const maxHeight = Math.max(
    Number.isFinite(maxCellHeight) ? yValues.length * (maxCellHeight + cellPadding) + axisHeight : Infinity,
    naturalHeight
  );
  const svgWidth = minSvgWidth;
  const svgHeight = Math.min(Math.max(chartHeight, naturalHeight), maxHeight);
  const effectiveInnerWidth = svgWidth - margin.left - margin.right;
  const effectiveInnerHeight = svgHeight - margin.top - margin.bottom;

  const xScale = useMemo(
    function buildXScale() {
      return scaleBand({
        domain: xValues.map(String),
        range: [0, effectiveInnerWidth],
        padding: 0
      });
    },
    [xValues, effectiveInnerWidth]
  );

  const yScale = useMemo(
    function buildYScale() {
      return scaleBand({
        domain: yValues.map(String),
        range: [0, effectiveInnerHeight],
        padding: 0
      });
    },
    [yValues, effectiveInnerHeight]
  );

  const handleCellEnter = useCallback(
    function enter(datum: T | undefined, xVal: string | Date, yVal: string | Date, cellX: number, cellY: number) {
      setHoveredX(xVal);
      setHoveredY(yVal);
      const value = datum ? valueAccessor(datum) : null;
      const bucket = resolveBucket(value, colorBuckets);
      showTooltip({
        tooltipLeft: cellX,
        tooltipTop: cellY,
        tooltipData: { datum, x: xVal, y: yVal, value, bucket, tooltipX: cellX, tooltipY: cellY }
      });
    },
    [valueAccessor, colorBuckets, showTooltip]
  );

  const handleCellLeave = useCallback(
    function leave() {
      setHoveredX(null);
      setHoveredY(null);
      hideTooltip();
    },
    [hideTooltip]
  );

  return {
    svgRef,
    xValues,
    yValues,
    datumIndex,
    xScale,
    yScale,
    svgWidth,
    svgHeight,
    naturalHeight,
    maxHeight,
    effectiveInnerWidth,
    effectiveInnerHeight,
    xByKey,
    yByKey,
    hoveredX,
    hoveredY,
    handleCellEnter,
    handleCellLeave,
    tooltip: { tooltipData, tooltipLeft, tooltipTop, tooltipOpen }
  };
}

export function defaultXAccessor(d: HeatmapCell): string | Date {
  return d.x;
}

export function defaultYAccessor(d: HeatmapCell): string | Date {
  return d.y;
}

export function defaultValueAccessor(d: HeatmapCell): number | null {
  return d.value;
}
