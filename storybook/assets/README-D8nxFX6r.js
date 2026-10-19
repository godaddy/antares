import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-DQP9tsr3.js";import{a as l,c as u,i as d,l as f,n as p,o as m,r as h,s as g,t as _,u as v}from"./pagination.stories-CI94vLyn.js";function y(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s,{of:v,name:`Overview`}),`
`,(0,x.jsx)(t.h1,{id:`pagination`,children:`Pagination`}),`
`,(0,x.jsx)(t.p,{children:`A composed pagination primitive for controlled or uncontrolled page navigation.`}),`
`,(0,x.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsx)(t.li,{children:`Controlled and uncontrolled 1-based page state.`}),`
`,(0,x.jsxs)(t.li,{children:[`Explicit composition with Antares `,(0,x.jsx)(t.code,{children:`Button`}),`, `,(0,x.jsx)(t.code,{children:`Input`}),`, `,(0,x.jsx)(t.code,{children:`Text`}),`, `,(0,x.jsx)(t.code,{children:`Select`}),` and `,(0,x.jsx)(t.code,{children:`PaginationDots`}),`.`]}),`
`,(0,x.jsx)(t.li,{children:`Known and unknown page-count data sources.`}),`
`,(0,x.jsx)(t.li,{children:`React Aria context defaults for previous, next and the single page input.`}),`
`,(0,x.jsx)(t.li,{children:`Medium and small control sizes.`}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,x.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,x.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,x.jsx)(t.p,{children:`The default pagination for a known page count without a page-size selector.`}),`
`,(0,x.jsx)(a,{of:p,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { Button, Input, Pagination, Text } from '@godaddy/antares';

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
`,(0,x.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,x.jsx)(t.p,{children:`A controlled Pagination keeps the current page in consumer state.`}),`
`,(0,x.jsx)(a,{of:_,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { useState } from 'react';
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
`,(0,x.jsx)(t.h3,{id:`page-count-known`,children:`Page Count Known`}),`
`,(0,x.jsx)(t.p,{children:`Page navigation with a known page count and a consumer-owned page-size Select.`}),`
`,(0,x.jsx)(a,{of:d,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { useState } from 'react';
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
`,(0,x.jsx)(t.h3,{id:`page-count-unknown`,children:`Page Count Unknown`}),`
`,(0,x.jsx)(t.p,{children:`Page Count Unknown: the consumer controls the next boundary.`}),`
`,(0,x.jsx)(a,{of:l,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { useState } from 'react';
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
`,(0,x.jsx)(t.h3,{id:`minimal`,children:`Minimal`}),`
`,(0,x.jsx)(t.p,{children:`Minimal previous/next pagination.`}),`
`,(0,x.jsx)(a,{of:h,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { Button, Pagination } from '@godaddy/antares';

export function MinimalExample() {
  return (
    <Pagination pageCount={8} defaultValue={1} aria-label="Page navigation">
      <Button slot="previous" aria-label="Previous" />
      <Button slot="next" aria-label="Next" />
    </Pagination>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`pagination-dots`,children:`Pagination Dots`}),`
`,(0,x.jsx)(t.p,{children:`Opt-in visual PaginationDots between previous and next controls.`}),`
`,(0,x.jsx)(a,{of:m,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { useState } from 'react';
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
`,(0,x.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,x.jsxs)(t.p,{children:[`Pagination is composed: pass only the regions your layout needs. Previous and
next `,(0,x.jsx)(t.code,{children:`Button`}),`s and the page `,(0,x.jsx)(t.code,{children:`Input`}),` receive navigation defaults from
Pagination, while explicit child props—including disabled-state props—and
`,(0,x.jsx)(t.code,{children:`className`}),` values remain available for local customization. Separator, page count,
`,(0,x.jsx)(t.code,{children:`Select`}),` and
`,(0,x.jsx)(t.code,{children:`PaginationDots`}),` are consumer-owned.`]}),`
`,(0,x.jsxs)(t.p,{children:[`Use `,(0,x.jsx)(t.code,{children:`className`}),` to extend styling without replacing the interaction behavior
provided by Antares.`]}),`
`,(0,x.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsx)(t.li,{children:`Pagination does not add translated labels. Provide accessible names for the
navigation region, previous/next buttons and page input.`}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.code,{children:`PaginationDots`}),` is decorative and does not replace interactive page
controls.`]}),`
`,(0,x.jsxs)(t.li,{children:[`For interactive page links, compose explicit `,(0,x.jsx)(t.code,{children:`Button`}),` or `,(0,x.jsx)(t.code,{children:`LinkButton`}),` children and
provide the active state with `,(0,x.jsx)(t.code,{children:`aria-current="page"`}),`.`]}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[`Pass `,(0,x.jsx)(t.code,{children:`pageCount`}),` when the backend exposes a known number of pages.`]}),`
`,(0,x.jsxs)(t.li,{children:[`Omit `,(0,x.jsx)(t.code,{children:`pageCount`}),` for cursor-based data and disable the composed next button
when the backend reports that there is no next page.`]}),`
`,(0,x.jsx)(t.li,{children:`Keep total items, page size and result ranges in the consuming data layer.`}),`
`,(0,x.jsxs)(t.li,{children:[`Compose exactly one page `,(0,x.jsx)(t.code,{children:`Input`}),`; use a separate component for advanced range
navigation.`]}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,x.jsx)(t.h3,{id:`pagination-1`,children:`Pagination`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-tsx`,children:`<Pagination>
  <Button slot="previous" />
  <Input />
  {/* separator, page count, Select, PaginationDots, or custom regions */}
  <Button slot="next" />
</Pagination>
`})}),`
`,(0,x.jsx)(o,{of:u}),`
`,(0,x.jsx)(t.h3,{id:`paginationdots`,children:`PaginationDots`}),`
`,(0,x.jsx)(o,{of:g})]})}function b(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;function S(){return(S=e((()=>{x=t(),n(),c(),f()})))()}S();export{b as default};