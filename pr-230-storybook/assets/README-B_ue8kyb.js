import{i as e}from"./preload-helper-BnI5NLmJ.js";import{y as t}from"./iframe-BW18N9uk.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-BzNmNPb2.js";import{t as c}from"./mdx-react-shim-BgL8Rosz.js";import{Default as l,Emphasis as u,Props as d,Sizes as f,n as p,t as m}from"./circular-progress.stories-o9WGSFmB.js";var h,g=e((()=>{h=`import { CircularProgress } from '@godaddy/antares';

export function DefaultExample() {
  return <CircularProgress value={60} label="Uploading…" helperText="3 of 5 files uploaded" />;
}
`})),_,v=e((()=>{_=`import { CircularProgress, Flex } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex gap="lg" alignItems="flex-end">
      <CircularProgress size="sm" value={40} label="Small" />
      <CircularProgress size="md" value={60} label="Medium" />
      <CircularProgress size="lg" value={75} label="Large" />
      <CircularProgress size="xl" value={90} label="Extra Large" />
    </Flex>
  );
}
`})),y,b=e((()=>{y=`import { CircularProgress, Flex } from '@godaddy/antares';

export function EmphasisExample() {
  return (
    <Flex gap="lg" alignItems="flex-end">
      <CircularProgress value={60} label="Default" />
      <CircularProgress emphasis="success" value={100} label="Success" helperText="Complete" />
      <CircularProgress emphasis="warning" value={70} label="Warning" helperText="Storage almost full" />
      <CircularProgress emphasis="critical" value={30} label="Critical" helperText="Action required" />
    </Flex>
  );
}
`}));function x(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(o,{of:m,name:`Overview`}),`
`,(0,C.jsx)(t.h1,{id:`circularprogress`,children:`CircularProgress`}),`
`,(0,C.jsx)(t.p,{children:`A circular progress indicator shows determinate progress of an operation over time`}),`
`,(0,C.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,C.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,C.jsx)(a,{of:d}),`
`,(0,C.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,C.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,C.jsx)(i,{of:l,inline:!0}),`
`,(0,C.jsx)(r,{language:`tsx`,code:h}),`
`,(0,C.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,C.jsxs)(t.p,{children:[`Four circle diameters are available: `,(0,C.jsx)(t.code,{children:`sm`}),` (64px), `,(0,C.jsx)(t.code,{children:`md`}),` (96px), `,(0,C.jsx)(t.code,{children:`lg`}),` (128px), and `,(0,C.jsx)(t.code,{children:`xl`}),` (160px).`]}),`
`,(0,C.jsx)(i,{of:f,inline:!0}),`
`,(0,C.jsx)(r,{language:`tsx`,code:_}),`
`,(0,C.jsx)(t.h3,{id:`emphasis`,children:`Emphasis`}),`
`,(0,C.jsxs)(t.p,{children:[`Use the `,(0,C.jsx)(t.code,{children:`emphasis`}),` prop to communicate status: `,(0,C.jsx)(t.code,{children:`success`}),`, `,(0,C.jsx)(t.code,{children:`warning`}),`, or `,(0,C.jsx)(t.code,{children:`critical`}),`. When omitted, the default teal fill is used.`]}),`
`,(0,C.jsx)(i,{of:u,inline:!0}),`
`,(0,C.jsx)(r,{language:`tsx`,code:y}),`
`,(0,C.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,C.jsx)(t.h3,{id:`aria-support`,children:`ARIA Support`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`role="progressbar"`}),` on the container`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`aria-valuenow`}),` reflects the current value (clamped to 0–100)`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`aria-valuemin`}),` and `,(0,C.jsx)(t.code,{children:`aria-valuemax`}),` define the range (default `,(0,C.jsx)(t.code,{children:`0`}),`–`,(0,C.jsx)(t.code,{children:`100`}),`)`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`aria-valuetext`}),` provides a formatted string (e.g. `,(0,C.jsx)(t.code,{children:`"60%"`}),`) via `,(0,C.jsx)(t.code,{children:`Intl.NumberFormat`}),`; the same string is rendered inside the circle. Override the text with the `,(0,C.jsx)(t.code,{children:`aria-valuetext`}),` prop, or control formatting with `,(0,C.jsx)(t.code,{children:`formatOptions`})]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`aria-labelledby`}),` associates the visible label when the `,(0,C.jsx)(t.code,{children:`label`}),` prop is provided`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`aria-describedby`}),` wires the `,(0,C.jsx)(t.code,{children:`helperText`}),` to the progressbar for screen readers`]}),`
`,(0,C.jsxs)(t.li,{children:[`The decorative SVG and output text are hidden via `,(0,C.jsx)(t.code,{children:`aria-hidden="true"`})]}),`
`]})]})}function S(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;e((()=>{C=t(),c(),s(),p(),g(),v(),b()}))();export{S as default};