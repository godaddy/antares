import { Avatar, AvatarButton, AvatarFallback } from '@godaddy/antares';

export interface ButtonDisabledExampleProps {
  onPress?: () => void;
}

export function ButtonDisabledExample({ onPress }: ButtonDisabledExampleProps) {
  return (
    <AvatarButton aria-label="Unavailable account" isDisabled onPress={onPress}>
      <Avatar>
        <AvatarFallback>UT</AvatarFallback>
      </Avatar>
    </AvatarButton>
  );
}
