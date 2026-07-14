import{i as e}from"./preload-helper-B4cZKGJ2.js";import{y as t}from"./iframe-DzleJ5nK.js";import{S as n,c as r,l as i,n as ee,s as a,u as te}from"./blocks-DjjSfXWS.js";import{t as o}from"./mdx-react-shim-BpPjRzfn.js";import{BandPadding as s,Baselines as c,BitcoinPrice as l,BrowserUsage as u,CityTemperature as d,CrosshairOnly as f,CustomAccessors as p,CustomTicks as m,CustomTooltipFormatting as ne,FixedDomain as re,FixedSize as ie,Formatting as ae,Gridlines as oe,Labels as se,Legend as ce,MissingValues as le,MultipleSeries as ue,NiceValues as de,Props as fe,RTL as pe,SingleSeries as me,Ticks as he,Titles as ge,TooltipDisabled as _e,ZeroIncluded as h,n as g,t as _}from"./line-chart.stories-Dc2uiy9p.js";var v,y=e((()=>{v=`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps, type DataPoint } from '@godaddy/antares';

function formatTooltipValue(d: DataPoint): string {
  return \`Value: \${(d.y as number).toFixed(2)} units\`;
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
`})),b,x=e((()=>{b=`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps, type DataPoint } from '@godaddy/antares';

function formatDate(value: number | string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  return String(value);
}

function formatTemperature(value: number): string {
  return \`\${value.toFixed(1)}°F\`;
}

function formatTooltipTemperature(d: DataPoint): string {
  return \`\${(d.y as number).toFixed(1)}°F\`;
}

export function CityTemperatureExample(props: Partial<LineChartProps>) {
  const cities = ['New York', 'San Francisco', 'Austin'] as const;

  const series = cities.map(function mapCity(city) {
    return {
      id: \`city-\${city.toLowerCase().replace(/\\s+/g, '-')}\`,
      name: city,
      data: cityTemperature
        .map((d) => ({ x: new Date(d.date), y: parseFloat(d[city as keyof typeof d] as string) }))
        .sort((a, b) => a.x.getTime() - b.x.getTime())
    };
  });

  return (
    <LineChart
      series={series}
      xType="time"
      xLabels={true}
      yLabels={true}
      xTickMarks={true}
      yTickMarks={true}
      xBaseline={true}
      yBaseline={true}
      xNice={true}
      yNice={true}
      xTickFormat={formatDate}
      yTickFormat={formatTemperature}
      legendPosition="top"
      tooltipValueFormatter={formatTooltipTemperature}
      height={400}
      aria-label="City temperature comparison chart"
      desc="Line chart showing temperature comparisons across multiple cities over time with complete axis configuration including gridlines, tick marks, baselines, date formatting, and unit formatting"
      {...props}
    />
  );
}
`})),S,C=e((()=>{S=`import { type DateValue, cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function CustomAccessorsExample(props: Partial<LineChartProps<DateValue>>) {
  const series = [
    {
      id: 'series-1',
      name: 'Series 1',
      data: cityTemperature
        .slice(0, 10)
        .map((d) => ({ date: new Date(d.date), value: parseFloat(d['New York']) }))
        .sort((a, b) => a.date.getTime() - b.date.getTime())
    }
  ];

  return (
    <LineChart
      series={series}
      xType="time"
      xAccessor={(d) => d.date}
      yAccessor={(d) => d.value}
      xLabels={false}
      yLabels={false}
      height={400}
      aria-label="Custom accessors example chart"
      desc="Line chart demonstrating custom data types with accessors"
      {...props}
    />
  );
}
`})),w,T=e((()=>{w=`import { bitcoinPrice } from '@visx/mock-data';
import { LineChart, type LineChartProps, type DataPoint } from '@godaddy/antares';

function formatDate(value: number | string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  return String(value);
}

function formatLargeCurrency(value: number): string {
  return \`$\${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\`;
}

function formatTooltipCurrency(d: DataPoint): string {
  return \`$\${(d.y as number).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\`;
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
      yTitle={\`Price (\${bitcoinPrice.currency})\`}
      xLabels={true}
      yLabels={true}
      xTickFormat={formatDate}
      yTickFormat={formatLargeCurrency}
      yGridlines={true}
      yNice={true}
      tooltipValueFormatter={formatTooltipCurrency}
      height={600}
      aria-label="Bitcoin price chart"
      desc="Line chart showing Bitcoin price over time with complete configuration including large number currency formatting, date formatting, gridlines, tick marks, baselines, and nice rounded values"
      {...props}
    />
  );
}
`})),E,D=e((()=>{E=`import { browserUsage } from '@visx/mock-data';
import { LineChart, type LineChartProps, type DataPoint } from '@godaddy/antares';

function formatPercentage(value: number): string {
  return \`\${value.toFixed(2)}%\`;
}

function formatTooltipPercentage(d: DataPoint): string {
  return \`\${(d.y as number).toFixed(2)}%\`;
}

export function BrowserUsageExample(props: Partial<LineChartProps>) {
  const browserNames = ['Google Chrome', 'Internet Explorer', 'Firefox', 'Safari', 'Microsoft Edge', 'Opera'] as const;

  const series = browserNames.map(function mapBrowser(browser) {
    return {
      id: \`browser-\${browser.toLowerCase().replace(/\\s+/g, '-')}\`,
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
      height={600}
      aria-label="Browser usage market share chart"
      desc="Line chart showing browser market share percentages over time with multiple series, complete axis configuration including gridlines, tick marks, baselines, date formatting, and percentage formatting"
      {...props}
    />
  );
}
`})),O,k=e((()=>{O=`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function MultipleSeriesExample(props: Partial<LineChartProps>) {
  const series = [
    {
      id: 'series-1',
      name: 'Product A',
      data: cityTemperature
        .slice(0, 10)
        .map((d) => ({ x: new Date(d.date), y: parseFloat(d['New York']) }))
        .sort((a, b) => a.x.getTime() - b.x.getTime())
    },
    {
      id: 'series-2',
      name: 'Product B',
      data: cityTemperature
        .slice(0, 10)
        .map((d) => ({ x: new Date(d.date), y: parseFloat(d['San Francisco']) }))
        .sort((a, b) => a.x.getTime() - b.x.getTime())
    },
    {
      id: 'series-3',
      name: 'Product C',
      data: cityTemperature
        .slice(0, 10)
        .map((d) => ({ x: new Date(d.date), y: parseFloat(d['Austin']) }))
        .sort((a, b) => a.x.getTime() - b.x.getTime())
    },
    {
      id: 'series-4',
      name: 'Product D',
      data: cityTemperature
        .slice(0, 10)
        .map((d) => ({ x: new Date(d.date), y: parseFloat(d['New York']) * 1.1 }))
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
      height={400}
      aria-label="Multiple series example chart"
      desc="Line chart demonstrating multiple series comparison"
      {...props}
    />
  );
}
`})),A,j=e((()=>{A=`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function TooltipDisabledExample(props: Partial<LineChartProps>) {
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
      xLabels={false}
      yLabels={false}
      tooltip={false}
      showCrosshair={false}
      showDataPoints={false}
      height={400}
      aria-label="Tooltip disabled example chart"
      desc="Line chart demonstrating no tooltip or interactive features"
      {...props}
    />
  );
}
`})),M,N=e((()=>{M=`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function CustomTicksExample(props: Partial<LineChartProps>) {
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
      xNumTicks={5}
      yNumTicks={9}
      height={400}
      aria-label="Custom ticks example chart"
      desc="Line chart demonstrating custom tick values/counts"
      {...props}
    />
  );
}
`})),P,F=e((()=>{P=`import { appleStock } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

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
`})),I,ve=e((()=>{I=`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps, type DataPoint } from '@godaddy/antares';

function formatDate(value: number | string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  return String(value);
}

function formatCurrency(value: number): string {
  return \`$\${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\`;
}

function formatTooltipCurrency(d: DataPoint): string {
  return \`$\${d.y!.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\`;
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
`})),L,ye=e((()=>{L=`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function GridlinesExample(props: Partial<LineChartProps>) {
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
      xGridlines={true}
      yGridlines={true}
      height={400}
      aria-label="Gridlines example chart"
      desc="Line chart demonstrating gridlines only"
      {...props}
    />
  );
}
`})),R,z=e((()=>{R=`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function NiceValuesExample(props: Partial<LineChartProps>) {
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
      xNice={true}
      yNice={true}
      height={400}
      aria-label="Nice values example chart"
      desc="Line chart demonstrating nice rounded values"
      {...props}
    />
  );
}
`})),B,be=e((()=>{B=`import { LineChart, type LineChartProps } from '@godaddy/antares';

export function BandPaddingExample(props: Partial<LineChartProps>) {
  const xDomain = ['Q1', 'Q2', 'Q3', 'Q4'];

  const series = [
    {
      name: 'Series 1',
      data: [
        { x: 'Q1', y: '100' },
        { x: 'Q2', y: '200' },
        { x: 'Q3', y: '150' },
        { x: 'Q4', y: '300' }
      ]
    }
  ];

  return (
    <LineChart
      series={series}
      xType="band"
      yType="band"
      xLabels={true}
      yLabels={true}
      xDomain={xDomain}
      xPaddingOuter={0.1}
      yPaddingOuter={0.1}
      height={400}
      aria-label="Band padding example chart"
      desc="Line chart demonstrating band scale padding"
      {...props}
    />
  );
}
`})),V,xe=e((()=>{V=`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function BaselinesExample(props: Partial<LineChartProps>) {
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
      xLabels={false}
      yLabels={false}
      xBaseline={true}
      yBaseline={true}
      height={400}
      aria-label="Baselines example chart"
      desc="Line chart demonstrating axis baselines only"
      {...props}
    />
  );
}
`})),H,Se=e((()=>{H=`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function CrosshairOnlyExample(props: Partial<LineChartProps>) {
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
      xLabels={false}
      yLabels={false}
      tooltip={false}
      showCrosshair={true}
      showDataPoints={true}
      height={400}
      aria-label="Crosshair only example chart"
      desc="Line chart demonstrating crosshair without tooltip"
      {...props}
    />
  );
}
`})),U,Ce=e((()=>{U=`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function FixedSizeExample(props: Partial<LineChartProps>) {
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
      xLabels={false}
      yLabels={false}
      width={800}
      height={400}
      aria-label="Fixed size example chart"
      desc="Line chart demonstrating fixed width/height"
      {...props}
    />
  );
}
`})),W,we=e((()=>{W=`import { appleStock } from '@visx/mock-data';
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
      xLabels={false}
      yLabels={false}
      height={400}
      aria-label="Missing values example chart"
      desc="Line chart demonstrating null values handling with visual breaks"
      {...props}
    />
  );
}
`})),G,Te=e((()=>{G=`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function SingleSeriesExample(props: Partial<LineChartProps>) {
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
      height={400}
      aria-label="Single series example chart"
      desc="Line chart demonstrating single series with minimal configuration"
      {...props}
    />
  );
}
`})),K,Ee=e((()=>{K=`import { appleStock } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function ZeroIncludedExample(props: Partial<LineChartProps>) {
  const series = [
    {
      id: 'series-1',
      name: 'Series 1',
      data: appleStock.slice(0, 40).map((d, i) => ({ x: i, y: d.close }))
    }
  ];

  return (
    <LineChart
      series={series}
      xType="linear"
      xLabels={true}
      yLabels={true}
      xZero={true}
      yZero={true}
      height={500}
      aria-label="Zero included example chart"
      desc="Line chart demonstrating zero included in domain"
      {...props}
    />
  );
}
`})),q,De=e((()=>{q=`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function LabelsExample(props: Partial<LineChartProps>) {
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
      height={400}
      aria-label="Labels example chart"
      desc="Line chart demonstrating axis labels only"
      {...props}
    />
  );
}
`})),J,Oe=e((()=>{J=`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function LegendExample(props: Partial<LineChartProps>) {
  const series = [
    {
      id: 'series-1',
      name: 'Series 1',
      data: cityTemperature
        .slice(0, 10)
        .map((d) => ({ x: new Date(d.date), y: parseFloat(d['New York']) }))
        .sort((a, b) => a.x.getTime() - b.x.getTime())
    },
    {
      id: 'series-2',
      name: 'Series 2',
      data: cityTemperature
        .slice(0, 10)
        .map((d) => ({ x: new Date(d.date), y: parseFloat(d['San Francisco']) }))
        .sort((a, b) => a.x.getTime() - b.x.getTime())
    },
    {
      id: 'series-3',
      name: 'Series 3',
      data: cityTemperature
        .slice(0, 10)
        .map((d) => ({ x: new Date(d.date), y: parseFloat(d['Austin']) }))
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
      legendPosition="bottom"
      height={400}
      aria-label="Legend example chart"
      desc="Line chart demonstrating legend only"
      {...props}
    />
  );
}
`})),Y,ke=e((()=>{Y=`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function TitlesExample(props: Partial<LineChartProps>) {
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
      xTitle="Date"
      yTitle="Value"
      height={400}
      aria-label="Titles example chart"
      desc="Line chart demonstrating axis titles only"
      {...props}
    />
  );
}
`})),X,Ae=e((()=>{X=`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function TicksExample(props: Partial<LineChartProps>) {
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
      xLabels={false}
      yLabels={false}
      xTickMarks={true}
      yTickMarks={true}
      height={400}
      aria-label="Ticks example chart"
      desc="Line chart demonstrating tick marks only"
      {...props}
    />
  );
}
`})),Z,je=e((()=>{Z=`import { RTLProvider } from '../../../../utils/rtl-locale-provider.tsx';
import { CityTemperatureExample } from './city-temperature.tsx';
import type { LineChartProps } from '@godaddy/antares';

export function RTLExample(props: Partial<LineChartProps>) {
  return (
    <RTLProvider>
      <CityTemperatureExample {...props} />
    </RTLProvider>
  );
}
`}));function Q(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(a,{of:g,name:`Overview`}),`
`,(0,$.jsx)(t.h1,{id:`linechart`,children:`LineChart`}),`
`,(0,$.jsx)(t.p,{children:`Line Chart shows how something changes over time or along a continuous scale. It connects data points with lines so people can quickly spot trends, peaks, dips, and patterns.`}),`
`,(0,$.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,$.jsx)(t.pre,{children:(0,$.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,$.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,$.jsx)(ee,{of:fe}),`
`,(0,$.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,$.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,$.jsx)(t.h4,{id:`single-series`,children:`Single Series`}),`
`,(0,$.jsx)(t.p,{children:`One line with time-scale X-axis and minimal configuration.`}),`
`,(0,$.jsx)(i,{of:me,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:G}),`
`,(0,$.jsx)(t.h4,{id:`multiple-series`,children:`Multiple Series`}),`
`,(0,$.jsx)(t.p,{children:`Several lines with a bottom legend and shared X-axis.`}),`
`,(0,$.jsx)(i,{of:ue,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:O}),`
`,(0,$.jsx)(t.h3,{id:`axis`,children:`Axis`}),`
`,(0,$.jsx)(t.h4,{id:`gridlines`,children:`Gridlines`}),`
`,(0,$.jsxs)(t.p,{children:[`Vertical and horizontal gridlines via `,(0,$.jsx)(t.code,{children:`xGridlines`}),` and `,(0,$.jsx)(t.code,{children:`yGridlines`}),`.`]}),`
`,(0,$.jsx)(i,{of:oe,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:L}),`
`,(0,$.jsx)(t.h4,{id:`titles`,children:`Titles`}),`
`,(0,$.jsx)(t.p,{children:`X- and Y-axis titles to label what each axis represents (e.g. "Month", "Temperature (°F)").`}),`
`,(0,$.jsx)(i,{of:ge,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:Y}),`
`,(0,$.jsx)(t.h4,{id:`labels`,children:`Labels`}),`
`,(0,$.jsxs)(t.p,{children:[`Tick labels on both axes with `,(0,$.jsx)(t.code,{children:`xLabels`}),` and `,(0,$.jsx)(t.code,{children:`yLabels`}),`.`]}),`
`,(0,$.jsx)(i,{of:se,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:q}),`
`,(0,$.jsx)(t.h4,{id:`ticks`,children:`Ticks`}),`
`,(0,$.jsxs)(t.p,{children:[`Tick marks (short lines) at each tick value. Controlled by `,(0,$.jsx)(t.code,{children:`xTickMarks`}),` and `,(0,$.jsx)(t.code,{children:`yTickMarks`}),`.`]}),`
`,(0,$.jsx)(i,{of:he,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:X}),`
`,(0,$.jsx)(t.h4,{id:`baselines`,children:`Baselines`}),`
`,(0,$.jsxs)(t.p,{children:[`Axis baseline (the main axis line). Controlled by `,(0,$.jsx)(t.code,{children:`xBaseline`}),` and `,(0,$.jsx)(t.code,{children:`yBaseline`}),`.`]}),`
`,(0,$.jsx)(i,{of:c,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:V}),`
`,(0,$.jsx)(t.h4,{id:`legend`,children:`Legend`}),`
`,(0,$.jsxs)(t.p,{children:[`Legend showing series names and colors, positioned above or below the chart via `,(0,$.jsx)(t.code,{children:`legendPosition`}),`.`]}),`
`,(0,$.jsx)(i,{of:ce,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:J}),`
`,(0,$.jsx)(t.h3,{id:`formatting`,children:`Formatting`}),`
`,(0,$.jsx)(t.h4,{id:`axis-and-tooltip-formatting`,children:`Axis and Tooltip Formatting`}),`
`,(0,$.jsxs)(t.p,{children:[`Custom formatters for axis ticks and tooltip values (e.g. currency, dates). Controlled by `,(0,$.jsx)(t.code,{children:`xTickFormat`}),` and `,(0,$.jsx)(t.code,{children:`yTickFormat`}),`.`]}),`
`,(0,$.jsx)(i,{of:ae,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:I}),`
`,(0,$.jsx)(t.h3,{id:`scale`,children:`Scale`}),`
`,(0,$.jsx)(t.h4,{id:`fixed-domain`,children:`Fixed Domain`}),`
`,(0,$.jsx)(t.p,{children:`Explicit X and Y domain for a fixed range or consistent scale across charts.`}),`
`,(0,$.jsx)(i,{of:re,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:P}),`
`,(0,$.jsx)(t.h4,{id:`nice-values`,children:`Nice Values`}),`
`,(0,$.jsx)(t.p,{children:`Domain extended to nice round values (e.g. 0.2–1.0).`}),`
`,(0,$.jsx)(i,{of:de,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:R}),`
`,(0,$.jsx)(t.h4,{id:`zero-included`,children:`Zero Included`}),`
`,(0,$.jsxs)(t.p,{children:[`X and Y domains include zero via `,(0,$.jsx)(t.code,{children:`xZero`}),` and `,(0,$.jsx)(t.code,{children:`yZero`}),`.`]}),`
`,(0,$.jsx)(i,{of:h,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:K}),`
`,(0,$.jsx)(t.h4,{id:`custom-ticks`,children:`Custom Ticks`}),`
`,(0,$.jsxs)(t.p,{children:[`Explicit tick values or count with `,(0,$.jsx)(t.code,{children:`xTickValues`}),` / `,(0,$.jsx)(t.code,{children:`yTickValues`}),` or `,(0,$.jsx)(t.code,{children:`xNumTicks`}),` / `,(0,$.jsx)(t.code,{children:`yNumTicks`}),`.`]}),`
`,(0,$.jsx)(i,{of:m,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:M}),`
`,(0,$.jsx)(t.h4,{id:`band-padding`,children:`Band Padding`}),`
`,(0,$.jsxs)(t.p,{children:[`Outer padding on a band-scale axis with `,(0,$.jsx)(t.code,{children:`xPaddingOuter`}),` / `,(0,$.jsx)(t.code,{children:`yPaddingOuter`}),`.`]}),`
`,(0,$.jsx)(i,{of:s,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:B}),`
`,(0,$.jsx)(t.h3,{id:`interactive`,children:`Interactive`}),`
`,(0,$.jsx)(t.h4,{id:`tooltip-disabled`,children:`Tooltip Disabled`}),`
`,(0,$.jsxs)(t.p,{children:[`Tooltip, crosshair, and data point glyphs all disabled (`,(0,$.jsx)(t.code,{children:`tooltip={false}`}),`, `,(0,$.jsx)(t.code,{children:`showCrosshair={false}`}),`, `,(0,$.jsx)(t.code,{children:`showDataPoints={false}`}),`).`]}),`
`,(0,$.jsx)(i,{of:_e,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:A}),`
`,(0,$.jsx)(t.h4,{id:`crosshair-only`,children:`Crosshair Only`}),`
`,(0,$.jsx)(t.p,{children:`Only the vertical crosshair on hover; tooltip and data point glyphs disabled.`}),`
`,(0,$.jsx)(i,{of:f,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:H}),`
`,(0,$.jsx)(t.h4,{id:`custom-tooltip-formatting`,children:`Custom Tooltip Formatting`}),`
`,(0,$.jsxs)(t.p,{children:[`Tooltip values formatted with `,(0,$.jsx)(t.code,{children:`tooltipValueFormatter`}),` (e.g. currency, units).`]}),`
`,(0,$.jsx)(i,{of:ne,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:v}),`
`,(0,$.jsx)(t.h3,{id:`data`,children:`Data`}),`
`,(0,$.jsx)(t.h4,{id:`custom-accessors`,children:`Custom Accessors`}),`
`,(0,$.jsxs)(t.p,{children:[`Custom data shape (e.g. `,(0,$.jsx)(t.code,{children:`date`}),`/`,(0,$.jsx)(t.code,{children:`value`}),`) with `,(0,$.jsx)(t.code,{children:`xAccessor`}),` and `,(0,$.jsx)(t.code,{children:`yAccessor`}),`.`]}),`
`,(0,$.jsx)(i,{of:p,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:S}),`
`,(0,$.jsx)(t.h4,{id:`missing-values`,children:`Missing Values`}),`
`,(0,$.jsx)(t.p,{children:`Null Y values create breaks in the line.`}),`
`,(0,$.jsx)(i,{of:le,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:W}),`
`,(0,$.jsx)(t.h3,{id:`layout`,children:`Layout`}),`
`,(0,$.jsx)(t.h4,{id:`fixed-size`,children:`Fixed Size`}),`
`,(0,$.jsxs)(t.p,{children:[`Explicit chart size via `,(0,$.jsx)(t.code,{children:`width`}),` and `,(0,$.jsx)(t.code,{children:`height`}),` props (e.g. 800×400).`]}),`
`,(0,$.jsx)(i,{of:ie,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:U}),`
`,(0,$.jsx)(t.h3,{id:`featured`,children:`Featured`}),`
`,(0,$.jsx)(t.h4,{id:`bitcoin-price`,children:`Bitcoin Price`}),`
`,(0,$.jsx)(t.p,{children:`Time-series with date and currency formatting, gridlines, and nice Y-axis.`}),`
`,(0,$.jsx)(i,{of:l,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:w}),`
`,(0,$.jsx)(t.h4,{id:`city-temperature`,children:`City Temperature`}),`
`,(0,$.jsx)(t.p,{children:`Multiple series over time with legend, shared time axis, and temperature (°F) formatting.`}),`
`,(0,$.jsx)(i,{of:d,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:b}),`
`,(0,$.jsx)(t.h4,{id:`browser-usage`,children:`Browser Usage`}),`
`,(0,$.jsx)(t.p,{children:`Categorical X-axis (band scale) with multiple series and percentage formatting.`}),`
`,(0,$.jsx)(i,{of:u,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:E}),`
`,(0,$.jsx)(t.h3,{id:`right-to-left`,children:`Right-to-Left`}),`
`,(0,$.jsxs)(t.p,{children:[`The chart follows the current `,(0,$.jsx)(t.strong,{children:`layout direction`}),` (LTR or RTL). By default, that direction is detected automatically from the browser or system settings. When it is RTL, the chart mirrors axes and labels accordingly.`]}),`
`,(0,$.jsx)(i,{of:pe,inline:!0}),`
`,(0,$.jsx)(r,{language:`tsx`,code:Z}),`
`,(0,$.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,$.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,$.jsx)(t.p,{children:`The chart root exposes data attributes that reflect prop state for styling:`}),`
`,(0,$.jsxs)(t.p,{children:[(0,$.jsx)(t.strong,{children:`Chart container:`}),` `,(0,$.jsx)(t.code,{children:`data-width`}),`, `,(0,$.jsx)(t.code,{children:`data-height`}),`, `,(0,$.jsx)(t.code,{children:`data-x-labels`}),`, `,(0,$.jsx)(t.code,{children:`data-y-labels`}),`, `,(0,$.jsx)(t.code,{children:`data-x-labels-vertical`}),`, `,(0,$.jsx)(t.code,{children:`data-x-baseline`}),`, `,(0,$.jsx)(t.code,{children:`data-y-baseline`}),`, `,(0,$.jsx)(t.code,{children:`data-x-tick-marks`}),`, `,(0,$.jsx)(t.code,{children:`data-y-tick-marks`})]}),`
`,(0,$.jsx)(t.h3,{id:`component-customization`,children:`Component Customization`}),`
`,(0,$.jsxs)(t.p,{children:[`Use the `,(0,$.jsx)(t.code,{children:`className`}),` prop on the chart container to add or override styles:`]}),`
`,(0,$.jsx)(t.pre,{children:(0,$.jsx)(t.code,{className:`language-tsx`,children:`<LineChart series={series} className="my-custom-chart" />
`})}),`
`,(0,$.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,$.jsx)(t.h3,{id:`aria-support`,children:`ARIA Support`}),`
`,(0,$.jsxs)(t.ul,{children:[`
`,(0,$.jsxs)(t.li,{children:[`Provide `,(0,$.jsx)(t.strong,{children:(0,$.jsx)(t.code,{children:`aria-label`})}),` to describe the chart (e.g. "Monthly sales revenue from January to May 2024").`]}),`
`,(0,$.jsxs)(t.li,{children:[`Use `,(0,$.jsx)(t.strong,{children:(0,$.jsx)(t.code,{children:`desc`})}),` for a longer description rendered in the SVG `,(0,$.jsx)(t.code,{children:`<desc>`}),` for screen readers.`]}),`
`,(0,$.jsx)(t.li,{children:`The component sets ARIA attributes on interactive and structural elements as needed.`}),`
`]}),`
`,(0,$.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,$.jsx)(t.h3,{id:`chart-not-sizing-or-empty`,children:`Chart Not Sizing or Empty`}),`
`,(0,$.jsxs)(t.p,{children:[`Ensure the chart has a non-zero size. Place it in a container with explicit dimensions or use `,(0,$.jsx)(t.code,{children:`width`}),` and `,(0,$.jsx)(t.code,{children:`height`}),`:`]}),`
`,(0,$.jsx)(t.pre,{children:(0,$.jsx)(t.code,{className:`language-tsx`,children:`// ✅ Container with size
<div style={{ width: '100%', height: 400 }}>
  <LineChart series={series} />
</div>

// ✅ Or fixed dimensions on the component
<LineChart series={series} width={600} height={400} />
`})}),`
`,(0,$.jsx)(t.h3,{id:`dates-not-displaying-correctly`,children:`Dates Not Displaying Correctly`}),`
`,(0,$.jsxs)(t.p,{children:[`Use `,(0,$.jsx)(t.code,{children:`xType="time"`}),` when the X-axis values are Date objects:`]}),`
`,(0,$.jsx)(t.pre,{children:(0,$.jsx)(t.code,{className:`language-tsx`,children:`// ❌ Without xType="time", Date objects may not scale correctly
<LineChart series={seriesWithDates} />

// ✅ Use time scale for Date X values
<LineChart series={seriesWithDates} xType="time" />
`})}),`
`,(0,$.jsx)(t.h3,{id:`tooltip-or-crosshair-not-showing`,children:`Tooltip or Crosshair Not Showing`}),`
`,(0,$.jsxs)(t.p,{children:[`Ensure `,(0,$.jsx)(t.code,{children:`tooltip`}),`, `,(0,$.jsx)(t.code,{children:`showCrosshair`}),`, or `,(0,$.jsx)(t.code,{children:`showDataPoints`}),` are not set to `,(0,$.jsx)(t.code,{children:`false`}),`, and that the chart receives pointer events (e.g. no overlay blocking hover).`]}),`
`,(0,$.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,$.jsx)(t.h3,{id:`when-to-use-linechart`,children:`When to Use LineChart`}),`
`,(0,$.jsxs)(t.ul,{children:[`
`,(0,$.jsx)(t.li,{children:`Use for trends over time or along a continuous scale.`}),`
`,(0,$.jsx)(t.li,{children:`Use when comparing a few series (e.g. 2–5 lines); avoid too many overlapping lines.`}),`
`,(0,$.jsx)(t.li,{children:`Prefer a single chart with a legend over multiple small charts when comparing the same X range.`}),`
`]})]})}function Me(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,$.jsx)(t,{...e,children:(0,$.jsx)(Q,{...e})}):Q(e)}var $;e((()=>{$=t(),o(),te(),y(),x(),C(),T(),D(),k(),j(),N(),F(),ve(),ye(),z(),be(),xe(),Se(),Ce(),we(),Te(),Ee(),De(),Oe(),ke(),Ae(),je(),_()}))();export{Me as default};