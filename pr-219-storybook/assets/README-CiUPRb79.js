import{i as e}from"./preload-helper-CLVkNUVT.js";import{y as t}from"./iframe-CoJ0QfY7.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-mpF-6oRT.js";import{t as c}from"./mdx-react-shim-Bh35bJGH.js";import{CustomDomain as l,HorizontalMultiSeries as u,HorizontalSingleSeries as d,MultiSeries as f,Props as p,RTLMultiSeries as m,SingleSeries as h,n as g,t as _}from"./bar-chart.stories-BPvi8n9F.js";var v,y=e((()=>{v=`import { BarChart } from '@godaddy/antares';
import { cityTemperature } from '@visx/mock-data';

export function BarChartExample(props: any) {
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
}
`})),b,x=e((()=>{b=`import { BarChart } from '@godaddy/antares';
import { cityTemperature } from '@visx/mock-data';

export function BarChartMultiSeriesExample(props: any) {
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
}
`})),S,C=e((()=>{S=`import { BarChart } from '@godaddy/antares';
import { exoplanets as allExoplanets, type Exoplanets } from '@visx/mock-data';

const largestExoplanets = [...allExoplanets.filter((d) => d.distance && d.distance > 0)]
  .sort((a, b) => b.radius - a.radius)
  .slice(0, 30);

const series = [{ id: 'radius', name: 'Radius', data: largestExoplanets }];

export function BarChartHorizontalSingleSeriesExample(props: any) {
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
}
`})),w,T=e((()=>{w=`import { BarChart } from '@godaddy/antares';
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

export function BarChartHorizontalMultiSeriesExample(props: any) {
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
}
`})),E,D=e((()=>{E=`import { BarChart } from '@godaddy/antares';

export function BarChartCustomDomainExample() {
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
}
`})),O,k=e((()=>{O=`import { BarChart } from '@godaddy/antares';
import { cityTemperature } from '@visx/mock-data';
import { RTLProvider } from '../../../../utils/rtl-locale-provider.tsx';

export function BarChartRTLMultiSeriesExample(props: any) {
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
}
`}));function A(e){let t={code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(o,{of:_,name:`Overview`}),`
`,(0,M.jsx)(t.h1,{id:`bar-chart`,children:`Bar Chart`}),`
`,(0,M.jsx)(t.p,{children:`A flexible, accessible, and design-aligned data visualization solution for displaying single or multi-series bar charts.`}),`
`,(0,M.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Single and multi-series support`}),`: Display one or multiple data series with grouped bars`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Vertical and horizontal orientations`}),`: Choose the best layout for your data and use case`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Responsive behavior`}),`: Auto-sizing with horizontal scrolling for many data points, sticky axes`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Design system alignment`}),`: 8px border radius, 12px bar width (1.5 GU), consistent spacing`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Interactive tooltips`}),`: Hover to see exact values, with smart positioning and scroll-awareness`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Customizable axes`}),`: Control gridlines, tick marks, axis titles, and tick formatting`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Custom domains`}),`: Set explicit x and y ranges for controlled scales across multiple charts`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`RTL support`}),`: Full right-to-left layout support for international audiences `,(0,M.jsx)(t.em,{children:`(in development)`})]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Accessibility ready`}),`: Keyboard navigation, screen reader support, and semantic HTML`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`TypeScript support`}),`: Fully typed with comprehensive prop interfaces`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`VisX integration`}),`: Leverages VisX primitives for scales, axes, shapes, and responsive layout`]}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,M.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,M.jsxs)(t.p,{children:[`The `,(0,M.jsx)(t.code,{children:`BarChart`}),` component accepts the following props:`]}),`
`,(0,M.jsx)(a,{of:p}),`
`,(0,M.jsx)(t.h3,{id:`core-props`,children:`Core Props`}),`
`,(0,M.jsxs)(t.h4,{id:`series-required`,children:[(0,M.jsx)(t.code,{children:`series`}),` (required)`]}),`
`,(0,M.jsx)(t.p,{children:`An array of data series to display. Each series must include:`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`id`}),`: Unique identifier for the series`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`name`}),`: Display name for the legend`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`data`}),`: Array of data points`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`color`}),`: Hex color for the bars`]}),`
`]}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-tsx`,children:`const series = [
  {
    id: 'new-york',
    name: 'New York',
    color: '#145FA9',
    data: [{ date: '2024-01-01', temp: 45 }, ...]
  }
];
`})}),`
`,(0,M.jsxs)(t.h4,{id:`xaccessor-required`,children:[(0,M.jsx)(t.code,{children:`xAccessor`}),` (required)`]}),`
`,(0,M.jsx)(t.p,{children:`Function that extracts the x-axis value from a data point. Returns a string representing the category or label.`}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-tsx`,children:`xAccessor={(d) => d.date}
`})}),`
`,(0,M.jsxs)(t.h4,{id:`yaccessor-required`,children:[(0,M.jsx)(t.code,{children:`yAccessor`}),` (required)`]}),`
`,(0,M.jsx)(t.p,{children:`Function that extracts the y-axis value from a data point. Returns a number representing the value to display.`}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-tsx`,children:`yAccessor={(d) => d.temperature}
`})}),`
`,(0,M.jsx)(t.h3,{id:`layout-props`,children:`Layout Props`}),`
`,(0,M.jsx)(t.h4,{id:`orientation`,children:(0,M.jsx)(t.code,{children:`orientation`})}),`
`,(0,M.jsx)(t.p,{children:`Controls whether bars are vertical (default) or horizontal.`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Default`}),`: `,(0,M.jsx)(t.code,{children:`'vertical'`})]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Options`}),`: `,(0,M.jsx)(t.code,{children:`'vertical'`}),` | `,(0,M.jsx)(t.code,{children:`'horizontal'`})]}),`
`]}),`
`,(0,M.jsx)(t.p,{children:`Vertical charts are best for time series or categorical data. Horizontal charts work well for rankings or when category labels are long.`}),`
`,(0,M.jsx)(t.h4,{id:`width`,children:(0,M.jsx)(t.code,{children:`width`})}),`
`,(0,M.jsxs)(t.p,{children:[`Width of the chart in pixels. The chart uses responsive sizing via `,(0,M.jsx)(t.code,{children:`useParentSize`}),`, so this serves as a default when the container size is not yet known.`]}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Default`}),`: `,(0,M.jsx)(t.code,{children:`500`})]}),`
`]}),`
`,(0,M.jsx)(t.h4,{id:`height`,children:(0,M.jsx)(t.code,{children:`height`})}),`
`,(0,M.jsx)(t.p,{children:`Height of the chart in pixels.`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Default`}),`: `,(0,M.jsx)(t.code,{children:`700`})]}),`
`]}),`
`,(0,M.jsx)(t.h4,{id:`legendposition`,children:(0,M.jsx)(t.code,{children:`legendPosition`})}),`
`,(0,M.jsx)(t.p,{children:`Position of the legend relative to the chart.`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Default`}),`: `,(0,M.jsx)(t.code,{children:`'bottom'`})]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Options`}),`: `,(0,M.jsx)(t.code,{children:`'top'`}),` | `,(0,M.jsx)(t.code,{children:`'bottom'`})]}),`
`]}),`
`,(0,M.jsx)(t.h3,{id:`axis-props`,children:`Axis Props`}),`
`,(0,M.jsx)(t.h4,{id:`xaxistitle`,children:(0,M.jsx)(t.code,{children:`xAxisTitle`})}),`
`,(0,M.jsx)(t.p,{children:`Title displayed below the x-axis.`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Type`}),`: `,(0,M.jsx)(t.code,{children:`string`})]}),`
`]}),`
`,(0,M.jsx)(t.h4,{id:`yaxistitle`,children:(0,M.jsx)(t.code,{children:`yAxisTitle`})}),`
`,(0,M.jsx)(t.p,{children:`Title displayed to the left of the y-axis.`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Type`}),`: `,(0,M.jsx)(t.code,{children:`string`})]}),`
`]}),`
`,(0,M.jsx)(t.h4,{id:`xbaseline`,children:(0,M.jsx)(t.code,{children:`xBaseline`})}),`
`,(0,M.jsx)(t.p,{children:`Whether to show the x-axis baseline and labels.`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Default`}),`: `,(0,M.jsx)(t.code,{children:`true`})]}),`
`]}),`
`,(0,M.jsx)(t.h4,{id:`ybaseline`,children:(0,M.jsx)(t.code,{children:`yBaseline`})}),`
`,(0,M.jsx)(t.p,{children:`Whether to show the y-axis baseline and labels.`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Default`}),`: `,(0,M.jsx)(t.code,{children:`true`})]}),`
`]}),`
`,(0,M.jsx)(t.h4,{id:`xtickmarks`,children:(0,M.jsx)(t.code,{children:`xTickMarks`})}),`
`,(0,M.jsx)(t.p,{children:`Whether to show tick marks on the x-axis.`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Default`}),`: `,(0,M.jsx)(t.code,{children:`true`})]}),`
`]}),`
`,(0,M.jsx)(t.h4,{id:`ytickmarks`,children:(0,M.jsx)(t.code,{children:`yTickMarks`})}),`
`,(0,M.jsx)(t.p,{children:`Whether to show tick marks on the y-axis.`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Default`}),`: `,(0,M.jsx)(t.code,{children:`true`})]}),`
`]}),`
`,(0,M.jsx)(t.h4,{id:`xgridlines`,children:(0,M.jsx)(t.code,{children:`xGridlines`})}),`
`,(0,M.jsx)(t.p,{children:`Whether to show vertical gridlines from the x-axis.`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Default`}),`: `,(0,M.jsx)(t.code,{children:`true`})]}),`
`]}),`
`,(0,M.jsx)(t.h4,{id:`ygridlines`,children:(0,M.jsx)(t.code,{children:`yGridlines`})}),`
`,(0,M.jsx)(t.p,{children:`Whether to show horizontal gridlines from the y-axis.`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Default`}),`: `,(0,M.jsx)(t.code,{children:`true`})]}),`
`]}),`
`,(0,M.jsx)(t.h4,{id:`xtickformat`,children:(0,M.jsx)(t.code,{children:`xTickFormat`})}),`
`,(0,M.jsx)(t.p,{children:`Function to format x-axis tick labels. The value type depends on orientation:`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[`
`,(0,M.jsx)(t.p,{children:`Vertical: categories (string | Date) from xAccessor`}),`
`]}),`
`,(0,M.jsxs)(t.li,{children:[`
`,(0,M.jsx)(t.p,{children:`Horizontal: numeric values (number) from xAccessor`}),`
`]}),`
`,(0,M.jsxs)(t.li,{children:[`
`,(0,M.jsxs)(t.p,{children:[(0,M.jsx)(t.strong,{children:`Type`}),`: `,(0,M.jsx)(t.code,{children:`(value: string | number | Date) => string`})]}),`
`]}),`
`]}),`
`,(0,M.jsx)(t.h4,{id:`ytickformat`,children:(0,M.jsx)(t.code,{children:`yTickFormat`})}),`
`,(0,M.jsx)(t.p,{children:`Function to format y-axis tick labels. The value type depends on orientation:`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[`
`,(0,M.jsx)(t.p,{children:`Vertical: numeric values (number) from yAccessor`}),`
`]}),`
`,(0,M.jsxs)(t.li,{children:[`
`,(0,M.jsx)(t.p,{children:`Horizontal: categories (string | Date) from yAccessor`}),`
`]}),`
`,(0,M.jsxs)(t.li,{children:[`
`,(0,M.jsxs)(t.p,{children:[(0,M.jsx)(t.strong,{children:`Type`}),`: `,(0,M.jsx)(t.code,{children:`(value: string | number | Date) => string`})]}),`
`]}),`
`]}),`
`,(0,M.jsx)(t.h4,{id:`xnumticks`,children:(0,M.jsx)(t.code,{children:`xNumTicks`})}),`
`,(0,M.jsx)(t.p,{children:`Suggested number of ticks for the x-axis.`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Type`}),`: `,(0,M.jsx)(t.code,{children:`number`})]}),`
`]}),`
`,(0,M.jsx)(t.h4,{id:`ynumticks`,children:(0,M.jsx)(t.code,{children:`yNumTicks`})}),`
`,(0,M.jsx)(t.p,{children:`Suggested number of ticks for the y-axis.`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Type`}),`: `,(0,M.jsx)(t.code,{children:`number`})]}),`
`]}),`
`,(0,M.jsx)(t.h3,{id:`domain-props`,children:`Domain Props`}),`
`,(0,M.jsx)(t.h4,{id:`xdomain`,children:(0,M.jsx)(t.code,{children:`xDomain`})}),`
`,(0,M.jsx)(t.p,{children:`Explicit x-axis domain. The type depends on orientation:`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[`Vertical: Use `,(0,M.jsx)(t.code,{children:`string[]`}),` or `,(0,M.jsx)(t.code,{children:`Date[]`}),` to explicitly set categories`]}),`
`,(0,M.jsxs)(t.li,{children:[`Horizontal: Use `,(0,M.jsx)(t.code,{children:`[number, number]`}),` to set value range [min, max]`]}),`
`]}),`
`,(0,M.jsx)(t.p,{children:`Useful for ensuring consistent domains across multiple charts or showing empty slots for missing data.`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Type`}),`: `,(0,M.jsx)(t.code,{children:`string[] | [number, number]`})]}),`
`]}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-tsx`,children:`// Vertical: Show slots for categories A-F even if some are missing from data
xDomain={['A', 'B', 'C', 'D', 'E', 'F']}

// Horizontal: Set value range
xDomain={[0, 100]}
`})}),`
`,(0,M.jsx)(t.h4,{id:`ydomain`,children:(0,M.jsx)(t.code,{children:`yDomain`})}),`
`,(0,M.jsx)(t.p,{children:`Explicit y-axis domain. The type depends on orientation:`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[`Vertical: Use `,(0,M.jsx)(t.code,{children:`[number, number]`}),` to set value range [min, max]`]}),`
`,(0,M.jsxs)(t.li,{children:[`Horizontal: Use `,(0,M.jsx)(t.code,{children:`string[]`}),` or `,(0,M.jsx)(t.code,{children:`Date[]`}),` to explicitly set categories`]}),`
`]}),`
`,(0,M.jsx)(t.p,{children:`Useful for consistent scales across multiple charts or emphasizing specific value ranges.`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Type`}),`: `,(0,M.jsx)(t.code,{children:`[number, number] | string[]`})]}),`
`]}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-tsx`,children:`// Vertical: Always show 0-100 range regardless of data
yDomain={[0, 100]}

// Horizontal: Show slots for categories A-F
yDomain={['A', 'B', 'C', 'D', 'E', 'F']}
`})}),`
`,(0,M.jsx)(t.h3,{id:`interaction-props`,children:`Interaction Props`}),`
`,(0,M.jsx)(t.h4,{id:`tooltip`,children:(0,M.jsx)(t.code,{children:`tooltip`})}),`
`,(0,M.jsx)(t.p,{children:`Whether to show tooltips on hover.`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Default`}),`: `,(0,M.jsx)(t.code,{children:`true`})]}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,M.jsx)(t.h3,{id:`single-series`,children:`Single Series`}),`
`,(0,M.jsx)(t.p,{children:`Display a single data series as vertical bars:`}),`
`,(0,M.jsx)(r,{language:`tsx`,code:v}),`
`,(0,M.jsx)(i,{of:h,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`multi-series`,children:`Multi-Series`}),`
`,(0,M.jsx)(t.p,{children:`Display multiple data series as grouped bars with a legend:`}),`
`,(0,M.jsx)(r,{language:`tsx`,code:b}),`
`,(0,M.jsx)(i,{of:f,inline:!0}),`
`,(0,M.jsx)(t.h2,{id:`orientation-1`,children:`Orientation`}),`
`,(0,M.jsx)(t.h3,{id:`horizontal-single-series`,children:`Horizontal Single Series`}),`
`,(0,M.jsx)(t.p,{children:`Horizontal bars are ideal for ranking, comparison, or when you have long category labels:`}),`
`,(0,M.jsx)(r,{language:`tsx`,code:S}),`
`,(0,M.jsx)(i,{of:d,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`horizontal-multi-series`,children:`Horizontal Multi-Series`}),`
`,(0,M.jsx)(t.p,{children:`Grouped bars work in horizontal orientation as well:`}),`
`,(0,M.jsx)(r,{language:`tsx`,code:w}),`
`,(0,M.jsx)(i,{of:u,inline:!0}),`
`,(0,M.jsx)(t.h2,{id:`custom-domains`,children:`Custom Domains`}),`
`,(0,M.jsx)(t.p,{children:`Control the exact categories and value ranges displayed:`}),`
`,(0,M.jsx)(r,{language:`tsx`,code:E}),`
`,(0,M.jsx)(i,{of:l,inline:!0}),`
`,(0,M.jsx)(t.p,{children:`In this example:`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`xDomain`}),` includes category 'F' which doesn't exist in the data, showing an empty slot`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`yDomain`}),` is set to `,(0,M.jsx)(t.code,{children:`[0, 40]`}),` to maintain a consistent scale even though the max value is 30`]}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`rtl-support`,children:`RTL Support`}),`
`,(0,M.jsxs)(t.p,{children:[`The chart follows the current `,(0,M.jsx)(t.strong,{children:`layout direction`}),` (LTR or RTL). By default, that direction is detected automatically from the browser or system settings. When it is RTL, the chart mirrors axes, bars, and labels accordingly.`]}),`
`,(0,M.jsx)(r,{language:`tsx`,code:O}),`
`,(0,M.jsx)(i,{of:m,inline:!0}),`
`,(0,M.jsxs)(t.p,{children:[(0,M.jsx)(t.strong,{children:`Note`}),`: RTL support is currently in active development. Axis rendering and tick mark spacing are being refined.`]}),`
`,(0,M.jsx)(t.h2,{id:`design-system-alignment`,children:`Design System Alignment`}),`
`,(0,M.jsx)(t.p,{children:`The BarChart component is built to align with Antares design principles:`}),`
`,(0,M.jsx)(t.h3,{id:`spacing-and-sizing`,children:`Spacing and Sizing`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Bar width`}),`: 12px (1.5 grid units)`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Bar padding`}),` (multi-series): 4px between bars within a group`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Group gap`}),`: Minimum 24px between bar groups`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Border radius`}),`: 8px on all bars`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Margins`}),`: 20px top/right, 60px bottom/left for axes and labels`]}),`
`]}),`
`,(0,M.jsx)(t.h3,{id:`responsive-behavior`,children:`Responsive Behavior`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Auto-sizing`}),`: Uses VisX's `,(0,M.jsx)(t.code,{children:`useParentSize`}),` hook to adapt to container width`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Horizontal scrolling`}),`: When data points exceed available width, the chart becomes horizontally scrollable`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Sticky y-axis`}),`: The y-axis remains visible during horizontal scroll`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Minimum spacing`}),`: Group gaps never fall below 24px, triggering scroll instead`]}),`
`]}),`
`,(0,M.jsx)(t.h3,{id:`accessibility`,children:`Accessibility`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Keyboard navigation`}),`: Bar groups are keyboard accessible with `,(0,M.jsx)(t.code,{children:`tabIndex={0}`}),` and `,(0,M.jsx)(t.code,{children:`role="group"`})]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Screen reader support`}),`: Semantic HTML structure with proper ARIA attributes`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Tooltips`}),`: Show on both hover and focus for keyboard users`]}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`performance-considerations`,children:`Performance Considerations`}),`
`,(0,M.jsx)(t.h3,{id:`rendering-strategy`,children:`Rendering Strategy`}),`
`,(0,M.jsx)(t.p,{children:`The component uses VisX primitives for optimal SVG rendering:`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Scales`}),`: VisX's `,(0,M.jsx)(t.code,{children:`scaleBand`}),` and `,(0,M.jsx)(t.code,{children:`scaleLinear`}),` for efficient coordinate mapping`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Grouped rendering`}),`: Bars are rendered in SVG `,(0,M.jsx)(t.code,{children:`<Group>`}),` elements for logical organization`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Responsive sizing`}),`: `,(0,M.jsx)(t.code,{children:`useParentSize`}),` hook provides efficient resize detection with debouncing (15ms)`]}),`
`]}),`
`,(0,M.jsx)(t.h3,{id:`scrolling-strategy`,children:`Scrolling Strategy`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Vertical charts`}),`: Horizontal scrolling when many data points exceed container width`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Horizontal charts`}),`: Vertical scrolling when many categories exceed container height`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Sticky axes`}),`: Positioned absolutely to remain visible during scroll`]}),`
`]}),`
`,(0,M.jsx)(t.h3,{id:`recommendations`,children:`Recommendations`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[`For charts with `,(0,M.jsx)(t.strong,{children:`many data points`}),` (>20), consider enabling horizontal scroll (default behavior)`]}),`
`,(0,M.jsxs)(t.li,{children:[`For `,(0,M.jsx)(t.strong,{children:`horizontal bar charts`}),`, vertical scrolling is more mobile-friendly than horizontal`]}),`
`,(0,M.jsxs)(t.li,{children:[`Use `,(0,M.jsx)(t.strong,{children:`custom domains`}),` to maintain consistent scales across multiple charts`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Tooltips`}),` use absolute positioning and scroll-aware calculations for accurate placement`]}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`development-status`,children:`Development Status`}),`
`,(0,M.jsx)(t.p,{children:`The BarChart component is in active development. Current focus areas:`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsx)(t.li,{children:`✅ Single and multi-series support`}),`
`,(0,M.jsx)(t.li,{children:`✅ Vertical and horizontal orientations`}),`
`,(0,M.jsx)(t.li,{children:`✅ Responsive behavior with sticky axes`}),`
`,(0,M.jsx)(t.li,{children:`✅ Interactive tooltips`}),`
`,(0,M.jsx)(t.li,{children:`✅ Custom domains`}),`
`,(0,M.jsx)(t.li,{children:`✅ Design system alignment`}),`
`,(0,M.jsx)(t.li,{children:`🚧 RTL compatibility (axis rendering and spacing refinement)`}),`
`,(0,M.jsx)(t.li,{children:`🚧 Tick mark positioning improvements`}),`
`,(0,M.jsx)(t.li,{children:`🚧 Additional customization options (tick formatting, axis configuration)`}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,M.jsx)(t.h3,{id:`bars-not-showing`,children:`Bars Not Showing`}),`
`,(0,M.jsx)(t.p,{children:`If bars are not visible:`}),`
`,(0,M.jsxs)(t.ol,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Check data`}),`: Ensure `,(0,M.jsx)(t.code,{children:`series`}),` array has data and `,(0,M.jsx)(t.code,{children:`xAccessor`}),`/`,(0,M.jsx)(t.code,{children:`yAccessor`}),` return valid values`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Check domains`}),`: Verify `,(0,M.jsx)(t.code,{children:`yDomain`}),` (if set) includes your data values`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Check dimensions`}),`: Ensure container has non-zero width and height`]}),`
`]}),`
`,(0,M.jsx)(t.h3,{id:`tooltip-positioning-issues`,children:`Tooltip Positioning Issues`}),`
`,(0,M.jsx)(t.p,{children:`If tooltips appear in the wrong location:`}),`
`,(0,M.jsxs)(t.ol,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Check scroll position`}),`: The component accounts for horizontal scroll automatically`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Check container`}),`: Ensure the chart container is not transformed or positioned in a complex layout`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Verify event targets`}),`: Tooltips use mouse event coordinates and bar group positions`]}),`
`]}),`
`,(0,M.jsx)(t.h3,{id:`performance-issues`,children:`Performance Issues`}),`
`,(0,M.jsx)(t.p,{children:`For better performance:`}),`
`,(0,M.jsxs)(t.ol,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Limit data points`}),`: Consider pagination or filtering for very large datasets (>100 points)`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Debounce resize`}),`: The default 15ms debounce on `,(0,M.jsx)(t.code,{children:`useParentSize`}),` balances smoothness and performance`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Simplify tooltips`}),`: If tooltips are complex, consider using simpler content or disabling them`]}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,M.jsx)(t.p,{children:`All examples can be found in the Storybook interface:`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Single Series`}),`: Basic vertical bar chart`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Multi-Series`}),`: Grouped bars with legend`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Horizontal Single Series`}),`: Horizontal orientation`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Horizontal Multi-Series`}),`: Grouped horizontal bars`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Custom Domain`}),`: Controlled x and y ranges`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`RTL Multi-Series`}),`: Multi-series chart in RTL `,(0,M.jsx)(t.em,{children:`(in development)`})]}),`
`]})]})}function j(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,M.jsx)(t,{...e,children:(0,M.jsx)(A,{...e})}):A(e)}var M;e((()=>{M=t(),c(),s(),g(),y(),x(),C(),T(),D(),k()}))();export{j as default};