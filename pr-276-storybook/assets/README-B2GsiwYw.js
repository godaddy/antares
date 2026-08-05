import{i as e}from"./preload-helper-DvdRENtr.js";import{y as t}from"./iframe-DHuyyoYw.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-BKQAJqeQ.js";import{t as c}from"./mdx-react-shim-B5uuj4yc.js";import{ChartColorProviderProps as l,MultiSeries as u,SingleSeries as d,n as f,t as p}from"./use-chart-color.stories-CVUYYKjG.js";function m(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,...n(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o,{of:f,name:`Overview`}),`
`,(0,g.jsx)(t.h1,{id:`usechartcolor`,children:`useChartColor`}),`
`,(0,g.jsx)(t.p,{children:`A hook for assigning deterministic, index-based colors to chart series using design token CSS variables. Safe under React concurrent rendering.`}),`
`,(0,g.jsx)(t.h2,{id:`for-use-with-chart-components-not-exported`,children:`For use with chart components (not exported)`}),`
`,(0,g.jsxs)(t.p,{children:[`Wrap your chart (or list) with `,(0,g.jsx)(t.code,{children:`ChartColorProvider`}),`; each component that calls `,(0,g.jsx)(t.code,{children:`useChartColor()`}),` receives a CSS variable reference. Indices are assigned in an effect at mount, so allocation is safe under React concurrent rendering and StrictMode. Same component instance keeps the same color; colors cycle after the ninth consumer. No need to pass an index—order in the tree determines assignment.`]}),`
`,(0,g.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,g.jsx)(t.h3,{id:`single-series`,children:`Single Series`}),`
`,(0,g.jsx)(t.p,{children:`One series using the first chart color.`}),`
`,(0,g.jsx)(i,{of:d,inline:!0}),`
`,(0,g.jsx)(r,{code:`import { ChartColorProvider, useChartColor } from '../src/index.tsx';

function SeriesBar() {
  const color = useChartColor();
  return (
    <li data-color={color} style={{ backgroundColor: color }}>
      <code>{color}</code>
    </li>
  );
}

export function SingleSeriesExample() {
  const series = [{ value: 100 }];

  return (
    <ChartColorProvider>
      <ul>
        {series.map((_, i) => (
          <SeriesBar key={i} />
        ))}
      </ul>
    </ChartColorProvider>
  );
}`,language:`tsx`}),`
`,(0,g.jsx)(t.h3,{id:`multi-series`,children:`Multi Series`}),`
`,(0,g.jsx)(t.p,{children:`Multiple series each receiving the next color in sequence.`}),`
`,(0,g.jsx)(i,{of:u,inline:!0}),`
`,(0,g.jsx)(r,{code:`import { ChartColorProvider, useChartColor } from '../src/index.tsx';

function SeriesBar() {
  const color = useChartColor();
  return (
    <li data-color={color} style={{ backgroundColor: color }}>
      <code>{color}</code>
    </li>
  );
}

export function MultiSeriesExample() {
  const series = [{ value: 80 }, { value: 120 }, { value: 60 }];

  return (
    <ChartColorProvider>
      <ul>
        {series.map((_, i) => (
          <SeriesBar key={i} />
        ))}
      </ul>
    </ChartColorProvider>
  );
}`,language:`tsx`}),`
`,(0,g.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,g.jsx)(a,{of:l})]})}function h(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;e((()=>{g=t(),c(),s(),p()}))();export{h as default};