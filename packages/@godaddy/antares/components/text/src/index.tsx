import { forwardRef, type ReactNode } from 'react';
import { cx } from 'cva';
import { Text as RACText, type TextProps as RACTextProps } from 'react-aria-components';
import styles from './index.module.css';

export interface TextProps extends RACTextProps {
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
 * A complete Text component.
 * Renders as a native text element.
 *
 * @param props - The properties {@link TextProps} passed to the component.
 *
 * @example
 * ```tsx
 * <Text>Hello, world!</Text>
 * ```
 */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(props, ref) {
  const { as = 'span', align, maxLines, wrap, className, ...rest } = props;

  const style = Object.assign({}, props.style, {
    '--align': align,
    '--max-lines': maxLines,
    '--wrap': wrap
  });

  return <RACText {...rest} ref={ref} className={cx(styles.text, className)} elementType={as} style={style} />;
});
