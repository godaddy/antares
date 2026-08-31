import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-Biz6xSrB.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-VhroJ_WZ.js";import{t as c}from"./mdx-react-shim-AbUrKz4h.js";import{t as l}from"./runtime-CCpseHws.js";import{Default as u,Emphasis as d,Props as f,Sizes as p,n as m,t as h}from"./circular-progress.stories-6hwsBtgh.js";function g(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(o,{of:h,name:`Overview`}),`
`,(0,v.jsx)(t.h1,{id:`circularprogress`,children:`CircularProgress`}),`
`,(0,v.jsx)(t.p,{children:`A circular progress indicator shows determinate progress of an operation over time`}),`
`,(0,v.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,v.jsx)(t.pre,{children:(0,v.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,v.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,v.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,v.jsx)(t.p,{children:`A basic determinate progress indicator with a label and helper text.`}),`
`,(0,v.jsx)(i,{of:u,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { CircularProgress } from '@godaddy/antares';

export function DefaultExample() {
  return <CircularProgress value={60} label="Uploading…" helperText="3 of 5 files uploaded" />;
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,v.jsxs)(t.p,{children:[`Four circle diameters are available: `,(0,v.jsx)(t.code,{children:`sm`}),` (64px), `,(0,v.jsx)(t.code,{children:`md`}),` (96px), `,(0,v.jsx)(t.code,{children:`lg`}),` (128px), and `,(0,v.jsx)(t.code,{children:`xl`}),` (160px).`]}),`
`,(0,v.jsx)(i,{of:p,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { CircularProgress, Flex } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex gap="lg" alignItems="flex-end">
      <CircularProgress size="sm" value={40} label="Small" />
      <CircularProgress size="md" value={60} label="Medium" />
      <CircularProgress size="lg" value={75} label="Large" />
      <CircularProgress size="xl" value={90} label="Extra Large" />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`emphasis`,children:`Emphasis`}),`
`,(0,v.jsxs)(t.p,{children:[`Use the `,(0,v.jsx)(t.code,{children:`emphasis`}),` prop to communicate status: `,(0,v.jsx)(t.code,{children:`success`}),`, `,(0,v.jsx)(t.code,{children:`warning`}),`, or `,(0,v.jsx)(t.code,{children:`critical`}),`. When omitted, the default teal fill is used.`]}),`
`,(0,v.jsx)(i,{of:d,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { CircularProgress, Flex } from '@godaddy/antares';

export function EmphasisExample() {
  return (
    <Flex gap="lg" alignItems="flex-end">
      <CircularProgress value={60} label="Default" />
      <CircularProgress emphasis="success" value={100} label="Success" helperText="Complete" />
      <CircularProgress emphasis="warning" value={70} label="Warning" helperText="Storage almost full" />
      <CircularProgress emphasis="critical" value={30} label="Critical" helperText="Action required" />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,v.jsx)(t.h3,{id:`aria-support`,children:`ARIA Support`}),`
`,(0,v.jsxs)(t.ul,{children:[`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.code,{children:`role="progressbar"`}),` on the container`]}),`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.code,{children:`aria-valuenow`}),` reflects the current value (clamped to 0–100)`]}),`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.code,{children:`aria-valuemin`}),` and `,(0,v.jsx)(t.code,{children:`aria-valuemax`}),` define the range (default `,(0,v.jsx)(t.code,{children:`0`}),`–`,(0,v.jsx)(t.code,{children:`100`}),`)`]}),`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.code,{children:`aria-valuetext`}),` provides a formatted string (e.g. `,(0,v.jsx)(t.code,{children:`"60%"`}),`) via `,(0,v.jsx)(t.code,{children:`Intl.NumberFormat`}),`; the same string is rendered inside the circle. Override the text with the `,(0,v.jsx)(t.code,{children:`aria-valuetext`}),` prop, or control formatting with `,(0,v.jsx)(t.code,{children:`formatOptions`})]}),`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.code,{children:`aria-labelledby`}),` associates the visible label when the `,(0,v.jsx)(t.code,{children:`label`}),` prop is provided`]}),`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.code,{children:`aria-describedby`}),` wires the `,(0,v.jsx)(t.code,{children:`helperText`}),` to the progressbar for screen readers`]}),`
`,(0,v.jsxs)(t.li,{children:[`The decorative SVG and output text are hidden via `,(0,v.jsx)(t.code,{children:`aria-hidden="true"`})]}),`
`]}),`
`,(0,v.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,v.jsx)(a,{of:f})]})}function _(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,v.jsx)(t,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;e((()=>{v=t(),c(),s(),l(),m()}))();export{_ as default};