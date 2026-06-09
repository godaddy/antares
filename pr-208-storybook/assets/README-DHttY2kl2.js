import{i as e}from"./preload-helper-usAeo7Bx.js";import{y as t}from"./iframe-BkrCR3JY.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DKMuXsLb.js";import{t as c}from"./mdx-react-shim-C9bG_Ok_.js";import{Default as l,Emphases as u,HighContrast as d,Icons as f,Indicator as p,Inline as m,Props as h,Sizes as g,n as _,t as v}from"./tag.stories-EcM5DKR8.js";var y,b=e((()=>{y=`import { Tag, type TagProps } from '@godaddy/antares';

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
        <Icon icon="alert" />
        Critical
      </Tag>
      <Tag emphasis="success">
        <Icon icon="checkmark" />
        Success
      </Tag>
      <Tag emphasis="warning">
        <Icon icon="alert" />
        Warning
      </Tag>
      <Tag emphasis="info">
        <Icon icon="information" />
        Info
      </Tag>
      <Tag emphasis="highlight">
        <Icon icon="star" />
        Highlight
      </Tag>
      <Tag emphasis="premium">
        <Icon icon="diamond" />
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
`}));function N(e){let t={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(o,{of:_,name:`Overview`}),`
`,(0,F.jsx)(t.h1,{id:`tag`,children:`Tag`}),`
`,(0,F.jsx)(t.p,{children:`Non-interactive labels that highlight statuses and categories.`}),`
`,(0,F.jsx)(t.h2,{id:`overview`,children:`Overview`}),`
`,(0,F.jsx)(t.p,{children:`Tags are short, colored labels that help users quickly identify the status or category of an item. You'll find them on cards, tables, lists, and navigation menus.`}),`
`,(0,F.jsxs)(t.p,{children:[`Tags are `,(0,F.jsx)(t.strong,{children:`read-only`}),` — they display information but cannot be clicked or dismissed.`]}),`
`,(0,F.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,F.jsx)(t.pre,{children:(0,F.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,F.jsx)(t.pre,{children:(0,F.jsx)(t.code,{className:`language-tsx`,children:`import { Tag } from '@godaddy/antares';
`})}),`
`,(0,F.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,F.jsx)(a,{of:h}),`
`,(0,F.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,F.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,F.jsx)(i,{of:l,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:y}),`
`,(0,F.jsx)(t.h3,{id:`emphasis`,children:`Emphasis`}),`
`,(0,F.jsx)(t.p,{children:`Each emphasis communicates a different meaning through color:`}),`
`,(0,F.jsxs)(t.table,{children:[(0,F.jsx)(t.thead,{children:(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.th,{children:`Emphasis`}),(0,F.jsx)(t.th,{children:`Meaning`})]})}),(0,F.jsxs)(t.tbody,{children:[(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`passive`})}),(0,F.jsx)(t.td,{children:`General label, no urgency`})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`critical`})}),(0,F.jsx)(t.td,{children:`Something went wrong or needs immediate attention`})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`warning`})}),(0,F.jsx)(t.td,{children:`Heads up — may need action soon`})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`success`})}),(0,F.jsx)(t.td,{children:`All good — active, complete, or verified`})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`info`})}),(0,F.jsx)(t.td,{children:`Helpful context or additional detail`})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`highlight`})}),(0,F.jsx)(t.td,{children:`Something new, featured, or on sale`})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`premium`})}),(0,F.jsx)(t.td,{children:`Paid feature or upgrade available`})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`internal`})}),(0,F.jsx)(t.td,{children:`Internal use only`})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`neutral`})}),(0,F.jsx)(t.td,{children:`Subtle, low-emphasis label`})]})]})]}),`
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
`,(0,F.jsx)(t.p,{children:`A minimal style that uses a small colored dot instead of a full background. Useful in tables or dashboards where too many colors would be distracting.`}),`
`,(0,F.jsx)(i,{of:p,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:j}),`
`,(0,F.jsx)(t.h2,{id:`design-modes`,children:`Design Modes`}),`
`,(0,F.jsxs)(t.p,{children:[`The `,(0,F.jsx)(t.code,{children:`design`}),` prop controls the visual treatment:`]}),`
`,(0,F.jsxs)(t.table,{children:[(0,F.jsx)(t.thead,{children:(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.th,{children:(0,F.jsx)(t.code,{children:`design`})}),(0,F.jsx)(t.th,{children:`What it looks like`}),(0,F.jsx)(t.th,{children:`Best for`})]})}),(0,F.jsxs)(t.tbody,{children:[(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`filled`})}),(0,F.jsx)(t.td,{children:`Colored background with contrasting text`}),(0,F.jsx)(t.td,{children:`Most use cases`})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:(0,F.jsx)(t.code,{children:`inline`})}),(0,F.jsx)(t.td,{children:`Text only, no background or border`}),(0,F.jsx)(t.td,{children:`Inside paragraphs or sentences`})]})]})]}),`
`,(0,F.jsxs)(t.blockquote,{children:[`
`,(0,F.jsxs)(t.p,{children:[(0,F.jsx)(t.strong,{children:`Indicator`}),` is a separate boolean prop (`,(0,F.jsx)(t.code,{children:`indicator={true}`}),`), not a `,(0,F.jsx)(t.code,{children:`design`}),` value. It renders a colored dot on a plain background and forces high-contrast colors — useful in tables and data-heavy views. See the `,(0,F.jsx)(t.a,{href:`#indicator`,children:`Indicator`}),` example above.`]}),`
`]}),`
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
`,(0,F.jsxs)(t.p,{children:[`The colored dot is a CSS `,(0,F.jsx)(t.code,{children:`::before`}),` pseudo-element with no text content. It is invisible to screen readers by design. The text label must convey the status on its own.`]}),`
`,(0,F.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,F.jsxs)(t.ul,{children:[`
`,(0,F.jsxs)(t.li,{children:[`Use `,(0,F.jsx)(t.code,{children:`indicator`}),` for dense layouts (tables, dashboards) where a full colored background would be distracting. Reserve `,(0,F.jsx)(t.code,{children:`filled`}),` for prominent placements like cards or hero sections.`]}),`
`,(0,F.jsxs)(t.li,{children:[`Always mark decorative icons with `,(0,F.jsx)(t.code,{children:`aria-hidden="true"`}),` — the text label carries the meaning, not the icon.`]}),`
`,(0,F.jsxs)(t.li,{children:[`Default to `,(0,F.jsx)(t.code,{children:`size="sm"`}),` in tables and compact lists. Step up to `,(0,F.jsx)(t.code,{children:`md`}),` or `,(0,F.jsx)(t.code,{children:`lg`}),` only when the tag is a primary visual element.`]}),`
`,(0,F.jsxs)(t.li,{children:[`Use `,(0,F.jsx)(t.code,{children:`design="inline"`}),` only within running text. Avoid it in standalone or grouped tag contexts where the background provides useful visual separation.`]}),`
`,(0,F.jsx)(t.li,{children:`Do not combine multiple tags of different emphasis on the same item. Choose the most important one — stacking emphasis dilutes all of them.`}),`
`]}),`
`,(0,F.jsx)(t.h2,{id:`when-to-use`,children:`When to Use`}),`
`,(0,F.jsxs)(t.ul,{children:[`
`,(0,F.jsx)(t.li,{children:`Showing status on a card or list item (e.g. "Active", "Expired")`}),`
`,(0,F.jsx)(t.li,{children:`Categorizing content (e.g. "New", "Sale", "Beta")`}),`
`,(0,F.jsx)(t.li,{children:`Displaying metadata labels (e.g. "Pro", "Free trial")`}),`
`]}),`
`,(0,F.jsx)(t.h2,{id:`when-not-to-use`,children:`When Not to Use`}),`
`,(0,F.jsxs)(t.ul,{children:[`
`,(0,F.jsxs)(t.li,{children:[`If users need to click or dismiss it — use a `,(0,F.jsx)(t.strong,{children:`Chip`}),` or `,(0,F.jsx)(t.strong,{children:`Button`}),` instead.`]}),`
`,(0,F.jsxs)(t.li,{children:[`If you need a number count — use a `,(0,F.jsx)(t.strong,{children:`Badge`}),`.`]}),`
`,(0,F.jsx)(t.li,{children:`If the label is part of a sentence with no visual distinction — just use text.`}),`
`]})]})}function P(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,F.jsx)(t,{...e,children:(0,F.jsx)(N,{...e})}):N(e)}var F;e((()=>{F=t(),c(),s(),v(),b(),S(),w(),E(),O(),A(),M()}))();export{P as default};