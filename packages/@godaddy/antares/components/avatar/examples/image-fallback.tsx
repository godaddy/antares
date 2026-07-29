import { Avatar, AvatarFallback, AvatarImage } from '@godaddy/antares';

export function ImageFallbackExample() {
  return (
    <Avatar aria-label="Uma Thurman">
      <AvatarImage src="/missing-avatar-image.png" alt="" />
      <AvatarFallback>UT</AvatarFallback>
    </Avatar>
  );
}
