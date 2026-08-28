import{i as e}from"./preload-helper-B4cZKGJ2.js";import{F as t}from"./iframe-ByV58Mr_.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-C-8m7PZH.js";import{t as c}from"./mdx-react-shim-Cxn46HQN.js";import{t as l}from"./runtime-VLHLcJMt.js";import{Align as u,As as d,Default as f,Heading as p,HeadingProps as m,MaxLines as h,Props as g,Wrap as _,n as v,t as y}from"./text.stories-CaTiV1gh.js";function b(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(o,{of:v,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`text`,children:`Text`}),`
`,(0,S.jsx)(t.p,{children:`Text component for displaying and formatting text content with alignment and truncation options`}),`
`,(0,S.jsxs)(t.p,{children:[`The `,(0,S.jsx)(t.code,{children:`Text`}),` component prepares content with a few properties.`]}),`
`,(0,S.jsxs)(t.p,{children:[`Use the `,(0,S.jsx)(t.code,{children:`Heading`}),` preset for semantic headings. It renders an `,(0,S.jsx)(t.code,{children:`h1`}),`-`,(0,S.jsx)(t.code,{children:`h6`}),` element via the `,(0,S.jsx)(t.code,{children:`level`}),` prop (default `,(0,S.jsx)(t.code,{children:`2`}),`). Because it is built on React Aria's `,(0,S.jsx)(t.code,{children:`Heading`}),`, adding `,(0,S.jsx)(t.code,{children:`slot="title"`}),` inside a `,(0,S.jsx)(t.code,{children:`Modal`}),`/`,(0,S.jsx)(t.code,{children:`Dialog`}),` wires the accessible name (`,(0,S.jsx)(t.code,{children:`aria-labelledby`}),`) automatically.`]}),`
`,(0,S.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,S.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,S.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,S.jsx)(t.p,{children:`Basic text content.`}),`
`,(0,S.jsx)(i,{of:f,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Text, type TextProps } from '@godaddy/antares';

export function DefaultExample(args: TextProps) {
  return <Text {...args}>Hello, world!</Text>;
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`as`,children:`As`}),`
`,(0,S.jsxs)(t.p,{children:[`Setting the `,(0,S.jsx)(t.code,{children:`as`}),` prop allows you to change the HTML tag of the `,(0,S.jsx)(t.code,{children:`Text`}),` component.`]}),`
`,(0,S.jsx)(i,{of:d,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Text, type TextProps } from '@godaddy/antares';

export function AsExample(args: TextProps) {
  return (
    <Text {...args} as="marquee">
      A scrolling marquee
    </Text>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`heading`,children:`Heading`}),`
`,(0,S.jsxs)(t.p,{children:[(0,S.jsx)(t.code,{children:`Heading`}),` renders a semantic `,(0,S.jsx)(t.code,{children:`h1`}),`-`,(0,S.jsx)(t.code,{children:`h6`}),` element via the `,(0,S.jsx)(t.code,{children:`level`}),` prop (default `,(0,S.jsx)(t.code,{children:`2`}),`).
Inside a `,(0,S.jsx)(t.code,{children:`Modal`}),`/`,(0,S.jsx)(t.code,{children:`Dialog`}),`, add `,(0,S.jsx)(t.code,{children:`slot="title"`}),` and it labels the dialog automatically.`]}),`
`,(0,S.jsx)(i,{of:p,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Flex, Heading } from '@godaddy/antares';

export function HeadingExample() {
  return (
    <Flex direction="column" gap="sm">
      <Heading level={1}>Heading level 1</Heading>
      <Heading level={2}>Heading level 2</Heading>
      <Heading level={3}>Heading level 3</Heading>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`align`,children:`Align`}),`
`,(0,S.jsxs)(t.p,{children:[`Setting the `,(0,S.jsx)(t.code,{children:`align`}),` prop allows you to change the alignment of the text. Choose from `,(0,S.jsx)(t.code,{children:`start`}),`, `,(0,S.jsx)(t.code,{children:`center`}),`, `,(0,S.jsx)(t.code,{children:`end`}),`, or `,(0,S.jsx)(t.code,{children:`justify`}),`; the logical keywords support RTL languages.`]}),`
`,(0,S.jsx)(i,{of:u,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Text, type TextProps } from '@godaddy/antares';

export function AlignExample(args: TextProps) {
  return (
    <Text {...args} as="p" align="center">
      Text is aligned to the center
    </Text>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`max-lines`,children:`Max Lines`}),`
`,(0,S.jsxs)(t.p,{children:[`Setting the `,(0,S.jsx)(t.code,{children:`maxLines`}),` prop limits the number of displayed lines using an ellipsis.`]}),`
`,(0,S.jsx)(i,{of:h,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Text, type TextProps } from '@godaddy/antares';

export function MaxLinesExample(args: TextProps) {
  return (
    <div style={{ width: '300px', border: '1px solid red' }}>
      <Text {...args} as="p" maxLines={2}>
        This will have a maximum of two lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    </div>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`wrap`,children:`Wrap`}),`
`,(0,S.jsxs)(t.p,{children:[`Setting the `,(0,S.jsx)(t.code,{children:`wrap`}),` prop controls text wrapping with values such as `,(0,S.jsx)(t.code,{children:`wrap`}),`, `,(0,S.jsx)(t.code,{children:`nowrap`}),`, `,(0,S.jsx)(t.code,{children:`balance`}),`, `,(0,S.jsx)(t.code,{children:`pretty`}),`, or `,(0,S.jsx)(t.code,{children:`stable`}),`.`]}),`
`,(0,S.jsx)(i,{of:_,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Text, type TextProps } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,S.jsxs)(t.p,{children:[`The `,(0,S.jsx)(t.code,{children:`Text`}),` component accepts the following props:`]}),`
`,(0,S.jsx)(a,{of:g}),`
`,(0,S.jsxs)(t.p,{children:[`The `,(0,S.jsx)(t.code,{children:`Heading`}),` component accepts the following props:`]}),`
`,(0,S.jsx)(a,{of:m})]})}function x(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;e((()=>{S=t(),c(),s(),l(),y()}))();export{x as default};