import { ChartLegend, DonutChart, DonutChartCenter, type DonutChartProps, Flex, Text } from '@godaddy/antares';

const data = [
  { id: '1', name: 'Product A', value: 40 },
  { id: '2', name: 'Product B', value: 30 },
  { id: '3', name: 'Product C', value: 20 },
  { id: '4', name: 'Product D', value: 10 }
];

/**
 * The legend reads the chart's data and appears below the ring by default. Set `legendPlacement="end"` to place it beside the ring in the current text direction.
 * @title Legend placement
 * @order 3
 */
export function LegendLayoutExample({ data: slices = data }: Partial<Pick<DonutChartProps, 'data'>>) {
  return (
    <Flex direction="column" gap="xl">
      <DonutChart data={slices} legendPlacement="end" aria-label="Donut with legend beside it">
        <ChartLegend label="Side legend" />
        <DonutChartCenter>
          <Text slot="value">100%</Text>
        </DonutChartCenter>
      </DonutChart>
      <DonutChart data={slices} aria-label="Donut with legend below">
        <DonutChartCenter>
          <Text slot="value">100%</Text>
        </DonutChartCenter>
        <ChartLegend label="Bottom legend" />
      </DonutChart>
    </Flex>
  );
}
