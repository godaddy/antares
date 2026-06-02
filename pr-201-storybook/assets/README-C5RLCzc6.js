import{j as n}from"./iframe-ENS-y477.js";import{u as r,M as s,A as i,S as p}from"./blocks-2uMQuFjJ.js";import{S as m,P as a}from"./button.stories-CcJiJrT6.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DuvVEgq1.js";import"./index-dfwTPSNJ.js";import"./index-DlbmcDr0.js";import"./index-CfcQjAbX.js";import"./index-BbEeFFLu.js";import"./index-gDQUVDTj.js";import"./slots-DgRhVzm_.js";import"./clsx-B-dksMZM.js";import"./index-CLj43KZG.js";import"./index-HjIWJI_3.js";import"./index-CMeiWXP5.js";import"./useHover-D7PbTU1-.js";import"./useFocusVisible-CleldAfg.js";import"./DOMFunctions-B8thUyYD.js";import"./utils-DHFylPRL.js";import"./platform-C94boGlq.js";import"./useFocusWithin-DdSFCbU5.js";import"./usePress-LseB8e2y.js";import"./focusSafely-DTbABfWP.js";import"./useEffectEvent-BocviU5G.js";import"./useFocusable-C5U2MUMC.js";import"./filterDOMProps-MhcLJBJ1.js";const c=`import { Button } from '@bento/button';
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
