import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps, type DataPoint } from '@godaddy/antares';

function formatTooltipValue(d: DataPoint): string {
  return `Value: ${(d.y as number).toFixed(2)} units`;
}

export function CustomTooltipFormattingExample(props: Partial<LineChartProps>) {
  const series = [
    {
      id: 'series-1',
      name: 'Series 1',
      data: cityTemperature
        .slice(0, 10)
        .map((d) => ({ x: new Date(d.date), y: parseFloat(d['New York']) }))
        .sort((a, b) => a.x.getTime() - b.x.getTime())
    }
  ];

  return (
    <LineChart
      series={series}
      xType="time"
      yZero={false}
      xLabels={false}
      yLabels={false}
      tooltipValueFormatter={formatTooltipValue}
      height={400}
      aria-label="Custom tooltip formatting example chart"
      desc="Line chart demonstrating custom tooltip formatter"
      {...props}
    />
  );
}
