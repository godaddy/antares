import{j as n}from"./iframe-B8gzfUST.js";import{u as r,M as s,A as i,S as p}from"./blocks-CXnydIXL.js";import{S as m,P as a}from"./button.stories-DxxBLs6p.js";import"./preload-helper-PPVm8Dsz.js";import"./index-HjXZjqxJ.js";import"./index-C2TCxv9I.js";import"./index-D4i3q4B9.js";import"./index-ClJr__0w.js";import"./index-DGU34mxJ.js";import"./index-DjriZYqr.js";import"./slots-D8FIHUWK.js";import"./clsx-B-dksMZM.js";import"./index-CLj43KZG.js";import"./index-CR_kbnl2.js";import"./index-0c8xMXWU.js";import"./useHover-XgytCjM3.js";import"./useFocusVisible-CppNO7Pw.js";import"./DOMFunctions-B8thUyYD.js";import"./utils-CFSvQ91z.js";import"./platform-C94boGlq.js";import"./useFocusWithin-ChwUCT_F.js";import"./usePress-DtQab86b.js";import"./focusSafely-BcMArLwq.js";import"./useEffectEvent-C-PoYzIh.js";import"./useFocusable-Drk-6cm1.js";import"./filterDOMProps-SeKkUh_q.js";const c=`import { Button } from '@bento/button';
/* v8 ignore next */
import React from 'react';

export function ButtonExample() {
  return (
    <Button
      onPress={function handlePress() {
        console.log('button pressed!');
      }}
    >
      Click me!
    </Button>
  );
}
`;function e(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...r(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(s,{of:m,name:"Overview"}),`
`,n.jsx(t.h1,{id:"button",children:"Button"}),`
`,n.jsxs(t.p,{children:["The ",n.jsx(t.code,{children:"@bento/button"})," package exports the ",n.jsx(t.strong,{children:"Button"})," component, which is a complete button component built on top of the ",n.jsx(t.a,{href:"/docs/components-pressable--overview",children:n.jsx(t.strong,{children:"Pressable"})})," primitive."]}),`
`,n.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,n.jsx(t.pre,{children:n.jsx(t.code,{className:"language-bash",children:`npm install --save @bento/button
`})}),`
`,n.jsx(t.h2,{id:"props",children:"Props"}),`
`,n.jsxs(t.p,{children:["The following properties are available to be used on the ",n.jsx(t.code,{children:"Button"})," component:"]}),`
`,n.jsx(i,{of:a}),`
`,n.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,n.jsx(p,{language:"tsx",code:c})]})}function I(o={}){const{wrapper:t}={...r(),...o.components};return t?n.jsx(t,{...o,children:n.jsx(e,{...o})}):e(o)}export{I as default};
