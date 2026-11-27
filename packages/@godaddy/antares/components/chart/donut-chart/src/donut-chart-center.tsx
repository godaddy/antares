import { createContext, forwardRef } from 'react';
import type { ContextValue } from 'react-aria-components';
import {
  ChartRegion,
  type ChartRegionDefinition,
  type ChartRegionProps
} from '#components/chart/_internal/chart-region';
import styles from './index.module.css';

export interface DonutChartCenterProps extends ChartRegionProps {}

export const DonutChartCenterContext =
  /* @__PURE__ */ createContext<ContextValue<DonutChartCenterProps, HTMLDivElement>>(null);

const centerRegion: ChartRegionDefinition = {
  name: 'center',
  context: DonutChartCenterContext,
  slots: { value: styles.value, description: styles.description }
};

/** Positions a value and description inside the donut ring. Use the `value` and `description` slots. */
export const DonutChartCenter = /* @__PURE__ */ forwardRef<HTMLDivElement, DonutChartCenterProps>(
  function DonutChartCenter(props, ref) {
    return <ChartRegion {...props} region={centerRegion} ref={ref} />;
  }
);
