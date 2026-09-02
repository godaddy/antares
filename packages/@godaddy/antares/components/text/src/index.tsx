import { forwardRef } from 'react';
import { cx } from 'cva';
import { Text as RACText, TextContext as RACTextContext, type TextProps as RACTextProps } from 'react-aria-components';
import styles from './index.module.css';

export const TextContext = RACTextContext;

export interface TextProps extends Omit<RACTextProps, 'elementType' | 'slot'> {
  /** Text alignment. */
  align?: 'start' | 'center' | 'end' | 'justify';

  /** HTML element to render as. Falls back to TextContext, then `span`. */
  as?: string;

  /** Text content. */
  children?: RACTextProps['children'];

  /** Maximum number of lines to display. */
  maxLines?: number;

  /** Slot this text fills. Pass `null` to opt out of a parent's TextContext. */
  slot?: string | null;

  /** Wrapping behavior. */
  wrap?: 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable';
}

/**
 * Text element.
 *
 * @example
 * ```tsx
 * <Text>Hello, world!</Text>
 * ```
 */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(props, ref) {
  const { as, align, maxLines, wrap, className, slot, ...rest } = props;

  const style = Object.assign({}, props.style, {
    '--align': align,
    '--max-lines': maxLines,
    '--wrap': wrap
  });

  // RAC types `slot` as `string`; runtime also accepts `null` to opt out of TextContext.
  return (
    <RACText
      {...(rest as Omit<RACTextProps, 'slot'>)}
      slot={slot as RACTextProps['slot']}
      ref={ref}
      className={cx(styles.text, className)}
      elementType={as}
      style={style}
    />
  );
});
