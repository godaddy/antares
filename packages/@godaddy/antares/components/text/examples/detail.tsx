import { Detail, Flex, Text } from '@godaddy/antares';

/**
 * `Detail` is supporting copy, such as captions and metadata, on the detail ramp. It keeps the
 * surrounding color; add `emphasis="passive"` to mute it.
 * @order 8
 */
export function DetailExample() {
  return (
    <Flex direction="column" gap="xs">
      <Text>Quarterly report</Text>
      <Detail emphasis="passive">Updated 2 hours ago</Detail>
    </Flex>
  );
}
