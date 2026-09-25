import{i as e}from"./preload-helper-Ck4AIfeV.js";import{F as t}from"./iframe-BP0AUZEj.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DVwPA7Da.js";import{t as c}from"./mdx-react-shim-ggq8AuVo.js";import{t as l}from"./runtime-y7Cb7YYM.js";import{Default as u,Emphasis as d,Indeterminate as f,Props as p,Sizes as m,n as h,t as g}from"./circular-progress.stories-Dj-Yncnm.js";function _(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(o,{of:g,name:`Overview`}),`
`,(0,y.jsx)(t.h1,{id:`circularprogress`,children:`CircularProgress`}),`
`,(0,y.jsx)(t.p,{children:`A circular progress indicator shows determinate or indeterminate progress of an operation over time`}),`
`,(0,y.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,y.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,y.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,y.jsx)(t.p,{children:`A basic determinate progress indicator with a label and helper text.`}),`
`,(0,y.jsx)(i,{of:u,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { CircularProgress } from '@godaddy/antares';

export function DefaultExample() {
  return <CircularProgress value={60} label="Uploading…" helperText="3 of 5 files uploaded" />;
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,y.jsxs)(t.p,{children:[`Four circle diameters are available: `,(0,y.jsx)(t.code,{children:`sm`}),` (64px), `,(0,y.jsx)(t.code,{children:`md`}),` (96px), `,(0,y.jsx)(t.code,{children:`lg`}),` (128px), and `,(0,y.jsx)(t.code,{children:`xl`}),` (160px).`]}),`
`,(0,y.jsx)(i,{of:m,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { CircularProgress, Flex } from '@godaddy/antares';

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
`,(0,y.jsx)(t.h3,{id:`emphasis`,children:`Emphasis`}),`
`,(0,y.jsxs)(t.p,{children:[`Use the `,(0,y.jsx)(t.code,{children:`emphasis`}),` prop to communicate status: `,(0,y.jsx)(t.code,{children:`success`}),`, `,(0,y.jsx)(t.code,{children:`warning`}),`, or `,(0,y.jsx)(t.code,{children:`critical`}),`. When omitted, the default teal fill is used.`]}),`
`,(0,y.jsx)(i,{of:d,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { CircularProgress, Flex } from '@godaddy/antares';

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
`,(0,y.jsx)(t.h3,{id:`indeterminate`,children:`Indeterminate`}),`
`,(0,y.jsxs)(t.p,{children:[`Use indeterminate progress while preparing an upload whose total size is unknown.
Once the total is known, set `,(0,y.jsx)(t.code,{children:`isIndeterminate`}),` to false and supply a measured value.`]}),`
`,(0,y.jsx)(i,{of:f,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { CircularProgress, type CircularProgressProps } from '@godaddy/antares';

export function IndeterminateExample(props: CircularProgressProps) {
  return (
    <CircularProgress label="Preparing upload…" helperText="Calculating the total size" isIndeterminate {...props} />
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,y.jsx)(t.h3,{id:`aria-support`,children:`ARIA Support`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`role="progressbar"`}),` on the container`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`aria-valuenow`}),` is omitted while indeterminate; otherwise it reflects the current value (clamped to 0–100)`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`aria-valuemin`}),` and `,(0,y.jsx)(t.code,{children:`aria-valuemax`}),` define the range (default `,(0,y.jsx)(t.code,{children:`0`}),`–`,(0,y.jsx)(t.code,{children:`100`}),`)`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`aria-valuetext`}),` and visible value text are omitted while indeterminate; otherwise `,(0,y.jsx)(t.code,{children:`aria-valuetext`}),` provides a formatted string (e.g. `,(0,y.jsx)(t.code,{children:`"60%"`}),`) via `,(0,y.jsx)(t.code,{children:`Intl.NumberFormat`}),`; the same string is rendered inside the circle. Override the text with the `,(0,y.jsx)(t.code,{children:`aria-valuetext`}),` prop, or control formatting with `,(0,y.jsx)(t.code,{children:`formatOptions`})]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`aria-labelledby`}),` associates the visible label when the `,(0,y.jsx)(t.code,{children:`label`}),` prop is provided`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`aria-describedby`}),` wires the `,(0,y.jsx)(t.code,{children:`helperText`}),` to the progressbar for screen readers`]}),`
`,(0,y.jsxs)(t.li,{children:[`The decorative SVG and output text are hidden via `,(0,y.jsx)(t.code,{children:`aria-hidden="true"`})]}),`
`]}),`
`,(0,y.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,y.jsx)(t.h3,{id:`circularprogress-1`,children:`CircularProgress`}),`
`,(0,y.jsx)(a,{of:p})]})}function v(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,y.jsx)(t,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;e((()=>{y=t(),c(),s(),l(),h()}))();export{v as default};