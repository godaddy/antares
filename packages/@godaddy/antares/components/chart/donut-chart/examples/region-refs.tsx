import { ChartLegend, DonutChart, DonutChartCenter, Text } from '@godaddy/antares';
import type { Ref } from 'react';

/** @ignore */
export function RegionRefsExample(props: { centerRef?: Ref<HTMLDivElement>; legendRef?: Ref<HTMLDivElement> }) {
  return (
    <DonutChart data={[{ name: 'Online', value: 1 }]} aria-label="Donut chart with region refs">
      <DonutChartCenter ref={props.centerRef}>
        <Text slot="value">100%</Text>
      </DonutChartCenter>
      <ChartLegend ref={props.legendRef} label="Channel" />
    </DonutChart>
  );
}
