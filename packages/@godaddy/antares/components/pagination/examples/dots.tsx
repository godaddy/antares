import { useState } from 'react';
import { Button, Pagination, PaginationDots } from '@godaddy/antares';

/**
 * Opt-in visual PaginationDots between previous and next controls.
 * @title Pagination Dots
 * @order 7
 */
export function PaginationDotsExample() {
  const [page, setPage] = useState(1);
  const pageCount = 5;

  return (
    <Pagination value={page} pageCount={pageCount} onChange={setPage}>
      <Button slot="previous" aria-label="Previous" />
      <PaginationDots />
      <Button slot="next" aria-label="Next" />
    </Pagination>
  );
}
