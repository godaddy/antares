import{i as e}from"./preload-helper-r38FjZtB.js";import{y as t}from"./iframe-De4EwHKN.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-C_nayckk.js";import{t as c}from"./mdx-react-shim-BMTn6U8D.js";import{Default as l,Props as u,Sizes as d,Statuses as f,n as p,t as m}from"./progress-bar.stories-CPuLF0pR.js";var h,g=e((()=>{h=`import { ProgressBar } from '@godaddy/antares';

export function DefaultExample() {
  return <ProgressBar label="Loading…" value={60} helperText="Please wait while we process your request" />;
}
`})),_,v=e((()=>{_=`import { ProgressBar, Flex } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar label="Extra Small" size="xs" value={40} />
      <ProgressBar label="Small" size="sm" value={60} />
      <ProgressBar label="Medium" size="md" value={80} />
    </Flex>
  );
}
`})),y,b=e((()=>{y=`import { ProgressBar, Flex } from '@godaddy/antares';

export function StatusesExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar label="Default" status="default" value={50} helperText="In progress" />
      <ProgressBar label="Success" status="success" value={100} helperText="Complete" />
      <ProgressBar label="Warning" status="warning" value={70} helperText="Storage almost full" />
      <ProgressBar label="Critical" status="critical" value={30} helperText="Action required" />
    </Flex>
  );
}
`}));function x(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(o,{of:p,name:`Overview`}),`
`,(0,C.jsx)(t.h1,{id:`progressbar`,children:`ProgressBar`}),`
`,(0,C.jsx)(t.p,{children:`A progress bar shows determinate progress of an operation over time`}),`
`,(0,C.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,C.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,C.jsx)(a,{of:u}),`
`,(0,C.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,C.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,C.jsx)(i,{of:l,inline:!0}),`
`,(0,C.jsx)(r,{language:`tsx`,code:h}),`
`,(0,C.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,C.jsxs)(t.p,{children:[`Three track heights are available: `,(0,C.jsx)(t.code,{children:`xs`}),` (6px), `,(0,C.jsx)(t.code,{children:`sm`}),` (12px), and `,(0,C.jsx)(t.code,{children:`md`}),` (24px).`]}),`
`,(0,C.jsx)(i,{of:d,inline:!0}),`
`,(0,C.jsx)(r,{language:`tsx`,code:_}),`
`,(0,C.jsx)(t.h3,{id:`statuses`,children:`Statuses`}),`
`,(0,C.jsxs)(t.p,{children:[`Use the `,(0,C.jsx)(t.code,{children:`status`}),` prop to communicate intent: `,(0,C.jsx)(t.code,{children:`default`}),`, `,(0,C.jsx)(t.code,{children:`success`}),`, `,(0,C.jsx)(t.code,{children:`warning`}),`, or `,(0,C.jsx)(t.code,{children:`critical`}),`. Pair with `,(0,C.jsx)(t.code,{children:`helperText`}),` to provide additional context.`]}),`
`,(0,C.jsx)(i,{of:f,inline:!0}),`
`,(0,C.jsx)(r,{language:`tsx`,code:y}),`
`,(0,C.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,C.jsx)(t.h3,{id:`aria-support`,children:`ARIA Support`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`role="progressbar"`}),` on the container`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`aria-valuenow`}),` reflects the current value`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`aria-valuemin`}),` and `,(0,C.jsx)(t.code,{children:`aria-valuemax`}),` define the range (default `,(0,C.jsx)(t.code,{children:`0`}),`–`,(0,C.jsx)(t.code,{children:`100`}),`)`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`aria-valuetext`}),` provides a formatted string (e.g. `,(0,C.jsx)(t.code,{children:`"60%"`}),`)`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`aria-labelledby`}),` associates the visible label when the `,(0,C.jsx)(t.code,{children:`label`}),` prop is provided`]}),`
`]})]})}function S(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;e((()=>{C=t(),c(),s(),m(),g(),v(),b()}))();export{S as default};