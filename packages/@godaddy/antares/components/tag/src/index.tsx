import { type ComponentProps, forwardRef } from 'react';
import { cx } from 'cva';
import { Icon } from '#components/icon';
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
 * Props for the {@link Tag} component.
 */
export interface TagProps extends ComponentProps<'span'> {
  /** Describes the semantic emphasis of the tag. @default 'passive' */
  emphasis?: TagEmphasis;

  /** Controls the size of the tag. @default 'md' */
  size?: 'sm' | 'md' | 'lg';

  /** Controls the visual design mode. @default 'filled' */
  design?: TagDesign;

  /** Enables the high-contrast color variant. @default false */
  highContrast?: boolean;

  /**
   * Icon name to render before the tag label.
   * Accepts any valid icon name from the icon set (e.g. `"alert"`, `"checkmark"`, `"star"`).
   */
  icon?: string;

  /**
   * Renders the tag as an indicator with a colored circle dot.
   * When enabled, forces high-contrast colors and indicator styling.
   * @default false
   */
  indicator?: boolean;

  /** Additional CSS class names applied to the root element. */
  className?: string;
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
 * <Tag emphasis="critical" icon="alert">Expired</Tag>
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
    icon,
    indicator = false,
    className,
    children,
    ...rest
  } = props;

  const resolvedHighContrast = highContrast || indicator || design === 'inline';

  const renderAccessory = function renderAccessory() {
    if (indicator) {
      return <Icon icon="circle-filled" className={styles.accessoryCircle} aria-hidden="true" />;
    }

    if (icon) {
      return <Icon icon={icon} className={styles.accessoryIcon} aria-hidden="true" />;
    }

    return null;
  };

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
      {renderAccessory()}
      {children}
    </span>
  );
});
