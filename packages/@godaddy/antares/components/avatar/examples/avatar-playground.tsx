import type { ReactEventHandler } from 'react';
import { Avatar, Image, Text, type AvatarEmphasis, type AvatarShape, type AvatarSize } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  shape?: AvatarShape;
  size?: AvatarSize;
  emphasis?: AvatarEmphasis;
  src?: string;
  alt?: string;
  fallback?: string;
  onLoad?: ReactEventHandler<HTMLImageElement>;
  onError?: ReactEventHandler<HTMLImageElement>;
}

export function PlaygroundExample({
  shape = 'circle',
  size = 'md',
  emphasis = 'primary',
  src,
  alt = '',
  fallback = 'UT',
  onLoad,
  onError
}: PlaygroundExampleProps) {
  return (
    <Avatar emphasis={emphasis} shape={shape} size={size}>
      {src ? <Image src={src} alt={alt} onError={onError} onLoad={onLoad} /> : null}
      <Text>{fallback}</Text>
    </Avatar>
  );
}
