import{j as e}from"./iframe-ikStBiWE.js";import{useMDXComponents as i}from"./index-B1azrVMk.js";import{M as c,A as a,S as o,a as s}from"./blocks-D4l97m0v.js";import{S as l,C as d,a as h,M as u}from"./use-chart-color.stories-DrP8aZh8.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DfAhu-k8.js";import"./index-OxG4j95y.js";import"./index-CSaoBq0f.js";import"./index-DrFu-skq.js";import"./index-9DAFPEX6.js";const p=`import { ChartColorProvider, useChartColor } from '../src/index.tsx';

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
`,m=`import { ChartColorProvider, useChartColor } from '../src/index.tsx';

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
`;function t(n){const r={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:l,name:"Overview"}),`
`,e.jsx(r.h1,{id:"usechartcolor",children:"useChartColor"}),`
`,e.jsx(r.p,{children:"A hook for assigning deterministic, index-based colors to chart series using design token CSS variables. Safe under React concurrent rendering."}),`
`,e.jsx(r.h2,{id:"for-use-with-chart-components-not-exported",children:"For use with chart components (not exported)"}),`
`,e.jsxs(r.p,{children:["Wrap your chart (or list) with ",e.jsx(r.code,{children:"ChartColorProvider"}),"; each component that calls ",e.jsx(r.code,{children:"useChartColor()"})," receives a CSS variable reference. Indices are assigned in an effect at mount, so allocation is safe under React concurrent rendering and StrictMode. Same component instance keeps the same color; colors cycle after the ninth consumer. No need to pass an index—order in the tree determines assignment."]}),`
`,e.jsx(r.h2,{id:"props",children:"Props"}),`
`,e.jsx(a,{of:d}),`
`,e.jsx(r.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(r.h3,{id:"single-series",children:"Single series"}),`
`,e.jsx(r.p,{children:"One series using the first chart color."}),`
`,e.jsx(o,{language:"tsx",code:p}),`
`,e.jsx(s,{of:h,inline:!0}),`
`,e.jsx(r.h3,{id:"multiple-series",children:"Multiple series"}),`
`,e.jsx(r.p,{children:"Multiple series each receiving the next color in sequence."}),`
`,e.jsx(o,{language:"tsx",code:m}),`
`,e.jsx(s,{of:u,inline:!0})]})}function k(n={}){const{wrapper:r}={...i(),...n.components};return r?e.jsx(r,{...n,children:e.jsx(t,{...n})}):t(n)}export{k as default};
