import{i as e}from"./preload-helper-Bb7i_SVf.js";import{F as t}from"./iframe-C1V7BaUY.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-D6vhj1Er.js";import{t as c}from"./mdx-react-shim-BU5A2SjK.js";import{Default as l,FormatValue as u,LegendLayout as d,Props as f,SingleSlice as p,SmallSlices as m,n as h,t as g}from"./donut-chart.stories-EPtLted-.js";function _(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(o,{of:g,name:`Overview`}),`
`,(0,y.jsx)(t.h1,{id:`donutchart`,children:`DonutChart`}),`
`,(0,y.jsx)(t.p,{children:`Donut charts are for parts-to-whole comparison—how partial elements add up to a total—shown as a ring so a few categories are easy to compare at a glance.`}),`
`,(0,y.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,y.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,y.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,y.jsxs)(t.p,{children:[`You give the chart a `,(0,y.jsx)(t.code,{children:`data`}),` array (`,(0,y.jsx)(t.code,{children:`id`}),`, `,(0,y.jsx)(t.code,{children:`name`}),`, `,(0,y.jsx)(t.code,{children:`value`}),`) and a `,(0,y.jsx)(t.code,{children:`label`}),` in the middle - this is the everyday setup when you want several categories on one ring and a headline number or title in the hole.`]}),`
`,(0,y.jsx)(i,{of:l,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { DonutChart, type DonutChartProps } from '@godaddy/antares';

const data = [
  { id: '1', name: 'Category A', value: 35 },
  { id: '2', name: 'Category B', value: 25 },
  { id: '3', name: 'Category C', value: 18 },
  { id: '4', name: 'Category D', value: 12 },
  { id: '5', name: 'Category E', value: 10 }
];

export function DefaultExample(props: Partial<DonutChartProps>) {
  return <DonutChart data={data} label="100%" aria-label="Donut chart with five categories" {...props} />;
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`single-slice`,children:`Single slice`}),`
`,(0,y.jsxs)(t.p,{children:[`When there is only one slice, the ring is full. Add `,(0,y.jsx)(t.code,{children:`subLabel`}),` if you want a smaller second line under the main center text.`]}),`
`,(0,y.jsx)(i,{of:p,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { DonutChart } from '@godaddy/antares';

export function SingleSliceExample() {
  return (
    <DonutChart
      data={[{ id: 'only', name: 'Total', value: 100 }]}
      label="$1,000"
      subLabel="Sub label"
      aria-label="Donut chart with a single full ring"
    />
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`legend-placement`,children:`Legend placement`}),`
`,(0,y.jsxs)(t.p,{children:[`Switch `,(0,y.jsx)(t.code,{children:`legend`}),` to `,(0,y.jsx)(t.code,{children:`right`}),` to sit the legend beside the donut, or `,(0,y.jsx)(t.code,{children:`bottom`}),` to stack it underneath. `,(0,y.jsx)(t.code,{children:`legendLabel`}),` is there when you want a title above the legend items.`]}),`
`,(0,y.jsx)(i,{of:d,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { DonutChart, Flex } from '@godaddy/antares';

const data = [
  { id: '1', name: 'Product A', value: 40 },
  { id: '2', name: 'Product B', value: 30 },
  { id: '3', name: 'Product C', value: 20 },
  { id: '4', name: 'Product D', value: 10 }
];

export function LegendLayoutExample() {
  return (
    <Flex direction="column" gap="xl">
      <DonutChart
        data={data}
        label="100%"
        legend="right"
        legendLabel="Legend title"
        aria-label="Donut with legend to the right"
      />
      <DonutChart
        data={data}
        label="100%"
        legend="bottom"
        legendLabel="Legend title"
        aria-label="Donut with legend below"
      />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`small-slices`,children:`Small slices`}),`
`,(0,y.jsxs)(t.p,{children:[`Very thin slices can be noisy to hover. Anything at or below `,(0,y.jsx)(t.code,{children:`smallSliceThreshold`}),` (default `,(0,y.jsx)(t.code,{children:`0.05`}),` of the total) is treated as “small,” and if those slices sit next to each other on the ring, one hover opens a single tooltip that lists the whole group.`]}),`
`,(0,y.jsx)(i,{of:m,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { DonutChart } from '@godaddy/antares';

/** Two large slices with two separate clusters of small slices — hover a small slice to see only that adjacent group (A–C or E–G) in the tooltip. */
const data = [
  { id: 'main', name: 'Primary', value: 88 },
  { id: 'a', name: 'Slice A', value: 3 },
  { id: 'b', name: 'Slice B', value: 3 },
  { id: 'c', name: 'Slice C', value: 3 },
  { id: 'd', name: 'Slice D', value: 90 },
  { id: 'e', name: 'Slice E', value: 5 },
  { id: 'f', name: 'Slice F', value: 4 },
  { id: 'g', name: 'Slice G', value: 3 }
];

export function SmallSlicesExample() {
  return <DonutChart data={data} label="88%" aria-label="Donut with small slices for combined tooltip" />;
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`format-value`,children:`Format value`}),`
`,(0,y.jsxs)(t.p,{children:[`Use `,(0,y.jsx)(t.code,{children:`formatValue`}),` when the raw numbers in the tooltip should read like money, counts with separators, or whatever your product expects. The percentage of the total still formats on its own; your function only shapes the value column.`]}),`
`,(0,y.jsx)(i,{of:u,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { DonutChart, type DonutChartProps } from '@godaddy/antares';

const data = [
  { id: '1', name: 'Sales', value: 42 },
  { id: '2', name: 'Services', value: 35 },
  { id: '3', name: 'Support', value: 23 }
];

export function FormatValueExample(props: Partial<DonutChartProps>) {
  return (
    <DonutChart
      data={data}
      label="$100.00"
      formatValue={function format(v: number) {
        return \`\${v}.00\`;
      }}
      aria-label="Donut with formatted tooltip values for multiple revenue categories"
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,y.jsx)(a,{of:f})]})}function v(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,y.jsx)(t,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;e((()=>{y=t(),c(),s(),h()}))();export{v as default};