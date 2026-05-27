import{j as e}from"./iframe-cPHtN_oj.js";import{u as r,M as s,A as l,a as o,S as i}from"./blocks-DdKS2Im_.js";import{S as p,P as d,D as m,C as c,a as x,W as h,O as u}from"./pagination.stories-CZ6rnApJ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B7tQXjdW.js";import"./index-tasudasc.js";import"./index-CP0q29wC.js";import"./index-DV1H-FIl.js";import"./index-DH1YCa2S.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-DX-Johrs.js";import"./Text-DTdP3hz0.js";import"./mergeProps-07vFQF63.js";import"./SSRProvider-DwnL9xXt.js";import"./useObjectRef-CDf4s8sh.js";import"./ProgressBar-B6jtVNh0.js";import"./Label-BoetGe84.js";import"./filterDOMProps-SeKkUh_q.js";import"./useLabel-BXXqOex0.js";import"./I18nProvider-DH3PKVnk.js";import"./number-P4c4HRxZ.js";import"./useButton-DAUsPwis.js";import"./useFocusable-Dj_zHUqZ.js";import"./useSyncRef-f8Y6ADGD.js";import"./useGlobalListeners-l8EDc72h.js";import"./DOMFunctions-1-yhhTt0.js";import"./useHover-BxGALELs.js";import"./platform-DTNzKOdA.js";import"./usePress-KApDpc8y.js";import"./useFocusRing-tEmojGgc.js";import"./useFocusWithin-Ck23iiR4.js";import"./index-D5aPdiUQ.js";import"./index-HTd3W1bk.js";import"./index-DnR9hdJQ.js";import"./slots-C4NSIfSd.js";import"./index-zypKTwfF.js";import"./index-CLj43KZG.js";import"./index-CaYbisUj.js";import"./index-CEcgxlbZ.js";import"./create-external-store-TtP3UJpK.js";import"./index-XUrSHlgG.js";import"./client-BDGYVH_C.js";import"./index-Dkr4XQNr.js";import"./index-DDjrDaUw.js";import"./index-CpjFBvNM.js";const g=`import { Flex, Pagination } from '@godaddy/antares';
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
