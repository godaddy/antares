import { Flex, Skeleton } from '@godaddy/antares';

/**
 * Set `width` and `height` for placeholders with non-standard dimensions. Numbers are pixels, and
 * strings take any CSS length. A custom `height` overrides `size`.
 * @title Custom size
 * @order 4
 */
export function CustomSizeExample() {
  return (
    <Flex direction="column" gap="md">
      <Skeleton width={240} height={120} />
      <Skeleton width="50%" height="5rem" />
    </Flex>
  );
}
