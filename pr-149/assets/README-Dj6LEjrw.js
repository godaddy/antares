import{j as n}from"./iframe-5u2dU1qG.js";import{useMDXComponents as r}from"./index-DpIt1hyZ.js";import{M as s,A as i,S as p}from"./blocks-wFyLOpS3.js";import{S as m,P as a}from"./button.stories---27-pmP.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D81Ih7fI.js";import"./index-Cl7oec1c.js";import"./index-sz_kOaYv.js";import"./index-DrFu-skq.js";import"./index-DyRYKjoO.js";import"./index-OsshRs44.js";import"./index-B1hnS0Sn.js";import"./mergeProps-Bjl0YuBS.js";import"./clsx-Bd18HQqn.js";import"./slots-CmQV2HZC.js";import"./index-CLj43KZG.js";import"./index-C3pEkQF7.js";import"./index-B6UHGjsN.js";import"./useFocusable-DwoLRWZN.js";import"./useFocusWithin-hh3AK6TB.js";import"./DOMFunctions-DY9RYDsQ.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-CvKQ5yEa.js";import"./useObjectRef-C_3rncDx.js";import"./useButton-j-yO8gP5.js";import"./filterDOMProps-BNnC3YgW.js";const c=`import { Button } from '@bento/button';
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
