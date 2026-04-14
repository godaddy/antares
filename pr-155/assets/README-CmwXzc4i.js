import{j as t}from"./iframe-6KxP5Rco.js";import{useMDXComponents as r}from"./index-C9ZlnsW2.js";import{M as x,A as l,a as n,S as s}from"./blocks-BO69z257.js";import{S as a,P as p,X as c,Y as d,R as h}from"./axis-title.stories-zF3M5w1q.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BWIm-ihg.js";import"./index-DilDMYJ2.js";import"./index-Bl5aJP1Z.js";import"./index-DrFu-skq.js";import"./rtl-locale-provider-Lmyl8pNk.js";import"./context-Czc_YNuE.js";import"./clsx-CkKzQDNR.js";import"./index-CbS9TuOM.js";import"./index-BqYlCj7V.js";const m=`import { AxisTitle, type AxisTitleProps } from '../src/index.tsx';

export function XAxisExample(props: Partial<AxisTitleProps>) {
  return <AxisTitle title={'Month'} axis={'x'} {...props} />;
}
`,u=`import { AxisTitle, type AxisTitleProps } from '../src/index.tsx';

export function YAxisExample(props: Partial<AxisTitleProps>) {
  return <AxisTitle title="Temperature (°F)" axis="y" {...props} />;
}
`,j=`import { AxisTitle } from '../src/index.tsx';

export function RTLDirectionExample() {
  return <AxisTitle title="Temperature (°F)" axis="y" />;
}
`;function o(i){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",strong:"strong",...r(),...i.components};return t.jsxs(t.Fragment,{children:[t.jsx(x,{of:a,name:"Overview"}),`
`,t.jsx(e.h1,{id:"axistitle",children:"AxisTitle"}),`
`,t.jsx(e.p,{children:"The AxisTitle is an internal component used for displaying axis titles in chart components"}),`
`,t.jsx(e.h2,{id:"internal-component",children:"Internal Component"}),`
`,t.jsxs(e.p,{children:["This component is ",t.jsx(e.strong,{children:"internal-only"})," and not exported from the package. It is designed for use within chart components."]}),`
`,t.jsx(e.h2,{id:"props",children:"Props"}),`
`,t.jsxs(e.p,{children:["The ",t.jsx(e.code,{children:"AxisTitle"})," component accepts the following props:"]}),`
`,t.jsx(l,{of:p}),`
`,t.jsx(e.h2,{id:"examples",children:"Examples"}),`
`,t.jsx(e.h3,{id:"x-axis-title",children:"X-Axis Title"}),`
`,t.jsx(e.p,{children:"X-axis title with default orientation."}),`
`,t.jsx(n,{of:c,inline:!0}),`
`,t.jsx(s,{language:"tsx",code:m}),`
`,t.jsx(e.h3,{id:"y-axis-title",children:"Y-Axis Title"}),`
`,t.jsx(e.p,{children:"Y-axis title with default orientation."}),`
`,t.jsx(n,{of:d,inline:!0}),`
`,t.jsx(s,{language:"tsx",code:u}),`
`,t.jsx(e.h2,{id:"rtl",children:"RTL"}),`
`,t.jsxs(e.p,{children:["The axis title follows the current ",t.jsx(e.strong,{children:"layout direction"})," (LTR or RTL). By default, that direction is detected automatically from the browser or system settings, so the title stays aligned with the page."]}),`
`,t.jsx(n,{of:h,inline:!0}),`
`,t.jsx(s,{language:"tsx",code:j})]})}function E(i={}){const{wrapper:e}={...r(),...i.components};return e?t.jsx(e,{...i,children:t.jsx(o,{...i})}):o(i)}export{E as default};
