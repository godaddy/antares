import{i as e}from"./preload-helper-BHwm7qkS.js";import{y as t}from"./iframe-DiZA4sGy.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Bklw2Zxz.js";import{t as c}from"./mdx-react-shim-DK4-pcki.js";import{Default as l,Props as u,Sizes as d,Statuses as f,n as p,t as m}from"./progress-bar.stories-DzrH9Eua.js";function h(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(o,{of:p,name:`Overview`}),`
`,(0,_.jsx)(t.h1,{id:`progressbar`,children:`ProgressBar`}),`
`,(0,_.jsx)(t.p,{children:`A progress bar shows determinate progress of an operation over time`}),`
`,(0,_.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,_.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,_.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,_.jsx)(t.p,{children:`A determinate progress bar with a label and helper text.`}),`
`,(0,_.jsx)(i,{of:l,inline:!0}),`
`,(0,_.jsx)(r,{code:`import { ProgressBar } from '@godaddy/antares';

export function DefaultExample() {
  return <ProgressBar label="Loading…" value={60} helperText="Please wait while we process your request" />;
}`,language:`tsx`}),`
`,(0,_.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,_.jsxs)(t.p,{children:[`Three track heights are available: `,(0,_.jsx)(t.code,{children:`xs`}),` (6px), `,(0,_.jsx)(t.code,{children:`sm`}),` (12px), and `,(0,_.jsx)(t.code,{children:`md`}),` (24px).`]}),`
`,(0,_.jsx)(i,{of:d,inline:!0}),`
`,(0,_.jsx)(r,{code:`import { ProgressBar, Flex } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar label="Extra Small" size="xs" value={40} />
      <ProgressBar label="Small" size="sm" value={60} />
      <ProgressBar label="Medium" size="md" value={80} />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,_.jsx)(t.h3,{id:`statuses`,children:`Statuses`}),`
`,(0,_.jsxs)(t.p,{children:[`Use the `,(0,_.jsx)(t.code,{children:`status`}),` prop to communicate intent: `,(0,_.jsx)(t.code,{children:`default`}),`, `,(0,_.jsx)(t.code,{children:`success`}),`, `,(0,_.jsx)(t.code,{children:`warning`}),`, or `,(0,_.jsx)(t.code,{children:`critical`}),`. Pair with `,(0,_.jsx)(t.code,{children:`helperText`}),` to provide additional context.`]}),`
`,(0,_.jsx)(i,{of:f,inline:!0}),`
`,(0,_.jsx)(r,{code:`import { ProgressBar, Flex } from '@godaddy/antares';

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
`,(0,_.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,_.jsx)(t.h3,{id:`aria-support`,children:`ARIA Support`}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.code,{children:`role="progressbar"`}),` on the container`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.code,{children:`aria-valuenow`}),` reflects the current value`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.code,{children:`aria-valuemin`}),` and `,(0,_.jsx)(t.code,{children:`aria-valuemax`}),` define the range (default `,(0,_.jsx)(t.code,{children:`0`}),`–`,(0,_.jsx)(t.code,{children:`100`}),`)`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.code,{children:`aria-valuetext`}),` provides a formatted string (e.g. `,(0,_.jsx)(t.code,{children:`"60%"`}),`)`]}),`
`,(0,_.jsxs)(t.li,{children:[(0,_.jsx)(t.code,{children:`aria-labelledby`}),` associates the visible label when the `,(0,_.jsx)(t.code,{children:`label`}),` prop is provided`]}),`
`]}),`
`,(0,_.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,_.jsx)(a,{of:u})]})}function g(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;e((()=>{_=t(),c(),s(),m()}))();export{g as default};