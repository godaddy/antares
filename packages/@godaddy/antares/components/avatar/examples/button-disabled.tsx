import { Avatar, AvatarButton, Text } from '@godaddy/antares';

export interface ButtonDisabledExampleProps {
  onPress?: () => void;
}

/**
 * Use isDisabled when the avatar action is unavailable.
 * @title Disabled avatar button
 * @order 9
 */
export function ButtonDisabledExample({ onPress }: ButtonDisabledExampleProps) {
  return (
    <AvatarButton aria-label="Unavailable account" isDisabled onPress={onPress}>
      <Avatar>
        <Text>UT</Text>
      </Avatar>
    </AvatarButton>
  );
}
