import{j as n}from"./iframe-BtlGCRVI.js";import{u as r,M as s,A as i,S as p}from"./blocks-DI3FCDLM.js";import{S as m,P as a}from"./button.stories-DlJResXu.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BnmrfdQg.js";import"./index-2jq_vWFy.js";import"./index-CR9JbcHp.js";import"./index-BQMC6_PO.js";import"./index-BxiZ5dB7.js";import"./index-BF7Waq2d.js";import"./slots-Dntv3pww.js";import"./clsx-B-dksMZM.js";import"./index-CLj43KZG.js";import"./index-CoUvNsh7.js";import"./index-BA9FX6Y5.js";import"./useHover-DBbCSc2c.js";import"./useFocusVisible-BSPVjtIb.js";import"./DOMFunctions-B8thUyYD.js";import"./utils-akQ9PQtO.js";import"./platform-C94boGlq.js";import"./useFocusWithin-3pIpPNfB.js";import"./usePress-D83P4j04.js";import"./focusSafely-cV7GTYET.js";import"./useEffectEvent-BqZ8K7P0.js";import"./useFocusable-DLYlEpvu.js";import"./filterDOMProps-MhcLJBJ1.js";const c=`import { Button } from '@bento/button';
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
