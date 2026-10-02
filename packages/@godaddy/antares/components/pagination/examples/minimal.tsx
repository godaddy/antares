import { Button, Pagination } from '@godaddy/antares';

/**
 * Minimal previous/next pagination.
 * @title Minimal
 * @order 6
 */
export function MinimalExample() {
  return (
    <Pagination pageCount={8} defaultValue={1}>
      <Button slot="previous" aria-label="Previous" />
      <Button slot="next" aria-label="Next" />
    </Pagination>
  );
}
