import{j as n}from"./iframe-BQo81cX5.js";import{u as r,M as s,A as i,S as p}from"./blocks-D40TWfPg.js";import{S as m,P as a}from"./button.stories-dg8mnzCc.js";import"./preload-helper-PPVm8Dsz.js";import"./index-4vCilNW6.js";import"./index-DgwHFz0H.js";import"./index-ns4hd72K.js";import"./index-CIsvEWwr.js";import"./index-60QUrdxT.js";import"./index-DWoPlmc9.js";import"./slots-gxdXh3-A.js";import"./clsx-B-dksMZM.js";import"./index-CLj43KZG.js";import"./index-DtQrBc1g.js";import"./index-DngSwQgV.js";import"./useHover-C8S-A-d0.js";import"./useFocusVisible-COMBojmB.js";import"./DOMFunctions-B8thUyYD.js";import"./utils-CoN-k6zu.js";import"./platform-C94boGlq.js";import"./useFocusWithin-D1ZoEx28.js";import"./usePress-4pviOUXo.js";import"./focusSafely-B8z1ZQBX.js";import"./useEffectEvent-Bm2-dAj4.js";import"./useFocusable-CDsRnTGV.js";import"./filterDOMProps-MhcLJBJ1.js";const c=`import { Button } from '@bento/button';
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
