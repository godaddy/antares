import{j as t}from"./iframe-D8YXAAeg.js";import{useMDXComponents as r}from"./index-QIpnDk3e.js";import{M as i,A as s,S as p}from"./blocks-v-x0N3Ic.js";import{S as m,P as a}from"./button.stories-BG-8dLA2.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B7nvH90w.js";import"./index-DPb9EboQ.js";import"./index--cnBPFpc.js";import"./index-BvXQqRz-.js";import"./index-Di3bq5nv.js";import"./index-IBXSyFvD.js";import"./mergeProps-CaSc1RkZ.js";import"./SSRProvider-BpjJ6xN-.js";import"./clsx-B-dksMZM.js";import"./slots-DGGWraQP.js";import"./index-CLj43KZG.js";import"./index-Dj0soTKg.js";import"./index-DhrFsSJ8.js";import"./useFocusable-MZfv_e1X.js";import"./useHover-B3t1-RMF.js";import"./utils-DSjcMHmj.js";import"./DOMFunctions-BADGQOBX.js";import"./platform-BULRNHlZ.js";import"./useObjectRef-D3yum8mV.js";import"./usePress-cRR1uvqF.js";import"./useFocusRing-BB1Y6VD5.js";import"./useFocusWithin-DbOS3yzb.js";import"./useButton-4BW_WitE.js";import"./filterDOMProps-BNnC3YgW.js";const c=`import { Button } from '@bento/button';
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
`;function e(n){const o={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...r(),...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(i,{of:m,name:"Overview"}),`
`,t.jsx(o.h1,{id:"button",children:"Button"}),`
`,t.jsxs(o.p,{children:["The ",t.jsx(o.code,{children:"@bento/button"})," package exports the ",t.jsx(o.strong,{children:"Button"})," component, which is a complete button component built on top of the ",t.jsx(o.a,{href:"/docs/components-pressable--overview",children:t.jsx(o.strong,{children:"Pressable"})})," primitive."]}),`
`,t.jsx(o.h2,{id:"installation",children:"Installation"}),`
`,t.jsx(o.pre,{children:t.jsx(o.code,{className:"language-bash",children:`npm install --save @bento/button
`})}),`
`,t.jsx(o.h2,{id:"props",children:"Props"}),`
`,t.jsxs(o.p,{children:["The following properties are available to be used on the ",t.jsx(o.code,{children:"Button"})," component:"]}),`
`,t.jsx(s,{of:a}),`
`,t.jsx(o.h2,{id:"examples",children:"Examples"}),`
`,t.jsx(p,{language:"tsx",code:c})]})}function O(n={}){const{wrapper:o}={...r(),...n.components};return o?t.jsx(o,{...n,children:t.jsx(e,{...n})}):e(n)}export{O as default};
