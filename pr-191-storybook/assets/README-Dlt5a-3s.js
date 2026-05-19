import{j as t}from"./iframe-B6YsZR-s.js";import{u as r,M as s,A as i,S as p}from"./blocks-BZGFzJ0o.js";import{S as m,P as a}from"./button.stories-BDZqFVMx.js";import"./preload-helper-PPVm8Dsz.js";import"./index-aoCgFIs9.js";import"./index-LfqjcF53.js";import"./index-BuazBkUi.js";import"./index-CofRS_BS.js";import"./index-k3lOLZFJ.js";import"./index-9gIHEIe4.js";import"./mergeProps-DrdZTPdG.js";import"./SSRProvider-KJFVgDLI.js";import"./clsx-B-dksMZM.js";import"./slots-mniS_YlI.js";import"./index-CLj43KZG.js";import"./index-BNzQTtAG.js";import"./index-13M3_rqU.js";import"./useFocusable-CtcGTmuN.js";import"./useHover-6maYdHuQ.js";import"./utils-Be10URkw.js";import"./DOMFunctions-BADGQOBX.js";import"./platform-D4ZP5NBb.js";import"./useObjectRef-Eiy4V38J.js";import"./usePress-B9TG5jk1.js";import"./useFocusRing-CEsDu7SV.js";import"./useFocusWithin-dVmp3iKd.js";import"./useButton-ClQguVxy.js";import"./filterDOMProps-BNnC3YgW.js";const c=`import { Button } from '@bento/button';
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
`;function e(o){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...r(),...o.components};return t.jsxs(t.Fragment,{children:[t.jsx(s,{of:m,name:"Overview"}),`
`,t.jsx(n.h1,{id:"button",children:"Button"}),`
`,t.jsxs(n.p,{children:["The ",t.jsx(n.code,{children:"@bento/button"})," package exports the ",t.jsx(n.strong,{children:"Button"})," component, which is a complete button component built on top of the ",t.jsx(n.a,{href:"/docs/components-pressable--overview",children:t.jsx(n.strong,{children:"Pressable"})})," primitive."]}),`
`,t.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,t.jsx(n.pre,{children:t.jsx(n.code,{className:"language-bash",children:`npm install --save @bento/button
`})}),`
`,t.jsx(n.h2,{id:"props",children:"Props"}),`
`,t.jsxs(n.p,{children:["The following properties are available to be used on the ",t.jsx(n.code,{children:"Button"})," component:"]}),`
`,t.jsx(i,{of:a}),`
`,t.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,t.jsx(p,{language:"tsx",code:c})]})}function N(o={}){const{wrapper:n}={...r(),...o.components};return n?t.jsx(n,{...o,children:t.jsx(e,{...o})}):e(o)}export{N as default};
