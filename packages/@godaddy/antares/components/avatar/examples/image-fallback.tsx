import { Avatar, Image, Text } from '@godaddy/antares';

export function ImageFallbackExample() {
  return (
    <Avatar>
      <Image src="/missing-avatar-image.png" alt="" />
      <Text>UT</Text>
    </Avatar>
  );
}
