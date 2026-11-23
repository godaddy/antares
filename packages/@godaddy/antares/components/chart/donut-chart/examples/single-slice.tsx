import { DonutChart, DonutChartCenter, Text } from '@godaddy/antares';

/**
 * One slice fills the ring. The `description` slot adds a smaller second line beneath the main value.
 * @title Single slice
 * @order 2
 */
export function SingleSliceExample() {
  return (
    <DonutChart data={[{ id: 'only', name: 'Total', value: 100 }]} aria-label="Donut chart with a single full ring">
      <DonutChartCenter>
        <Text slot="value">$1,000</Text>
        <Text slot="description">Sub label</Text>
      </DonutChartCenter>
    </DonutChart>
  );
}
