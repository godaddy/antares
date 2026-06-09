import { type ComponentProps, type ReactNode, forwardRef } from 'react';
import { cx } from 'cva';
import styles from './index.module.css';

/**
 * Controls the visual color scheme and semantic meaning of the tag.
 */
export type TagEmphasis =
  | 'passive'
  | 'critical'
  | 'warning'
  | 'success'
  | 'info'
  | 'highlight'
  | 'premium'
  | 'internal'
  | 'neutral';

/**
 * Controls the visual design mode of the tag.
 */
export type TagDesign = 'filled' | 'inline';

/**
 * Controls the size of the tag.
 */
export type TagSize = 'sm' | 'md' | 'lg';

/**
 * Props for the {@link Tag} component.
 */
export interface TagProps extends ComponentProps<'span'> {
  /** Describes the semantic emphasis of the tag. @default 'passive' */
  emphasis?: TagEmphasis;

  /** Controls the size of the tag. @default 'md' */
  size?: TagSize;

  /**
   * Controls the visual design mode. @default 'filled'
   *
   * When `'inline'`, the background and border are removed and high-contrast
   * colors are applied automatically — suitable for tags embedded in running text.
   */
  design?: TagDesign;

  /**
   * Enables the high-contrast color variant. @default false
   *
   * Also activated automatically when `design="inline"` or `indicator={true}`.
   */
  highContrast?: boolean;

  /**
   * Renders the tag as an indicator with a colored circle dot.
   * When enabled, forces high-contrast colors and indicator styling.
   * @default false
   */
  indicator?: boolean;

  /** Additional CSS class names applied to the root element. */
  className?: string;

  /**
   * The visible text label for the tag. Required for accessibility — tags
   * must never rely on color or an icon alone to convey meaning.
   */
  children: ReactNode;
}

/**
 * Highlights statuses and categories with a colored label.
 *
 * Tags are non-interactive and placed in prominent places on related items.
 * They may be part of interactive components such as navigation, cards, or menu items.
 *
 * @example
 * <Tag emphasis="success" size="sm">Active</Tag>
 *
 * @example
 * <Tag emphasis="critical"><Icon icon="alert" />Expired</Tag>
 *
 * @example
 * <Tag emphasis="info" indicator>3 new</Tag>
 *
 * @param props - {@link TagProps}
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(props, ref) {
  const {
    emphasis = 'passive',
    size = 'md',
    design = 'filled',
    highContrast = false,
    indicator = false,
    className,
    children,
    ...rest
  } = props;

  const resolvedHighContrast = highContrast || indicator || design === 'inline';

  return (
    <span
      ref={ref}
      className={cx(styles.tag, className)}
      data-emphasis={emphasis}
      data-size={size}
      data-design={design}
      data-high-contrast={resolvedHighContrast ? '' : undefined}
      data-indicator={indicator ? '' : undefined}
      {...rest}
    >
      {children}
    </span>
  );
});
