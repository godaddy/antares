import{j as e}from"./iframe-BdDbKpSa.js";import{useMDXComponents as d}from"./index-D-sdQ1rQ.js";import{M as t,S as o,A as a}from"./blocks-pwUMJHnq.js";import{S as s,P as l}from"./heading.stories-B7e5s37j.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BcAN-i6Q.js";import"./index-B5kS4cU8.js";import"./index-CpEq7wEi.js";import"./index-DrFu-skq.js";import"./index-BFaCvQ87.js";import"./index-BygzrZkM.js";import"./index-CjfJpyX2.js";import"./mergeProps-C4o0jXEZ.js";import"./clsx-BLGXZUWy.js";import"./slots-CPlKthaQ.js";import"./index-CLj43KZG.js";import"./index-4jqD68Gg.js";import"./index-nc0nsXye.js";import"./index-CtG-PF3s.js";const p=`import { Heading, type HeadingProps } from '@bento/heading';
/* v8 ignore next */
import React from 'react';

export function HeadingExample(args: HeadingProps) {
  return <Heading {...args}>Hello, world!</Heading>;
}
`,g=`import { Heading, type HeadingProps } from '@bento/heading';
/* v8 ignore next */
import React from 'react';

export function LevelExample(args: HeadingProps) {
  return (
    <Heading {...args} level={1}>
      Hello, world!
    </Heading>
  );
}
`,c=`import { Heading, HeadingProvider, type HeadingProps } from '@bento/heading';
/* v8 ignore next */
import React from 'react';

export function HeadingProviderExample(args: HeadingProps) {
  return (
    <HeadingProvider>
      <Heading>Level 1</Heading>
      <HeadingProvider>
        <Heading>Level 2</Heading>
        <HeadingProvider>
          <Heading>Level 3</Heading>
        </HeadingProvider>
      </HeadingProvider>
    </HeadingProvider>
  );
}
`,h=`import { Heading, HeadingProvider, type HeadingProps } from '@bento/heading';
/* v8 ignore next */
import React from 'react';

export function HeadingOverrideExample(args: HeadingProps) {
  return (
    <HeadingProvider>
      <Heading>Level 1</Heading>
      <HeadingProvider>
        <Heading>Level 2</Heading>
        <Heading level={1}>Level 1 (overridden)</Heading>
      </HeadingProvider>
    </HeadingProvider>
  );
}
`;function i(r){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...d(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:s,name:"Overview"}),`
`,e.jsx(n.h1,{id:"heading",children:"Heading"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/heading"})," package exports the ",e.jsx(n.strong,{children:"Heading"})," component primitive."]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install --save @bento/heading
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/heading"})," package exports the ",e.jsx(n.code,{children:"Heading"})," component:"]}),`
`,e.jsx(o,{language:"tsx",code:p}),`
`,e.jsxs(n.p,{children:["The following properties are available to be used on the ",e.jsx(n.code,{children:"Heading"})," component:"]}),`
`,e.jsx(a,{of:l}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"level",children:"Level"}),`
`,e.jsxs(n.p,{children:["Setting the ",e.jsx(n.code,{children:"level"})," prop allows you to change the HTML tag of the ",e.jsx(n.code,{children:"Heading"}),` component.
Without a `,e.jsx(n.code,{children:"level"})," prop, the ",e.jsx(n.code,{children:"Heading"})," component will render as a ",e.jsx(n.code,{children:"span"}),` element.
This is because we cannot assume the appropriate heading level for the content without context.`]}),`
`,e.jsx(o,{language:"tsx",code:g}),`
`,e.jsx(n.h3,{id:"provider",children:"Provider"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"HeadingProvider"})," component allows you to set the heading level for the ",e.jsx(n.code,{children:"Heading"})," component by way of nesting."]}),`
`,e.jsx(o,{language:"tsx",code:c}),`
`,e.jsx(n.h3,{id:"override",children:"Override"}),`
`,e.jsxs(n.p,{children:["Even when using the ",e.jsx(n.code,{children:"HeadingProvider"})," component, you can override the heading level by passing the ",e.jsx(n.code,{children:"level"})," prop to the ",e.jsx(n.code,{children:"Heading"})," component."]}),`
`,e.jsx(o,{language:"tsx",code:h})]})}function C(r={}){const{wrapper:n}={...d(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{C as default};
