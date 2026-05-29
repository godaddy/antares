import{j as n}from"./iframe-B-vr-ZYa.js";import{u as r,M as s,A as i,S as p}from"./blocks-Ca1gRenW.js";import{S as m,P as a}from"./button.stories-DCvF0rYi.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BVx0kVlW.js";import"./index-BHvRwOME.js";import"./index-CY89mx60.js";import"./index-FPf-yi4s.js";import"./index-DiLITn0I.js";import"./index-Dop_kPwn.js";import"./slots-Bq8Y4fpU.js";import"./clsx-B-dksMZM.js";import"./index-CLj43KZG.js";import"./index-C5dYh_rx.js";import"./index-qjZpA9ji.js";import"./useHover-D33vFce5.js";import"./useFocusVisible-DF0jLxF_.js";import"./DOMFunctions-B8thUyYD.js";import"./utils-Cxv_z_ye.js";import"./platform-C94boGlq.js";import"./useFocusWithin-CJK2P4dw.js";import"./usePress-DIij0U1r.js";import"./focusSafely-DIdQk07e.js";import"./useEffectEvent-bbFalO42.js";import"./useFocusable-ld324BJ0.js";import"./filterDOMProps-SeKkUh_q.js";const c=`import { Button } from '@bento/button';
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
