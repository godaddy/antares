import{i as e}from"./preload-helper-DME-cQh5.js";import{F as t}from"./iframe-CVOxgZCA.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-ChbhGPZB.js";import{t as c}from"./mdx-react-shim-CmQkHfkF.js";import{t as l}from"./runtime-DcPfiwh5.js";import{Controlled as u,Default as d,DefaultActive as f,OnChange as p,Props as m,WithLimit as h,n as g,t as _}from"./pagination.stories-t8tCnjVl.js";function v(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(o,{of:g,name:`Overview`}),`
`,(0,b.jsx)(t.h1,{id:`pagination`,children:`Pagination`}),`
`,(0,b.jsx)(t.p,{children:`A pagination component with prev/next buttons and dot indicators, configurable page limits, and optional visibility of controls and dots`}),`
`,(0,b.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,b.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,b.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,b.jsxs)(t.p,{children:[`The default pagination is uncontrolled. It renders prev/next buttons and one dot per page. The `,(0,b.jsx)(t.code,{children:`total`}),` prop sets the number of items.`]}),`
`,(0,b.jsx)(i,{of:d,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Flex, Pagination } from '@godaddy/antares';
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
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,b.jsxs)(t.p,{children:[`Pass `,(0,b.jsx)(t.code,{children:`activeIndex`}),` and `,(0,b.jsx)(t.code,{children:`onChange`}),` to control the active page externally.`]}),`
`,(0,b.jsx)(i,{of:u,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Flex, Pagination } from '@godaddy/antares';
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
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`default-active`,children:`Default Active`}),`
`,(0,b.jsxs)(t.p,{children:[`Use `,(0,b.jsx)(t.code,{children:`defaultActiveIndex`}),` to set the starting page in uncontrolled mode.`]}),`
`,(0,b.jsx)(i,{of:f,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Pagination } from '@godaddy/antares';

export function DefaultActiveExample() {
  return <Pagination total={5} defaultActiveIndex={2} />;
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`with-limit`,children:`With Limit`}),`
`,(0,b.jsxs)(t.p,{children:[`Limit the number of items shown per page. When `,(0,b.jsx)(t.code,{children:`limit`}),` is greater than 1, the number of pages (dots) is derived from `,(0,b.jsx)(t.code,{children:`Math.ceil(total / limit)`}),`. For example, 10 items with a limit of 3 produces 4 pages (dots).`]}),`
`,(0,b.jsx)(i,{of:h,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Pagination } from '@godaddy/antares';

export function WithLimitExample() {
  return <Pagination total={10} limit={3} />;
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`onchange-event`,children:`onChange Event`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`onChange`}),` callback fires with the new page index whenever the user navigates.`]}),`
`,(0,b.jsx)(i,{of:p,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Flex, Pagination } from '@godaddy/antares';
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
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,b.jsx)(a,{of:m})]})}function y(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;e((()=>{b=t(),c(),s(),l(),_()}))();export{y as default};