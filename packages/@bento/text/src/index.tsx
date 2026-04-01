import { Container } from '@bento/container';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import type { ReactNode } from 'react';
import styles from './index.module.css';

export interface TextProps {
  /**
   * The alignment of the text.
   */
  align?: 'start' | 'center' | 'end' | 'justify';

  /**
   * The HTML element to render the text as.
   * @default 'span'
   */
  as?: string;

  /**
   * The content to display inside the text.
   */
  children?: ReactNode;

  /**
   * The maximum number of lines to display.
   */
  maxLines?: number;

  /**
   * The wrapping behavior of the text.
   */
  wrap?: 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable';
}

/**
 * A complete text component primitive.
 * Renders as a native text element.
 *
 * @component
 * @param args - The properties {@link TextProps} passed to the Text component.
 *
 * @example
 * ```tsx
 * <Text>Hello, world!</Text>
 * ```
 *
 * @public
 */
export const Text = withSlots('BentoText', function Text(args: TextProps) {
  const { props, apply } = useProps(args);
  const { children, as = 'span', align, maxLines, wrap } = props;

  if (!children) return null;

  const style = {
    '--align': align,
    '--max-lines': maxLines,
    '--wrap': wrap
  };

  const containerProps = apply({ className: styles.text, style }, ['align', 'as', 'maxLines', 'wrap']);

  return (
    <Container as={as} {...containerProps}>
      {children}
    </Container>
  );
});
