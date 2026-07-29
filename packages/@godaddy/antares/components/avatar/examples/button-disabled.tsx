import { Avatar, AvatarButton, AvatarFallback } from '@godaddy/antares';

export function ButtonDisabledExample() {
  return (
    <AvatarButton aria-label="Unavailable account" isDisabled>
      <Avatar>
        <AvatarFallback>UT</AvatarFallback>
      </Avatar>
    </AvatarButton>
  );
}
