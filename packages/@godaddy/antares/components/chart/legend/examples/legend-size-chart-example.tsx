import { Flex } from '#components/layout/flex';
import { Legend, type LegendProps } from '../src/index.tsx';

const series = [
  { id: 'product-a', name: 'Product A' },
  { id: 'product-b', name: 'Product B' },
  { id: 'product-c', name: 'Product C' }
];

export function LegendSizeChartExample(props: Partial<LegendProps>) {
  return (
    <Flex direction="column" gap="md">
      <Legend series={series} label="Small legend" size="sm" {...props} />
      <Legend series={series} label="Medium legend" size="md" {...props} />
      <Legend series={series} label="Large legend" size="lg" {...props} />
      <Legend series={series} label="Extra large legend" size="xl" {...props} />
    </Flex>
  );
}
