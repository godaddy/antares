import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-zBL4Pu3Y.js";import{a as l,c as u,i as d,l as f,n as p,o as m,r as h,s as g,t as _}from"./circular-progress.stories-DFJqjcLo.js";function v(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(s,{of:u,name:`Overview`}),`
`,(0,b.jsx)(t.h1,{id:`circularprogress`,children:`CircularProgress`}),`
`,(0,b.jsx)(t.p,{children:`Composable circular progress with optional value, label, and description`}),`
`,(0,b.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,b.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,b.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,b.jsx)(t.p,{children:`Compose a circular track, formatted value, label, and description.`}),`
`,(0,b.jsx)(a,{of:_,inline:!0}),`
`,(0,b.jsx)(i,{code:`import { Box, CircularProgress, Label, Text, type CircularProgressProps } from '@godaddy/antares';

export function DefaultExample(props: CircularProgressProps) {
  return (
    <CircularProgress value={60} {...props}>
      <Box slot="track" />
      <Box slot="value" />
      <Label>Uploading…</Label>
      <Text slot="description">3 of 5 files uploaded</Text>
    </CircularProgress>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,b.jsxs)(t.p,{children:[`Four circle diameters are available: `,(0,b.jsx)(t.code,{children:`sm`}),` (64px), `,(0,b.jsx)(t.code,{children:`md`}),` (96px), `,(0,b.jsx)(t.code,{children:`lg`}),` (128px), and `,(0,b.jsx)(t.code,{children:`xl`}),` (160px).`]}),`
`,(0,b.jsx)(a,{of:d,inline:!0}),`
`,(0,b.jsx)(i,{code:`import { Box, CircularProgress, Flex, Label } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex gap="lg" alignItems="flex-end">
      <CircularProgress size="sm" value={40}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Small</Label>
      </CircularProgress>
      <CircularProgress size="md" value={60}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Medium</Label>
      </CircularProgress>
      <CircularProgress size="lg" value={75}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Large</Label>
      </CircularProgress>
      <CircularProgress size="xl" value={90}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Extra Large</Label>
      </CircularProgress>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`statuses`,children:`Statuses`}),`
`,(0,b.jsxs)(t.p,{children:[`Use the `,(0,b.jsx)(t.code,{children:`status`}),` prop to communicate progress: `,(0,b.jsx)(t.code,{children:`default`}),`, `,(0,b.jsx)(t.code,{children:`success`}),`, `,(0,b.jsx)(t.code,{children:`warning`}),`, or `,(0,b.jsx)(t.code,{children:`critical`}),`.
When omitted, the default teal fill is used.`]}),`
`,(0,b.jsx)(a,{of:m,inline:!0}),`
`,(0,b.jsx)(i,{code:`import { Box, CircularProgress, Flex, Label, Text } from '@godaddy/antares';

export function StatusesExample() {
  return (
    <Flex gap="lg" alignItems="flex-end">
      <CircularProgress status="default" value={60}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Default</Label>
      </CircularProgress>
      <CircularProgress status="success" value={100}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Success</Label>
        <Text slot="description">Complete</Text>
      </CircularProgress>
      <CircularProgress status="warning" value={70}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Warning</Label>
        <Text slot="description">Storage almost full</Text>
      </CircularProgress>
      <CircularProgress status="critical" value={30}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Critical</Label>
        <Text slot="description">Action required</Text>
      </CircularProgress>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`indeterminate`,children:`Indeterminate`}),`
`,(0,b.jsxs)(t.p,{children:[`Use indeterminate progress while preparing an upload whose total size is unknown.
Once the total is known, set `,(0,b.jsx)(t.code,{children:`isIndeterminate`}),` to false and supply a measured value.`]}),`
`,(0,b.jsx)(a,{of:p,inline:!0}),`
`,(0,b.jsx)(i,{code:`import { Box, CircularProgress, Label, Text, type CircularProgressProps } from '@godaddy/antares';

export function IndeterminateExample(props: CircularProgressProps) {
  return (
    <CircularProgress isIndeterminate {...props}>
      <Box slot="track" />
      <Box slot="value" />
      <Label>Preparing upload…</Label>
      <Text slot="description">Calculating the total size</Text>
    </CircularProgress>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`slots`,children:`Slots`}),`
`,(0,b.jsx)(t.p,{children:`Compose only the parts you need. Box and Text value slots share formatted defaults;
the root's render function supplies progress state for custom content.`}),`
`,(0,b.jsx)(a,{of:l,inline:!0}),`
`,(0,b.jsx)(i,{code:`import { Box, CircularProgress, Flex, Label, Text } from '@godaddy/antares';

export function SlotsExample() {
  return (
    <Flex gap="lg" wrap="wrap" alignItems="start">
      <CircularProgress value={60} size="sm">
        <Box slot="track" />
        <Box slot="value" />
        <Label>Box value</Label>
        <Text slot="description">Processing files</Text>
      </CircularProgress>
      <CircularProgress value={60} size="sm">
        <Box slot="track" />
        <Text slot="value" />
        <Label>Text value</Label>
      </CircularProgress>
      <CircularProgress value={60} size="sm">
        {({ percentage }) => (
          <>
            <Box slot="track" />
            <Box slot="value">{percentage}/100</Box>
            <Label>Custom value</Label>
          </>
        )}
      </CircularProgress>
      <CircularProgress value={60} size="sm">
        <Box slot="track" />
        <Label>Without value</Label>
      </CircularProgress>
      <CircularProgress aria-label="Track only" value={60} size="sm">
        <Box slot="track" />
      </CircularProgress>
      <CircularProgress aria-label="Preparing upload" isIndeterminate size="sm">
        <Box slot="track" />
      </CircularProgress>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`value-display`,children:`Value Display`}),`
`,(0,b.jsx)(t.p,{children:`Custom ranges determine the completion percentage, while formatOptions controls the formatted value.
Set valueLabel to override both the accessible value text and the default visible value.`}),`
`,(0,b.jsx)(a,{of:g,inline:!0}),`
`,(0,b.jsx)(i,{code:`import { Box, CircularProgress, Flex, Label } from '@godaddy/antares';

export function ValueDisplayExample() {
  return (
    <Flex gap="lg" wrap="wrap" alignItems="start">
      <CircularProgress value={60} minValue={20} maxValue={100}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Custom range</Label>
      </CircularProgress>
      <CircularProgress value={60} formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Budget used</Label>
      </CircularProgress>
      <CircularProgress value={3} maxValue={5} valueLabel="3 of 5">
        <Box slot="track" />
        <Box slot="value" />
        <Label>Files uploaded</Label>
      </CircularProgress>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,b.jsxs)(t.p,{children:[`Compose `,(0,b.jsx)(t.code,{children:`Box slot="track"`}),` for the circular indicator and `,(0,b.jsx)(t.code,{children:`Box slot="value"`}),` or `,(0,b.jsx)(t.code,{children:`Text slot="value"`}),`
for formatted or custom content. The root's children render function provides progress state,
including `,(0,b.jsx)(t.code,{children:`percentage`}),`, `,(0,b.jsx)(t.code,{children:`valueText`}),`, and `,(0,b.jsx)(t.code,{children:`isIndeterminate`}),`. Custom ranges and `,(0,b.jsx)(t.code,{children:`formatOptions`}),` apply
consistently to the indicator and formatted value. Use `,(0,b.jsx)(t.code,{children:`valueLabel`}),` to customize the accessible
value text and the default visible value together.`]}),`
`,(0,b.jsxs)(t.p,{children:[`Use `,(0,b.jsx)(t.code,{children:`status="default"`}),`, `,(0,b.jsx)(t.code,{children:`"success"`}),`, `,(0,b.jsx)(t.code,{children:`"warning"`}),`, or `,(0,b.jsx)(t.code,{children:`"critical"`}),` to choose the fill color,
matching ProgressBar. The default is `,(0,b.jsx)(t.code,{children:`"default"`}),`.`]}),`
`,(0,b.jsxs)(t.p,{children:[`The track and value share a grid area so the value is centered over the circle. Customize the
layout with Grid props, `,(0,b.jsx)(t.code,{children:`className`}),`, and `,(0,b.jsx)(t.code,{children:`style`}),`. Omit any optional part without changing the
progress semantics.`]}),`
`,(0,b.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[`Provide `,(0,b.jsx)(t.code,{children:`Label`}),`, `,(0,b.jsx)(t.code,{children:`aria-label`}),`, or `,(0,b.jsx)(t.code,{children:`aria-labelledby`}),` for the accessible name.`]}),`
`,(0,b.jsxs)(t.li,{children:[`The root retains `,(0,b.jsx)(t.code,{children:`role="progressbar"`}),`, including when no visible value is composed.`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.code,{children:`Text slot="description"`}),` is associated automatically after hydration, preserving external `,(0,b.jsx)(t.code,{children:`aria-describedby`}),` references.
For an association in server-rendered HTML, explicitly set the description's `,(0,b.jsx)(t.code,{children:`id`}),` and the root's `,(0,b.jsx)(t.code,{children:`aria-describedby`}),`.`]}),`
`,(0,b.jsxs)(t.li,{children:[`Indeterminate progress hides the value slot and omits `,(0,b.jsx)(t.code,{children:`aria-valuenow`}),` and `,(0,b.jsx)(t.code,{children:`aria-valuetext`}),`.
Known limitation: custom `,(0,b.jsx)(t.code,{children:`Text slot="value"`}),` content with `,(0,b.jsx)(t.code,{children:`maxLines`}),` can remain visible.
Omit `,(0,b.jsx)(t.code,{children:`maxLines`}),` or use the children render function to omit the value slot while `,(0,b.jsx)(t.code,{children:`isIndeterminate`}),` is true.`]}),`
`,(0,b.jsx)(t.li,{children:`The circular track and repeated visible value are decorative and hidden from assistive technology.`}),`
`,(0,b.jsx)(t.li,{children:`Reduced motion stops the activity animation while keeping the indicator visible.`}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-tsx`,children:`<CircularProgress>
  <Box slot="track" />
  <Box slot="value" />
  <Label />
  <Text slot="description" />
  {/* ... */}
</CircularProgress>
`})}),`
`,(0,b.jsx)(t.h3,{id:`circularprogress-1`,children:`CircularProgress`}),`
`,(0,b.jsx)(o,{of:h})]})}function y(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;function x(){return(x=e((()=>{b=t(),n(),c(),f()})))()}x();export{y as default};