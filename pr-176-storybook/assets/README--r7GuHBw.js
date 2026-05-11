import{j as t}from"./iframe-B4Nw7FJe.js";import{u as r,M as s,A as i,S as p}from"./blocks-_qyMzwgH.js";import{S as m,P as a}from"./button.stories-CdMS5PAP.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BCz66L0m.js";import"./index-DhvjJc79.js";import"./index-DnzQElaE.js";import"./index-OS49ZjX6.js";import"./index-DbXVjEal.js";import"./index-B3NqsZqp.js";import"./mergeProps-DddZCFgK.js";import"./SSRProvider-IKK3NN28.js";import"./clsx-B-dksMZM.js";import"./slots-Cc1BryBQ.js";import"./index-CLj43KZG.js";import"./index-BECShO0v.js";import"./index-9-Kbq-rX.js";import"./useFocusable-D60pn2Rb.js";import"./useHover-CvybKbv2.js";import"./utils-DYLmDJPz.js";import"./DOMFunctions-BADGQOBX.js";import"./platform-D4ZP5NBb.js";import"./useObjectRef-CjrTCwNB.js";import"./usePress-CNCeorNG.js";import"./useFocusRing-BlFi-2Bm.js";import"./useFocusWithin-D349eWt8.js";import"./useButton-BYakM6kh.js";import"./filterDOMProps-BNnC3YgW.js";const c=`import { Button } from '@bento/button';
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
