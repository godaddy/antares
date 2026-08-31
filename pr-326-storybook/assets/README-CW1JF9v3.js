import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-Biz6xSrB.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-VhroJ_WZ.js";import{t as c}from"./mdx-react-shim-AbUrKz4h.js";import{t as l}from"./runtime-CCpseHws.js";import{Align as u,As as d,Default as f,MaxLines as p,Props as m,Wrap as h,n as g,t as _}from"./text.stories-DYKmlUps.js";function v(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(o,{of:g,name:`Overview`}),`
`,(0,b.jsx)(t.h1,{id:`text`,children:`Text`}),`
`,(0,b.jsx)(t.p,{children:`Text component for displaying and formatting text content with alignment and truncation options`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`Text`}),` component prepares content with a few properties.`]}),`
`,(0,b.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,b.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,b.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,b.jsx)(t.p,{children:`Basic text content.`}),`
`,(0,b.jsx)(i,{of:f,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Text, type TextProps } from '@godaddy/antares';

export function DefaultExample(args: TextProps) {
  return <Text {...args}>Hello, world!</Text>;
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`as`,children:`As`}),`
`,(0,b.jsxs)(t.p,{children:[`Setting the `,(0,b.jsx)(t.code,{children:`as`}),` prop allows you to change the HTML tag of the `,(0,b.jsx)(t.code,{children:`Text`}),` component.`]}),`
`,(0,b.jsx)(i,{of:d,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Text, type TextProps } from '@godaddy/antares';

export function AsExample(args: TextProps) {
  return (
    <Text {...args} as="marquee">
      A scrolling marquee
    </Text>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`align`,children:`Align`}),`
`,(0,b.jsxs)(t.p,{children:[`Setting the `,(0,b.jsx)(t.code,{children:`align`}),` prop allows you to change the alignment of the text. Choose from `,(0,b.jsx)(t.code,{children:`start`}),`, `,(0,b.jsx)(t.code,{children:`center`}),`, `,(0,b.jsx)(t.code,{children:`end`}),`, or `,(0,b.jsx)(t.code,{children:`justify`}),`; the logical keywords support RTL languages.`]}),`
`,(0,b.jsx)(i,{of:u,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Text, type TextProps } from '@godaddy/antares';

export function AlignExample(args: TextProps) {
  return (
    <Text {...args} as="p" align="center">
      Text is aligned to the center
    </Text>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`max-lines`,children:`Max Lines`}),`
`,(0,b.jsxs)(t.p,{children:[`Setting the `,(0,b.jsx)(t.code,{children:`maxLines`}),` prop limits the number of displayed lines using an ellipsis.`]}),`
`,(0,b.jsx)(i,{of:p,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Text, type TextProps } from '@godaddy/antares';

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
`,(0,b.jsx)(t.h3,{id:`wrap`,children:`Wrap`}),`
`,(0,b.jsxs)(t.p,{children:[`Setting the `,(0,b.jsx)(t.code,{children:`wrap`}),` prop controls text wrapping with values such as `,(0,b.jsx)(t.code,{children:`wrap`}),`, `,(0,b.jsx)(t.code,{children:`nowrap`}),`, `,(0,b.jsx)(t.code,{children:`balance`}),`, `,(0,b.jsx)(t.code,{children:`pretty`}),`, or `,(0,b.jsx)(t.code,{children:`stable`}),`.`]}),`
`,(0,b.jsx)(i,{of:h,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Text, type TextProps } from '@godaddy/antares';

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
`,(0,b.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`Text`}),` component accepts the following props:`]}),`
`,(0,b.jsx)(a,{of:m})]})}function y(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;e((()=>{b=t(),c(),s(),l(),_()}))();export{y as default};