import { useState } from 'react';
import { Button, Input, Pagination, Select, SelectItem, SelectOptions, Text } from '@godaddy/antares';

/**
 * Page navigation with a known page count and a consumer-owned page-size Select.
 * @title Page Count Known
 * @order 3
 */
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
    <Pagination value={page} pageCount={pageCount} onChange={setPage}>
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
}
