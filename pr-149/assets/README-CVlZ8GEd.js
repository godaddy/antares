import{j as e}from"./iframe-DsdbgEAN.js";import{useMDXComponents as s}from"./index-D4CwabMa.js";import{M as c,A as d,a as o,S as n}from"./blocks-B4KeIAem.js";import{S as a,P as l,D as p,W as h,C as m}from"./metrics-lockup.stories-LFuH6sRZ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CWBbxuIh.js";import"./index-CkUPM2qk.js";import"./index-uRl_K3Uj.js";import"./index-DrFu-skq.js";import"./index-BsFQJZsy.js";import"./index-UCR1UpKk.js";import"./clsx-W8eOZR1m.js";import"./index-DlG4narS.js";import"./mergeProps-C60AXrlQ.js";import"./useObjectRef-DA0nA0Af.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-83SCRds_.js";import"./useFocusWithin-COuaPyGZ.js";import"./platform-BULRNHlZ.js";import"./useFocusable-DO0ar8kD.js";import"./Collection-BIs8hBcS.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-Ckdm9jpy.js";import"./context-3OURk59P.js";import"./useControlledState-CJsoPAOG.js";import"./useOverlayTriggerState-Bh9JiBss.js";import"./PortalProvider-CEkn41bZ.js";import"./usePreventScroll-Bzc14V9J.js";import"./useLabel-CzHNi-vE.js";import"./VisuallyHidden-Bvzxt1Vl.js";import"./useField-BFjzWxwo.js";import"./useButton-4YUkS2yZ.js";import"./index-ZHSrM6_O.js";import"./index-KVrGFib_.js";import"./slots-CxH4QBkg.js";import"./index-D1Ks4gGt.js";import"./index-CLj43KZG.js";import"./index-C19r2fWI.js";import"./index-LF6fHeKE.js";import"./create-external-store-TtP3UJpK.js";import"./index-Dn0p6Ts8.js";import"./client-B8TSHvFD.js";import"./index-DZMzn0aS.js";import"./index-Chxm4cRu.js";const x=`import { MetricsLockup, type MetricsLockupProps } from '@godaddy/antares';

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
`,j=`import { MetricsLockup } from '@godaddy/antares';

export function WithTrendExample() {
  return <MetricsLockup title="Conversion Rate" data="42%" description="+3.2% vs. last month" trend="positive" />;
}
`,u=`import { MetricsLockup } from '@godaddy/antares';

export function CompactExample() {
  return <MetricsLockup title="Sessions" data="8,021" description="-12% vs. last week" trend="negative" compact />;
}
`;function r(i){const t={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:a,name:"Overview"}),`
`,e.jsx(t.h1,{id:"metricslockup",children:"MetricsLockup"}),`
`,e.jsx(t.p,{children:"The MetricsLockup component displays a single metric with an optional title, info tooltip, trend indicator, and description."}),`
`,e.jsx(t.p,{children:"MetricsLockup displays a metric value prominently, with an optional title and tooltip for context, an optional trend icon to show direction of change, and a description label below the value."}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsx(d,{of:l}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(t.p,{children:"A metric with a title, info tooltip, value, and description."}),`
`,e.jsx(o,{of:p,inline:!0}),`
`,e.jsx(n,{language:"tsx",code:x}),`
`,e.jsx(t.h3,{id:"with-trend",children:"With Trend"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"trend"})," prop to show a directional icon next to the description. Accepts ",e.jsx(t.code,{children:"'positive'"}),", ",e.jsx(t.code,{children:"'negative'"}),", or ",e.jsx(t.code,{children:"'neutral'"}),"."]}),`
`,e.jsx(o,{of:h,inline:!0}),`
`,e.jsx(n,{language:"tsx",code:j}),`
`,e.jsx(t.h3,{id:"compact",children:"Compact"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"compact"})," prop to render the metric value and description inline rather than stacked."]}),`
`,e.jsx(o,{of:m,inline:!0}),`
`,e.jsx(n,{language:"tsx",code:u}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(t.h3,{id:"keyboard",children:"Keyboard"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Key"}),e.jsx(t.th,{children:"Description"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Tab"}),e.jsx(t.td,{children:"Moves focus to the info trigger button and shows the tooltip"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Escape"}),e.jsx(t.td,{children:"Closes the tooltip"})]})]})]}),`
`,e.jsx(t.h3,{id:"aria",children:"ARIA"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["The info trigger button uses ",e.jsx(t.code,{children:'aria-label="More information"'})," to describe its purpose."]}),`
`,e.jsxs(t.li,{children:["The tooltip uses ",e.jsx(t.code,{children:'role="tooltip"'})," and is associated with the info trigger via ",e.jsx(t.code,{children:"aria-describedby"}),"."]}),`
`,e.jsx(t.li,{children:"The info trigger has a minimum touch target of 44×44px, achieved via a CSS pseudo-element, to meet WCAG 2.5.5."}),`
`]}),`
`,e.jsx(t.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Keep tooltip content concise and informative."}),`
`,e.jsxs(t.li,{children:["The ",e.jsx(t.code,{children:"data"})," prop accepts strings or numbers — format currency and percentages before passing them in."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"titleInfo"})," requires ",e.jsx(t.code,{children:"title"})," to be set — the info icon is contextually tied to the title label. If ",e.jsx(t.code,{children:"title"})," is absent, ",e.jsx(t.code,{children:"titleInfo"})," has no effect."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"trend"})," is intended to accompany ",e.jsx(t.code,{children:"description"}),' to provide temporal context (e.g. "↑ +3% vs. last month"). A trend icon alone, with no description, leaves the direction unanchored ("up since ',e.jsx(t.em,{children:"when"}),'?"). If ',e.jsx(t.code,{children:"description"})," is not provided, ",e.jsx(t.code,{children:"trend"})," has no effect."]}),`
`]})]})}function de(i={}){const{wrapper:t}={...s(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(r,{...i})}):r(i)}export{de as default};
