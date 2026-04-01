import { BarChart } from '@godaddy/antares';

export function BarChartFormattedTickMarksExample() {
  // Example data with Date categories
  const data = [
    { category: new Date(2024, 0, 1), value: 1000 }, // Jan 1
    { category: new Date(2024, 1, 15), value: 2500 }, // Feb 15
    { category: new Date(2024, 2, 10), value: 1750 }, // Mar 10
    { category: new Date(2024, 3, 5), value: 3000 }, // Apr 5
    { category: new Date(2024, 4, 20), value: 1250 } // May 20
  ];

  // Format x-axis as abbreviated month and day
  function formatDateTick(value: Date | string | number) {
    if (value instanceof Date) {
      return value.toLocaleString('en-US', { month: 'short', day: 'numeric' });
    }
    return String(value);
  }

  // Format y-axis as comma-separated number
  function formatNumberWithCommas(value: number | string | Date) {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return String(value);
  }

  return (
    <BarChart
      series={[
        {
          id: 'series1',
          name: 'Sales',
          data
        }
      ]}
      xAccessor={(d: { category: Date; value: number }) => d.category}
      yAccessor={(d: { category: Date; value: number }) => d.value}
      height={400}
      width={600}
      xAxisTitle="Date"
      yAxisTitle="Sales Amount"
      xTickFormat={formatDateTick}
      yTickFormat={formatNumberWithCommas}
    />
  );
}
