import{i as e}from"./preload-helper-wAYLiFQb.js";import{F as t}from"./iframe-BbH5NJpv.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-C3ALlcMs.js";import{t as c}from"./mdx-react-shim-DvuRFhxF.js";import{t as l}from"./runtime-DqHkGQqO.js";import{Default as u,Indeterminate as d,Props as f,Sizes as p,Statuses as m,ValueDisplay as h,WithoutLabel as g,WithoutValueLabel as _,n as v,t as y}from"./progress-bar.stories-BxtU1yqQ.js";function b(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(o,{of:v,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`progressbar`,children:`ProgressBar`}),`
`,(0,S.jsx)(t.p,{children:`A progress bar shows determinate or indeterminate progress of an operation over time`}),`
`,(0,S.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,S.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,S.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,S.jsx)(t.p,{children:`A determinate progress bar with a label and helper text.`}),`
`,(0,S.jsx)(i,{of:u,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { ProgressBar } from '@godaddy/antares';

export function DefaultExample() {
  return <ProgressBar label="Loading…" value={60} valueLabel helperText="Please wait while we process your request" />;
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,S.jsxs)(t.p,{children:[`Three track heights are available: `,(0,S.jsx)(t.code,{children:`xs`}),` (6px), `,(0,S.jsx)(t.code,{children:`sm`}),` (12px), and `,(0,S.jsx)(t.code,{children:`md`}),` (24px).`]}),`
`,(0,S.jsx)(i,{of:p,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { ProgressBar, Flex } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar label="Extra Small" size="xs" value={40} valueLabel />
      <ProgressBar label="Small" size="sm" value={60} valueLabel />
      <ProgressBar label="Medium" size="md" value={80} valueLabel />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`statuses`,children:`Statuses`}),`
`,(0,S.jsxs)(t.p,{children:[`Use the `,(0,S.jsx)(t.code,{children:`status`}),` prop to communicate intent: `,(0,S.jsx)(t.code,{children:`default`}),`, `,(0,S.jsx)(t.code,{children:`success`}),`, `,(0,S.jsx)(t.code,{children:`warning`}),`, or `,(0,S.jsx)(t.code,{children:`critical`}),`. Pair with `,(0,S.jsx)(t.code,{children:`helperText`}),` to provide additional context.`]}),`
`,(0,S.jsx)(i,{of:m,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { ProgressBar, Flex } from '@godaddy/antares';

export function StatusesExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar label="Default" status="default" value={50} valueLabel helperText="In progress" />
      <ProgressBar label="Success" status="success" value={100} valueLabel helperText="Complete" />
      <ProgressBar label="Warning" status="warning" value={70} valueLabel helperText="Storage almost full" />
      <ProgressBar label="Critical" status="critical" value={30} valueLabel helperText="Action required" />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`indeterminate`,children:`Indeterminate`}),`
`,(0,S.jsxs)(t.p,{children:[`Use indeterminate progress while preparing an upload whose total size is unknown.
Once the total is known, set `,(0,S.jsx)(t.code,{children:`isIndeterminate`}),` to false and supply a measured value.`]}),`
`,(0,S.jsx)(i,{of:d,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { ProgressBar, type ProgressBarProps } from '@godaddy/antares';

export function IndeterminateExample(props: ProgressBarProps) {
  return (
    <ProgressBar
      label="Preparing upload…"
      helperText="Calculating the total size"
      valueLabel
      isIndeterminate
      {...props}
    />
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`without-value-label`,children:`Without Value Label`}),`
`,(0,S.jsxs)(t.p,{children:[`Omit `,(0,S.jsx)(t.code,{children:`valueLabel`}),` to show a label without visible value text.
Progress remains available to assistive technology.`]}),`
`,(0,S.jsx)(i,{of:_,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { ProgressBar, type ProgressBarProps } from '@godaddy/antares';

export function WithoutValueLabelExample(props: ProgressBarProps) {
  return <ProgressBar label="Uploading files" value={60} {...props} />;
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`without-label`,children:`Without Label`}),`
`,(0,S.jsxs)(t.p,{children:[`Omit the visible label for compact progress in a table or a fixed position.
Supply an accessible name with `,(0,S.jsx)(t.code,{children:`aria-label`}),`. Use `,(0,S.jsx)(t.code,{children:`valueLabel`}),` to opt into visible value output.`]}),`
`,(0,S.jsx)(i,{of:g,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { ProgressBar, type ProgressBarProps } from '@godaddy/antares';

export function WithoutLabelExample(props: ProgressBarProps) {
  return <ProgressBar aria-label="Upload progress" value={60} size="sm" {...props} />;
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`value-display`,children:`Value Display`}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`valueLabel`}),` to show formatted values, static content, or output derived from progress state.`]}),`
`,(0,S.jsx)(i,{of:h,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Flex, ProgressBar } from '@godaddy/antares';

export function ValueDisplayExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar label="Upload progress" value={60} valueLabel />
      <ProgressBar label="Files uploaded" value={60} valueLabel={<span>3 of 5 files</span>} />
      <ProgressBar
        label="Processing progress"
        value={60}
        valueLabel={function renderValue({ percentage }) {
          return \`Current: \${percentage}%\`;
        }}
      />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,S.jsxs)(t.p,{children:[(0,S.jsx)(t.code,{children:`label`}),` and the visible value can be controlled independently:`]}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[`Visible value output is hidden by default. Omitted, `,(0,S.jsx)(t.code,{children:`null`}),`, and `,(0,S.jsx)(t.code,{children:`false`}),` values for `,(0,S.jsx)(t.code,{children:`valueLabel`}),` hide it.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Pass `,(0,S.jsx)(t.code,{children:`valueLabel={true}`}),` to show the formatted value, a React node for static content, or a render function for content derived from progress state.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Without a `,(0,S.jsx)(t.code,{children:`label`}),` or `,(0,S.jsx)(t.code,{children:`valueLabel`}),`, only the track is shown. A value label can also appear without a visible label.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Use `,(0,S.jsx)(t.code,{children:`aria-label`}),` or `,(0,S.jsx)(t.code,{children:`aria-labelledby`}),` to provide an accessible name when there is no visible label.`]}),`
`]}),`
`,(0,S.jsxs)(t.p,{children:[`Hiding visible value text does not remove `,(0,S.jsx)(t.code,{children:`aria-valuenow`}),` or the formatted `,(0,S.jsx)(t.code,{children:`aria-valuetext`}),`.
Use `,(0,S.jsx)(t.code,{children:`valueLabel`}),` for custom value text.`]}),`
`,(0,S.jsxs)(t.p,{children:[`To retain percentage text from earlier versions, add `,(0,S.jsx)(t.code,{children:`valueLabel={true}`}),` to existing progress bars.`]}),`
`,(0,S.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,S.jsx)(t.h3,{id:`aria-support`,children:`ARIA Support`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`role="progressbar"`}),` on the container`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`aria-valuenow`}),` is omitted while indeterminate; otherwise it reflects the current value`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`aria-valuemin`}),` and `,(0,S.jsx)(t.code,{children:`aria-valuemax`}),` define the range (default `,(0,S.jsx)(t.code,{children:`0`}),`–`,(0,S.jsx)(t.code,{children:`100`}),`)`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`aria-valuetext`}),` and visible value text are omitted while indeterminate; otherwise `,(0,S.jsx)(t.code,{children:`aria-valuetext`}),` provides a formatted string (e.g. `,(0,S.jsx)(t.code,{children:`"60%"`}),`)`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`aria-labelledby`}),` associates the visible label when the `,(0,S.jsx)(t.code,{children:`label`}),` prop is provided`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,S.jsx)(t.h3,{id:`progressbar-1`,children:`ProgressBar`}),`
`,(0,S.jsx)(a,{of:f})]})}function x(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;e((()=>{S=t(),c(),s(),l(),y()}))();export{x as default};