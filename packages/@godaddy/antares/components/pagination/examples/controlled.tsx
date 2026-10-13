import { useState } from 'react';
import { Button, Input, Pagination, Text } from '@godaddy/antares';

/**
 * A controlled Pagination keeps the current page in consumer state.
 * @title Controlled
 * @order 2
 */
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
}
