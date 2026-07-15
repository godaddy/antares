import{i as e}from"./preload-helper-DPdjVz-1.js";import{y as t}from"./iframe-DLDhSgc9.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-BV1GVmsi.js";import{t as c}from"./mdx-react-shim-DbafqrXx.js";import{Compact as l,Default as u,Props as d,WithTrend as f,n as p,t as m}from"./metrics-lockup.stories-X8GiZj7K.js";var h,g=e((()=>{h=`import { MetricsLockup, type MetricsLockupProps } from '@godaddy/antares';

export function DefaultExample(props: Partial<MetricsLockupProps> = {}) {
  return (
    <MetricsLockup
      title="Total Revenue"
      titleInfo="The total revenue across all products for the selected period."
      data="$1,234.56"
      description="vs. last month"
      {...props}
    />
  );
}
`})),_,v=e((()=>{_=`import { MetricsLockup } from '@godaddy/antares';

export function WithTrendExample() {
  return <MetricsLockup title="Conversion Rate" data="42%" description="+3.2% vs. last month" trend="positive" />;
}
`})),y,b=e((()=>{y=`import { MetricsLockup } from '@godaddy/antares';

export function CompactExample() {
  return <MetricsLockup title="Sessions" data="8,021" description="-12% vs. last week" trend="negative" compact />;
}
`}));function x(e){let t={code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(o,{of:p,name:`Overview`}),`
`,(0,C.jsx)(t.h1,{id:`metricslockup`,children:`MetricsLockup`}),`
`,(0,C.jsx)(t.p,{children:`The MetricsLockup component displays a single metric with an optional title, info tooltip, trend indicator, and description.`}),`
`,(0,C.jsx)(t.p,{children:`MetricsLockup displays a metric value prominently, with an optional title and tooltip for context, an optional trend icon to show direction of change, and a description label below the value.`}),`
`,(0,C.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,C.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,C.jsx)(a,{of:d}),`
`,(0,C.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,C.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,C.jsx)(t.p,{children:`A metric with a title, info tooltip, value, and description.`}),`
`,(0,C.jsx)(i,{of:u,inline:!0}),`
`,(0,C.jsx)(r,{language:`tsx`,code:h}),`
`,(0,C.jsx)(t.h3,{id:`with-trend`,children:`With Trend`}),`
`,(0,C.jsxs)(t.p,{children:[`Use the `,(0,C.jsx)(t.code,{children:`trend`}),` prop to show a directional icon next to the description. Accepts `,(0,C.jsx)(t.code,{children:`'positive'`}),`, `,(0,C.jsx)(t.code,{children:`'negative'`}),`, or `,(0,C.jsx)(t.code,{children:`'neutral'`}),`.`]}),`
`,(0,C.jsx)(i,{of:f,inline:!0}),`
`,(0,C.jsx)(r,{language:`tsx`,code:_}),`
`,(0,C.jsx)(t.h3,{id:`compact`,children:`Compact`}),`
`,(0,C.jsxs)(t.p,{children:[`Use the `,(0,C.jsx)(t.code,{children:`compact`}),` prop to render the metric value and description inline rather than stacked.`]}),`
`,(0,C.jsx)(i,{of:l,inline:!0}),`
`,(0,C.jsx)(r,{language:`tsx`,code:y}),`
`,(0,C.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,C.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,C.jsxs)(t.table,{children:[(0,C.jsx)(t.thead,{children:(0,C.jsxs)(t.tr,{children:[(0,C.jsx)(t.th,{children:`Key`}),(0,C.jsx)(t.th,{children:`Description`})]})}),(0,C.jsxs)(t.tbody,{children:[(0,C.jsxs)(t.tr,{children:[(0,C.jsx)(t.td,{children:`Tab`}),(0,C.jsx)(t.td,{children:`Moves focus to the info trigger button and shows the tooltip`})]}),(0,C.jsxs)(t.tr,{children:[(0,C.jsx)(t.td,{children:`Escape`}),(0,C.jsx)(t.td,{children:`Closes the tooltip`})]})]})]}),`
`,(0,C.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[`The info trigger button uses `,(0,C.jsx)(t.code,{children:`aria-label="More information"`}),` to describe its purpose.`]}),`
`,(0,C.jsxs)(t.li,{children:[`The tooltip uses `,(0,C.jsx)(t.code,{children:`role="tooltip"`}),` and is associated with the info trigger via `,(0,C.jsx)(t.code,{children:`aria-describedby`}),`.`]}),`
`,(0,C.jsx)(t.li,{children:`The info trigger has a minimum touch target of 44×44px, achieved via a CSS pseudo-element, to meet WCAG 2.5.5.`}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsx)(t.li,{children:`Keep tooltip content concise and informative.`}),`
`,(0,C.jsxs)(t.li,{children:[`The `,(0,C.jsx)(t.code,{children:`data`}),` prop accepts strings or numbers — format currency and percentages before passing them in.`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`titleInfo`}),` requires `,(0,C.jsx)(t.code,{children:`title`}),` to be set — the info icon is contextually tied to the title label. If `,(0,C.jsx)(t.code,{children:`title`}),` is absent, `,(0,C.jsx)(t.code,{children:`titleInfo`}),` has no effect.`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`trend`}),` is intended to accompany `,(0,C.jsx)(t.code,{children:`description`}),` to provide temporal context (e.g. "↑ +3% vs. last month"). A trend icon alone, with no description, leaves the direction unanchored ("up since `,(0,C.jsx)(t.em,{children:`when`}),`?"). If `,(0,C.jsx)(t.code,{children:`description`}),` is not provided, `,(0,C.jsx)(t.code,{children:`trend`}),` has no effect.`]}),`
`]})]})}function S(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;e((()=>{C=t(),c(),s(),m(),g(),v(),b()}))();export{S as default};