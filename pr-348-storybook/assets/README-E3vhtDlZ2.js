import{i as e}from"./preload-helper-C0wvdM37.js";import{F as t}from"./iframe-CUWHGQWm.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-GIQ9YDSX.js";import{t as c}from"./mdx-react-shim-CRkZoiQD.js";import{t as l}from"./runtime-BXZUr_13.js";import{Align as u,As as d,Default as f,Detail as p,DetailProps as m,Emphasis as h,MaxLines as g,Props as _,Sizes as v,Wrap as y,n as b,t as x}from"./text.stories-DAYaMJaT.js";function S(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(o,{of:b,name:`Overview`}),`
`,(0,w.jsx)(t.h1,{id:`text`,children:`Text`}),`
`,(0,w.jsx)(t.p,{children:`Body copy and supporting detail, with size, emphasis, alignment, and truncation options`}),`
`,(0,w.jsxs)(t.p,{children:[(0,w.jsx)(t.code,{children:`Text`}),` is body copy and `,(0,w.jsx)(t.code,{children:`Detail`}),` is supporting copy: captions, metadata, and hints.`]}),`
`,(0,w.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`Text`}),` applies the body role and `,(0,w.jsx)(t.code,{children:`Detail`}),` the detail role, each at the tier of the nearest
`,(0,w.jsx)(t.a,{href:`../size-provider/README.mdx`,children:`SizeProvider`}),`, or `,(0,w.jsx)(t.code,{children:`md`}),` outside any scope.`]}),`
`,(0,w.jsxs)(t.li,{children:[`Inside a component's named part, such as a field description or a lockup body, the part sets the
treatment. Inside a control, the label keeps the control's type, so
`,(0,w.jsx)(t.code,{children:`<Button><Text>Save</Text></Button>`}),` looks exactly like `,(0,w.jsx)(t.code,{children:`<Button>Save</Button>`}),`.`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`size`}),` picks a step on the component's own ramp (`,(0,w.jsx)(t.code,{children:`xs`}),` to `,(0,w.jsx)(t.code,{children:`2xl`}),`) and changes only the font size.`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`emphasis`}),` picks a feedback color and changes only the color.`]}),`
`,(0,w.jsxs)(t.li,{children:[`For semantic emphasis, render `,(0,w.jsx)(t.code,{children:`as="strong"`}),` or `,(0,w.jsx)(t.code,{children:`as="em"`}),`.`]}),`
`]}),`
`,(0,w.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,w.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,w.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,w.jsx)(t.p,{children:`Basic text content.`}),`
`,(0,w.jsx)(i,{of:f,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Text, type TextProps } from '@godaddy/antares';

export function DefaultExample(args: TextProps) {
  return <Text {...args}>Hello, world!</Text>;
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`as`,children:`As`}),`
`,(0,w.jsxs)(t.p,{children:[`Setting the `,(0,w.jsx)(t.code,{children:`as`}),` prop allows you to change the HTML tag of the `,(0,w.jsx)(t.code,{children:`Text`}),` component.`]}),`
`,(0,w.jsx)(i,{of:d,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Text, type TextProps } from '@godaddy/antares';

export function AsExample(args: TextProps) {
  return (
    <Text {...args} as="marquee">
      A scrolling marquee
    </Text>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`align`,children:`Align`}),`
`,(0,w.jsxs)(t.p,{children:[`Setting the `,(0,w.jsx)(t.code,{children:`align`}),` prop allows you to change the alignment of the text. Choose from `,(0,w.jsx)(t.code,{children:`start`}),`, `,(0,w.jsx)(t.code,{children:`center`}),`, `,(0,w.jsx)(t.code,{children:`end`}),`, or `,(0,w.jsx)(t.code,{children:`justify`}),`; the logical keywords support RTL languages.`]}),`
`,(0,w.jsx)(i,{of:u,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Text, type TextProps } from '@godaddy/antares';

export function AlignExample(args: TextProps) {
  return (
    <Text {...args} as="p" align="center">
      Text is aligned to the center
    </Text>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`max-lines`,children:`Max Lines`}),`
`,(0,w.jsxs)(t.p,{children:[`Setting the `,(0,w.jsx)(t.code,{children:`maxLines`}),` prop limits the number of displayed lines using an ellipsis.`]}),`
`,(0,w.jsx)(i,{of:g,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Text, type TextProps } from '@godaddy/antares';

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
`,(0,w.jsx)(t.h3,{id:`wrap`,children:`Wrap`}),`
`,(0,w.jsxs)(t.p,{children:[`Setting the `,(0,w.jsx)(t.code,{children:`wrap`}),` prop controls text wrapping with values such as `,(0,w.jsx)(t.code,{children:`wrap`}),`, `,(0,w.jsx)(t.code,{children:`nowrap`}),`, `,(0,w.jsx)(t.code,{children:`balance`}),`, `,(0,w.jsx)(t.code,{children:`pretty`}),`, or `,(0,w.jsx)(t.code,{children:`stable`}),`.`]}),`
`,(0,w.jsx)(i,{of:y,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Text, type TextProps } from '@godaddy/antares';

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
`,(0,w.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,w.jsxs)(t.p,{children:[`Without `,(0,w.jsx)(t.code,{children:`size`}),`, text takes the scope's body tier, or `,(0,w.jsx)(t.code,{children:`md`}),` outside any scope. `,(0,w.jsx)(t.code,{children:`size`}),` picks a step
on the body ramp and changes only the font size.`]}),`
`,(0,w.jsx)(i,{of:v,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Flex, Text } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="sm">
      <Text>Default</Text>
      <Text size="xs">Extra small</Text>
      <Text size="sm">Small</Text>
      <Text size="md">Medium</Text>
      <Text size="lg">Large</Text>
      <Text size="xl">Extra large</Text>
      <Text size="2xl">2x large</Text>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`emphasis`,children:`Emphasis`}),`
`,(0,w.jsxs)(t.p,{children:[(0,w.jsx)(t.code,{children:`emphasis`}),` selects a feedback color and changes nothing else. Without it, text inherits the
surrounding color.`]}),`
`,(0,w.jsx)(i,{of:h,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Flex, Text } from '@godaddy/antares';

export function EmphasisExample() {
  return (
    <Flex direction="column" gap="sm">
      <Text emphasis="critical">Payment failed</Text>
      <Text emphasis="warning">Card expires soon</Text>
      <Text emphasis="success">Payment received</Text>
      <Text emphasis="info">Invoice sent</Text>
      <Text emphasis="passive">No recent activity</Text>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`detail`,children:`Detail`}),`
`,(0,w.jsxs)(t.p,{children:[(0,w.jsx)(t.code,{children:`Detail`}),` is supporting copy, such as captions and metadata, on the detail ramp. It keeps the
surrounding color; add `,(0,w.jsx)(t.code,{children:`emphasis="passive"`}),` to mute it.`]}),`
`,(0,w.jsx)(i,{of:p,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { Detail, Flex, Text } from '@godaddy/antares';

export function DetailExample() {
  return (
    <Flex direction="column" gap="xs">
      <Text>Quarterly report</Text>
      <Detail emphasis="passive">Updated 2 hours ago</Detail>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,w.jsx)(t.h3,{id:`text-1`,children:`Text`}),`
`,(0,w.jsx)(a,{of:_}),`
`,(0,w.jsx)(t.h3,{id:`detail-1`,children:`Detail`}),`
`,(0,w.jsx)(a,{of:m})]})}function C(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(S,{...e})}):S(e)}var w;e((()=>{w=t(),c(),s(),l(),x()}))();export{C as default};