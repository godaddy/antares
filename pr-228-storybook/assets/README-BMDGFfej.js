import{i as e}from"./preload-helper-Bhqo2ki1.js";import{y as t}from"./iframe-BTeWf0uz.js";import{S as n,c as r,n as i,s as a,u as o}from"./blocks-BjCSi_3o.js";import{t as s}from"./mdx-react-shim-BV120-oW.js";import{Props as c,n as l,t as u}from"./text.stories-CFQvtqE2.js";var d,f=e((()=>{d=`import { Text, type TextProps } from '@bento/text';
/* v8 ignore next */
import React from 'react';

export function TextExample(args: TextProps) {
  return <Text {...args}>Hello, world!</Text>;
}
`})),p,m=e((()=>{p=`import { Text, type TextProps } from '@bento/text';
/* v8 ignore next */
import React from 'react';

export function AsExample(args: TextProps) {
  return (
    <Text {...args} as="marquee">
      A scrolling marquee
    </Text>
  );
}
`})),h,g=e((()=>{h=`import { Text, type TextProps } from '@bento/text';
/* v8 ignore next */
import React from 'react';

export function AlignExample(args: TextProps) {
  return (
    <Text {...args} as="p" align="center">
      Text is aligned to the center
    </Text>
  );
}
`})),_,v=e((()=>{_=`import { Text, type TextProps } from '@bento/text';
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
`})),y,b=e((()=>{y=`import { Text, type TextProps } from '@bento/text';
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
`}));function x(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(a,{of:l,name:`Overview`}),`
`,(0,C.jsx)(t.h1,{id:`text`,children:`Text`}),`
`,(0,C.jsxs)(t.p,{children:[`The `,(0,C.jsx)(t.code,{children:`@bento/text`}),` package exports the `,(0,C.jsx)(t.strong,{children:`Text`}),` component primitive.`]}),`
`,(0,C.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-bash`,children:`npm install --save @bento/text
`})}),`
`,(0,C.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,C.jsxs)(t.p,{children:[`The `,(0,C.jsx)(t.code,{children:`@bento/text`}),` package exports the `,(0,C.jsx)(t.code,{children:`Text`}),` component:`]}),`
`,(0,C.jsx)(r,{language:`tsx`,code:d}),`
`,(0,C.jsxs)(t.p,{children:[`The following properties are available to be used on the `,(0,C.jsx)(t.code,{children:`Text`}),` component:`]}),`
`,(0,C.jsx)(i,{of:c}),`
`,(0,C.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,C.jsx)(t.h3,{id:`as`,children:`As`}),`
`,(0,C.jsxs)(t.p,{children:[`Setting the `,(0,C.jsx)(t.code,{children:`as`}),` prop allows you to change the HTML tag of the `,(0,C.jsx)(t.code,{children:`Text`}),` component.`]}),`
`,(0,C.jsx)(r,{language:`tsx`,code:p}),`
`,(0,C.jsx)(t.h3,{id:`align`,children:`Align`}),`
`,(0,C.jsxs)(t.p,{children:[`Setting the `,(0,C.jsx)(t.code,{children:`align`}),` prop allows you to change the alignment of the text. You can choose from `,(0,C.jsx)(t.code,{children:`start`}),`, `,(0,C.jsx)(t.code,{children:`center`}),`, `,(0,C.jsx)(t.code,{children:`end`}),`, or `,(0,C.jsx)(t.code,{children:`justify`}),`.
`,(0,C.jsx)(t.code,{children:`start`}),` works like `,(0,C.jsx)(t.code,{children:`left`}),` and `,(0,C.jsx)(t.code,{children:`end`}),` works like `,(0,C.jsx)(t.code,{children:`right`}),`. These keywords support RTL languages so you do not need to worry about the language of the text.`]}),`
`,(0,C.jsx)(r,{language:`tsx`,code:h}),`
`,(0,C.jsx)(t.h3,{id:`max-lines`,children:`Max Lines`}),`
`,(0,C.jsxs)(t.p,{children:[`Setting the `,(0,C.jsx)(t.code,{children:`maxLines`}),` prop allows you to limit the number of lines of text that are displayed using an ellipsis. In browsers that don't support multiline text truncation using `,(0,C.jsx)(t.code,{children:`line-clamp`}),`, the text will be truncated after a single line regardless of the number provided for `,(0,C.jsx)(t.code,{children:`maxLines`}),`.`]}),`
`,(0,C.jsx)(r,{language:`tsx`,code:_}),`
`,(0,C.jsx)(t.h3,{id:`wrap`,children:`Wrap`}),`
`,(0,C.jsxs)(t.p,{children:[`Setting the `,(0,C.jsx)(t.code,{children:`wrap`}),` prop allows you to change the wrapping of the text. The values can be `,(0,C.jsx)(t.code,{children:`wrap`}),`, `,(0,C.jsx)(t.code,{children:`nowrap`}),`, `,(0,C.jsx)(t.code,{children:`balance`}),`, `,(0,C.jsx)(t.code,{children:`pretty`}),`, or `,(0,C.jsx)(t.code,{children:`stable`}),`.`]}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`wrap`}),` is the setting that is most commonly used. For most elements you will not to explicitly set this.`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`nowrap`}),` should be avoided except in cases where it is important to prevent the text from wrapping.`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`balance`}),` is most commonly used for headlines, titles, and labels.`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`pretty`}),` is most commonly used for body text.`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`stable`}),` is commonly used for editable text, such as textareas.`]}),`
`]}),`
`,(0,C.jsx)(r,{language:`tsx`,code:y})]})}function S(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;e((()=>{C=t(),s(),o(),u(),f(),m(),g(),v(),b()}))();export{S as default};