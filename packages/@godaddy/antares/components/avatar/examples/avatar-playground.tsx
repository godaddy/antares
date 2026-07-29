import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  type AvatarEmphasis,
  type AvatarShape,
  type AvatarSize
} from '@godaddy/antares';

export interface PlaygroundExampleProps {
  shape?: AvatarShape;
  size?: AvatarSize;
  emphasis?: AvatarEmphasis;
  src?: string;
  alt?: string;
  fallback?: string;
}

export function PlaygroundExample({
  shape = 'circle',
  size = 'md',
  emphasis = 'primary',
  src,
  alt = '',
  fallback = 'UT'
}: PlaygroundExampleProps) {
  return (
    <Avatar aria-label="Uma Thurman" emphasis={emphasis} shape={shape} size={size}>
      {src ? <AvatarImage src={src} alt={alt} /> : null}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
