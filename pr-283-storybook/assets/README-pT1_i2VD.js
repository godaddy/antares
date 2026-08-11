import{i as e}from"./preload-helper-DEA0MoIu.js";import{y as t}from"./iframe-B2G0Hq-i.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DSEjgYg3.js";import{t as c}from"./mdx-react-shim-Cq_S-41Z.js";import{Default as l,Props as u,n as d,t as f}from"./image.stories-LaWEhGmd.js";var p,m=e((()=>{p=`import { Image } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 320 180%22%3E%3Crect width=%22320%22 height=%22180%22 fill=%22%23145fa9%22/%3E%3Ctext x=%22160%22 y=%2298%22 fill=%22white%22 font-family=%22Arial%22 font-size=%2228%22 text-anchor=%22middle%22%3EGoDaddy%3C/text%3E%3C/svg%3E';

export function DefaultExample() {
  return <Image src={image} alt="GoDaddy blue brand panel" width={320} height={180} />;
}
`}));function h(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(o,{of:f,name:`Overview`}),`
`,(0,_.jsx)(t.h1,{id:`image`,children:`Image`}),`
`,(0,_.jsx)(t.p,{children:`A native image element that inherits presentation and behavior from its Antares parent.`}),`
`,(0,_.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsxs)(t.li,{children:[`Renders a native `,(0,_.jsx)(t.code,{children:`<img>`}),` and accepts all of its attributes`]}),`
`,(0,_.jsx)(t.li,{children:`Inherits presentation and behavior when composed inside Antares components such as Avatar`}),`
`,(0,_.jsx)(t.li,{children:`Ships no default styles, loading state, or fallback so it stays predictable everywhere`}),`
`]}),`
`,(0,_.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,_.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,_.jsx)(a,{of:u}),`
`,(0,_.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,_.jsx)(t.h3,{id:`basic-image`,children:`Basic image`}),`
`,(0,_.jsxs)(t.p,{children:[`Use Image anywhere you would use an `,(0,_.jsx)(t.code,{children:`<img>`}),`. It behaves the same and gains Antares styling only from the component it is composed within.`]}),`
`,(0,_.jsx)(r,{language:`tsx`,code:p}),`
`,(0,_.jsx)(i,{of:l,inline:!0}),`
`,(0,_.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,_.jsxs)(t.ul,{children:[`
`,(0,_.jsxs)(t.li,{children:[`Provide concise, meaningful `,(0,_.jsx)(t.code,{children:`alt`}),` text when the image conveys information.`]}),`
`,(0,_.jsxs)(t.li,{children:[`Use `,(0,_.jsx)(t.code,{children:`alt=""`}),` for decorative images or images already described by adjacent text.`]}),`
`,(0,_.jsxs)(t.li,{children:[`Set `,(0,_.jsx)(t.code,{children:`width`}),` and `,(0,_.jsx)(t.code,{children:`height`}),` when known to reserve space and reduce layout shift.`]}),`
`]})]})}function g(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;e((()=>{_=t(),c(),s(),m(),d()}))();export{g as default};