import{i as e}from"./preload-helper-B4cZKGJ2.js";import{F as t}from"./iframe-CRTwtuXL.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-CW9pJYkX.js";import{t as c}from"./mdx-react-shim-Dd28nwUZ.js";import{BandPadding as l,Baselines as u,BitcoinPrice as d,BrowserUsage as f,CityTemperature as p,ColorIndex as m,CrosshairOnly as h,CustomAccessors as g,CustomTicks as _,CustomTooltip as v,CustomTooltipFormatting as y,CustomTooltipPairChange as b,CustomTooltipPeriodComparison as x,Default as S,FixedDomain as C,FixedSize as w,Formatting as T,Gridlines as E,Labels as D,Legend as O,LineStyles as k,MissingValues as A,MultipleSeries as j,NiceValues as M,Props as N,RTL as P,Ticks as F,Titles as I,TooltipDisabled as L,ZeroIncluded as R,n as z,t as B}from"./line-chart.stories-oFzIwQbD.js";function V(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(o,{of:z,name:`Overview`}),`
`,(0,U.jsx)(t.h1,{id:`linechart`,children:`LineChart`}),`
`,(0,U.jsx)(t.p,{children:`Line Chart shows how something changes over time or along a continuous scale. It connects data points with lines so people can quickly spot trends, peaks, dips, and patterns.`}),`
`,(0,U.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,U.jsx)(t.pre,{children:(0,U.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,U.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,U.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,U.jsxs)(t.p,{children:[`One line, a time-scale X axis, and almost nothing else configured - the everyday starting point. You give the chart a `,(0,U.jsx)(t.code,{children:`series`}),` array and it reads `,(0,U.jsx)(t.code,{children:`x`}),`/`,(0,U.jsx)(t.code,{children:`y`}),` from each point.`]}),`
`,(0,U.jsx)(i,{of:S,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function DefaultExample(props: Partial<LineChartProps>) {
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`multiple-series`,children:`Multiple series`}),`
`,(0,U.jsx)(t.p,{children:`Several lines sharing one X axis, with a legend naming each of them. Reach for this when the comparison between series is the story.`}),`
`,(0,U.jsx)(i,{of:j,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`gridlines`,children:`Gridlines`}),`
`,(0,U.jsxs)(t.p,{children:[(0,U.jsx)(t.code,{children:`xGridlines`}),` and `,(0,U.jsx)(t.code,{children:`yGridlines`}),` add faint lines across the plot so it is easier to read a value back off an axis.`]}),`
`,(0,U.jsx)(i,{of:E,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`titles`,children:`Titles`}),`
`,(0,U.jsxs)(t.p,{children:[(0,U.jsx)(t.code,{children:`xTitle`}),` and `,(0,U.jsx)(t.code,{children:`yTitle`}),` label what each axis actually measures, e.g. "Month" and "Temperature (°F)".`]}),`
`,(0,U.jsx)(i,{of:I,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`labels`,children:`Labels`}),`
`,(0,U.jsxs)(t.p,{children:[(0,U.jsx)(t.code,{children:`xLabels`}),` and `,(0,U.jsx)(t.code,{children:`yLabels`}),` toggle the tick labels on each axis. Turn them off for sparklines or when the surrounding UI already names the values.`]}),`
`,(0,U.jsx)(i,{of:D,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`ticks`,children:`Ticks`}),`
`,(0,U.jsxs)(t.p,{children:[(0,U.jsx)(t.code,{children:`xTickMarks`}),` and `,(0,U.jsx)(t.code,{children:`yTickMarks`}),` draw the short lines at each tick value, which helps tie a label to its exact position on the axis.`]}),`
`,(0,U.jsx)(i,{of:F,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`baselines`,children:`Baselines`}),`
`,(0,U.jsxs)(t.p,{children:[(0,U.jsx)(t.code,{children:`xBaseline`}),` and `,(0,U.jsx)(t.code,{children:`yBaseline`}),` control the main axis lines themselves. Dropping them gives a lighter, more editorial chart.`]}),`
`,(0,U.jsx)(i,{of:u,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`legend`,children:`Legend`}),`
`,(0,U.jsxs)(t.p,{children:[(0,U.jsx)(t.code,{children:`legendPosition`}),` puts the legend above or below the plot, or hides it with `,(0,U.jsx)(t.code,{children:`null`}),`. Multi-series charts get a bottom legend by default.`]}),`
`,(0,U.jsx)(i,{of:O,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`axis-and-tooltip-formatting`,children:`Axis and tooltip formatting`}),`
`,(0,U.jsxs)(t.p,{children:[(0,U.jsx)(t.code,{children:`xTickFormat`}),` and `,(0,U.jsx)(t.code,{children:`yTickFormat`}),` shape the axis labels - dates, currency, units, percentages - and the tooltip follows the same formatting.`]}),`
`,(0,U.jsx)(i,{of:T,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps, type DataPoint } from '@godaddy/antares';

function formatDate(value: number | string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  return String(value);
}

function formatCurrency(value: number): string {
  return \`\${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\`;
}

function formatTooltipCurrency(d: DataPoint): string {
  return \`\${d.y!.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\`;
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`custom-accessors`,children:`Custom accessors`}),`
`,(0,U.jsxs)(t.p,{children:[`When your data does not use `,(0,U.jsx)(t.code,{children:`x`}),`/`,(0,U.jsx)(t.code,{children:`y`}),`, point `,(0,U.jsx)(t.code,{children:`xAccessor`}),` and `,(0,U.jsx)(t.code,{children:`yAccessor`}),` at the fields it does use (here `,(0,U.jsx)(t.code,{children:`date`}),` and `,(0,U.jsx)(t.code,{children:`value`}),`) instead of reshaping the data first.`]}),`
`,(0,U.jsx)(i,{of:g,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { type DateValue, cityTemperature } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`missing-values`,children:`Missing values`}),`
`,(0,U.jsxs)(t.p,{children:[`A `,(0,U.jsx)(t.code,{children:`null`}),` Y value breaks the line instead of drawing through the gap, so missing data reads as missing rather than as a straight interpolation.`]}),`
`,(0,U.jsx)(i,{of:A,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { appleStock } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`fixed-domain`,children:`Fixed domain`}),`
`,(0,U.jsxs)(t.p,{children:[(0,U.jsx)(t.code,{children:`xDomain`}),` and `,(0,U.jsx)(t.code,{children:`yDomain`}),` pin the visible range. Use them to keep a fixed scale, or to keep several charts comparable.`]}),`
`,(0,U.jsx)(i,{of:C,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { appleStock } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`nice-values`,children:`Nice values`}),`
`,(0,U.jsxs)(t.p,{children:[(0,U.jsx)(t.code,{children:`xNice`}),` and `,(0,U.jsx)(t.code,{children:`yNice`}),` round the domain out to friendlier numbers (e.g. 0.2 to 1.0), so ticks land on values people expect.`]}),`
`,(0,U.jsx)(i,{of:M,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`zero-included`,children:`Zero included`}),`
`,(0,U.jsxs)(t.p,{children:[(0,U.jsx)(t.code,{children:`xZero`}),` and `,(0,U.jsx)(t.code,{children:`yZero`}),` stretch the domain to include zero. Worth doing when the absolute size of the values matters, not just their movement.`]}),`
`,(0,U.jsx)(i,{of:R,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { appleStock } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`custom-ticks`,children:`Custom ticks`}),`
`,(0,U.jsxs)(t.p,{children:[`Choose the ticks yourself with `,(0,U.jsx)(t.code,{children:`xTickValues`}),`/`,(0,U.jsx)(t.code,{children:`yTickValues`}),`, or just ask for roughly how many you want with `,(0,U.jsx)(t.code,{children:`xNumTicks`}),`/`,(0,U.jsx)(t.code,{children:`yNumTicks`}),`.`]}),`
`,(0,U.jsx)(i,{of:_,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`band-padding`,children:`Band padding`}),`
`,(0,U.jsxs)(t.p,{children:[(0,U.jsx)(t.code,{children:`xPaddingOuter`}),` and `,(0,U.jsx)(t.code,{children:`yPaddingOuter`}),` add breathing room at the ends of a band or point scale so the first and last values are not pinned to the edges.`]}),`
`,(0,U.jsx)(i,{of:l,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { LineChart, type LineChartProps } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`tooltip-disabled`,children:`Tooltip disabled`}),`
`,(0,U.jsxs)(t.p,{children:[`Turn off the hover affordances entirely with `,(0,U.jsx)(t.code,{children:`tooltip={false}`}),`, `,(0,U.jsx)(t.code,{children:`showCrosshair={false}`}),`, and `,(0,U.jsx)(t.code,{children:`showDataPoints={false}`}),` - useful for a static or print-style chart.`]}),`
`,(0,U.jsx)(i,{of:L,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`crosshair-only`,children:`Crosshair only`}),`
`,(0,U.jsx)(t.p,{children:`Keep the vertical crosshair for orientation while hiding the tooltip and the data point glyphs.`}),`
`,(0,U.jsx)(i,{of:h,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`custom-tooltip-formatting`,children:`Custom tooltip formatting`}),`
`,(0,U.jsxs)(t.p,{children:[(0,U.jsx)(t.code,{children:`tooltipValueFormatter`}),` shapes only the tooltip values, so you can show full currency or units there while the axis stays compact.`]}),`
`,(0,U.jsx)(i,{of:y,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`fixed-size`,children:`Fixed size`}),`
`,(0,U.jsxs)(t.p,{children:[`Pass `,(0,U.jsx)(t.code,{children:`width`}),` and `,(0,U.jsx)(t.code,{children:`height`}),` to size the chart explicitly instead of letting it fill its container.`]}),`
`,(0,U.jsx)(i,{of:w,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`bitcoin-price`,children:`Bitcoin price`}),`
`,(0,U.jsx)(t.p,{children:`A real time series: date formatting on the X axis, currency on the Y axis, gridlines, and a nice-rounded domain.`}),`
`,(0,U.jsx)(i,{of:d,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { bitcoinPrice } from '@visx/mock-data';
import { LineChart, type LineChartProps, type DataPoint } from '@godaddy/antares';

function formatDate(value: number | string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  return String(value);
}

function formatLargeCurrency(value: number): string {
  return \`\${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\`;
}

function formatTooltipCurrency(d: DataPoint): string {
  return \`\${(d.y as number).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\`;
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`city-temperature`,children:`City temperature`}),`
`,(0,U.jsx)(t.p,{children:`Several cities over the same period, with a legend and a shared time axis - the multi-series case as it usually looks in a product.`}),`
`,(0,U.jsx)(i,{of:p,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`browser-usage`,children:`Browser usage`}),`
`,(0,U.jsx)(t.p,{children:`A categorical X axis (band scale) with several series and percentage formatting, for when the X values are names rather than numbers or dates.`}),`
`,(0,U.jsx)(i,{of:f,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { browserUsage } from '@visx/mock-data';
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
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`rtl`,children:`RTL`}),`
`,(0,U.jsx)(t.p,{children:`The chart follows the current layout direction, normally detected from the browser or system settings. In right-to-left it mirrors the axes and labels; this example forces RTL so you can see it in a left-to-right page.`}),`
`,(0,U.jsx)(i,{of:P,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { RTLProvider } from '../../../../utils/rtl-locale-provider.tsx';
import { CityTemperatureExample } from './city-temperature.tsx';
import type { LineChartProps } from '@godaddy/antares';

export function RTLExample(props: Partial<LineChartProps>) {
  return (
    <RTLProvider>
      <CityTemperatureExample {...props} />
    </RTLProvider>
  );
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`color-index`,children:`Color Index`}),`
`,(0,U.jsxs)(t.p,{children:[(0,U.jsx)(t.code,{children:`colorIndex`}),` pins each series to a palette color. Any series can use any index,
independently — here two pairs each share an index so an actual line and its
dashed forecast read as the same color, distinguished only by line style.`]}),`
`,(0,U.jsx)(i,{of:m,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function ColorIndexExample(props: Partial<LineChartProps>) {
  const rows = cityTemperature.slice(0, 12);
  const toPoints = (city: keyof (typeof cityTemperature)[number], scale = 1) =>
    rows
      .map((d) => ({ x: new Date(d.date), y: parseFloat(d[city] as string) * scale }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());

  const series = [
    { id: 'ny', name: 'New York', colorIndex: 0, data: toPoints('New York') },
    {
      id: 'ny-forecast',
      name: 'New York (forecast)',
      colorIndex: 0,
      variant: 'dashed' as const,
      data: toPoints('New York', 1.08)
    },
    { id: 'sf', name: 'San Francisco', colorIndex: 1, data: toPoints('San Francisco') },
    {
      id: 'sf-forecast',
      name: 'San Francisco (forecast)',
      colorIndex: 1,
      variant: 'dashed' as const,
      data: toPoints('San Francisco', 1.08)
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
      aria-label="Color index example chart"
      desc="Line chart where paired series share a palette color via colorIndex, distinguished by solid and dashed line styles"
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`custom-tooltip`,children:`Custom Tooltip`}),`
`,(0,U.jsxs)(t.p,{children:[(0,U.jsx)(t.code,{children:`renderTooltip`}),` lets you render a fully custom tooltip and know which curve is
hovered. Paired series share a `,(0,U.jsx)(t.code,{children:`colorIndex`}),`; hovering either line shows a
tooltip specific to that line, wrapped in the default styled popover.`]}),`
`,(0,U.jsx)(i,{of:v,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
import { Box, Flex, LineChart, type LineChartProps, type LineChartTooltipRenderProps, Text } from '@godaddy/antares';

/**
 * Renders a tooltip for the single hovered curve. \`renderTooltip\` receives
 * \`hoveredSeriesId\` (the series nearest the cursor) so the tooltip can show
 * information specific to that line instead of every series at once.
 */
function renderHoveredTooltip({ hoveredSeriesId, hoveredDatum, series }: LineChartTooltipRenderProps) {
  const hovered = series.find((oneSeries) => oneSeries.id === hoveredSeriesId);
  if (!hovered || !hoveredDatum) {
    return null;
  }

  return (
    <Flex direction="column" gap="sm">
      <Flex alignItems="center" gap="sm">
        <Box
          rounding="full"
          style={{
            width: 10,
            height: 10,
            backgroundColor: hovered._resolvedColor
          }}
        />
        <Text>{hovered.name}</Text>
      </Flex>
      <Text>{\`\${(hoveredDatum.y as number).toFixed(1)}°F\`}</Text>
    </Flex>
  );
}

export function CustomTooltipExample(props: Partial<LineChartProps>) {
  const rows = cityTemperature.slice(0, 12);
  const toPoints = (city: keyof (typeof cityTemperature)[number], scale = 1) =>
    rows
      .map((d) => ({
        x: new Date(d.date),
        y: parseFloat(d[city] as string) * scale
      }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());

  const series = [
    { id: 'ny', name: 'New York', colorIndex: 0, data: toPoints('New York') },
    {
      id: 'ny-forecast',
      name: 'New York (forecast)',
      colorIndex: 0,
      variant: 'dashed' as const,
      data: toPoints('New York', 1.08)
    },
    {
      id: 'sf',
      name: 'San Francisco',
      colorIndex: 1,
      data: toPoints('San Francisco')
    },
    {
      id: 'sf-forecast',
      name: 'San Francisco (forecast)',
      colorIndex: 1,
      variant: 'dashed' as const,
      data: toPoints('San Francisco', 1.08)
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
      aria-label="Custom tooltip example chart"
      desc="Line chart with a custom tooltip that shows information specific to the hovered curve"
      renderTooltip={renderHoveredTooltip}
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`custom-tooltip-pair-change`,children:`Custom Tooltip Pair Change`}),`
`,(0,U.jsxs)(t.p,{children:[(0,U.jsx)(t.code,{children:`renderTooltip`}),` example combining a pair of series. Each pair shares a `,(0,U.jsx)(t.code,{children:`colorIndex`}),`
(solid actual + dashed forecast); hovering either line shows the percent change of
the forecast against the actual for that pair, wrapped in the default styled popover.`]}),`
`,(0,U.jsx)(i,{of:b,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
import { Box, Flex, LineChart, type LineChartProps, type LineChartTooltipRenderProps, Text } from '@godaddy/antares';

/**
 * Two pairs of lines, each a solid "actual" curve plus its dashed "forecast" partner
 * (the two share a \`colorIndex\`). Hovering any line resolves the pair it belongs to and
 * shows both values plus the percent change of the forecast relative to the actual —
 * demonstrating that \`renderTooltip\` can combine multiple series, not just the hovered one.
 */
function renderPairChangeTooltip({ hoveredSeriesId, datumByKey, series }: LineChartTooltipRenderProps) {
  const hovered = series.find((oneSeries) => oneSeries.id === hoveredSeriesId);
  if (!hovered) {
    return null;
  }

  // Both lines in a pair share a color; split them into the solid actual and dashed forecast.
  const pair = series.filter((oneSeries) => oneSeries.colorIndex === hovered.colorIndex);
  const actual = pair.find((oneSeries) => oneSeries.variant !== 'dashed');
  const forecast = pair.find((oneSeries) => oneSeries.variant === 'dashed');
  if (!actual || !forecast) {
    return null;
  }

  const actualY = datumByKey[actual.id]?.y as number | undefined;
  const forecastY = datumByKey[forecast.id]?.y as number | undefined;
  if (actualY == null || forecastY == null) {
    return null;
  }

  const change = ((forecastY - actualY) / actualY) * 100;
  const sign = change >= 0 ? '+' : '';

  return (
    <Flex direction="column" gap="sm">
      <Flex alignItems="center" gap="sm">
        <Box
          rounding="full"
          style={{
            width: 10,
            height: 10,
            backgroundColor: actual._resolvedColor
          }}
        />
        <Text>{actual.name}</Text>
      </Flex>
      <Text>{\`Actual: \${actualY.toFixed(1)}°F\`}</Text>
      <Text>{\`Forecast: \${forecastY.toFixed(1)}°F\`}</Text>
      <Text>{\`Forecast vs actual: \${sign}\${change.toFixed(1)}%\`}</Text>
    </Flex>
  );
}

export function CustomTooltipPairChangeExample(props: Partial<LineChartProps>) {
  const rows = cityTemperature.slice(0, 12);
  const toPoints = (city: keyof (typeof cityTemperature)[number]) =>
    rows
      .map((d) => ({ x: new Date(d.date), y: parseFloat(d[city] as string) }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());

  // Forecast wobbles deterministically above and below the actual (±~15%) so the
  // percent change varies per point and goes negative where the forecast undershoots.
  const toForecast = (city: keyof (typeof cityTemperature)[number], phase = 0) =>
    rows
      .map((d, i) => ({
        x: new Date(d.date),
        y: parseFloat(d[city] as string) * (1 + 0.15 * Math.sin(i + phase))
      }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());

  const series = [
    { id: 'ny', name: 'New York', colorIndex: 0, data: toPoints('New York') },
    {
      id: 'ny-forecast',
      name: 'New York (forecast)',
      colorIndex: 0,
      variant: 'dashed' as const,
      data: toForecast('New York')
    },
    {
      id: 'sf',
      name: 'San Francisco',
      colorIndex: 1,
      data: toPoints('San Francisco')
    },
    {
      id: 'sf-forecast',
      name: 'San Francisco (forecast)',
      colorIndex: 1,
      variant: 'dashed' as const,
      data: toForecast('San Francisco', 2)
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
      aria-label="Pair percent-change tooltip example chart"
      desc="Line chart whose tooltip shows the forecast-vs-actual percent change for the hovered pair"
      renderTooltip={renderPairChangeTooltip}
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`custom-tooltip-period-comparison`,children:`Custom Tooltip Period Comparison`}),`
`,(0,U.jsxs)(t.p,{children:[(0,U.jsx)(t.code,{children:`renderTooltip`}),` example styled as a period-over-period comparison card. Paired series
(solid current period + dashed previous period) share a `,(0,U.jsx)(t.code,{children:`colorIndex`}),`; hovering either
line shows both dated values and the percent change, wrapped in the default popover.`]}),`
`,(0,U.jsx)(i,{of:x,inline:!0}),`
`,(0,U.jsx)(r,{code:`import {
  Box,
  type DataPoint,
  Flex,
  LineChart,
  type LineChartProps,
  type LineChartTooltipRenderProps,
  type LineSeriesConfig,
  Text
} from '@godaddy/antares';

const CURRENT_YEAR = 2026;
const POINTS = 12;

const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
const formatMoney = (v: number) => \`\${v.toFixed(2)}\`;

/**
 * Series shape extended with custom tooltipMetadata. The type of tooltipMetadata is inferred
 * from this type in the tooltip render function so no cast is needed at the call site.
 */
interface ChannelSeries extends LineSeriesConfig {
  /** Which period this line represents; used to pair current vs previous. */
  tooltipMetadata: { period: 'current' | 'previous' };
}

/**
 * Period-over-period tooltip. Each channel is a pair sharing a \`colorIndex\`: a solid
 * "current period" line and its dashed "previous period" partner. Hovering either line
 * shows the channel name, both dated values, and the percent change vs the previous period —
 * mirroring a typical analytics comparison card, built entirely from the \`renderTooltip\` prop.
 */
function renderPeriodTooltip({
  hoveredSeriesId,
  datumByKey,
  series
}: LineChartTooltipRenderProps<DataPoint, LineSeriesConfig<DataPoint, { period: 'current' | 'previous' }>>) {
  const hovered = series.find((oneSeries) => oneSeries.id === hoveredSeriesId);
  if (!hovered) {
    return null;
  }

  // Pair by colorIndex, then split by the custom \`period\` key (typed, no cast needed).
  const pair = series.filter((oneSeries) => oneSeries.colorIndex === hovered.colorIndex);
  const current = pair.find((oneSeries) => oneSeries.tooltipMetadata?.period === 'current');
  const previous = pair.find((oneSeries) => oneSeries.tooltipMetadata?.period === 'previous');
  if (!current || !previous) {
    return null;
  }

  const currentDatum = datumByKey[current.id];
  const previousDatum = datumByKey[previous.id];
  if (!currentDatum || !previousDatum) {
    return null;
  }

  const currentValue = currentDatum.y as number;
  const previousValue = previousDatum.y as number;
  const currentDate = currentDatum.x as Date;
  // Both series plot on current-period dates so they overlay; the previous row is labelled one year back.
  const previousDate = new Date(currentDate);
  previousDate.setFullYear(currentDate.getFullYear() - 1);

  const change = previousValue === 0 ? 0 : ((currentValue - previousValue) / previousValue) * 100;
  const isUp = change >= 0;
  const color = current._resolvedColor;

  return (
    <Flex direction="column" gap="lg" style={{ minWidth: 260 }}>
      <Text style={{ fontSize: 18 }}>{current.name}</Text>

      <Flex direction="column" gap="sm">
        <Flex justifyContent="space-between" alignItems="center" gap="2xl">
          <Flex alignItems="center" gap="md">
            <Box rounding="full" style={{ width: 12, height: 12, backgroundColor: color }} />
            <Text>{formatDate(currentDate)}</Text>
          </Flex>
          <Text>{formatMoney(currentValue)}</Text>
        </Flex>

        <Flex justifyContent="space-between" alignItems="center" gap="2xl">
          <Flex alignItems="center" gap="md">
            <Box
              rounding="full"
              style={{
                width: 12,
                height: 12,
                border: \`2px solid \${color}\`,
                boxSizing: 'border-box'
              }}
            />
            <Text>{formatDate(previousDate)}</Text>
          </Flex>
          <Text>{formatMoney(previousValue)}</Text>
        </Flex>
      </Flex>

      <Flex alignItems="center" gap="sm">
        <Text style={{ color: isUp ? '#2f9e44' : '#e03131' }}>{isUp ? '↑' : '↓'}</Text>
        <Text style={{ fontWeight: 'bolder' }}>{\`\${Math.abs(change).toFixed(2)}%\`}</Text>
        <Text style={{ color: '#868e96' }}>compared to previous period</Text>
      </Flex>
    </Flex>
  );
}

/** Builds a deterministic weekly series in the hundreds-of-dollars range. */
function buildSeries(base: number, amplitude: number, phase: number) {
  return Array.from({ length: POINTS }, (_, i) => ({
    x: new Date(CURRENT_YEAR, 0, 2 + i * 7),
    y: base + amplitude * Math.sin(i * 0.6 + phase)
  }));
}

export function CustomTooltipPeriodComparisonExample(props: Partial<LineChartProps<DataPoint, ChannelSeries>>) {
  const series: ChannelSeries[] = [
    {
      id: 'online',
      name: 'Online Store',
      colorIndex: 0,
      tooltipMetadata: { period: 'current' },
      data: buildSeries(680, 90, 0)
    },
    {
      id: 'online-prev',
      name: 'Online Store (previous)',
      colorIndex: 0,
      tooltipMetadata: { period: 'previous' },
      variant: 'dashed',
      data: buildSeries(700, 80, 1.2)
    },
    {
      id: 'retail',
      name: 'Retail',
      colorIndex: 1,
      tooltipMetadata: { period: 'current' },
      data: buildSeries(430, 70, 0.5)
    },
    {
      id: 'retail-prev',
      name: 'Retail (previous)',
      colorIndex: 1,
      tooltipMetadata: { period: 'previous' },
      variant: 'dashed',
      data: buildSeries(410, 60, 1.8)
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
      aria-label="Period-over-period comparison tooltip example chart"
      desc="Line chart whose tooltip compares the hovered channel's current and previous period values"
      renderTooltip={renderPeriodTooltip}
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h3,{id:`line-styles`,children:`Line Styles`}),`
`,(0,U.jsxs)(t.p,{children:[(0,U.jsx)(t.code,{children:`variant`}),` sets each series' line style — 'solid' (default), 'dashed', or
'dotted' — useful for distinguishing actuals from forecasts or targets. The
legend swatch mirrors each line's style.`]}),`
`,(0,U.jsx)(i,{of:k,inline:!0}),`
`,(0,U.jsx)(r,{code:`import { cityTemperature } from '@visx/mock-data';
import { LineChart, type LineChartProps } from '@godaddy/antares';

export function LineStylesExample(props: Partial<LineChartProps>) {
  const rows = cityTemperature.slice(0, 12);
  const toPoints = (city: keyof (typeof cityTemperature)[number], scale = 1) =>
    rows
      .map((d) => ({ x: new Date(d.date), y: parseFloat(d[city] as string) * scale }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());

  const series = [
    { id: 'actual', name: 'Actual', data: toPoints('New York') },
    { id: 'forecast', name: 'Forecast', variant: 'dashed' as const, data: toPoints('New York', 1.08) },
    { id: 'target', name: 'Target', variant: 'dotted' as const, data: toPoints('New York', 0.92) }
  ];

  return (
    <LineChart
      series={series}
      xType="time"
      yZero={false}
      xLabels={false}
      yLabels={false}
      height={400}
      aria-label="Line styles example chart"
      desc="Line chart demonstrating solid, dashed, and dotted line styles via the variant prop"
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,U.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,U.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,U.jsx)(t.p,{children:`The chart root exposes data attributes that reflect prop state for styling:`}),`
`,(0,U.jsxs)(t.p,{children:[(0,U.jsx)(t.strong,{children:`Chart container:`}),` `,(0,U.jsx)(t.code,{children:`data-width`}),`, `,(0,U.jsx)(t.code,{children:`data-height`}),`, `,(0,U.jsx)(t.code,{children:`data-x-labels`}),`, `,(0,U.jsx)(t.code,{children:`data-y-labels`}),`, `,(0,U.jsx)(t.code,{children:`data-x-labels-vertical`}),`, `,(0,U.jsx)(t.code,{children:`data-x-baseline`}),`, `,(0,U.jsx)(t.code,{children:`data-y-baseline`}),`, `,(0,U.jsx)(t.code,{children:`data-x-tick-marks`}),`, `,(0,U.jsx)(t.code,{children:`data-y-tick-marks`})]}),`
`,(0,U.jsx)(t.h3,{id:`component-customization`,children:`Component Customization`}),`
`,(0,U.jsxs)(t.p,{children:[`Use the `,(0,U.jsx)(t.code,{children:`className`}),` prop on the chart container to add or override styles:`]}),`
`,(0,U.jsx)(t.pre,{children:(0,U.jsx)(t.code,{className:`language-tsx`,children:`<LineChart series={series} className="my-custom-chart" />
`})}),`
`,(0,U.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,U.jsx)(t.h3,{id:`aria-support`,children:`ARIA Support`}),`
`,(0,U.jsxs)(t.ul,{children:[`
`,(0,U.jsxs)(t.li,{children:[`Provide `,(0,U.jsx)(t.strong,{children:(0,U.jsx)(t.code,{children:`aria-label`})}),` to describe the chart (e.g. "Monthly sales revenue from January to May 2024").`]}),`
`,(0,U.jsxs)(t.li,{children:[`Use `,(0,U.jsx)(t.strong,{children:(0,U.jsx)(t.code,{children:`desc`})}),` for a longer description rendered in the SVG `,(0,U.jsx)(t.code,{children:`<desc>`}),` for screen readers.`]}),`
`,(0,U.jsx)(t.li,{children:`The component sets ARIA attributes on interactive and structural elements as needed.`}),`
`]}),`
`,(0,U.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,U.jsx)(t.h3,{id:`when-to-use-linechart`,children:`When to Use LineChart`}),`
`,(0,U.jsxs)(t.ul,{children:[`
`,(0,U.jsx)(t.li,{children:`Use for trends over time or along a continuous scale.`}),`
`,(0,U.jsx)(t.li,{children:`Use when comparing a few series (e.g. 2-5 lines); avoid too many overlapping lines.`}),`
`,(0,U.jsx)(t.li,{children:`Prefer a single chart with a legend over multiple small charts when comparing the same X range.`}),`
`]}),`
`,(0,U.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,U.jsx)(t.h3,{id:`chart-not-sizing-or-empty`,children:`Chart Not Sizing or Empty`}),`
`,(0,U.jsxs)(t.p,{children:[`Ensure the chart has a non-zero size. Place it in a container with explicit dimensions or use `,(0,U.jsx)(t.code,{children:`width`}),` and `,(0,U.jsx)(t.code,{children:`height`}),`:`]}),`
`,(0,U.jsx)(t.pre,{children:(0,U.jsx)(t.code,{className:`language-tsx`,children:`// ✅ Container with size
<div style={{ width: '100%', height: 400 }}>
  <LineChart series={series} />
</div>

// ✅ Or fixed dimensions on the component
<LineChart series={series} width={600} height={400} />
`})}),`
`,(0,U.jsx)(t.h3,{id:`dates-not-displaying-correctly`,children:`Dates Not Displaying Correctly`}),`
`,(0,U.jsxs)(t.p,{children:[`Use `,(0,U.jsx)(t.code,{children:`xType="time"`}),` when the X-axis values are Date objects:`]}),`
`,(0,U.jsx)(t.pre,{children:(0,U.jsx)(t.code,{className:`language-tsx`,children:`// ❌ Without xType="time", Date objects may not scale correctly
<LineChart series={seriesWithDates} />

// ✅ Use time scale for Date X values
<LineChart series={seriesWithDates} xType="time" />
`})}),`
`,(0,U.jsx)(t.h3,{id:`tooltip-or-crosshair-not-showing`,children:`Tooltip or Crosshair Not Showing`}),`
`,(0,U.jsxs)(t.p,{children:[`Ensure `,(0,U.jsx)(t.code,{children:`tooltip`}),`, `,(0,U.jsx)(t.code,{children:`showCrosshair`}),`, or `,(0,U.jsx)(t.code,{children:`showDataPoints`}),` are not set to `,(0,U.jsx)(t.code,{children:`false`}),`, and that the chart receives pointer events (e.g. no overlay blocking hover).`]}),`
`,(0,U.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,U.jsx)(a,{of:N})]})}function H(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,U.jsx)(t,{...e,children:(0,U.jsx)(V,{...e})}):V(e)}var U;e((()=>{U=t(),c(),s(),B()}))();export{H as default};