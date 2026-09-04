import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,n as a,s as o,u as s}from"./blocks-D20fQPfa.js";import{n as c,r as l,t as u}from"./heading.stories-D-ajJVkv.js";var d;function f(){return(f=e((()=>{d=`import { Heading, type HeadingProps } from '@bento/heading';
/* v8 ignore next */
import React from 'react';

export function HeadingExample(args: HeadingProps) {
  return <Heading {...args}>Hello, world!</Heading>;
}
`})))()}var p;function m(){return(m=e((()=>{p=`import { Heading, type HeadingProps } from '@bento/heading';
/* v8 ignore next */
import React from 'react';

export function LevelExample(args: HeadingProps) {
  return (
    <Heading {...args} level={1}>
      Hello, world!
    </Heading>
  );
}
`})))()}var h;function g(){return(g=e((()=>{h=`import { Heading, HeadingProvider, type HeadingProps } from '@bento/heading';
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
`})))()}var _;function v(){return(v=e((()=>{_=`import { Heading, HeadingProvider, type HeadingProps } from '@bento/heading';
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
`})))()}function y(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...r(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(o,{of:c,name:`Overview`}),`
`,(0,x.jsx)(t.h1,{id:`heading`,children:`Heading`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`@bento/heading`}),` package exports the `,(0,x.jsx)(t.strong,{children:`Heading`}),` component primitive.`]}),`
`,(0,x.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-bash`,children:`npm install --save @bento/heading
`})}),`
`,(0,x.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`@bento/heading`}),` package exports the `,(0,x.jsx)(t.code,{children:`Heading`}),` component:`]}),`
`,(0,x.jsx)(i,{language:`tsx`,code:d}),`
`,(0,x.jsxs)(t.p,{children:[`The following properties are available to be used on the `,(0,x.jsx)(t.code,{children:`Heading`}),` component:`]}),`
`,(0,x.jsx)(a,{of:u}),`
`,(0,x.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,x.jsx)(t.h3,{id:`level`,children:`Level`}),`
`,(0,x.jsxs)(t.p,{children:[`Setting the `,(0,x.jsx)(t.code,{children:`level`}),` prop allows you to change the HTML tag of the `,(0,x.jsx)(t.code,{children:`Heading`}),` component.
Without a `,(0,x.jsx)(t.code,{children:`level`}),` prop, the `,(0,x.jsx)(t.code,{children:`Heading`}),` component will render as a `,(0,x.jsx)(t.code,{children:`span`}),` element.
This is because we cannot assume the appropriate heading level for the content without context.`]}),`
`,(0,x.jsx)(i,{language:`tsx`,code:p}),`
`,(0,x.jsx)(t.h3,{id:`provider`,children:`Provider`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`HeadingProvider`}),` component allows you to set the heading level for the `,(0,x.jsx)(t.code,{children:`Heading`}),` component by way of nesting.`]}),`
`,(0,x.jsx)(i,{language:`tsx`,code:h}),`
`,(0,x.jsx)(t.h3,{id:`override`,children:`Override`}),`
`,(0,x.jsxs)(t.p,{children:[`Even when using the `,(0,x.jsx)(t.code,{children:`HeadingProvider`}),` component, you can override the heading level by passing the `,(0,x.jsx)(t.code,{children:`level`}),` prop to the `,(0,x.jsx)(t.code,{children:`Heading`}),` component.`]}),`
`,(0,x.jsx)(i,{language:`tsx`,code:_})]})}function b(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;function S(){return(S=e((()=>{x=t(),n(),s(),l(),f(),m(),g(),v()})))()}S();export{b as default};