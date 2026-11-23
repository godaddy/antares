import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-BhQAtWZS.js";import{a as l,c as u,i as d,l as f,n as p,o as m,r as h,s as g,t as _,u as v}from"./donut-chart.stories-DiGeUFNa.js";function y(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...r(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s,{of:f,name:`Overview`}),`
`,(0,x.jsx)(t.h1,{id:`donutchart`,children:`DonutChart`}),`
`,(0,x.jsx)(t.p,{children:`Donut charts are for parts-to-whole comparison—how partial elements add up to a total—shown as a ring so a few categories are easy to compare at a glance.`}),`
`,(0,x.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,x.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,x.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,x.jsxs)(t.p,{children:[`Give the chart a `,(0,x.jsx)(t.code,{children:`data`}),` array with a `,(0,x.jsx)(t.code,{children:`name`}),` and `,(0,x.jsx)(t.code,{children:`value`}),` for each slice and an optional `,(0,x.jsx)(t.code,{children:`id`}),`. Use `,(0,x.jsx)(t.code,{children:`DonutChartCenter`}),` to place a headline number or title in the ring.`]}),`
`,(0,x.jsx)(a,{of:p,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { DonutChart, DonutChartCenter, Text } from '@godaddy/antares';

const data = [
  { id: '1', name: 'Category A', value: 35 },
  { id: '2', name: 'Category B', value: 25 },
  { id: '3', name: 'Category C', value: 18 },
  { id: '4', name: 'Category D', value: 12 },
  { id: '5', name: 'Category E', value: 10 }
];

export function DefaultExample() {
  return (
    <DonutChart data={data} aria-label="Donut chart with five categories">
      <DonutChartCenter>
        <Text slot="value">100%</Text>
      </DonutChartCenter>
    </DonutChart>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`single-slice`,children:`Single slice`}),`
`,(0,x.jsxs)(t.p,{children:[`One slice fills the ring. The `,(0,x.jsx)(t.code,{children:`description`}),` slot adds a smaller second line beneath the main value.`]}),`
`,(0,x.jsx)(a,{of:g,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { DonutChart, DonutChartCenter, Text } from '@godaddy/antares';

export function SingleSliceExample() {
  return (
    <DonutChart data={[{ id: 'only', name: 'Total', value: 100 }]} aria-label="Donut chart with a single full ring">
      <DonutChartCenter>
        <Text slot="value">$1,000</Text>
        <Text slot="description">Sub label</Text>
      </DonutChartCenter>
    </DonutChart>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`legend-placement`,children:`Legend placement`}),`
`,(0,x.jsxs)(t.p,{children:[`The legend reads the chart's data and appears below the ring by default. Set `,(0,x.jsx)(t.code,{children:`legendPlacement="end"`}),` to place it beside the ring in the current text direction.`]}),`
`,(0,x.jsx)(a,{of:l,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { ChartLegend, DonutChart, DonutChartCenter, type DonutChartProps, Flex, Text } from '@godaddy/antares';

const data = [
  { id: '1', name: 'Product A', value: 40 },
  { id: '2', name: 'Product B', value: 30 },
  { id: '3', name: 'Product C', value: 20 },
  { id: '4', name: 'Product D', value: 10 }
];

export function LegendLayoutExample({ data: slices = data }: Partial<Pick<DonutChartProps, 'data'>>) {
  return (
    <Flex direction="column" gap="xl">
      <DonutChart data={slices} legendPlacement="end" aria-label="Donut with legend beside it">
        <ChartLegend label="Side legend" />
        <DonutChartCenter>
          <Text slot="value">100%</Text>
        </DonutChartCenter>
      </DonutChart>
      <DonutChart data={slices} aria-label="Donut with legend below">
        <DonutChartCenter>
          <Text slot="value">100%</Text>
        </DonutChartCenter>
        <ChartLegend label="Bottom legend" />
      </DonutChart>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`small-slices`,children:`Small slices`}),`
`,(0,x.jsxs)(t.p,{children:[`Very thin slices can be noisy to hover. Anything at or below `,(0,x.jsx)(t.code,{children:`smallSliceThreshold`}),` (default `,(0,x.jsx)(t.code,{children:`0.05`}),` of the total) is treated as “small,” and if those slices sit next to each other on the ring, one hover opens a single tooltip that lists the whole group.`]}),`
`,(0,x.jsx)(a,{of:u,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { DonutChart } from '@godaddy/antares';

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
  return <DonutChart data={data} aria-label="Donut with small slices for combined tooltip" />;
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`format-value`,children:`Format value`}),`
`,(0,x.jsxs)(t.p,{children:[`Use `,(0,x.jsx)(t.code,{children:`formatValue`}),` when the raw numbers in the tooltip should read like money, counts with separators, or whatever your product expects. The percentage of the total still formats on its own; your function only shapes the value column.`]}),`
`,(0,x.jsx)(a,{of:d,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { DonutChart, DonutChartCenter, Text } from '@godaddy/antares';

const data = [
  { id: '1', name: 'Sales', value: 42 },
  { id: '2', name: 'Services', value: 35 },
  { id: '3', name: 'Support', value: 23 }
];

export function FormatValueExample() {
  return (
    <DonutChart
      data={data}
      formatValue={function format(v: number) {
        return \`\${v}.00\`;
      }}
      aria-label="Donut with formatted tooltip values for multiple revenue categories"
    >
      <DonutChartCenter>
        <Text slot="value">$100.00</Text>
      </DonutChartCenter>
    </DonutChart>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-tsx`,children:`<DonutChart>
  <DonutChartCenter>
    <Text slot="value" />
    <Text slot="description" />
    {/* ... */}
  </DonutChartCenter>
  <ChartLegend />
</DonutChart>
`})}),`
`,(0,x.jsx)(t.p,{children:`Compose the center and legend as optional direct children in either order. The ring, legend, and tooltip share the same slice colors. The built-in tooltip keeps percentage and value columns and groups adjacent small slices.`}),`
`,(0,x.jsx)(t.h3,{id:`donutchart-1`,children:`DonutChart`}),`
`,(0,x.jsx)(o,{of:m}),`
`,(0,x.jsx)(t.h3,{id:`donutchartcenter`,children:`DonutChartCenter`}),`
`,(0,x.jsx)(o,{of:h}),`
`,(0,x.jsx)(t.h3,{id:`chartlegend`,children:`ChartLegend`}),`
`,(0,x.jsx)(o,{of:_})]})}function b(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;function S(){return(S=e((()=>{x=t(),n(),c(),v()})))()}S();export{b as default};