import{j as e}from"./iframe-DY2JU6yu.js";import{useMDXComponents as o}from"./index-vMp9Gci6.js";import{M as l,A as a,S as i,a as r}from"./blocks-DR5RAoBv.js";import{S as c,P as d,a as h,M as x,H as p,b as j,C as u,R as m}from"./bar-chart.stories-Ci8ItiPl.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B6XwFIy4.js";import"./index-DOyM4hZy.js";import"./index-CwLu9-2K.js";import"./utils-C3REwL85.js";import"./Group-DKB5vELX.js";import"./cityTemperature-B5ZDt9Q5.js";import"./useTooltip-CCu6PSdL.js";import"./band-B0J7HmRE.js";import"./init-Gi6I4Gst.js";import"./ordinal-Cboi1Yqb.js";import"./string-BVYZ4x68.js";import"./year-Cm1sU_Jw.js";import"./linear-PAdLsb0K.js";import"./defaultLocale-C4B-KCzX.js";import"./index-wv2-W3Ma.js";import"./index-k2GvU-5S.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./index-CsIqp9IP.js";import"./context-vYBYcdXT.js";import"./SSRProvider-C-OpFMFK.js";import"./index-DjEG-JJl.js";import"./index-shB1u9zO.js";import"./Text-CuNCs2V4.js";import"./mergeProps-C4ZhBcln.js";import"./useObjectRef-zzrnZ1na.js";import"./index-Bo8qxjoj.js";import"./rtl-locale-provider-ze1YUf8N.js";const g=`import { BarChart } from '@godaddy/antares';
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
`,y=`import { BarChart } from '@godaddy/antares';
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
`,f=`import { BarChart } from '@godaddy/antares';
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
`,b=`import { BarChart } from '@godaddy/antares';
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
`,v=`import { BarChart } from '@godaddy/antares';

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
`,S=`import { BarChart } from '@godaddy/antares';
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
`;function t(s){const n={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:c,name:"Overview"}),`
`,e.jsx(n.h1,{id:"bar-chart",children:"Bar Chart"}),`
`,e.jsx(n.p,{children:"A flexible, accessible, and design-aligned data visualization solution for displaying single or multi-series bar charts."}),`
`,e.jsx(n.h2,{id:"features",children:"Features"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Single and multi-series support"}),": Display one or multiple data series with grouped bars"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Vertical and horizontal orientations"}),": Choose the best layout for your data and use case"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Responsive behavior"}),": Auto-sizing with horizontal scrolling for many data points, sticky axes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Design system alignment"}),": 8px border radius, 12px bar width (1.5 GU), consistent spacing"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Interactive tooltips"}),": Hover to see exact values, with smart positioning and scroll-awareness"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Customizable axes"}),": Control gridlines, tick marks, axis titles, and tick formatting"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Custom domains"}),": Set explicit x and y ranges for controlled scales across multiple charts"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"RTL support"}),": Full right-to-left layout support for international audiences ",e.jsx(n.em,{children:"(in development)"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Accessibility ready"}),": Keyboard navigation, screen reader support, and semantic HTML"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"TypeScript support"}),": Fully typed with comprehensive prop interfaces"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"VisX integration"}),": Leverages VisX primitives for scales, axes, shapes, and responsive layout"]}),`
`]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"BarChart"})," component accepts the following props:"]}),`
`,e.jsx(a,{of:d}),`
`,e.jsx(n.h3,{id:"core-props",children:"Core Props"}),`
`,e.jsxs(n.h4,{id:"series-required",children:[e.jsx(n.code,{children:"series"})," (required)"]}),`
`,e.jsx(n.p,{children:"An array of data series to display. Each series must include:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"id"}),": Unique identifier for the series"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"name"}),": Display name for the legend"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"data"}),": Array of data points"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"color"}),": Hex color for the bars"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`const series = [
  {
    id: 'new-york',
    name: 'New York',
    color: '#145FA9',
    data: [{ date: '2024-01-01', temp: 45 }, ...]
  }
];
`})}),`
`,e.jsxs(n.h4,{id:"xaccessor-required",children:[e.jsx(n.code,{children:"xAccessor"})," (required)"]}),`
`,e.jsx(n.p,{children:"Function that extracts the x-axis value from a data point. Returns a string representing the category or label."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`xAccessor={(d) => d.date}
`})}),`
`,e.jsxs(n.h4,{id:"yaccessor-required",children:[e.jsx(n.code,{children:"yAccessor"})," (required)"]}),`
`,e.jsx(n.p,{children:"Function that extracts the y-axis value from a data point. Returns a number representing the value to display."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`yAccessor={(d) => d.temperature}
`})}),`
`,e.jsx(n.h3,{id:"layout-props",children:"Layout Props"}),`
`,e.jsx(n.h4,{id:"orientation",children:e.jsx(n.code,{children:"orientation"})}),`
`,e.jsx(n.p,{children:"Controls whether bars are vertical (default) or horizontal."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default"}),": ",e.jsx(n.code,{children:"'vertical'"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Options"}),": ",e.jsx(n.code,{children:"'vertical'"})," | ",e.jsx(n.code,{children:"'horizontal'"})]}),`
`]}),`
`,e.jsx(n.p,{children:"Vertical charts are best for time series or categorical data. Horizontal charts work well for rankings or when category labels are long."}),`
`,e.jsx(n.h4,{id:"width",children:e.jsx(n.code,{children:"width"})}),`
`,e.jsxs(n.p,{children:["Width of the chart in pixels. The chart uses responsive sizing via ",e.jsx(n.code,{children:"useParentSize"}),", so this serves as a default when the container size is not yet known."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default"}),": ",e.jsx(n.code,{children:"500"})]}),`
`]}),`
`,e.jsx(n.h4,{id:"height",children:e.jsx(n.code,{children:"height"})}),`
`,e.jsx(n.p,{children:"Height of the chart in pixels."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default"}),": ",e.jsx(n.code,{children:"700"})]}),`
`]}),`
`,e.jsx(n.h4,{id:"legendposition",children:e.jsx(n.code,{children:"legendPosition"})}),`
`,e.jsx(n.p,{children:"Position of the legend relative to the chart."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default"}),": ",e.jsx(n.code,{children:"'bottom'"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Options"}),": ",e.jsx(n.code,{children:"'top'"})," | ",e.jsx(n.code,{children:"'bottom'"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"axis-props",children:"Axis Props"}),`
`,e.jsx(n.h4,{id:"xaxistitle",children:e.jsx(n.code,{children:"xAxisTitle"})}),`
`,e.jsx(n.p,{children:"Title displayed below the x-axis."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Type"}),": ",e.jsx(n.code,{children:"string"})]}),`
`]}),`
`,e.jsx(n.h4,{id:"yaxistitle",children:e.jsx(n.code,{children:"yAxisTitle"})}),`
`,e.jsx(n.p,{children:"Title displayed to the left of the y-axis."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Type"}),": ",e.jsx(n.code,{children:"string"})]}),`
`]}),`
`,e.jsx(n.h4,{id:"xbaseline",children:e.jsx(n.code,{children:"xBaseline"})}),`
`,e.jsx(n.p,{children:"Whether to show the x-axis baseline and labels."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default"}),": ",e.jsx(n.code,{children:"true"})]}),`
`]}),`
`,e.jsx(n.h4,{id:"ybaseline",children:e.jsx(n.code,{children:"yBaseline"})}),`
`,e.jsx(n.p,{children:"Whether to show the y-axis baseline and labels."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default"}),": ",e.jsx(n.code,{children:"true"})]}),`
`]}),`
`,e.jsx(n.h4,{id:"xtickmarks",children:e.jsx(n.code,{children:"xTickMarks"})}),`
`,e.jsx(n.p,{children:"Whether to show tick marks on the x-axis."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default"}),": ",e.jsx(n.code,{children:"true"})]}),`
`]}),`
`,e.jsx(n.h4,{id:"ytickmarks",children:e.jsx(n.code,{children:"yTickMarks"})}),`
`,e.jsx(n.p,{children:"Whether to show tick marks on the y-axis."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default"}),": ",e.jsx(n.code,{children:"true"})]}),`
`]}),`
`,e.jsx(n.h4,{id:"xgridlines",children:e.jsx(n.code,{children:"xGridlines"})}),`
`,e.jsx(n.p,{children:"Whether to show vertical gridlines from the x-axis."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default"}),": ",e.jsx(n.code,{children:"true"})]}),`
`]}),`
`,e.jsx(n.h4,{id:"ygridlines",children:e.jsx(n.code,{children:"yGridlines"})}),`
`,e.jsx(n.p,{children:"Whether to show horizontal gridlines from the y-axis."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default"}),": ",e.jsx(n.code,{children:"true"})]}),`
`]}),`
`,e.jsx(n.h4,{id:"xtickformat",children:e.jsx(n.code,{children:"xTickFormat"})}),`
`,e.jsx(n.p,{children:"Function to format x-axis tick labels. The value type depends on orientation:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Vertical: categories (string | Date) from xAccessor"}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Horizontal: numeric values (number) from xAccessor"}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Type"}),": ",e.jsx(n.code,{children:"(value: string | number | Date) => string"})]}),`
`]}),`
`]}),`
`,e.jsx(n.h4,{id:"ytickformat",children:e.jsx(n.code,{children:"yTickFormat"})}),`
`,e.jsx(n.p,{children:"Function to format y-axis tick labels. The value type depends on orientation:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Vertical: numeric values (number) from yAccessor"}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Horizontal: categories (string | Date) from yAccessor"}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Type"}),": ",e.jsx(n.code,{children:"(value: string | number | Date) => string"})]}),`
`]}),`
`]}),`
`,e.jsx(n.h4,{id:"xnumticks",children:e.jsx(n.code,{children:"xNumTicks"})}),`
`,e.jsx(n.p,{children:"Suggested number of ticks for the x-axis."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Type"}),": ",e.jsx(n.code,{children:"number"})]}),`
`]}),`
`,e.jsx(n.h4,{id:"ynumticks",children:e.jsx(n.code,{children:"yNumTicks"})}),`
`,e.jsx(n.p,{children:"Suggested number of ticks for the y-axis."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Type"}),": ",e.jsx(n.code,{children:"number"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"domain-props",children:"Domain Props"}),`
`,e.jsx(n.h4,{id:"xdomain",children:e.jsx(n.code,{children:"xDomain"})}),`
`,e.jsx(n.p,{children:"Explicit x-axis domain. The type depends on orientation:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Vertical: Use ",e.jsx(n.code,{children:"string[]"})," or ",e.jsx(n.code,{children:"Date[]"})," to explicitly set categories"]}),`
`,e.jsxs(n.li,{children:["Horizontal: Use ",e.jsx(n.code,{children:"[number, number]"})," to set value range [min, max]"]}),`
`]}),`
`,e.jsx(n.p,{children:"Useful for ensuring consistent domains across multiple charts or showing empty slots for missing data."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Type"}),": ",e.jsx(n.code,{children:"string[] | [number, number]"})]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// Vertical: Show slots for categories A-F even if some are missing from data
xDomain={['A', 'B', 'C', 'D', 'E', 'F']}

// Horizontal: Set value range
xDomain={[0, 100]}
`})}),`
`,e.jsx(n.h4,{id:"ydomain",children:e.jsx(n.code,{children:"yDomain"})}),`
`,e.jsx(n.p,{children:"Explicit y-axis domain. The type depends on orientation:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Vertical: Use ",e.jsx(n.code,{children:"[number, number]"})," to set value range [min, max]"]}),`
`,e.jsxs(n.li,{children:["Horizontal: Use ",e.jsx(n.code,{children:"string[]"})," or ",e.jsx(n.code,{children:"Date[]"})," to explicitly set categories"]}),`
`]}),`
`,e.jsx(n.p,{children:"Useful for consistent scales across multiple charts or emphasizing specific value ranges."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Type"}),": ",e.jsx(n.code,{children:"[number, number] | string[]"})]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// Vertical: Always show 0-100 range regardless of data
yDomain={[0, 100]}

// Horizontal: Show slots for categories A-F
yDomain={['A', 'B', 'C', 'D', 'E', 'F']}
`})}),`
`,e.jsx(n.h3,{id:"interaction-props",children:"Interaction Props"}),`
`,e.jsx(n.h4,{id:"tooltip",children:e.jsx(n.code,{children:"tooltip"})}),`
`,e.jsx(n.p,{children:"Whether to show tooltips on hover."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default"}),": ",e.jsx(n.code,{children:"true"})]}),`
`]}),`
`,e.jsx(n.h2,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.h3,{id:"single-series",children:"Single Series"}),`
`,e.jsx(n.p,{children:"Display a single data series as vertical bars:"}),`
`,e.jsx(i,{language:"tsx",code:g}),`
`,e.jsx(r,{of:h,inline:!0}),`
`,e.jsx(n.h3,{id:"multi-series",children:"Multi-Series"}),`
`,e.jsx(n.p,{children:"Display multiple data series as grouped bars with a legend:"}),`
`,e.jsx(i,{language:"tsx",code:y}),`
`,e.jsx(r,{of:x,inline:!0}),`
`,e.jsx(n.h2,{id:"orientation-1",children:"Orientation"}),`
`,e.jsx(n.h3,{id:"horizontal-single-series",children:"Horizontal Single Series"}),`
`,e.jsx(n.p,{children:"Horizontal bars are ideal for ranking, comparison, or when you have long category labels:"}),`
`,e.jsx(i,{language:"tsx",code:f}),`
`,e.jsx(r,{of:p,inline:!0}),`
`,e.jsx(n.h3,{id:"horizontal-multi-series",children:"Horizontal Multi-Series"}),`
`,e.jsx(n.p,{children:"Grouped bars work in horizontal orientation as well:"}),`
`,e.jsx(i,{language:"tsx",code:b}),`
`,e.jsx(r,{of:j,inline:!0}),`
`,e.jsx(n.h2,{id:"custom-domains",children:"Custom Domains"}),`
`,e.jsx(n.p,{children:"Control the exact categories and value ranges displayed:"}),`
`,e.jsx(i,{language:"tsx",code:v}),`
`,e.jsx(r,{of:u,inline:!0}),`
`,e.jsx(n.p,{children:"In this example:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"xDomain"})," includes category 'F' which doesn't exist in the data, showing an empty slot"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"yDomain"})," is set to ",e.jsx(n.code,{children:"[0, 40]"})," to maintain a consistent scale even though the max value is 30"]}),`
`]}),`
`,e.jsx(n.h2,{id:"rtl-support",children:"RTL Support"}),`
`,e.jsxs(n.p,{children:["The chart follows the current ",e.jsx(n.strong,{children:"layout direction"})," (LTR or RTL). By default, that direction is detected automatically from the browser or system settings. When it is RTL, the chart mirrors axes, bars, and labels accordingly."]}),`
`,e.jsx(i,{language:"tsx",code:S}),`
`,e.jsx(r,{of:m,inline:!0}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note"}),": RTL support is currently in active development. Axis rendering and tick mark spacing are being refined."]}),`
`,e.jsx(n.h2,{id:"design-system-alignment",children:"Design System Alignment"}),`
`,e.jsx(n.p,{children:"The BarChart component is built to align with UXCore design principles:"}),`
`,e.jsx(n.h3,{id:"spacing-and-sizing",children:"Spacing and Sizing"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Bar width"}),": 12px (1.5 grid units)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Bar padding"})," (multi-series): 4px between bars within a group"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Group gap"}),": Minimum 24px between bar groups"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Border radius"}),": 8px on all bars"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Margins"}),": 20px top/right, 60px bottom/left for axes and labels"]}),`
`]}),`
`,e.jsx(n.h3,{id:"responsive-behavior",children:"Responsive Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Auto-sizing"}),": Uses VisX's ",e.jsx(n.code,{children:"useParentSize"})," hook to adapt to container width"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Horizontal scrolling"}),": When data points exceed available width, the chart becomes horizontally scrollable"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Sticky y-axis"}),": The y-axis remains visible during horizontal scroll"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Minimum spacing"}),": Group gaps never fall below 24px, triggering scroll instead"]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard navigation"}),": Bar groups are keyboard accessible with ",e.jsx(n.code,{children:"tabIndex={0}"})," and ",e.jsx(n.code,{children:'role="group"'})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Screen reader support"}),": Semantic HTML structure with proper ARIA attributes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tooltips"}),": Show on both hover and focus for keyboard users"]}),`
`]}),`
`,e.jsx(n.h2,{id:"performance-considerations",children:"Performance Considerations"}),`
`,e.jsx(n.h3,{id:"rendering-strategy",children:"Rendering Strategy"}),`
`,e.jsx(n.p,{children:"The component uses VisX primitives for optimal SVG rendering:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Scales"}),": VisX's ",e.jsx(n.code,{children:"scaleBand"})," and ",e.jsx(n.code,{children:"scaleLinear"})," for efficient coordinate mapping"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Grouped rendering"}),": Bars are rendered in SVG ",e.jsx(n.code,{children:"<Group>"})," elements for logical organization"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Responsive sizing"}),": ",e.jsx(n.code,{children:"useParentSize"})," hook provides efficient resize detection with debouncing (15ms)"]}),`
`]}),`
`,e.jsx(n.h3,{id:"scrolling-strategy",children:"Scrolling Strategy"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Vertical charts"}),": Horizontal scrolling when many data points exceed container width"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Horizontal charts"}),": Vertical scrolling when many categories exceed container height"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Sticky axes"}),": Positioned absolutely to remain visible during scroll"]}),`
`]}),`
`,e.jsx(n.h3,{id:"recommendations",children:"Recommendations"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["For charts with ",e.jsx(n.strong,{children:"many data points"})," (>20), consider enabling horizontal scroll (default behavior)"]}),`
`,e.jsxs(n.li,{children:["For ",e.jsx(n.strong,{children:"horizontal bar charts"}),", vertical scrolling is more mobile-friendly than horizontal"]}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.strong,{children:"custom domains"})," to maintain consistent scales across multiple charts"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tooltips"})," use absolute positioning and scroll-aware calculations for accurate placement"]}),`
`]}),`
`,e.jsx(n.h2,{id:"development-status",children:"Development Status"}),`
`,e.jsx(n.p,{children:"The BarChart component is in active development. Current focus areas:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"✅ Single and multi-series support"}),`
`,e.jsx(n.li,{children:"✅ Vertical and horizontal orientations"}),`
`,e.jsx(n.li,{children:"✅ Responsive behavior with sticky axes"}),`
`,e.jsx(n.li,{children:"✅ Interactive tooltips"}),`
`,e.jsx(n.li,{children:"✅ Custom domains"}),`
`,e.jsx(n.li,{children:"✅ Design system alignment"}),`
`,e.jsx(n.li,{children:"🚧 RTL compatibility (axis rendering and spacing refinement)"}),`
`,e.jsx(n.li,{children:"🚧 Tick mark positioning improvements"}),`
`,e.jsx(n.li,{children:"🚧 Additional customization options (tick formatting, axis configuration)"}),`
`]}),`
`,e.jsx(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),`
`,e.jsx(n.h3,{id:"bars-not-showing",children:"Bars Not Showing"}),`
`,e.jsx(n.p,{children:"If bars are not visible:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check data"}),": Ensure ",e.jsx(n.code,{children:"series"})," array has data and ",e.jsx(n.code,{children:"xAccessor"}),"/",e.jsx(n.code,{children:"yAccessor"})," return valid values"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check domains"}),": Verify ",e.jsx(n.code,{children:"yDomain"})," (if set) includes your data values"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check dimensions"}),": Ensure container has non-zero width and height"]}),`
`]}),`
`,e.jsx(n.h3,{id:"tooltip-positioning-issues",children:"Tooltip Positioning Issues"}),`
`,e.jsx(n.p,{children:"If tooltips appear in the wrong location:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check scroll position"}),": The component accounts for horizontal scroll automatically"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Check container"}),": Ensure the chart container is not transformed or positioned in a complex layout"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Verify event targets"}),": Tooltips use mouse event coordinates and bar group positions"]}),`
`]}),`
`,e.jsx(n.h3,{id:"performance-issues",children:"Performance Issues"}),`
`,e.jsx(n.p,{children:"For better performance:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Limit data points"}),": Consider pagination or filtering for very large datasets (>100 points)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Debounce resize"}),": The default 15ms debounce on ",e.jsx(n.code,{children:"useParentSize"})," balances smoothness and performance"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Simplify tooltips"}),": If tooltips are complex, consider using simpler content or disabling them"]}),`
`]}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.p,{children:"All examples can be found in the Storybook interface:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Single Series"}),": Basic vertical bar chart"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Multi-Series"}),": Grouped bars with legend"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Horizontal Single Series"}),": Horizontal orientation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Horizontal Multi-Series"}),": Grouped horizontal bars"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Custom Domain"}),": Controlled x and y ranges"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"RTL Multi-Series"}),": Multi-series chart in RTL ",e.jsx(n.em,{children:"(in development)"})]}),`
`]})]})}function se(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{se as default};
