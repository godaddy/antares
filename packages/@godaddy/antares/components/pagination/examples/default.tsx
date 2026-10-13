import { Button, Input, Pagination, Text } from '@godaddy/antares';

/**
 * The default pagination for a known page count without a page-size selector.
 * @order 1
 */
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
}
