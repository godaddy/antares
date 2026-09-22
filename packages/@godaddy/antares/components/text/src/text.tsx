import { forwardRef } from 'react';
import { Text as RACText, TextContext as RACTextContext, type TextProps as RACTextProps } from 'react-aria-components';
import { typographyClassName, type TypographyProps } from '#components/_internal/typography';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

export const TextContext = RACTextContext;

export interface TextProps extends Omit<RACTextProps, 'elementType' | 'slot'>, TypographyProps {
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

export interface DetailProps extends TextProps {}

interface TextElementProps extends TextProps {
  treatment: 'text' | 'detail';
}

const TextElement = forwardRef<HTMLElement, TextElementProps>(function TextElement(props, ref) {
  const { as, align, maxLines, wrap, className, slot, size, emphasis, treatment, ...rest } = props;

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
      className={composeClassName(className, styles.text, typographyClassName(treatment, { size, emphasis }))}
      elementType={as}
      style={style}
    />
  );
});

/**
 * Body copy. Without `size`, it takes the surrounding typography.
 *
 * @example
 * ```tsx
 * <Text>Hello, world!</Text>
 * ```
 */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(props, ref) {
  return <TextElement {...props} ref={ref} treatment="text" />;
});

/**
 * Supporting copy, such as captions and metadata.
 *
 * @example
 * ```tsx
 * <Detail>Updated 2 hours ago</Detail>
 * ```
 */
export const Detail = forwardRef<HTMLElement, DetailProps>(function Detail(props, ref) {
  return <TextElement {...props} ref={ref} treatment="detail" />;
});
