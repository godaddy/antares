import { forwardRef, type ReactNode } from 'react';
import { cx } from 'cva';
import { Heading as RACHeading, type HeadingProps as RACHeadingProps } from 'react-aria-components';
import styles from './heading.module.css';

export interface HeadingProps extends Omit<RACHeadingProps, 'className'> {
  /**
   * The heading level, rendered as the matching `h1`-`h6` element.
   * @default 2
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Additional class names to apply to the heading.
   */
  className?: string;

  /**
   * The content to display inside the heading.
   */
  children?: ReactNode;
}

/**
 * A semantic heading. Renders an `h1`-`h6` element via RAC's `Heading`, so
 * `slot="title"` inside a `Modal`/`Dialog` wires the accessible name
 * (`aria-labelledby`) automatically.
 *
 * @param props - The properties {@link HeadingProps} passed to the component.
 *
 * @example
 * ```tsx
 * <Heading slot="title">Delete file?</Heading>
 * <Heading level={3}>Section</Heading>
 * ```
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(props, ref) {
  const { level = 2, className, ...rest } = props;

  return <RACHeading {...rest} ref={ref} level={level} className={cx(styles.heading, className)} />;
});
