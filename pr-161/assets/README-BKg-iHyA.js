import{j as t}from"./iframe-BCszq3eK.js";import{useMDXComponents as r}from"./index-LKpQAWkf.js";import{M as i,A as s,S as p}from"./blocks-D9Q5yeht.js";import{S as m,P as a}from"./button.stories-BYmfNY8o.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BrwSF4p2.js";import"./index-2m5hP8oV.js";import"./index-D4iQz-eU.js";import"./index-DrFu-skq.js";import"./index-BdkNe79F.js";import"./index-DnuDHN96.js";import"./index-BXcyZY8V.js";import"./mergeProps-uWb1iR1l.js";import"./SSRProvider-DuyXPnH5.js";import"./clsx-B-dksMZM.js";import"./slots-CmkOLRm9.js";import"./index-CLj43KZG.js";import"./index-CWO7E0mG.js";import"./index-D8wu55oA.js";import"./useFocusable-B0LHdj7Q.js";import"./useHover-vfUYRPr0.js";import"./utils-BMmhsuDo.js";import"./DOMFunctions-BADGQOBX.js";import"./platform-BULRNHlZ.js";import"./useObjectRef-CCCwXbuZ.js";import"./usePress-CjDmn3rM.js";import"./useFocusRing-CT8lt-AH.js";import"./useFocusWithin-KN-LvprE.js";import"./useButton-BKOOMKNh.js";import"./filterDOMProps-BNnC3YgW.js";const c=`import { Button } from '@bento/button';
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
`,t.jsx(p,{language:"tsx",code:c})]})}function q(n={}){const{wrapper:o}={...r(),...n.components};return o?t.jsx(o,{...n,children:t.jsx(e,{...n})}):e(n)}export{q as default};
