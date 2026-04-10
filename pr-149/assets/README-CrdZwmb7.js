import{j as n}from"./iframe-DJp9i0v-.js";import{useMDXComponents as r}from"./index-BOMVroWN.js";import{M as s,A as i,S as p}from"./blocks-DwYe_0Fl.js";import{S as m,P as a}from"./button.stories-5eX6W2EL.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DEqlM7Dz.js";import"./index-ClREdkn7.js";import"./index-Ct9r_tUY.js";import"./index-DrFu-skq.js";import"./index-Bf1DUSvj.js";import"./index-C6-Gu2H1.js";import"./index-BtHaxreu.js";import"./mergeProps-BcOCRrLg.js";import"./clsx-B5emnzZp.js";import"./slots-CaB1H0J5.js";import"./index-CLj43KZG.js";import"./index-BBIQshQH.js";import"./index-CdPyHDkD.js";import"./useFocusable-CaaCiTb6.js";import"./useFocusWithin-_KO7CuEm.js";import"./DOMFunctions-DY9RYDsQ.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-CudBvtar.js";import"./useObjectRef-4AB3oddv.js";import"./useButton-Cg_EOye3.js";import"./filterDOMProps-BNnC3YgW.js";const c=`import { Button } from '@bento/button';
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
