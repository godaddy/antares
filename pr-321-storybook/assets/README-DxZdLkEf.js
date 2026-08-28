import{i as e}from"./preload-helper-8uBM_nS-.js";import{F as t}from"./iframe-CWWHXZ_l.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DVw-3XGt.js";import{t as c}from"./mdx-react-shim-D1iE9BMs.js";import{t as l}from"./runtime-BabKcnmz.js";import{LegendSizeChart as u,LegendVertical as d,LegendWithLabel as f,MultiSeriesLegend as p,Props as m,SingleSeriesLegend as h,n as g,t as _}from"./legend.stories-CH65EqZn.js";function v(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...n(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(o,{of:g,name:`Overview`}),`
`,(0,b.jsx)(t.h1,{id:`legend`,children:`Legend`}),`
`,(0,b.jsx)(t.p,{children:`The Legend component is an internal component used for displaying series information in chart components.`}),`
`,(0,b.jsx)(t.h2,{id:`internal-component`,children:`Internal Component`}),`
`,(0,b.jsxs)(t.p,{children:[`This component is `,(0,b.jsx)(t.strong,{children:`internal-only`}),` and not exported from the package. It is designed for use within chart components.`]}),`
`,(0,b.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,b.jsx)(t.h3,{id:`single-series-legend`,children:`Single Series Legend`}),`
`,(0,b.jsx)(t.p,{children:`Basic legend with a single series showing the default styling and layout.`}),`
`,(0,b.jsx)(i,{of:h,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Legend, type LegendProps } from '../src/index.tsx';

export function SingleSeriesLegendExample(props: Partial<LegendProps>) {
  const series = [{ id: 'sales', name: 'Sales' }];

  return <Legend series={series} className={props.className} />;
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`multi-series-legend`,children:`Multi Series Legend`}),`
`,(0,b.jsx)(t.p,{children:`Legend with multiple series showing theme colors and automatic spacing. Each series has its own colored indicator and name.`}),`
`,(0,b.jsx)(i,{of:p,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Legend, type LegendProps } from '../src/index.tsx';

export function MultiSeriesLegendExample(props: Partial<LegendProps>) {
  const series = [
    { id: 'product-a', name: 'Product A' },
    { id: 'product-b', name: 'Product B' },
    { id: 'product-c', name: 'Product C' }
  ];

  return <Legend series={series} className={props.className} />;
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`with-label`,children:`With label`}),`
`,(0,b.jsx)(t.p,{children:`Legend with a visible label that is also used as the accessible label.`}),`
`,(0,b.jsx)(i,{of:f,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Legend, type LegendProps } from '../src/index.tsx';

export function LegendWithLabelExample(props: Partial<LegendProps>) {
  const series = [
    { id: 'product-a', name: 'Product A' },
    { id: 'product-b', name: 'Product B' }
  ];

  return <Legend series={series} label="Sales by product" {...props} />;
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`vertical-orientation`,children:`Vertical orientation`}),`
`,(0,b.jsx)(t.p,{children:`Legend items stacked vertically while keeping swatch and label side-by-side, useful when horizontal space is constrained.`}),`
`,(0,b.jsx)(i,{of:d,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Legend, type LegendProps } from '../src/index.tsx';

export function LegendVerticalExample(props: Partial<LegendProps>) {
  const series = [
    { id: 'series-1', name: 'Series 1' },
    { id: 'series-2', name: 'Series 2' },
    { id: 'series-3', name: 'Series 3' }
  ];

  return <Legend series={series} label="City temperatures" orientation="vertical" {...props} />;
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`legend-size-chart-example`,children:`Legend size chart example`}),`
`,(0,b.jsxs)(t.p,{children:[`Legend with all supported sizes (`,(0,b.jsx)(t.code,{children:`sm`}),`, `,(0,b.jsx)(t.code,{children:`md`}),`, `,(0,b.jsx)(t.code,{children:`lg`}),`, `,(0,b.jsx)(t.code,{children:`xl`}),`).`]}),`
`,(0,b.jsx)(i,{of:u,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Flex } from '#components/layout/flex';
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
`,(0,b.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`Legend`}),` component accepts the following props:`]}),`
`,(0,b.jsx)(a,{of:m})]})}function y(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;e((()=>{b=t(),c(),s(),l(),_()}))();export{y as default};