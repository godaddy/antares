import { cx } from 'cva';
import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Flex } from '#components/layout/flex';
import { Grid, type GridProps } from '#components/layout/grid';
import { Text } from '#components/text';
import { chartArcGapAngleDeg } from '../../utils.ts';
import styles from './index.module.css';

// Avoid useLayoutEffect SSR warnings; use it in the browser so gap angle updates before paint.
const canUseDOM = typeof window !== 'undefined';
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

/**
 * Segment count for segmented mode, or `undefined` for continuous (prop omitted).
 * When `segments` is passed, it must be a finite integer greater than zero.
 */
function resolveSegmentCount(segments: number | undefined): number | undefined {
  if (segments === undefined) {
    return undefined;
  }
  if (typeof segments !== 'number' || !Number.isInteger(segments) || segments <= 0) {
    throw new Error(
      'GaugeChart: `segments` must be a positive integer when provided; received ' + String(segments) + '.'
    );
  }
  return segments;
}

/**
 * Range labels to contextualize the gauge min and max values.
 */
export interface GaugeChartRangeLabel {
  /** Minimum value label. */
  min: number | string;

  /** Maximum value label. */
  max: number | string;
}

/**
 * Gauge Chart component props.
 * Inherits {@link GridProps} for the root container.
 */
export interface GaugeChartProps
  extends Omit<GridProps<'div'>, 'children' | 'columns' | 'justifyContent' | 'justifyItems'> {
  /** Primary text label displayed inside the gauge (e.g. "50%"). */
  label: string;

  /** Descriptive label below the primary value. */
  subLabel?: string;

  /** Min/max labels to contextualize the gauge range. Requires both min and max. */
  rangeLabel?: GaugeChartRangeLabel;

  /** Segment count for segmented mode; omit for continuous (0–100). When set, must be a finite positive integer or the component throws. */
  segments?: number;

  /**
   * Controls the font size of the primary label. Use `'value'` when the label displays a numeric or percentage
   * value (larger type); use `'text'` when the label contains a short descriptive string (smaller type).
   * @default 'value'
   */
  labelType?: 'value' | 'text';

  /** Status color variant. @default 'default' */
  variant?: 'default' | 'success' | 'warning' | 'critical';

  /** Fill value — 0–100 for continuous, 0 to effective segment count when segmented. Clamped at runtime. */
  value: number;
}

/**
 * Visual indicator for a single quantitative value within a known range.
 * Renders as a semicircle arc in continuous or segmented mode.
 *
 * @param props - {@link GaugeChartProps}
 */
export function GaugeChart(props: GaugeChartProps) {
  const {
    label,
    subLabel,
    rangeLabel,
    segments,
    labelType = 'value',
    variant = 'default',
    value,
    className,
    style,
    ...gridRest
  } = props;

  const gaugeRef = useRef<HTMLDivElement>(null);
  const [gapAngleDeg, setGapAngleDeg] = useState<number | null>(null);
  const segmentCount = resolveSegmentCount(segments);
  const isSegmented = segmentCount !== undefined;
  const maxValue = isSegmented ? segmentCount : 100;
  const clampedValue = Math.min(Math.max(0, value), maxValue);
  const normalizedValue = segmentCount !== undefined ? clampedValue / segmentCount : clampedValue / 100;

  useIsomorphicLayoutEffect(function syncGaugeGapAngle() {
    const gaugeNode = gaugeRef.current;
    if (!gaugeNode) {
      return undefined;
    }
    function updateGapAngle() {
      const node = gaugeRef.current;
      if (node === null) {
        return;
      }
      const radiusPx = Math.max(node.offsetWidth / 2, 1);
      setGapAngleDeg(chartArcGapAngleDeg(radiusPx));
    }
    updateGapAngle();
    const ro = new ResizeObserver(updateGapAngle);
    ro.observe(gaugeNode);
    return function disconnectGaugeResizeObserver() {
      ro.disconnect();
    };
  }, []);

  const rootStyle = {
    ...style,
    '--_value': normalizedValue,
    ...(segmentCount !== undefined && { '--_segments': segmentCount }),
    ...(gapAngleDeg != null && { '--_gap-angle': `${gapAngleDeg}deg` })
  } as CSSProperties;

  return (
    <Grid
      {...gridRest}
      columns="auto 1fr auto"
      justifyContent="center"
      justifyItems="center"
      className={cx(styles.root, className)}
      style={rootStyle}
      data-variant={variant}
      data-label-type={labelType}
      data-segmented={isSegmented || undefined}
      data-filled={clampedValue > 0 ? true : undefined}
      data-full={clampedValue >= maxValue ? true : undefined}
      role="meter"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={maxValue}
      aria-valuetext={subLabel ? `${label} - ${subLabel}` : label}
    >
      <Grid ref={gaugeRef} className={styles.gauge}>
        <Flex as={Text} className={styles.content} direction="column" alignItems="center" justifyContent="end">
          {label}
        </Flex>
      </Grid>
      {rangeLabel && (
        <Text className={styles.rangeLabel} data-range-label="min">
          {rangeLabel.min}
        </Text>
      )}
      {subLabel && (
        <Text className={styles.subLabel} align="center">
          {subLabel}
        </Text>
      )}
      {rangeLabel && (
        <Text className={styles.rangeLabel} data-range-label="max">
          {rangeLabel.max}
        </Text>
      )}
    </Grid>
  );
}
