import { Flex, Heading } from '@godaddy/antares';

/**
 * `level` sets the semantics and `size` sets the look, so the two never have to match. Without
 * `size`, a heading takes the size scope's heading tier at any level.
 * @order 2
 */
export function SizesExample() {
  return (
    <Flex direction="column" gap="sm">
      <Heading level={2} size="2xl">
        Level 2, 2xl
      </Heading>
      <Heading level={2} size="sm">
        Level 2, sm
      </Heading>
      <Heading level={4} size="xl">
        Level 4, xl
      </Heading>
      <Heading level={4}>Level 4, default tier</Heading>
    </Flex>
  );
}
