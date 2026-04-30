import{j as e}from"./iframe-Cmkc_zNT.js";import{useMDXComponents as r}from"./index-e0NckJKE.js";import{M as s,A as l,a as o,S as i}from"./blocks-CCA1xv68.js";import{S as p,P as d,D as c,C as m,a as x,W as h,O as u}from"./pagination.stories-Cj7QVwTU.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CNYGrzkj.js";import"./index-_sy_8S40.js";import"./index-zTpLJ-5v.js";import"./index-BZ348YYi.js";import"./index-CVOn4Twy.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-c_2gUA1y.js";import"./Text-BDoRCiZp.js";import"./mergeProps-COV7KoS4.js";import"./SSRProvider-C-Mckw8c.js";import"./useObjectRef-CJgbyJ_r.js";import"./Hidden-CPHOgJ5r.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-DXDVp7zX.js";import"./usePress-DuIRiI4D.js";import"./utils-b2Nzz-mJ.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-Mlx9Lagw.js";import"./useHover-Bj4nM2PE.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-BFvaSFf5.js";import"./useFocusWithin-Bh6Uosyd.js";import"./index-D5bbhGJ_.js";import"./index-uEWPWApN.js";import"./index-C_4hEREJ.js";import"./slots-CRAqpFQb.js";import"./index-DLl4a_pS.js";import"./index-CLj43KZG.js";import"./index-CvCxQCUq.js";import"./index-D9VeQ76N.js";import"./create-external-store-TtP3UJpK.js";import"./index-BxVf1x9u.js";import"./client-DC2nEcnn.js";import"./index-BBy8Z1x-.js";import"./index-B3LL8_I6.js";import"./index-CbRH_sA6.js";const g=`import { Flex, Pagination } from '@godaddy/antares';
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
`,e.jsx(o,{of:c,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:g}),`
`,e.jsx(t.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(t.p,{children:["Pass ",e.jsx(t.code,{children:"activeIndex"})," and ",e.jsx(t.code,{children:"onChange"})," to control the active page externally."]}),`
`,e.jsx(o,{of:m,inline:!0}),`
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
`,e.jsx(i,{language:"tsx",code:C})]})}function pe(n={}){const{wrapper:t}={...r(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(a,{...n})}):a(n)}export{pe as default};
