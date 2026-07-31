import { Flex, Pagination } from '@godaddy/antares';
import { useState } from 'react';

/**
 * The default pagination is uncontrolled. It renders prev/next buttons and one dot per page. The `total` prop sets the number of items.
 * @order 1
 */
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
