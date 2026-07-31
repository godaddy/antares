import { BarChart } from '@godaddy/antares';

/**
 * `xDomain` and `yDomain` pin down exactly which categories and value range to draw. Here category `F` has no data and still gets an empty slot, and the Y range stays `[0, 40]` even though the largest bar is 30 - handy when several charts need to share a scale.
 * @title Custom domain
 * @order 5
 */
export function CustomDomainExample() {
  const data = [
    { category: 'A', value: 10 },
    { category: 'B', value: 20 },
    { category: 'C', value: 15 },
    { category: 'D', value: 30 },
    { category: 'E', value: 5 }
  ];
  // Example: set xDomain and yDomain explicitly
  const xDomain = ['A', 'B', 'D', 'E', 'F', 'C']; // F will show as empty slot
  const yDomain: [number, number] = [0, 40];
  return (
    <BarChart
      series={[
        {
          id: 'series1',
          name: 'Sample Series',
          data
        }
      ]}
      xAccessor={(d: { category: string; value: number }) => d.category}
      yAccessor={(d: { category: string; value: number }) => d.value}
      height={400}
      width={600}
      xAxisTitle="Category"
      yAxisTitle="Value"
      xDomain={xDomain}
      yDomain={yDomain}
    />
  );
}
