import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cx } from 'cva';
import styles from './index.module.css';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

export type SkeletonSize = (typeof SIZES)[number];

export type SkeletonRounding = 'default' | 'full' | 'none';

/** Props for the Skeleton component. */
export interface SkeletonProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'aria-hidden' | 'children'> {
  /** Height preset, from `xs` (0.75rem) to `2xl` (3.5rem). @default 'md' */
  size?: SkeletonSize;

  /** Width as a size preset, a CSS length, or a number of pixels. @default '100%' */
  width?: SkeletonSize | number | (string & {});

  /** Custom height as a CSS length or a number of pixels. Overrides `size`. */
  height?: number | string;

  /**
   * Corner rounding. `default` follows the theme radius, `full` makes a pill (or a circle when
   * width matches height), and `none` keeps square corners.
   * @default 'default'
   */
  rounding?: SkeletonRounding;

  /** Additional class names applied to the skeleton. */
  className?: string;
}

function toLength(value: number | string | undefined): string | undefined {
  if (typeof value === 'number') return `${value}px`;
  if (SIZES.includes(value as SkeletonSize)) return `var(--_skeleton-size-${value})`;
  return value;
}

/**
 * A placeholder that previews the layout of content while it loads. Compose several to sketch
 * text, media, or cards. It is hidden from assistive technology, so label the loading region.
 *
 * @example
 * <Skeleton size="xl" width="xl" rounding="full" />
 *
 * @param props - {@link SkeletonProps}
 */
export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(props, ref) {
  const { size = 'md', width, height, rounding = 'default', className, style, ...rest } = props;

  return (
    <span
      {...rest}
      ref={ref}
      aria-hidden="true"
      data-size={size}
      data-rounding={rounding}
      data-fixed-width={width === undefined ? undefined : ''}
      className={cx(styles.skeleton, className)}
      style={{ width: toLength(width), height: toLength(height), ...style }}
    />
  );
});
