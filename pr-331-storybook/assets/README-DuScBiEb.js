import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-D20fQPfa.js";import{i as l,n as u,r as d,t as f}from"./image.stories-y0OEBqta.js";function p(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:d,name:`Overview`}),`
`,(0,h.jsx)(t.h1,{id:`image`,children:`Image`}),`
`,(0,h.jsx)(t.p,{children:`A native image element that inherits presentation and behavior from its Antares parent.`}),`
`,(0,h.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,h.jsxs)(t.ul,{children:[`
`,(0,h.jsxs)(t.li,{children:[`Renders a native `,(0,h.jsx)(t.code,{children:`<img>`}),` and accepts all of its attributes`]}),`
`,(0,h.jsx)(t.li,{children:`Inherits presentation and behavior when composed inside Antares components such as Avatar`}),`
`,(0,h.jsx)(t.li,{children:`Ships no default styles, loading state, or fallback so it stays predictable everywhere`}),`
`]}),`
`,(0,h.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,h.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,h.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,h.jsx)(t.p,{children:`Render an image with alternative text and explicit dimensions.`}),`
`,(0,h.jsx)(a,{of:f,inline:!0}),`
`,(0,h.jsx)(i,{code:`import { Image } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 320 180%22%3E%3Crect width=%22320%22 height=%22180%22 fill=%22%23145fa9%22/%3E%3Ctext x=%22160%22 y=%2298%22 fill=%22white%22 font-family=%22Arial%22 font-size=%2228%22 text-anchor=%22middle%22%3EGoDaddy%3C/text%3E%3C/svg%3E';

export function DefaultExample() {
  return <Image src={image} alt="GoDaddy blue brand panel" width={320} height={180} />;
}`,language:`tsx`}),`
`,(0,h.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,h.jsxs)(t.ul,{children:[`
`,(0,h.jsxs)(t.li,{children:[`Provide concise, meaningful `,(0,h.jsx)(t.code,{children:`alt`}),` text when the image conveys information.`]}),`
`,(0,h.jsxs)(t.li,{children:[`Use `,(0,h.jsx)(t.code,{children:`alt=""`}),` for decorative images or images already described by adjacent text.`]}),`
`,(0,h.jsxs)(t.li,{children:[`Set `,(0,h.jsx)(t.code,{children:`width`}),` and `,(0,h.jsx)(t.code,{children:`height`}),` when known to reserve space and reduce layout shift.`]}),`
`]}),`
`,(0,h.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,h.jsx)(o,{of:u})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=t(),n(),c(),l()})))()}g();export{m as default};