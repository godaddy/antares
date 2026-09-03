import{i as e}from"./preload-helper-Cm6E7gqZ.js";import{F as t}from"./iframe-CrqLB-N1.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-CjQZ2XWS.js";import{t as c}from"./mdx-react-shim-CWiof15K.js";import{t as l}from"./runtime-ClaidU16.js";import{Default as u,Props as d,n as f,t as p}from"./image.stories-Bf8SGX5e.js";function m(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o,{of:p,name:`Overview`}),`
`,(0,g.jsx)(t.h1,{id:`image`,children:`Image`}),`
`,(0,g.jsx)(t.p,{children:`A native image element that inherits presentation and behavior from its Antares parent.`}),`
`,(0,g.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,g.jsxs)(t.ul,{children:[`
`,(0,g.jsxs)(t.li,{children:[`Renders a native `,(0,g.jsx)(t.code,{children:`<img>`}),` and accepts all of its attributes`]}),`
`,(0,g.jsx)(t.li,{children:`Inherits presentation and behavior when composed inside Antares components such as Avatar`}),`
`,(0,g.jsx)(t.li,{children:`Ships no default styles, loading state, or fallback so it stays predictable everywhere`}),`
`]}),`
`,(0,g.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,g.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,g.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,g.jsx)(t.p,{children:`Render an image with alternative text and explicit dimensions.`}),`
`,(0,g.jsx)(i,{of:u,inline:!0}),`
`,(0,g.jsx)(r,{code:`import { Image } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 320 180%22%3E%3Crect width=%22320%22 height=%22180%22 fill=%22%23145fa9%22/%3E%3Ctext x=%22160%22 y=%2298%22 fill=%22white%22 font-family=%22Arial%22 font-size=%2228%22 text-anchor=%22middle%22%3EGoDaddy%3C/text%3E%3C/svg%3E';

export function DefaultExample() {
  return <Image src={image} alt="GoDaddy blue brand panel" width={320} height={180} />;
}`,language:`tsx`}),`
`,(0,g.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,g.jsxs)(t.ul,{children:[`
`,(0,g.jsxs)(t.li,{children:[`Provide concise, meaningful `,(0,g.jsx)(t.code,{children:`alt`}),` text when the image conveys information.`]}),`
`,(0,g.jsxs)(t.li,{children:[`Use `,(0,g.jsx)(t.code,{children:`alt=""`}),` for decorative images or images already described by adjacent text.`]}),`
`,(0,g.jsxs)(t.li,{children:[`Set `,(0,g.jsx)(t.code,{children:`width`}),` and `,(0,g.jsx)(t.code,{children:`height`}),` when known to reserve space and reduce layout shift.`]}),`
`]}),`
`,(0,g.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,g.jsx)(a,{of:d})]})}function h(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;e((()=>{g=t(),c(),s(),l(),f()}))();export{h as default};