import { Tag, type TagProps } from '@godaddy/antares';

export interface PlaygroundExampleProps
  extends Pick<TagProps, 'emphasis' | 'size' | 'design' | 'highContrast' | 'indicator'> {
  /** Tag label text. */
  children?: string;
}

export function PlaygroundExample({
  emphasis = 'passive',
  size = 'sm',
  design = 'filled',
  highContrast = false,
  indicator = false,
  children = 'Tag'
}: PlaygroundExampleProps) {
  return (
    <Tag emphasis={emphasis} size={size} design={design} highContrast={highContrast} indicator={indicator}>
      {children}
    </Tag>
  );
}
