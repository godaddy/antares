import{j as e}from"./iframe-mIkG-ia4.js";import{useMDXComponents as r}from"./index-CYbcAVO_.js";import{M as s,A as l,a as o,S as i}from"./blocks-H-xBVXSD.js";import{S as p,P as d,D as m,C as c,a as x,W as h,O as u}from"./pagination.stories-DTRdXZvz.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C8Gy-4ls.js";import"./index-BA5fCnJS.js";import"./index-qmzokPCi.js";import"./index-DrFu-skq.js";import"./index-B_O5YSnX.js";import"./index-BFUvbBmq.js";import"./clsx-CXVhVjWX.js";import"./index-CWmIgOtN.js";import"./mergeProps-VPp-_EQW.js";import"./useObjectRef-CF8ZtGSI.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-BqYfOhcr.js";import"./useFocusWithin-PKv_bTL9.js";import"./platform-BULRNHlZ.js";import"./useFocusable-Cc2c3LHG.js";import"./Collection-CYqfV12Y.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-BdqrIGw6.js";import"./context-6ndoatbe.js";import"./useControlledState-w-gpInWD.js";import"./useOverlayTriggerState-d59EUrgw.js";import"./PortalProvider-Bat0598t.js";import"./usePreventScroll-C01_aj-U.js";import"./useLabel-0AxH-o5c.js";import"./VisuallyHidden-PHHkCmUs.js";import"./useField-DH8Kpi32.js";import"./useButton-DPe44exJ.js";import"./index-Bbfxlgrc.js";import"./index-NOeWBRf7.js";import"./slots-DysxeCnN.js";import"./index-C5i0zoNI.js";import"./index-CLj43KZG.js";import"./index-D5Js5omO.js";import"./index-CYB4ICH7.js";import"./create-external-store-TtP3UJpK.js";import"./index-CjknuouO.js";import"./client-CAUSWO60.js";import"./index-COSOMKr7.js";import"./index-DV1KJj-k.js";const g=`import { Flex, Pagination } from '@godaddy/antares';
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
`,e.jsx(i,{language:"tsx",code:C})]})}function ce(n={}){const{wrapper:t}={...r(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(a,{...n})}):a(n)}export{ce as default};
