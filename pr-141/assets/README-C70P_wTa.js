import{j as n}from"./iframe-DnY-Bnyt.js";import{useMDXComponents as r}from"./index-u9OUB605.js";import{M as s,A as i,S as p}from"./blocks-BJnqQaAH.js";import{S as m,P as a}from"./button.stories-D1pJeVBL.js";import"./preload-helper-PPVm8Dsz.js";import"./index-VvKTufIN.js";import"./index-DQADbxI0.js";import"./index-CIMh3V7Q.js";import"./index-DrFu-skq.js";import"./index-CN2_MdPC.js";import"./index-COjkJgwr.js";import"./index-zC4D80-j.js";import"./mergeProps-RKhxX9hN.js";import"./clsx-q_LHyHg5.js";import"./slots-DmPtQ-ew.js";import"./index-CLj43KZG.js";import"./index-CMrVnLZc.js";import"./index-zo48SJht.js";import"./useFocusable-B-b0o6OS.js";import"./useFocusWithin-DoeLTHcE.js";import"./DOMFunctions-DY9RYDsQ.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-DAd621i8.js";import"./useObjectRef-0ADA-RgH.js";import"./useButton-BFoYSCUS.js";import"./filterDOMProps-BNnC3YgW.js";const c=`import { Button } from '@bento/button';
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
