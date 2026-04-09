import{j as e}from"./iframe-mIkG-ia4.js";import{useMDXComponents as o}from"./index-CYbcAVO_.js";import{M as a,A as d,S as r,a as i}from"./blocks-H-xBVXSD.js";import{S as l,P as c,a as p,M as m,W as g,V as x,L as h}from"./legend.stories-CuZnxqm8.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C8Gy-4ls.js";import"./index-BA5fCnJS.js";import"./index-qmzokPCi.js";import"./index-DrFu-skq.js";import"./index-BqZmZfnL.js";import"./index-BFUvbBmq.js";import"./clsx-CXVhVjWX.js";import"./index-CWmIgOtN.js";import"./mergeProps-VPp-_EQW.js";import"./useObjectRef-CF8ZtGSI.js";const u=`import { Legend, type LegendProps } from '../src/index.tsx';

export function SingleSeriesLegendExample(props: Partial<LegendProps>) {
  const series = [{ id: 'sales', name: 'Sales' }];

  return <Legend series={series} className={props.className} />;
}
`,L=`import { Legend, type LegendProps } from '../src/index.tsx';

export function MultiSeriesLegendExample(props: Partial<LegendProps>) {
  const series = [
    { id: 'product-a', name: 'Product A' },
    { id: 'product-b', name: 'Product B' },
    { id: 'product-c', name: 'Product C' }
  ];

  return <Legend series={series} className={props.className} />;
}
`,j=`import { Legend, type LegendProps } from '../src/index.tsx';

export function LegendWithLabelExample(props: Partial<LegendProps>) {
  const series = [
    { id: 'product-a', name: 'Product A' },
    { id: 'product-b', name: 'Product B' }
  ];

  return <Legend series={series} label="Sales by product" {...props} />;
}
`,f=`import { Legend, type LegendProps } from '../src/index.tsx';

export function LegendVerticalExample(props: Partial<LegendProps>) {
  const series = [
    { id: 'series-1', name: 'Series 1' },
    { id: 'series-2', name: 'Series 2' },
    { id: 'series-3', name: 'Series 3' }
  ];

  return <Legend series={series} label="City temperatures" orientation="vertical" {...props} />;
}
`,S=`import { Flex } from '#components/layout/flex';
import { Legend, type LegendProps } from '../src/index.tsx';

const series = [
  { id: 'product-a', name: 'Product A' },
  { id: 'product-b', name: 'Product B' },
  { id: 'product-c', name: 'Product C' }
];

export function LegendSizeChartExample(props: Partial<LegendProps>) {
  return (
    <Flex direction="column" gap="md">
      <Legend series={series} label="Small legend" size="sm" {...props} />
      <Legend series={series} label="Medium legend" size="md" {...props} />
      <Legend series={series} label="Large legend" size="lg" {...props} />
      <Legend series={series} label="Extra large legend" size="xl" {...props} />
    </Flex>
  );
}
`;function t(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",strong:"strong",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:l,name:"Overview"}),`
`,e.jsx(n.h1,{id:"legend",children:"Legend"}),`
`,e.jsx(n.p,{children:"The Legend component is an internal component used for displaying series information in chart components."}),`
`,e.jsx(n.h2,{id:"internal-component",children:"Internal Component"}),`
`,e.jsxs(n.p,{children:["This component is ",e.jsx(n.strong,{children:"internal-only"})," and not exported from the package. It is designed for use within chart components."]}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Legend"})," component accepts the following props:"]}),`
`,e.jsx(d,{of:c}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"single-series",children:"Single Series"}),`
`,e.jsx(n.p,{children:"Basic legend with a single series showing the default styling and layout."}),`
`,e.jsx(r,{language:"tsx",code:u}),`
`,e.jsx(i,{of:p,inline:!0}),`
`,e.jsx(n.h3,{id:"multiple-series",children:"Multiple Series"}),`
`,e.jsx(n.p,{children:"Legend with multiple series showing theme colors and automatic spacing. Each series has its own colored indicator and name."}),`
`,e.jsx(r,{language:"tsx",code:L}),`
`,e.jsx(i,{of:m,inline:!0}),`
`,e.jsx(n.h3,{id:"with-label",children:"With label"}),`
`,e.jsx(n.p,{children:"Legend with a visible label that is also used as the accessible label."}),`
`,e.jsx(r,{language:"tsx",code:j}),`
`,e.jsx(i,{of:g,inline:!0}),`
`,e.jsx(n.h3,{id:"vertical-orientation",children:"Vertical orientation"}),`
`,e.jsx(n.p,{children:"Legend items stacked vertically while keeping swatch and label side-by-side, useful when horizontal space is constrained."}),`
`,e.jsx(r,{language:"tsx",code:f}),`
`,e.jsx(i,{of:x,inline:!0}),`
`,e.jsx(n.h3,{id:"legend-size-chart-example",children:"Legend size chart example"}),`
`,e.jsxs(n.p,{children:["Legend with all supported sizes (",e.jsx(n.code,{children:"sm"}),", ",e.jsx(n.code,{children:"md"}),", ",e.jsx(n.code,{children:"lg"}),", ",e.jsx(n.code,{children:"xl"}),")."]}),`
`,e.jsx(r,{language:"tsx",code:S}),`
`,e.jsx(i,{of:h,inline:!0})]})}function T(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{T as default};
