import{j as t}from"./iframe-CtknBCJw.js";import{useMDXComponents as r}from"./index-IUMuxDwR.js";import{M as i,A as s,S as p}from"./blocks-DD42ovag.js";import{S as m,P as a}from"./button.stories-BfT1uhXy.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C_oYgr21.js";import"./index-B6r7ClV_.js";import"./index-kiltLzmJ.js";import"./index-Xc2CKS96.js";import"./index-C-dR45m5.js";import"./index-YyVQwb1T.js";import"./mergeProps-BhaF3G6H.js";import"./SSRProvider-B1Jd87nT.js";import"./clsx-B-dksMZM.js";import"./slots-Chd3PIZT.js";import"./index-CLj43KZG.js";import"./index-BFQ4KkYo.js";import"./index-TGcx3hwe.js";import"./useFocusable-CwoanA8z.js";import"./useHover-CiJJBoUA.js";import"./utils-eszGU2Im.js";import"./DOMFunctions-BADGQOBX.js";import"./platform-BULRNHlZ.js";import"./useObjectRef-BTzxEMa5.js";import"./usePress-bmlcUMaL.js";import"./useFocusRing-CG3zC0o9.js";import"./useFocusWithin-DgoJUWDF.js";import"./useButton-C_0MbLxE.js";import"./filterDOMProps-BNnC3YgW.js";const c=`import { Button } from '@bento/button';
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
