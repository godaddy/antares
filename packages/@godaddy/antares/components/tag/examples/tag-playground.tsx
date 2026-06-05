import { Tag, type TagProps } from '@godaddy/antares';

export interface PlaygroundExampleProps
  extends Pick<TagProps, 'emphasis' | 'size' | 'design' | 'highContrast' | 'icon' | 'indicator'> {
  /** Tag label text. */
  children?: string;
}

export function PlaygroundExample({
  emphasis = 'passive',
  size = 'sm',
  design = 'filled',
  highContrast = false,
  icon,
  indicator = false,
  children = 'Tag'
}: PlaygroundExampleProps) {
  return (
    <Tag emphasis={emphasis} size={size} design={design} highContrast={highContrast} icon={icon} indicator={indicator}>
      {children}
    </Tag>
  );
}
