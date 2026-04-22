import{j as e}from"./iframe-DNXmVt2J.js";import{useMDXComponents as i}from"./index-C5SBtMP2.js";import{M as l,A as s,S as o,a as n}from"./blocks-iX0Kt9Jr.js";import{S as d,P as c,B as m,a as u,L as h,b as p,F as x}from"./donut-chart.stories-Bi_Z-pt5.js";import"./preload-helper-PPVm8Dsz.js";import"./index-pRJuJIwn.js";import"./index-Th8k5VBP.js";import"./index-DdBMv_Jd.js";import"./index-DrFu-skq.js";import"./index-Dp2Y86M3.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./index-CjOoR8pa.js";import"./OverlayArrow-BNBY-ZPT.js";import"./mergeProps-C7R8qOWs.js";import"./SSRProvider-BijP3zDE.js";import"./DOMFunctions-BADGQOBX.js";import"./platform-BULRNHlZ.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-BK4f9AAY.js";import"./useControlledState-Bdw8djY9.js";import"./useFocusable-BQzQBPUa.js";import"./useHover-BhJO288J.js";import"./utils-C2NRQJ9A.js";import"./useObjectRef-DwTlAagJ.js";import"./context-2eYSJNgG.js";import"./Text-DlAEITp4.js";import"./filterDOMProps-BNnC3YgW.js";import"./PortalProvider-CpL7mAp4.js";import"./index-YgXItADc.js";import"./index-CK5Q8Tle.js";import"./index-B2KUoK5a.js";import"./Group-k5nH1vYk.js";import"./utils-C3REwL85.js";import"./D3ShapeFactories-66Y8PNOp.js";import"./arc-DkvVsaXs.js";import"./line-C3BPJyQZ.js";import"./pie-Dq9eI5G3.js";const g=`import { DonutChart, type DonutChartProps } from '@godaddy/antares';

const data = [
  { id: '1', name: 'Category A', value: 35 },
  { id: '2', name: 'Category B', value: 25 },
  { id: '3', name: 'Category C', value: 18 },
  { id: '4', name: 'Category D', value: 12 },
  { id: '5', name: 'Category E', value: 10 }
];

export function BasicExample(props: Partial<DonutChartProps>) {
  return <DonutChart data={data} label="100%" aria-label="Donut chart with five categories" {...props} />;
}
`,j=`import { DonutChart } from '@godaddy/antares';

export function SingleSliceExample() {
  return (
    <DonutChart
      data={[{ id: 'only', name: 'Total', value: 100 }]}
      label="$1,000"
      subLabel="Sub label"
      aria-label="Donut chart with a single full ring"
    />
  );
}
`,f=`import { DonutChart, Flex } from '@godaddy/antares';

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
}
`,v=`import { DonutChart } from '@godaddy/antares';

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
}
`,b=`import { DonutChart, type DonutChartProps } from '@godaddy/antares';

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
        return \`$\${v}.00\`;
      }}
      aria-label="Donut with formatted tooltip values for multiple revenue categories"
      {...props}
    />
  );
}
`;function r(a){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...i(),...a.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:d,name:"Overview"}),`
`,e.jsx(t.h1,{id:"donutchart",children:"DonutChart"}),`
`,e.jsx(t.p,{children:"Donut charts are for parts-to-whole comparison—how partial elements add up to a total—shown as a ring so a few categories are easy to compare at a glance."}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install @godaddy/antares
`})}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsx(s,{of:c}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"basic",children:"Basic"}),`
`,e.jsxs(t.p,{children:["You give the chart a ",e.jsx(t.code,{children:"data"})," array (",e.jsx(t.code,{children:"id"}),", ",e.jsx(t.code,{children:"name"}),", ",e.jsx(t.code,{children:"value"}),") and a ",e.jsx(t.code,{children:"label"})," in the middle—this is the everyday setup when you want several categories on one ring and a headline number or title in the hole."]}),`
`,e.jsx(o,{language:"tsx",code:g}),`
`,e.jsx(n,{of:m,inline:!0}),`
`,e.jsx(t.h3,{id:"single-slice",children:"Single slice"}),`
`,e.jsxs(t.p,{children:["When there is only one slice, the ring is full. Add ",e.jsx(t.code,{children:"subLabel"})," if you want a smaller second line under the main center text."]}),`
`,e.jsx(o,{language:"tsx",code:j}),`
`,e.jsx(n,{of:u,inline:!0}),`
`,e.jsx(t.h3,{id:"legend-placement",children:"Legend placement"}),`
`,e.jsxs(t.p,{children:["Switch ",e.jsx(t.code,{children:"legend"})," to ",e.jsx(t.code,{children:"right"})," to sit the legend beside the donut, or ",e.jsx(t.code,{children:"bottom"})," to stack it underneath. ",e.jsx(t.code,{children:"legendLabel"})," is there when you want a title above the legend items."]}),`
`,e.jsx(o,{language:"tsx",code:f}),`
`,e.jsx(n,{of:h,inline:!0}),`
`,e.jsx(t.h3,{id:"small-slices",children:"Small slices"}),`
`,e.jsxs(t.p,{children:["Very thin slices can be noisy to hover. Anything at or below ",e.jsx(t.code,{children:"smallSliceThreshold"})," (default ",e.jsx(t.code,{children:"0.05"})," of the total) is treated as “small,” and if those slices sit next to each other on the ring, one hover opens a single tooltip that lists the whole group."]}),`
`,e.jsx(o,{language:"tsx",code:v}),`
`,e.jsx(n,{of:p,inline:!0}),`
`,e.jsx(t.h3,{id:"format-value",children:"Format value"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"formatValue"})," when the raw numbers in the tooltip should read like money, counts with separators, or whatever your product expects. The percentage of the total still formats on its own; your function only shapes the value column."]}),`
`,e.jsx(o,{language:"tsx",code:b}),`
`,e.jsx(n,{of:x,inline:!0})]})}function re(a={}){const{wrapper:t}={...i(),...a.components};return t?e.jsx(t,{...a,children:e.jsx(r,{...a})}):r(a)}export{re as default};
