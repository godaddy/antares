import{i as e}from"./preload-helper-HTw_Lvtv.js";import{F as t}from"./iframe-BT5d_MRP.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-CAwO14Y7.js";import{t as c}from"./mdx-react-shim-B3vFrI7H.js";import{Alignment as l,Default as u,LegibleLines as d,Props as f,Sizes as p,TagEyebrow as m,WithActions as h,n as g,t as _}from"./text-lockup.stories-DkyQEwA3.js";function v(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(o,{of:g,name:`Overview`}),`
`,(0,b.jsx)(t.h1,{id:`textlockup`,children:`TextLockup`}),`
`,(0,b.jsx)(t.p,{children:`TextLockup stacks an eyebrow, title, and body text as one coordinated type group across six sizes.`}),`
`,(0,b.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[`Six coordinated sizes, from a `,(0,b.jsx)(t.code,{children:`2xl`}),` page title down to `,(0,b.jsx)(t.code,{children:`xs`})]}),`
`,(0,b.jsxs)(t.li,{children:[`An eyebrow that takes plain text or a `,(0,b.jsx)(t.code,{children:`Tag`}),`, sized to match the lockup`]}),`
`,(0,b.jsx)(t.li,{children:`Any heading level, chosen independently of the visual size`}),`
`,(0,b.jsx)(t.li,{children:`Start or center alignment`}),`
`,(0,b.jsx)(t.li,{children:`A legible line-length clamp, on by default`}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,b.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,b.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,b.jsxs)(t.p,{children:[`A lockup stacks an optional eyebrow, a title and body text as one coordinated type
group. You supply the parts, so the title can be any heading level and the body any
number of paragraphs; `,(0,b.jsx)(t.code,{children:`size`}),` sets the tier for all of them at once.`]}),`
`,(0,b.jsx)(i,{of:u,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Heading, Text, TextLockup } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <TextLockup>
      <Text slot="eyebrow">Unaffectedly Modest</Text>
      <Heading>Text Lockup</Heading>
      <Text>She expressed her gratitude again, but it was too painful a subject to be dwelt on farther.</Text>
    </TextLockup>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,b.jsxs)(t.p,{children:[(0,b.jsx)(t.code,{children:`size`}),` is the tier: the eyebrow reads it on the `,(0,b.jsx)(t.code,{children:`detail`}),` ramp, the title on `,(0,b.jsx)(t.code,{children:`heading`}),`,
and the body on `,(0,b.jsx)(t.code,{children:`body`}),`. Use `,(0,b.jsx)(t.code,{children:`2xl`}),` for a page title, `,(0,b.jsx)(t.code,{children:`xl`}),` for a hero, `,(0,b.jsx)(t.code,{children:`lg`}),` for a section
title, and `,(0,b.jsx)(t.code,{children:`md`}),` (the default) everywhere else.`]}),`
`,(0,b.jsx)(i,{of:p,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Flex, Heading, Text, TextLockup, type TextLockupSize } from '@godaddy/antares';

const SIZES: TextLockupSize[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];

export function SizesExample() {
  return (
    <Flex direction="column" gap="lg">
      {SIZES.map(function renderSize(size) {
        return (
          <TextLockup key={size} size={size}>
            <Text slot="eyebrow">Unaffectedly Modest</Text>
            <Heading>Text Lockup</Heading>
            <Text>She expressed her gratitude again, but it was too painful a subject to be dwelt on farther.</Text>
          </TextLockup>
        );
      })}
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`tag-eyebrow`,children:`Tag Eyebrow`}),`
`,(0,b.jsxs)(t.p,{children:[`The eyebrow takes either plain text or a `,(0,b.jsx)(t.code,{children:`Tag`}),`. Both use `,(0,b.jsx)(t.code,{children:`slot="eyebrow"`}),`, so the two
forms swap freely, and the lockup pairs the tag's `,(0,b.jsx)(t.code,{children:`size`}),` with its own.`]}),`
`,(0,b.jsx)(i,{of:m,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Flex, Heading, Tag, Text, TextLockup } from '@godaddy/antares';

export function TagEyebrowExample() {
  return (
    <Flex direction="column" gap="lg">
      <TextLockup size="xl">
        <Tag slot="eyebrow" emphasis="success">
          New
        </Tag>
        <Heading>Tag eyebrow</Heading>
        <Text>The tag is sized to match the lockup, so changing \`size\` keeps them in step.</Text>
      </TextLockup>

      <TextLockup size="sm">
        <Tag slot="eyebrow" emphasis="success">
          New
        </Tag>
        <Heading>The same lockup, smaller</Heading>
        <Text>The tag steps down with it.</Text>
      </TextLockup>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`alignment`,children:`Alignment`}),`
`,(0,b.jsxs)(t.p,{children:[(0,b.jsx)(t.code,{children:`align`}),` centers the parts as well as the text, so a `,(0,b.jsx)(t.code,{children:`Tag`}),` eyebrow stays centered too.`]}),`
`,(0,b.jsx)(i,{of:l,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Flex, Heading, Text, TextLockup } from '@godaddy/antares';

export function AlignmentExample() {
  return (
    <Flex direction="column" gap="lg">
      <TextLockup align="start">
        <Text slot="eyebrow">Unaffectedly Modest</Text>
        <Heading>Start aligned</Heading>
        <Text>She expressed her gratitude again, but it was too painful a subject to be dwelt on farther.</Text>
      </TextLockup>

      <TextLockup align="center">
        <Text slot="eyebrow">Unaffectedly Modest</Text>
        <Heading>Center aligned</Heading>
        <Text>She expressed her gratitude again, but it was too painful a subject to be dwelt on farther.</Text>
      </TextLockup>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`legible-lines`,children:`Legible Lines`}),`
`,(0,b.jsxs)(t.p,{children:[`The text parts are constrained to a comfortable line length by default. Set
`,(0,b.jsx)(t.code,{children:`legibleLines={false}`}),` to let them run the full width of their container, which suits a
lockup already inside a narrow column. Both lockups below share one wide container, so the
clamp is what makes the first one narrower.`]}),`
`,(0,b.jsx)(i,{of:d,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Flex, Heading, Text, TextLockup } from '@godaddy/antares';

const COPY =
  'She expressed her gratitude again, but it was too painful a subject to be dwelt on farther. ' +
  'Elizabeth was pleased to find that he had not betrayed the interference of his friend, and she ' +
  'was glad of it, for she could not have borne the reflection.';

export function LegibleLinesExample() {
  return (
    <Flex direction="column" gap="lg" style={{ inlineSize: '46rem', maxInlineSize: '100%' }}>
      <TextLockup>
        <Heading>Constrained by default</Heading>
        <Text>{COPY}</Text>
      </TextLockup>

      <TextLockup legibleLines={false}>
        <Heading>Full width</Heading>
        <Text>{COPY}</Text>
      </TextLockup>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`with-actions`,children:`With Actions`}),`
`,(0,b.jsxs)(t.p,{children:[`Because you compose the parts, anything else can sit alongside them — a call to action
here. Controls keep their own type: the buttons are unaffected by the lockup's `,(0,b.jsx)(t.code,{children:`size`}),`.`]}),`
`,(0,b.jsx)(i,{of:h,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Button, ButtonGroup, Heading, Tag, Text, TextLockup } from '@godaddy/antares';

export function WithActionsExample() {
  return (
    <TextLockup size="xl">
      <Tag slot="eyebrow" emphasis="premium">
        Pro
      </Tag>
      <Heading level={1}>Upgrade your plan</Heading>
      <Text>Unlock advanced reporting, priority support, and unlimited seats for your whole team.</Text>
      <ButtonGroup inlinePadding="0" blockPadding="0">
        <Button variant="primary">Upgrade</Button>
        <Button variant="secondary">Compare plans</Button>
      </ButtonGroup>
    </TextLockup>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,b.jsxs)(t.p,{children:[(0,b.jsx)(t.code,{children:`TextLockup`}),` positions and type-sets its parts; you supply them. That means anything else can
sit alongside them — a call to action, a second paragraph, an image — without the component
growing a prop for it.`]}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsxs)(t.strong,{children:[`The body is a bare `,(0,b.jsx)(t.code,{children:`<Text>`}),`.`]}),` `,(0,b.jsx)(t.code,{children:`slot="description"`}),` is equivalent.`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsxs)(t.strong,{children:[`The eyebrow is `,(0,b.jsx)(t.code,{children:`slot="eyebrow"`})]}),`, on either a `,(0,b.jsx)(t.code,{children:`Text`}),` or a `,(0,b.jsx)(t.code,{children:`Tag`}),`. The two forms swap
freely, and a `,(0,b.jsx)(t.code,{children:`Tag`}),` is sized to pair with the lockup.`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsxs)(t.strong,{children:[`The title is a `,(0,b.jsx)(t.code,{children:`Heading`}),`.`]}),` Pick the level from the document outline, not the visual size:
`,(0,b.jsx)(t.code,{children:`size`}),` handles the visuals, so `,(0,b.jsx)(t.code,{children:`<Heading level={1}>`}),` in an `,(0,b.jsx)(t.code,{children:`xs`}),` lockup is perfectly valid.`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:`An explicit prop on a child always wins`}),` over what the lockup supplies. Pass
`,(0,b.jsx)(t.code,{children:`<Tag slot="eyebrow" size="sm">`}),` to break the pairing, for instance.`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:`Controls keep their own type.`}),` A `,(0,b.jsx)(t.code,{children:`Button`}),` inside a lockup is sized by its own `,(0,b.jsx)(t.code,{children:`size`}),` prop,
not the lockup's.`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsxs)(t.strong,{children:[(0,b.jsx)(t.code,{children:`size`}),` is the tier.`]}),` The eyebrow reads it on the `,(0,b.jsx)(t.code,{children:`detail`}),` ramp, the title on `,(0,b.jsx)(t.code,{children:`heading`}),`, and
the body on `,(0,b.jsx)(t.code,{children:`body`}),`, so there is no table to memorize.`]}),`
`,(0,b.jsxs)(t.li,{children:[`Pass `,(0,b.jsx)(t.code,{children:`className`}),` to extend the styles, or select on `,(0,b.jsx)(t.code,{children:`[data-size]`}),` and `,(0,b.jsx)(t.code,{children:`[data-align]`}),`.`]}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[`The title carries the heading semantics. Choose `,(0,b.jsx)(t.code,{children:`level`}),` so the page outline stays correct
rather than to achieve a size.`]}),`
`,(0,b.jsxs)(t.li,{children:[`Slots resolve against the lockup, so `,(0,b.jsx)(t.code,{children:`slot="title"`}),` names the lockup's title. Inside a
`,(0,b.jsx)(t.code,{children:`Modal`}),`, `,(0,b.jsx)(t.code,{children:`Drawer`}),` or `,(0,b.jsx)(t.code,{children:`Popover`}),`, give the dialog its own `,(0,b.jsx)(t.code,{children:`<Heading slot="title">`}),` as a direct
child for the accessible name, and use the lockup for the body.`]}),`
`,(0,b.jsx)(t.li,{children:`The eyebrow is decorative in most designs. If it carries meaning, make sure the title still
reads sensibly on its own, since screen reader users often navigate by heading.`}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[`Use one `,(0,b.jsx)(t.code,{children:`2xl`}),` lockup per page at most — it is the page title.`]}),`
`,(0,b.jsxs)(t.li,{children:[`Keep `,(0,b.jsx)(t.code,{children:`legibleLines`}),` on for running prose. Turn it off only when the lockup already sits in a
narrow column, where the clamp does nothing but complicate the layout.`]}),`
`,(0,b.jsxs)(t.li,{children:[`Prefer a `,(0,b.jsx)(t.code,{children:`Tag`}),` eyebrow for status or category, and plain text for a kicker or section label.`]}),`
`,(0,b.jsxs)(t.li,{children:[`Reach for `,(0,b.jsx)(t.code,{children:`MetricsLockup`}),` instead when the emphasis is a single number rather than prose.`]}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-tsx`,children:`<TextLockup>
  <Tag slot="eyebrow" />
  <Heading />
  <Text />
  {/* ... */}
</TextLockup>
`})}),`
`,(0,b.jsx)(a,{of:f})]})}function y(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;e((()=>{b=t(),c(),s(),_()}))();export{y as default};