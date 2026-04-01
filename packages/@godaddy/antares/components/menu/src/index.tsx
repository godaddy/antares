import {
  Header as RACHeader,
  Menu as RACMenu,
  MenuItem as RACMenuItem,
  MenuSection as RACMenuSection,
  MenuTrigger as RACMenuTrigger,
  Popover as RACPopover,
  Separator as RACSeparator,
  SubmenuTrigger as RACSubmenuTrigger,
  type Key as RACKey,
  type MenuItemProps as RACMenuItemProps,
  type MenuProps as RACMenuProps,
  type MenuSectionProps as RACMenuSectionProps,
  type MenuTriggerProps as RACMenuTriggerProps,
  type Selection as RACSelection,
  type SelectionMode as RACSelectionMode,
  type SubmenuTriggerProps as RACSubmenuTriggerProps
} from 'react-aria-components';
import styles from './index.module.css';
import React, { ComponentPropsWithoutRef } from 'react';
import { cx } from 'cva';
import { Icon } from '#components/icon';
import { Text } from '#components/text';

/**
 * Vertical offset for submenu popover positioning
 */
const SUBMENU_OFFSET = -2;

/**
 * Horizontal cross-axis offset for submenu popover positioning
 */
const SUBMENU_CROSS_OFFSET = -4;

interface SlottedIcons {
  check?: React.ReactElement;
  dot?: React.ReactElement;
  chevron?: React.ReactElement;
  rest: React.ReactNode[];
}

/**
 * Extract icon slots from MenuItem children
 * @param children - MenuItem children to parse
 * @returns Object with slotted icons and remaining children
 */
const extractIconSlots = (children: React.ReactNode): SlottedIcons => {
  const result: SlottedIcons = { rest: [] };

  React.Children.forEach(children, function processChild(child) {
    if (
      React.isValidElement(child) &&
      typeof child.props === 'object' &&
      child.props !== null &&
      'slot' in child.props
    ) {
      const slot = child.props.slot as string;
      if (slot === 'check' || slot === 'dot' || slot === 'chevron') {
        result[slot] = child;
        return;
      }
    }
    result.rest.push(child);
  });

  return result;
};

export interface MenuTriggerProps extends RACMenuTriggerProps {
  /** Match popover width to trigger button width */
  matchWidth?: boolean;
}

/**
 * MenuTrigger wraps a trigger element and menu with a popover
 */
export function MenuTrigger({ matchWidth, ...props }: MenuTriggerProps) {
  const childArray = React.Children.toArray(props.children);
  if (childArray.length !== 2) {
    throw new Error('MenuTrigger requires exactly 2 children: a trigger element and a Menu');
  }
  const [trigger, menu] = childArray as [React.ReactElement, React.ReactElement];
  return (
    <RACMenuTrigger {...props}>
      {trigger}
      <RACPopover className={cx(styles.popover, matchWidth && styles.matchWidth)}>{menu}</RACPopover>
    </RACMenuTrigger>
  );
}

export interface MenuProps<T extends object>
  extends Omit<
    RACMenuProps<T>,
    | 'selectionMode'
    | 'selectedKeys'
    | 'defaultSelectedKeys'
    | 'disabledKeys'
    | 'onAction'
    | 'onSelectionChange'
    | 'autoFocus'
    | 'items'
  > {
  /** Size variant for menu items @default 'md' */
  size?: 'sm' | 'md';
  /** The type of selection that is allowed in the collection */
  selectionMode?: RACSelectionMode;
  /** The currently selected keys in the collection (controlled) */
  selectedKeys?: 'all' | Iterable<RACKey>;
  /** The initial selected keys in the collection (uncontrolled) */
  defaultSelectedKeys?: 'all' | Iterable<RACKey>;
  /** The item keys that are disabled */
  disabledKeys?: Iterable<RACKey>;
  /** Handler that is called when an item is selected */
  onAction?: (key: RACKey) => void;
  /** Handler that is called when the selection changes */
  onSelectionChange?: (keys: RACSelection) => void;
  /** Whether the element should receive focus on render */
  autoFocus?: boolean | 'first' | 'last';
  /** Item objects in the collection */
  items?: Iterable<T>;
}

/** Main menu container with keyboard navigation and selection support */
export function Menu<T extends object>({ className, size = 'md', ...props }: MenuProps<T>) {
  return (
    <RACMenu {...props} className={cx(styles.menu, styles[`size-${size}`], className)}>
      {props.children}
    </RACMenu>
  );
}

export interface MenuItemProps extends Omit<RACMenuItemProps, 'children'> {
  /**
   * Content to render in the menu item
   *
   * Supports icon slots for customization:
   * - `slot="check"` - Custom icon for multiple selection state
   * - `slot="dot"` - Custom icon for single selection state
   * - `slot="chevron"` - Custom icon for submenu indicator
   *
   * @example
   * ```tsx
   * <MenuItem>
   *   <Icon slot="check">✅</Icon>
   *   Custom check icon
   * </MenuItem>
   * ```
   */
  children?: React.ReactNode;
}

/** Menu item with automatic selection indicators and submenu chevron */
export function MenuItem(props: MenuItemProps) {
  const textValue = props.textValue || (typeof props.children === 'string' ? props.children : undefined);
  const { children, ...restProps } = props;
  const { check, dot, chevron, rest } =
    typeof children === 'string'
      ? { check: undefined, dot: undefined, chevron: undefined, rest: [children] }
      : extractIconSlots(children);

  return (
    <RACMenuItem {...restProps} textValue={textValue} className={cx(styles.item, props.className)}>
      {({ hasSubmenu, isSelected, selectionMode }) => (
        <>
          {isSelected &&
            selectionMode === 'multiple' &&
            (check ? (
              React.cloneElement(check, {
                className: cx(styles.checkIcon, (check.props as { className?: string }).className)
              } as Partial<typeof check.props>)
            ) : (
              <Icon icon="check" className={styles.checkIcon}>
                <span aria-hidden="true">✓</span>
              </Icon>
            ))}
          {isSelected &&
            selectionMode === 'single' &&
            (dot ? (
              React.cloneElement(dot, {
                className: cx(styles.dotIcon, (dot.props as { className?: string }).className)
              } as Partial<typeof dot.props>)
            ) : (
              <Icon icon="dot" className={styles.dotIcon}>
                <span aria-hidden="true">•</span>
              </Icon>
            ))}
          {rest.length === 1 && typeof rest[0] === 'string' ? (
            <Text slot="label" className={styles.label}>
              {rest[0]}
            </Text>
          ) : (
            rest
          )}
          {hasSubmenu &&
            (chevron ? (
              React.cloneElement(chevron, {
                className: cx(styles.chevronIcon, (chevron.props as { className?: string }).className)
              } as Partial<typeof chevron.props>)
            ) : (
              <Icon icon="chevron-right" className={styles.chevronIcon}>
                <span aria-hidden="true">›</span>
              </Icon>
            ))}
        </>
      )}
    </RACMenuItem>
  );
}

export interface MenuSectionProps<T extends object> extends RACMenuSectionProps<T> {}

/** Groups menu items under a common header */
export function MenuSection<T extends object>(props: RACMenuSectionProps<T>) {
  return <RACMenuSection {...props} className={cx(styles.section, props.className)} />;
}

export interface MenuHeaderProps extends ComponentPropsWithoutRef<typeof RACHeader> {}

/** Header label for a MenuSection */
export function MenuHeader(props: ComponentPropsWithoutRef<typeof RACHeader>) {
  return <RACHeader {...props} className={cx(styles.header, props.className)} />;
}

export interface MenuSeparatorProps extends ComponentPropsWithoutRef<typeof RACSeparator> {
  /** Separator variant: 'full' (default) or 'partial' @default 'full' */
  variant?: 'full' | 'partial';
}

/** Visual separator between menu items or groups */
export function MenuSeparator({ variant = 'full', className, ...props }: MenuSeparatorProps) {
  return <RACSeparator {...props} className={cx(styles.separator, styles[variant], className)} />;
}

export interface SubmenuTriggerProps extends RACSubmenuTriggerProps {
  /** Vertical offset for submenu popover @default -2 */
  offset?: number;
  /** Horizontal cross-axis offset for submenu popover @default -4 */
  crossOffset?: number;
}

/** Creates a nested menu that appears when hovering or activating a menu item */
export function SubmenuTrigger({
  offset = SUBMENU_OFFSET,
  crossOffset = SUBMENU_CROSS_OFFSET,
  ...props
}: SubmenuTriggerProps) {
  const childArray = React.Children.toArray(props.children);
  if (childArray.length !== 2) {
    throw new Error('SubmenuTrigger requires exactly 2 children: a MenuItem and a Menu');
  }
  const [trigger, menu] = childArray as [React.ReactElement, React.ReactElement];
  return (
    <RACSubmenuTrigger {...props}>
      {trigger}
      <RACPopover className={styles.submenuPopover} offset={offset} crossOffset={crossOffset}>
        {menu}
      </RACPopover>
    </RACSubmenuTrigger>
  );
}
