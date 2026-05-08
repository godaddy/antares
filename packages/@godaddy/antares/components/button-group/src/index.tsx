import type { ReactNode } from 'react';
import { cx } from 'cva';
import {
  ToggleButtonGroup as RACToggleButtonGroup,
  type ToggleButtonGroupProps as RACToggleButtonGroupProps,
  ToggleButton as RACToggleButton,
  type ToggleButtonProps as RACToggleButtonProps,
  useLocale
} from 'react-aria-components';
import styles from './index.module.css';

export interface ButtonGroupProps extends Omit<RACToggleButtonGroupProps, 'className' | 'children' | 'orientation'> {
  /**
   * Size of the buttons within the group.
   * @default 'md'
   */
  size?: 'sm' | 'md';

  /** Additional class names applied to the root element. */
  className?: string;

  /** `ButtonGroupItem` children. */
  children?: ReactNode;
}

/**
 * A horizontal grouping of related toggle buttons sharing a single rounded container
 * with hairline separators between segments. Supports single or multiple selection.
 *
 * Selection props (`selectionMode`, `selectedKeys`, `defaultSelectedKeys`, `onSelectionChange`)
 * are passed directly from RAC `ToggleButtonGroup` for full API compatibility.
 *
 * @param props - The properties {@link ButtonGroupProps} passed to the component.
 *
 * @example
 * <ButtonGroup aria-label="View" defaultSelectedKeys={['day']} selectionMode="single">
 *   <ButtonGroupItem id="day">Day</ButtonGroupItem>
 *   <ButtonGroupItem id="week">Week</ButtonGroupItem>
 * </ButtonGroup>
 */
export function ButtonGroup(props: ButtonGroupProps) {
  const { size = 'md', className, children, ...rest } = props;
  const { direction } = useLocale();

  return (
    <RACToggleButtonGroup {...rest} dir={direction} data-size={size} className={cx(styles.container, className)}>
      {children}
    </RACToggleButtonGroup>
  );
}

export interface ButtonGroupItemProps extends Omit<RACToggleButtonProps, 'className'> {
  /**
   * The content of the item. Supports text, icon, or icon + text.
   * For icon-only items, provide an `aria-label` for screen readers.
   */
  children?: ReactNode;

  /** Additional class names applied to the item element. */
  className?: string;
}

/**
 * An individual toggle button within a `ButtonGroup`.
 *
 * The `id` prop is used as the selection key (matches `selectedKeys` / `defaultSelectedKeys`).
 * For icon-only items, always provide an `aria-label`.
 *
 * @param props - The properties {@link ButtonGroupItemProps} passed to the component.
 */
export function ButtonGroupItem(props: ButtonGroupItemProps) {
  const { className, children, ...rest } = props;

  return (
    <RACToggleButton {...rest} className={cx(styles.item, className)}>
      {children}
    </RACToggleButton>
  );
}
