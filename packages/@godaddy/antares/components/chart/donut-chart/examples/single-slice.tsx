import { DonutChart, DonutChartCenter, Text } from '@godaddy/antares';

/**
 * One slice fills the ring. The `description` slot adds a smaller second line beneath the main value.
 * @title Single slice
 * @order 2
 */
export function SingleSliceExample({ descriptionFirst }: { descriptionFirst?: boolean }) {
  const value = (
    <Text key="value" slot="value">
      $1,000
    </Text>
  );
  const description = (
    <Text key="description" slot="description">
      Sub label
    </Text>
  );
  return (
    <DonutChart data={[{ id: 'only', name: 'Total', value: 100 }]} aria-label="Donut chart with a single full ring">
      <DonutChartCenter>{descriptionFirst ? [description, value] : [value, description]}</DonutChartCenter>
    </DonutChart>
  );
}
