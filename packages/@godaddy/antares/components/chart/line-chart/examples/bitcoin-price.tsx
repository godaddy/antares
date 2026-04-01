import { bitcoinPrice } from '@visx/mock-data';
import { LineChart, type LineChartProps, type DataPoint } from '@godaddy/antares';

function formatDate(value: number | string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  return String(value);
}

function formatLargeCurrency(value: number): string {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatTooltipCurrency(d: DataPoint): string {
  return `$${(d.y as number).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function BitcoinPriceExample(props: Partial<LineChartProps>) {
  const series = [
    {
      id: 'bitcoin-price',
      name: 'Bitcoin Price',
      data: bitcoinPrice.prices
        .map((d) => ({ x: new Date(d.time), y: Number(d.price) }))
        .sort((a, b) => a.x.getTime() - b.x.getTime())
    }
  ];

  return (
    <LineChart
      series={series}
      xType="time"
      xTitle="Date"
      yTitle={`Price (${bitcoinPrice.currency})`}
      xLabels={true}
      yLabels={true}
      xTickFormat={formatDate}
      yTickFormat={formatLargeCurrency}
      yGridlines={true}
      yNice={true}
      tooltipValueFormatter={formatTooltipCurrency}
      height={500}
      aria-label="Bitcoin price chart"
      desc="Line chart showing Bitcoin price over time with complete configuration including large number currency formatting, date formatting, gridlines, tick marks, baselines, and nice rounded values"
      {...props}
    />
  );
}
