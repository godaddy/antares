import { forwardRef, type ReactNode } from 'react';
import { cx } from 'cva';
import {
  Heading as RACHeading,
  HeadingContext,
  useSlottedContext,
  type HeadingProps as RACHeadingProps
} from 'react-aria-components';
import styles from './heading.module.css';

export interface HeadingProps extends Omit<RACHeadingProps, 'className' | 'level'> {
  /**
   * The heading level, rendered as the matching `h1`-`h6` element.
   * Falls back to the level a container provides, then to `2`.
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
 * A container may supply the level through `HeadingContext` — `Dialog` does this
 * for `slot="title"`. An explicit `level` prop always wins.
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
  const { level, className, ...rest } = props;

  // Read the level a container provides without consuming the rest of the context:
  // `RACHeading` merges `className`/`id` from the same context itself, and merging
  // it here as well would duplicate ids and chain handlers twice.
  const context = useSlottedContext(HeadingContext, props.slot);

  return (
    <RACHeading {...rest} ref={ref} level={level ?? context?.level ?? 2} className={cx(styles.heading, className)} />
  );
});
