import { Avatar, Pressable, Text } from '@godaddy/antares';

/**
 * Use `Pressable` to add accessible interaction to an Avatar while preserving its shape.
 * @title Avatar Button
 * @order 7
 */
export function AvatarButtonExample() {
  return (
    <Pressable aria-label="Account">
      <Avatar shape="circle" role="button">
        <Text>UT</Text>
      </Avatar>
    </Pressable>
  );
}
