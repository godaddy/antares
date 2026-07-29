import { Avatar, AvatarFallback } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Avatar aria-label="Uma Thurman">
      <AvatarFallback>UT</AvatarFallback>
    </Avatar>
  );
}
