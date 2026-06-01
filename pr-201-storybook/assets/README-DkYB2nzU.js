import{j as e}from"./iframe-BQo81cX5.js";import{u as o,M as r,A as l,S as s}from"./blocks-D40TWfPg.js";import{S as a,P as d}from"./visually-hidden.stories-DVHL3Xsj.js";import"./preload-helper-PPVm8Dsz.js";import"./index-4vCilNW6.js";import"./index-DgwHFz0H.js";import"./index-ns4hd72K.js";import"./index-_nE_DBNl.js";import"./slots-gxdXh3-A.js";import"./clsx-B-dksMZM.js";import"./index-DWoPlmc9.js";import"./index-CLj43KZG.js";import"./index-DtQrBc1g.js";import"./index-60QUrdxT.js";import"./useFocusWithin-D1ZoEx28.js";import"./utils-CoN-k6zu.js";import"./DOMFunctions-B8thUyYD.js";const c=`import { VisuallyHidden, type VisuallyHiddenProps } from '@bento/visually-hidden';
/* v8 ignore next */
import React from 'react';

export function DefaultExample(args: VisuallyHiddenProps) {
  return (
    <div>
      <VisuallyHidden isFocusable {...args}>
        <button>Skip to main content</button>
      </VisuallyHidden>
      Hit tab to focus the visually hidden button.
    </div>
  );
}
`,p=`import { VisuallyHidden, type VisuallyHiddenProps } from '@bento/visually-hidden';
/* v8 ignore next */
import React from 'react';

export function CustomElementExample(args: VisuallyHiddenProps) {
  return (
    <div>
      <VisuallyHidden {...args} as="div">
        This content is hidden visually but accessible to screen readers
      </VisuallyHidden>
      <p>Visible content</p>
    </div>
  );
}
`;function t(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:a,name:"Overview"}),`
`,e.jsx(n.h1,{id:"visuallyhidden",children:"VisuallyHidden"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/visually-hidden"})," package provides the ",e.jsx(n.code,{children:"VisuallyHidden"})," component which renders content that is accessible to screen readers and other assistive technologies while being visually hidden from sighted users. This is a fundamental accessibility primitive that enables developers to provide additional context, instructions, or navigation aids without cluttering the visual interface."]}),`
`,e.jsx(n.p,{children:"This primitive is essential for implementing accessible patterns like skip links, screen reader-only form labels, additional context for interactive elements, and descriptive text that supplements visual cues. It serves as a building block for other accessible components throughout the Bento ecosystem and is consumed by form components, navigation systems, and any component requiring accessible hidden content."}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install --save @bento/visually-hidden
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:["The following properties are available to be used on the ",e.jsx(n.code,{children:"VisuallyHidden"})," component:"]}),`
`,e.jsx(l,{of:d}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"default",children:"Default"}),`
`,e.jsxs(n.p,{children:["A simple usage of the ",e.jsx(n.code,{children:"VisuallyHidden"})," component for a skip link button. The hidden text provides context for screen readers while the arrow icon provides a visual cue."]}),`
`,e.jsx(s,{language:"tsx",code:c}),`
`,e.jsx(n.h3,{id:"custom-element",children:"Custom Element"}),`
`,e.jsxs(n.p,{children:["You can customize the rendered element type using the ",e.jsx(n.code,{children:"as"})," prop. By default, ",e.jsx(n.code,{children:"VisuallyHidden"})," renders a ",e.jsx(n.code,{children:"span"})," element."]}),`
`,e.jsx(s,{language:"tsx",code:p})]})}function C(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{C as default};
