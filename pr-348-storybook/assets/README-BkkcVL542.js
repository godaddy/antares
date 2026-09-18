import{i as e}from"./preload-helper-C0wvdM37.js";import{F as t}from"./iframe-CGoVW9BK.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Drngl9sn.js";import{t as c}from"./mdx-react-shim-Bl9Gsb4H.js";import{t as l}from"./runtime-BXZUr_13.js";import{Align as u,As as d,Default as f,DetailProps as p,MaxLines as m,Props as h,Treatments as g,Wrap as _,n as v,t as y}from"./text.stories-B4_yvgT0.js";function b(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(o,{of:v,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`text`,children:`Text`}),`
`,(0,S.jsx)(t.p,{children:`Text component for displaying and formatting text content with alignment and truncation options`}),`
`,(0,S.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`Text`}),` supplies body typography; `,(0,S.jsx)(t.code,{children:`Detail`}),` supplies supporting-copy typography.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Both consume interface size and owning slot defaults. Explicit `,(0,S.jsx)(t.code,{children:`size`}),` and `,(0,S.jsx)(t.code,{children:`emphasis`}),` win independently.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Six tiers: `,(0,S.jsx)(t.code,{children:`xs`}),`, `,(0,S.jsx)(t.code,{children:`sm`}),`, `,(0,S.jsx)(t.code,{children:`md`}),`, `,(0,S.jsx)(t.code,{children:`lg`}),`, `,(0,S.jsx)(t.code,{children:`xl`}),`, and `,(0,S.jsx)(t.code,{children:`2xl`}),`. Standalone defaults to `,(0,S.jsx)(t.code,{children:`md`}),`.`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`emphasis`}),` changes feedback color; omission inherits color, including on Detail.`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`as="strong"`}),` and `,(0,S.jsx)(t.code,{children:`as="em"`}),` provide semantic emphasis. There is no weight prop.`]}),`
`,(0,S.jsx)(t.li,{children:`Inside Button, Text preserves the full label treatment; wrapping, truncation, or color do not reset fonts.`}),`
`]}),`
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
`,(0,S.jsx)(i,{of:m,inline:!0}),`
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
`,(0,S.jsx)(t.h3,{id:`treatments`,children:`Treatments`}),`
`,(0,S.jsx)(t.p,{children:`Six fixed tiers across body, supporting copy, headings, and form labels.`}),`
`,(0,S.jsx)(i,{of:g,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Detail, Flex, Heading, Label, Text } from '@godaddy/antares';

export function TreatmentsExample() {
  return (
    <Flex direction="column" gap="md">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Flex key={size} gap="md" alignItems="baseline" wrap="wrap">
          <Heading size={size}>Heading {size}</Heading>
          <Text size={size}>Body {size}</Text>
          <Detail size={size}>Detail {size}</Detail>
          <Label size={size}>Label {size}</Label>
        </Flex>
      ))}
      <Text as="strong">Strong body</Text>
      <Detail as="em">Emphasized detail</Detail>
      <Text as="p">Paragraph body</Text>
      {(
        ['critical', 'warning', 'success', 'info', 'highlight', 'premium', 'internal', 'neutral', 'passive'] as const
      ).map((emphasis) => (
        <Text key={emphasis} emphasis={emphasis}>
          {emphasis}
        </Text>
      ))}
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,S.jsxs)(t.p,{children:[`Body and Detail read the `,(0,S.jsx)(t.code,{children:`--font-body-*`}),` and `,(0,S.jsx)(t.code,{children:`--font-detail-*`}),` token families: `,(0,S.jsx)(t.code,{children:`family`}),`,
`,(0,S.jsx)(t.code,{children:`weight`}),`, `,(0,S.jsx)(t.code,{children:`line-height`}),`, `,(0,S.jsx)(t.code,{children:`variation`}),`, and `,(0,S.jsx)(t.code,{children:`size-{xs,sm,md,lg,xl,2xl}`}),`. Tokens select
values without changing the meaning of a tier in smaller scopes. Feedback colors use existing
`,(0,S.jsx)(t.code,{children:`--color-feedback-{emphasis}-text`}),` tokens where available, with legacy-intent and literal fallbacks.
Premium, internal, and neutral use their existing legacy feedback intents directly.`]}),`
`,(0,S.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,S.jsx)(t.h3,{id:`text-1`,children:`Text`}),`
`,(0,S.jsx)(a,{of:h}),`
`,(0,S.jsx)(t.h3,{id:`detail`,children:`Detail`}),`
`,(0,S.jsx)(a,{of:p})]})}function x(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;e((()=>{S=t(),c(),s(),l(),y()}))();export{x as default};