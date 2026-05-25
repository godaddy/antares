import{j as t}from"./iframe-DObEmzuK.js";import{u as r,M as s,A as i,S as p}from"./blocks-BNKn2dtL.js";import{S as m,P as a}from"./button.stories-DIyNzGDf.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D0wza8A3.js";import"./index-Evi3y-dD.js";import"./index-7j2R3PjP.js";import"./index-C7umyjrr.js";import"./index-CtuRP6An.js";import"./index-BOM4sHVr.js";import"./mergeProps-BqP2IRSG.js";import"./SSRProvider-BtMAXvG3.js";import"./clsx-B-dksMZM.js";import"./slots-BF0QzDus.js";import"./index-CLj43KZG.js";import"./index-C6cvkMs8.js";import"./index-DIhkVZt6.js";import"./useFocusable-Dk_Etlop.js";import"./useHover-C5CvyZ7M.js";import"./utils-CYKAaiBd.js";import"./DOMFunctions-BADGQOBX.js";import"./platform-D4ZP5NBb.js";import"./useObjectRef-yc9xFDWL.js";import"./usePress-BnPIxvKo.js";import"./useFocusRing-DbbaDQb6.js";import"./useFocusWithin-D0CSGcGT.js";import"./useButton-J1uW9bMr.js";import"./filterDOMProps-BNnC3YgW.js";const c=`import { Button } from '@bento/button';
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
`;function e(o){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...r(),...o.components};return t.jsxs(t.Fragment,{children:[t.jsx(s,{of:m,name:"Overview"}),`
`,t.jsx(n.h1,{id:"button",children:"Button"}),`
`,t.jsxs(n.p,{children:["The ",t.jsx(n.code,{children:"@bento/button"})," package exports the ",t.jsx(n.strong,{children:"Button"})," component, which is a complete button component built on top of the ",t.jsx(n.a,{href:"/docs/components-pressable--overview",children:t.jsx(n.strong,{children:"Pressable"})})," primitive."]}),`
`,t.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,t.jsx(n.pre,{children:t.jsx(n.code,{className:"language-bash",children:`npm install --save @bento/button
`})}),`
`,t.jsx(n.h2,{id:"props",children:"Props"}),`
`,t.jsxs(n.p,{children:["The following properties are available to be used on the ",t.jsx(n.code,{children:"Button"})," component:"]}),`
`,t.jsx(i,{of:a}),`
`,t.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,t.jsx(p,{language:"tsx",code:c})]})}function N(o={}){const{wrapper:n}={...r(),...o.components};return n?t.jsx(n,{...o,children:t.jsx(e,{...o})}):e(o)}export{N as default};
