import { Heading, type HeadingProps } from '@godaddy/antares';

export function PlaygroundExample(props: Pick<HeadingProps, 'level' | 'children'>) {
  const { level = 3, children = 'Heading' } = props;

  return <Heading level={level}>{children}</Heading>;
}
