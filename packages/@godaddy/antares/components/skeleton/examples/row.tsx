import { Flex, Skeleton } from '@godaddy/antares';

/**
 * In a Flex row, a Skeleton with a `width` keeps its shape, and a default Skeleton fills the
 * remaining space.
 * @title In a row
 * @order 8
 */
export function RowExample() {
  return (
    <Flex alignItems="center" gap="md">
      <Skeleton size="xl" width="xl" rounding="full" />
      <Skeleton />
    </Flex>
  );
}
