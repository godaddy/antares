import { Box } from '#components/layout/box';
import { Flex } from '#components/layout/flex';
import { Text } from '#components/text';
import type { TooltipData } from '@visx/xychart';
import type { ReactElement } from 'react';
import { useMemo } from 'react';
import type { DataPoint, SeriesConfig } from '../../../types.ts';
import { yAccessor as defaultYAccessor } from '../../../utils.ts';
import { cx } from 'cva';
import styles from './index.module.css';

/** Default formatter: Y as string, or '' if null. */
function defaultFormatValue<T extends object = DataPoint>(d: T): string {
  const value = (defaultYAccessor as (datum: T) => number | string | Date | null)(d);
  return value !== null ? String(value) : '';
}

/**
 * Common props for all Tooltip variants.
 *
 * @typeParam T - Data point type for the chart series.
 */
interface TooltipBaseProps<T extends object> {
  /** Hovered data from visx. */
  tooltipData?: TooltipData<T>;
  /** Series config for names and colors. */
  series: SeriesConfig<T>[];
  /** Additional class name. */
  className?: string;
  /** Whether to show the tooltip arrow @default false */
  showArrow?: boolean;
}

/** Props when using the default {@link DataPoint} shape — `formatValue` is optional and defaults to reading `y`. */
export interface TooltipProps extends TooltipBaseProps<DataPoint> {
  /** Formats each value for display. @default Y as string, or '' if null */
  formatValue?: (datum: DataPoint) => string;
}

/**
 * Props when using a custom data shape — `formatValue` is **required** to avoid
 * silently rendering "undefined" for types that lack a `y` property.
 */
interface TooltipPropsCustom<T extends object> extends TooltipBaseProps<T> {
  /** Formats each value for display. Required for custom data shapes. */
  formatValue: (datum: T) => string;
}

/**
 * Tooltip for visx charts. Renders a popover with each series' color indicator, name, and formatted value at the hovered X position.
 *
 * @param props - {@link TooltipProps}
 */
export function Tooltip(props: TooltipProps): ReactElement | null;

/**
 * Tooltip for visx charts with custom data shape. Renders a popover with each series' color indicator, name, and formatted value at the hovered X position.
 *
 * @template T - Custom data point type. Requires `formatValue` to be provided.
 * @param props - {@link TooltipPropsCustom}
 */
export function Tooltip<T extends object>(props: TooltipPropsCustom<T>): ReactElement | null;

export function Tooltip<T extends object = DataPoint>(
  props: TooltipProps | TooltipPropsCustom<T>
): ReactElement | null {
  const { tooltipData, series, className, showArrow = false } = props;
  const formatValue = props.formatValue ?? (defaultFormatValue as (datum: T) => string);

  const seriesData = useMemo(
    function getSeriesData() {
      if (!tooltipData?.datumByKey) {
        return [];
      }

      return (series as SeriesConfig<T>[])
        .filter(function hasDatum(seriesItem: SeriesConfig<T>) {
          return tooltipData.datumByKey[seriesItem.id] != null;
        })
        .map(function toSeriesItem(seriesItem: SeriesConfig<T>) {
          const datum = tooltipData.datumByKey[seriesItem.id];
          return { ...seriesItem, value: (formatValue as (d: unknown) => string)(datum.datum) };
        });
    },
    [tooltipData, series, formatValue]
  );

  if (seriesData.length === 0) {
    return null;
  }

  return (
    <Box padding="md" rounding="2xl" elevation="raised" className={cx(styles.tooltip, className)}>
      <Flex role="list" aria-label="Tooltip data" direction="column" gap="sm">
        {seriesData.map(function renderSeriesItem(item) {
          return (
            <Flex
              key={item.id}
              role="listitem"
              justifyContent="space-between"
              gap="md"
              className={styles.item}
              display="inline-flex"
            >
              <Flex alignItems="center" gap="sm">
                <Box className={styles.swatch} rounding="full" />
                <Text>{item.name}</Text>
              </Flex>
              <Text className={styles.value}>{item.value}</Text>
            </Flex>
          );
        })}
      </Flex>
      {showArrow && <div className={styles.tooltipArrow} />}
    </Box>
  );
}
