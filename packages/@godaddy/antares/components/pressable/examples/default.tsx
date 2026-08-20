import { Avatar, Flex, Pressable, Text, type PressableProps } from '@godaddy/antares';

export interface DefaultExampleProps {
  onPress?: PressableProps['onPress'];
}

/**
 * Add accessible press behavior to an existing visual component without adding a wrapper element.
 * The callback is invoked for pointer, touch, and keyboard activation.
 * @title Avatar
 * @order 1
 */
export function DefaultExample({ onPress }: DefaultExampleProps) {
  return (
    <Flex gap="sm">
      <Pressable aria-label="Account" onPress={onPress}>
        <Avatar role="button">
          <Text>UT</Text>
        </Avatar>
      </Pressable>
      <Pressable aria-label="Workspace" onPress={onPress}>
        <Avatar shape="square" role="button">
          <Text>UT</Text>
        </Avatar>
      </Pressable>
    </Flex>
  );
}
