import{i as e}from"./preload-helper-DH8OVsN_.js";import{y as t}from"./iframe-BNKHDpVx.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-dBz0ehHY.js";import{t as c}from"./mdx-react-shim-D9z-tKjU.js";import{Controlled as l,Default as u,DefaultActive as d,OnChange as f,Props as p,WithLimit as m,n as h,t as g}from"./pagination.stories-DKR0y_Ry.js";var _,v=e((()=>{_=`import { Flex, Pagination } from '@godaddy/antares';
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
`})),y,b=e((()=>{y=`import { Flex, Pagination } from '@godaddy/antares';
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
`})),x,S=e((()=>{x=`import { Pagination } from '@godaddy/antares';

export function WithLimitExample() {
  return <Pagination total={10} limit={3} />;
}
`})),C,w=e((()=>{C=`import { Flex, Pagination } from '@godaddy/antares';
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
`})),T,E=e((()=>{T=`import { Pagination } from '@godaddy/antares';

export function DefaultActiveExample() {
  return <Pagination total={5} defaultActiveIndex={2} />;
}
`}));function D(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(o,{of:h,name:`Overview`}),`
`,(0,k.jsx)(t.h1,{id:`pagination`,children:`Pagination`}),`
`,(0,k.jsx)(t.p,{children:`A pagination component with prev/next buttons and dot indicators, configurable page limits, and optional visibility of controls and dots`}),`
`,(0,k.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,k.jsx)(t.pre,{children:(0,k.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,k.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,k.jsx)(a,{of:p}),`
`,(0,k.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,k.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,k.jsxs)(t.p,{children:[`The default pagination is uncontrolled. It renders prev/next buttons and one dot per page. The `,(0,k.jsx)(t.code,{children:`total`}),` prop sets the number of items.`]}),`
`,(0,k.jsx)(i,{of:u,inline:!0}),`
`,(0,k.jsx)(r,{language:`tsx`,code:_}),`
`,(0,k.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,k.jsxs)(t.p,{children:[`Pass `,(0,k.jsx)(t.code,{children:`activeIndex`}),` and `,(0,k.jsx)(t.code,{children:`onChange`}),` to control the active page externally.`]}),`
`,(0,k.jsx)(i,{of:l,inline:!0}),`
`,(0,k.jsx)(r,{language:`tsx`,code:y}),`
`,(0,k.jsx)(t.h3,{id:`default-active-index`,children:`Default Active Index`}),`
`,(0,k.jsxs)(t.p,{children:[`Use `,(0,k.jsx)(t.code,{children:`defaultActiveIndex`}),` to set the starting page in uncontrolled mode.`]}),`
`,(0,k.jsx)(i,{of:d,inline:!0}),`
`,(0,k.jsx)(r,{language:`tsx`,code:T}),`
`,(0,k.jsx)(t.h3,{id:`with-limit`,children:`With Limit`}),`
`,(0,k.jsxs)(t.p,{children:[`Limit the number of items shown per page. When `,(0,k.jsx)(t.code,{children:`limit`}),` is greater than 1, the number of pages (dots) is derived from `,(0,k.jsx)(t.code,{children:`Math.ceil(total / limit)`}),`. For example, 10 items with a limit of 3 produces 4 pages (dots).`]}),`
`,(0,k.jsx)(i,{of:m,inline:!0}),`
`,(0,k.jsx)(r,{language:`tsx`,code:x}),`
`,(0,k.jsx)(t.h3,{id:`onchange-event`,children:`onChange Event`}),`
`,(0,k.jsxs)(t.p,{children:[`The `,(0,k.jsx)(t.code,{children:`onChange`}),` callback fires with the new page index whenever the user navigates.`]}),`
`,(0,k.jsx)(i,{of:f,inline:!0}),`
`,(0,k.jsx)(r,{language:`tsx`,code:C})]})}function O(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,k.jsx)(t,{...e,children:(0,k.jsx)(D,{...e})}):D(e)}var k;e((()=>{k=t(),c(),s(),g(),v(),b(),S(),w(),E()}))();export{O as default};