import{j as e}from"./iframe-C3pkDmNe.js";import{useMDXComponents as t}from"./index-UVQaQDuN.js";import{M as a,A as p,S as r,a as i}from"./blocks-Do0aVo1q.js";import{S as c,P as d,a as l,M as m}from"./legend.stories-BwfQrjlZ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Z-QtMzxy.js";import"./index-BgVCNucj.js";import"./index-q9xSD4ii.js";import"./index-DrFu-skq.js";import"./index-BgHqLVPK.js";import"./index-cnmPSn3B.js";import"./clsx-BaMnB6PZ.js";import"./index-C5jzoT96.js";import"./mergeProps-DpFbkZvz.js";import"./useObjectRef-W83eXW47.js";const h=`import { Legend, type LegendProps } from '../src/index.tsx';

export function SingleSeriesLegendExample(props: Partial<LegendProps>) {
  const series = [{ id: 'sales', name: 'Sales' }];

  return <Legend series={series} className={props.className} />;
}
`,g=`import { Legend, type LegendProps } from '../src/index.tsx';

export function MultiSeriesLegendExample(props: Partial<LegendProps>) {
  const series = [
    { id: 'product-a', name: 'Product A' },
    { id: 'product-b', name: 'Product B' },
    { id: 'product-c', name: 'Product C' }
  ];

  return <Legend series={series} className={props.className} />;
}
`;function o(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",strong:"strong",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:c,name:"Overview"}),`
`,e.jsx(n.h1,{id:"legend",children:"Legend"}),`
`,e.jsx(n.p,{children:"The Legend component is an internal component used for displaying series information in chart components."}),`
`,e.jsx(n.h2,{id:"internal-component",children:"Internal Component"}),`
`,e.jsxs(n.p,{children:["This component is ",e.jsx(n.strong,{children:"internal-only"})," and not exported from the package. It is designed for use within chart components."]}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Legend"})," component accepts the following props:"]}),`
`,e.jsx(p,{of:d}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"single-series",children:"Single Series"}),`
`,e.jsx(n.p,{children:"Basic legend with a single series showing the default styling and layout."}),`
`,e.jsx(r,{language:"tsx",code:h}),`
`,e.jsx(i,{of:l,inline:!0}),`
`,e.jsx(n.h3,{id:"multiple-series",children:"Multiple Series"}),`
`,e.jsx(n.p,{children:"Legend with multiple series showing theme colors and automatic spacing. Each series has its own colored indicator and name."}),`
`,e.jsx(r,{language:"tsx",code:g}),`
`,e.jsx(i,{of:m,inline:!0})]})}function D(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(o,{...s})}):o(s)}export{D as default};
