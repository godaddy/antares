import{i as e}from"./preload-helper-Cm6E7gqZ.js";import{F as t}from"./iframe-CrqLB-N1.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-CjQZ2XWS.js";import{t as c}from"./mdx-react-shim-CWiof15K.js";import{t as l}from"./runtime-ClaidU16.js";import{CustomDomain as u,Default as d,FormattedTickMarks as f,HorizontalMultiSeries as p,HorizontalSingleSeries as m,MultiSeries as h,Props as g,RTLHorizontalMultiSeries as _,RTLMultiSeries as v,n as y,t as b}from"./bar-chart.stories-5ylF4iIz.js";function x(e){let t={code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(o,{of:b,name:`Overview`}),`
`,(0,C.jsx)(t.h1,{id:`bar-chart`,children:`Bar Chart`}),`
`,(0,C.jsx)(t.p,{children:`A flexible, accessible, and design-aligned data visualization solution for displaying single or multi-series bar charts.`}),`
`,(0,C.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Single and multi-series support`}),`: Display one or multiple data series with grouped bars`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Vertical and horizontal orientations`}),`: Choose the best layout for your data and use case`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Responsive behavior`}),`: Auto-sizing with horizontal scrolling for many data points, sticky axes`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Design system alignment`}),`: 8px border radius, 12px bar width (1.5 GU), consistent spacing`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Interactive tooltips`}),`: Hover to see exact values, with smart positioning and scroll-awareness`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Customizable axes`}),`: Control gridlines, tick marks, axis titles, and tick formatting`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Custom domains`}),`: Set explicit x and y ranges for controlled scales across multiple charts`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`RTL support`}),`: Full right-to-left layout support for international audiences `,(0,C.jsx)(t.em,{children:`(in development)`})]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Accessibility ready`}),`: Keyboard navigation, screen reader support, and semantic HTML`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`TypeScript support`}),`: Fully typed with comprehensive prop interfaces`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`VisX integration`}),`: Leverages VisX primitives for scales, axes, shapes, and responsive layout`]}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,C.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,C.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,C.jsxs)(t.p,{children:[`You give the chart a `,(0,C.jsx)(t.code,{children:`series`}),` array plus `,(0,C.jsx)(t.code,{children:`xAccessor`}),` and `,(0,C.jsx)(t.code,{children:`yAccessor`}),` so it knows which field is the category and which is the value - this is the everyday setup for one set of vertical bars.`]}),`
`,(0,C.jsx)(i,{of:d,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { BarChart } from '@godaddy/antares';
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
`,(0,C.jsx)(t.h3,{id:`multi-series`,children:`Multi-series`}),`
`,(0,C.jsxs)(t.p,{children:[`Pass more than one entry in `,(0,C.jsx)(t.code,{children:`series`}),` and the bars group by category, with a legend naming each series. Use it when the comparison between series matters as much as the values themselves.`]}),`
`,(0,C.jsx)(i,{of:h,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { BarChart } from '@godaddy/antares';
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
`,(0,C.jsx)(t.h3,{id:`horizontal-single-series`,children:`Horizontal single series`}),`
`,(0,C.jsxs)(t.p,{children:[(0,C.jsx)(t.code,{children:`orientation="horizontal"`}),` swaps the axes: categories run down the side and values across the bottom. Reach for it when the labels are long or the chart is really a ranking.`]}),`
`,(0,C.jsx)(i,{of:m,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { BarChart } from '@godaddy/antares';
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
`,(0,C.jsx)(t.h3,{id:`horizontal-multi-series`,children:`Horizontal multi-series`}),`
`,(0,C.jsx)(t.p,{children:`Grouped bars work horizontally too. With many categories the chart scrolls vertically, which is usually easier on a phone than scrolling sideways.`}),`
`,(0,C.jsx)(i,{of:p,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { BarChart } from '@godaddy/antares';
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
`,(0,C.jsx)(t.h3,{id:`custom-domain`,children:`Custom domain`}),`
`,(0,C.jsxs)(t.p,{children:[(0,C.jsx)(t.code,{children:`xDomain`}),` and `,(0,C.jsx)(t.code,{children:`yDomain`}),` pin down exactly which categories and value range to draw. Here category `,(0,C.jsx)(t.code,{children:`F`}),` has no data and still gets an empty slot, and the Y range stays `,(0,C.jsx)(t.code,{children:`[0, 40]`}),` even though the largest bar is 30 - handy when several charts need to share a scale.`]}),`
`,(0,C.jsx)(i,{of:u,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { BarChart } from '@godaddy/antares';

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
`,(0,C.jsx)(t.h3,{id:`formatted-tick-marks`,children:`Formatted tick marks`}),`
`,(0,C.jsxs)(t.p,{children:[(0,C.jsx)(t.code,{children:`xTickFormat`}),` and `,(0,C.jsx)(t.code,{children:`yTickFormat`}),` shape the axis labels - abbreviated dates on one axis, thousands separators on the other. The functions receive the raw accessor value, so they also cover currency, units, or percentages.`]}),`
`,(0,C.jsx)(i,{of:f,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { BarChart } from '@godaddy/antares';

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
`,(0,C.jsx)(t.h3,{id:`rtl-multi-series`,children:`RTL multi-series`}),`
`,(0,C.jsx)(t.p,{children:`The chart follows the current layout direction, which is normally detected from the browser or system settings. In right-to-left it mirrors the axes, bars, and labels; this example forces RTL so you can see it in a left-to-right page. RTL support is still being refined - axis rendering and tick spacing in particular.`}),`
`,(0,C.jsx)(i,{of:v,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { BarChart } from '@godaddy/antares';
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
`,(0,C.jsx)(t.h3,{id:`rtl-horizontal-multi-series`,children:`RTL horizontal multi-series`}),`
`,(0,C.jsx)(t.p,{children:`Horizontal grouped bars in a right-to-left layout: bars grow from the right edge and the category axis moves to the right side.`}),`
`,(0,C.jsx)(i,{of:_,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { BarChart } from '@godaddy/antares';
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
`,(0,C.jsx)(t.h2,{id:`design-system-alignment`,children:`Design System Alignment`}),`
`,(0,C.jsx)(t.h3,{id:`spacing-and-sizing`,children:`Spacing and Sizing`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Bar width`}),`: 12px (1.5 grid units)`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Bar padding`}),` (multi-series): 4px between bars within a group`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Group gap`}),`: Minimum 24px between bar groups`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Border radius`}),`: 8px on all bars`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Margins`}),`: 20px top/right, 60px bottom/left for axes and labels`]}),`
`]}),`
`,(0,C.jsx)(t.h3,{id:`responsive-behavior`,children:`Responsive Behavior`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Auto-sizing`}),`: Uses VisX's `,(0,C.jsx)(t.code,{children:`useParentSize`}),` hook to adapt to container width`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Horizontal scrolling`}),`: When data points exceed available width, the chart becomes horizontally scrollable`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Sticky y-axis`}),`: The y-axis remains visible during horizontal scroll`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Minimum spacing`}),`: Group gaps never fall below 24px, triggering scroll instead`]}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Keyboard navigation`}),`: Bar groups are keyboard accessible with `,(0,C.jsx)(t.code,{children:`tabIndex={0}`}),` and `,(0,C.jsx)(t.code,{children:`role="group"`})]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Screen reader support`}),`: Semantic HTML structure with proper ARIA attributes`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Tooltips`}),`: Show on both hover and focus for keyboard users`]}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`performance-considerations`,children:`Performance Considerations`}),`
`,(0,C.jsx)(t.h3,{id:`rendering-strategy`,children:`Rendering Strategy`}),`
`,(0,C.jsx)(t.p,{children:`The component uses VisX primitives for optimal SVG rendering:`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Scales`}),`: VisX's `,(0,C.jsx)(t.code,{children:`scaleBand`}),` and `,(0,C.jsx)(t.code,{children:`scaleLinear`}),` for efficient coordinate mapping`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Grouped rendering`}),`: Bars are rendered in SVG `,(0,C.jsx)(t.code,{children:`<Group>`}),` elements for logical organization`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Responsive sizing`}),`: `,(0,C.jsx)(t.code,{children:`useParentSize`}),` hook provides efficient resize detection with debouncing (15ms)`]}),`
`]}),`
`,(0,C.jsx)(t.h3,{id:`scrolling-strategy`,children:`Scrolling Strategy`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Vertical charts`}),`: Horizontal scrolling when many data points exceed container width`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Horizontal charts`}),`: Vertical scrolling when many categories exceed container height`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Sticky axes`}),`: Positioned absolutely to remain visible during scroll`]}),`
`]}),`
`,(0,C.jsx)(t.h3,{id:`recommendations`,children:`Recommendations`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[`For charts with `,(0,C.jsx)(t.strong,{children:`many data points`}),` (>20), consider enabling horizontal scroll (default behavior)`]}),`
`,(0,C.jsxs)(t.li,{children:[`For `,(0,C.jsx)(t.strong,{children:`horizontal bar charts`}),`, vertical scrolling is more mobile-friendly than horizontal`]}),`
`,(0,C.jsxs)(t.li,{children:[`Use `,(0,C.jsx)(t.strong,{children:`custom domains`}),` to maintain consistent scales across multiple charts`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Tooltips`}),` use absolute positioning and scroll-aware calculations for accurate placement`]}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`development-status`,children:`Development Status`}),`
`,(0,C.jsx)(t.p,{children:`The BarChart component is in active development. Current focus areas:`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsx)(t.li,{children:`✅ Single and multi-series support`}),`
`,(0,C.jsx)(t.li,{children:`✅ Vertical and horizontal orientations`}),`
`,(0,C.jsx)(t.li,{children:`✅ Responsive behavior with sticky axes`}),`
`,(0,C.jsx)(t.li,{children:`✅ Interactive tooltips`}),`
`,(0,C.jsx)(t.li,{children:`✅ Custom domains`}),`
`,(0,C.jsx)(t.li,{children:`✅ Design system alignment`}),`
`,(0,C.jsx)(t.li,{children:`🚧 RTL compatibility (axis rendering and spacing refinement)`}),`
`,(0,C.jsx)(t.li,{children:`🚧 Tick mark positioning improvements`}),`
`,(0,C.jsx)(t.li,{children:`🚧 Additional customization options (tick formatting, axis configuration)`}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,C.jsx)(t.h3,{id:`bars-not-showing`,children:`Bars Not Showing`}),`
`,(0,C.jsx)(t.p,{children:`If bars are not visible:`}),`
`,(0,C.jsxs)(t.ol,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Check data`}),`: Ensure `,(0,C.jsx)(t.code,{children:`series`}),` array has data and `,(0,C.jsx)(t.code,{children:`xAccessor`}),`/`,(0,C.jsx)(t.code,{children:`yAccessor`}),` return valid values`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Check domains`}),`: Verify `,(0,C.jsx)(t.code,{children:`yDomain`}),` (if set) includes your data values`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Check dimensions`}),`: Ensure container has non-zero width and height`]}),`
`]}),`
`,(0,C.jsx)(t.h3,{id:`tooltip-positioning-issues`,children:`Tooltip Positioning Issues`}),`
`,(0,C.jsx)(t.p,{children:`If tooltips appear in the wrong location:`}),`
`,(0,C.jsxs)(t.ol,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Check scroll position`}),`: The component accounts for horizontal scroll automatically`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Check container`}),`: Ensure the chart container is not transformed or positioned in a complex layout`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Verify event targets`}),`: Tooltips use mouse event coordinates and bar group positions`]}),`
`]}),`
`,(0,C.jsx)(t.h3,{id:`performance-issues`,children:`Performance Issues`}),`
`,(0,C.jsx)(t.p,{children:`For better performance:`}),`
`,(0,C.jsxs)(t.ol,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Limit data points`}),`: Consider pagination or filtering for very large datasets (>100 points)`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Debounce resize`}),`: The default 15ms debounce on `,(0,C.jsx)(t.code,{children:`useParentSize`}),` balances smoothness and performance`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Simplify tooltips`}),`: If tooltips are complex, consider using simpler content or disabling them`]}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,C.jsx)(a,{of:g})]})}function S(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;e((()=>{C=t(),c(),s(),l(),y()}))();export{S as default};