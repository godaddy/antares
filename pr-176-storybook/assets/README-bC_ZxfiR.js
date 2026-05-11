import{j as e}from"./iframe-B4Nw7FJe.js";import{u as d,M as t,S as i,A as a}from"./blocks-_qyMzwgH.js";import{S as s,P as l}from"./heading.stories-6vKmahBy.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BCz66L0m.js";import"./index-DhvjJc79.js";import"./index-DnzQElaE.js";import"./index-CaxT9KrW.js";import"./index-DbXVjEal.js";import"./index-B3NqsZqp.js";import"./mergeProps-DddZCFgK.js";import"./SSRProvider-IKK3NN28.js";import"./clsx-B-dksMZM.js";import"./slots-Cc1BryBQ.js";import"./index-CLj43KZG.js";import"./index-BECShO0v.js";import"./index-Dmb9pKmY.js";import"./index-BJ9ON275.js";const p=`import { Heading, type HeadingProps } from '@bento/heading';
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
`;function o(r){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...d(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:s,name:"Overview"}),`
`,e.jsx(n.h1,{id:"heading",children:"Heading"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/heading"})," package exports the ",e.jsx(n.strong,{children:"Heading"})," component primitive."]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install --save @bento/heading
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/heading"})," package exports the ",e.jsx(n.code,{children:"Heading"})," component:"]}),`
`,e.jsx(i,{language:"tsx",code:p}),`
`,e.jsxs(n.p,{children:["The following properties are available to be used on the ",e.jsx(n.code,{children:"Heading"})," component:"]}),`
`,e.jsx(a,{of:l}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"level",children:"Level"}),`
`,e.jsxs(n.p,{children:["Setting the ",e.jsx(n.code,{children:"level"})," prop allows you to change the HTML tag of the ",e.jsx(n.code,{children:"Heading"}),` component.
Without a `,e.jsx(n.code,{children:"level"})," prop, the ",e.jsx(n.code,{children:"Heading"})," component will render as a ",e.jsx(n.code,{children:"span"}),` element.
This is because we cannot assume the appropriate heading level for the content without context.`]}),`
`,e.jsx(i,{language:"tsx",code:g}),`
`,e.jsx(n.h3,{id:"provider",children:"Provider"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"HeadingProvider"})," component allows you to set the heading level for the ",e.jsx(n.code,{children:"Heading"})," component by way of nesting."]}),`
`,e.jsx(i,{language:"tsx",code:c}),`
`,e.jsx(n.h3,{id:"override",children:"Override"}),`
`,e.jsxs(n.p,{children:["Even when using the ",e.jsx(n.code,{children:"HeadingProvider"})," component, you can override the heading level by passing the ",e.jsx(n.code,{children:"level"})," prop to the ",e.jsx(n.code,{children:"Heading"})," component."]}),`
`,e.jsx(i,{language:"tsx",code:h})]})}function O(r={}){const{wrapper:n}={...d(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(o,{...r})}):o(r)}export{O as default};
