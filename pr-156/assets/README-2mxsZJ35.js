import{j as n}from"./iframe-N2a__K7H.js";import{useMDXComponents as r}from"./index-DsyEXuvE.js";import{M as s,A as i,S as p}from"./blocks-B_t92u7b.js";import{S as m,P as a}from"./button.stories-BMhV34qI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B3GBmEju.js";import"./index-64geXzHS.js";import"./index-B2krvM71.js";import"./index-DrFu-skq.js";import"./index-UzywIQWG.js";import"./index-Cga9fOvR.js";import"./index-BfLUNoHt.js";import"./mergeProps-Dl6kLmO2.js";import"./clsx-4oYKjKcF.js";import"./slots-YJfOsFq9.js";import"./index-CLj43KZG.js";import"./index-CQrEbnYJ.js";import"./index-DRyEBFVI.js";import"./useFocusable-kg-oUXEr.js";import"./useFocusWithin-DLLAy4yI.js";import"./DOMFunctions-DY9RYDsQ.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-CyjAJKGj.js";import"./useObjectRef-CPnYbvBg.js";import"./useButton-BcduOQZh.js";import"./filterDOMProps-BNnC3YgW.js";const c=`import { Button } from '@bento/button';
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
