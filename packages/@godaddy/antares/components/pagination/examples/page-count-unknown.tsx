import { useState } from 'react';
import { Button, Input, Pagination } from '@godaddy/antares';

/**
 * Page Count Unknown: the consumer controls the next boundary.
 * @title Page Count Unknown
 * @order 4
 */
export function PageCountUnknownExample() {
  const [page, setPage] = useState(1);
  const hasNextPage = true;

  return (
    <Pagination value={page} onChange={setPage}>
      <Button slot="previous" aria-label="Previous" />
      <Input aria-label="Current page" />
      <Button slot="next" aria-label="Next" isDisabled={!hasNextPage} />
    </Pagination>
  );
}
