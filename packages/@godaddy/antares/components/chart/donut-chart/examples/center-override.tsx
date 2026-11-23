import { DonutChart, DonutChartCenter, Text, type TextProps } from '@godaddy/antares';

/** @ignore */
export function CenterOverrideExample({ value = '$1,000', size }: { value?: string; size?: TextProps['size'] }) {
  return (
    <DonutChart data={[{ name: 'Total', value: 100 }]} aria-label="Donut chart with customized center text">
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
