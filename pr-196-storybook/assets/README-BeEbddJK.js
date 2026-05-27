import{j as t}from"./iframe-BipHecsa.js";import{u as r,M as i,A as s,S as p}from"./blocks-BpaAODfY.js";import{S as m,P as a}from"./button.stories-BImpvXaf.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B0u55k7n.js";import"./index-SLLkWFQx.js";import"./index-CHIkQ4Ax.js";import"./index-B-bR8T3X.js";import"./index-BpMdXB9i.js";import"./index-DQVG4xCR.js";import"./mergeProps-DB8RTHkp.js";import"./SSRProvider-BTsV7JKa.js";import"./clsx-B-dksMZM.js";import"./slots-CeDAtiCB.js";import"./index-CLj43KZG.js";import"./index-CXJBjsnX.js";import"./index-r-fpuraa.js";import"./useFocusRing-C3GfOd7w.js";import"./useHover-CFJJur9S.js";import"./DOMFunctions-1-yhhTt0.js";import"./useGlobalListeners-DPw_UEd0.js";import"./platform-DTNzKOdA.js";import"./useFocusWithin-BVjQAR2Q.js";import"./usePress-DlwmkORq.js";import"./useSyncRef-JcQkHO2R.js";import"./useFocusable-BbAXfnoQ.js";import"./useObjectRef-u-tGh12i.js";import"./useButton-CkEXDgdw.js";import"./filterDOMProps-SeKkUh_q.js";const c=`import { Button } from '@bento/button';
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
`,t.jsx(p,{language:"tsx",code:c})]})}function O(n={}){const{wrapper:o}={...r(),...n.components};return o?t.jsx(o,{...n,children:t.jsx(e,{...n})}):e(n)}export{O as default};
