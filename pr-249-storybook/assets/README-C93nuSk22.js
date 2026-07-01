import{i as e}from"./preload-helper-B_l3Wrpe.js";import{y as t}from"./iframe-BsuE-4nr.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-C1ugDmoq.js";import{t as c}from"./mdx-react-shim-BStiaElO.js";import{ChartColorProviderProps as l,MultiSeries as u,SingleSeries as d,n as f,t as p}from"./use-chart-color.stories-CqWXLRjs.js";var m,h=e((()=>{m=`import { ChartColorProvider, useChartColor } from '../src/index.tsx';

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
}
`})),g,_=e((()=>{g=`import { ChartColorProvider, useChartColor } from '../src/index.tsx';

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
}
`}));function v(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,...n(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(o,{of:f,name:`Overview`}),`
`,(0,b.jsx)(t.h1,{id:`usechartcolor`,children:`useChartColor`}),`
`,(0,b.jsx)(t.p,{children:`A hook for assigning deterministic, index-based colors to chart series using design token CSS variables. Safe under React concurrent rendering.`}),`
`,(0,b.jsx)(t.h2,{id:`for-use-with-chart-components-not-exported`,children:`For use with chart components (not exported)`}),`
`,(0,b.jsxs)(t.p,{children:[`Wrap your chart (or list) with `,(0,b.jsx)(t.code,{children:`ChartColorProvider`}),`; each component that calls `,(0,b.jsx)(t.code,{children:`useChartColor()`}),` receives a CSS variable reference. Indices are assigned in an effect at mount, so allocation is safe under React concurrent rendering and StrictMode. Same component instance keeps the same color; colors cycle after the ninth consumer. No need to pass an index—order in the tree determines assignment.`]}),`
`,(0,b.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,b.jsx)(a,{of:l}),`
`,(0,b.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,b.jsx)(t.h3,{id:`single-series`,children:`Single series`}),`
`,(0,b.jsx)(t.p,{children:`One series using the first chart color.`}),`
`,(0,b.jsx)(r,{language:`tsx`,code:m}),`
`,(0,b.jsx)(i,{of:d,inline:!0}),`
`,(0,b.jsx)(t.h3,{id:`multiple-series`,children:`Multiple series`}),`
`,(0,b.jsx)(t.p,{children:`Multiple series each receiving the next color in sequence.`}),`
`,(0,b.jsx)(r,{language:`tsx`,code:g}),`
`,(0,b.jsx)(i,{of:u,inline:!0})]})}function y(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;e((()=>{b=t(),c(),s(),p(),h(),_()}))();export{y as default};