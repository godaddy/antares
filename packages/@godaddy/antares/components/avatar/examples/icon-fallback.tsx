import { Avatar, AvatarFallback, Icon } from '@godaddy/antares';

export function IconFallbackExample() {
  return (
    <Avatar>
      <AvatarFallback>
        <Icon icon="user" />
      </AvatarFallback>
    </Avatar>
  );
}
