import { type CSSProperties, type ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  ChartRegionsContext,
  useChartDescription,
  type ChartRegionPlacements,
  type ChartRootProps
} from '#components/chart/_internal/chart-region';
import { Box } from '#components/layout/box';
import { Grid } from '#components/layout/grid';
import { composeClassName } from '#utils/render-props.ts';
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
 * Gauge Chart component props.
 */
export interface GaugeChartProps extends ChartRootProps {
  /** Optional center and range regions, in either order. */
  children?: ReactNode;

  /** Fill value — 0–100 for continuous, 0 to effective segment count when segmented. Clamped at runtime. */
  value: number;

  /** Accessible text for the value, such as "3 of 5". Defaults to the numeric value. */
  valueLabel?: string;

  /** Segment count for segmented mode; omit for continuous (0–100). When set, must be a finite positive integer or the component throws. */
  segments?: number;

  /**
   * Font size of the center value. Use `'value'` for a numeric or percentage value (larger type) and `'text'`
   * for a short descriptive string (smaller type).
   * @default 'value'
   */
  labelType?: 'value' | 'text';

  /** Status color variant. @default 'default' */
  variant?: 'default' | 'success' | 'warning' | 'critical';
}

/**
 * Visual indicator for a single quantitative value within a known range.
 * Renders as a semicircle arc in continuous or segmented mode. Compose the center and range as needed.
 *
 * @param props - {@link GaugeChartProps}
 */
export function GaugeChart(props: GaugeChartProps) {
  const {
    children,
    value,
    valueLabel,
    segments,
    labelType = 'value',
    variant = 'default',
    className,
    style,
    'aria-label': ariaLabel,
    'aria-labelledby': labelledBy,
    'aria-describedby': externalDescription,
    'aria-description': ariaDescription,
    'aria-details': ariaDetails,
    ...gridRest
  } = props;

  const gaugeRef = useRef<HTMLDivElement>(null);
  const [gapAngleDeg, setGapAngleDeg] = useState<number | null>(null);
  const segmentCount = resolveSegmentCount(segments);
  const isSegmented = segmentCount !== undefined;
  const maxValue = isSegmented ? segmentCount : 100;
  const clampedValue = Math.min(Math.max(0, value), maxValue);
  const normalizedValue = clampedValue / maxValue;

  const { descriptionSlot, describedBy } = useChartDescription(externalDescription);
  const regions = useMemo(
    function createRegions(): ChartRegionPlacements {
      return {
        center: {
          className: styles.center,
          slots: { description: descriptionSlot }
        },
        range: { className: styles.range }
      };
    },
    [descriptionSlot]
  );

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
    '--gauge-value': normalizedValue,
    ...(segmentCount !== undefined && { '--gauge-segments': segmentCount }),
    ...(gapAngleDeg != null && { '--gauge-gap-angle': `${gapAngleDeg}deg` })
  } as CSSProperties;

  return (
    <Grid
      {...gridRest}
      className={composeClassName(className, styles.root)}
      style={rootStyle}
      data-variant={variant}
      data-label-type={labelType}
      data-segmented={isSegmented || undefined}
      data-filled={clampedValue > 0 ? true : undefined}
      data-full={clampedValue >= maxValue ? true : undefined}
    >
      <Box
        ref={gaugeRef}
        className={styles.gauge}
        role="meter"
        aria-label={ariaLabel}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        aria-description={ariaDescription}
        aria-details={ariaDetails}
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={maxValue}
        aria-valuetext={valueLabel}
      >
        <Box className={styles.caps} aria-hidden />
      </Box>
      <ChartRegionsContext.Provider value={regions}>{children}</ChartRegionsContext.Provider>
    </Grid>
  );
}
