import { Flex, Skeleton } from '@godaddy/antares';

/**
 * Stack bars of varying widths so a paragraph reads like real sentences.
 * @order 7
 */
export function TextBlockExample() {
  return (
    <Flex direction="column" gap="sm">
      <Skeleton size="xs" width="25%" />
      <Skeleton size="lg" width="50%" />
      <Skeleton size="sm" width="95%" />
      <Skeleton size="sm" />
      <Skeleton size="sm" width="60%" />
    </Flex>
  );
}
