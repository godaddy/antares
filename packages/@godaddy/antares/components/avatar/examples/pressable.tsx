import { Avatar, Flex, Pressable, Text } from '@godaddy/antares';

/**
 * Use `Pressable` to add accessible interaction to an Avatar while preserving its shape.
 * @title Pressable Avatar
 * @order 8
 */
export function PressableExample() {
  return (
    <Flex gap="sm">
      <Pressable aria-label="Account circle">
        <Avatar shape="circle" role="button">
          <Text>UT</Text>
        </Avatar>
      </Pressable>
      <Pressable aria-label="Workspace square">
        <Avatar shape="square" role="button">
          <Text>UT</Text>
        </Avatar>
      </Pressable>
    </Flex>
  );
}
