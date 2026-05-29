import{j as n}from"./iframe-BI0niomi.js";import{u as r,M as s,A as i,S as p}from"./blocks-cPpAjSLv.js";import{S as m,P as a}from"./button.stories-Qc6LQXuQ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D_Z8q63t.js";import"./index--dUfcv7u.js";import"./index-BUgcpsVA.js";import"./index-C2vDcaLH.js";import"./index-DtC93zWL.js";import"./index-BSGo8Vz0.js";import"./slots-C2Wd18RS.js";import"./clsx-B-dksMZM.js";import"./index-CLj43KZG.js";import"./index-BlODEvx9.js";import"./index-WwTIQTrT.js";import"./useHover-B075cZid.js";import"./useFocusVisible-BC23x06L.js";import"./DOMFunctions-B8thUyYD.js";import"./utils-BNpNh37k.js";import"./platform-C94boGlq.js";import"./useFocusWithin-voEURF7o.js";import"./usePress-BSP9Lgpj.js";import"./focusSafely-CIt5xMBl.js";import"./useEffectEvent-00oM964N.js";import"./useFocusable-DdB9miEB.js";import"./filterDOMProps-MhcLJBJ1.js";const c=`import { Button } from '@bento/button';
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
