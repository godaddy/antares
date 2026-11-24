import { createContext } from 'react';
import type { ContextValue } from 'react-aria-components';
import {
  ChartRegion,
  type ChartRegionDefinition,
  type ChartRegionProps
} from '#components/chart/_internal/chart-region';
import styles from './index.module.css';

export interface GaugeChartCenterProps extends ChartRegionProps {}

export const GaugeChartCenterContext = createContext<ContextValue<GaugeChartCenterProps, HTMLDivElement>>(null);

const centerRegion: ChartRegionDefinition = {
  name: 'center',
  context: GaugeChartCenterContext,
  slots: { value: styles.value, description: styles.description }
};

/** Positions a value inside the gauge arc and a description below it. Use the `value` and `description` slots. */
export function GaugeChartCenter(props: GaugeChartCenterProps) {
  return <ChartRegion {...props} region={centerRegion} />;
}
