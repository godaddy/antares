import { DonutChart, DonutChartCenter, Text, type TextProps } from '@godaddy/antares';

/** @ignore */
export function CenterOverrideExample({
  value = '$1,000',
  size,
  emphasis
}: {
  value?: string;
  size?: TextProps['size'];
  emphasis?: TextProps['emphasis'];
}) {
  return (
    <DonutChart data={[{ name: 'Total', value: 100 }]} aria-label="Donut chart with customized center text">
      <DonutChartCenter>
        <Text slot="value" size={size} emphasis={emphasis}>
          {value}
        </Text>
        <Text slot="description" size={size} emphasis={emphasis}>
          Sub label
        </Text>
      </DonutChartCenter>
    </DonutChart>
  );
}
