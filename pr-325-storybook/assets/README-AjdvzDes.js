import{i as e}from"./preload-helper-HTw_Lvtv.js";import{F as t}from"./iframe-BJS0_HPs.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-CCORFJJM.js";import{t as c}from"./mdx-react-shim-BrEuHm1q.js";import{t as l}from"./runtime-D_SOo3nE.js";import{Props as u,RTLDirection as d,XAxis as f,YAxis as p,n as m,t as h}from"./axis-title.stories-PaSGDr3D.js";function g(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...n(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(o,{of:h,name:`Overview`}),`
`,(0,v.jsx)(t.h1,{id:`axistitle`,children:`AxisTitle`}),`
`,(0,v.jsx)(t.p,{children:`The AxisTitle is an internal component used for displaying axis titles in chart components`}),`
`,(0,v.jsx)(t.h2,{id:`internal-component`,children:`Internal Component`}),`
`,(0,v.jsxs)(t.p,{children:[`This component is `,(0,v.jsx)(t.strong,{children:`internal-only`}),` and not exported from the package. It is designed for use within chart components.`]}),`
`,(0,v.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,v.jsx)(t.h3,{id:`x-axis-title`,children:`X-Axis Title`}),`
`,(0,v.jsx)(t.p,{children:`X-axis title with default orientation.`}),`
`,(0,v.jsx)(i,{of:f,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { AxisTitle, type AxisTitleProps } from '../src/index.tsx';

export function XAxisExample(props: Partial<AxisTitleProps>) {
  return <AxisTitle title={'Month'} axis={'x'} {...props} />;
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`y-axis-title`,children:`Y-Axis Title`}),`
`,(0,v.jsx)(t.p,{children:`Y-axis title with default orientation.`}),`
`,(0,v.jsx)(i,{of:p,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { AxisTitle, type AxisTitleProps } from '../src/index.tsx';

export function YAxisExample(props: Partial<AxisTitleProps>) {
  return <AxisTitle title="Temperature (°F)" axis="y" {...props} />;
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`rtl-direction`,children:`RTL Direction`}),`
`,(0,v.jsxs)(t.p,{children:[`The axis title follows the current `,(0,v.jsx)(t.strong,{children:`layout direction`}),` (LTR or RTL). By default, that direction is detected automatically from the browser or system settings, so the title stays aligned with the page.`]}),`
`,(0,v.jsx)(i,{of:d,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { AxisTitle } from '../src/index.tsx';
import { RTLProvider } from '#utils/rtl-locale-provider.tsx';

export function RTLDirectionExample() {
  return (
    <RTLProvider>
      <AxisTitle title="Temperature (°F)" axis="y" />
    </RTLProvider>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,v.jsxs)(t.p,{children:[`The `,(0,v.jsx)(t.code,{children:`AxisTitle`}),` component accepts the following props:`]}),`
`,(0,v.jsx)(a,{of:u})]})}function _(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,v.jsx)(t,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;e((()=>{v=t(),c(),s(),l(),m()}))();export{_ as default};