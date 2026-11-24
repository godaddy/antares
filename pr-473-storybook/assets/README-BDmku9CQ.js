import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-Bke2qnEB.js";import{a as l,c as u,d,i as f,l as p,n as m,o as h,r as g,s as _,t as v,u as y}from"./gauge-chart.stories-BUw_VNVW.js";function b(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...r(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(s,{of:y,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`gauge-chart`,children:`Gauge Chart`}),`
`,(0,S.jsx)(t.p,{children:`GaugeChart shows one value on a known scale as a semicircle arc, in continuous or segmented mode.`}),`
`,(0,S.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,S.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,S.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,S.jsx)(t.p,{children:`A continuous gauge with a value in the center.`}),`
`,(0,S.jsx)(a,{of:m,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { GaugeChart, GaugeChartCenter, Text } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <GaugeChart value={50} aria-label="Basic gauge" style={{ maxWidth: '200px', margin: 'auto' }}>
      <GaugeChartCenter>
        <Text slot="value">50%</Text>
      </GaugeChartCenter>
    </GaugeChart>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`continuous-values`,children:`Continuous Values`}),`
`,(0,S.jsx)(t.p,{children:`Multiple continuous gauges showing different fill percentages.`}),`
`,(0,S.jsx)(a,{of:v,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { GaugeChart, GaugeChartCenter, Grid, Text } from '@godaddy/antares';

export function ContinuousExample() {
  const values = [0, 25, 50, 75, 100];

  return (
    <Grid columns="repeat(auto-fit, minmax(180px, 1fr))" gap="md" justifyContent="center" alignContent="center">
      {values.map(function renderGauge(v) {
        return (
          <GaugeChart key={v} value={v} aria-label={\`Gauge at \${v}%\`}>
            <GaugeChartCenter>
              <Text slot="value">{v}%</Text>
              <Text slot="description">Progress</Text>
            </GaugeChartCenter>
          </GaugeChart>
        );
      })}
    </Grid>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`segmented`,children:`Segmented`}),`
`,(0,S.jsxs)(t.p,{children:[`Segmented gauges divide the arc into discrete sections (1–5). The `,(0,S.jsx)(t.code,{children:`value`}),` prop selects how many segments are filled.`]}),`
`,(0,S.jsx)(a,{of:_,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { GaugeChart, GaugeChartCenter, Grid, Text } from '@godaddy/antares';

const gauges = [
  { segments: 5, value: 0, description: 'Empty' },
  { segments: 5, value: 2, description: 'Partial' },
  { segments: 5, value: 5, description: 'Full' },
  { segments: 3, value: 1, description: 'Three segments' }
];

export function SegmentedExample() {
  return (
    <Grid columns="repeat(2, 200px)" gap="md" justifyContent="center">
      {gauges.map(function renderGauge({ segments, value, description }) {
        return (
          <GaugeChart
            key={\`\${value}/\${segments}\`}
            segments={segments}
            value={value}
            valueLabel={\`\${value} of \${segments}\`}
            aria-label={\`Gauge with \${value} of \${segments} filled\`}
          >
            <GaugeChartCenter>
              <Text slot="value">
                {value}/{segments}
              </Text>
              <Text slot="description">{description}</Text>
            </GaugeChartCenter>
          </GaugeChart>
        );
      })}
    </Grid>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`with-range-labels`,children:`With Range Labels`}),`
`,(0,S.jsxs)(t.p,{children:[`Add `,(0,S.jsx)(t.code,{children:`GaugeChartRange`}),` to label the ends of the arc. The labels describe the scale; they do not change it.`]}),`
`,(0,S.jsx)(a,{of:p,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { GaugeChart, GaugeChartCenter, GaugeChartRange, Grid, Text } from '@godaddy/antares';

export function WithRangeLabelsExample() {
  return (
    <Grid columns="repeat(2, 1fr)" gap="lg" justifyContent="center">
      <GaugeChart value={65} aria-label="CPU usage gauge">
        <GaugeChartCenter>
          <Text slot="value">65%</Text>
          <Text slot="description">CPU Usage</Text>
        </GaugeChartCenter>
        <GaugeChartRange>
          <Text slot="min">0</Text>
          <Text slot="max">100</Text>
        </GaugeChartRange>
      </GaugeChart>
      <GaugeChart value={3} segments={5} valueLabel="3 of 5" variant="warning" aria-label="Risk level gauge">
        <GaugeChartCenter>
          <Text slot="value">3/5</Text>
          <Text slot="description">Risk Level</Text>
        </GaugeChartCenter>
        <GaugeChartRange>
          <Text slot="min">Low</Text>
          <Text slot="max">High</Text>
        </GaugeChartRange>
      </GaugeChart>
    </Grid>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`variants`,children:`Variants`}),`
`,(0,S.jsxs)(t.p,{children:[`Color variants convey meaning at a glance — use `,(0,S.jsx)(t.code,{children:`success`}),`, `,(0,S.jsx)(t.code,{children:`warning`}),`, or `,(0,S.jsx)(t.code,{children:`critical`}),` alongside descriptive text.`]}),`
`,(0,S.jsx)(a,{of:u,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { GaugeChart, GaugeChartCenter, Grid, Text, type GaugeChartProps } from '@godaddy/antares';

const variants: Array<{ variant: NonNullable<GaugeChartProps['variant']>; name: string }> = [
  { variant: 'default', name: 'Default' },
  { variant: 'success', name: 'Success' },
  { variant: 'warning', name: 'Warning' },
  { variant: 'critical', name: 'Critical' }
];

export function VariantsExample() {
  return (
    <Grid columns="repeat(2, 1fr)" gap="lg" justifyContent="center">
      {variants.map(function renderGauge({ variant, name }) {
        return (
          <GaugeChart key={variant} value={50} variant={variant} aria-label={\`\${name} variant gauge\`}>
            <GaugeChartCenter>
              <Text slot="value">50%</Text>
              <Text slot="description">{name}</Text>
            </GaugeChartCenter>
          </GaugeChart>
        );
      })}
    </Grid>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`label-type`,children:`Label Type`}),`
`,(0,S.jsxs)(t.p,{children:[(0,S.jsx)(t.code,{children:`labelType`}),` sets the size of the center value. Use `,(0,S.jsx)(t.code,{children:`'value'`}),` for numbers or percentages and `,(0,S.jsx)(t.code,{children:`'text'`}),` for short words.`]}),`
`,(0,S.jsx)(a,{of:l,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { GaugeChart, GaugeChartCenter, Grid, Text } from '@godaddy/antares';

export function LabelTypeExample() {
  return (
    <Grid columns="repeat(2, 1fr)" gap="lg" justifyContent="center">
      <GaugeChart value={72} aria-label="Gauge with numeric value label">
        <GaugeChartCenter>
          <Text slot="value">72%</Text>
          <Text slot="description">Completion</Text>
        </GaugeChartCenter>
      </GaugeChart>
      <GaugeChart value={72} labelType="text" valueLabel="Good, 72%" aria-label="Gauge with text label">
        <GaugeChartCenter>
          <Text slot="value">Good</Text>
          <Text slot="description">Completion</Text>
        </GaugeChartCenter>
      </GaugeChart>
    </Grid>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,S.jsx)(t.h3,{id:`gauge-not-sizing-correctly`,children:`Gauge Not Sizing Correctly`}),`
`,(0,S.jsxs)(t.p,{children:[`The gauge fills its parent's width and scales its text with it. Constrain the parent or set a `,(0,S.jsx)(t.code,{children:`maxWidth`}),`:`]}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-tsx`,children:`<GaugeChart value={50} aria-label="Progress" style={{ maxWidth: 200 }}>
  <GaugeChartCenter>
    <Text slot="value">50%</Text>
  </GaugeChartCenter>
</GaugeChart>
`})}),`
`,(0,S.jsx)(t.h3,{id:`value-out-of-range`,children:`Value Out of Range`}),`
`,(0,S.jsxs)(t.p,{children:[`Values outside the scale are clamped. Continuous mode uses 0–100 and segmented mode uses 0 to `,(0,S.jsx)(t.code,{children:`segments`}),`. Normalize other measurements before passing them.`]}),`
`,(0,S.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-tsx`,children:`<GaugeChart value={3} segments={5}>
  <GaugeChartCenter>
    <Text slot="value" />
    <Text slot="description" />
  </GaugeChartCenter>
  <GaugeChartRange>
    <Text slot="min" />
    <Text slot="max" />
  </GaugeChartRange>
</GaugeChart>
`})}),`
`,(0,S.jsxs)(t.p,{children:[`Compose the center and range as optional direct children in either order. The description also describes the meter. Set `,(0,S.jsx)(t.code,{children:`valueLabel`}),` when the visible value isn't a plain number.`]}),`
`,(0,S.jsx)(t.h3,{id:`gaugechart`,children:`GaugeChart`}),`
`,(0,S.jsx)(o,{of:h}),`
`,(0,S.jsx)(t.h3,{id:`gaugechartcenter`,children:`GaugeChartCenter`}),`
`,(0,S.jsx)(o,{of:g}),`
`,(0,S.jsx)(t.h3,{id:`gaugechartrange`,children:`GaugeChartRange`}),`
`,(0,S.jsx)(o,{of:f})]})}function x(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;function C(){return(C=e((()=>{S=t(),n(),c(),d()})))()}C();export{x as default};