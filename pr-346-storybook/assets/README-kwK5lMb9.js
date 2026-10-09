import{i as e}from"./preload-helper-BUun7Ttb.js";import{F as t}from"./iframe-DLes9dmg.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-CNR5c7sm.js";import{t as c}from"./mdx-react-shim-k2dh6em6.js";import{t as l}from"./runtime-cfuOSczO.js";import{Controlled as u,Default as d,Minimal as f,PageCountKnown as p,PageCountUnknown as m,PaginationDots as h,PaginationDotsProps as g,Props as _,n as v,t as y}from"./pagination.stories-BYkocrrC.js";function b(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(o,{of:v,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`pagination`,children:`Pagination`}),`
`,(0,S.jsx)(t.p,{children:`A composed pagination primitive for controlled or uncontrolled page navigation.`}),`
`,(0,S.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsx)(t.li,{children:`Controlled and uncontrolled 1-based page state.`}),`
`,(0,S.jsxs)(t.li,{children:[`Explicit composition with Antares `,(0,S.jsx)(t.code,{children:`Button`}),`, `,(0,S.jsx)(t.code,{children:`Input`}),`, `,(0,S.jsx)(t.code,{children:`Text`}),`, `,(0,S.jsx)(t.code,{children:`Select`}),` and `,(0,S.jsx)(t.code,{children:`PaginationDots`}),`.`]}),`
`,(0,S.jsx)(t.li,{children:`Known and unknown page-count data sources.`}),`
`,(0,S.jsx)(t.li,{children:`React Aria context defaults for previous, next and the single page input.`}),`
`,(0,S.jsx)(t.li,{children:`Medium and small control sizes.`}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,S.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,S.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,S.jsx)(t.p,{children:`The default pagination for a known page count without a page-size selector.`}),`
`,(0,S.jsx)(i,{of:d,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Button, Input, Pagination, Text } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Pagination pageCount={5} defaultValue={1} aria-label="Page navigation">
      <Button slot="previous" aria-label="Previous" />
      <Input aria-label="Current page" />
      <Text size="sm" aria-hidden>
        /
      </Text>
      <Text size="sm">5</Text>
      <Button slot="next" aria-label="Next" />
    </Pagination>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,S.jsx)(t.p,{children:`A controlled Pagination keeps the current page in consumer state.`}),`
`,(0,S.jsx)(i,{of:u,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { useState } from 'react';
import { Button, Input, Pagination, Text } from '@godaddy/antares';

export function ControlledExample() {
  const [page, setPage] = useState(2);

  return (
    <Pagination value={page} pageCount={3} onChange={setPage} aria-label="Page navigation">
      <Button slot="previous" aria-label="Previous" />
      <Input aria-label="Current page" />
      <Text size="sm" aria-hidden>
        /
      </Text>
      <Text size="sm">3</Text>
      <Button slot="next" aria-label="Next" />
    </Pagination>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`page-count-known`,children:`Page Count Known`}),`
`,(0,S.jsx)(t.p,{children:`Page navigation with a known page count and a consumer-owned page-size Select.`}),`
`,(0,S.jsx)(i,{of:p,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { useState } from 'react';
import { Button, Input, Pagination, Select, SelectItem, SelectOptions, Text } from '@godaddy/antares';

export function PageCountKnownExample() {
  const total = 50;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const pageCount = Math.ceil(total / limit);

  function handlePageSizeChange(value: string | number | null) {
    if (value == null) return;

    setLimit(Number(value));
    setPage(1);
  }

  return (
    <Pagination value={page} pageCount={pageCount} onChange={setPage} aria-label="Page navigation">
      <Button slot="previous" aria-label="Previous" />
      <Input aria-label="Current page" />
      <Text size="sm" aria-hidden>
        /
      </Text>
      <Text size="sm">{pageCount}</Text>
      <Button slot="next" aria-label="Next" />
      <Select aria-label="Results per page" value={String(limit)} onChange={handlePageSizeChange}>
        <Button slot="trigger" />
        <SelectOptions>
          <SelectItem id="10">10</SelectItem>
          <SelectItem id="25">25</SelectItem>
          <SelectItem id="50">50</SelectItem>
        </SelectOptions>
      </Select>
    </Pagination>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`page-count-unknown`,children:`Page Count Unknown`}),`
`,(0,S.jsx)(t.p,{children:`Page Count Unknown: the consumer controls the next boundary.`}),`
`,(0,S.jsx)(i,{of:m,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { useState } from 'react';
import { Button, Input, Pagination } from '@godaddy/antares';

export function PageCountUnknownExample() {
  const [page, setPage] = useState(1);
  const hasNextPage = true;

  return (
    <Pagination value={page} onChange={setPage} aria-label="Page navigation">
      <Button slot="previous" aria-label="Previous" />
      <Input aria-label="Current page" />
      <Button slot="next" aria-label="Next" isDisabled={!hasNextPage} />
    </Pagination>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`minimal`,children:`Minimal`}),`
`,(0,S.jsx)(t.p,{children:`Minimal previous/next pagination.`}),`
`,(0,S.jsx)(i,{of:f,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Button, Pagination } from '@godaddy/antares';

export function MinimalExample() {
  return (
    <Pagination pageCount={8} defaultValue={1} aria-label="Page navigation">
      <Button slot="previous" aria-label="Previous" />
      <Button slot="next" aria-label="Next" />
    </Pagination>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`pagination-dots`,children:`Pagination Dots`}),`
`,(0,S.jsx)(t.p,{children:`Opt-in visual PaginationDots between previous and next controls.`}),`
`,(0,S.jsx)(i,{of:h,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { useState } from 'react';
import { Button, Pagination, PaginationDots } from '@godaddy/antares';

export function PaginationDotsExample() {
  const [page, setPage] = useState(1);
  const pageCount = 5;

  return (
    <Pagination value={page} pageCount={pageCount} onChange={setPage} aria-label="Page navigation">
      <Button slot="previous" aria-label="Previous" />
      <PaginationDots />
      <Button slot="next" aria-label="Next" />
    </Pagination>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,S.jsxs)(t.p,{children:[`Pagination is composed: pass only the regions your layout needs. Previous and
next `,(0,S.jsx)(t.code,{children:`Button`}),`s and the page `,(0,S.jsx)(t.code,{children:`Input`}),` receive navigation defaults from
Pagination, while explicit child props—including disabled-state props—and
`,(0,S.jsx)(t.code,{children:`className`}),` values remain available for local customization. Separator, page count,
`,(0,S.jsx)(t.code,{children:`Select`}),` and
`,(0,S.jsx)(t.code,{children:`PaginationDots`}),` are consumer-owned.`]}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`className`}),` to extend styling without replacing the interaction behavior
provided by Antares.`]}),`
`,(0,S.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsx)(t.li,{children:`Pagination does not add translated labels. Provide accessible names for the
navigation region, previous/next buttons and page input.`}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`PaginationDots`}),` is decorative and does not replace interactive page
controls.`]}),`
`,(0,S.jsxs)(t.li,{children:[`For interactive page links, compose explicit `,(0,S.jsx)(t.code,{children:`Button`}),` or `,(0,S.jsx)(t.code,{children:`LinkButton`}),` children and
provide the active state with `,(0,S.jsx)(t.code,{children:`aria-current="page"`}),`.`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[`Pass `,(0,S.jsx)(t.code,{children:`pageCount`}),` when the backend exposes a known number of pages.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Omit `,(0,S.jsx)(t.code,{children:`pageCount`}),` for cursor-based data and disable the composed next button
when the backend reports that there is no next page.`]}),`
`,(0,S.jsx)(t.li,{children:`Keep total items, page size and result ranges in the consuming data layer.`}),`
`,(0,S.jsxs)(t.li,{children:[`Compose exactly one page `,(0,S.jsx)(t.code,{children:`Input`}),`; use a separate component for advanced range
navigation.`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,S.jsx)(t.h3,{id:`pagination-1`,children:`Pagination`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-tsx`,children:`<Pagination>
  <Button slot="previous" />
  <Input />
  {/* separator, page count, Select, PaginationDots, or custom regions */}
  <Button slot="next" />
</Pagination>
`})}),`
`,(0,S.jsx)(a,{of:_}),`
`,(0,S.jsx)(t.h3,{id:`paginationdots`,children:`PaginationDots`}),`
`,(0,S.jsx)(a,{of:g})]})}function x(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;e((()=>{S=t(),c(),s(),l(),y()}))();export{x as default};