import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { cx } from 'cva';
import { Grid } from '#components/layout/grid';
import { Text } from '#components/text';
import { chartArcGapAngleDeg } from '../../utils.ts';
import styles from './index.module.css';
import { Flex } from '#components/layout/flex';

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
 */
export interface GaugeChartProps {
  /** HTML id attribute for the root element. */
  id?: string;
  /** Additional CSS class name for the root element. */
  className?: string;
  /** Inline styles for the root element. Merged with internal variables (`--_value`, optional `--_segments`, optional `--_gap-angle` after layout). */
  style?: CSSProperties;
  /** Primary text label displayed inside the gauge (e.g. "50%"). */
  label: string;
  /** Descriptive label below the primary value. */
  subLabel?: string;
  /** Min/max labels to contextualize the gauge range. Requires both min and max. */
  rangeLabel?: GaugeChartRangeLabel;
  /** Number of segments. If provided, renders a segmented gauge; if omitted, renders continuous. */
  segments?: number;
  /**
   * Controls the font size of the primary label. Use `'value'` when the label displays a numeric or percentage
   * value (larger type); use `'text'` when the label contains a short descriptive string (smaller type).
   * @default 'value'
   */
  labelType?: 'value' | 'text';
  /** Status color variant. @default 'default' */
  variant?: 'default' | 'success' | 'warning' | 'critical';
  /** Fill value — 0–100 for continuous, 0 to segments for segmented. Clamped at runtime. */
  value: number;
  /** Accessible name for the gauge. */
  'aria-label': string;
}

/**
 * Visual indicator for a single quantitative value within a known range.
 * Renders as a semicircle arc in continuous or segmented mode.
 *
 * @param props - {@link GaugeChartProps}
 */
export function GaugeChart(props: GaugeChartProps) {
  const {
    id,
    className,
    style,
    label,
    subLabel,
    rangeLabel,
    segments,
    labelType = 'value',
    variant = 'default',
    value,
    'aria-label': ariaLabel
  } = props;

  const isSegmented = segments != null;
  const maxValue = isSegmented ? segments : 100;
  const clampedValue = Math.min(Math.max(0, value), maxValue);
  const normalizedValue = isSegmented ? clampedValue / segments : clampedValue / 100;

  const gaugeRef = useRef<HTMLDivElement>(null);
  const [gapAngleDeg, setGapAngleDeg] = useState<number | null>(null);

  useLayoutEffect(function syncGaugeGapAngle() {
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
    ...(isSegmented && { '--_segments': segments }),
    ...(gapAngleDeg != null && { '--_gap-angle': `${gapAngleDeg}deg` })
  } as CSSProperties;

  return (
    <Grid
      id={id}
      className={cx(styles.root, className)}
      style={rootStyle}
      columns="auto 1fr auto"
      justifyContent="center"
      justifyItems="center"
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
      aria-label={ariaLabel}
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
