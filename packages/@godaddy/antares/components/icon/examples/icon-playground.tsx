import { Icon, type IconProps } from '@godaddy/antares';

/** Props for the icon playground example. */
export interface PlaygroundExampleProps extends Pick<IconProps, 'icon' | 'color'> {
  /** Width of the icon in pixels. */
  width?: number;
  /** Height of the icon in pixels. */
  height?: number;
}

export function PlaygroundExample({ icon = 'star', color, width = 24, height = 24 }: PlaygroundExampleProps) {
  return <Icon icon={icon} color={color} width={width} height={height} aria-label={`${icon} icon`} />;
}
