import type React from 'react';
import { createContext, useContext, useMemo, type ForwardedRef, type RefObject } from 'react'
import {
  FocusScope,
  mergeProps,
  useCollator,
  useLocale,
  useListBox,
  useFocusRing,
  ListKeyboardDelegate
} from 'react-aria';
import { type ListState, type SelectionBehavior, useListState, type Orientation, type Node } from 'react-stately';
import { CollectionBuilder, Collection as AriaCollection } from '@react-aria/collections';
import type { AriaListBoxProps } from '@react-types/listbox';
import { useDataAttributes } from '@bento/use-data-attributes';
import { useProps } from '@bento/use-props';
import { withSlots, type Slots } from '@bento/slots';
import { ListBoxItemImpl } from './listbox-item.tsx';
import { ListBoxSectionInner } from './listbox-section.tsx';
import { useSafeObjectRef } from './utils.ts';

/**
 * Render props provided to ListBox render functions and empty state renderers.
 * @interface ListBoxRenderProps
 */
export interface ListBoxRenderProps {
  /**
   * Whether the listbox has no items and should display its empty state.
   * @selector [data-empty]
   */
  readonly isEmpty: boolean;
  /**
   * Whether the listbox is currently focused.
   * @selector [data-focused]
   */
  readonly isFocused: boolean;
  /**
   * Whether the listbox is currently keyboard focused.
   * @selector [data-focus-visible]
   */
  readonly isFocusVisible: boolean;
  /**
   * Whether the listbox is currently the active drop target.
   * @selector [data-drop-target]
   */
  readonly isDropTarget: boolean;
  /**
   * Whether the items are arranged in a stack or grid.
   * @selector [data-layout="stack | grid"]
   */
  readonly layout?: 'stack' | 'grid';
  /**
   * State of the listbox.
   */
  readonly state: ListState<unknown>;
  /**
   * The items array when using dynamic collections.
   */
  readonly items?: Iterable<unknown>;
}

/**
 * Props for the ListBox component.
 * @interface ListBoxProps
 * @template T The type of items in the collection
 */
export interface ListBoxProps<T>
  extends Omit<AriaListBoxProps<T>, 'label' | 'children'>,
    Omit<React.ComponentProps<'div'>, keyof AriaListBoxProps<T> | 'children'>,
    Slots {
  /**
   * How multiple selection should behave in the collection.
   */
  readonly selectionBehavior?: SelectionBehavior;
  /**
   * Provides content to display when there are no items in the list.
   */
  readonly renderEmptyState?: (props: ListBoxRenderProps) => React.ReactNode;
  /**
   * Whether the items are arranged in a stack layout.
   * @default 'stack'
   */
  readonly layout?: 'stack';
  /**
   * The primary orientation of the items. Usually this is the direction that the collection scrolls.
   * @default 'vertical'
   */
  readonly orientation?: Orientation;
  /**
   * Static children or render function for the ListBox.
   * When items prop is provided, children receives individual items for React Aria compatibility.
   * When no items prop is provided, children receives Bento render props { isEmpty, isFocused, state, etc. }.
   */
  readonly children?:
    | React.ReactNode
    | ((item: T) => React.ReactNode)
    | ((props: ListBoxRenderProps) => React.ReactNode);
}

/**
 * React context for sharing ListBox state across components.
 * This context provides the ListBox state to child components like ListBoxItem and ListBoxSection,
 * enabling them to access selection state, collection data, and other shared functionality.
 *
 * @context
 * @internal
 */
const ListStateContext = createContext<ListState<unknown> | null>(null);

/**
 * Custom hook to manage ListBox state creation and context handling.
 * This hook either uses an existing state from context or creates a new one.
 * It's designed to work both as a standalone component and within a parent component
 * that provides ListBox state through context.
 *
 * @param {Record<string, unknown>} props - Configuration object for the ListBox state
 * @returns {object} An object containing the state instance and context state flag
 * @returns {ListState<unknown>} returns.state - The ListBox state instance
 * @returns {ListState<unknown> | null} returns.contextState - Existing context state, if any
 * @internal
 */
function useListBoxState(props: Record<string, unknown>) {
  const contextState = useContext(ListStateContext);

  const stateProps = {
    ...props,
    children: undefined,
    items: undefined
  };

  const state = contextState ?? useListState(stateProps);

  return { state, contextState };
}

/**
 * Renders content with optional context provider wrapper.
 * If no context state exists, wraps the content in a ListStateContext.Provider.
 * This allows the ListBox to work both standalone and as part of a larger component tree.
 *
 * @param {React.ReactNode} content - The React content to render
 * @param {ListState<unknown>} state - The ListBox state to provide via context
 * @param {ListState<unknown> | null} contextState - Existing context state, if any
 * @returns {React.ReactNode} The content, optionally wrapped in a context provider
 * @internal
 */
function renderWithOptionalContext(
  content: React.ReactNode,
  state: ListState<unknown>,
  contextState: ListState<unknown> | null
): React.ReactNode {
  /* v8 ignore next */
  return contextState ? content : <ListStateContext.Provider value={state}>{content}</ListStateContext.Provider>;
}

/**
 * Creates and memoizes a keyboard delegate for the ListBox.
 * The keyboard delegate handles keyboard navigation logic, including
 * arrow key navigation, home/end keys, and type-ahead functionality.
 *
 * @param {object} config - Configuration object for the keyboard delegate
 * @param {ListState<unknown>['collection']} config.collection - The collection of items in the ListBox
 * @param {Intl.Collator} config.collator - Intl collator for string comparison in type-ahead
 * @param {React.RefObject<HTMLDivElement>} config.listBoxRef - Reference to the ListBox DOM element
 * @param {ListState<unknown>['selectionManager']} config.selectionManager - Selection manager from the state
 * @param {'stack' | 'grid'} [config.layout] - Layout mode (stack or grid)
 * @param {Orientation} [config.orientation] - Primary orientation of the items
 * @param {'ltr' | 'rtl'} config.direction - Text direction (ltr or rtl)
 * @param {ListKeyboardDelegate<unknown>} [config.keyboardDelegate] - Custom keyboard delegate to use instead of default
 * @returns {ListKeyboardDelegate<unknown>} A keyboard delegate instance for handling keyboard interactions
 * @internal
 */
function useKeyboardDelegate({
  collection,
  collator,
  listBoxRef,
  selectionManager,
  layout,
  orientation,
  direction,
  keyboardDelegate: providedDelegate
}: {
  readonly collection: ListState<unknown>['collection'];
  readonly collator: Intl.Collator;
  readonly listBoxRef: React.RefObject<HTMLDivElement>;
  readonly selectionManager: ListState<unknown>['selectionManager'];
  readonly layout?: 'stack' | 'grid';
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
          ref: listBoxRef,
          disabledKeys,
          disabledBehavior,
          layout,
          orientation,
          direction
        })
      );
    },
    [collection, collator, listBoxRef, selectionManager, orientation, direction, layout, providedDelegate]
  );
}

/**
 * Generates data attributes for the ListBox element based on its current state.
 * These attributes are used for styling selectors and accessibility indicators.
 *
 * @param {object} config - Configuration object containing ListBox state flags
 * @param {boolean} config.isEmpty - Whether the listbox has no items
 * @param {boolean} config.isFocused - Whether the listbox is currently focused
 * @param {boolean} config.isFocusVisible - Whether focus should be visually indicated
 * @param {'stack' | 'grid'} [config.layout] - Layout mode (stack or grid)
 * @param {Orientation} [config.orientation] - Primary orientation of the items
 * @param {ListState<unknown>['selectionManager']} config.selectionManager - Selection manager containing selection state
 * @param {boolean} [config.allowsTabNavigation] - Whether tab navigation is enabled
 * @param {boolean} [config.shouldFocusWrap] - Whether focus wraps at boundaries
 * @param {SelectionBehavior} [config.originalSelectionBehavior] - Original selection behavior setting
 * @returns {Record<string, unknown>} Object with data attributes for the ListBox element
 * @internal
 */
function useListBoxDataAttributes({
  isEmpty,
  isFocused,
  isFocusVisible,
  layout,
  orientation,
  selectionManager,
  allowsTabNavigation,
  shouldFocusWrap,
  originalSelectionBehavior
}: {
  readonly isEmpty: boolean;
  readonly isFocused: boolean;
  readonly isFocusVisible: boolean;
  readonly layout?: 'stack' | 'grid';
  readonly orientation?: Orientation;
  readonly selectionManager: ListState<unknown>['selectionManager'];
  readonly allowsTabNavigation?: boolean;
  readonly shouldFocusWrap?: boolean;
  readonly originalSelectionBehavior?: SelectionBehavior;
}) {
  return useDataAttributes({
    empty: isEmpty,
    focused: isFocused,
    'focus-visible': isFocusVisible,
    layout,
    orientation,
    'selection-mode': selectionManager.selectionMode !== 'none' ? selectionManager.selectionMode : undefined,
    'selection-behavior': originalSelectionBehavior !== undefined ? selectionManager.selectionBehavior : undefined,
    'allows-tab-navigation': allowsTabNavigation,
    'focus-wrap': shouldFocusWrap
  });
}

/**
 * Composes all props for the ListBox element including DOM props, ARIA props,
 * focus props, and data attributes. Handles prop application through useProps
 * and manages ref assignment to avoid proxy extensibility issues.
 *
 * @param {object} config - Configuration object containing all props to compose
 * @param {Record<string, unknown>} config.otherProps - Additional props from the component
 * @param {ListBoxRenderProps} config.renderValues - Values available to render functions
 * @param {Record<string, unknown>} config.listBoxProps - Props from useListBox hook
 * @param {Record<string, unknown>} config.focusProps - Props from useFocusRing hook
 * @param {Record<string, unknown>} config.dataAttributes - Data attributes for styling/selectors
 * @param {ListState<unknown>['selectionManager']} config.selectionManager - Selection manager for ARIA attributes
 * @param {React.RefObject<HTMLDivElement>} config.listBoxRef - Reference to attach to the final element
 * @returns {Record<string, unknown>} Composed props object ready for the ListBox element
 * @internal
 */
function useComposedProps({
  otherProps,
  renderValues,
  listBoxProps,
  focusProps,
  dataAttributes,
  selectionManager,
  listBoxRef
}: {
  readonly otherProps: Record<string, unknown>;
  readonly renderValues: ListBoxRenderProps;
  readonly listBoxProps: Record<string, unknown>;
  readonly focusProps: Record<string, unknown>;
  readonly dataAttributes: Record<string, unknown>;
  readonly selectionManager: ListState<unknown>['selectionManager'];
  readonly listBoxRef: React.RefObject<HTMLDivElement>;
}) {
  const { apply } = useProps(otherProps, renderValues);

  const propsToExclude = [
    'renderEmptyState',
    'selectionMode',
    'defaultSelectedKeys',
    'disabledKeys',
    'disallowEmptySelection',
    'shouldFocusWrap',
    'items',
    'children',
    'selectionBehavior',
    'keyboardDelegate'
  ];

  // Apply user props directly (preserves className, style, etc.)
  const appliedUserProps = apply(otherProps, propsToExclude);

  // React Aria and Bento props
  const baseProps = {
    ...mergeProps(listBoxProps, focusProps),
    ...dataAttributes,
    ...(selectionManager.selectionMode !== 'none' && {
      'aria-multiselectable': selectionManager.selectionMode === 'multiple'
    })
  };

  //
  // Merge all props together with user props taking precedence
  //
  const finalProps = {
    ...baseProps,
    ...appliedUserProps,
    ref: listBoxRef // Set ref directly to avoid extensibility issues
  };

  return finalProps;
}

/**
 * Renders the empty state content for the ListBox when no items are present.
 * Handles both function-based render props and direct JSX elements.
 * If a function is provided, calls it with render values; otherwise returns as-is.
 *
 * @param {(props: ListBoxRenderProps) => React.ReactNode} renderEmptyStateFn - Function or JSX element to render for empty state
 * @param {ListBoxRenderProps} renderValues - Current render values to pass to render function
 * @returns {React.ReactNode} Rendered empty state content
 * @internal
 */
function renderEmptyState(
  renderEmptyStateFn: (props: ListBoxRenderProps) => React.ReactNode,
  renderValues: ListBoxRenderProps
): React.ReactNode {
  //
  // Handle cases where renderEmptyState is not a function (e.g., JSX element passed directly)
  //
  if (typeof renderEmptyStateFn === 'function') {
    return renderEmptyStateFn(renderValues);
  }
  //
  // If it's not a function, just return it as-is (likely a JSX element)
  //
  return renderEmptyStateFn as React.ReactNode;
}

/**
 * Renders all items in the collection as React elements.
 * Handles both regular items and section items, using the appropriate
 * components (ListBoxItemImpl for items, ListBoxSectionInner for sections).
 *
 * @param {ListState<unknown>['collection']} collection - The collection of items to render
 * @returns {React.ReactElement[]} Array of rendered React elements for all collection items
 * @internal
 */
function renderCollectionItems(collection: ListState<unknown>['collection']): React.ReactElement[] {
  return [...collection].map(function renderCollectionItem(item: Node<unknown>) {
    return item.type === 'section' ? (
      <ListBoxSectionInner key={item.key} section={item} />
    ) : (
      <ListBoxItemImpl key={item.key} __node={item as Node<object>}>
        {item.rendered}
      </ListBoxItemImpl>
    );
  });
}

/**
 * Determines what content to render inside the ListBox based on its configuration.
 * Handles three cases:
 * 1. Function children without items (Bento render prop pattern with full render props)
 * 2. Empty state when no items and renderEmptyState is provided
 * 3. Normal collection rendering (including items with children functions for React Aria compatibility)
 *
 * @param {object} config - Configuration object for rendering
 * @param {React.ReactNode | ((item: unknown) => React.ReactNode) | ((props: ListBoxRenderProps) => React.ReactNode)} [config.children] - Children prop (static, item render function, or ListBox render prop)
 * @param {Iterable<unknown>} [config.items] - Items array for dynamic collections
 * @param {boolean} config.isEmpty - Whether the collection is empty
 * @param {(props: ListBoxRenderProps) => React.ReactNode} [config.renderEmptyStateProp] - Function to render empty state
 * @param {ListBoxRenderProps} config.renderValues - Current render values for render functions
 * @param {ListState<unknown>['collection']} config.collection - The collection state to render
 * @returns {React.ReactNode} The appropriate content to render inside the ListBox
 * @internal
 */
function renderListBoxContent({
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
    | ((props: ListBoxRenderProps) => React.ReactNode);
  readonly items?: Iterable<unknown>;
  readonly isEmpty: boolean;
  readonly renderEmptyStateProp?: (props: ListBoxRenderProps) => React.ReactNode;
  readonly renderValues: ListBoxRenderProps;
  readonly collection: ListState<unknown>['collection'];
}): React.ReactNode {
  // If children is a function AND no items provided, use Bento render prop pattern
  /* v8 ignore next */
  const hasRenderChildren = typeof children === 'function' && !items;

  /* v8 ignore next 3 */
  if (hasRenderChildren) {
    return (children as (props: ListBoxRenderProps) => React.ReactNode)(renderValues);
  }

  // Handle empty state
  if (isEmpty && renderEmptyStateProp) {
    return renderEmptyState(renderEmptyStateProp, renderValues);
  }

  // Render collection items (React Aria handles items + children function internally)
  return renderCollectionItems(collection);
}

/**
 * Internal ListBox component that handles the core rendering logic.
 * This component manages all the hooks, state, and prop composition needed
 * for a fully functional ListBox. It's wrapped by the main ListBox component
 * which handles collection building.
 *
 * @param {object} props - Component props
 * @param {ListState<unknown>} props.state - The ListBox state instance
 * @param {(props: ListBoxRenderProps) => React.ReactNode} [props.renderEmptyState] - Function to render when no items are present
 * @param {React.ReactNode | ((item: unknown) => React.ReactNode) | ((props: ListBoxRenderProps) => React.ReactNode)} [props.children] - Static children, item render function, or ListBox render function
 * @param {Iterable<unknown>} [props.items] - Items array for dynamic collections
 * @param {React.RefObject<HTMLDivElement>} props.listBoxRef - Reference to the ListBox DOM element
 * @param {'stack'} [props.layout] - Layout mode (stack or grid)
 * @param {Orientation} [props.orientation] - Primary orientation of the items
 * @param {boolean} [props.shouldSelectOnPressUp] - Whether selection occurs on pointer up
 * @param {ListKeyboardDelegate<unknown>} [props.keyboardDelegate] - Custom keyboard navigation delegate
 * @param {boolean} [props.allowsTabNavigation] - Whether tab key navigates between items
 * @param {boolean} [props.shouldFocusWrap] - Whether focus wraps at boundaries
 * @param {'none' | 'single' | 'multiple'} [props.selectionMode] - Selection mode (none, single, multiple)
 * @param {SelectionBehavior} [props.selectionBehavior] - Selection behavior (toggle, replace)
 * @returns {React.ReactElement} A fully functional ListBox element with focus scope
 * @internal
 */
const ListBoxInner: React.FC<{
  readonly state: ListState<unknown>;
  readonly renderEmptyState?: (props: ListBoxRenderProps) => React.ReactNode;
  readonly children?:
    | React.ReactNode
    | ((item: unknown) => React.ReactNode)
    | ((props: ListBoxRenderProps) => React.ReactNode);
  readonly items?: Iterable<unknown>;
  readonly listBoxRef: RefObject<HTMLDivElement>;
  readonly layout?: 'stack';
  readonly orientation?: Orientation;
  readonly shouldSelectOnPressUp?: boolean;
  readonly keyboardDelegate?: ListKeyboardDelegate<unknown>;
  readonly allowsTabNavigation?: boolean;
  readonly shouldFocusWrap?: boolean;
  readonly selectionMode?: 'none' | 'single' | 'multiple';
  readonly selectionBehavior?: SelectionBehavior;
}> = function ListBoxInner({
  state,
  renderEmptyState: renderEmptyStateProp,
  children,
  items,
  listBoxRef,
  ...otherProps
}) {
  const { layout = 'stack', orientation = 'vertical', shouldSelectOnPressUp, selectionBehavior } = otherProps;

  const { collection, selectionManager } = state;
  const { direction } = useLocale();
  const collator = useCollator({ usage: 'search', sensitivity: 'base' });

  const keyboardDelegate = useKeyboardDelegate({
    collection,
    collator,
    listBoxRef,
    selectionManager,
    layout,
    orientation,
    direction,
    keyboardDelegate: otherProps.keyboardDelegate
  });

  const { listBoxProps } = useListBox(
    {
      ...otherProps,
      shouldSelectOnPressUp,
      keyboardDelegate
    },
    state,
    listBoxRef
  );

  const { focusProps, isFocused, isFocusVisible } = useFocusRing();
  const isEmpty = state.collection.size === 0;

  const renderValues: ListBoxRenderProps = {
    isEmpty,
    isFocused,
    isFocusVisible,
    isDropTarget: false,
    layout,
    state,
    items
  };

  const dataAttributes = useListBoxDataAttributes({
    isEmpty,
    isFocused,
    isFocusVisible,
    layout,
    orientation,
    selectionManager,
    allowsTabNavigation: otherProps.allowsTabNavigation,
    shouldFocusWrap: otherProps.shouldFocusWrap,
    originalSelectionBehavior: selectionBehavior
  });

  const composedProps = useComposedProps({
    otherProps,
    renderValues,
    listBoxProps: listBoxProps as Record<string, unknown>,
    focusProps: focusProps as Record<string, unknown>,
    dataAttributes,
    selectionManager,
    listBoxRef
  });

  return (
    <FocusScope>
      <div {...composedProps}>
        {renderListBoxContent({
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
 * A complete ListBox component providing accessible selection lists with keyboard navigation.
 * Supports both static children and dynamic collections, with single/multiple selection modes.
 * Built on React Aria with full ARIA compliance and keyboard accessibility.
 *
 * @component
 * @template T The type of items in the collection
 * @param {ListBoxProps<T>} args - The properties passed to the ListBox component
 * @param {React.ForwardedRef<HTMLDivElement>} ref - The ref to the listbox container
 * @returns {React.ReactElement} A ListBox component
 *
 * @example
 * ```tsx
 * <ListBox aria-label="Fruits" selectionMode="single">
 *   <ListBoxItem id="apple" textValue="Apple">Apple</ListBoxItem>
 *   <ListBoxItem id="banana" textValue="Banana">Banana</ListBoxItem>
 * </ListBox>
 * ```
 * @public
 */
function ListBoxComponent<T>(...args: any[]): React.ReactElement {
  const [_args, ref] = args as [ListBoxProps<T>, React.ForwardedRef<HTMLDivElement>];
  return (
    <CollectionBuilder content={<AriaCollection {...(_args as unknown as Parameters<typeof AriaCollection>[0])} />}>
      {function buildCollection(collection: unknown) {
        return <StandaloneListBox props={_args as ListBoxProps<unknown>} listBoxRef={ref} collection={collection} />;
      }}
    </CollectionBuilder>
  );
}

/**
 * Standalone ListBox component that manages its own state and collection.
 * This component is used internally by the main ListBox component after
 * collection building is complete. It handles prop processing, state creation,
 * and context management.
 *
 * @param {object} props - Component props
 * @param {ListBoxProps<unknown>} props.props - The original ListBox props
 * @param {React.ForwardedRef<HTMLDivElement>} props.listBoxRef - Reference to forward to the ListBox element
 * @param {unknown} props.collection - Built collection from CollectionBuilder
 * @returns {React.ReactElement} A complete ListBox with state management and optional context wrapping
 * @internal
 */
const StandaloneListBox: React.FC<{
  readonly props: ListBoxProps<unknown>;
  readonly listBoxRef: ForwardedRef<HTMLDivElement>;
  readonly collection: unknown;
}> = function StandaloneListBox({ props, listBoxRef, collection }) {
  //
  // Extract renderEmptyState before useProps processes it to avoid render prop corruption
  //
  const originalRenderEmptyState = props.renderEmptyState;

  const { props: processedProps } = useProps(props);
  const processedRef = useSafeObjectRef(listBoxRef);
  const { state, contextState } = useListBoxState({ ...processedProps, collection });

  const { renderEmptyState: _, ...cleanProcessedProps } = processedProps as ListBoxProps<unknown> & {
    renderEmptyState?: unknown;
  };

  const content = (
    <ListBoxInner
      state={state}
      listBoxRef={processedRef}
      renderEmptyState={originalRenderEmptyState}
      {...cleanProcessedProps}
    />
  );

  return renderWithOptionalContext(content, state, contextState);
};

/**
 * A complete ListBox component providing accessible selection lists with keyboard navigation.
 * Supports both static children and dynamic collections, with single/multiple selection modes.
 * Built on React Aria with full ARIA compliance and keyboard accessibility.
 *
 * @component
 * @example
 * ```tsx
 * <ListBox aria-label="Fruits" selectionMode="single">
 *   <ListBoxItem id="apple" textValue="Apple">Apple</ListBoxItem>
 *   <ListBoxItem id="banana" textValue="Banana">Banana</ListBoxItem>
 * </ListBox>
 * ```
 * @public
 */
export const ListBox = withSlots('BentoListBox', ListBoxComponent);

/**
 * Collection component for building dynamic collections in ListBox.
 * Re-exported from React Aria Collections.
 * @public
 */
export { AriaCollection as Collection };

/**
 * Context for sharing ListBox state across components.
 * Used internally by ListBoxItem and ListBoxSection components.
 * @public
 */
export { ListStateContext };
