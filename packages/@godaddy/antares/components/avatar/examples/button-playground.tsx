import {
  Avatar,
  AvatarButton,
  Image,
  Text,
  type AvatarEmphasis,
  type AvatarShape,
  type AvatarSize
} from '@godaddy/antares';

export interface ButtonPlaygroundExampleProps {
  shape?: AvatarShape;
  size?: AvatarSize;
  emphasis?: AvatarEmphasis;
  src?: string;
  alt?: string;
  fallback?: string;
  ariaLabel?: string;
  isDisabled?: boolean;
}

export function ButtonPlaygroundExample({
  shape = 'circle',
  size = 'md',
  emphasis = 'primary',
  src,
  alt = '',
  fallback = 'UT',
  ariaLabel = 'Account',
  isDisabled = false
}: ButtonPlaygroundExampleProps) {
  return (
    <AvatarButton aria-label={ariaLabel} isDisabled={isDisabled}>
      <Avatar emphasis={emphasis} shape={shape} size={size}>
        {src ? <Image src={src} alt={alt} /> : null}
        <Text>{fallback}</Text>
      </Avatar>
    </AvatarButton>
  );
}
