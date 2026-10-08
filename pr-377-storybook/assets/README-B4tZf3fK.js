import{i as e}from"./preload-helper-wAYLiFQb.js";import{F as t}from"./iframe-C1WDpNTP.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-BmwWsnPe.js";import{t as c}from"./mdx-react-shim-nSBZrwN1.js";import{t as l}from"./runtime-DqHkGQqO.js";import{Default as u,Indeterminate as d,Props as f,Sizes as p,Statuses as m,TrackProps as h,ValueDisplay as g,ValueProps as _,WithoutLabel as v,WithoutValueLabel as y,n as b,t as x}from"./progress-bar.stories-CShAn6dj.js";function S(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(o,{of:b,name:`Overview`}),`
`,(0,w.jsx)(t.h1,{id:`progressbar`,children:`ProgressBar`}),`
`,(0,w.jsx)(t.p,{children:`Composable determinate or indeterminate progress with optional label, value, and description`}),`
`,(0,w.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,w.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,w.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,w.jsx)(t.p,{children:`Compose a label, formatted value, track, and description.`}),`
`,(0,w.jsx)(i,{of:u,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Label, ProgressBar, ProgressBarTrack, ProgressBarValue, Text, type ProgressBarProps } from '@godaddy/antares';

export function DefaultExample(props: ProgressBarProps) {
  return (
    <ProgressBar value={60} {...props}>
      <Label>Loading…</Label>
      <ProgressBarValue />
      <ProgressBarTrack />
      <Text slot="description">Please wait while we process your request</Text>
    </ProgressBar>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,w.jsxs)(t.p,{children:[`Three track heights are available: `,(0,w.jsx)(t.code,{children:`xs`}),` (6px), `,(0,w.jsx)(t.code,{children:`sm`}),` (12px), and `,(0,w.jsx)(t.code,{children:`md`}),` (24px).`]}),`
`,(0,w.jsx)(i,{of:p,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Flex, Label, ProgressBar, ProgressBarTrack, ProgressBarValue } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar size="xs" value={40}>
        <Label>Extra Small</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
      </ProgressBar>
      <ProgressBar size="sm" value={60}>
        <Label>Small</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
      </ProgressBar>
      <ProgressBar size="md" value={80}>
        <Label>Medium</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
      </ProgressBar>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`statuses`,children:`Statuses`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`status`}),` to communicate intent and a description for additional context.`]}),`
`,(0,w.jsx)(i,{of:m,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Flex, Label, ProgressBar, ProgressBarTrack, ProgressBarValue, Text } from '@godaddy/antares';

export function StatusesExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar status="default" value={50}>
        <Label>Default</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
        <Text slot="description">In progress</Text>
      </ProgressBar>
      <ProgressBar status="success" value={100}>
        <Label>Success</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
        <Text slot="description">Complete</Text>
      </ProgressBar>
      <ProgressBar status="warning" value={70}>
        <Label>Warning</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
        <Text slot="description">Storage almost full</Text>
      </ProgressBar>
      <ProgressBar status="critical" value={30}>
        <Label>Critical</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
        <Text slot="description">Action required</Text>
      </ProgressBar>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`indeterminate`,children:`Indeterminate`}),`
`,(0,w.jsx)(t.p,{children:`Use indeterminate progress while the total is unknown. Value output is hidden automatically.`}),`
`,(0,w.jsx)(i,{of:d,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Label, ProgressBar, ProgressBarTrack, ProgressBarValue, Text, type ProgressBarProps } from '@godaddy/antares';

export function IndeterminateExample(props: ProgressBarProps) {
  return (
    <ProgressBar isIndeterminate {...props}>
      <Label>Preparing upload…</Label>
      <ProgressBarValue />
      <ProgressBarTrack />
      <Text slot="description">Calculating the total size</Text>
    </ProgressBar>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`without-value-label`,children:`Without Value Label`}),`
`,(0,w.jsx)(t.p,{children:`Omit ProgressBarValue to hide visible value output. Accessible progress is preserved.`}),`
`,(0,w.jsx)(i,{of:y,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Label, ProgressBar, ProgressBarTrack, type ProgressBarProps } from '@godaddy/antares';

export function WithoutValueLabelExample(props: ProgressBarProps) {
  return (
    <ProgressBar value={60} {...props}>
      <Label>Uploading files</Label>
      <ProgressBarTrack />
    </ProgressBar>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`without-label`,children:`Without Label`}),`
`,(0,w.jsx)(t.p,{children:`Compose only the track for progress in a table or fixed position. Supply an accessible name.
Add ProgressBarValue when a visible value is useful.`}),`
`,(0,w.jsx)(i,{of:v,inline:!0}),`
`,(0,w.jsx)(r,{code:`import {
  ProgressBar,
  ProgressBarTrack,
  ProgressBarValue,
  type ProgressBarProps,
  type ProgressBarValueProps
} from '@godaddy/antares';

interface WithoutLabelExampleProps extends ProgressBarProps {
  /** Whether to include visible value output. */
  showValue?: boolean;

  /** Custom visible value content. Omit for the formatted value. */
  valueContent?: ProgressBarValueProps['children'];
}

export function WithoutLabelExample({ showValue = false, valueContent, ...props }: WithoutLabelExampleProps) {
  return (
    <ProgressBar aria-label="Upload progress" value={60} size="sm" {...props}>
      {showValue ? <ProgressBarValue>{valueContent}</ProgressBarValue> : null}
      <ProgressBarTrack />
    </ProgressBar>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`value-display`,children:`Value Display`}),`
`,(0,w.jsx)(t.p,{children:`ProgressBarValue shows the formatted value by default and accepts static or state-based content.
Static content does not change the accessible value; set the root's valueLabel when needed.`}),`
`,(0,w.jsx)(i,{of:g,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Flex, Label, ProgressBar, ProgressBarTrack, ProgressBarValue } from '@godaddy/antares';

export function ValueDisplayExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar value={60}>
        <Label>Upload progress</Label>
        <ProgressBarValue />
        <ProgressBarTrack />
      </ProgressBar>
      <ProgressBar value={60}>
        <Label>Files uploaded</Label>
        <ProgressBarValue>
          <span>3 of 5 files</span>
        </ProgressBarValue>
        <ProgressBarTrack />
      </ProgressBar>
      <ProgressBar value={60}>
        <Label>Processing progress</Label>
        <ProgressBarValue>
          {function renderValue({ percentage }) {
            return \`Current: \${percentage}%\`;
          }}
        </ProgressBarValue>
        <ProgressBarTrack />
      </ProgressBar>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,w.jsx)(t.p,{children:`Compose only the parts you need:`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`Label`}),` provides a visible, associated name.`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`ProgressBarValue`}),` shows the formatted value by default. Its children accept static content or a render function receiving `,(0,w.jsx)(t.code,{children:`percentage`}),`, `,(0,w.jsx)(t.code,{children:`valueText`}),`, and `,(0,w.jsx)(t.code,{children:`isIndeterminate`}),`.`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`ProgressBarTrack`}),` renders the fill and inherits the root's size and status.`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`Text slot="description"`}),` provides helper text with an automatic accessible association.`]}),`
`]}),`
`,(0,w.jsxs)(t.p,{children:[`Omitting `,(0,w.jsx)(t.code,{children:`ProgressBarValue`}),` hides visible value output while preserving accessible progress. Omit both label and value for a compact track-only layout. Parts use named grid areas, so direct children and fragments can be written in any order. Use `,(0,w.jsx)(t.code,{children:`display: contents`}),` on a wrapper when its parts should participate in the root's grid, or override the root's Grid layout props for custom placement.`]}),`
`,(0,w.jsxs)(t.p,{children:[`Custom visual value content does not change `,(0,w.jsx)(t.code,{children:`aria-valuetext`}),`. The root's `,(0,w.jsx)(t.code,{children:`valueLabel`}),` accepts a string for accessible value text and the default output of `,(0,w.jsx)(t.code,{children:`ProgressBarValue`}),`; it does not add a visible value by itself.`]}),`
`,(0,w.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[`The root has `,(0,w.jsx)(t.code,{children:`role="progressbar"`}),` and a range defined by `,(0,w.jsx)(t.code,{children:`minValue`}),` and `,(0,w.jsx)(t.code,{children:`maxValue`}),`, defaulting to 0 and 100.`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`Label`}),` supplies the accessible name. When omitted, provide `,(0,w.jsx)(t.code,{children:`aria-label`}),` or `,(0,w.jsx)(t.code,{children:`aria-labelledby`}),`.`]}),`
`,(0,w.jsxs)(t.li,{children:[`Determinate progress exposes `,(0,w.jsx)(t.code,{children:`aria-valuenow`}),` and formatted `,(0,w.jsx)(t.code,{children:`aria-valuetext`}),`, even without `,(0,w.jsx)(t.code,{children:`ProgressBarValue`}),`.`]}),`
`,(0,w.jsxs)(t.li,{children:[`Indeterminate progress omits `,(0,w.jsx)(t.code,{children:`aria-valuenow`}),`, `,(0,w.jsx)(t.code,{children:`aria-valuetext`}),`, and visible value output.`]}),`
`,(0,w.jsxs)(t.li,{children:[`Mounted descriptions are associated automatically, including custom IDs. External `,(0,w.jsx)(t.code,{children:`aria-describedby`}),` references are preserved.`]}),`
`,(0,w.jsx)(t.li,{children:`Description association is established on mounting. Server-rendered descriptions are associated when the component hydrates.`}),`
`,(0,w.jsx)(t.li,{children:`Reduced motion stops the indeterminate sweep while retaining a visible indicator. RTL and forced colors are supported.`}),`
`]}),`
`,(0,w.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`<ProgressBar>
  <Label />
  <ProgressBarValue />
  <ProgressBarTrack />
  <Text slot="description" />
  {/* ... */}
</ProgressBar>
`})}),`
`,(0,w.jsx)(t.h3,{id:`progressbar-1`,children:`ProgressBar`}),`
`,(0,w.jsx)(a,{of:f}),`
`,(0,w.jsx)(t.h3,{id:`progressbartrack`,children:`ProgressBarTrack`}),`
`,(0,w.jsx)(a,{of:h}),`
`,(0,w.jsx)(t.h3,{id:`progressbarvalue`,children:`ProgressBarValue`}),`
`,(0,w.jsx)(a,{of:_})]})}function C(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(S,{...e})}):S(e)}var w;e((()=>{w=t(),c(),s(),l(),x()}))();export{C as default};