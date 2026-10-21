import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-AdKfnSuI.js";import{a as l,c as u,d,i as f,l as p,n as m,o as h,r as g,s as _,t as v,u as y}from"./progress-bar.stories-BVxKsNXz.js";function b(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(s,{of:d,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`progressbar`,children:`ProgressBar`}),`
`,(0,S.jsx)(t.p,{children:`Composable determinate or indeterminate progress with optional label, value, and description`}),`
`,(0,S.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,S.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,S.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,S.jsx)(t.p,{children:`Compose a label, formatted value, track, and description.`}),`
`,(0,S.jsx)(a,{of:v,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Box, Label, ProgressBar, Text, type ProgressBarProps } from '@godaddy/antares';

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
`,(0,S.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,S.jsxs)(t.p,{children:[`Three track heights are available: `,(0,S.jsx)(t.code,{children:`xs`}),` (6px), `,(0,S.jsx)(t.code,{children:`sm`}),` (12px), and `,(0,S.jsx)(t.code,{children:`md`}),` (24px).`]}),`
`,(0,S.jsx)(a,{of:f,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Box, Flex, Label, ProgressBar } from '@godaddy/antares';

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
`,(0,S.jsx)(t.h3,{id:`statuses`,children:`Statuses`}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`status`}),` to communicate intent and a description for additional context.`]}),`
`,(0,S.jsx)(a,{of:h,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Box, Flex, Label, ProgressBar, Text } from '@godaddy/antares';

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
`,(0,S.jsx)(t.h3,{id:`indeterminate`,children:`Indeterminate`}),`
`,(0,S.jsx)(t.p,{children:`Use indeterminate progress while the total is unknown. Value output is hidden automatically.`}),`
`,(0,S.jsx)(a,{of:m,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Box, Label, ProgressBar, Text, type ProgressBarProps } from '@godaddy/antares';

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
`,(0,S.jsx)(t.h3,{id:`without-value-label`,children:`Without Value Label`}),`
`,(0,S.jsx)(t.p,{children:`Omit the value slot to hide visible value output. Accessible progress is preserved.`}),`
`,(0,S.jsx)(a,{of:p,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Box, Label, ProgressBar, type ProgressBarProps } from '@godaddy/antares';

export function WithoutValueLabelExample(props: ProgressBarProps) {
  return (
    <ProgressBar value={60} {...props}>
      <Label>Uploading files</Label>
      <Box slot="track" />
    </ProgressBar>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`without-label`,children:`Without Label`}),`
`,(0,S.jsx)(t.p,{children:`Compose only the track for progress in a table or fixed position. Supply an accessible name.
Add a value slot when a visible value is useful.`}),`
`,(0,S.jsx)(a,{of:u,inline:!0}),`
`,(0,S.jsx)(i,{code:`import type { ReactNode } from 'react';
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
`,(0,S.jsx)(t.h3,{id:`value-display`,children:`Value Display`}),`
`,(0,S.jsx)(t.p,{children:`The value slot shows formatted text by default and accepts custom children.
Static content does not change the accessible value; set the root's valueLabel when needed.`}),`
`,(0,S.jsx)(a,{of:_,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Box, Flex, Label, ProgressBar } from '@godaddy/antares';

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
`,(0,S.jsx)(t.h3,{id:`slots`,children:`Slots`}),`
`,(0,S.jsx)(t.p,{children:`Box slots receive the formatted value and decorative track from ProgressBar.
Use the root's render function for custom value content. Text can also fill the value slot.`}),`
`,(0,S.jsx)(a,{of:l,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Box, Flex, Label, ProgressBar, Text } from '@godaddy/antares';

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
`,(0,S.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`Box slot="value"`}),` for formatted or custom content, or `,(0,S.jsx)(t.code,{children:`Text slot="value"`}),` for typography controls.
The root's children render function provides progress state. Customize layout and styling with
Grid props, `,(0,S.jsx)(t.code,{children:`className`}),`, and `,(0,S.jsx)(t.code,{children:`style`}),`.`]}),`
`,(0,S.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[`Provide `,(0,S.jsx)(t.code,{children:`Label`}),`, `,(0,S.jsx)(t.code,{children:`aria-label`}),`, or `,(0,S.jsx)(t.code,{children:`aria-labelledby`}),` for the accessible name.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Progress remains accessible without a visible value. Use `,(0,S.jsx)(t.code,{children:`valueLabel`}),` to customize its text; indeterminate progress omits the value.`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`Text slot="description"`}),` is associated automatically, preserving external `,(0,S.jsx)(t.code,{children:`aria-describedby`}),` references.`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-tsx`,children:`<ProgressBar>
  <Label />
  <Box slot="value" />
  <Box slot="track" />
  <Text slot="description" />
  {/* ... */}
</ProgressBar>
`})}),`
`,(0,S.jsx)(t.h3,{id:`progressbar-1`,children:`ProgressBar`}),`
`,(0,S.jsx)(o,{of:g})]})}function x(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;function C(){return(C=e((()=>{S=t(),n(),c(),y()})))()}C();export{x as default};