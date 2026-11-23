import { DonutChart, DonutChartCenter, Text, type TextProps } from '@godaddy/antares';

/**
 * One slice fills the ring. The `description` slot adds a smaller second line beneath the main value.
 * @title Single slice
 * @order 2
 */
export function SingleSliceExample({ value = '$1,000', size }: { value?: string; size?: TextProps['size'] }) {
  return (
    <DonutChart data={[{ id: 'only', name: 'Total', value: 100 }]} aria-label="Donut chart with a single full ring">
      <DonutChartCenter>
        <Text slot="value" size={size}>
          {value}
        </Text>
        <Text slot="description" size={size}>
          Sub label
        </Text>
      </DonutChartCenter>
    </DonutChart>
  );
}
