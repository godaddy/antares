import { createContext } from 'react';
import type { ContextValue } from 'react-aria-components';
import { cx } from 'cva';
import {
  ChartRegion,
  type ChartRegionDefinition,
  type ChartRegionProps
} from '#components/chart/_internal/chart-region';
import styles from './index.module.css';

export interface GaugeChartRangeProps extends ChartRegionProps {}

export const GaugeChartRangeContext = createContext<ContextValue<GaugeChartRangeProps, HTMLDivElement>>(null);

const rangeRegion: ChartRegionDefinition = {
  name: 'range',
  context: GaugeChartRangeContext,
  slots: { min: cx(styles.rangeLabel, styles.min), max: cx(styles.rangeLabel, styles.max) }
};

/** Labels the start and end of the gauge arc with the `min` and `max` slots. The labels do not change the scale. */
export function GaugeChartRange(props: GaugeChartRangeProps) {
  return <ChartRegion {...props} region={rangeRegion} />;
}
