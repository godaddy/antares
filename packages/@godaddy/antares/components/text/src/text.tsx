import { forwardRef } from 'react';
import { Text as RACText, TextContext as RACTextContext, type TextProps as RACTextProps } from 'react-aria-components';
import { useTypography, type TypographyProps } from '#components/_internal/typography';
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

/** Body text, preserving an owning control's label treatment. */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(props, ref) {
  return <TextElement {...props} ref={ref} />;
});

export interface DetailProps extends TextProps {}

/** Supporting copy with its own type ramp and inherited color. */
export const Detail = forwardRef<HTMLElement, DetailProps>(function Detail(props, ref) {
  return <TextElement {...props} ref={ref} treatment="detail" />;
});

interface TextElementProps extends TextProps {
  treatment?: 'body' | 'detail';
}

const TextElement = forwardRef<HTMLElement, TextElementProps>(function TextElement(props, ref) {
  const { as, align, maxLines, wrap, className, slot, size, emphasis, treatment = 'body', ...rest } = props;
  const typography = useTypography(treatment, { size, emphasis, slot });
  const style = Object.assign({}, props.style, {
    '--align': align,
    '--max-lines': maxLines,
    '--wrap': wrap
  });

  return (
    <RACText
      {...(rest as Omit<RACTextProps, 'slot'>)}
      slot={slot as RACTextProps['slot']}
      ref={ref}
      className={composeClassName(className, styles.text, typography)}
      elementType={as}
      style={style}
    />
  );
});
