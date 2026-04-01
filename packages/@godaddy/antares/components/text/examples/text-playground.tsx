import { Text, type TextProps } from '@godaddy/antares';

/** Props for the text playground example. */
export interface PlaygroundExampleProps extends Pick<TextProps, 'align' | 'as' | 'maxLines' | 'wrap'> {
  /** Text content to display. */
  children?: string;
}

export function PlaygroundExample({
  align,
  as = 'span',
  maxLines,
  wrap,
  children = 'The quick brown fox jumps over the lazy dog.'
}: PlaygroundExampleProps) {
  return (
    <Text align={align} as={as} maxLines={maxLines} wrap={wrap}>
      {children}
    </Text>
  );
}
