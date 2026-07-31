import { Flex, Tag } from '@godaddy/antares';

/**
 * Choose a size that fits the surrounding content. Smaller tags work well in compact layouts like tables; larger tags suit headings or hero sections.
 * @order 3
 */
export function SizesExample() {
  return (
    <Flex gap="xs" wrap="wrap" alignItems="center">
      <Tag size="sm" emphasis="info">
        Small
      </Tag>
      <Tag size="md" emphasis="info">
        Medium
      </Tag>
      <Tag size="lg" emphasis="info">
        Large
      </Tag>
    </Flex>
  );
}
