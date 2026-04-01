import { appleStock } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function MissingValuesExample(props: Partial<LineChartProps>) {
  const missingPeriodStart = new Date('2010-01-01');
  const missingPeriodEnd = new Date('2010-12-31T23:59:59.999');

  const series = [
    {
      id: 'apple-stock-missing',
      name: 'Apple Stock Price',
      data: appleStock.map(function mapStockData(d) {
        const date = new Date(d.date);
        const isInMissingPeriod = date >= missingPeriodStart && date <= missingPeriodEnd;
        return {
          x: date,
          y: isInMissingPeriod ? null : d.close
        };
      })
    }
  ];

  return (
    <LineChart
      series={series}
      xType="time"
      height={400}
      aria-label="Missing values example chart"
      desc="Line chart demonstrating null values handling with visual breaks"
      {...props}
    />
  );
}
