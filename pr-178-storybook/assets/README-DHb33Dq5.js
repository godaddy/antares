import{j as t}from"./iframe-76ZJl6Sm.js";import{u as r,M as s,A as i,S as p}from"./blocks-5vf65Rnl.js";import{S as m,P as a}from"./button.stories-BrW2bWnI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CepoJkfN.js";import"./index-C94UrSgR.js";import"./index-tI0Vf8Ni.js";import"./index-DyposJ4i.js";import"./index-COFD3liK.js";import"./index-D8tMiz_9.js";import"./mergeProps-DB1EJkc-.js";import"./SSRProvider-C2ws8vu0.js";import"./clsx-B-dksMZM.js";import"./slots-DsU3HOiL.js";import"./index-CLj43KZG.js";import"./index-BO4VPIxQ.js";import"./index-BVq4iUwR.js";import"./useFocusable-ybiWiwot.js";import"./useHover-BpOuNX0f.js";import"./utils-l2Kr7UiU.js";import"./DOMFunctions-BADGQOBX.js";import"./platform-D4ZP5NBb.js";import"./useObjectRef-DpMUogNx.js";import"./usePress-DenPLAMu.js";import"./useFocusRing-ClzF2n3g.js";import"./useFocusWithin-CYGFz0qK.js";import"./useButton-BcE7mlmE.js";import"./filterDOMProps-BNnC3YgW.js";const c=`import { Button } from '@bento/button';
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
