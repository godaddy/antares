import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import React, { ReactNode } from 'react';
import styles from './index.module.css';

export interface TextProps {
  /** @default null */
  align?: 'start' | 'center' | 'end' | 'justify';
  /** @default 'span' */
  as?: string;
  /** @default null */
  children?: ReactNode;
  /** @default null */
  maxLines?: number;
  /** @default null */
  wrap?: 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable';
}

/**
 * A complete text component primitive.
 * Renders as a native text element.
 *
 * @component
 * @param {TextProps} args - The properties passed to the Text component.
 * @param {'start' | 'center' | 'end' | 'justify'} [args.align] - The alignment of the text.
 * @param {String} [args.as] - The HTML element to render the text as.
 * @param {React.ReactNode} [args.children] - The content to display inside the text.
 * @param {Number} [args.maxLines] - The maximum number of lines to display.
 * @param {'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable'} [args.wrap] - The wrapping behavior of the text.
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

  const applied = apply({ className: styles.text, style }, ['align', 'as', 'maxLines', 'wrap']);

  return React.createElement(as, { ...applied }, children);
});
