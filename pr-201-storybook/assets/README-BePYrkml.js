import{j as e}from"./iframe-B_XvV7CY.js";import{u as t,M as l,A as o,a,S as i}from"./blocks-DI7fewAK.js";import{S as c,P as d,D as x,a as h,b as p}from"./progress-bar.stories-BNXxjkAh.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BpwH3HVJ.js";import"./index-nU4GYxAx.js";import"./index-CuQRGrwp.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./useLabel-Dehw8yOx.js";import"./Text-UYduh6qR.js";import"./SSRProvider-Babacl1u.js";import"./ProgressBar-DYD8Z5xy.js";import"./filterDOMProps-SeKkUh_q.js";import"./I18nProvider-BB58OBzh.js";import"./number-P4c4HRxZ.js";import"./index-BU6kDO4d.js";import"./index-B1_NATH6.js";import"./index-Cx2ZJ0h9.js";const u=`import { ProgressBar } from '@godaddy/antares';

export function DefaultExample() {
  return <ProgressBar label="Loading…" value={60} helperText="Please wait while we process your request" />;
}
`,m=`import { ProgressBar, Flex } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar label="Extra Small" size="xs" value={40} />
      <ProgressBar label="Small" size="sm" value={60} />
      <ProgressBar label="Medium" size="md" value={80} />
    </Flex>
  );
}
`,j=`import { ProgressBar, Flex } from '@godaddy/antares';

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
`;function n(s){const r={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:c,name:"Overview"}),`
`,e.jsx(r.h1,{id:"progressbar",children:"ProgressBar"}),`
`,e.jsx(r.p,{children:"A progress bar shows determinate progress of an operation over time"}),`
`,e.jsx(r.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(r.h2,{id:"props",children:"Props"}),`
`,e.jsx(o,{of:d}),`
`,e.jsx(r.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(r.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(a,{of:x,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:u}),`
`,e.jsx(r.h3,{id:"sizes",children:"Sizes"}),`
`,e.jsxs(r.p,{children:["Three track heights are available: ",e.jsx(r.code,{children:"xs"})," (6px), ",e.jsx(r.code,{children:"sm"})," (12px), and ",e.jsx(r.code,{children:"md"})," (24px)."]}),`
`,e.jsx(a,{of:h,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:m}),`
`,e.jsx(r.h3,{id:"statuses",children:"Statuses"}),`
`,e.jsxs(r.p,{children:["Use the ",e.jsx(r.code,{children:"status"})," prop to communicate intent: ",e.jsx(r.code,{children:"default"}),", ",e.jsx(r.code,{children:"success"}),", ",e.jsx(r.code,{children:"warning"}),", or ",e.jsx(r.code,{children:"critical"}),". Pair with ",e.jsx(r.code,{children:"helperText"})," to provide additional context."]}),`
`,e.jsx(a,{of:p,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:j}),`
`,e.jsx(r.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(r.h3,{id:"aria-support",children:"ARIA Support"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[e.jsx(r.code,{children:'role="progressbar"'})," on the container"]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.code,{children:"aria-valuenow"})," reflects the current value"]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.code,{children:"aria-valuemin"})," and ",e.jsx(r.code,{children:"aria-valuemax"})," define the range (default ",e.jsx(r.code,{children:"0"}),"–",e.jsx(r.code,{children:"100"}),")"]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.code,{children:"aria-valuetext"})," provides a formatted string (e.g. ",e.jsx(r.code,{children:'"60%"'}),")"]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.code,{children:"aria-labelledby"})," associates the visible label when the ",e.jsx(r.code,{children:"label"})," prop is provided"]}),`
`]})]})}function q(s={}){const{wrapper:r}={...t(),...s.components};return r?e.jsx(r,{...s,children:e.jsx(n,{...s})}):n(s)}export{q as default};
