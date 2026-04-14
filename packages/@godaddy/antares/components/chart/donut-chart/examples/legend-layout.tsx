import { DonutChart, Flex } from '@godaddy/antares';

const data = [
  { id: '1', name: 'Product A', value: 40 },
  { id: '2', name: 'Product B', value: 30 },
  { id: '3', name: 'Product C', value: 20 },
  { id: '4', name: 'Product D', value: 10 }
];

export function LegendLayoutExample() {
  return (
    <Flex direction="column" gap="xl">
      <DonutChart
        data={data}
        label="100%"
        legend="right"
        legendLabel="Legend title"
        aria-label="Donut with legend to the right"
      />
      <DonutChart
        data={data}
        label="100%"
        legend="bottom"
        legendLabel="Legend title"
        aria-label="Donut with legend below"
      />
    </Flex>
  );
}
