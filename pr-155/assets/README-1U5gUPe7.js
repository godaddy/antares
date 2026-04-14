import{j as n}from"./iframe-6KxP5Rco.js";import{useMDXComponents as r}from"./index-C9ZlnsW2.js";import{M as s,A as i,S as p}from"./blocks-BO69z257.js";import{S as m,P as a}from"./button.stories-Dh7yPcPv.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BWIm-ihg.js";import"./index-DilDMYJ2.js";import"./index-Bl5aJP1Z.js";import"./index-DrFu-skq.js";import"./index-BcnU1Rdt.js";import"./index-CQzMHHQ-.js";import"./index-OksJX-G_.js";import"./mergeProps-BzdqSK53.js";import"./clsx-CkKzQDNR.js";import"./slots-CnfxBwKm.js";import"./index-CLj43KZG.js";import"./index-BZQkB63g.js";import"./index-B3Ps1c_s.js";import"./useFocusable-DaBbFKSE.js";import"./useFocusWithin-V2X5x0wW.js";import"./DOMFunctions-DY9RYDsQ.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-C9sCLUQA.js";import"./useObjectRef-DdQNLXrL.js";import"./useButton-DNBvokAg.js";import"./filterDOMProps-BNnC3YgW.js";const c=`import { Button } from '@bento/button';
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
