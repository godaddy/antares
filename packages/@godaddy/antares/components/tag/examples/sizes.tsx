import { Flex, Tag } from '@godaddy/antares';

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
