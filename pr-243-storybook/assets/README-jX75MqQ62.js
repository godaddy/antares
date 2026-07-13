import{i as e}from"./preload-helper-DOotEt7k.js";import{y as t}from"./iframe-COkTE-an.js";import{S as n,c as r,n as i,s as a,u as o}from"./blocks-CNosNxO7.js";import{t as s}from"./mdx-react-shim-CHoS5vIf.js";import{Props as c,n as l,t as u}from"./text.stories-i7eHVMaQ.js";var d,f=e((()=>{d=`import { Text, type TextProps } from '@godaddy/antares';

export function AsExample(args: TextProps) {
  return (
    <Text {...args} as="marquee">
      A scrolling marquee
    </Text>
  );
}
`})),p,m=e((()=>{p=`import { Text, type TextProps } from '@godaddy/antares';

export function AlignExample(args: TextProps) {
  return (
    <Text {...args} as="p" align="center">
      Text is aligned to the center
    </Text>
  );
}
`})),h,g=e((()=>{h=`import { Text, type TextProps } from '@godaddy/antares';

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
`})),_,v=e((()=>{_=`import { Text, type TextProps } from '@godaddy/antares';

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
`}));function y(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(a,{of:l,name:`Overview`}),`
`,(0,x.jsx)(t.h1,{id:`text`,children:`Text`}),`
`,(0,x.jsx)(t.p,{children:`Text component for displaying and formatting text content with alignment and truncation options`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`Text`}),` component prepares content with a few properties.`]}),`
`,(0,x.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,x.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`Text`}),` component accepts the following props:`]}),`
`,(0,x.jsx)(i,{of:c}),`
`,(0,x.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,x.jsx)(t.h3,{id:`as`,children:`As`}),`
`,(0,x.jsxs)(t.p,{children:[`Setting the `,(0,x.jsx)(t.code,{children:`as`}),` prop allows you to change the HTML tag of the `,(0,x.jsx)(t.code,{children:`Text`}),` component.`]}),`
`,(0,x.jsx)(r,{language:`tsx`,code:d}),`
`,(0,x.jsx)(t.h3,{id:`align`,children:`Align`}),`
`,(0,x.jsxs)(t.p,{children:[`Setting the `,(0,x.jsx)(t.code,{children:`align`}),` prop allows you to change the alignment of the text. You can choose from `,(0,x.jsx)(t.code,{children:`start`}),`, `,(0,x.jsx)(t.code,{children:`center`}),`, `,(0,x.jsx)(t.code,{children:`end`}),`, or `,(0,x.jsx)(t.code,{children:`justify`}),`.
`,(0,x.jsx)(t.code,{children:`start`}),` works like `,(0,x.jsx)(t.code,{children:`left`}),` and `,(0,x.jsx)(t.code,{children:`end`}),` works like `,(0,x.jsx)(t.code,{children:`right`}),`. These keywords support RTL languages so you do not need to worry about the language of the text.`]}),`
`,(0,x.jsx)(r,{language:`tsx`,code:p}),`
`,(0,x.jsx)(t.h3,{id:`max-lines`,children:`Max Lines`}),`
`,(0,x.jsxs)(t.p,{children:[`Setting the `,(0,x.jsx)(t.code,{children:`maxLines`}),` prop allows you to limit the number of lines of text that are displayed using an ellipsis. In browsers that don't support multiline text truncation using `,(0,x.jsx)(t.code,{children:`line-clamp`}),`, the text will be truncated after a single line regardless of the number provided for `,(0,x.jsx)(t.code,{children:`maxLines`}),`.`]}),`
`,(0,x.jsx)(r,{language:`tsx`,code:h}),`
`,(0,x.jsx)(t.h3,{id:`wrap`,children:`Wrap`}),`
`,(0,x.jsxs)(t.p,{children:[`Setting the `,(0,x.jsx)(t.code,{children:`wrap`}),` prop allows you to change the wrapping of the text. The values can be `,(0,x.jsx)(t.code,{children:`wrap`}),`, `,(0,x.jsx)(t.code,{children:`nowrap`}),`, `,(0,x.jsx)(t.code,{children:`balance`}),`, `,(0,x.jsx)(t.code,{children:`pretty`}),`, or `,(0,x.jsx)(t.code,{children:`stable`}),`.`]}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.code,{children:`wrap`}),` is the setting that is most commonly used. For most elements you will not to explicitly set this.`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.code,{children:`nowrap`}),` should be avoided except in cases where it is important to prevent the text from wrapping.`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.code,{children:`balance`}),` is most commonly used for headlines, titles, and labels.`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.code,{children:`pretty`}),` is most commonly used for body text.`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.code,{children:`stable`}),` is commonly used for editable text, such as textareas.`]}),`
`]}),`
`,(0,x.jsx)(r,{language:`tsx`,code:_})]})}function b(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;e((()=>{x=t(),s(),o(),u(),f(),m(),g(),v()}))();export{b as default};