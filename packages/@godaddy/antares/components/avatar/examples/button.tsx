import { Avatar, AvatarButton, Text } from '@godaddy/antares';

/**
 * Use AvatarButton when the avatar triggers an action, such as opening account settings.
 * @title Avatar button
 * @order 7
 */
export function ButtonExample() {
  return (
    <AvatarButton aria-label="Account">
      <Avatar>
        <Text>UT</Text>
      </Avatar>
    </AvatarButton>
  );
}
