import{j as t}from"./iframe-Ctx4srKR.js";import{useMDXComponents as r}from"./index-D2CtuBLb.js";import{M as i,A as s,S as p}from"./blocks-72KARnvP.js";import{S as m,P as a}from"./button.stories-DsSPrD29.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C3lit-vx.js";import"./index-DHf6R9s4.js";import"./index-CChMEhDG.js";import"./index-CBiqYoqD.js";import"./index-B30rVSRl.js";import"./index-Cm2vTddm.js";import"./mergeProps-DBpubWKp.js";import"./SSRProvider-L5CIFOBu.js";import"./clsx-B-dksMZM.js";import"./slots-fo57EPNj.js";import"./index-CLj43KZG.js";import"./index-Dy-msg3n.js";import"./index-DODQe4KG.js";import"./useFocusable-DvS-1-mo.js";import"./useHover-IN8R3fE4.js";import"./utils-DhXSdU43.js";import"./DOMFunctions-BADGQOBX.js";import"./platform-BULRNHlZ.js";import"./useObjectRef-CA7_efmZ.js";import"./usePress-BTZQQVg0.js";import"./useFocusRing-CC5jsQH3.js";import"./useFocusWithin-DKg76MtO.js";import"./useButton-DLuixzNV.js";import"./filterDOMProps-BNnC3YgW.js";const c=`import { Button } from '@bento/button';
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
