import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,n as a,s as o,u as s}from"./blocks-D_rQDTTD.js";import{n as c,r as l,t as u}from"./visually-hidden.stories-CUbL0WkQ.js";var d;function f(){return(f=e((()=>{d=`import { VisuallyHidden, type VisuallyHiddenProps } from '@bento/visually-hidden';
/* v8 ignore next */
import React from 'react';

export function DefaultExample(args: VisuallyHiddenProps) {
  return (
    <div>
      <VisuallyHidden isFocusable {...args}>
        <button>Skip to main content</button>
      </VisuallyHidden>
      Hit tab to focus the visually hidden button.
    </div>
  );
}
`})))()}var p;function m(){return(m=e((()=>{p=`import { VisuallyHidden, type VisuallyHiddenProps } from '@bento/visually-hidden';
/* v8 ignore next */
import React from 'react';

export function CustomElementExample(args: VisuallyHiddenProps) {
  return (
    <div>
      <VisuallyHidden {...args} as="div">
        This content is hidden visually but accessible to screen readers
      </VisuallyHidden>
      <p>Visible content</p>
    </div>
  );
}
`})))()}function h(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...r(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(o,{of:l,name:`Overview`}),`
`,(0,_.jsx)(t.h1,{id:`visuallyhidden`,children:`VisuallyHidden`}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`@bento/visually-hidden`}),` package provides the `,(0,_.jsx)(t.code,{children:`VisuallyHidden`}),` component which renders content that is accessible to screen readers and other assistive technologies while being visually hidden from sighted users. This is a fundamental accessibility primitive that enables developers to provide additional context, instructions, or navigation aids without cluttering the visual interface.`]}),`
`,(0,_.jsx)(t.p,{children:`This primitive is essential for implementing accessible patterns like skip links, screen reader-only form labels, additional context for interactive elements, and descriptive text that supplements visual cues. It serves as a building block for other accessible components throughout the Bento ecosystem and is consumed by form components, navigation systems, and any component requiring accessible hidden content.`}),`
`,(0,_.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-bash`,children:`npm install --save @bento/visually-hidden
`})}),`
`,(0,_.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,_.jsxs)(t.p,{children:[`The following properties are available to be used on the `,(0,_.jsx)(t.code,{children:`VisuallyHidden`}),` component:`]}),`
`,(0,_.jsx)(a,{of:u}),`
`,(0,_.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,_.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,_.jsxs)(t.p,{children:[`A simple usage of the `,(0,_.jsx)(t.code,{children:`VisuallyHidden`}),` component for a skip link button. The hidden text provides context for screen readers while the arrow icon provides a visual cue.`]}),`
`,(0,_.jsx)(i,{language:`tsx`,code:d}),`
`,(0,_.jsx)(t.h3,{id:`custom-element`,children:`Custom Element`}),`
`,(0,_.jsxs)(t.p,{children:[`You can customize the rendered element type using the `,(0,_.jsx)(t.code,{children:`as`}),` prop. By default, `,(0,_.jsx)(t.code,{children:`VisuallyHidden`}),` renders a `,(0,_.jsx)(t.code,{children:`span`}),` element.`]}),`
`,(0,_.jsx)(i,{language:`tsx`,code:p})]})}function g(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;function v(){return(v=e((()=>{_=t(),n(),s(),c(),f(),m()})))()}v();export{g as default};