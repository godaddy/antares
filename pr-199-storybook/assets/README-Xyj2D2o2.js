import{j as n}from"./iframe-DEw-TdOf.js";import{u as r,M as s,A as i,S as p}from"./blocks-BSTGhIOF.js";import{S as m,P as a}from"./button.stories-CpaIWgRz.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CaEMLjby.js";import"./index-CkeVYGPm.js";import"./index-Ckl-4Q0v.js";import"./index-BSFN2d-0.js";import"./index-DKrYlLVB.js";import"./index-CWMUkFW8.js";import"./slots-C_E0jgdW.js";import"./clsx-B-dksMZM.js";import"./index-CLj43KZG.js";import"./index-D7d1rM6M.js";import"./index-BBkkMKeP.js";import"./useHover-B3xj0nnY.js";import"./useFocusVisible-FAv6LJ9X.js";import"./DOMFunctions-B8thUyYD.js";import"./utils-B-cOWSZ6.js";import"./platform-C94boGlq.js";import"./useFocusWithin-DUScnnML.js";import"./usePress-BbIUOLJ8.js";import"./focusSafely-C1qqA80m.js";import"./useEffectEvent-CYIfP-EN.js";import"./useFocusable-Y3QFLk6D.js";import"./filterDOMProps-SeKkUh_q.js";const c=`import { Button } from '@bento/button';
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
