import{j as e}from"./iframe-76ZJl6Sm.js";import{u as s,M as i,S as o,A as a}from"./blocks-5vf65Rnl.js";import{S as l,P as c}from"./text.stories-BQerFhHJ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CepoJkfN.js";import"./index-C94UrSgR.js";import"./index-tI0Vf8Ni.js";import"./index-D4QF9xSn.js";import"./index-DVSMrZaC.js";import"./slots-DsU3HOiL.js";import"./index-D8tMiz_9.js";import"./index-CLj43KZG.js";import"./index-BO4VPIxQ.js";import"./mergeProps-DB1EJkc-.js";import"./SSRProvider-C2ws8vu0.js";import"./clsx-B-dksMZM.js";import"./index-COFD3liK.js";const x=`import { Text, type TextProps } from '@bento/text';
/* v8 ignore next */
import React from 'react';

export function TextExample(args: TextProps) {
  return <Text {...args}>Hello, world!</Text>;
}
`,d=`import { Text, type TextProps } from '@bento/text';
/* v8 ignore next */
import React from 'react';

export function AsExample(args: TextProps) {
  return (
    <Text {...args} as="marquee">
      A scrolling marquee
    </Text>
  );
}
`,p=`import { Text, type TextProps } from '@bento/text';
/* v8 ignore next */
import React from 'react';

export function AlignExample(args: TextProps) {
  return (
    <Text {...args} as="p" align="center">
      Text is aligned to the center
    </Text>
  );
}
`,h=`import { Text, type TextProps } from '@bento/text';
/* v8 ignore next */
import React from 'react';

export function MaxLinesExample(args: TextProps) {
  return (
    <div style={{ width: '300px', border: '1px solid red' }}>
      <Text {...args} as="p" maxLines={2}>
        This will have a maximum of two lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    </div>
  );
}
`,m=`import { Text, type TextProps } from '@bento/text';
/* v8 ignore next */
import React from 'react';

export function WrapExample(args: TextProps) {
  return (
    <div style={{ width: '300px', border: '1px solid red' }}>
      <Text {...args} as="p" wrap="pretty">
        Text is wrapped in a way that best balances the number of characters on each line, enhancing layout quality and
        legibility. Because counting characters and balancing them across multiple lines is computationally expensive,
        this value is only supported for blocks of text spanning a limited number of lines
      </Text>
    </div>
  );
}
`;function r(n){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:l,name:"Overview"}),`
`,e.jsx(t.h1,{id:"text",children:"Text"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"@bento/text"})," package exports the ",e.jsx(t.strong,{children:"Text"})," component primitive."]}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install --save @bento/text
`})}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"@bento/text"})," package exports the ",e.jsx(t.code,{children:"Text"})," component:"]}),`
`,e.jsx(o,{language:"tsx",code:x}),`
`,e.jsxs(t.p,{children:["The following properties are available to be used on the ",e.jsx(t.code,{children:"Text"})," component:"]}),`
`,e.jsx(a,{of:c}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"as",children:"As"}),`
`,e.jsxs(t.p,{children:["Setting the ",e.jsx(t.code,{children:"as"})," prop allows you to change the HTML tag of the ",e.jsx(t.code,{children:"Text"})," component."]}),`
`,e.jsx(o,{language:"tsx",code:d}),`
`,e.jsx(t.h3,{id:"align",children:"Align"}),`
`,e.jsxs(t.p,{children:["Setting the ",e.jsx(t.code,{children:"align"})," prop allows you to change the alignment of the text. You can choose from ",e.jsx(t.code,{children:"start"}),", ",e.jsx(t.code,{children:"center"}),", ",e.jsx(t.code,{children:"end"}),", or ",e.jsx(t.code,{children:"justify"}),`.
`,e.jsx(t.code,{children:"start"})," works like ",e.jsx(t.code,{children:"left"})," and ",e.jsx(t.code,{children:"end"})," works like ",e.jsx(t.code,{children:"right"}),". These keywords support RTL languages so you do not need to worry about the language of the text."]}),`
`,e.jsx(o,{language:"tsx",code:p}),`
`,e.jsx(t.h3,{id:"max-lines",children:"Max Lines"}),`
`,e.jsxs(t.p,{children:["Setting the ",e.jsx(t.code,{children:"maxLines"})," prop allows you to limit the number of lines of text that are displayed using an ellipsis. In browsers that don't support multiline text truncation using ",e.jsx(t.code,{children:"line-clamp"}),", the text will be truncated after a single line regardless of the number provided for ",e.jsx(t.code,{children:"maxLines"}),"."]}),`
`,e.jsx(o,{language:"tsx",code:h}),`
`,e.jsx(t.h3,{id:"wrap",children:"Wrap"}),`
`,e.jsxs(t.p,{children:["Setting the ",e.jsx(t.code,{children:"wrap"})," prop allows you to change the wrapping of the text. The values can be ",e.jsx(t.code,{children:"wrap"}),", ",e.jsx(t.code,{children:"nowrap"}),", ",e.jsx(t.code,{children:"balance"}),", ",e.jsx(t.code,{children:"pretty"}),", or ",e.jsx(t.code,{children:"stable"}),"."]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"wrap"})," is the setting that is most commonly used. For most elements you will not to explicitly set this."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"nowrap"})," should be avoided except in cases where it is important to prevent the text from wrapping."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"balance"})," is most commonly used for headlines, titles, and labels."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"pretty"})," is most commonly used for body text."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"stable"})," is commonly used for editable text, such as textareas."]}),`
`]}),`
`,e.jsx(o,{language:"tsx",code:m})]})}function q(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(r,{...n})}):r(n)}export{q as default};
