import{i as e}from"./preload-helper-B8cOScKK.js";import{F as t}from"./iframe-_FkywH0z.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-BSzkhoes.js";import{t as c}from"./mdx-react-shim-CFqX-jeT.js";import{t as l}from"./runtime-C6cQAtgS.js";import{CategoryColors as u,CustomDomain as d,CustomTooltipPeriodComparison as f,Default as p,FormattedTickMarks as m,HorizontalMultiSeries as h,HorizontalSingleSeries as g,MultiSeries as _,Props as v,RTLHorizontalMultiSeries as y,RTLMultiSeries as b,SeriesColors as x,n as S,t as C}from"./bar-chart.stories-CcKHwOgM.js";function w(e){let t={code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(o,{of:C,name:`Overview`}),`
`,(0,E.jsx)(t.h1,{id:`bar-chart`,children:`Bar Chart`}),`
`,(0,E.jsx)(t.p,{children:`A flexible, accessible, and design-aligned data visualization solution for displaying single or multi-series bar charts.`}),`
`,(0,E.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Single and multi-series support`}),`: Display one or multiple data series with grouped bars`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Vertical and horizontal orientations`}),`: Choose the best layout for your data and use case`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Responsive behavior`}),`: Auto-sizing with horizontal scrolling for many data points, sticky axes`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Design system alignment`}),`: 8px border radius, 12px bar width (1.5 GU), consistent spacing`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Interactive tooltips`}),`: Hover to see exact values, with smart positioning and scroll-awareness`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Customizable axes`}),`: Control gridlines, tick marks, axis titles, and tick formatting`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Custom domains`}),`: Set explicit x and y ranges for controlled scales across multiple charts`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`RTL support`}),`: Full right-to-left layout support for international audiences `,(0,E.jsx)(t.em,{children:`(in development)`})]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Accessibility ready`}),`: Keyboard navigation, screen reader support, and semantic HTML`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`TypeScript support`}),`: Fully typed with comprehensive prop interfaces`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`VisX integration`}),`: Leverages VisX primitives for scales, axes, shapes, and responsive layout`]}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,E.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,E.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,E.jsxs)(t.p,{children:[`You give the chart a `,(0,E.jsx)(t.code,{children:`series`}),` array plus `,(0,E.jsx)(t.code,{children:`xAccessor`}),` and `,(0,E.jsx)(t.code,{children:`yAccessor`}),` so it knows which field is the category and which is the value - this is the everyday setup for one set of vertical bars.`]}),`
`,(0,E.jsx)(i,{of:p,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { BarChart } from '@godaddy/antares';
import { cityTemperature } from '@visx/mock-data';

export function DefaultExample(props: any) {
  const series = [
    {
      id: 'new-york-series',
      name: 'New York',
      data: cityTemperature.slice(0, 10)
    }
  ];

  return (
    <BarChart
      series={series}
      xAccessor={(d: any) => d.date}
      yAccessor={(d: any) => d['New York']}
      xAxisTitle="Date"
      yAxisTitle="Temperature (°F)"
      xBaseline={true}
      yBaseline={true}
      xTickMarks={true}
      yTickMarks={true}
      yGridlines={true}
      xGridlines={true}
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`multi-series`,children:`Multi-series`}),`
`,(0,E.jsxs)(t.p,{children:[`Pass more than one entry in `,(0,E.jsx)(t.code,{children:`series`}),` and the bars group by category, with a legend naming each series. Use it when the comparison between series matters as much as the values themselves.`]}),`
`,(0,E.jsx)(i,{of:_,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { BarChart } from '@godaddy/antares';
import { cityTemperature } from '@visx/mock-data';

export function MultiSeriesExample(props: any) {
  const cities = ['New York', 'San Francisco', 'Austin'] as const;

  const series = cities.map(function mapCity(city, index) {
    return {
      id: \`city-\${city.toLowerCase().replace(/\\s+/g, '-')}\`,
      name: city,
      data: cityTemperature.slice(0, 10).map(function mapData(d) {
        return {
          x: d.date,
          y: parseFloat(d[city as keyof typeof d])
        };
      })
    };
  });

  return (
    <BarChart
      series={series}
      xAccessor={(d: any) => d.x}
      yAccessor={(d: any) => d.y}
      xAxisTitle="Date"
      yAxisTitle="Temperature (°F)"
      yDomain={[0, 100]}
      xBaseline={true}
      yBaseline={true}
      xTickMarks={true}
      yTickMarks={true}
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`horizontal-single-series`,children:`Horizontal single series`}),`
`,(0,E.jsxs)(t.p,{children:[(0,E.jsx)(t.code,{children:`orientation="horizontal"`}),` swaps the axes: categories run down the side and values across the bottom. Reach for it when the labels are long or the chart is really a ranking.`]}),`
`,(0,E.jsx)(i,{of:g,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { BarChart } from '@godaddy/antares';
import { exoplanets as allExoplanets, type Exoplanets } from '@visx/mock-data';

const largestExoplanets = [...allExoplanets.filter((d) => d.distance && d.distance > 0)]
  .sort((a, b) => b.radius - a.radius)
  .slice(0, 30);

const series = [{ id: 'radius', name: 'Radius', data: largestExoplanets }];

export function HorizontalSingleSeriesExample(props: any) {
  return (
    <BarChart
      series={series}
      orientation="horizontal"
      xAccessor={(d: Exoplanets) => d.radius}
      yAccessor={(d: Exoplanets) => d.name}
      xAxisTitle="Radius (Rj)"
      yAxisTitle="Exoplanet"
      xBaseline={true}
      yBaseline={true}
      xTickMarks={true}
      yTickMarks={true}
      yGridlines={true}
      xGridlines={true}
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`horizontal-multi-series`,children:`Horizontal multi-series`}),`
`,(0,E.jsx)(t.p,{children:`Grouped bars work horizontally too. With many categories the chart scrolls vertically, which is usually easier on a phone than scrolling sideways.`}),`
`,(0,E.jsx)(i,{of:h,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { BarChart } from '@godaddy/antares';
import { exoplanets as allExoplanets } from '@visx/mock-data';

interface ExoplanetSurveyPoint {
  name: string;
  value: number;
}

// Take 90 real exoplanets and use the first 15 names as the shared category axis.
// Each series maps a different group of 15 planets' radius onto those same category names,
// demonstrating multi-series grouped bars with real exoplanet data.
const trueExoplanets = allExoplanets.filter((d) => d.distance && d.distance > 0).slice(0, 60);
const categoryNames = trueExoplanets.slice(0, 15).map((d) => d.name);

function toSurveyData(planets: typeof trueExoplanets): ExoplanetSurveyPoint[] {
  return planets.slice(0, 15).map((d, i) => ({ name: categoryNames[i], value: d.radius }));
}

const series = [
  { id: 'survey-a', name: 'Survey A', data: toSurveyData(trueExoplanets.slice(0, 15)) },
  { id: 'survey-b', name: 'Survey B', data: toSurveyData(trueExoplanets.slice(15, 30)) },
  { id: 'survey-c', name: 'Survey C', data: toSurveyData(trueExoplanets.slice(30, 45)) },
  { id: 'survey-d', name: 'Survey D', data: toSurveyData(trueExoplanets.slice(45, 60)) }
];

export function HorizontalMultiSeriesExample(props: any) {
  return (
    <BarChart
      series={series}
      orientation="horizontal"
      xAccessor={(d: ExoplanetSurveyPoint) => d.value}
      yAccessor={(d: ExoplanetSurveyPoint) => d.name}
      xAxisTitle="Radius (Rj)"
      yAxisTitle="Exoplanet"
      xBaseline={true}
      yBaseline={true}
      xTickMarks={true}
      yTickMarks={true}
      yGridlines={true}
      xGridlines={true}
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`custom-domain`,children:`Custom domain`}),`
`,(0,E.jsxs)(t.p,{children:[(0,E.jsx)(t.code,{children:`xDomain`}),` and `,(0,E.jsx)(t.code,{children:`yDomain`}),` pin down exactly which categories and value range to draw. Here category `,(0,E.jsx)(t.code,{children:`F`}),` has no data and still gets an empty slot, and the Y range stays `,(0,E.jsx)(t.code,{children:`[0, 40]`}),` even though the largest bar is 30 - handy when several charts need to share a scale.`]}),`
`,(0,E.jsx)(i,{of:d,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { BarChart } from '@godaddy/antares';

export function CustomDomainExample() {
  const data = [
    { category: 'A', value: 10 },
    { category: 'B', value: 20 },
    { category: 'C', value: 15 },
    { category: 'D', value: 30 },
    { category: 'E', value: 5 }
  ];
  // Example: set xDomain and yDomain explicitly
  const xDomain = ['A', 'B', 'D', 'E', 'F', 'C']; // F will show as empty slot
  const yDomain: [number, number] = [0, 40];
  return (
    <BarChart
      series={[
        {
          id: 'series1',
          name: 'Sample Series',
          data
        }
      ]}
      xAccessor={(d: { category: string; value: number }) => d.category}
      yAccessor={(d: { category: string; value: number }) => d.value}
      height={400}
      width={600}
      xAxisTitle="Category"
      yAxisTitle="Value"
      xDomain={xDomain}
      yDomain={yDomain}
    />
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`formatted-tick-marks`,children:`Formatted tick marks`}),`
`,(0,E.jsxs)(t.p,{children:[(0,E.jsx)(t.code,{children:`xTickFormat`}),` and `,(0,E.jsx)(t.code,{children:`yTickFormat`}),` shape the axis labels - abbreviated dates on one axis, thousands separators on the other. The functions receive the raw accessor value, so they also cover currency, units, or percentages.`]}),`
`,(0,E.jsx)(i,{of:m,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { BarChart } from '@godaddy/antares';

export function FormattedTickMarksExample() {
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
      height={600}
      width={600}
      xAxisTitle="Date"
      yAxisTitle="Sales Amount"
      xTickFormat={formatDateTick}
      yTickFormat={formatNumberWithCommas}
    />
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`rtl-multi-series`,children:`RTL multi-series`}),`
`,(0,E.jsx)(t.p,{children:`The chart follows the current layout direction, which is normally detected from the browser or system settings. In right-to-left it mirrors the axes, bars, and labels; this example forces RTL so you can see it in a left-to-right page. RTL support is still being refined - axis rendering and tick spacing in particular.`}),`
`,(0,E.jsx)(i,{of:b,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { BarChart } from '@godaddy/antares';
import { cityTemperature } from '@visx/mock-data';
import { RTLProvider } from '#utils/rtl-locale-provider.tsx';

export function RTLMultiSeriesExample(props: any) {
  const cities = ['New York', 'San Francisco', 'Austin'] as const;

  const series = cities.map(function mapCity(city) {
    return {
      id: \`city-\${city.toLowerCase().replace(/\\s+/g, '-')}\`,
      name: city,
      data: cityTemperature.slice(0, 10).map(function mapData(d) {
        return {
          x: d.date,
          y: parseFloat(d[city as keyof typeof d])
        };
      })
    };
  });

  return (
    <RTLProvider>
      <BarChart
        series={series}
        xAccessor={(d: any) => d.x}
        yAccessor={(d: any) => d.y}
        xAxisTitle="Date"
        yAxisTitle="Temperature (°F)"
        xBaseline={true}
        yBaseline={true}
        xTickMarks={true}
        yTickMarks={true}
        yGridlines={true}
        {...props}
      />
    </RTLProvider>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`rtl-horizontal-multi-series`,children:`RTL horizontal multi-series`}),`
`,(0,E.jsx)(t.p,{children:`Horizontal grouped bars in a right-to-left layout: bars grow from the right edge and the category axis moves to the right side.`}),`
`,(0,E.jsx)(i,{of:y,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { BarChart } from '@godaddy/antares';
import { exoplanets as allExoplanets } from '@visx/mock-data';
import { RTLProvider } from '#utils/rtl-locale-provider.tsx';

interface ExoplanetSurveyPoint {
  name: string;
  value: number;
}

const trueExoplanets = allExoplanets.filter((d) => d.distance && d.distance > 0).slice(0, 60);
const categoryNames = trueExoplanets.slice(0, 15).map((d) => d.name);

function toSurveyData(planets: typeof trueExoplanets): ExoplanetSurveyPoint[] {
  return planets.slice(0, 15).map((d, i) => ({ name: categoryNames[i], value: d.radius }));
}

const series = [
  { id: 'survey-a', name: 'Survey A', data: toSurveyData(trueExoplanets.slice(0, 15)) },
  { id: 'survey-b', name: 'Survey B', data: toSurveyData(trueExoplanets.slice(15, 30)) },
  { id: 'survey-c', name: 'Survey C', data: toSurveyData(trueExoplanets.slice(30, 45)) },
  { id: 'survey-d', name: 'Survey D', data: toSurveyData(trueExoplanets.slice(45, 60)) }
];

export function RTLHorizontalMultiSeriesExample(props: any) {
  return (
    <RTLProvider>
      <BarChart
        series={series}
        orientation="horizontal"
        xAccessor={(d: ExoplanetSurveyPoint) => d.value}
        yAccessor={(d: ExoplanetSurveyPoint) => d.name}
        xAxisTitle="Radius (Rj)"
        yAxisTitle="Exoplanet"
        xBaseline={true}
        yBaseline={true}
        xTickMarks={true}
        yTickMarks={true}
        yGridlines={true}
        xGridlines={true}
        {...props}
      />
    </RTLProvider>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`series-colors`,children:`Series colors`}),`
`,(0,E.jsxs)(t.p,{children:[`Set `,(0,E.jsx)(t.code,{children:`colorIndex`}),` on a series to pin every bar in it to a specific color from the
shared nine-color palette. Give two series the same `,(0,E.jsx)(t.code,{children:`colorIndex`}),` and separate them
with `,(0,E.jsx)(t.code,{children:`opacity`}),` instead of hue — a common way to show a comparison period against the
current one while keeping a single color identity.`]}),`
`,(0,E.jsxs)(t.p,{children:[`Series can also have sparse data: a `,(0,E.jsx)(t.code,{children:`null`}),` value simply omits that bar. Each series
here drops out of a different date, and one date drops two of them at once, so the bars
present per group keep changing — yet every series stays the color its `,(0,E.jsx)(t.code,{children:`colorIndex`}),`
pins it to. Colors follow the series, never the bar's position, so the shifting gaps
never move a color onto the wrong series.`]}),`
`,(0,E.jsx)(i,{of:x,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { BarChart } from '@godaddy/antares';
import { cityTemperature } from '@visx/mock-data';

const ROWS = cityTemperature.slice(0, 10);

export function SeriesColorsExample(props: any) {
  const series = [
    {
      id: 'this-period',
      name: 'This period',
      colorIndex: 1,
      // Missing its own date (index 2).
      data: ROWS.map((d, i) => ({ x: d.date, y: i === 2 ? null : parseFloat(d['New York']) }))
    },
    {
      id: 'previous-period',
      name: 'Previous period',
      colorIndex: 1,
      opacity: 0.4,
      // Missing two dates (index 4 shared with Forecast, and index 9).
      data: ROWS.map((d, i) => ({ x: d.date, y: i === 4 || i === 9 ? null : parseFloat(d['New York']) * 0.88 }))
    },
    {
      id: 'forecast',
      name: 'Forecast',
      colorIndex: 4,
      // Missing two dates (index 4 shared with Previous period, and index 7).
      data: ROWS.map((d, i) => ({ x: d.date, y: i === 4 || i === 7 ? null : parseFloat(d['San Francisco']) }))
    }
  ];

  return (
    <BarChart
      series={series}
      xAccessor={(d: { x: string; y: number | null }) => d.x}
      yAccessor={(d: { x: string; y: number | null }) => d.y}
      xAxisTitle="Date"
      yAxisTitle="Temperature (°F)"
      yDomain={[0, 100]}
      xBaseline={true}
      yBaseline={true}
      xTickMarks={true}
      yTickMarks={true}
      aria-label="Series colors example bar chart"
      desc="Grouped bar chart where two series share one palette color via colorIndex and are separated by reduced opacity, plus a third series in its own color; each series omits a different date and one date omits two, and every series keeps its color wherever its bars appear"
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`category-colors`,children:`Category colors`}),`
`,(0,E.jsxs)(t.p,{children:[(0,E.jsx)(t.code,{children:`categoryColors`}),` maps individual category values to palette color indices, overriding
the series color for just those bars — so a single series can carry a different color
per category. All three periods here share the same category-to-color map, so each
channel keeps one color across every period; the comparison periods are dropped to
reduced opacity.`]}),`
`,(0,E.jsxs)(t.p,{children:[`A category missing from the map falls back to the series' own default color. `,(0,E.jsx)(t.code,{children:`Marketplace`}),`
and `,(0,E.jsx)(t.code,{children:`Gift Cards`}),` are both absent from `,(0,E.jsx)(t.code,{children:`categoryColors`}),`, so each period draws them in that
period's default palette color instead of a shared channel color — showing the sparse-map
fallback alongside the mapped channels.`]}),`
`,(0,E.jsx)(i,{of:u,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { BarChart } from '@godaddy/antares';

export function CategoryColorsExample(props: any) {
  // Sales channel → palette color index. \`Marketplace\` and \`Gift Cards\` are intentionally
  // omitted so they fall back to each series' default color. Indices start at 3 to keep the
  // mapped channels distinct from those per-series defaults (0, 1, 2).
  const categoryColors = {
    'In Person': 3,
    'Online Store': 4,
    'Pay Links': 5,
    Invoicing: 6,
    'Virtual Terminal': 7
  };

  const current = [
    { channel: 'In Person', amount: 1043.5 },
    { channel: 'Online Store', amount: 692.12 },
    { channel: 'Pay Links', amount: 618.4 },
    { channel: 'Invoicing', amount: 431.8 },
    { channel: 'Virtual Terminal', amount: 182.25 },
    { channel: 'Marketplace', amount: 305.6 },
    { channel: 'Gift Cards', amount: 214.0 }
  ];

  const previous = [
    { channel: 'In Person', amount: 918.0 },
    { channel: 'Online Store', amount: 604.75 },
    { channel: 'Pay Links', amount: 560.0 },
    { channel: 'Invoicing', amount: 372.5 },
    { channel: 'Virtual Terminal', amount: 96.5 },
    { channel: 'Marketplace', amount: 210.4 },
    { channel: 'Gift Cards', amount: 168.0 }
  ];

  const twoYearsAgo = [
    { channel: 'In Person', amount: 802.0 },
    { channel: 'Online Store', amount: 540.0 },
    { channel: 'Pay Links', amount: 498.0 },
    { channel: 'Invoicing', amount: 300.0 },
    { channel: 'Virtual Terminal', amount: 60.0 },
    { channel: 'Marketplace', amount: 150.0 },
    { channel: 'Gift Cards', amount: 120.0 }
  ];

  const series = [
    {
      id: 'this-period',
      name: 'This period',
      categoryColors,
      data: current.map((d) => ({ x: d.amount, y: d.channel }))
    },
    {
      id: 'previous-period',
      name: 'Previous period',
      categoryColors,
      opacity: 0.6,
      data: previous.map((d) => ({ x: d.amount, y: d.channel }))
    },
    {
      id: 'two-years-ago',
      name: 'Two years ago',
      categoryColors,
      opacity: 0.3,
      data: twoYearsAgo.map((d) => ({ x: d.amount, y: d.channel }))
    }
  ];

  return (
    <BarChart
      series={series}
      orientation="horizontal"
      xAccessor={(d: { x: number; y: string }) => d.x}
      yAccessor={(d: { x: number; y: string }) => d.y}
      xTickFormat={(value) => \`\${Number(value).toLocaleString()}\`}
      xDomain={[0, 1100]}
      xGridlines={true}
      yBaseline={true}
      legendPosition={null}
      height={520}
      aria-label="Payment activity by sales channel"
      desc="Horizontal bar chart of net payments per sales channel for three periods; each mapped channel keeps its own color via categoryColors across all periods and the comparison periods are shown at reduced opacity, while the unmapped Marketplace and Gift Cards channels fall back to each period's default color"
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`custom-tooltip`,children:`Custom tooltip`}),`
`,(0,E.jsxs)(t.p,{children:[`A `,(0,E.jsx)(t.code,{children:`renderTooltip`}),` example styled as a period-over-period comparison card, using
`,(0,E.jsx)(t.code,{children:`categoryColors`}),` so each date owns its color. Hovering a bar group shows both years'
values and the percent change; the tooltip swatch is resolved per category from the
hovered datum, demonstrating category colors inside a custom tooltip.`]}),`
`,(0,E.jsx)(i,{of:f,inline:!0}),`
`,(0,E.jsx)(r,{code:`import {
  BarChart,
  type BarChartProps,
  type BarChartTooltipRenderProps,
  type BarSeriesConfig,
  Box,
  Flex,
  Text
} from '@godaddy/antares';

/** One day's net payments; \`x\` is the date label (category), \`y\` the amount. */
interface DailyDatum {
  x: string;
  y: number;
}

/** Series shape carrying which period it represents via \`tooltipMetadata\`. */
interface PaymentSeries extends BarSeriesConfig<DailyDatum, { period: 'current' | 'previous'; year: number }> {
  tooltipMetadata: { period: 'current' | 'previous'; year: number };
}

const DATES = ['Jan 6', 'Jan 7', 'Jan 8', 'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12'];

// Each date is a category with its own palette color, shared by both periods.
const categoryColors = { 'Jan 6': 0, 'Jan 7': 1, 'Jan 8': 2, 'Jan 9': 3, 'Jan 10': 4, 'Jan 11': 5, 'Jan 12': 6 };

const currentAmounts = [432, 665, 800, 692.12, 700, 555, 318];
const previousAmounts = [515, 515, 665, 713.25, 620, 310, 432];

const formatMoney = (v: number) => \`\${v.toFixed(2)}\`;

/**
 * Period-over-period tooltip built from \`renderTooltip\`. The two series (this period /
 * previous period) share a \`categoryColors\` map, so each date's bars carry their own color;
 * the previous period is dropped to reduced opacity. Hovering a date shows both dated values
 * and the percent change, with the swatch color resolved per category on \`current.color\`.
 */
function renderPaymentTooltip({ hoveredCategory, series }: BarChartTooltipRenderProps<DailyDatum, PaymentSeries>) {
  const current = series.find((oneSeries) => oneSeries.tooltipMetadata?.period === 'current');
  const previous = series.find((oneSeries) => oneSeries.tooltipMetadata?.period === 'previous');
  if (!current || !previous) {
    return null;
  }

  const currentDatum = current.datum;
  const previousDatum = previous.datum;
  if (!currentDatum || !previousDatum) {
    return null;
  }

  const currentValue = currentDatum.y;
  const previousValue = previousDatum.y;
  // Per-category color: the color of the hovered date's bars, resolved by BarChart.
  const color = current.color;
  const label = String(hoveredCategory ?? '');

  const change = previousValue === 0 ? 0 : ((currentValue - previousValue) / previousValue) * 100;
  const isUp = change >= 0;

  return (
    <Flex direction="column" gap="lg" style={{ minWidth: 260 }}>
      <Text style={{ fontSize: 18 }}>Net Payments</Text>

      <Flex direction="column" gap="sm">
        <Flex justifyContent="space-between" alignItems="center" gap="2xl">
          <Flex alignItems="center" gap="md">
            <Box rounding="full" style={{ width: 12, height: 12, backgroundColor: color }} />
            <Text>{\`\${label}, \${current.tooltipMetadata?.year}\`}</Text>
          </Flex>
          <Text>{formatMoney(currentValue)}</Text>
        </Flex>

        <Flex justifyContent="space-between" alignItems="center" gap="2xl">
          <Flex alignItems="center" gap="md">
            <Box rounding="full" style={{ width: 12, height: 12, backgroundColor: color, opacity: previous.opacity }} />
            <Text>{\`\${label}, \${previous.tooltipMetadata?.year}\`}</Text>
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

export function CustomTooltipPeriodComparisonExample(props: Partial<BarChartProps<DailyDatum, PaymentSeries>>) {
  const series: PaymentSeries[] = [
    {
      id: 'this-period',
      name: 'This period',
      categoryColors,
      tooltipMetadata: { period: 'current', year: 2026 },
      data: DATES.map((date, i) => ({ x: date, y: currentAmounts[i] }))
    },
    {
      id: 'previous-period',
      name: 'Previous period',
      categoryColors,
      opacity: 0.35,
      tooltipMetadata: { period: 'previous', year: 2025 },
      data: DATES.map((date, i) => ({ x: date, y: previousAmounts[i] }))
    }
  ];

  return (
    <BarChart
      series={series}
      xAccessor={(d: DailyDatum) => d.x}
      yAccessor={(d: DailyDatum) => d.y}
      yTickFormat={(value) => \`\${Number(value).toLocaleString()}\`}
      yDomain={[0, 1000]}
      yGridlines={true}
      xBaseline={true}
      legendPosition={null}
      height={450}
      renderTooltip={renderPaymentTooltip}
      aria-label="Payment activity by day"
      desc="Vertical bar chart of daily net payments for two periods; each day keeps its own color via categoryColors, the previous period is shown at reduced opacity, and a custom tooltip compares the two periods for the hovered day"
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h2,{id:`design-system-alignment`,children:`Design System Alignment`}),`
`,(0,E.jsx)(t.h3,{id:`spacing-and-sizing`,children:`Spacing and Sizing`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Bar width`}),`: 12px (1.5 grid units)`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Bar padding`}),` (multi-series): 4px between bars within a group`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Group gap`}),`: Minimum 24px between bar groups`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Border radius`}),`: 8px on all bars`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Margins`}),`: 20px top/right, 60px bottom/left for axes and labels`]}),`
`]}),`
`,(0,E.jsx)(t.h3,{id:`responsive-behavior`,children:`Responsive Behavior`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Auto-sizing`}),`: Uses VisX's `,(0,E.jsx)(t.code,{children:`useParentSize`}),` hook to adapt to container width`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Horizontal scrolling`}),`: When data points exceed available width, the chart becomes horizontally scrollable`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Sticky y-axis`}),`: The y-axis remains visible during horizontal scroll`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Minimum spacing`}),`: Group gaps never fall below 24px, triggering scroll instead`]}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Keyboard navigation`}),`: Bar groups are keyboard accessible with `,(0,E.jsx)(t.code,{children:`tabIndex={0}`}),` and `,(0,E.jsx)(t.code,{children:`role="group"`})]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Screen reader support`}),`: Semantic HTML structure with proper ARIA attributes`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Tooltips`}),`: Show on both hover and focus for keyboard users`]}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`performance-considerations`,children:`Performance Considerations`}),`
`,(0,E.jsx)(t.h3,{id:`rendering-strategy`,children:`Rendering Strategy`}),`
`,(0,E.jsx)(t.p,{children:`The component uses VisX primitives for optimal SVG rendering:`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Scales`}),`: VisX's `,(0,E.jsx)(t.code,{children:`scaleBand`}),` and `,(0,E.jsx)(t.code,{children:`scaleLinear`}),` for efficient coordinate mapping`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Grouped rendering`}),`: Bars are rendered in SVG `,(0,E.jsx)(t.code,{children:`<Group>`}),` elements for logical organization`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Responsive sizing`}),`: `,(0,E.jsx)(t.code,{children:`useParentSize`}),` hook provides efficient resize detection with debouncing (15ms)`]}),`
`]}),`
`,(0,E.jsx)(t.h3,{id:`scrolling-strategy`,children:`Scrolling Strategy`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Vertical charts`}),`: Horizontal scrolling when many data points exceed container width`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Horizontal charts`}),`: Vertical scrolling when many categories exceed container height`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Sticky axes`}),`: Positioned absolutely to remain visible during scroll`]}),`
`]}),`
`,(0,E.jsx)(t.h3,{id:`recommendations`,children:`Recommendations`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[`For charts with `,(0,E.jsx)(t.strong,{children:`many data points`}),` (>20), consider enabling horizontal scroll (default behavior)`]}),`
`,(0,E.jsxs)(t.li,{children:[`For `,(0,E.jsx)(t.strong,{children:`horizontal bar charts`}),`, vertical scrolling is more mobile-friendly than horizontal`]}),`
`,(0,E.jsxs)(t.li,{children:[`Use `,(0,E.jsx)(t.strong,{children:`custom domains`}),` to maintain consistent scales across multiple charts`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Tooltips`}),` use absolute positioning and scroll-aware calculations for accurate placement`]}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`development-status`,children:`Development Status`}),`
`,(0,E.jsx)(t.p,{children:`The BarChart component is in active development. Current focus areas:`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsx)(t.li,{children:`✅ Single and multi-series support`}),`
`,(0,E.jsx)(t.li,{children:`✅ Vertical and horizontal orientations`}),`
`,(0,E.jsx)(t.li,{children:`✅ Responsive behavior with sticky axes`}),`
`,(0,E.jsx)(t.li,{children:`✅ Interactive tooltips`}),`
`,(0,E.jsx)(t.li,{children:`✅ Custom domains`}),`
`,(0,E.jsx)(t.li,{children:`✅ Design system alignment`}),`
`,(0,E.jsx)(t.li,{children:`🚧 RTL compatibility (axis rendering and spacing refinement)`}),`
`,(0,E.jsx)(t.li,{children:`🚧 Tick mark positioning improvements`}),`
`,(0,E.jsx)(t.li,{children:`🚧 Additional customization options (tick formatting, axis configuration)`}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,E.jsx)(t.h3,{id:`bars-not-showing`,children:`Bars Not Showing`}),`
`,(0,E.jsx)(t.p,{children:`If bars are not visible:`}),`
`,(0,E.jsxs)(t.ol,{children:[`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Check data`}),`: Ensure `,(0,E.jsx)(t.code,{children:`series`}),` array has data and `,(0,E.jsx)(t.code,{children:`xAccessor`}),`/`,(0,E.jsx)(t.code,{children:`yAccessor`}),` return valid values`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Check domains`}),`: Verify `,(0,E.jsx)(t.code,{children:`yDomain`}),` (if set) includes your data values`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Check dimensions`}),`: Ensure container has non-zero width and height`]}),`
`]}),`
`,(0,E.jsx)(t.h3,{id:`tooltip-positioning-issues`,children:`Tooltip Positioning Issues`}),`
`,(0,E.jsx)(t.p,{children:`If tooltips appear in the wrong location:`}),`
`,(0,E.jsxs)(t.ol,{children:[`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Check scroll position`}),`: The component accounts for horizontal scroll automatically`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Check container`}),`: Ensure the chart container is not transformed or positioned in a complex layout`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Verify event targets`}),`: Tooltips use mouse event coordinates and bar group positions`]}),`
`]}),`
`,(0,E.jsx)(t.h3,{id:`performance-issues`,children:`Performance Issues`}),`
`,(0,E.jsx)(t.p,{children:`For better performance:`}),`
`,(0,E.jsxs)(t.ol,{children:[`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Limit data points`}),`: Consider pagination or filtering for very large datasets (>100 points)`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Debounce resize`}),`: The default 15ms debounce on `,(0,E.jsx)(t.code,{children:`useParentSize`}),` balances smoothness and performance`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Simplify tooltips`}),`: If tooltips are complex, consider using simpler content or disabling them`]}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,E.jsx)(t.h3,{id:`barchart`,children:`BarChart`}),`
`,(0,E.jsx)(a,{of:v})]})}function T(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,E.jsx)(t,{...e,children:(0,E.jsx)(w,{...e})}):w(e)}var E;e((()=>{E=t(),c(),s(),l(),S()}))();export{T as default};