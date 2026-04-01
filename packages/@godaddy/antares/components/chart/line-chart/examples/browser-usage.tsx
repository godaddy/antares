import { browserUsage } from '@visx/mock-data';
import { LineChart, type LineChartProps, type DataPoint } from '@godaddy/antares';

function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

function formatTooltipPercentage(d: DataPoint): string {
  return `${(d.y as number).toFixed(2)}%`;
}

export function BrowserUsageExample(props: Partial<LineChartProps>) {
  const browserNames = ['Google Chrome', 'Internet Explorer', 'Firefox', 'Safari', 'Microsoft Edge', 'Opera'] as const;

  const series = browserNames.map(function mapBrowser(browser) {
    return {
      id: `browser-${browser.toLowerCase().replace(/\s+/g, '-')}`,
      name: browser,
      data: browserUsage.map((d) => ({ x: d.date, y: parseFloat(d[browser as keyof typeof d] as string) }))
    };
  });

  return (
    <LineChart
      series={series}
      xType="band"
      xTitle="Date"
      yTitle="Market Share (%)"
      xLabels={true}
      yLabels={true}
      xTickMarks={true}
      yTickMarks={true}
      xBaseline={true}
      yBaseline={true}
      xGridlines={true}
      yGridlines={true}
      xNice={true}
      yNice={true}
      yTickFormat={formatPercentage}
      tooltipValueFormatter={formatTooltipPercentage}
      legendPosition="bottom"
      height={400}
      aria-label="Browser usage market share chart"
      desc="Line chart showing browser market share percentages over time with multiple series, complete axis configuration including gridlines, tick marks, baselines, date formatting, and percentage formatting"
      {...props}
    />
  );
}
