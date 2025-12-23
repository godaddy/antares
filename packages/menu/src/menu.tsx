import React, { useContext, type ForwardedRef, type RefObject } from 'react';
import { mergeProps, useMenu, useFocusRing, useSeparator } from 'react-aria';
import { useObjectRef } from '@react-aria/utils';
import { useTreeState, type TreeState, type Orientation, type Node } from 'react-stately';
import { CollectionBuilder, Collection as AriaCollection } from '@react-aria/collections';
import type { AriaMenuProps } from '@react-types/menu';
import { useProps } from '@bento/use-props';
import { withSlots, type Slots } from '@bento/slots';
import { useDataAttributes } from '@bento/use-data-attributes';
import { MenuItemImpl } from './menu-item';
import { MenuSectionInner } from './menu-section';
import { MenuStateContext, MenuTriggerStateContext } from './context';

/**
 * Selection mode for menu items
 * @public
 */
export type SelectionMode = 'none' | 'single' | 'multiple';

/**
 * Alias for TreeState used internally by Menu components
 * @public
 */
export type MenuState<T> = TreeState<T>;

/**
 * Generates data attributes for the Menu element based on its current state.
 * These attributes are used for styling selectors and accessibility indicators.
 *
 * @param config - Configuration object containing Menu state flags
 * @returns Object with data attributes for the Menu element
 * @internal
 */
function useMenuDataAttributes({
  isOpen,
  isEmpty,
  isFocused,
  isFocusVisible,
  selectionMode
}: {
  readonly isOpen?: boolean;
  readonly isEmpty: boolean;
  readonly isFocused: boolean;
  readonly isFocusVisible: boolean;
  readonly selectionMode?: SelectionMode;
}) {
  return useDataAttributes({
    open: isOpen,
    empty: isEmpty,
    focused: isFocused,
    'focus-visible': isFocusVisible,
    'selection-mode': selectionMode !== 'none' ? selectionMode : undefined
  });
}

/**
 * Render props provided to Menu render functions and empty state renderers.
 * @interface MenuRenderProps
 */
export interface MenuRenderProps {
  /**
   * Whether the menu has no items and should display its empty state.
   * @selector [data-empty]
   */
  readonly isEmpty: boolean;
  /**
   * Whether the menu is currently focused.
   * @selector [data-focused]
   */
  readonly isFocused: boolean;
  /**
   * Whether the menu is currently keyboard focused.
   * @selector [data-focus-visible]
   */
  readonly isFocusVisible: boolean;
  /**
   * Whether the menu is currently open.
   * @selector [data-open]
   */
  readonly isOpen: boolean;
  /**
   * State of the menu.
   */
  readonly state: TreeState<unknown>;
  /**
   * The items array when using dynamic collections.
   */
  readonly items?: Iterable<unknown>;
}

/**
 * Props for the Menu component.
 * @interface MenuProps
 * @template T The type of items in the collection
 */
export interface MenuProps<T>
  extends Omit<AriaMenuProps<T>, 'label' | 'children'>,
    Omit<React.ComponentProps<'div'>, keyof AriaMenuProps<T> | 'children'>,
    Slots {
  /**
   * Provides content to display when there are no items in the menu.
   */
  readonly renderEmptyState?: (props: MenuRenderProps) => React.ReactNode;
  /**
   * The primary orientation of the items.
   * @default 'vertical'
   */
  readonly orientation?: Orientation;
  /**
   * Static children or render function for the Menu.
   */
  readonly children?: React.ReactNode | ((item: T) => React.ReactNode) | ((props: MenuRenderProps) => React.ReactNode);
  /**
   * Whether the menu should close when an item is selected.
   * @default true for single selection, false for multiple selection
   */
  readonly shouldCloseOnSelect?: boolean;
  /**
   * Whether keyboard navigation should wrap from the last item to the first and vice versa.
   * @default true
   */
  readonly shouldFocusWrap?: boolean;
}

/**
 * Custom hook to manage Menu state creation and context handling.
 * @internal
 */
function useMenuState(props: Record<string, unknown>) {
  const contextState = useContext(MenuStateContext);

  const stateProps = {
    ...props,
    children: undefined,
    items: undefined
  };

  const state = contextState ?? useTreeState(stateProps);

  return { state, contextState };
}

/**
 * Composes all props for the Menu element.
 * @internal
 */
function useComposedProps({
  otherProps,
  originalProps,
  renderValues,
  menuProps,
  focusProps,
  dataAttributes,
  menuRef
}: {
  readonly otherProps: Record<string, unknown>;
  readonly originalProps: Record<string, unknown>;
  readonly renderValues: MenuRenderProps;
  readonly menuProps: Record<string, unknown>;
  readonly focusProps: Record<string, unknown>;
  readonly dataAttributes: Record<string, unknown>;
  readonly menuRef: React.RefObject<HTMLDivElement>;
}) {
  // Second pass: reprocess original props with render state for render prop support
  const { apply } = useProps(originalProps, renderValues);

  const propsToExclude = [
    'renderEmptyState',
    'selectionMode',
    'defaultSelectedKeys',
    'disabledKeys',
    'disallowEmptySelection',
    'items',
    'children',
    'keyboardDelegate',
    'onAction',
    'onClose',
    'shouldCloseOnSelect',
    'shouldFocusWrap'
  ];

  const appliedUserProps = apply(otherProps, propsToExclude);

  const baseProps = {
    ...mergeProps(menuProps, focusProps),
    ...dataAttributes
  };

  const finalProps = {
    ...baseProps,
    ...appliedUserProps,
    ref: menuRef
  };

  return finalProps;
}

/**
 * Renders all items in the collection as React elements.
 * @internal
 */
function renderCollectionItems(collection: TreeState<unknown>['collection']): React.ReactElement[] {
  return [...collection].map(function renderCollectionItem(item: Node<unknown>) {
    return item.type === 'section' ? (
      <MenuSectionInner key={item.key} section={item} />
    ) : (
      <MenuItemImpl key={item.key} __node={item as Node<object>}>
        {item.rendered}
      </MenuItemImpl>
    );
  });
}

/**
 * Determines what content to render inside the Menu.
 * @internal
 */
function renderMenuContent({
  children,
  items,
  isEmpty,
  renderEmptyStateProp,
  renderValues,
  collection
}: {
  readonly children?:
    | React.ReactNode
    | ((item: unknown) => React.ReactNode)
    | ((props: MenuRenderProps) => React.ReactNode);
  readonly items?: Iterable<unknown>;
  readonly isEmpty: boolean;
  readonly renderEmptyStateProp?: (props: MenuRenderProps) => React.ReactNode;
  readonly renderValues: MenuRenderProps;
  readonly collection: TreeState<unknown>['collection'];
}): React.ReactNode {
  const hasRenderChildren = typeof children === 'function' && !items;

  if (hasRenderChildren) {
    return (children as (props: MenuRenderProps) => React.ReactNode)(renderValues);
  }

  if (isEmpty && renderEmptyStateProp) {
    const emptyContent =
      typeof renderEmptyStateProp === 'function'
        ? renderEmptyStateProp(renderValues)
        : (renderEmptyStateProp as React.ReactNode);

    // Wrap empty state in role="menuitem" for accessibility
    return (
      <div role="menuitem" style={{ display: 'contents' }}>
        {emptyContent}
      </div>
    );
  }

  return renderCollectionItems(collection);
}

/**
 * Internal Menu component that handles the core rendering logic.
 * @internal
 */
const MenuInner: React.FC<{
  readonly state: TreeState<unknown>;
  readonly renderEmptyState?: (props: MenuRenderProps) => React.ReactNode;
  readonly children?:
    | React.ReactNode
    | ((item: unknown) => React.ReactNode)
    | ((props: MenuRenderProps) => React.ReactNode);
  readonly items?: Iterable<unknown>;
  readonly menuRef: RefObject<HTMLDivElement>;
  readonly orientation?: Orientation;
  readonly onAction?: (key: any) => void;
  readonly onClose?: () => void;
  readonly selectionMode?: SelectionMode;
  readonly originalProps: Record<string, unknown>;
}> = function MenuInner({
  state,
  renderEmptyState: renderEmptyStateProp,
  children,
  items,
  menuRef,
  originalProps,
  ...otherProps
}) {
  const triggerState = useContext(MenuTriggerStateContext);

  // Auto-wire onClose to trigger state if not provided
  const onClose = otherProps.onClose || (() => triggerState?.close());

  const { menuProps } = useMenu({ ...otherProps, onClose }, state, menuRef);

  const { focusProps, isFocused, isFocusVisible } = useFocusRing();
  const isEmpty = state.collection.size === 0;

  const isOpen = triggerState?.isOpen ?? true;

  const renderValues: MenuRenderProps = {
    isEmpty,
    isFocused,
    isFocusVisible,
    isOpen,
    state,
    items
  };

  const dataAttributes = useMenuDataAttributes({
    isOpen,
    isEmpty,
    isFocused,
    isFocusVisible,
    selectionMode: state.selectionManager.selectionMode as SelectionMode
  });

  const composedProps = useComposedProps({
    otherProps,
    originalProps,
    renderValues,
    menuProps: menuProps as Record<string, unknown>,
    focusProps: focusProps as Record<string, unknown>,
    dataAttributes,
    menuRef
  });

  return (
    <div {...composedProps}>
      {renderMenuContent({
        children,
        items,
        isEmpty,
        renderEmptyStateProp,
        renderValues,
        collection: state.collection
      })}
    </div>
  );
};

/**
 * Main Menu component.
 * @internal
 */
function MenuComponent<T>(args: MenuProps<T>, ref: React.ForwardedRef<HTMLDivElement>): React.ReactElement {
  return (
    <CollectionBuilder content={<AriaCollection {...(args as unknown as Parameters<typeof AriaCollection>[0])} />}>
      {function buildCollection(collection: unknown) {
        return <StandaloneMenu props={args as MenuProps<unknown>} menuRef={ref} collection={collection} />;
      }}
    </CollectionBuilder>
  );
}

/**
 * Standalone Menu component that manages its own state and collection.
 * @internal
 */
const StandaloneMenu: React.FC<{
  readonly props: MenuProps<unknown>;
  readonly menuRef: ForwardedRef<HTMLDivElement>;
  readonly collection: unknown;
}> = function StandaloneMenu({ props, menuRef, collection }) {
  const originalRenderEmptyState = props.renderEmptyState;

  const { props: processedProps } = useProps(props);
  const processedRef = useObjectRef(menuRef);
  const { state, contextState } = useMenuState({ ...processedProps, collection });

  const { renderEmptyState: _, ...cleanProcessedProps } = processedProps as MenuProps<unknown> & {
    renderEmptyState?: unknown;
  };

  const content = (
    <MenuInner
      state={state}
      menuRef={processedRef}
      renderEmptyState={originalRenderEmptyState}
      originalProps={props as Record<string, unknown>}
      {...cleanProcessedProps}
    />
  );

  return contextState ? content : <MenuStateContext.Provider value={state}>{content}</MenuStateContext.Provider>;
};

/**
 * A complete Menu component providing accessible menus with keyboard navigation.
 * Supports both static children and dynamic collections, with single/multiple selection modes.
 * Built on React Aria with full ARIA compliance and keyboard accessibility.
 *
 * @component
 * @example
 * ```tsx
 * <Menu aria-label="Actions" onAction={(key) => console.log(key)}>
 *   <MenuItem key="new">New file</MenuItem>
 *   <MenuItem key="open">Open...</MenuItem>
 * </Menu>
 * ```
 * @public
 */
export const Menu = withSlots('BentoMenu', MenuComponent);

/**
 * Collection component for building dynamic collections in Menu.
 * Re-exported from React Aria Collections for use with the `items` prop
 * and dynamic menu content. See React Aria Collections documentation for
 * usage with complex hierarchical data structures.
 *
 * @example
 * ```tsx
 * <Menu aria-label="Dynamic menu" items={items}>
 *   {(item) => (
 *     <MenuItem textValue={item.name}>
 *       {item.name}
 *     </MenuItem>
 *   )}
 * </Menu>
 * ```
 * @public
 */
export { AriaCollection as Collection };

/**
 * Context for sharing Menu state across components.
 * @public
 */
export { MenuStateContext };

/**
 * Props for the Separator component.
 * @interface SeparatorProps
 */
export interface SeparatorProps extends React.ComponentProps<'div'> {
  /**
   * The orientation of the separator.
   * @default 'horizontal'
   */
  readonly orientation?: 'horizontal' | 'vertical';
}

/**
 * Internal Separator component implementation.
 * @internal
 */
function SeparatorComponent(props: SeparatorProps, ref: ForwardedRef<HTMLDivElement>): React.ReactElement {
  const { orientation = 'horizontal', ...rest } = props;
  const { props: processedProps } = useProps(rest, {}, ref);
  const objectRef = useObjectRef(ref);

  const { separatorProps } = useSeparator({
    orientation,
    elementType: 'div'
  });

  return <div {...separatorProps} {...processedProps} ref={objectRef} />;
}

/**
 * A visual divider component for separating menu items or sections.
 * Renders a semantic separator with proper ARIA attributes.
 *
 * @component
 * @example
 * ```tsx
 * <Menu aria-label="Actions">
 *   <MenuItem>Cut</MenuItem>
 *   <MenuItem>Copy</MenuItem>
 *   <Separator />
 *   <MenuItem>Paste</MenuItem>
 * </Menu>
 * ```
 * @public
 */
export const Separator = withSlots('BentoSeparator', React.forwardRef(SeparatorComponent));

/**
 * Props for the SubmenuTrigger component.
 * @interface SubmenuTriggerProps
 */
export interface SubmenuTriggerProps {
  /**
   * The trigger menu item and the submenu.
   * Children should use the `slot` prop to specify 'trigger' or 'submenu'.
   */
  readonly children: React.ReactNode;
  /**
   * Delay in milliseconds before opening submenu on hover.
   * @default 200
   */
  readonly delay?: number;
}

/**
 * SubmenuTrigger coordinates the open/close state of a submenu and its trigger item.
 * This is a placeholder implementation for future submenu support.
 *
 * In v1, this component is exported but not fully implemented. It provides the
 * API surface for future nested menu functionality.
 *
 * @component
 * @example
 * ```tsx
 * <Menu aria-label="File">
 *   <SubmenuTrigger delay={200}>
 *     <MenuItem slot="trigger">Share →</MenuItem>
 *     <Menu slot="submenu" aria-label="Share">
 *       <MenuItem>Email</MenuItem>
 *       <MenuItem>Slack</MenuItem>
 *     </Menu>
 *   </SubmenuTrigger>
 * </Menu>
 * ```
 * @public
 */
export function SubmenuTrigger({ children }: SubmenuTriggerProps): React.ReactElement {
  // TODO: Implement submenu coordination with hover/focus management
  return <>{children}</>;
}
