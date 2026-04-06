import{j as n}from"./iframe-D2-EpC0g.js";import{useMDXComponents as r}from"./index-DvmY9G4Q.js";import{M as s,A as i,S as p}from"./blocks-txxGaFmm.js";import{S as m,P as a}from"./button.stories-DFyuwaX0.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C8b_sUIU.js";import"./index-COy0Rrls.js";import"./index-bC-EB4tx.js";import"./index-DrFu-skq.js";import"./index-CESgeaSk.js";import"./index-DrDAPgxE.js";import"./index-CFXSv1UZ.js";import"./mergeProps-WX8tHxEq.js";import"./clsx-Cdd8U6Z_.js";import"./slots-BIrwkHM9.js";import"./index-CLj43KZG.js";import"./index-DCDGKp71.js";import"./index-BuzDxU_I.js";import"./useFocusable-7bg3QHe8.js";import"./useFocusWithin-BnthygDU.js";import"./DOMFunctions-DY9RYDsQ.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-BUcI9zsp.js";import"./useObjectRef-BLd_gicj.js";import"./useButton-Bx7YEgKe.js";import"./filterDOMProps-BNnC3YgW.js";const c=`import { Button } from '@bento/button';
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
