import{j as e}from"./iframe-B6YsZR-s.js";import{u as r,M as s,A as l,a as o,S as i}from"./blocks-BZGFzJ0o.js";import{S as p,P as d,D as m,C as c,a as x,W as h,O as u}from"./pagination.stories-CpCYLsDK.js";import"./preload-helper-PPVm8Dsz.js";import"./index-aoCgFIs9.js";import"./index-LfqjcF53.js";import"./index-BuazBkUi.js";import"./index-ByYkzZOL.js";import"./index-CoB4ipTd.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-Ce5JPAqe.js";import"./Text-DW8Gnoqc.js";import"./mergeProps-DrdZTPdG.js";import"./SSRProvider-KJFVgDLI.js";import"./useObjectRef-Eiy4V38J.js";import"./ProgressBar-yPtRO6U0.js";import"./Label-Bo5g1AOv.js";import"./Hidden-BvkcK_ZZ.js";import"./number-CB4zbwAz.js";import"./filterDOMProps-BNnC3YgW.js";import"./useLabel-BU6pnQRd.js";import"./context-eko6y_L2.js";import"./useButton-ClQguVxy.js";import"./usePress-B9TG5jk1.js";import"./utils-Be10URkw.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-CtcGTmuN.js";import"./useHover-6maYdHuQ.js";import"./platform-D4ZP5NBb.js";import"./useFocusRing-CEsDu7SV.js";import"./useFocusWithin-dVmp3iKd.js";import"./index-BgJ4JvhC.js";import"./index-D4WNNhr0.js";import"./index-BMOTTt02.js";import"./slots-mniS_YlI.js";import"./index-9gIHEIe4.js";import"./index-CLj43KZG.js";import"./index-BNzQTtAG.js";import"./index-k3lOLZFJ.js";import"./create-external-store-TtP3UJpK.js";import"./index-BShBZ7ZW.js";import"./client-DaM_j0N5.js";import"./index-CIbn7BzU.js";import"./index-vl7q0Sm2.js";import"./index-BvmcC5Xv.js";const g=`import { Flex, Pagination } from '@godaddy/antares';
import { useState } from 'react';

export function DefaultExample() {
  const [page, setPage] = useState(0);

  return (
    <Flex direction="column" gap="sm">
      <Pagination total={5} onChange={setPage} />
      <Flex as="span" justifyContent="center">
        Current page: {page}
      </Flex>
    </Flex>
  );
}
`,f=`import { Flex, Pagination } from '@godaddy/antares';
import { useState } from 'react';

export function ControlledExample() {
  const [page, setPage] = useState(2);

  return (
    <Flex direction="column" gap="sm">
      <Pagination total={4} activeIndex={page} onChange={setPage} />
      <Flex as="span" justifyContent="center">
        Current page: {page}
      </Flex>
    </Flex>
  );
}
`,j=`import { Pagination } from '@godaddy/antares';

export function WithLimitExample() {
  return <Pagination total={10} limit={3} />;
}
`,C=`import { Flex, Pagination } from '@godaddy/antares';
import { useState } from 'react';

export function OnChangeExample() {
  const [onChangeValue, setOnChangeValue] = useState<number | undefined>(undefined);

  return (
    <Flex direction="column" gap="sm">
      <Pagination total={3} onChange={setOnChangeValue} />
      <Flex as="span" justifyContent="center">
        onChange: {onChangeValue ?? 'none'}
      </Flex>
    </Flex>
  );
}
`,v=`import { Pagination } from '@godaddy/antares';

export function DefaultActiveExample() {
  return <Pagination total={5} defaultActiveIndex={2} />;
}
`;function a(n){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p,name:"Overview"}),`
`,e.jsx(t.h1,{id:"pagination",children:"Pagination"}),`
`,e.jsx(t.p,{children:"A pagination component with prev/next buttons and dot indicators, configurable page limits, and optional visibility of controls and dots"}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsx(l,{of:d}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsxs(t.p,{children:["The default pagination is uncontrolled. It renders prev/next buttons and one dot per page. The ",e.jsx(t.code,{children:"total"})," prop sets the number of items."]}),`
`,e.jsx(o,{of:m,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:g}),`
`,e.jsx(t.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(t.p,{children:["Pass ",e.jsx(t.code,{children:"activeIndex"})," and ",e.jsx(t.code,{children:"onChange"})," to control the active page externally."]}),`
`,e.jsx(o,{of:c,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:f}),`
`,e.jsx(t.h3,{id:"default-active-index",children:"Default Active Index"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"defaultActiveIndex"})," to set the starting page in uncontrolled mode."]}),`
`,e.jsx(o,{of:x,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:v}),`
`,e.jsx(t.h3,{id:"with-limit",children:"With Limit"}),`
`,e.jsxs(t.p,{children:["Limit the number of items shown per page. When ",e.jsx(t.code,{children:"limit"})," is greater than 1, the number of pages (dots) is derived from ",e.jsx(t.code,{children:"Math.ceil(total / limit)"}),". For example, 10 items with a limit of 3 produces 4 pages (dots)."]}),`
`,e.jsx(o,{of:h,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:j}),`
`,e.jsx(t.h3,{id:"onchange-event",children:"onChange Event"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"onChange"})," callback fires with the new page index whenever the user navigates."]}),`
`,e.jsx(o,{of:u,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:C})]})}function xe(n={}){const{wrapper:t}={...r(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(a,{...n})}):a(n)}export{xe as default};
