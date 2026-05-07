import{j as t}from"./iframe-Du6PjlSZ.js";import{useMDXComponents as o}from"./index-PW5r9cRf.js";import{M as x,A as l,a as n,S as s}from"./blocks-F0Y6jiat.js";import{S as p,P as a,X as c,Y as d,R as m}from"./axis-title.stories-76N9cGlQ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-niWSmtgG.js";import"./index-BtT7aVaE.js";import"./index-c3mBs9B0.js";import"./index-BBcyH5Pg.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./index-CQAGP5rC.js";import"./index-CxNDvpBG.js";import"./context-e3X6BKIn.js";import"./SSRProvider-Ne4r0eXS.js";import"./rtl-locale-provider-mDpLnFMo.js";const h=`import { AxisTitle, type AxisTitleProps } from '../src/index.tsx';

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
`;function r(e){const i={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",strong:"strong",...o(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(x,{of:p,name:"Overview"}),`
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
`,t.jsx(s,{language:"tsx",code:h}),`
`,t.jsx(i.h3,{id:"y-axis-title",children:"Y-Axis Title"}),`
`,t.jsx(i.p,{children:"Y-axis title with default orientation."}),`
`,t.jsx(n,{of:d,inline:!0}),`
`,t.jsx(s,{language:"tsx",code:u}),`
`,t.jsx(i.h2,{id:"rtl",children:"RTL"}),`
`,t.jsxs(i.p,{children:["The axis title follows the current ",t.jsx(i.strong,{children:"layout direction"})," (LTR or RTL). By default, that direction is detected automatically from the browser or system settings, so the title stays aligned with the page."]}),`
`,t.jsx(n,{of:m,inline:!0}),`
`,t.jsx(s,{language:"tsx",code:T})]})}function C(e={}){const{wrapper:i}={...o(),...e.components};return i?t.jsx(i,{...e,children:t.jsx(r,{...e})}):r(e)}export{C as default};
