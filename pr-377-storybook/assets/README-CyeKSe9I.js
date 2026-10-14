import{i as e}from"./preload-helper-wAYLiFQb.js";import{F as t}from"./iframe-CfDyJoEJ.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-qo2LnaAQ.js";import{t as c}from"./mdx-react-shim-CXAZZ_Uo.js";import{t as l}from"./runtime-DqHkGQqO.js";import{Default as u,Indeterminate as d,Props as f,Sizes as p,Slots as m,Statuses as h,ValueDisplay as g,WithoutLabel as _,WithoutValueLabel as v,n as y,t as b}from"./progress-bar.stories-Bbpky3cP.js";function x(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(o,{of:y,name:`Overview`}),`
`,(0,C.jsx)(t.h1,{id:`progressbar`,children:`ProgressBar`}),`
`,(0,C.jsx)(t.p,{children:`Composable determinate or indeterminate progress with optional label, value, and description`}),`
`,(0,C.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,C.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,C.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,C.jsx)(t.p,{children:`Compose a label, formatted value, track, and description.`}),`
`,(0,C.jsx)(i,{of:u,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { Box, Label, ProgressBar, Text, type ProgressBarProps } from '@godaddy/antares';

export function DefaultExample(props: ProgressBarProps) {
  return (
    <ProgressBar value={60} {...props}>
      <Label>Loading…</Label>
      <Box slot="value" />
      <Box slot="track" />
      <Text slot="description">Please wait while we process your request</Text>
    </ProgressBar>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,C.jsxs)(t.p,{children:[`Three track heights are available: `,(0,C.jsx)(t.code,{children:`xs`}),` (6px), `,(0,C.jsx)(t.code,{children:`sm`}),` (12px), and `,(0,C.jsx)(t.code,{children:`md`}),` (24px).`]}),`
`,(0,C.jsx)(i,{of:p,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { Box, Flex, Label, ProgressBar } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar size="xs" value={40}>
        <Label>Extra Small</Label>
        <Box slot="value" />
        <Box slot="track" />
      </ProgressBar>
      <ProgressBar size="sm" value={60}>
        <Label>Small</Label>
        <Box slot="value" />
        <Box slot="track" />
      </ProgressBar>
      <ProgressBar size="md" value={80}>
        <Label>Medium</Label>
        <Box slot="value" />
        <Box slot="track" />
      </ProgressBar>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`statuses`,children:`Statuses`}),`
`,(0,C.jsxs)(t.p,{children:[`Use `,(0,C.jsx)(t.code,{children:`status`}),` to communicate intent and a description for additional context.`]}),`
`,(0,C.jsx)(i,{of:h,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { Box, Flex, Label, ProgressBar, Text } from '@godaddy/antares';

export function StatusesExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar status="default" value={50}>
        <Label>Default</Label>
        <Box slot="value" />
        <Box slot="track" />
        <Text slot="description">In progress</Text>
      </ProgressBar>
      <ProgressBar status="success" value={100}>
        <Label>Success</Label>
        <Box slot="value" />
        <Box slot="track" />
        <Text slot="description">Complete</Text>
      </ProgressBar>
      <ProgressBar status="warning" value={70}>
        <Label>Warning</Label>
        <Box slot="value" />
        <Box slot="track" />
        <Text slot="description">Storage almost full</Text>
      </ProgressBar>
      <ProgressBar status="critical" value={30}>
        <Label>Critical</Label>
        <Box slot="value" />
        <Box slot="track" />
        <Text slot="description">Action required</Text>
      </ProgressBar>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`indeterminate`,children:`Indeterminate`}),`
`,(0,C.jsx)(t.p,{children:`Use indeterminate progress while the total is unknown. Value output is hidden automatically.`}),`
`,(0,C.jsx)(i,{of:d,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { Box, Label, ProgressBar, Text, type ProgressBarProps } from '@godaddy/antares';

export function IndeterminateExample(props: ProgressBarProps) {
  return (
    <ProgressBar isIndeterminate {...props}>
      <Label>Preparing upload…</Label>
      <Box slot="value" />
      <Box slot="track" />
      <Text slot="description">Calculating the total size</Text>
    </ProgressBar>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`without-value-label`,children:`Without Value Label`}),`
`,(0,C.jsx)(t.p,{children:`Omit the value slot to hide visible value output. Accessible progress is preserved.`}),`
`,(0,C.jsx)(i,{of:v,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { Box, Label, ProgressBar, type ProgressBarProps } from '@godaddy/antares';

export function WithoutValueLabelExample(props: ProgressBarProps) {
  return (
    <ProgressBar value={60} {...props}>
      <Label>Uploading files</Label>
      <Box slot="track" />
    </ProgressBar>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`without-label`,children:`Without Label`}),`
`,(0,C.jsx)(t.p,{children:`Compose only the track for progress in a table or fixed position. Supply an accessible name.
Add a value slot when a visible value is useful.`}),`
`,(0,C.jsx)(i,{of:_,inline:!0}),`
`,(0,C.jsx)(r,{code:`import type { ReactNode } from 'react';
import { Box, ProgressBar, type ProgressBarProps, type ProgressBarRenderProps } from '@godaddy/antares';

interface WithoutLabelExampleProps extends ProgressBarProps {
  /** Whether to include visible value output. */
  showValue?: boolean;

  /** Custom visible value content. Omit for the formatted value. */
  valueContent?: ReactNode | ((state: ProgressBarRenderProps) => ReactNode);
}

export function WithoutLabelExample({ showValue = false, valueContent, ...props }: WithoutLabelExampleProps) {
  return (
    <ProgressBar aria-label="Upload progress" value={60} size="sm" {...props}>
      {(state) => (
        <>
          {showValue ? (
            <Box slot="value">{typeof valueContent === 'function' ? valueContent(state) : valueContent}</Box>
          ) : null}
          <Box slot="track" />
        </>
      )}
    </ProgressBar>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`value-display`,children:`Value Display`}),`
`,(0,C.jsx)(t.p,{children:`The value slot shows formatted text by default and accepts custom children.
Static content does not change the accessible value; set the root's valueLabel when needed.`}),`
`,(0,C.jsx)(i,{of:g,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { Box, Flex, Label, ProgressBar } from '@godaddy/antares';

export function ValueDisplayExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar value={60}>
        <Label>Upload progress</Label>
        <Box slot="value" />
        <Box slot="track" />
      </ProgressBar>
      <ProgressBar value={60}>
        <Label>Files uploaded</Label>
        <Box slot="value">
          <span>3 of 5 files</span>
        </Box>
        <Box slot="track" />
      </ProgressBar>
      <ProgressBar value={60}>
        {({ percentage }) => (
          <>
            <Label>Processing progress</Label>
            <Box slot="value">Current: {percentage}%</Box>
            <Box slot="track" />
          </>
        )}
      </ProgressBar>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`slots`,children:`Slots`}),`
`,(0,C.jsx)(t.p,{children:`Box slots receive the formatted value and decorative track from ProgressBar.
Use the root's render function for custom value content. Text can also fill the value slot.`}),`
`,(0,C.jsx)(i,{of:m,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { Box, Flex, Label, ProgressBar, Text } from '@godaddy/antares';

export function SlotsExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar value={60}>
        <Label>Box value</Label>
        <Box slot="value" />
        <Box slot="track" />
        <Text slot="description">Processing files</Text>
      </ProgressBar>
      <ProgressBar value={60}>
        {({ percentage }) => (
          <>
            <Label>Custom value</Label>
            <Box slot="value">Current: {percentage}%</Box>
            <Box slot="track" />
          </>
        )}
      </ProgressBar>
      <ProgressBar value={60}>
        <Label>Text value</Label>
        <Text slot="value" />
        <Box slot="track" />
      </ProgressBar>
      <ProgressBar aria-label="Track only" value={60} size="xs">
        <Box slot="track" />
      </ProgressBar>
      <ProgressBar isIndeterminate>
        <Label>Preparing upload</Label>
        <Box slot="value">Waiting</Box>
        <Box slot="track" />
      </ProgressBar>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,C.jsxs)(t.p,{children:[`Compose `,(0,C.jsx)(t.code,{children:`Label`}),`, `,(0,C.jsx)(t.code,{children:`Box`}),` with `,(0,C.jsx)(t.code,{children:`slot="track"`}),`, an optional value slot, and `,(0,C.jsx)(t.code,{children:`Text`}),` with `,(0,C.jsx)(t.code,{children:`slot="description"`}),`.`]}),`
`,(0,C.jsxs)(t.p,{children:[`Use `,(0,C.jsx)(t.code,{children:`Box`}),` with `,(0,C.jsx)(t.code,{children:`slot="value"`}),` for formatted text, or supply custom children. Use `,(0,C.jsx)(t.code,{children:`Text`}),` with the same
slot for typography props and the root's children render function for state-based content.`]}),`
`,(0,C.jsxs)(t.p,{children:[`Set `,(0,C.jsx)(t.code,{children:`valueLabel`}),` to customize accessible value text. Omit the value slot to hide visible output;
empty and indeterminate values collapse automatically. Customize layout and styling with the
root's Grid props, `,(0,C.jsx)(t.code,{children:`className`}),`, and `,(0,C.jsx)(t.code,{children:`style`}),`.`]}),`
`,(0,C.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[`The root has `,(0,C.jsx)(t.code,{children:`role="progressbar"`}),` and a range defined by `,(0,C.jsx)(t.code,{children:`minValue`}),` and `,(0,C.jsx)(t.code,{children:`maxValue`}),`, defaulting to 0 and 100.`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`Label`}),` supplies the accessible name. When omitted, provide `,(0,C.jsx)(t.code,{children:`aria-label`}),` or `,(0,C.jsx)(t.code,{children:`aria-labelledby`}),`.`]}),`
`,(0,C.jsxs)(t.li,{children:[`Determinate progress exposes `,(0,C.jsx)(t.code,{children:`aria-valuenow`}),` and formatted `,(0,C.jsx)(t.code,{children:`aria-valuetext`}),`, even without a visible value slot.`]}),`
`,(0,C.jsxs)(t.li,{children:[`Indeterminate progress omits `,(0,C.jsx)(t.code,{children:`aria-valuenow`}),`, `,(0,C.jsx)(t.code,{children:`aria-valuetext`}),`, and visible value output.`]}),`
`,(0,C.jsxs)(t.li,{children:[`Mounted descriptions are associated automatically, including custom IDs. External `,(0,C.jsx)(t.code,{children:`aria-describedby`}),` references are preserved.`]}),`
`,(0,C.jsx)(t.li,{children:`Description association is established on mounting. Server-rendered descriptions are associated when the component hydrates.`}),`
`,(0,C.jsx)(t.li,{children:`Reduced motion stops the indeterminate sweep while retaining a visible indicator. RTL and forced colors are supported.`}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-tsx`,children:`<ProgressBar>
  <Label />
  <Box slot="value" />
  <Box slot="track" />
  <Text slot="description" />
  {/* ... */}
</ProgressBar>
`})}),`
`,(0,C.jsx)(t.h3,{id:`progressbar-1`,children:`ProgressBar`}),`
`,(0,C.jsx)(a,{of:f})]})}function S(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;e((()=>{C=t(),c(),s(),l(),b()}))();export{S as default};