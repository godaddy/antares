import{i as e}from"./preload-helper-usAeo7Bx.js";import{y as t}from"./iframe-D8x0_UK5.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-BXDHAEt9.js";import{t as c}from"./mdx-react-shim-Cqn7WpCW.js";import{Default as l,Emphases as u,HighContrast as d,Icons as f,Indicator as p,Props as m,Sizes as h,n as g,t as _}from"./tag.stories-Bfm8uZsF.js";var v,y=e((()=>{v=`import { Tag, type TagProps } from '@godaddy/antares';

export function DefaultExample(props: Partial<TagProps>) {
  return <Tag {...props}>Tag</Tag>;
}
`})),b,x=e((()=>{b=`import { Flex, Tag } from '@godaddy/antares';

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
`})),S,C=e((()=>{S=`import { Flex, Tag } from '@godaddy/antares';

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
`})),w,T=e((()=>{w=`import { Flex, Tag } from '@godaddy/antares';

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
`})),E,D=e((()=>{E=`import { Flex, Tag } from '@godaddy/antares';

export function IconsExample() {
  return (
    <Flex gap="xs" wrap="wrap" alignItems="center">
      <Tag emphasis="critical" icon="alert">
        Critical
      </Tag>
      <Tag emphasis="success" icon="checkmark">
        Success
      </Tag>
      <Tag emphasis="warning" icon="alert">
        Warning
      </Tag>
      <Tag emphasis="info" icon="information">
        Info
      </Tag>
      <Tag emphasis="highlight" icon="star">
        Highlight
      </Tag>
      <Tag emphasis="premium" icon="diamond">
        Premium
      </Tag>
    </Flex>
  );
}
`})),O,k=e((()=>{O=`import { Flex, Tag } from '@godaddy/antares';

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
`}));function A(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(o,{of:g,name:`Overview`}),`
`,(0,M.jsx)(t.h1,{id:`tag`,children:`Tag`}),`
`,(0,M.jsx)(t.p,{children:`Non-interactive labels that highlight statuses and categories.`}),`
`,(0,M.jsx)(t.h2,{id:`overview`,children:`Overview`}),`
`,(0,M.jsx)(t.p,{children:`Tags are short, colored labels that help users quickly identify the status or category of an item. You'll find them on cards, tables, lists, and navigation menus.`}),`
`,(0,M.jsxs)(t.p,{children:[`Tags are `,(0,M.jsx)(t.strong,{children:`read-only`}),` — they display information but cannot be clicked or dismissed.`]}),`
`,(0,M.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-tsx`,children:`import { Tag } from '@godaddy/antares';
`})}),`
`,(0,M.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,M.jsx)(a,{of:m}),`
`,(0,M.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,M.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,M.jsx)(i,{of:l,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:v}),`
`,(0,M.jsx)(t.h3,{id:`emphasis`,children:`Emphasis`}),`
`,(0,M.jsx)(t.p,{children:`Each emphasis communicates a different meaning through color:`}),`
`,(0,M.jsxs)(t.table,{children:[(0,M.jsx)(t.thead,{children:(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.th,{children:`Emphasis`}),(0,M.jsx)(t.th,{children:`Meaning`})]})}),(0,M.jsxs)(t.tbody,{children:[(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`passive`})}),(0,M.jsx)(t.td,{children:`General label, no urgency`})]}),(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`critical`})}),(0,M.jsx)(t.td,{children:`Something went wrong or needs immediate attention`})]}),(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`warning`})}),(0,M.jsx)(t.td,{children:`Heads up — may need action soon`})]}),(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`success`})}),(0,M.jsx)(t.td,{children:`All good — active, complete, or verified`})]}),(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`info`})}),(0,M.jsx)(t.td,{children:`Helpful context or additional detail`})]}),(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`highlight`})}),(0,M.jsx)(t.td,{children:`Something new, featured, or on sale`})]}),(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`premium`})}),(0,M.jsx)(t.td,{children:`Paid feature or upgrade available`})]}),(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`internal`})}),(0,M.jsx)(t.td,{children:`Internal use only`})]}),(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`neutral`})}),(0,M.jsx)(t.td,{children:`Subtle, low-emphasis label`})]})]})]}),`
`,(0,M.jsx)(i,{of:u,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:b}),`
`,(0,M.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,M.jsx)(t.p,{children:`Choose a size that fits the surrounding content. Smaller tags work well in compact layouts like tables; larger tags suit headings or hero sections.`}),`
`,(0,M.jsx)(i,{of:h,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:S}),`
`,(0,M.jsx)(t.h3,{id:`high-contrast`,children:`High Contrast`}),`
`,(0,M.jsx)(t.p,{children:`A bolder color treatment for when tags need to stand out more — for example, on colored backgrounds.`}),`
`,(0,M.jsx)(i,{of:d,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:w}),`
`,(0,M.jsx)(t.h3,{id:`with-icon`,children:`With Icon`}),`
`,(0,M.jsx)(t.p,{children:`Icons can reinforce the tag's meaning at a glance. Pass any icon name as a string.`}),`
`,(0,M.jsx)(i,{of:f,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:E}),`
`,(0,M.jsx)(t.h3,{id:`indicator`,children:`Indicator`}),`
`,(0,M.jsx)(t.p,{children:`A minimal style that uses a small colored dot instead of a full background. Useful in tables or dashboards where too many colors would be distracting.`}),`
`,(0,M.jsx)(i,{of:p,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:O}),`
`,(0,M.jsx)(t.h2,{id:`design-modes`,children:`Design Modes`}),`
`,(0,M.jsxs)(t.table,{children:[(0,M.jsx)(t.thead,{children:(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.th,{children:`Mode`}),(0,M.jsx)(t.th,{children:`What it looks like`}),(0,M.jsx)(t.th,{children:`Best for`})]})}),(0,M.jsxs)(t.tbody,{children:[(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`filled`})}),(0,M.jsx)(t.td,{children:`Colored background with contrasting text`}),(0,M.jsx)(t.td,{children:`Most use cases`})]}),(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`inline`})}),(0,M.jsx)(t.td,{children:`Text only, no background or border`}),(0,M.jsx)(t.td,{children:`Inside paragraphs or sentences`})]}),(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`indicator`})}),(0,M.jsx)(t.td,{children:`White background with a colored dot`}),(0,M.jsx)(t.td,{children:`Tables, lists, data-heavy views`})]})]})]}),`
`,(0,M.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsx)(t.li,{children:`Screen readers will announce the tag's text naturally as part of the page content.`}),`
`,(0,M.jsx)(t.li,{children:`Icons and dots are decorative — they are not read aloud.`}),`
`,(0,M.jsx)(t.li,{children:`Always include a text label. Color alone is not enough to communicate meaning.`}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`when-to-use`,children:`When to Use`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsx)(t.li,{children:`Showing status on a card or list item (e.g. "Active", "Expired")`}),`
`,(0,M.jsx)(t.li,{children:`Categorizing content (e.g. "New", "Sale", "Beta")`}),`
`,(0,M.jsx)(t.li,{children:`Displaying metadata labels (e.g. "Pro", "Free trial")`}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`when-not-to-use`,children:`When Not to Use`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[`If users need to click or dismiss it — use a `,(0,M.jsx)(t.strong,{children:`Chip`}),` or `,(0,M.jsx)(t.strong,{children:`Button`}),` instead.`]}),`
`,(0,M.jsxs)(t.li,{children:[`If you need a number count — use a `,(0,M.jsx)(t.strong,{children:`Badge`}),`.`]}),`
`,(0,M.jsx)(t.li,{children:`If the label is part of a sentence with no visual distinction — just use text.`}),`
`]})]})}function j(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,M.jsx)(t,{...e,children:(0,M.jsx)(A,{...e})}):A(e)}var M;e((()=>{M=t(),c(),s(),_(),y(),x(),C(),T(),D(),k()}))();export{j as default};