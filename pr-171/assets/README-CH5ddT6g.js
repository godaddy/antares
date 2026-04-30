import{j as t}from"./iframe-DY2JU6yu.js";import{useMDXComponents as o}from"./index-vMp9Gci6.js";import{M as x,A as l,a as n,S as s}from"./blocks-DR5RAoBv.js";import{S as p,P as a,X as c,Y as d,R as m}from"./axis-title.stories-CCw_zII8.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B6XwFIy4.js";import"./index-DOyM4hZy.js";import"./index-CwLu9-2K.js";import"./index-k2GvU-5S.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./index-CsIqp9IP.js";import"./context-vYBYcdXT.js";import"./SSRProvider-C-OpFMFK.js";import"./rtl-locale-provider-ze1YUf8N.js";const h=`import { AxisTitle, type AxisTitleProps } from '../src/index.tsx';

export function XAxisExample(props: Partial<AxisTitleProps>) {
  return <AxisTitle title={'Month'} axis={'x'} {...props} />;
}
`,u=`import { AxisTitle, type AxisTitleProps } from '../src/index.tsx';

export function YAxisExample(props: Partial<AxisTitleProps>) {
  return <AxisTitle title="Temperature (°F)" axis="y" {...props} />;
}
`,T=`import { AxisTitle } from '../src/index.tsx';
import { RTLProvider } from '../../../../utils/rtl-locale-provider.tsx';

export function RTLDirectionExample() {
  return (
    <RTLProvider>
      <AxisTitle title="Temperature (°F)" axis="y" />
    </RTLProvider>
  );
}
`;function r(i){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",strong:"strong",...o(),...i.components};return t.jsxs(t.Fragment,{children:[t.jsx(x,{of:p,name:"Overview"}),`
`,t.jsx(e.h1,{id:"axistitle",children:"AxisTitle"}),`
`,t.jsx(e.p,{children:"The AxisTitle is an internal component used for displaying axis titles in chart components"}),`
`,t.jsx(e.h2,{id:"internal-component",children:"Internal Component"}),`
`,t.jsxs(e.p,{children:["This component is ",t.jsx(e.strong,{children:"internal-only"})," and not exported from the package. It is designed for use within chart components."]}),`
`,t.jsx(e.h2,{id:"props",children:"Props"}),`
`,t.jsxs(e.p,{children:["The ",t.jsx(e.code,{children:"AxisTitle"})," component accepts the following props:"]}),`
`,t.jsx(l,{of:a}),`
`,t.jsx(e.h2,{id:"examples",children:"Examples"}),`
`,t.jsx(e.h3,{id:"x-axis-title",children:"X-Axis Title"}),`
`,t.jsx(e.p,{children:"X-axis title with default orientation."}),`
`,t.jsx(n,{of:c,inline:!0}),`
`,t.jsx(s,{language:"tsx",code:h}),`
`,t.jsx(e.h3,{id:"y-axis-title",children:"Y-Axis Title"}),`
`,t.jsx(e.p,{children:"Y-axis title with default orientation."}),`
`,t.jsx(n,{of:d,inline:!0}),`
`,t.jsx(s,{language:"tsx",code:u}),`
`,t.jsx(e.h2,{id:"rtl",children:"RTL"}),`
`,t.jsxs(e.p,{children:["The axis title follows the current ",t.jsx(e.strong,{children:"layout direction"})," (LTR or RTL). By default, that direction is detected automatically from the browser or system settings, so the title stays aligned with the page."]}),`
`,t.jsx(n,{of:m,inline:!0}),`
`,t.jsx(s,{language:"tsx",code:T})]})}function E(i={}){const{wrapper:e}={...o(),...i.components};return e?t.jsx(e,{...i,children:t.jsx(r,{...i})}):r(i)}export{E as default};
