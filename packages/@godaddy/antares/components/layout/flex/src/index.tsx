import { cx } from 'cva';
import { type CSSProperties, type ElementType, forwardRef } from 'react';
import type { PolymorphicComponent, PolymorphicProps, PolymorphicRef } from '../../../../types/polymorphic-react.ts';
import { mergeObjects } from '../../../../utils/objects.ts';
import { Box, type BoxOwnProps } from '../../box/src/index.tsx';
import { toSpacingVar } from '../../tokens.ts';
import type { SharedFlexGridProps } from '../../types.ts';
import styles from './index.module.css';

export interface FlexOwnProps extends BoxOwnProps, SharedFlexGridProps {
  /** The display property for the flex container. @default 'flex' */
  display?: 'flex' | 'inline-flex';

  /** The direction in which to layout children. @default 'row' */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';

  /** Whether to wrap items onto multiple lines. */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
}

export type FlexProps<C extends ElementType = 'div'> = PolymorphicProps<C, FlexOwnProps>;

/**
 * One-dimensional flex layout component for arranging children in rows or columns.
 * Extends Box with flex-specific capabilities like direction, alignment, and gap.
 *
 * @param props - {@link FlexProps}
 */
export const Flex = forwardRef(function Flex(props: FlexProps<ElementType>, ref: PolymorphicRef<ElementType>) {
  const {
    style,
    className,
    display = 'flex',
    direction = 'row',
    justifyContent,
    alignContent,
    alignItems,
    wrap,
    gap,
    columnGap,
    rowGap,
    ...rest
  } = props;

  const displayClass = display === 'inline-flex' ? styles.inlineFlex : styles.flex;
  const columnClass = direction === 'column' ? styles.column : undefined;
  const flexDirection = direction === 'row' || direction === 'column' ? undefined : direction;

  const mergedStyle = mergeObjects(
    {
      flexDirection,
      justifyContent,
      alignContent,
      alignItems,
      flexWrap: wrap,
      gap: toSpacingVar(gap),
      columnGap: toSpacingVar(columnGap),
      rowGap: toSpacingVar(rowGap)
    } satisfies CSSProperties,
    style
  );

  return <Box {...rest} ref={ref} className={cx(displayClass, columnClass, className)} style={mergedStyle} />;
}) as PolymorphicComponent<FlexOwnProps>;
