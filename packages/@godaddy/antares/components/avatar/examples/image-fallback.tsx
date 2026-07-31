import { Avatar, AvatarFallback, AvatarImage } from '@godaddy/antares';

export function ImageFallbackExample() {
  return (
    <Avatar>
      <AvatarImage src="/missing-avatar-image.png" alt="" />
      <AvatarFallback>UT</AvatarFallback>
    </Avatar>
  );
}
