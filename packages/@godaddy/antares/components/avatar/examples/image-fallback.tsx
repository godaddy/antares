import { Avatar, Image, Text } from '@godaddy/antares';

/**
 * Include a Text fallback so an unavailable photo never leaves an empty identity marker.
 * @order 3
 */
export function ImageFallbackExample() {
  return (
    <Avatar>
      <Image src="/missing-avatar-image.png" alt="" />
      <Text>UT</Text>
    </Avatar>
  );
}
