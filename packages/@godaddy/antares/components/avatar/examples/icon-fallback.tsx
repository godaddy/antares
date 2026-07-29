import { Avatar, AvatarFallback, Icon } from '@godaddy/antares';

export function IconFallbackExample() {
  return (
    <Avatar aria-label="Account">
      <AvatarFallback>
        <Icon icon="user" />
      </AvatarFallback>
    </Avatar>
  );
}
