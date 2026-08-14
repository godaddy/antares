import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-DHUUK51X.js";import{a as l,c as u,i as d,n as f,o as p,r as m,s as h,t as g}from"./legend.stories-Be_2-OdD.js";function _(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...r(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(s,{of:u,name:`Overview`}),`
`,(0,y.jsx)(t.h1,{id:`legend`,children:`Legend`}),`
`,(0,y.jsx)(t.p,{children:`The Legend component is an internal component used for displaying series information in chart components.`}),`
`,(0,y.jsx)(t.h2,{id:`internal-component`,children:`Internal Component`}),`
`,(0,y.jsxs)(t.p,{children:[`This component is `,(0,y.jsx)(t.strong,{children:`internal-only`}),` and not exported from the package. It is designed for use within chart components.`]}),`
`,(0,y.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,y.jsx)(t.h3,{id:`single-series-legend`,children:`Single Series Legend`}),`
`,(0,y.jsx)(t.p,{children:`Basic legend with a single series showing the default styling and layout.`}),`
`,(0,y.jsx)(a,{of:p,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { Legend, type LegendProps } from '../src/index.tsx';

export function SingleSeriesLegendExample(props: Partial<LegendProps>) {
  const series = [{ id: 'sales', name: 'Sales' }];

  return <Legend series={series} className={props.className} />;
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`multi-series-legend`,children:`Multi Series Legend`}),`
`,(0,y.jsx)(t.p,{children:`Legend with multiple series showing theme colors and automatic spacing. Each series has its own colored indicator and name.`}),`
`,(0,y.jsx)(a,{of:d,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { Legend, type LegendProps } from '../src/index.tsx';

export function MultiSeriesLegendExample(props: Partial<LegendProps>) {
  const series = [
    { id: 'product-a', name: 'Product A' },
    { id: 'product-b', name: 'Product B' },
    { id: 'product-c', name: 'Product C' }
  ];

  return <Legend series={series} className={props.className} />;
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`with-label`,children:`With label`}),`
`,(0,y.jsx)(t.p,{children:`Legend with a visible label that is also used as the accessible label.`}),`
`,(0,y.jsx)(a,{of:m,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { Legend, type LegendProps } from '../src/index.tsx';

export function LegendWithLabelExample(props: Partial<LegendProps>) {
  const series = [
    { id: 'product-a', name: 'Product A' },
    { id: 'product-b', name: 'Product B' }
  ];

  return <Legend series={series} label="Sales by product" {...props} />;
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`vertical-orientation`,children:`Vertical orientation`}),`
`,(0,y.jsx)(t.p,{children:`Legend items stacked vertically while keeping swatch and label side-by-side, useful when horizontal space is constrained.`}),`
`,(0,y.jsx)(a,{of:f,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { Legend, type LegendProps } from '../src/index.tsx';

export function LegendVerticalExample(props: Partial<LegendProps>) {
  const series = [
    { id: 'series-1', name: 'Series 1' },
    { id: 'series-2', name: 'Series 2' },
    { id: 'series-3', name: 'Series 3' }
  ];

  return <Legend series={series} label="City temperatures" orientation="vertical" {...props} />;
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`legend-size-chart-example`,children:`Legend size chart example`}),`
`,(0,y.jsxs)(t.p,{children:[`Legend with all supported sizes (`,(0,y.jsx)(t.code,{children:`sm`}),`, `,(0,y.jsx)(t.code,{children:`md`}),`, `,(0,y.jsx)(t.code,{children:`lg`}),`, `,(0,y.jsx)(t.code,{children:`xl`}),`).`]}),`
`,(0,y.jsx)(a,{of:g,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { Flex } from '#components/layout/flex';
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
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,y.jsxs)(t.p,{children:[`The `,(0,y.jsx)(t.code,{children:`Legend`}),` component accepts the following props:`]}),`
`,(0,y.jsx)(o,{of:l})]})}function v(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,y.jsx)(t,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;function b(){return(b=e((()=>{y=t(),n(),c(),h()})))()}b();export{v as default};