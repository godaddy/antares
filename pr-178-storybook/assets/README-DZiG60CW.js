import{j as e}from"./iframe-DTALigXZ.js";import{useMDXComponents as n}from"./index-DRsmTLPg.js";import{M as o,A as d,a as r,S as i}from"./blocks-BZIvt908.js";import{S as l,P as c,a as p,M as m,G as h,T as x,L as u,b as g,B as y,c as f,F as b,d as T,N as L,Z as j,C,e as P,f as k,g as w,h as S,i as v,j as D,k as F,l as N,m as E,n as B,R as M}from"./line-chart.stories-Dq85KXcg.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CBWsPa5X.js";import"./index-D0CmnqIM.js";import"./index-mIY3p9VN.js";import"./index-91rABtnN.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./index-EorKtZTZ.js";import"./index-BD_6AySA.js";import"./context-c6fhxMFW.js";import"./SSRProvider-C0EIOAtD.js";import"./index-BNrQ0Eo7.js";import"./debounce-D_48Wh9z.js";import"./useTooltip-pIZzLNNo.js";import"./index-BSj3NoQs.js";import"./index-BvlXbhFU.js";import"./index-B4kBtzNv.js";import"./Text-BEAiNgGK.js";import"./mergeProps-MWO0rk5n.js";import"./useObjectRef-BNfUZmn2.js";import"./index-CASvfijk.js";import"./utils-DWdmbL63.js";import"./Group-Cj02NVcg.js";import"./index-JHI5GtDq.js";import"./cityTemperature-Cg73Ml3-.js";import"./band-B0J7HmRE.js";import"./init-Gi6I4Gst.js";import"./ordinal-Cboi1Yqb.js";import"./string-BVYZ4x68.js";import"./year-Cm1sU_Jw.js";import"./linear-PAdLsb0K.js";import"./defaultLocale-C4B-KCzX.js";import"./D3ShapeFactories-66Y8PNOp.js";import"./arc-DkvVsaXs.js";import"./line-C3BPJyQZ.js";import"./pie-Dq9eI5G3.js";import"./time-LX-g_rfp.js";import"./rtl-locale-provider-Bjq3EX4x.js";const A=`import { cityTemperature } from '@visx/mock-data';
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
`,V=`import { cityTemperature } from '@visx/mock-data';
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
`,Y=`import { DateValue, cityTemperature } from '@visx/mock-data';
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
`,z=`import { bitcoinPrice } from '@visx/mock-data';
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
`,U=`import { browserUsage } from '@visx/mock-data';
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
`,Z=`import { cityTemperature } from '@visx/mock-data';
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
`,$=`import { cityTemperature } from '@visx/mock-data';
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
`,G=`import { cityTemperature } from '@visx/mock-data';
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
`,O=`import { appleStock } from '@visx/mock-data';
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
`,R=`import { cityTemperature } from '@visx/mock-data';
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
`,X=`import { cityTemperature } from '@visx/mock-data';
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
`,I=`import { cityTemperature } from '@visx/mock-data';
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
`,Q=`import { LineChart, type LineChartProps } from '@godaddy/antares';

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
`,W=`import { cityTemperature } from '@visx/mock-data';
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
`,_=`import { cityTemperature } from '@visx/mock-data';
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
`,q=`import { cityTemperature } from '@visx/mock-data';
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
`,J=`import { appleStock } from '@visx/mock-data';
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
`,H=`import { cityTemperature } from '@visx/mock-data';
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
`,K=`import { appleStock } from '@visx/mock-data';
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
`,ee=`import { cityTemperature } from '@visx/mock-data';
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
`,te=`import { cityTemperature } from '@visx/mock-data';
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
`,re=`import { cityTemperature } from '@visx/mock-data';
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
`,ie=`import { cityTemperature } from '@visx/mock-data';
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
`,ae=`import { RTLProvider } from '../../../../utils/rtl-locale-provider.tsx';
import { CityTemperatureExample } from './city-temperature.tsx';
import type { LineChartProps } from '@godaddy/antares';

export function RTLExample(props: Partial<LineChartProps>) {
  return (
    <RTLProvider>
      <CityTemperatureExample {...props} />
    </RTLProvider>
  );
}
`;function s(a){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...n(),...a.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:l,name:"Overview"}),`
`,e.jsx(t.h1,{id:"linechart",children:"LineChart"}),`
`,e.jsx(t.p,{children:"Line Chart shows how something changes over time or along a continuous scale. It connects data points with lines so people can quickly spot trends, peaks, dips, and patterns."}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsx(d,{of:c}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"basic",children:"Basic"}),`
`,e.jsx(t.h4,{id:"single-series",children:"Single Series"}),`
`,e.jsx(t.p,{children:"One line with time-scale X-axis and minimal configuration."}),`
`,e.jsx(r,{of:p,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:H}),`
`,e.jsx(t.h4,{id:"multiple-series",children:"Multiple Series"}),`
`,e.jsx(t.p,{children:"Several lines with a bottom legend and shared X-axis."}),`
`,e.jsx(r,{of:m,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:Z}),`
`,e.jsx(t.h3,{id:"axis",children:"Axis"}),`
`,e.jsx(t.h4,{id:"gridlines",children:"Gridlines"}),`
`,e.jsxs(t.p,{children:["Vertical and horizontal gridlines via ",e.jsx(t.code,{children:"xGridlines"})," and ",e.jsx(t.code,{children:"yGridlines"}),"."]}),`
`,e.jsx(r,{of:h,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:X}),`
`,e.jsx(t.h4,{id:"titles",children:"Titles"}),`
`,e.jsx(t.p,{children:'X- and Y-axis titles to label what each axis represents (e.g. "Month", "Temperature (°F)").'}),`
`,e.jsx(r,{of:x,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:re}),`
`,e.jsx(t.h4,{id:"labels",children:"Labels"}),`
`,e.jsxs(t.p,{children:["Tick labels on both axes with ",e.jsx(t.code,{children:"xLabels"})," and ",e.jsx(t.code,{children:"yLabels"}),"."]}),`
`,e.jsx(r,{of:u,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:ee}),`
`,e.jsx(t.h4,{id:"ticks",children:"Ticks"}),`
`,e.jsxs(t.p,{children:["Tick marks (short lines) at each tick value. Controlled by ",e.jsx(t.code,{children:"xTickMarks"})," and ",e.jsx(t.code,{children:"yTickMarks"}),"."]}),`
`,e.jsx(r,{of:g,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:ie}),`
`,e.jsx(t.h4,{id:"baselines",children:"Baselines"}),`
`,e.jsxs(t.p,{children:["Axis baseline (the main axis line). Controlled by ",e.jsx(t.code,{children:"xBaseline"})," and ",e.jsx(t.code,{children:"yBaseline"}),"."]}),`
`,e.jsx(r,{of:y,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:W}),`
`,e.jsx(t.h4,{id:"legend",children:"Legend"}),`
`,e.jsxs(t.p,{children:["Legend showing series names and colors, positioned above or below the chart via ",e.jsx(t.code,{children:"legendPosition"}),"."]}),`
`,e.jsx(r,{of:f,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:te}),`
`,e.jsx(t.h3,{id:"formatting",children:"Formatting"}),`
`,e.jsx(t.h4,{id:"axis-and-tooltip-formatting",children:"Axis and Tooltip Formatting"}),`
`,e.jsxs(t.p,{children:["Custom formatters for axis ticks and tooltip values (e.g. currency, dates). Controlled by ",e.jsx(t.code,{children:"xTickFormat"})," and ",e.jsx(t.code,{children:"yTickFormat"}),"."]}),`
`,e.jsx(r,{of:b,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:R}),`
`,e.jsx(t.h3,{id:"scale",children:"Scale"}),`
`,e.jsx(t.h4,{id:"fixed-domain",children:"Fixed Domain"}),`
`,e.jsx(t.p,{children:"Explicit X and Y domain for a fixed range or consistent scale across charts."}),`
`,e.jsx(r,{of:T,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:O}),`
`,e.jsx(t.h4,{id:"nice-values",children:"Nice Values"}),`
`,e.jsx(t.p,{children:"Domain extended to nice round values (e.g. 0.2–1.0)."}),`
`,e.jsx(r,{of:L,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:I}),`
`,e.jsx(t.h4,{id:"zero-included",children:"Zero Included"}),`
`,e.jsxs(t.p,{children:["X and Y domains include zero via ",e.jsx(t.code,{children:"xZero"})," and ",e.jsx(t.code,{children:"yZero"}),"."]}),`
`,e.jsx(r,{of:j,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:K}),`
`,e.jsx(t.h4,{id:"custom-ticks",children:"Custom Ticks"}),`
`,e.jsxs(t.p,{children:["Explicit tick values or count with ",e.jsx(t.code,{children:"xTickValues"})," / ",e.jsx(t.code,{children:"yTickValues"})," or ",e.jsx(t.code,{children:"xNumTicks"})," / ",e.jsx(t.code,{children:"yNumTicks"}),"."]}),`
`,e.jsx(r,{of:C,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:G}),`
`,e.jsx(t.h4,{id:"band-padding",children:"Band Padding"}),`
`,e.jsxs(t.p,{children:["Outer padding on a band-scale axis with ",e.jsx(t.code,{children:"xPaddingOuter"})," / ",e.jsx(t.code,{children:"yPaddingOuter"}),"."]}),`
`,e.jsx(r,{of:P,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:Q}),`
`,e.jsx(t.h3,{id:"interactive",children:"Interactive"}),`
`,e.jsx(t.h4,{id:"tooltip-disabled",children:"Tooltip Disabled"}),`
`,e.jsxs(t.p,{children:["Tooltip, crosshair, and data point glyphs all disabled (",e.jsx(t.code,{children:"tooltip={false}"}),", ",e.jsx(t.code,{children:"showCrosshair={false}"}),", ",e.jsx(t.code,{children:"showDataPoints={false}"}),")."]}),`
`,e.jsx(r,{of:k,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:$}),`
`,e.jsx(t.h4,{id:"crosshair-only",children:"Crosshair Only"}),`
`,e.jsx(t.p,{children:"Only the vertical crosshair on hover; tooltip and data point glyphs disabled."}),`
`,e.jsx(r,{of:w,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:_}),`
`,e.jsx(t.h4,{id:"custom-tooltip-formatting",children:"Custom Tooltip Formatting"}),`
`,e.jsxs(t.p,{children:["Tooltip values formatted with ",e.jsx(t.code,{children:"tooltipValueFormatter"})," (e.g. currency, units)."]}),`
`,e.jsx(r,{of:S,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:A}),`
`,e.jsx(t.h3,{id:"data",children:"Data"}),`
`,e.jsx(t.h4,{id:"custom-accessors",children:"Custom Accessors"}),`
`,e.jsxs(t.p,{children:["Custom data shape (e.g. ",e.jsx(t.code,{children:"date"}),"/",e.jsx(t.code,{children:"value"}),") with ",e.jsx(t.code,{children:"xAccessor"})," and ",e.jsx(t.code,{children:"yAccessor"}),"."]}),`
`,e.jsx(r,{of:v,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:Y}),`
`,e.jsx(t.h4,{id:"missing-values",children:"Missing Values"}),`
`,e.jsx(t.p,{children:"Null Y values create breaks in the line."}),`
`,e.jsx(r,{of:D,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:J}),`
`,e.jsx(t.h3,{id:"layout",children:"Layout"}),`
`,e.jsx(t.h4,{id:"fixed-size",children:"Fixed Size"}),`
`,e.jsxs(t.p,{children:["Explicit chart size via ",e.jsx(t.code,{children:"width"})," and ",e.jsx(t.code,{children:"height"})," props (e.g. 800×400)."]}),`
`,e.jsx(r,{of:F,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:q}),`
`,e.jsx(t.h3,{id:"featured",children:"Featured"}),`
`,e.jsx(t.h4,{id:"bitcoin-price",children:"Bitcoin Price"}),`
`,e.jsx(t.p,{children:"Time-series with date and currency formatting, gridlines, and nice Y-axis."}),`
`,e.jsx(r,{of:N,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:z}),`
`,e.jsx(t.h4,{id:"city-temperature",children:"City Temperature"}),`
`,e.jsx(t.p,{children:"Multiple series over time with legend, shared time axis, and temperature (°F) formatting."}),`
`,e.jsx(r,{of:E,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:V}),`
`,e.jsx(t.h4,{id:"browser-usage",children:"Browser Usage"}),`
`,e.jsx(t.p,{children:"Categorical X-axis (band scale) with multiple series and percentage formatting."}),`
`,e.jsx(r,{of:B,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:U}),`
`,e.jsx(t.h3,{id:"right-to-left",children:"Right-to-Left"}),`
`,e.jsxs(t.p,{children:["The chart follows the current ",e.jsx(t.strong,{children:"layout direction"})," (LTR or RTL). By default, that direction is detected automatically from the browser or system settings. When it is RTL, the chart mirrors axes and labels accordingly."]}),`
`,e.jsx(r,{of:M,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:ae}),`
`,e.jsx(t.h2,{id:"customization",children:"Customization"}),`
`,e.jsx(t.h3,{id:"data-attributes",children:"Data Attributes"}),`
`,e.jsx(t.p,{children:"The chart root exposes data attributes that reflect prop state for styling:"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Chart container:"})," ",e.jsx(t.code,{children:"data-width"}),", ",e.jsx(t.code,{children:"data-height"}),", ",e.jsx(t.code,{children:"data-x-labels"}),", ",e.jsx(t.code,{children:"data-y-labels"}),", ",e.jsx(t.code,{children:"data-x-labels-vertical"}),", ",e.jsx(t.code,{children:"data-x-baseline"}),", ",e.jsx(t.code,{children:"data-y-baseline"}),", ",e.jsx(t.code,{children:"data-x-tick-marks"}),", ",e.jsx(t.code,{children:"data-y-tick-marks"})]}),`
`,e.jsx(t.h3,{id:"component-customization",children:"Component Customization"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"className"})," prop on the chart container to add or override styles:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`<LineChart series={series} className="my-custom-chart" />
`})}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(t.h3,{id:"aria-support",children:"ARIA Support"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Provide ",e.jsx(t.strong,{children:e.jsx(t.code,{children:"aria-label"})}),' to describe the chart (e.g. "Monthly sales revenue from January to May 2024").']}),`
`,e.jsxs(t.li,{children:["Use ",e.jsx(t.strong,{children:e.jsx(t.code,{children:"desc"})})," for a longer description rendered in the SVG ",e.jsx(t.code,{children:"<desc>"})," for screen readers."]}),`
`,e.jsx(t.li,{children:"The component sets ARIA attributes on interactive and structural elements as needed."}),`
`]}),`
`,e.jsx(t.h2,{id:"troubleshooting",children:"Troubleshooting"}),`
`,e.jsx(t.h3,{id:"chart-not-sizing-or-empty",children:"Chart Not Sizing or Empty"}),`
`,e.jsxs(t.p,{children:["Ensure the chart has a non-zero size. Place it in a container with explicit dimensions or use ",e.jsx(t.code,{children:"width"})," and ",e.jsx(t.code,{children:"height"}),":"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`// ✅ Container with size
<div style={{ width: '100%', height: 400 }}>
  <LineChart series={series} />
</div>

// ✅ Or fixed dimensions on the component
<LineChart series={series} width={600} height={400} />
`})}),`
`,e.jsx(t.h3,{id:"dates-not-displaying-correctly",children:"Dates Not Displaying Correctly"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:'xType="time"'})," when the X-axis values are Date objects:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`// ❌ Without xType="time", Date objects may not scale correctly
<LineChart series={seriesWithDates} />

// ✅ Use time scale for Date X values
<LineChart series={seriesWithDates} xType="time" />
`})}),`
`,e.jsx(t.h3,{id:"tooltip-or-crosshair-not-showing",children:"Tooltip or Crosshair Not Showing"}),`
`,e.jsxs(t.p,{children:["Ensure ",e.jsx(t.code,{children:"tooltip"}),", ",e.jsx(t.code,{children:"showCrosshair"}),", or ",e.jsx(t.code,{children:"showDataPoints"})," are not set to ",e.jsx(t.code,{children:"false"}),", and that the chart receives pointer events (e.g. no overlay blocking hover)."]}),`
`,e.jsx(t.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsx(t.h3,{id:"when-to-use-linechart",children:"When to Use LineChart"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Use for trends over time or along a continuous scale."}),`
`,e.jsx(t.li,{children:"Use when comparing a few series (e.g. 2–5 lines); avoid too many overlapping lines."}),`
`,e.jsx(t.li,{children:"Prefer a single chart with a legend over multiple small charts when comparing the same X range."}),`
`]})]})}function Qe(a={}){const{wrapper:t}={...n(),...a.components};return t?e.jsx(t,{...a,children:e.jsx(s,{...a})}):s(a)}export{Qe as default};
