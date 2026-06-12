import{i as e}from"./preload-helper-usAeo7Bx.js";import{y as t}from"./iframe-rtgAyc8r.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-CqGsdteC.js";import{t as c}from"./mdx-react-shim-8rhBnJo7.js";import{LegendSizeChart as l,MultipleSeries as u,Props as d,SingleSeries as f,Vertical as p,WithLabel as m,n as h,t as g}from"./legend.stories-VmhMUvdD.js";var _,v=e((()=>{_=`import { Legend, type LegendProps } from '../src/index.tsx';

export function SingleSeriesLegendExample(props: Partial<LegendProps>) {
  const series = [{ id: 'sales', name: 'Sales' }];

  return <Legend series={series} className={props.className} />;
}
`})),y,b=e((()=>{y=`import { Legend, type LegendProps } from '../src/index.tsx';

export function MultiSeriesLegendExample(props: Partial<LegendProps>) {
  const series = [
    { id: 'product-a', name: 'Product A' },
    { id: 'product-b', name: 'Product B' },
    { id: 'product-c', name: 'Product C' }
  ];

  return <Legend series={series} className={props.className} />;
}
`})),x,S=e((()=>{x=`import { Legend, type LegendProps } from '../src/index.tsx';

export function LegendWithLabelExample(props: Partial<LegendProps>) {
  const series = [
    { id: 'product-a', name: 'Product A' },
    { id: 'product-b', name: 'Product B' }
  ];

  return <Legend series={series} label="Sales by product" {...props} />;
}
`})),C,w=e((()=>{C=`import { Legend, type LegendProps } from '../src/index.tsx';

export function LegendVerticalExample(props: Partial<LegendProps>) {
  const series = [
    { id: 'series-1', name: 'Series 1' },
    { id: 'series-2', name: 'Series 2' },
    { id: 'series-3', name: 'Series 3' }
  ];

  return <Legend series={series} label="City temperatures" orientation="vertical" {...props} />;
}
`})),T,E=e((()=>{T=`import { Flex } from '#components/layout/flex';
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
`}));function D(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...n(),...e.components};return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(o,{of:h,name:`Overview`}),`
`,(0,k.jsx)(t.h1,{id:`legend`,children:`Legend`}),`
`,(0,k.jsx)(t.p,{children:`The Legend component is an internal component used for displaying series information in chart components.`}),`
`,(0,k.jsx)(t.h2,{id:`internal-component`,children:`Internal Component`}),`
`,(0,k.jsxs)(t.p,{children:[`This component is `,(0,k.jsx)(t.strong,{children:`internal-only`}),` and not exported from the package. It is designed for use within chart components.`]}),`
`,(0,k.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,k.jsxs)(t.p,{children:[`The `,(0,k.jsx)(t.code,{children:`Legend`}),` component accepts the following props:`]}),`
`,(0,k.jsx)(a,{of:d}),`
`,(0,k.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,k.jsx)(t.h3,{id:`single-series`,children:`Single Series`}),`
`,(0,k.jsx)(t.p,{children:`Basic legend with a single series showing the default styling and layout.`}),`
`,(0,k.jsx)(r,{language:`tsx`,code:_}),`
`,(0,k.jsx)(i,{of:f,inline:!0}),`
`,(0,k.jsx)(t.h3,{id:`multiple-series`,children:`Multiple Series`}),`
`,(0,k.jsx)(t.p,{children:`Legend with multiple series showing theme colors and automatic spacing. Each series has its own colored indicator and name.`}),`
`,(0,k.jsx)(r,{language:`tsx`,code:y}),`
`,(0,k.jsx)(i,{of:u,inline:!0}),`
`,(0,k.jsx)(t.h3,{id:`with-label`,children:`With label`}),`
`,(0,k.jsx)(t.p,{children:`Legend with a visible label that is also used as the accessible label.`}),`
`,(0,k.jsx)(r,{language:`tsx`,code:x}),`
`,(0,k.jsx)(i,{of:m,inline:!0}),`
`,(0,k.jsx)(t.h3,{id:`vertical-orientation`,children:`Vertical orientation`}),`
`,(0,k.jsx)(t.p,{children:`Legend items stacked vertically while keeping swatch and label side-by-side, useful when horizontal space is constrained.`}),`
`,(0,k.jsx)(r,{language:`tsx`,code:C}),`
`,(0,k.jsx)(i,{of:p,inline:!0}),`
`,(0,k.jsx)(t.h3,{id:`legend-size-chart-example`,children:`Legend size chart example`}),`
`,(0,k.jsxs)(t.p,{children:[`Legend with all supported sizes (`,(0,k.jsx)(t.code,{children:`sm`}),`, `,(0,k.jsx)(t.code,{children:`md`}),`, `,(0,k.jsx)(t.code,{children:`lg`}),`, `,(0,k.jsx)(t.code,{children:`xl`}),`).`]}),`
`,(0,k.jsx)(r,{language:`tsx`,code:T}),`
`,(0,k.jsx)(i,{of:l,inline:!0})]})}function O(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,k.jsx)(t,{...e,children:(0,k.jsx)(D,{...e})}):D(e)}var k;e((()=>{k=t(),c(),s(),g(),v(),b(),S(),w(),E()}))();export{O as default};