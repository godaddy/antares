import { useState } from 'react';
import { Button, Input, Pagination } from '@godaddy/antares';

/**
 * Test-only uncontrolled pagination whose page count changes after navigation.
 * @ignore
 */
export function DynamicPageCountExample() {
  const [pageCount, setPageCount] = useState(5);

  function showThreePages() {
    setPageCount(3);
  }

  function showFivePages() {
    setPageCount(5);
  }

  return (
    <>
      <Button onPress={showThreePages}>Use 3 pages</Button>
      <Button onPress={showFivePages}>Use 5 pages</Button>
      <Pagination pageCount={pageCount} defaultValue={1} aria-label="Page navigation">
        <Button slot="previous" aria-label="Previous" />
        <Input aria-label="Current page" />
        <Button slot="next" aria-label="Next" />
      </Pagination>
    </>
  );
}
