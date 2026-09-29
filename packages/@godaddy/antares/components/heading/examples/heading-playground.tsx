import { Heading, type HeadingProps } from '@godaddy/antares';

export function PlaygroundExample(props: Pick<HeadingProps, 'level' | 'size' | 'emphasis' | 'children'>) {
  const { level = 3, size, emphasis, children = 'Heading' } = props;

  return (
    <Heading level={level} size={size} emphasis={emphasis}>
      {children}
    </Heading>
  );
}
