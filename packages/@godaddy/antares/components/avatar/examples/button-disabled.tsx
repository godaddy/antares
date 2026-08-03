import { Avatar, AvatarButton, Text } from '@godaddy/antares';

export interface ButtonDisabledExampleProps {
  onPress?: () => void;
}

export function ButtonDisabledExample({ onPress }: ButtonDisabledExampleProps) {
  return (
    <AvatarButton aria-label="Unavailable account" isDisabled onPress={onPress}>
      <Avatar>
        <Text>UT</Text>
      </Avatar>
    </AvatarButton>
  );
}
