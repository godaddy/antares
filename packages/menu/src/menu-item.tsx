import React, { type ForwardedRef, type ReactNode, useContext } from 'react';
import { mergeProps, useMenuItem, useHover } from 'react-aria';
import { useObjectRef } from '@react-aria/utils';
import { createLeafComponent } from '@react-aria/collections';
import type { HoverEvents, Key, LinkDOMProps, Node } from '@react-types/shared';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { useDataAttributes } from '@bento/use-data-attributes';
import { MenuStateContext } from './context';
import type { SelectionMode } from './menu';

/**
 * Generates data attributes for MenuItem elements based on their state.
 * @internal
 */
function useMenuItemDataAttributes({
  isSelected,
  isDisabled,
  isHovered,
  isFocused,
  isFocusVisible,
  isPressed,
  hasSubmenu,
  isOpen,
  selectionMode
}: {
  readonly isSelected: boolean;
  readonly isDisabled: boolean;
  readonly isHovered: boolean;
  readonly isFocused: boolean;
  readonly isFocusVisible: boolean;
  readonly isPressed: boolean;
  readonly hasSubmenu?: boolean;
  readonly isOpen?: boolean;
  readonly selectionMode: SelectionMode;
}) {
  return useDataAttributes({
    selected: isSelected,
    checked: isSelected && (selectionMode === 'single' || selectionMode === 'multiple'),
    disabled: isDisabled,
    hovered: isHovered,
    focused: isFocused,
    'focus-visible': isFocusVisible,
    pressed: isPressed,
    'has-submenu': hasSubmenu,
    open: isOpen
  });
}

/**
 * Render props provided to MenuItem render functions.
 * @interface MenuItemRenderProps
 */
export interface MenuItemRenderProps {
  /**
   * Whether the item is currently hovered.
   * @selector [data-hovered]
   */
  readonly isHovered: boolean;
  /**
   * Whether the item is currently pressed.
   * @selector [data-pressed]
   */
  readonly isPressed: boolean;
  /**
   * Whether the item is currently selected.
   * @selector [data-selected]
   */
  readonly isSelected: boolean;
  /**
   * Whether the item is currently focused.
   * @selector [data-focused]
   */
  readonly isFocused: boolean;
  /**
   * Whether the item is currently keyboard focused.
   * @selector [data-focus-visible]
   */
  readonly isFocusVisible: boolean;
  /**
   * Whether the item is disabled.
   * @selector [data-disabled]
   */
  readonly isDisabled: boolean;
  /**
   * The type of selection that is allowed in the menu.
   */
  readonly selectionMode: SelectionMode;
}

/**
 * Props for the MenuItem component.
 * @interface MenuItemProps
 * @template T The type of the item value
 */
export interface MenuItemProps<T = object>
  extends LinkDOMProps,
    HoverEvents,
    Omit<React.HTMLAttributes<HTMLElement>, keyof LinkDOMProps | keyof HoverEvents | 'id' | 'children'> {
  /** The unique id of the item. If not provided, React Aria will auto-generate one. */
  readonly id?: Key;
  /** The object value that this item represents. When using dynamic collections, this is set automatically. */
  readonly value?: T;
  /** A string representation of the item's contents, used for features like typeahead. If not provided, React Aria will derive it from children automatically. */
  readonly textValue?: string;
  /**
   * Handler that is called when a user performs an action on the item. The exact user event depends on the
   * collection's `selectionBehavior` prop and the interaction modality.
   */
  readonly onAction?: () => void;
  /** The contents of the item. Can be a render function that receives render props. */
  readonly children?: ReactNode | ((values: MenuItemRenderProps) => ReactNode);
  /**
   * A slot name for the component. Used by Bento's slot system.
   */
  readonly slot?: string;
  /** Whether the item is disabled. */
  readonly isDisabled?: boolean;
}

/**
 * Internal implementation component for MenuItem.
 * Handles the core logic for rendering a single menu item with proper accessibility.
 *
 * @internal
 */
const MenuItemImplComponent = function MenuItemImplComponent<T extends object>(
  { __node, ...props }: MenuItemProps<T> & { readonly __node: Node<T> },
  ref: ForwardedRef<HTMLDivElement>
) {
  const state = useContext(MenuStateContext)!;

  // Extract children before useProps call to avoid render prop corruption
  const originalChildren = props.children;

  // Merge slot props before React Aria hooks
  const { props: mergedProps, ref: mergedRef } = useProps(props, {}, ref);
  const safeRef = useObjectRef(mergedRef ?? null);

  const { menuItemProps, ...states } = useMenuItem(
    {
      key: __node.key,
      'aria-label': mergedProps['aria-label'],
      isDisabled: mergedProps.isDisabled,
      onAction: mergedProps.onAction
    },
    state,
    safeRef
  );

  const { hoverProps, isHovered } = useHover({
    isDisabled: states.isDisabled,
    onHoverStart: mergedProps.onHoverStart,
    onHoverChange: mergedProps.onHoverChange,
    onHoverEnd: mergedProps.onHoverEnd
  });

  const renderValues: MenuItemRenderProps = {
    ...states,
    isHovered,
    selectionMode: state.selectionManager.selectionMode as SelectionMode
  };

  const content = typeof originalChildren === 'function' ? originalChildren(renderValues) : originalChildren;

  // Apply original node props with render values
  const { apply } = useProps(props, renderValues);

  const dataAttributes = useMenuItemDataAttributes({
    isSelected: states.isSelected,
    isDisabled: states.isDisabled,
    isHovered,
    isFocused: states.isFocused,
    isFocusVisible: states.isFocusVisible,
    isPressed: states.isPressed,
    selectionMode: state.selectionManager.selectionMode as SelectionMode
  });

  const ElementType = __node.props.href ? 'a' : 'div';

  const appliedUserProps = apply(__node.props, ['ref']);

  const finalAttributes = {
    ...mergeProps(menuItemProps, hoverProps),
    ...dataAttributes,
    ...appliedUserProps,
    ref: safeRef
  };

  return React.createElement(ElementType, finalAttributes, content);
};

/**
 * Enhanced MenuItem implementation with slots support.
 * @internal
 */
export const MenuItemImpl = withSlots('BentoMenuItem', MenuItemImplComponent);

/**
 * Adapter component that connects MenuItemImpl to React Aria's collection system.
 * @internal
 */
function MenuItemComponent<T extends object>(
  props: MenuItemProps<T>,
  forwardedRef: ForwardedRef<HTMLDivElement>,
  item: Node<T>
) {
  return <MenuItemImpl {...props} ref={forwardedRef as any} __node={item} />;
}

/**
 * Base MenuItem component created through React Aria's collection system.
 * @internal
 */
const MenuItemBase = createLeafComponent('item', MenuItemComponent);

/**
 * A single item within a Menu component.
 * Handles user interactions, accessibility, and state management for individual menu options.
 *
 * @component
 * @template T The type of the item value
 * @example
 * ```tsx
 * <MenuItem>Save</MenuItem>
 * <MenuItem onAction={() => console.log('clicked')}>Open</MenuItem>
 * ```
 * @public
 */
export const MenuItem = MenuItemBase;
