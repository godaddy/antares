import { appleStock } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

/**
 * `xDomain` and `yDomain` pin the visible range. Use them to keep a fixed scale, or to keep several charts comparable.
 * @title Fixed domain
 * @order 12
 */
export function FixedDomainExample(props: Partial<LineChartProps>) {
  const data = appleStock
    .slice(0, 150)
    .map((d) => ({ x: new Date(d.date), y: d.close }))
    .sort((a, b) => a.x.getTime() - b.x.getTime());

  const series = [
    {
      id: 'series-1',
      name: 'Stock Price',
      data: data
    }
  ];

  return (
    <LineChart
      series={series}
      xType="time"
      xLabels={true}
      yLabels={true}
      xDomain={[new Date('2007-04-01'), new Date('2007-06-01')]}
      yDomain={[80, 200]}
      height={400}
      aria-label="Fixed domain example chart"
      desc="Line chart demonstrating explicit domain values with axis labels. Shows Apple stock data for the year 2007 with a fixed X-axis domain."
      {...props}
    />
  );
}
