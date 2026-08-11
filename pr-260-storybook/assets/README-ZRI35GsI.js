import{i as e}from"./preload-helper-DPdjVz-1.js";import{y as t}from"./iframe-CYdf8QrK.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-B6bqtN3l.js";import{t as c}from"./mdx-react-shim-qbjzw7Mt.js";import{Props as l,RTLDirection as u,XAxis as d,YAxis as f,n as p,t as m}from"./axis-title.stories-CB1eW4fW.js";function h(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...n(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(o,{of:m,name:`Overview`}),`
`,(0,_.jsx)(t.h1,{id:`axistitle`,children:`AxisTitle`}),`
`,(0,_.jsx)(t.p,{children:`The AxisTitle is an internal component used for displaying axis titles in chart components`}),`
`,(0,_.jsx)(t.h2,{id:`internal-component`,children:`Internal Component`}),`
`,(0,_.jsxs)(t.p,{children:[`This component is `,(0,_.jsx)(t.strong,{children:`internal-only`}),` and not exported from the package. It is designed for use within chart components.`]}),`
`,(0,_.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,_.jsx)(t.h3,{id:`x-axis-title`,children:`X-Axis Title`}),`
`,(0,_.jsx)(t.p,{children:`X-axis title with default orientation.`}),`
`,(0,_.jsx)(i,{of:d,inline:!0}),`
`,(0,_.jsx)(r,{code:`import { AxisTitle, type AxisTitleProps } from '../src/index.tsx';

export function XAxisExample(props: Partial<AxisTitleProps>) {
  return <AxisTitle title={'Month'} axis={'x'} {...props} />;
}`,language:`tsx`}),`
`,(0,_.jsx)(t.h3,{id:`y-axis-title`,children:`Y-Axis Title`}),`
`,(0,_.jsx)(t.p,{children:`Y-axis title with default orientation.`}),`
`,(0,_.jsx)(i,{of:f,inline:!0}),`
`,(0,_.jsx)(r,{code:`import { AxisTitle, type AxisTitleProps } from '../src/index.tsx';

export function YAxisExample(props: Partial<AxisTitleProps>) {
  return <AxisTitle title="Temperature (°F)" axis="y" {...props} />;
}`,language:`tsx`}),`
`,(0,_.jsx)(t.h3,{id:`rtl-direction`,children:`RTL Direction`}),`
`,(0,_.jsxs)(t.p,{children:[`The axis title follows the current `,(0,_.jsx)(t.strong,{children:`layout direction`}),` (LTR or RTL). By default, that direction is detected automatically from the browser or system settings, so the title stays aligned with the page.`]}),`
`,(0,_.jsx)(i,{of:u,inline:!0}),`
`,(0,_.jsx)(r,{code:`import { AxisTitle } from '../src/index.tsx';
import { RTLProvider } from '../../../../../utils/rtl-locale-provider.tsx';

export function RTLDirectionExample() {
  return (
    <RTLProvider>
      <AxisTitle title="Temperature (°F)" axis="y" />
    </RTLProvider>
  );
}`,language:`tsx`}),`
`,(0,_.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`AxisTitle`}),` component accepts the following props:`]}),`
`,(0,_.jsx)(a,{of:l})]})}function g(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;e((()=>{_=t(),c(),s(),p()}))();export{g as default};