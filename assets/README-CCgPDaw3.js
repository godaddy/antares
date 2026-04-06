import{j as n}from"./iframe-BdDbKpSa.js";import{useMDXComponents as r}from"./index-D-sdQ1rQ.js";import{M as s,A as i,S as p}from"./blocks-pwUMJHnq.js";import{S as m,P as a}from"./button.stories-BSdOGYaz.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BcAN-i6Q.js";import"./index-B5kS4cU8.js";import"./index-CpEq7wEi.js";import"./index-DrFu-skq.js";import"./index-DpuzCpKc.js";import"./index-BygzrZkM.js";import"./index-CjfJpyX2.js";import"./mergeProps-C4o0jXEZ.js";import"./clsx-BLGXZUWy.js";import"./slots-CPlKthaQ.js";import"./index-CLj43KZG.js";import"./index-4jqD68Gg.js";import"./index-BUBgEKCK.js";import"./useFocusable-cfs0JWxw.js";import"./useFocusWithin-DM-zH5xS.js";import"./DOMFunctions-DY9RYDsQ.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-kji5aCx2.js";import"./useObjectRef-TtJ-WSqt.js";import"./useButton-NzcLXiIq.js";import"./filterDOMProps-BNnC3YgW.js";const c=`import { Button } from '@bento/button';
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
