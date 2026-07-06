import{i as e}from"./preload-helper-r38FjZtB.js";import{y as t}from"./iframe-rqmcBZiQ.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-CvDsPpKC.js";import{t as c}from"./mdx-react-shim-ExQ0cklr.js";import{Default as l,Emphases as u,HighContrast as d,Icons as f,Indicator as p,Inline as m,Props as h,Sizes as g,n as _,t as v}from"./tag.stories-C-sMTgiB.js";var y,b=e((()=>{y=`import { Tag, type TagProps } from '@godaddy/antares';

export function DefaultExample(props: Partial<TagProps>) {
  return <Tag {...props}>Tag</Tag>;
}
`})),x,S=e((()=>{x=`import { Flex, Tag } from '@godaddy/antares';

const emphases = [
  'passive',
  'critical',
  'warning',
  'success',
  'info',
  'highlight',
  'premium',
  'internal',
  'neutral'
] as const;

export function EmphasesExample() {
  return (
    <Flex gap="xs" wrap="wrap" alignItems="center">
      {emphases.map((emphasis) => (
        <Tag key={emphasis} emphasis={emphasis}>
          {emphasis}
        </Tag>
      ))}
    </Flex>
  );
}
`})),C,w=e((()=>{C=`import { Flex, Tag } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex gap="xs" wrap="wrap" alignItems="center">
      <Tag size="sm" emphasis="info">
        Small
      </Tag>
      <Tag size="md" emphasis="info">
        Medium
      </Tag>
      <Tag size="lg" emphasis="info">
        Large
      </Tag>
    </Flex>
  );
}
`})),T,E=e((()=>{T=`import { Tag } from '@godaddy/antares';

export function InlineExample() {
  return (
    <p>
      This domain is{' '}
      <Tag emphasis="success" design="inline">
        Active
      </Tag>{' '}
      and your plan is{' '}
      <Tag emphasis="premium" design="inline">
        Pro
      </Tag>
      .
    </p>
  );
}
`})),D,O=e((()=>{D=`import { Flex, Tag } from '@godaddy/antares';

const emphases = [
  'passive',
  'critical',
  'warning',
  'success',
  'info',
  'highlight',
  'premium',
  'internal',
  'neutral'
] as const;

export function HighContrastExample() {
  return (
    <Flex gap="xs" wrap="wrap" alignItems="center">
      {emphases.map((emphasis) => (
        <Tag key={emphasis} emphasis={emphasis} highContrast>
          {emphasis}
        </Tag>
      ))}
    </Flex>
  );
}
`})),k,A=e((()=>{k=`import { Flex, Icon, Tag } from '@godaddy/antares';

export function IconsExample() {
  return (
    <Flex gap="xs" wrap="wrap" alignItems="center">
      <Tag emphasis="critical">
        <Icon icon="alert" aria-hidden="true" />
        Critical
      </Tag>
      <Tag emphasis="success">
        <Icon icon="checkmark" aria-hidden="true" />
        Success
      </Tag>
      <Tag emphasis="warning">
        <Icon icon="alert" aria-hidden="true" />
        Warning
      </Tag>
      <Tag emphasis="info">
        <Icon icon="information" aria-hidden="true" />
        Info
      </Tag>
      <Tag emphasis="highlight">
        <Icon icon="star" aria-hidden="true" />
        Highlight
      </Tag>
      <Tag emphasis="premium">
        <Icon icon="diamond" aria-hidden="true" />
        Premium
      </Tag>
    </Flex>
  );
}
`})),j,M=e((()=>{j=`import { Flex, Tag } from '@godaddy/antares';

const emphases = [
  'passive',
  'critical',
  'warning',
  'success',
  'info',
  'highlight',
  'premium',
  'internal',
  'neutral'
] as const;

export function IndicatorExample() {
  return (
    <Flex gap="xs" wrap="wrap" alignItems="center">
      {emphases.map((emphasis) => (
        <Tag key={emphasis} emphasis={emphasis} indicator>
          {emphasis}
        </Tag>
      ))}
    </Flex>
  );
}
`}));function N(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(o,{of:_,name:`Overview`}),`
`,(0,F.jsx)(t.h1,{id:`tag`,children:`Tag`}),`
`,(0,F.jsx)(t.p,{children:`Non-interactive labels that highlight statuses and categories.`}),`
`,(0,F.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,F.jsx)(t.pre,{children:(0,F.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,F.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,F.jsx)(a,{of:h}),`
`,(0,F.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,F.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,F.jsx)(t.p,{children:`A minimal tag with the default emphasis and size.`}),`
`,(0,F.jsx)(i,{of:l,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:y}),`
`,(0,F.jsx)(t.h3,{id:`emphasis`,children:`Emphasis`}),`
`,(0,F.jsx)(t.p,{children:`Nine emphasis options are available. Choose the one that fits the visual tone of your context.`}),`
`,(0,F.jsx)(i,{of:u,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:x}),`
`,(0,F.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,F.jsx)(t.p,{children:`Choose a size that fits the surrounding content. Smaller tags work well in compact layouts like tables; larger tags suit headings or hero sections.`}),`
`,(0,F.jsx)(i,{of:g,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:C}),`
`,(0,F.jsx)(t.h3,{id:`inline`,children:`Inline`}),`
`,(0,F.jsxs)(t.p,{children:[`Use `,(0,F.jsx)(t.code,{children:`design="inline"`}),` to embed a tag within a sentence. The background and border are removed so the tag blends into the text flow.`]}),`
`,(0,F.jsx)(i,{of:m,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:T}),`
`,(0,F.jsx)(t.h3,{id:`high-contrast`,children:`High Contrast`}),`
`,(0,F.jsx)(t.p,{children:`A bolder color treatment for when tags need to stand out more — for example, on colored backgrounds.`}),`
`,(0,F.jsx)(i,{of:d,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:D}),`
`,(0,F.jsx)(t.h3,{id:`with-icon`,children:`With Icon`}),`
`,(0,F.jsxs)(t.p,{children:[`Icons reinforce the tag's meaning at a glance. Add an `,(0,F.jsx)(t.code,{children:`Icon`}),` as a child — it inherits the tag's color and scales with its size.`]}),`
`,(0,F.jsx)(i,{of:f,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:k}),`
`,(0,F.jsx)(t.h3,{id:`indicator`,children:`Indicator`}),`
`,(0,F.jsx)(t.p,{children:`A minimal style that pairs a small colored dot with a neutral background. Well suited for dense layouts like tables or dashboards where multiple tags in close proximity would otherwise compete for attention.`}),`
`,(0,F.jsx)(i,{of:p,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:j}),`
`,(0,F.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,F.jsx)(t.h3,{id:`screen-readers`,children:`Screen readers`}),`
`,(0,F.jsxs)(t.p,{children:[`Tags are `,(0,F.jsx)(t.code,{children:`<span>`}),` elements with no special ARIA role. Screen readers announce the tag's text as part of normal page content — no extra markup is needed.`]}),`
`,(0,F.jsx)(t.h3,{id:`decorative-icons`,children:`Decorative icons`}),`
`,(0,F.jsxs)(t.p,{children:[`Icons passed as children must include `,(0,F.jsx)(t.code,{children:`aria-hidden="true"`}),` so they are skipped by screen readers. The text label is the sole carrier of meaning.`]}),`
`,(0,F.jsx)(t.pre,{children:(0,F.jsx)(t.code,{className:`language-tsx`,children:`<Tag emphasis="critical">
  <Icon icon="alert" aria-hidden="true" />
  Expired
</Tag>
`})}),`
`,(0,F.jsx)(t.h3,{id:`indicator-dot`,children:`Indicator dot`}),`
`,(0,F.jsx)(t.p,{children:`The colored dot is decorative and invisible to screen readers. The text label must convey the status on its own — never rely on the dot alone to communicate meaning.`}),`
`,(0,F.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,F.jsxs)(t.ul,{children:[`
`,(0,F.jsx)(t.li,{children:`Use the indicator style in dense layouts like tables and dashboards. Use the filled style when the tag is a prominent, standalone element on a card or hero section.`}),`
`,(0,F.jsx)(t.li,{children:`Default to the small size in compact layouts like tables and lists. Use medium or large only when the tag needs to stand out as a primary piece of information.`}),`
`,(0,F.jsx)(t.li,{children:`Use the inline design only within running prose. In grouped or standalone contexts, the filled style provides better visual separation.`}),`
`,(0,F.jsx)(t.li,{children:`Do not stack multiple tags of different emphasis on the same item. Choose the most important one — too many competing labels lose their meaning.`}),`
`]}),`
`,(0,F.jsx)(t.h2,{id:`when-to-use`,children:`When to Use`}),`
`,(0,F.jsxs)(t.ul,{children:[`
`,(0,F.jsx)(t.li,{children:`Showing the status of an item on a card, table row, or list entry (e.g. "Active", "Expired", "Pending")`}),`
`,(0,F.jsx)(t.li,{children:`Categorizing or grouping content so users can scan and filter quickly (e.g. "New", "Sale", "Beta")`}),`
`,(0,F.jsx)(t.li,{children:`Surfacing metadata about an item (e.g. "Pro", "Free trial", "Internal")`}),`
`,(0,F.jsx)(t.li,{children:`Communicating priority or category in project management and collaboration tools (e.g. "High priority", "In review")`}),`
`]}),`
`,(0,F.jsx)(t.h2,{id:`when-not-to-use`,children:`When Not to Use`}),`
`,(0,F.jsxs)(t.ul,{children:[`
`,(0,F.jsxs)(t.li,{children:[`If users need to click or dismiss it — use a `,(0,F.jsx)(t.strong,{children:`Button`}),` instead.`]}),`
`,(0,F.jsx)(t.li,{children:`If the label is part of a sentence with no visual distinction — just use text.`}),`
`]})]})}function P(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,F.jsx)(t,{...e,children:(0,F.jsx)(N,{...e})}):N(e)}var F;e((()=>{F=t(),c(),s(),v(),b(),S(),w(),E(),O(),A(),M()}))();export{P as default};