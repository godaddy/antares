import{j as n}from"./iframe-HHtiDQp9.js";import{useMDXComponents as r}from"./index-B922oN_o.js";import{M as s,A as i,S as p}from"./blocks-DyDMJwD3.js";import{S as m,P as a}from"./button.stories-Dfh80iFv.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D0j3RjCO.js";import"./index-CVT7_Cvw.js";import"./index-x512Bdjr.js";import"./index-DrFu-skq.js";import"./index-DPf3LLXG.js";import"./index-Cl2g46Kp.js";import"./index-CyEMLJBn.js";import"./mergeProps-B5GKmQHP.js";import"./clsx-BMR1CELh.js";import"./slots-eIpVFZeE.js";import"./index-CLj43KZG.js";import"./index-DZIK0bSw.js";import"./index-CLaMWeFQ.js";import"./useFocusable-BTVAIPhi.js";import"./useFocusWithin-VRoWhYxK.js";import"./DOMFunctions-DY9RYDsQ.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-BxHsU0mN.js";import"./useObjectRef-BoTZF_A1.js";import"./useButton-B6uD2oW7.js";import"./filterDOMProps-BNnC3YgW.js";const c=`import { Button } from '@bento/button';
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
