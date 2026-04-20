import{j as e}from"./iframe-nLyyj1q5.js";import{useMDXComponents as r}from"./index-DHuAuATD.js";import{M as s,A as l,a as o,S as i}from"./blocks-CfchxA9Q.js";import{S as p,P as d,D as m,C as c,a as x,W as h,O as u}from"./pagination.stories-qwu3fRVK.js";import"./preload-helper-PPVm8Dsz.js";import"./index-oZJ9SRuu.js";import"./index-Dv2WGlPh.js";import"./index-BAZV8ZSs.js";import"./index-DrFu-skq.js";import"./index-N4TISoNK.js";import"./index-DLHBd9_O.js";import"./clsx-CuMix7pL.js";import"./index-By6QT0nK.js";import"./mergeProps-Dj82BORV.js";import"./useObjectRef-DubBdRti.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-0fTm_PUV.js";import"./useFocusWithin-CFOmfl4c.js";import"./platform-BULRNHlZ.js";import"./useFocusable-mTJIlFtJ.js";import"./Collection-Bvegqbdj.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-CACl_wkS.js";import"./context-CsUWVWwl.js";import"./useControlledState-CHBvbE4n.js";import"./useOverlayTriggerState-CPEvPjmA.js";import"./PortalProvider-Dqb4y-d6.js";import"./usePreventScroll-BeRgKJfa.js";import"./useLabel-BzubZlS5.js";import"./VisuallyHidden-DvfX2Rpi.js";import"./useField-DBuo5eou.js";import"./useButton-DRT2sgsw.js";import"./index-BA94Y-c_.js";import"./index-DI_U8bO9.js";import"./slots-CvWYgalz.js";import"./index-BbgFlw9F.js";import"./index-CLj43KZG.js";import"./index-MheIbCkD.js";import"./index-D1qLz55W.js";import"./create-external-store-TtP3UJpK.js";import"./index-d6QA_jw4.js";import"./client-Dg6pgMDf.js";import"./index-BwsZtCmf.js";import"./index-BormZQiZ.js";const g=`import { Flex, Pagination } from '@godaddy/antares';
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
