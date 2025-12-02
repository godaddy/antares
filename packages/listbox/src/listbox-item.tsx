import React, { ForwardedRef, ReactNode, createContext, useContext, useMemo, forwardRef } from 'react';
import { mergeProps, useOption, useHover } from 'react-aria';
import { createLeafComponent } from '@react-aria/collections';
import { HoverEvents, Key, LinkDOMProps, Node } from '@react-types/shared';
import { useDataAttributes } from '@bento/use-data-attributes';
import { useProps } from '@bento/use-props';
import { ListStateContext } from './listbox';
import { useSafeObjectRef } from './utils';
import { withSlots } from '@bento/slots';

/**
 * Context value structure for text-related slot attributes.
 * Used to provide label and description attributes to child components.
 * @interface TextContextValue
 */
interface TextContextValue {
  readonly slots: {
    /** Attributes for label elements */
    readonly label?: React.HTMLAttributes<HTMLElement>;
    /** Attributes for description elements */
    readonly description?: React.HTMLAttributes<HTMLElement>;
  };
}

/**
 * Internal context for providing text-related slot attributes to child components.
 * This context allows ListBoxItem to pass label and description attributes
 * to nested components that need them for accessibility.
 * @internal
 */
const TextContext = createContext<TextContextValue>({ slots: {} });

/**
 * Render props provided to ListBoxItem render functions.
 * @interface ListBoxItemRenderProps
 */
export interface ListBoxItemRenderProps {
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
   * The type of selection that is allowed in the collection.
   * @selector [data-selection-mode="none | single | multiple"]
   */
  readonly selectionMode: 'none' | 'single' | 'multiple';
  /**
   * The selection behavior for the collection.
   * @selector [data-selection-behavior="toggle | replace"]
   */
  readonly selectionBehavior: 'toggle' | 'replace';
}

/**
 * Props for the ListBoxItem component.
 * @interface ListBoxItemProps
 */
export interface ListBoxItemProps
  extends LinkDOMProps,
    HoverEvents,
    Omit<React.HTMLAttributes<HTMLElement>, keyof LinkDOMProps | keyof HoverEvents | 'id' | 'children'> {
  /** The unique id of the item. If not provided, React Aria will auto-generate one. */
  readonly id?: Key;
  /** A string representation of the item's contents, used for features like typeahead. If not provided, React Aria will derive it from children automatically. */
  readonly textValue?: string;
  /**
   * Handler that is called when a user performs an action on the item. The exact user event depends on the
   * collection's `selectionBehavior` prop and the interaction modality.
   */
  readonly onAction?: () => void;
  /** The contents of the item. Can be a render function that receives render props. */
  readonly children?: ReactNode | ((values: ListBoxItemRenderProps) => ReactNode);
  /**
   * A slot name for the component. Used by Bento's slot system.
   */
  readonly slot?: string;
  /** Whether the item is disabled. */
  readonly isDisabled?: boolean;
}

/**
 * Internal implementation component for ListBoxItem.
 * Handles the core logic for rendering a single listbox item with proper accessibility.
 * This component manages all the hooks, state, and interactions needed for a functional
 * listbox item including selection, hover, focus, and keyboard interactions.
 *
 * @template T - The type of the item value
 * @param {object} props - Combined ListBoxItem props and internal node data
 * @param {Node<T>} props.__node - Internal React Aria node containing item metadata
 * @param {React.ReactNode | ((values: ListBoxItemRenderProps) => React.ReactNode)} [props.children] - Content to render, can be static or a render function
 * @param {boolean} [props.isDisabled] - Whether the item is disabled
 * @param {string} [props.aria-label] - ARIA label for accessibility
 * @param {(e: HoverEvent) => void} [props.onHoverStart] - Handler for hover start events
 * @param {(isHovering: boolean) => void} [props.onHoverChange] - Handler for hover change events
 * @param {(e: HoverEvent) => void} [props.onHoverEnd] - Handler for hover end events
 * @param {React.ForwardedRef<HTMLDivElement>} ref - Forwarded ref to the item element
 * @returns {React.ReactElement} A fully interactive listbox item with accessibility and state management
 * @internal
 */
const ListBoxItemImplComponent = function ListBoxItemImplComponent<T extends object>(
  { __node, ...props }: ListBoxItemProps & { readonly __node: Node<T> },
  ref: ForwardedRef<HTMLDivElement>
) {
  const state = useContext(ListStateContext)!;
  const safeRef = useSafeObjectRef(ref);

  const { optionProps, labelProps, descriptionProps, ...states } = useOption(
    {
      key: __node.key,
      'aria-label': props['aria-label'],
      isDisabled: props.isDisabled
    },
    state,
    safeRef
  );

  const { hoverProps, isHovered } = useHover({
    isDisabled: states.isDisabled,
    onHoverStart: props.onHoverStart,
    onHoverChange: props.onHoverChange,
    onHoverEnd: props.onHoverEnd
  });

  const renderValues: ListBoxItemRenderProps = {
    ...states,
    isHovered,
    selectionMode: state.selectionManager.selectionMode,
    selectionBehavior: state.selectionManager.selectionBehavior
  };

  const content = typeof props.children === 'function' ? props.children(renderValues) : props.children;

  const { apply } = useProps(props, renderValues);

  const dataAttributes = useDataAttributes({
    selected: states.isSelected,
    disabled: states.isDisabled,
    hovered: isHovered,
    focused: states.isFocused,
    'focus-visible': states.isFocusVisible,
    pressed: states.isPressed,
    level: __node.level,
    'selection-mode': state.selectionManager.selectionMode,
    'selection-behavior': state.selectionManager.selectionBehavior
  });

  const textContext = useMemo(
    function createTextContext() {
      return {
        slots: {
          label: labelProps,
          description: descriptionProps
        }
      };
    },
    [labelProps, descriptionProps]
  );

  const ElementType = __node.props.href ? 'a' : 'div';

  // Use original node props (which contain className) not filtered finalProps
  const appliedUserProps = apply(__node.props, ['ref']);

  const finalAttributes = {
    ...mergeProps(optionProps, hoverProps), // React Aria props
    ...dataAttributes, // Bento data attributes
    ...appliedUserProps,
    ref: safeRef,
    'data-text-value': __node.textValue
  };

  return (
    <TextContext.Provider value={textContext}>
      {React.createElement(ElementType, finalAttributes, content)}
    </TextContext.Provider>
  );
};

/**
 * Enhanced ListBoxItem implementation with slots support.
 * This wraps the core ListBoxItemImplComponent with Bento's slot system
 * for advanced composition and styling capabilities.
 * @internal
 */
export const ListBoxItemImpl = withSlots('BentoListBoxItem', forwardRef(ListBoxItemImplComponent));

/**
 * Adapter component that connects ListBoxItemImpl to React Aria's collection system.
 * This function serves as a bridge between React Aria's createLeafComponent and
 * the internal ListBoxItemImpl, ensuring proper prop forwarding and node injection.
 *
 * @template T - The type of the item value
 * @param {ListBoxItemProps} props - ListBoxItem component props
 * @param {React.ForwardedRef<HTMLDivElement>} forwardedRef - Ref forwarded from the collection system
 * @param {Node<T>} item - React Aria node containing item metadata and collection info
 * @returns {React.ReactElement} The ListBoxItemImpl component with proper node and ref wiring
 * @internal
 */
function ListBoxItemComponent<T extends object>(
  props: ListBoxItemProps,
  forwardedRef: ForwardedRef<HTMLDivElement>,
  item: Node<T>
) {
  return <ListBoxItemImpl {...props} ref={forwardedRef} __node={item} />;
}

/**
 * Base ListBoxItem component created through React Aria's collection system.
 * This handles the connection to the parent ListBox's collection state.
 * @internal
 */
const ListBoxItemBase = createLeafComponent('item', ListBoxItemComponent);

/**
 * A single item within a ListBox component.
 * Handles user interactions, accessibility, and state management for individual options.
 *
 * @component
 * @template T The type of the item value
 * @example
 * ```tsx
 * <ListBoxItem>Simple option</ListBoxItem>
 * ```
 * @public
 */
export const ListBoxItem = ListBoxItemBase;
