import { Avatar, AvatarButton, AvatarFallback } from '@godaddy/antares';

export function ButtonExample() {
  return (
    <AvatarButton aria-label="Account">
      <Avatar>
        <AvatarFallback>UT</AvatarFallback>
      </Avatar>
    </AvatarButton>
  );
}
