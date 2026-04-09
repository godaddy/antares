import{j as e}from"./iframe-mIkG-ia4.js";import{useMDXComponents as r}from"./index-CYbcAVO_.js";import{M as l,A as s,S as o,a as n}from"./blocks-H-xBVXSD.js";import{S as d,P as c,B as h,a as m,b as u,L as p,c as x,F as g}from"./donut-chart.stories-UTqBQd7w.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C8Gy-4ls.js";import"./index-BA5fCnJS.js";import"./index-qmzokPCi.js";import"./index-DrFu-skq.js";import"./index-B_O5YSnX.js";import"./index-BFUvbBmq.js";import"./clsx-CXVhVjWX.js";import"./index-CWmIgOtN.js";import"./mergeProps-VPp-_EQW.js";import"./useObjectRef-CF8ZtGSI.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-BqYfOhcr.js";import"./useFocusWithin-PKv_bTL9.js";import"./platform-BULRNHlZ.js";import"./useFocusable-Cc2c3LHG.js";import"./Collection-CYqfV12Y.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-BdqrIGw6.js";import"./context-6ndoatbe.js";import"./useControlledState-w-gpInWD.js";import"./useOverlayTriggerState-d59EUrgw.js";import"./PortalProvider-Bat0598t.js";import"./usePreventScroll-C01_aj-U.js";import"./useLabel-0AxH-o5c.js";import"./VisuallyHidden-PHHkCmUs.js";import"./useField-DH8Kpi32.js";import"./useButton-DPe44exJ.js";import"./index-Bbfxlgrc.js";import"./index-NOeWBRf7.js";import"./slots-DysxeCnN.js";import"./index-C5i0zoNI.js";import"./index-CLj43KZG.js";import"./index-D5Js5omO.js";import"./index-CYB4ICH7.js";import"./create-external-store-TtP3UJpK.js";import"./index-CjknuouO.js";import"./client-CAUSWO60.js";import"./index-COSOMKr7.js";import"./index-DV1KJj-k.js";import"./utils-BmlTeeZD.js";import"./Group-De0dNi0F.js";import"./index-BqZmZfnL.js";import"./D3ShapeFactories-66Y8PNOp.js";import"./arc-DkvVsaXs.js";import"./line-C3BPJyQZ.js";import"./pie-Dq9eI5G3.js";const j=`import { DonutChart } from '@godaddy/antares';

const data = [
  { id: '1', name: 'Category A', value: 35 },
  { id: '2', name: 'Category B', value: 25 },
  { id: '3', name: 'Category C', value: 18 },
  { id: '4', name: 'Category D', value: 12 },
  { id: '5', name: 'Category E', value: 10 }
];

export function BasicExample() {
  return <DonutChart data={data} label="100%" size="lg" aria-label="Donut chart with five categories" />;
}
`,f=`import { DonutChart } from '@godaddy/antares';

export function SingleSliceExample() {
  return (
    <DonutChart
      data={[{ id: 'only', name: 'Total', value: 100 }]}
      label="$1,000"
      subLabel="Sub label"
      size="lg"
      aria-label="Donut chart with a single full ring"
    />
  );
}
`,v=`import { Box, DonutChart, Flex } from '@godaddy/antares';

const data = [
  { id: '1', name: 'North', value: 40 },
  { id: '2', name: 'South', value: 35 },
  { id: '3', name: 'East', value: 25 }
];

/** Fixed width so each donut shows \`size\` ring/typography at the same diameter. */
const DEMO_WIDTH_PX = 160;

export function SizesExample() {
  return (
    <Flex gap="xl" alignItems="flex-end" wrap="wrap">
      <Box style={{ width: DEMO_WIDTH_PX }}>
        <DonutChart data={data} label="sm" size="sm" aria-label="Small donut" />
      </Box>
      <Box style={{ width: DEMO_WIDTH_PX }}>
        <DonutChart data={data} label="md" size="md" aria-label="Medium donut" />
      </Box>
      <Box style={{ width: DEMO_WIDTH_PX }}>
        <DonutChart data={data} label="lg" size="lg" aria-label="Large donut" />
      </Box>
      <Box style={{ width: DEMO_WIDTH_PX }}>
        <DonutChart data={data} label="xl" size="xl" aria-label="Extra large donut" />
      </Box>
    </Flex>
  );
}
`,y=`import { DonutChart, Flex } from '@godaddy/antares';

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
        legend="horizontal"
        legendLabel="Legend title"
        size="lg"
        aria-label="Donut with legend to the right"
      />
      <DonutChart
        data={data}
        label="100%"
        legend="vertical"
        legendLabel="Legend title"
        size="lg"
        aria-label="Donut with legend below"
      />
    </Flex>
  );
}
`,b=`import { DonutChart } from '@godaddy/antares';

/** Two large slices with two separate clusters of small slices — hover a small slice to see only that adjacent group (A–C or E–G) in the tooltip. */
const data = [
  { id: 'main', name: 'Primary', value: 88 },
  { id: 'a', name: 'Slice A', value: 3 },
  { id: 'b', name: 'Slice B', value: 3 },
  { id: 'c', name: 'Slice C', value: 3 },
  { id: 'd', name: 'Slice D', value: 90 },
  { id: 'e', name: 'Slice E', value: 5 },
  { id: 'f', name: 'Slice F', value: 2 },
  { id: 'g', name: 'Slice G', value: 1 }
];

export function SmallSlicesExample() {
  return <DonutChart data={data} label="88%" size="lg" aria-label="Donut with small slices for combined tooltip" />;
}
`,S=`import { DonutChart, type DonutChartProps } from '@godaddy/antares';

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
      size="lg"
      aria-label="Donut with formatted tooltip values for multiple revenue categories"
      {...props}
    />
  );
}
`;function i(a){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...r(),...a.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:d,name:"Overview"}),`
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
`,e.jsx(o,{language:"tsx",code:j}),`
`,e.jsx(n,{of:h,inline:!0}),`
`,e.jsx(t.h3,{id:"single-slice",children:"Single slice"}),`
`,e.jsxs(t.p,{children:["When there is only one slice, the ring is full. Add ",e.jsx(t.code,{children:"subLabel"})," if you want a smaller second line under the main center text."]}),`
`,e.jsx(o,{language:"tsx",code:f}),`
`,e.jsx(n,{of:m,inline:!0}),`
`,e.jsx(t.h3,{id:"sizes",children:"Sizes"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"size"})," (",e.jsx(t.code,{children:"sm"})," through ",e.jsx(t.code,{children:"xl"}),") changes how thick the ring looks and how big the center type reads. The example keeps the same width for each donut so you can compare the presets without reshaping the layout."]}),`
`,e.jsx(o,{language:"tsx",code:v}),`
`,e.jsx(n,{of:u,inline:!0}),`
`,e.jsx(t.h3,{id:"legend-placement",children:"Legend placement"}),`
`,e.jsxs(t.p,{children:["Switch ",e.jsx(t.code,{children:"legend"})," to ",e.jsx(t.code,{children:"horizontal"})," to sit the legend beside the donut, or ",e.jsx(t.code,{children:"vertical"})," to stack it underneath. ",e.jsx(t.code,{children:"legendLabel"})," is there when you want a title above the legend items."]}),`
`,e.jsx(o,{language:"tsx",code:y}),`
`,e.jsx(n,{of:p,inline:!0}),`
`,e.jsx(t.h3,{id:"small-slices",children:"Small slices"}),`
`,e.jsxs(t.p,{children:["Very thin slices can be noisy to hover. Anything at or below ",e.jsx(t.code,{children:"smallSliceThreshold"})," (default ",e.jsx(t.code,{children:"0.05"})," of the total) is treated as “small,” and if those slices sit next to each other on the ring, one hover opens a single tooltip that lists the whole group."]}),`
`,e.jsx(o,{language:"tsx",code:b}),`
`,e.jsx(n,{of:x,inline:!0}),`
`,e.jsx(t.h3,{id:"format-value",children:"Format value"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"formatValue"})," when the raw numbers in the tooltip should read like money, counts with separators, or whatever your product expects. The percentage of the total still formats on its own; your function only shapes the value column."]}),`
`,e.jsx(o,{language:"tsx",code:S}),`
`,e.jsx(n,{of:g,inline:!0})]})}function be(a={}){const{wrapper:t}={...r(),...a.components};return t?e.jsx(t,{...a,children:e.jsx(i,{...a})}):i(a)}export{be as default};
