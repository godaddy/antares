import{j as t}from"./iframe-D2-EpC0g.js";import{useMDXComponents as r}from"./index-DvmY9G4Q.js";import{M as x,A as l,a as n,S as s}from"./blocks-txxGaFmm.js";import{S as p,P as a,X as c,Y as d,R as h}from"./axis-title.stories-Bq9IXkoc.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C8b_sUIU.js";import"./index-COy0Rrls.js";import"./index-bC-EB4tx.js";import"./index-DrFu-skq.js";import"./index-DJZg684p.js";import"./index-BQF4FSOY.js";import"./clsx-Cdd8U6Z_.js";import"./context-CWUbHZmo.js";const m=`import { AxisTitle, type AxisTitleProps } from '../src/index.tsx';

export function XAxisExample(props: Partial<AxisTitleProps>) {
  return <AxisTitle title={'Month'} axis={'x'} {...props} />;
}
`,u=`import { AxisTitle, type AxisTitleProps } from '../src/index.tsx';

export function YAxisExample(props: Partial<AxisTitleProps>) {
  return <AxisTitle title="Temperature (°F)" axis="y" {...props} />;
}
`,f=`import { AxisTitle } from '../src/index.tsx';

export function RTLDirectionExample() {
  return <AxisTitle title="Temperature (°F)" axis="y" dir="rtl" />;
}
`;function o(e){const i={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",strong:"strong",...r(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(x,{of:p,name:"Overview"}),`
`,t.jsx(i.h1,{id:"axistitle",children:"AxisTitle"}),`
`,t.jsx(i.p,{children:"The AxisTitle is an internal component used for displaying axis titles in chart components"}),`
`,t.jsx(i.h2,{id:"internal-component",children:"Internal Component"}),`
`,t.jsxs(i.p,{children:["This component is ",t.jsx(i.strong,{children:"internal-only"})," and not exported from the package. It is designed for use within chart components."]}),`
`,t.jsx(i.h2,{id:"props",children:"Props"}),`
`,t.jsxs(i.p,{children:["The ",t.jsx(i.code,{children:"AxisTitle"})," component accepts the following props:"]}),`
`,t.jsx(l,{of:a}),`
`,t.jsx(i.h2,{id:"examples",children:"Examples"}),`
`,t.jsx(i.h3,{id:"x-axis-title",children:"X-Axis Title"}),`
`,t.jsx(i.p,{children:"X-axis title with default orientation."}),`
`,t.jsx(n,{of:c,inline:!0}),`
`,t.jsx(s,{language:"tsx",code:m}),`
`,t.jsx(i.h3,{id:"y-axis-title",children:"Y-Axis Title"}),`
`,t.jsx(i.p,{children:"Y-axis title with default orientation."}),`
`,t.jsx(n,{of:d,inline:!0}),`
`,t.jsx(s,{language:"tsx",code:u}),`
`,t.jsx(i.h2,{id:"rtl-right-to-left",children:"RTL (Right-to-Left)"}),`
`,t.jsxs(i.p,{children:["Optional ",t.jsx(i.code,{children:"dir"})," prop, defaults to locale. RTL only affects the y-axis."]}),`
`,t.jsx(n,{of:h,inline:!0}),`
`,t.jsx(s,{language:"tsx",code:f})]})}function Y(e={}){const{wrapper:i}={...r(),...e.components};return i?t.jsx(i,{...e,children:t.jsx(o,{...e})}):o(e)}export{Y as default};
