import{i as e}from"./preload-helper-Ck4AIfeV.js";import{F as t}from"./iframe-BBqsUJo9.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DSO3oENT.js";import{t as c}from"./mdx-react-shim-CXvjuUlY.js";import{t as l}from"./runtime-y7Cb7YYM.js";import{Default as u,Indeterminate as d,Props as f,Sizes as p,Statuses as m,n as h,t as g}from"./progress-bar.stories-B--04zJl.js";function _(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(o,{of:h,name:`Overview`}),`
`,(0,y.jsx)(t.h1,{id:`progressbar`,children:`ProgressBar`}),`
`,(0,y.jsx)(t.p,{children:`A progress bar shows determinate or indeterminate progress of an operation over time`}),`
`,(0,y.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,y.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,y.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,y.jsx)(t.p,{children:`A determinate progress bar with a label and helper text.`}),`
`,(0,y.jsx)(i,{of:u,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { ProgressBar } from '@godaddy/antares';

export function DefaultExample() {
  return <ProgressBar label="Loading…" value={60} helperText="Please wait while we process your request" />;
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,y.jsxs)(t.p,{children:[`Three track heights are available: `,(0,y.jsx)(t.code,{children:`xs`}),` (6px), `,(0,y.jsx)(t.code,{children:`sm`}),` (12px), and `,(0,y.jsx)(t.code,{children:`md`}),` (24px).`]}),`
`,(0,y.jsx)(i,{of:p,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { ProgressBar, Flex } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar label="Extra Small" size="xs" value={40} />
      <ProgressBar label="Small" size="sm" value={60} />
      <ProgressBar label="Medium" size="md" value={80} />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`statuses`,children:`Statuses`}),`
`,(0,y.jsxs)(t.p,{children:[`Use the `,(0,y.jsx)(t.code,{children:`status`}),` prop to communicate intent: `,(0,y.jsx)(t.code,{children:`default`}),`, `,(0,y.jsx)(t.code,{children:`success`}),`, `,(0,y.jsx)(t.code,{children:`warning`}),`, or `,(0,y.jsx)(t.code,{children:`critical`}),`. Pair with `,(0,y.jsx)(t.code,{children:`helperText`}),` to provide additional context.`]}),`
`,(0,y.jsx)(i,{of:m,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { ProgressBar, Flex } from '@godaddy/antares';

export function StatusesExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar label="Default" status="default" value={50} helperText="In progress" />
      <ProgressBar label="Success" status="success" value={100} helperText="Complete" />
      <ProgressBar label="Warning" status="warning" value={70} helperText="Storage almost full" />
      <ProgressBar label="Critical" status="critical" value={30} helperText="Action required" />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`indeterminate`,children:`Indeterminate`}),`
`,(0,y.jsxs)(t.p,{children:[`Use indeterminate progress while preparing an upload whose total size is unknown.
Once the total is known, set `,(0,y.jsx)(t.code,{children:`isIndeterminate`}),` to false and supply a measured value.`]}),`
`,(0,y.jsx)(i,{of:d,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { ProgressBar, type ProgressBarProps } from '@godaddy/antares';

export function IndeterminateExample(props: ProgressBarProps) {
  return <ProgressBar label="Preparing upload…" helperText="Calculating the total size" isIndeterminate {...props} />;
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,y.jsx)(t.h3,{id:`aria-support`,children:`ARIA Support`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`role="progressbar"`}),` on the container`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`aria-valuenow`}),` is omitted while indeterminate; otherwise it reflects the current value`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`aria-valuemin`}),` and `,(0,y.jsx)(t.code,{children:`aria-valuemax`}),` define the range (default `,(0,y.jsx)(t.code,{children:`0`}),`–`,(0,y.jsx)(t.code,{children:`100`}),`)`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`aria-valuetext`}),` and visible value text are omitted while indeterminate; otherwise `,(0,y.jsx)(t.code,{children:`aria-valuetext`}),` provides a formatted string (e.g. `,(0,y.jsx)(t.code,{children:`"60%"`}),`)`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`aria-labelledby`}),` associates the visible label when the `,(0,y.jsx)(t.code,{children:`label`}),` prop is provided`]}),`
`]}),`
`,(0,y.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,y.jsx)(t.h3,{id:`progressbar-1`,children:`ProgressBar`}),`
`,(0,y.jsx)(a,{of:f})]})}function v(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,y.jsx)(t,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;e((()=>{y=t(),c(),s(),l(),g()}))();export{v as default};