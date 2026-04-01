import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps, type DataPoint } from '@godaddy/antares';

function formatDate(value: number | string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  return String(value);
}

function formatCurrency(value: number): string {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatTooltipCurrency(d: DataPoint): string {
  return `$${d.y!.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function FormattingExample(props: Partial<LineChartProps>) {
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
      xLabels={true}
      yLabels={true}
      xTickFormat={formatDate}
      yTickFormat={formatCurrency}
      tooltipValueFormatter={formatTooltipCurrency}
      height={400}
      aria-label="Formatting example chart"
      desc="Line chart demonstrating axis and tooltip formatting"
      {...props}
    />
  );
}
