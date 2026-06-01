import{j as e}from"./iframe-BB45uQw9.js";import{u as r,M as s,A as l,a as o,S as i}from"./blocks-UXsbcjKo.js";import{S as d,P as p,D as c,C as m,a as x,W as h,O as u}from"./pagination.stories-CzBV67Pt.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CR40qPoM.js";import"./index-DOdcITIN.js";import"./index-DeSYg_wK.js";import"./index-Cvl1c-4r.js";import"./index-DdMMKOFe.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-CiCkcGr-.js";import"./Text-ZJBEvf3Z.js";import"./SSRProvider-BOxRGIuL.js";import"./ProgressBar-CksUgyRi.js";import"./useLabel-Ce6K44CG.js";import"./filterDOMProps-SeKkUh_q.js";import"./I18nProvider-D3qKFq3v.js";import"./number-P4c4HRxZ.js";import"./useHover-Bl0j5gjk.js";import"./useFocusRing-YLaLPNA4.js";import"./index-wbPc2JB2.js";import"./index-PdJvjei7.js";import"./index-B60S3ST-.js";import"./slots-DItSrxYQ.js";import"./index-DUeUyk1J.js";import"./index-CLj43KZG.js";import"./index--02ypIH8.js";import"./index-DwYknOof.js";import"./create-external-store-TtP3UJpK.js";import"./index-CtfwK49U.js";import"./client-M8dWfCpX.js";import"./index-DCbJJuRD.js";import"./index-0Umr2O2Q.js";import"./index-Cs9YjUtQ.js";const g=`import { Flex, Pagination } from '@godaddy/antares';
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
`;function a(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d,name:"Overview"}),`
`,e.jsx(n.h1,{id:"pagination",children:"Pagination"}),`
`,e.jsx(n.p,{children:"A pagination component with prev/next buttons and dot indicators, configurable page limits, and optional visibility of controls and dots"}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsx(l,{of:p}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsxs(n.p,{children:["The default pagination is uncontrolled. It renders prev/next buttons and one dot per page. The ",e.jsx(n.code,{children:"total"})," prop sets the number of items."]}),`
`,e.jsx(o,{of:c,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:g}),`
`,e.jsx(n.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(n.p,{children:["Pass ",e.jsx(n.code,{children:"activeIndex"})," and ",e.jsx(n.code,{children:"onChange"})," to control the active page externally."]}),`
`,e.jsx(o,{of:m,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:f}),`
`,e.jsx(n.h3,{id:"default-active-index",children:"Default Active Index"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"defaultActiveIndex"})," to set the starting page in uncontrolled mode."]}),`
`,e.jsx(o,{of:x,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:v}),`
`,e.jsx(n.h3,{id:"with-limit",children:"With Limit"}),`
`,e.jsxs(n.p,{children:["Limit the number of items shown per page. When ",e.jsx(n.code,{children:"limit"})," is greater than 1, the number of pages (dots) is derived from ",e.jsx(n.code,{children:"Math.ceil(total / limit)"}),". For example, 10 items with a limit of 3 produces 4 pages (dots)."]}),`
`,e.jsx(o,{of:h,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:j}),`
`,e.jsx(n.h3,{id:"onchange-event",children:"onChange Event"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"onChange"})," callback fires with the new page index whenever the user navigates."]}),`
`,e.jsx(o,{of:u,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:C})]})}function te(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}export{te as default};
