import{i as e}from"./preload-helper-D5h1UUhK.js";import{y as t}from"./iframe-BQNEbLmv.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-INz0IAxr.js";import{t as c}from"./mdx-react-shim-Dk-rKbJ6.js";import{Basic as l,Continuous as u,LabelType as d,Props as f,Segmented as p,Variants as m,WithRangeLabels as h,n as g,t as _}from"./gauge-chart.stories-K6uP6y39.js";var v,y=e((()=>{v=`import { GaugeChart } from '@godaddy/antares';

export function BasicExample() {
  return <GaugeChart value={50} label="50%" aria-label="Basic gauge" style={{ maxWidth: '200px', margin: 'auto' }} />;
}
`})),b,x=e((()=>{b=`import { Grid, GaugeChart } from '@godaddy/antares';

export function ContinuousExample() {
  const values = [0, 25, 50, 75, 100];

  return (
    <Grid columns="repeat(auto-fit, minmax(180px, 1fr))" gap="md" justifyContent="center" alignContent="center">
      {values.map(function renderGauge(v) {
        return <GaugeChart key={v} value={v} label={\`\${v}%\`} subLabel="Progress" aria-label={\`Gauge at \${v}%\`} />;
      })}
    </Grid>
  );
}
`})),S,C=e((()=>{S=`import { Grid, GaugeChart } from '@godaddy/antares';

export function SegmentedExample() {
  return (
    <Grid columns="repeat(2, 200px)" gap="md" justifyContent="center">
      <GaugeChart segments={5} value={0} label="0/5" subLabel="Empty" aria-label="Gauge with 0 of 5 filled" />
      <GaugeChart segments={5} value={2} label="2/5" subLabel="Partial" aria-label="Gauge with 2 of 5 filled" />
      <GaugeChart segments={5} value={5} label="5/5" subLabel="Full" aria-label="Gauge with 5 of 5 filled" />
      <GaugeChart segments={3} value={1} label="1/3" subLabel="Three segments" aria-label="Gauge with 1 of 3 filled" />
    </Grid>
  );
}
`})),w,T=e((()=>{w=`import { Grid, GaugeChart } from '@godaddy/antares';

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
`})),E,D=e((()=>{E=`import { Grid, GaugeChart } from '@godaddy/antares';

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
`})),O,k=e((()=>{O=`import { Grid, GaugeChart } from '@godaddy/antares';

export function LabelTypeExample() {
  return (
    <Grid columns="repeat(2, 1fr)" gap="lg" justifyContent="center">
      <GaugeChart value={72} label="72%" subLabel="Completion" aria-label="Gauge with numeric value label" />
      <GaugeChart value={72} label="Good" labelType="text" subLabel="Completion" aria-label="Gauge with text label" />
    </Grid>
  );
}
`}));function A(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(o,{of:_,name:`Overview`}),`
`,(0,M.jsx)(t.h1,{id:`gauge-chart`,children:`Gauge Chart`}),`
`,(0,M.jsx)(t.p,{children:`A visual indicator for representing a single quantitative value within a known range, rendered as a semicircle arc in continuous or segmented mode.`}),`
`,(0,M.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,M.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,M.jsx)(a,{of:f}),`
`,(0,M.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,M.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,M.jsx)(t.p,{children:`A continuous gauge with a single label.`}),`
`,(0,M.jsx)(i,{of:l,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:v}),`
`,(0,M.jsx)(t.h3,{id:`continuous-values`,children:`Continuous Values`}),`
`,(0,M.jsx)(t.p,{children:`Multiple continuous gauges showing different fill percentages.`}),`
`,(0,M.jsx)(i,{of:u,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:b}),`
`,(0,M.jsx)(t.h3,{id:`segmented`,children:`Segmented`}),`
`,(0,M.jsxs)(t.p,{children:[`Segmented gauges divide the arc into discrete sections (1–5). The `,(0,M.jsx)(t.code,{children:`value`}),` prop selects how many segments are filled.`]}),`
`,(0,M.jsx)(i,{of:p,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:S}),`
`,(0,M.jsx)(t.h3,{id:`with-range-labels`,children:`With Range Labels`}),`
`,(0,M.jsxs)(t.p,{children:[`Min/max labels positioned below the gauge arc at the left and right edges. Both `,(0,M.jsx)(t.code,{children:`min`}),` and `,(0,M.jsx)(t.code,{children:`max`}),` must be provided.`]}),`
`,(0,M.jsx)(i,{of:h,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:w}),`
`,(0,M.jsx)(t.h3,{id:`variants`,children:`Variants`}),`
`,(0,M.jsxs)(t.p,{children:[`Color variants convey meaning at a glance — use `,(0,M.jsx)(t.code,{children:`success`}),`, `,(0,M.jsx)(t.code,{children:`warning`}),`, or `,(0,M.jsx)(t.code,{children:`critical`}),` alongside descriptive text.`]}),`
`,(0,M.jsx)(i,{of:m,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:E}),`
`,(0,M.jsx)(t.h3,{id:`label-type`,children:`Label Type`}),`
`,(0,M.jsxs)(t.p,{children:[`Control the font size of the primary label using `,(0,M.jsx)(t.code,{children:`labelType`}),`. Use `,(0,M.jsx)(t.code,{children:`'value'`}),` for numeric or percentage values and `,(0,M.jsx)(t.code,{children:`'text'`}),` for short descriptive strings.`]}),`
`,(0,M.jsx)(i,{of:d,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:O}),`
`,(0,M.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,M.jsx)(t.h3,{id:`gauge-not-sizing-correctly`,children:`Gauge Not Sizing Correctly`}),`
`,(0,M.jsxs)(t.p,{children:[`The component uses `,(0,M.jsx)(t.code,{children:`container-type: inline-size`}),` and fills its parent width. Ensure the parent has a defined width:`]}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-tsx`,children:`// ❌ No width constraint — gauge may stretch to full viewport
<GaugeChart label="50%" value={50} aria-label="Progress" />

// ✅ Parent provides width context
<div style={{ width: 200 }}>
  <GaugeChart label="50%" value={50} aria-label="Progress" />
</div>

// ✅ Or use className for max-width
<GaugeChart className="my-gauge" label="50%" value={50} aria-label="Progress" />
`})}),`
`,(0,M.jsx)(t.h3,{id:`value-out-of-range`,children:`Value Out of Range`}),`
`,(0,M.jsx)(t.p,{children:`Values outside the valid range are clamped silently at runtime. For continuous mode the range is 0–100; for segmented mode the range is 0 to the segment count.`}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-tsx`,children:`// ✅ Continuous: 0–100
<GaugeChart label="75%" value={75} aria-label="Score" />

// ✅ Segmented: 0 to segments
<GaugeChart label="3/5" value={3} segments={5} aria-label="Risk level" />
`})})]})}function j(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,M.jsx)(t,{...e,children:(0,M.jsx)(A,{...e})}):A(e)}var M;e((()=>{M=t(),c(),s(),g(),y(),x(),C(),T(),D(),k()}))();export{j as default};