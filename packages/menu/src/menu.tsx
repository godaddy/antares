import React, { useContext, useMemo, type ForwardedRef, type RefObject } from 'react';
import {
  FocusScope,
  mergeProps,
  useCollator,
  useLocale,
  useMenu,
  useFocusRing,
  ListKeyboardDelegate
} from 'react-aria';
import { useTreeState, type TreeState, type Orientation, type Node } from 'react-stately';
import { CollectionBuilder, Collection as AriaCollection } from '@react-aria/collections';
import type { AriaMenuProps } from '@react-types/menu';
import { useProps } from '@bento/use-props';
import { withSlots, type Slots } from '@bento/slots';
import { MenuItemImpl } from './menu-item';
import { MenuSectionInner } from './menu-section';
import { useSafeObjectRef } from './utils';
import { MenuStateContext, MenuTriggerStateContext } from './context';
import { useMenuDataAttributes } from './data-attributes';
import type { SelectionMode } from './types';

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
 * Renders content with optional context provider wrapper.
 * @internal
 */
function renderWithOptionalContext(
  content: React.ReactNode,
  state: TreeState<unknown>,
  contextState: TreeState<unknown> | null
): React.ReactNode {
  return contextState ? content : <MenuStateContext.Provider value={state}>{content}</MenuStateContext.Provider>;
}

/**
 * Creates and memoizes a keyboard delegate for the Menu.
 * @internal
 */
function useKeyboardDelegate({
  collection,
  collator,
  menuRef,
  selectionManager,
  orientation,
  direction,
  keyboardDelegate: providedDelegate
}: {
  readonly collection: TreeState<unknown>['collection'];
  readonly collator: Intl.Collator;
  readonly menuRef: React.RefObject<HTMLDivElement>;
  readonly selectionManager: TreeState<unknown>['selectionManager'];
  readonly orientation?: Orientation;
  readonly direction: 'ltr' | 'rtl';
  readonly keyboardDelegate?: ListKeyboardDelegate<unknown>;
}): ListKeyboardDelegate<unknown> {
  const { disabledBehavior, disabledKeys } = selectionManager;

  return useMemo(
    function createKeyboardDelegate() {
      return (
        providedDelegate ||
        new ListKeyboardDelegate({
          collection,
          collator,
          ref: menuRef,
          disabledKeys,
          disabledBehavior,
          orientation,
          direction
        })
      );
    },
    [collection, collator, menuRef, selectionManager, orientation, direction, providedDelegate]
  );
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
    'onClose'
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
 * Renders the empty state content for the Menu when no items are present.
 * @internal
 */
function renderEmptyState(
  renderEmptyStateFn: (props: MenuRenderProps) => React.ReactNode,
  renderValues: MenuRenderProps
): React.ReactNode {
  if (typeof renderEmptyStateFn === 'function') {
    return renderEmptyStateFn(renderValues);
  }
  return renderEmptyStateFn as React.ReactNode;
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
    return renderEmptyState(renderEmptyStateProp, renderValues);
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
  readonly keyboardDelegate?: ListKeyboardDelegate<unknown>;
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
  const { orientation = 'vertical' } = otherProps;

  const { collection, selectionManager } = state;
  const { direction } = useLocale();
  const collator = useCollator({ usage: 'search', sensitivity: 'base' });

  const keyboardDelegate = useKeyboardDelegate({
    collection,
    collator,
    menuRef,
    selectionManager,
    orientation,
    direction,
    keyboardDelegate: otherProps.keyboardDelegate
  });

  const { menuProps } = useMenu(
    {
      ...otherProps,
      keyboardDelegate
    },
    state,
    menuRef
  );

  const { focusProps, isFocused, isFocusVisible } = useFocusRing();
  const isEmpty = state.collection.size === 0;

  const triggerState = useContext(MenuTriggerStateContext);
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
    orientation,
    selectionMode: selectionManager.selectionMode as SelectionMode
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
    <FocusScope>
      <div {...composedProps}>
        {renderMenuContent({
          children,
          items,
          isEmpty,
          renderEmptyStateProp,
          renderValues,
          collection
        })}
      </div>
    </FocusScope>
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
  const processedRef = useSafeObjectRef(menuRef);
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

  return renderWithOptionalContext(content, state, contextState);
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
 * Re-exported from React Aria Collections.
 * @public
 */
export { AriaCollection as Collection };

/**
 * Context for sharing Menu state across components.
 * @public
 */
export { MenuStateContext };
