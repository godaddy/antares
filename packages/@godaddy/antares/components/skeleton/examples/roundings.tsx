import { Flex, Skeleton } from '@godaddy/antares';

/**
 * `default` follows the theme radius, `full` makes a pill or, with a matching width, a circle,
 * and `none` keeps square corners.
 * @order 3
 */
export function RoundingsExample() {
  return (
    <Flex direction="column" gap="md">
      <Skeleton rounding="default" />
      <Skeleton rounding="full" />
      <Skeleton rounding="full" width="md" />
      <Skeleton rounding="none" />
    </Flex>
  );
}
