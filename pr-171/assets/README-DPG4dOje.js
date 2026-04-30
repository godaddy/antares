import{j as e}from"./iframe-DY2JU6yu.js";import{useMDXComponents as r}from"./index-vMp9Gci6.js";import{M as s,A as l,a as o,S as i}from"./blocks-DR5RAoBv.js";import{S as p,P as d,D as c,C as m,a as x,W as h,O as u}from"./pagination.stories-BitPS-jt.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B6XwFIy4.js";import"./index-DOyM4hZy.js";import"./index-CwLu9-2K.js";import"./index-DC7eKc9w.js";import"./index-BkZegLaG.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-bNsn8rWX.js";import"./Text-CuNCs2V4.js";import"./mergeProps-C4ZhBcln.js";import"./SSRProvider-C-OpFMFK.js";import"./useObjectRef-zzrnZ1na.js";import"./Hidden-Gp7kCxcN.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-9oma3LrX.js";import"./usePress-j1Fxg5-8.js";import"./utils-B0-Er-Yt.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-B8I3Zy39.js";import"./useHover-CImOzyq3.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-DvLRb-b9.js";import"./useFocusWithin-gU5DAQNu.js";import"./index-drBTCp_f.js";import"./index-BVvKlqD-.js";import"./index-DnQR_Im8.js";import"./slots-DDsmaVJZ.js";import"./index-_HKqXvKO.js";import"./index-CLj43KZG.js";import"./index-Dgiy7wye.js";import"./index-CKTcfS89.js";import"./create-external-store-TtP3UJpK.js";import"./index-B-SynIdX.js";import"./client-DVyTIL9r.js";import"./index-Dz5rhHtw.js";import"./index-CsIqp9IP.js";const g=`import { Flex, Pagination } from '@godaddy/antares';
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
`;function a(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p,name:"Overview"}),`
`,e.jsx(n.h1,{id:"pagination",children:"Pagination"}),`
`,e.jsx(n.p,{children:"A pagination component with prev/next buttons and dot indicators, configurable page limits, and optional visibility of controls and dots"}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsx(l,{of:d}),`
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
`,e.jsx(i,{language:"tsx",code:C})]})}function le(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}export{le as default};
