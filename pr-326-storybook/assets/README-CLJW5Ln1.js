import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-i-sywOoz.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-9nqB_1nh.js";import{t as c}from"./mdx-react-shim-C1HkEgPv.js";import{t as l}from"./runtime-CCpseHws.js";import{ChartColorProviderProps as u,MultiSeries as d,SingleSeries as f,n as p,t as m}from"./use-chart-color.stories-DEmy1AMY.js";function h(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,...n(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(o,{of:p,name:`Overview`}),`
`,(0,_.jsx)(t.h1,{id:`usechartcolor`,children:`useChartColor`}),`
`,(0,_.jsx)(t.p,{children:`A hook for assigning deterministic, index-based colors to chart series using design token CSS variables. Safe under React concurrent rendering.`}),`
`,(0,_.jsx)(t.h2,{id:`for-use-with-chart-components-not-exported`,children:`For use with chart components (not exported)`}),`
`,(0,_.jsxs)(t.p,{children:[`Wrap your chart (or list) with `,(0,_.jsx)(t.code,{children:`ChartColorProvider`}),`; each component that calls `,(0,_.jsx)(t.code,{children:`useChartColor()`}),` receives a CSS variable reference. Indices are assigned in an effect at mount, so allocation is safe under React concurrent rendering and StrictMode. Same component instance keeps the same color; colors cycle after the ninth consumer. No need to pass an index—order in the tree determines assignment.`]}),`
`,(0,_.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,_.jsx)(t.h3,{id:`single-series`,children:`Single Series`}),`
`,(0,_.jsx)(t.p,{children:`One series using the first chart color.`}),`
`,(0,_.jsx)(i,{of:f,inline:!0}),`
`,(0,_.jsx)(r,{code:`import { ChartColorProvider, useChartColor } from '../src/index.tsx';

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
`,(0,_.jsx)(t.h3,{id:`multi-series`,children:`Multi Series`}),`
`,(0,_.jsx)(t.p,{children:`Multiple series each receiving the next color in sequence.`}),`
`,(0,_.jsx)(i,{of:d,inline:!0}),`
`,(0,_.jsx)(r,{code:`import { ChartColorProvider, useChartColor } from '../src/index.tsx';

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
`,(0,_.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,_.jsx)(a,{of:u})]})}function g(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;e((()=>{_=t(),c(),s(),l(),m()}))();export{g as default};