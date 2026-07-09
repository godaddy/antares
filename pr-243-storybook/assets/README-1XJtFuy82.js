import{i as e}from"./preload-helper-r38FjZtB.js";import{y as t}from"./iframe-B_kZb_nK.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DM1WPZlj.js";import{t as c}from"./mdx-react-shim-CHlMYpzY.js";import{Props as l,RTLDirection as u,XAxis as d,YAxis as f,n as p,t as m}from"./axis-title.stories-e_PyHMau.js";var h,g=e((()=>{h=`import { AxisTitle, type AxisTitleProps } from '../src/index.tsx';

export function XAxisExample(props: Partial<AxisTitleProps>) {
  return <AxisTitle title={'Month'} axis={'x'} {...props} />;
}
`})),_,v=e((()=>{_=`import { AxisTitle, type AxisTitleProps } from '../src/index.tsx';

export function YAxisExample(props: Partial<AxisTitleProps>) {
  return <AxisTitle title="Temperature (°F)" axis="y" {...props} />;
}
`})),y,b=e((()=>{y=`import { AxisTitle } from '../src/index.tsx';
import { RTLProvider } from '../../../../../utils/rtl-locale-provider.tsx';

export function RTLDirectionExample() {
  return (
    <RTLProvider>
      <AxisTitle title="Temperature (°F)" axis="y" />
    </RTLProvider>
  );
}
`}));function x(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...n(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(o,{of:m,name:`Overview`}),`
`,(0,C.jsx)(t.h1,{id:`axistitle`,children:`AxisTitle`}),`
`,(0,C.jsx)(t.p,{children:`The AxisTitle is an internal component used for displaying axis titles in chart components`}),`
`,(0,C.jsx)(t.h2,{id:`internal-component`,children:`Internal Component`}),`
`,(0,C.jsxs)(t.p,{children:[`This component is `,(0,C.jsx)(t.strong,{children:`internal-only`}),` and not exported from the package. It is designed for use within chart components.`]}),`
`,(0,C.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,C.jsxs)(t.p,{children:[`The `,(0,C.jsx)(t.code,{children:`AxisTitle`}),` component accepts the following props:`]}),`
`,(0,C.jsx)(a,{of:l}),`
`,(0,C.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,C.jsx)(t.h3,{id:`x-axis-title`,children:`X-Axis Title`}),`
`,(0,C.jsx)(t.p,{children:`X-axis title with default orientation.`}),`
`,(0,C.jsx)(i,{of:d,inline:!0}),`
`,(0,C.jsx)(r,{language:`tsx`,code:h}),`
`,(0,C.jsx)(t.h3,{id:`y-axis-title`,children:`Y-Axis Title`}),`
`,(0,C.jsx)(t.p,{children:`Y-axis title with default orientation.`}),`
`,(0,C.jsx)(i,{of:f,inline:!0}),`
`,(0,C.jsx)(r,{language:`tsx`,code:_}),`
`,(0,C.jsx)(t.h2,{id:`rtl`,children:`RTL`}),`
`,(0,C.jsxs)(t.p,{children:[`The axis title follows the current `,(0,C.jsx)(t.strong,{children:`layout direction`}),` (LTR or RTL). By default, that direction is detected automatically from the browser or system settings, so the title stays aligned with the page.`]}),`
`,(0,C.jsx)(i,{of:u,inline:!0}),`
`,(0,C.jsx)(r,{language:`tsx`,code:y})]})}function S(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;e((()=>{C=t(),c(),s(),p(),g(),v(),b()}))();export{S as default};