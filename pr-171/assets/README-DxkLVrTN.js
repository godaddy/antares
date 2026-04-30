import{j as t}from"./iframe-CXq8dscT.js";import{useMDXComponents as r}from"./index-DeJayPHI.js";import{M as i,A as s,S as p}from"./blocks-CsMHUZB-.js";import{S as m,P as a}from"./button.stories-eeVOWtBv.js";import"./preload-helper-PPVm8Dsz.js";import"./index-6mFRbdBS.js";import"./index-CSZn66pI.js";import"./index-DqyoxfBT.js";import"./index-C8D764bu.js";import"./index-BIR_jmoc.js";import"./index-gE1I4wOJ.js";import"./mergeProps-CioQwTky.js";import"./SSRProvider-MXfK5wd5.js";import"./clsx-B-dksMZM.js";import"./slots-CY9pdvpn.js";import"./index-CLj43KZG.js";import"./index-YnYe-Usd.js";import"./index-Cyl9lpnk.js";import"./useFocusable-CbTlJmRM.js";import"./useHover-CDGikqBt.js";import"./utils-WKJzbNAt.js";import"./DOMFunctions-BADGQOBX.js";import"./platform-BULRNHlZ.js";import"./useObjectRef-Dd0hiFt9.js";import"./usePress-BgtTyQlT.js";import"./useFocusRing-94V3crGD.js";import"./useFocusWithin-IcZsLXPi.js";import"./useButton-bH__ECVU.js";import"./filterDOMProps-BNnC3YgW.js";const c=`import { Button } from '@bento/button';
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
