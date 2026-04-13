import { AxisTitle } from '#components/chart/axis-title';
import { TooltipDismissStrip } from '#components/chart/tooltip-dismiss-strip';
import { Legend } from '#components/chart/legend';
import { Tooltip as ChartTooltip } from '#components/chart/tooltip';
import { ChartColorProvider, useChartColor } from '#components/chart/use-chart-color';
import { Box } from '#components/layout/box';
import { Flex } from '#components/layout/flex';
import {
  Axis,
  Grid,
  LineSeries as VisxLineSeries,
  Tooltip,
  TooltipProvider,
  XYChart,
  type TooltipData
} from '@visx/xychart';
import { cx } from 'cva';
import { useCallback, useMemo } from 'react';
import type {
  Accessors,
  AccessorRequirement,
  DataPoint,
  LegendPosition,
  Optional,
  SeriesConfig,
  XLabelsOrientation
} from '../../types.ts';
import { resolveLegendPosition, xAccessor as defaultXAccessor, yAccessor as defaultYAccessor } from '../../utils.ts';
import { useNormalizedSeries } from '#components/chart/use-normalized-series';
import { buildScaleConfig } from './scale-config.ts';
import { useChartContainer } from './use-chart-container.ts';
import styles from './index.module.css';

const GRIDLINE_STYLE = { stroke: 'var(--bd-base)', strokeWidth: '2px' };

/** Scale types supported by LineChart (subset of @visx/scale ScaleType). */
type LineChartScaleType = 'linear' | 'time' | 'band' | 'log' | 'sqrt' | 'pow';

export interface LineChartPropsBase<T extends object = DataPoint> {
  /** Data series (id optional; stable id generated when omitted) */
  series: Optional<SeriesConfig<T>, 'id'>[];

  /** X-axis title */
  xTitle?: string;
  /** Show X-axis labels */
  xLabels?: boolean;
  /**
   * X-axis label orientation. 'auto' rotates labels to vertical when the container is too narrow;
   * 'horizontal' keeps labels horizontal (chart may scroll); 'vertical' keeps labels vertical.
   *
   * @default 'auto'
   */
  xLabelsOrientation?: XLabelsOrientation;
  /** Show X-axis tick marks */
  xTickMarks?: boolean;
  /** Show X-axis baseline */
  xBaseline?: boolean;
  /** Show vertical gridlines */
  xGridlines?: boolean;
  /** Format X-axis tick labels */
  xTickFormat?: (value: number | string | Date) => string;
  /**
   * How the X-axis maps values to position. Use 'linear' for numbers; 'time' for dates; 'band' for
   * discrete categories; 'log', 'sqrt', or 'pow' for non-linear numeric axes.
   *
   * @default 'linear'
   */
  xType?: LineChartScaleType;
  /**
   * The domain of the scale.
   */
  xDomain?: (number | string | Date)[];
  /**
   * The outer padding (spacing) at the ends of the range of band and point scales,
   * as a fraction of the step size. This value must lie in the range [0,1].
   * Only applies when xType is 'band' (or 'point').
   */
  xPaddingOuter?: number;
  /**
   * Extending the domain so that it starts and ends on nice round values. This method typically
   * modifies the scale's domain, and may only extend the bounds to the nearest round value. Nicing
   * is useful if the domain is computed from data and may be irregular. For example, for a domain
   * of [0.201479…, 0.996679…], a nice domain might be [0.2, 1.0].
   *
   * For quantitative scales such as linear, nice can be either a boolean flag or a number.
   * If nice is a number, it will represent a desired tick count. This allows greater control over
   * the step size used to extend the bounds, guaranteeing that the returned ticks will exactly
   * cover the domain.
   *
   * @default true for quantitative scales; false otherwise
   */
  xNice?: boolean | number;
  /**
   * If true, ensures that a zero baseline value is included in the scale domain.
   * Note: Log, time, and utc scales do not support zero.
   *
   * @default false
   */
  xZero?: boolean;
  /**
   * The number of ticks wanted for the X-axis (note this is approximate).
   */
  xNumTicks?: number;
  /**
   * An array of values that determine the number and values of the ticks. Falls back to scale
   * ticks or domain when not set. Overrides xNumTicks when set.
   */
  xTickValues?: (number | string | Date)[];

  /** Y-axis title */
  yTitle?: string;
  /** Show Y-axis labels */
  yLabels?: boolean;
  /** Show Y-axis tick marks */
  yTickMarks?: boolean;
  /** Show Y-axis baseline */
  yBaseline?: boolean;
  /** Show horizontal gridlines */
  yGridlines?: boolean;
  /** Format Y-axis tick labels */
  yTickFormat?: (value: number) => string;
  /**
   * How the Y-axis maps values to position. Use 'linear' for numbers; 'time' for dates; 'band' for
   * discrete categories; 'log', 'sqrt', or 'pow' for non-linear numeric axes.
   *
   * @default 'linear'
   */
  yType?: LineChartScaleType;
  /**
   * The domain of the scale.
   */
  yDomain?: (number | string | Date)[];
  /**
   * The outer padding (spacing) at the ends of the range of band and point scales,
   * as a fraction of the step size. This value must lie in the range [0,1].
   * Only applies when yType is 'band' (or 'point').
   */
  yPaddingOuter?: number;
  /**
   * Extending the domain so that it starts and ends on nice round values. This method typically
   * modifies the scale's domain, and may only extend the bounds to the nearest round value. Nicing
   * is useful if the domain is computed from data and may be irregular. For example, for a domain
   * of [0.201479…, 0.996679…], a nice domain might be [0.2, 1.0].
   *
   * For quantitative scales such as linear, nice can be either a boolean flag or a number.
   * If nice is a number, it will represent a desired tick count. This allows greater control over
   * the step size used to extend the bounds, guaranteeing that the returned ticks will exactly
   * cover the domain.
   *
   * @default true for quantitative scales; false otherwise
   */
  yNice?: boolean | number;
  /**
   * If true, ensures that a zero baseline value is included in the scale domain.
   * Note: Log, time, and utc scales do not support zero.
   *
   * @default false
   */
  yZero?: boolean;
  /**
   * The number of ticks wanted for the Y-axis (note this is approximate).
   */
  yNumTicks?: number;
  /**
   * An array of values that determine the number and values of the ticks. Falls back to scale
   * ticks or domain when not set. Overrides yNumTicks when set.
   */
  yTickValues?: (number | string | Date)[];

  /**
   * Legend position. Omit for default: shown at bottom when there is more than one series, hidden for a single series.
   * Set to `null` to hide the legend.
   *
   * @default 'bottom' when more than one series; hidden otherwise
   */
  legendPosition?: LegendPosition | null;
  /**
   * Show tooltip on hover.
   *
   * @default true
   */
  tooltip?: boolean;
  /**
   * Show crosshair on hover.
   *
   * @default true
   */
  showCrosshair?: boolean;
  /**
   * Show data point glyphs on hover.
   *
   * @default true
   */
  showDataPoints?: boolean;
  /**
   * Format tooltip values.
   *
   * @default Y as string
   */
  tooltipValueFormatter?: (datum: T) => string;

  /** Outer container width (omitted = 100%) */
  width?: number;
  /** Outer container height (omitted = 100%) */
  height?: number;
  /** Chart accessibility label */
  'aria-label'?: string;
  /** Screen reader description (SVG <desc>) */
  desc?: string;
  /** Additional class name */
  className?: string;
}

/** LineChart props. Custom T requires xAccessor and yAccessor. */
export type LineChartProps<T extends object = DataPoint> = LineChartPropsBase<T> & AccessorRequirement<T>;

/** Props for a single line series. */
type LineSeriesProps<T extends object = DataPoint> = Accessors<T> & { series: SeriesConfig<T> };

/** Renders one line series. */
function LineSeries<T extends object = DataPoint>(props: LineSeriesProps<T>) {
  const { series, xAccessor, yAccessor } = props;
  const color = useChartColor();

  const colorAccessor = useCallback(
    function colorAccessorForSeries(): string {
      return color;
    },
    [color]
  );

  return (
    <VisxLineSeries
      className={styles.line}
      colorAccessor={colorAccessor}
      data={series.data}
      dataKey={series.id}
      id={`line-series-${series.id}`}
      xAccessor={xAccessor}
      yAccessor={yAccessor}
    />
  );
}

/**
 * Line chart for time-series or categorical data with optional responsive horizontal scroll.
 *
 * Renders a line chart using visx XYChart with multiple series, optional legend (top/bottom),
 * configurable X/Y axes (titles, labels, tick marks, baselines, gridlines, domains, formatting),
 * and optional tooltip, crosshair, and data point glyphs on hover. Size is driven by the
 * container; when the computed minimum width exceeds the container, the chart area scrolls
 * horizontally and the Y-axis stays visually fixed via scroll sync.
 *
 * @template T - The data point type. Defaults to DataPoint. For custom types, xAccessor and yAccessor are required.
 * @remarks When T is not DataPoint, callers must supply both xAccessor and yAccessor; the type system does not enforce this at compile time. The component uses a type assertion to satisfy visx's accessor types.
 * @param props - {@link LineChartProps}
 * @returns JSX element rendering the line chart
 *
 * @example
 * ```tsx
 * // Single series with default DataPoint shape
 * <LineChart
 *   series={[{ name: 'Sales', data: [{ x: 1, y: 10 }, { x: 2, y: 20 }] }]}
 *   xTitle="Month"
 *   yTitle="Revenue"
 *   aria-label="Sales over time"
 * />
 * ```
 */
export function LineChart<T extends object = DataPoint>(props: LineChartProps<T>) {
  const {
    // Series and accessors
    series: seriesProp,
    xAccessor = defaultXAccessor,
    yAccessor = defaultYAccessor,

    // X-axis
    xTitle,
    xLabels,
    xLabelsOrientation = 'auto',
    xTickMarks,
    xBaseline,
    xGridlines,
    xTickFormat,
    xType = 'linear',
    xDomain,
    xPaddingOuter,
    xNice,
    xZero,
    xNumTicks,
    xTickValues,

    // Y-axis
    yTitle,
    yLabels,
    yTickMarks,
    yBaseline,
    yGridlines,
    yTickFormat,
    yType = 'linear',
    yDomain,
    yPaddingOuter,
    yNice,
    yZero,
    yNumTicks,
    yTickValues,

    // Tooltip, crosshair, legend
    tooltip: showTooltip = true,
    showCrosshair = true,
    showDataPoints = true,
    tooltipValueFormatter,
    legendPosition,

    // Layout and aria
    width,
    height,
    'aria-label': ariaLabel,
    desc,
    className
  } = props;
  const { parentRef, chartWidth, chartHeight, margin, scrollLeft, xAxisRef, yAxisRef, xLabelsVertical, yAxisRect } =
    useChartContainer({ xLabelsOrientation });
  const series = useNormalizedSeries(seriesProp);
  const showInteractiveFeatures = showTooltip || showCrosshair || showDataPoints;
  const effectiveLegendPosition = resolveLegendPosition(legendPosition, series.length);
  // See @remarks: custom T requires accessors; assertion satisfies visx LineSeries typings
  const typedXAccessor = xAccessor as (d: T) => number | string | Date;
  const typedYAccessor = yAccessor as (d: T) => number | string | Date | null;

  // Handle tooltip rendering
  const renderTooltip = useCallback(
    function renderTooltip(params: { tooltipData?: TooltipData<T> }) {
      if (!showTooltip) {
        return <></>;
      }

      // Narrow to DataPoint overload; Tooltip overloads can't resolve generic T
      return (
        <ChartTooltip
          tooltipData={params.tooltipData as TooltipData<DataPoint> | undefined}
          series={series as SeriesConfig<DataPoint>[]}
          formatValue={tooltipValueFormatter as ((datum: DataPoint) => string) | undefined}
        />
      );
    },
    [series, tooltipValueFormatter, showTooltip]
  );

  const xScaleConfig = useMemo(
    function getXScaleConfig() {
      return buildScaleConfig({
        type: xType,
        domain: xDomain,
        paddingOuter: xPaddingOuter,
        nice: xNice,
        zero: xZero
      });
    },
    [xType, xDomain, xPaddingOuter, xNice, xZero]
  );

  const yScaleConfig = useMemo(
    function getYScaleConfig() {
      return buildScaleConfig({
        type: yType,
        domain: yDomain,
        paddingOuter: yPaddingOuter,
        nice: yNice,
        zero: yZero
      });
    },
    [yType, yDomain, yPaddingOuter, yNice, yZero]
  );

  const seriesElements = useMemo(
    function getSeriesElements() {
      return series.map(function addSeries(series: SeriesConfig<T>) {
        return <LineSeries<T> key={series.id} series={series} xAccessor={typedXAccessor} yAccessor={typedYAccessor} />;
      });
    },
    [series, typedXAccessor, typedYAccessor]
  );

  const chartStyle = {
    ['--_chart-width' as string]: width !== undefined ? `${width}px` : undefined,
    ['--_chart-height' as string]: height !== undefined ? `${height}px` : undefined
  };

  return (
    <ChartColorProvider>
      <Flex
        direction="row"
        className={cx(styles.chart, className)}
        style={chartStyle}
        data-legend-position={effectiveLegendPosition ? effectiveLegendPosition : undefined}
        data-x-labels={xLabels ? 'true' : undefined}
        data-y-labels={yLabels ? 'true' : undefined}
        data-x-labels-vertical={xLabelsVertical ? 'true' : undefined}
        data-x-baseline={xBaseline ? 'true' : undefined}
        data-y-baseline={yBaseline ? 'true' : undefined}
        data-x-tick-marks={xTickMarks ? 'true' : undefined}
        data-y-tick-marks={yTickMarks ? 'true' : undefined}
      >
        {yTitle && <AxisTitle title={yTitle} axis="y" />}
        <Flex direction="column" flex={1} className={styles.wrapper}>
          <Box ref={parentRef} className={styles.area}>
            {chartWidth > 0 && chartHeight > 0 && (
              <TooltipProvider hideTooltipDebounceMs={0}>
                <XYChart
                  xScale={xScaleConfig}
                  yScale={yScaleConfig}
                  width={chartWidth}
                  height={chartHeight}
                  margin={margin}
                  accessibilityLabel={ariaLabel}
                >
                  {desc && <desc>{desc}</desc>}

                  {/* Gridlines */}
                  {yGridlines && <Grid columns={false} className={styles.rows} lineStyle={GRIDLINE_STYLE} />}
                  {xGridlines && <Grid rows={false} className={styles.columns} lineStyle={GRIDLINE_STYLE} />}

                  {/* Series */}
                  {seriesElements}

                  {/* Interactive features - render if any are enabled */}
                  {showInteractiveFeatures && (
                    <Tooltip
                      snapTooltipToDatumX
                      snapTooltipToDatumY
                      showVerticalCrosshair={showCrosshair}
                      showSeriesGlyphs={showDataPoints}
                      renderTooltip={renderTooltip}
                      className={styles.tooltip}
                    />
                  )}

                  {/* X-axis */}
                  {(xBaseline || xTickMarks || xLabels) && (
                    <Axis
                      axisClassName={styles.axisX}
                      innerRef={xAxisRef}
                      orientation="bottom"
                      hideAxisLine={!xBaseline}
                      axisLineClassName={styles.baseline}
                      hideTicks={!xTickMarks}
                      numTicks={xNumTicks}
                      tickValues={xTickValues}
                      tickFormat={xTickFormat}
                      tickClassName={styles.tickMark}
                    />
                  )}

                  {/* Y-axis */}
                  {(yBaseline || yTickMarks || yLabels) && (
                    <>
                      {/* yAxisRect is used to position the y-axis background */}
                      {yAxisRect && (
                        <rect
                          x={scrollLeft}
                          y={yAxisRect.y}
                          width={margin.left}
                          height={yAxisRect.height}
                          className={styles.yAxisBackground}
                        />
                      )}
                      <Axis
                        axisClassName={styles.axisY}
                        innerRef={yAxisRef}
                        orientation="left"
                        left={margin.left + scrollLeft}
                        hideAxisLine={!yBaseline}
                        axisLineClassName={styles.baseline}
                        hideTicks={!yTickMarks}
                        numTicks={yNumTicks}
                        tickValues={yTickValues}
                        tickFormat={yTickFormat}
                        tickClassName={styles.tickMark}
                      />
                    </>
                  )}
                </XYChart>
                {showInteractiveFeatures && (
                  <TooltipDismissStrip width={margin.left + scrollLeft} height={chartHeight} />
                )}
              </TooltipProvider>
            )}
          </Box>
          {xTitle && <AxisTitle title={xTitle} axis="x" />}
          {effectiveLegendPosition && <Legend series={series} className={styles.legend} alignSelf="center" />}
        </Flex>
      </Flex>
    </ChartColorProvider>
  );
}
