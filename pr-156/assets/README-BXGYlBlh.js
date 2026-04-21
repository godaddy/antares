import{j as e}from"./iframe-CIBIW4ex.js";import{useMDXComponents as l}from"./index-CMkHWPaH.js";import{M as s,A as o,a as t,S as r}from"./blocks-DzyFoVCN.js";import{S as u,P as d,B as g,C as c,a as m,W as p,V as h,L as x}from"./gauge-chart.stories-DJNvjpkC.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BiSUdrHj.js";import"./index-dDwP_zAP.js";import"./index-CVygNudP.js";import"./index-DrFu-skq.js";import"./index-BNcudGgo.js";import"./index-Bo2YRNNL.js";import"./clsx-CHc0Q_Yt.js";import"./index-B5cbpJ61.js";import"./mergeProps-B-CnW51m.js";import"./useObjectRef-CIql4vEX.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-DfGv4MxS.js";import"./useFocusWithin-DQvuL9iY.js";import"./platform-BULRNHlZ.js";import"./useFocusable-CHNP5KK4.js";import"./Collection-BlIMNpln.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-B6_zfRxq.js";import"./context-Wb0c--0F.js";import"./useControlledState-D4XkBwSM.js";import"./useOverlayTriggerState-0vQupjfN.js";import"./PortalProvider-Bq1rV8TH.js";import"./usePreventScroll-DIYJ8jYc.js";import"./useLabel-jhm6CUXd.js";import"./VisuallyHidden-B-eOk7RS.js";import"./useField-M-UeCNb_.js";import"./useButton-B_Y-y25O.js";import"./index-EEWTLN40.js";import"./index-NlQrFS1F.js";import"./slots-D31tLaeg.js";import"./index-Doa4XHx4.js";import"./index-CLj43KZG.js";import"./index-q9KJBXD8.js";import"./index-BCosOuOY.js";import"./create-external-store-TtP3UJpK.js";import"./index-aRnW_Hav.js";import"./client-dLF4HVBT.js";import"./index-DQVetrkv.js";import"./index-J6a5snbh.js";import"./utils-C3REwL85.js";const b=`import { GaugeChart } from '@godaddy/antares';

export function BasicExample() {
  return <GaugeChart value={50} label="50%" aria-label="Basic gauge" style={{ maxWidth: '200px', margin: 'auto' }} />;
}
`,f=`import { Grid, GaugeChart } from '@godaddy/antares';

export function ContinuousExample() {
  const values = [0, 25, 50, 75, 100];

  return (
    <Grid columns="repeat(auto-fit, minmax(180px, 1fr))" rowGap="md" justifyContent="center" alignContent="center">
      {values.map(function renderGauge(v) {
        return <GaugeChart key={v} value={v} label={\`\${v}%\`} subLabel="Progress" aria-label={\`Gauge at \${v}%\`} />;
      })}
    </Grid>
  );
}
`,j=`import { Grid, GaugeChart } from '@godaddy/antares';

export function SegmentedExample() {
  return (
    <Grid columns="repeat(2, 200px)" rowGap="lg" justifyContent="center">
      <GaugeChart segments={5} value={0} label="0/5" subLabel="Empty" aria-label="Gauge with 0 of 5 filled" />
      <GaugeChart segments={5} value={2} label="2/5" subLabel="Partial" aria-label="Gauge with 2 of 5 filled" />
      <GaugeChart segments={5} value={5} label="5/5" subLabel="Full" aria-label="Gauge with 5 of 5 filled" />
      <GaugeChart segments={3} value={1} label="1/3" subLabel="Three segments" aria-label="Gauge with 1 of 3 filled" />
    </Grid>
  );
}
`,v=`import { Grid, GaugeChart } from '@godaddy/antares';

export function WithRangeLabelsExample() {
  return (
    <Grid columns="repeat(2, 1fr)" gap="lg" justifyContent="center">
      <GaugeChart
        value={65}
        label="65%"
        subLabel="CPU Usage"
        rangeLabel={{ min: 0, max: 100 }}
        aria-label="CPU usage gauge"
      />
      <GaugeChart
        value={3}
        segments={5}
        label="3/5"
        subLabel="Risk Level"
        rangeLabel={{ min: 'Low', max: 'High' }}
        variant="warning"
        aria-label="Risk level gauge"
      />
    </Grid>
  );
}
`,G=`import { Grid, GaugeChart } from '@godaddy/antares';

export function VariantsExample() {
  return (
    <Grid columns="repeat(2, 1fr)" gap="lg" justifyContent="center">
      <GaugeChart value={50} label="50%" subLabel="Default" variant="default" aria-label="Default variant gauge" />
      <GaugeChart value={50} label="50%" subLabel="Success" variant="success" aria-label="Success variant gauge" />
      <GaugeChart value={50} label="50%" subLabel="Warning" variant="warning" aria-label="Warning variant gauge" />
      <GaugeChart value={50} label="50%" subLabel="Critical" variant="critical" aria-label="Critical variant gauge" />
    </Grid>
  );
}
`,C=`import { Grid, GaugeChart } from '@godaddy/antares';

export function LabelTypeExample() {
  return (
    <Grid columns="repeat(2, 1fr)" gap="lg" justifyContent="center">
      <GaugeChart value={72} label="72%" subLabel="Completion" aria-label="Gauge with numeric value label" />
      <GaugeChart value={72} label="Good" labelType="text" subLabel="Completion" aria-label="Gauge with text label" />
    </Grid>
  );
}
`;function i(n){const a={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...l(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:u,name:"Overview"}),`
`,e.jsx(a.h1,{id:"gauge-chart",children:"Gauge Chart"}),`
`,e.jsx(a.p,{children:"A visual indicator for representing a single quantitative value within a known range, rendered as a semicircle arc in continuous or segmented mode."}),`
`,e.jsx(a.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(a.h2,{id:"props",children:"Props"}),`
`,e.jsx(o,{of:d}),`
`,e.jsx(a.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(a.h3,{id:"basic",children:"Basic"}),`
`,e.jsx(a.p,{children:"A continuous gauge with a single label."}),`
`,e.jsx(t,{of:g,inline:!0}),`
`,e.jsx(r,{language:"tsx",code:b}),`
`,e.jsx(a.h3,{id:"continuous-values",children:"Continuous Values"}),`
`,e.jsx(a.p,{children:"Multiple continuous gauges showing different fill percentages."}),`
`,e.jsx(t,{of:c,inline:!0}),`
`,e.jsx(r,{language:"tsx",code:f}),`
`,e.jsx(a.h3,{id:"segmented",children:"Segmented"}),`
`,e.jsxs(a.p,{children:["Segmented gauges divide the arc into discrete sections (1–5). The ",e.jsx(a.code,{children:"value"})," prop selects how many segments are filled."]}),`
`,e.jsx(t,{of:m,inline:!0}),`
`,e.jsx(r,{language:"tsx",code:j}),`
`,e.jsx(a.h3,{id:"with-range-labels",children:"With Range Labels"}),`
`,e.jsxs(a.p,{children:["Min/max labels positioned below the gauge arc at the left and right edges. Both ",e.jsx(a.code,{children:"min"})," and ",e.jsx(a.code,{children:"max"})," must be provided."]}),`
`,e.jsx(t,{of:p,inline:!0}),`
`,e.jsx(r,{language:"tsx",code:v}),`
`,e.jsx(a.h3,{id:"variants",children:"Variants"}),`
`,e.jsxs(a.p,{children:["Color variants convey meaning at a glance — use ",e.jsx(a.code,{children:"success"}),", ",e.jsx(a.code,{children:"warning"}),", or ",e.jsx(a.code,{children:"critical"})," alongside descriptive text."]}),`
`,e.jsx(t,{of:h,inline:!0}),`
`,e.jsx(r,{language:"tsx",code:G}),`
`,e.jsx(a.h3,{id:"label-type",children:"Label Type"}),`
`,e.jsxs(a.p,{children:["Control the font size of the primary label using ",e.jsx(a.code,{children:"labelType"}),". Use ",e.jsx(a.code,{children:"'value'"})," for numeric or percentage values and ",e.jsx(a.code,{children:"'text'"})," for short descriptive strings."]}),`
`,e.jsx(t,{of:x,inline:!0}),`
`,e.jsx(r,{language:"tsx",code:C}),`
`,e.jsx(a.h2,{id:"troubleshooting",children:"Troubleshooting"}),`
`,e.jsx(a.h3,{id:"gauge-not-sizing-correctly",children:"Gauge Not Sizing Correctly"}),`
`,e.jsxs(a.p,{children:["The component uses ",e.jsx(a.code,{children:"container-type: inline-size"})," and fills its parent width. Ensure the parent has a defined width:"]}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-tsx",children:`// ❌ No width constraint — gauge may stretch to full viewport
<GaugeChart label="50%" value={50} aria-label="Progress" />

// ✅ Parent provides width context
<div style={{ width: 200 }}>
  <GaugeChart label="50%" value={50} aria-label="Progress" />
</div>

// ✅ Or use className for max-width
<GaugeChart className="my-gauge" label="50%" value={50} aria-label="Progress" />
`})}),`
`,e.jsx(a.h3,{id:"value-out-of-range",children:"Value Out of Range"}),`
`,e.jsx(a.p,{children:"Values outside the valid range are clamped silently at runtime. For continuous mode the range is 0–100; for segmented mode the range is 0 to the segment count."}),`
`,e.jsx(a.pre,{children:e.jsx(a.code,{className:"language-tsx",children:`// ✅ Continuous: 0–100
<GaugeChart label="75%" value={75} aria-label="Score" />

// ✅ Segmented: 0 to segments
<GaugeChart label="3/5" value={3} segments={5} aria-label="Risk level" />
`})})]})}function he(n={}){const{wrapper:a}={...l(),...n.components};return a?e.jsx(a,{...n,children:e.jsx(i,{...n})}):i(n)}export{he as default};
