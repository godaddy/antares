import React, { useRef, ReactNode } from 'react';
import {
  useSelect,
  HiddenSelect,
  useFocusRing,
  useHover,
  usePreventScroll,
  mergeProps,
  useOverlay,
  useOverlayPosition
} from 'react-aria';
import type { Placement } from 'react-aria';
import { SelectState } from 'react-stately';
import { useSelectState } from './use-select-state';
import { AriaSelectProps } from '@react-types/select';
import { CollectionBuilder } from '@react-aria/collections';
import { Node, Collection as AriaCollectionType, Key } from '@react-types/shared';
import { useProps } from '@bento/use-props';
import { useDataAttributes } from '@bento/use-data-attributes';
import { withSlots, Slots } from '@bento/slots';
import { Container } from '@bento/container';
import { ListStateContext } from '@bento/listbox';
import type { PressableProps } from '@bento/pressable';
import type { ListBoxProps } from '@bento/listbox';

/**
 * Selection mode for Select component.
 * Determines whether users can select one item ('single') or multiple items ('multiple').
 * - 'single': User can select only one option at a time. Value is a single Key.
 * - 'multiple': User can select multiple options. Value is a Set<Key>.
 * @typedef {'single' | 'multiple'} SelectionMode
 * @public
 */
export type SelectionMode = 'single' | 'multiple';

/**
 * TypeScript interfaces for typed slot components.
 * Slot interfaces extend component interfaces so custom components must implement the same contracts.
 */

/**
 * Trigger slot must implement Pressable interface (button-like, pressable component)
 */
export interface SelectTriggerSlotProps extends PressableProps {
  /** Props from useSelect for the trigger */
  readonly triggerProps: React.HTMLAttributes<HTMLElement>;
  /** Ref to the trigger element */
  readonly ref?: React.RefObject<HTMLElement>;
}

/**
 * Value slot receives value props and display data
 */
export interface SelectValueSlotProps {
  /** Props from useSelect for the value display */
  readonly valueProps: React.HTMLAttributes<HTMLElement>;
  /** Placeholder text when no value is selected */
  readonly placeholder?: string;
  /** Currently selected item (single mode) */
  readonly selectedItem?: Node<unknown> | null;
  /** Currently selected items (multiple mode) */
  readonly selectedItems?: Node<unknown>[];
}

/**
 * Popover slot receives overlay positioning props
 */
export interface SelectPopoverSlotProps extends React.HTMLAttributes<HTMLElement> {
  /** Ref to the popover element */
  readonly ref?: React.RefObject<HTMLElement>;
  /** Whether the popover is open */
  readonly isOpen: boolean;
  /** Handler to close the popover (called by overlay dismiss events) */
  readonly onClose?: () => void;
}

/**
 * List slot must implement ListBox interface
 */
export interface SelectListSlotProps extends Omit<ListBoxProps<unknown>, 'children' | 'items'> {
  /** Props from useSelect for the menu/listbox */
  readonly menuProps: React.HTMLAttributes<HTMLElement>;
}

/**
 * Slot type map for Select component.
 * Provides type safety for custom slot components.
 * @public
 */
export type SelectSlots = {
  trigger: SelectTriggerSlotProps;
  label: React.HTMLAttributes<HTMLLabelElement>;
  'trigger.value': SelectValueSlotProps;
  value: SelectValueSlotProps;
  popover: SelectPopoverSlotProps;
  listbox: SelectListSlotProps;
  description: React.HTMLAttributes<HTMLElement>;
  error: React.HTMLAttributes<HTMLElement>;
  /** @deprecated Use 'error' instead. Legacy alias for backwards compatibility. */
  errorMessage: React.HTMLAttributes<HTMLElement>;
};

/**
 * Helper to extract slot prop types (inspired by MUI's PropsFromSlot).
 * @template S The slot name
 * @public
 */
export type PropsFromSelectSlot<S extends keyof SelectSlots> = SelectSlots[S];

/**
 * Base props shared between single and multiple selection modes
 * @interface BaseSelectProps
 * @template T The type of items in the select
 */
interface BaseSelectProps<T>
  extends Omit<AriaSelectProps<T>, 'children' | 'selectionMode' | 'value' | 'defaultValue' | 'onValueChange'>,
    Slots {
  /** Children of the Select component (items/collection must stay here for React Aria) */
  readonly children?: ReactNode;
  /** CSS className for the root container */
  readonly className?: string;
  /**
   * Position of the popover relative to the trigger.
   * @default 'bottom start'
   */
  readonly placement?: Placement;
  /**
   * Distance in pixels between the trigger and popover along the main axis.
   * @default 4
   */
  readonly offset?: number;
  /**
   * Additional offset along the cross axis in pixels.
   * Use positive values to shift right/down, negative to shift left/up.
   * @default 0
   */
  readonly crossOffset?: number;
  /**
   * Whether the popover should automatically flip when there is insufficient space.
   * @default true
   */
  readonly shouldFlip?: boolean;
  /**
   * Minimum padding required between the popover and the viewport edge in pixels.
   * @default 12
   */
  readonly containerPadding?: number;
  /**
   * Optional state object from useSelectState hook.
   * If provided, the Select operates in fully controlled mode.
   * If not provided, Select manages state internally.
   *
   * Note: Collection building happens internally via CollectionBuilder.
   * This prop is for advanced use cases where external state management is needed.
   *
   * @example
   * ```typescript
   * const state = useSelectState({ defaultSelectedKey: 'option1', collection });
   * <Select state={state}>
   *   <SelectOption value="option1">Option 1</SelectOption>
   * </Select>
   * ```
   */
  readonly state?: SelectState<object>;
}

/**
 * Props for single selection mode
 * @interface SingleSelectProps
 * @template T The type of items in the select
 */
export interface SingleSelectProps<T> extends BaseSelectProps<T> {
  /** Selection mode for single selection */
  readonly selectionMode?: 'single';
  /** Controlled value (user-friendly API that maps to selectedKey) */
  readonly value?: Key;
  /** Uncontrolled default value (user-friendly API that maps to defaultSelectedKey) */
  readonly defaultValue?: Key;
  /** Callback when value changes (user-friendly API that maps to onSelectionChange) */
  readonly onValueChange?: (value: Key) => void;
}

/**
 * Props for multiple selection mode
 * @interface MultipleSelectProps
 * @template T The type of items in the select
 */
export interface MultipleSelectProps<T> extends BaseSelectProps<T> {
  /** Selection mode for multiple selection */
  readonly selectionMode: 'multiple';
  /** Controlled value (user-friendly API that maps to selectedKeys) */
  readonly value?: Set<Key>;
  /** Uncontrolled default value (user-friendly API that maps to defaultSelectedKeys) */
  readonly defaultValue?: Set<Key>;
  /** Callback when value changes (user-friendly API that maps to onSelectionChange) */
  readonly onValueChange?: (value: Set<Key>) => void;
}

/**
 * Props for the Select component.
 * Union type that supports both single and multiple selection modes.
 * @template T The type of items in the select
 */
export type SelectProps<T> = SingleSelectProps<T> | MultipleSelectProps<T>;

/**
 * Root Select component that builds collection and applies props to slotted children.
 * This component uses slot-based composition where it finds children by `slot` attribute
 * and applies appropriate props using `cloneElement`. Users can bring custom components
 * (Button, Popover, ListBox, etc.) for maximum flexibility.
 *
 * **Architecture:**
 * Select is a coordinator component that manages:
 * - Collection building (via CollectionBuilder)
 * - Selection state (via useSelectState)
 * - Overlay positioning
 * - Keyboard navigation
 *
 * For most use cases, Select manages state internally.
 * For advanced control, use the `state` prop with `useSelectState`.
 *
 * @component
 * @template T The type of items in the select
 * @example
 * ```tsx
 * // Single select (internal state)
 * <Select value={value} onValueChange={setValue} name="fruit">
 *   <Button slot="trigger">
 *     <Text slot="value" placeholder="Select a fruit" />
 *   </Button>
 *   <Popover slot="popover">
 *     <ListBox slot="listbox">
 *       <ListBoxItem id="apple">Apple</ListBoxItem>
 *       <ListBoxItem id="orange">Orange</ListBoxItem>
 *     </ListBox>
 *   </Popover>
 * </Select>
 *
 * // Multiple select (internal state)
 * <Select selectionMode="multiple" value={values} onValueChange={setValues} name="fruits">
 *   <Button slot="trigger">
 *     <Text slot="value" placeholder="Select fruits" />
 *   </Button>
 *   <Popover slot="popover">
 *     <ListBox slot="listbox">
 *       <ListBoxItem id="apple">Apple</ListBoxItem>
 *       <ListBoxItem id="orange">Orange</ListBoxItem>
 *     </ListBox>
 *   </Popover>
 * </Select>
 * ```
 * @public
 */
export const Select = withSlots('BentoSelect', function Select<T>(args: SelectProps<T>) {
  return (
    <CollectionBuilder content={args.children}>
      {function buildCollection(collection: unknown) {
        return <SelectInner props={args as unknown as SelectProps<object>} collection={collection} />;
      }}
    </CollectionBuilder>
  );
});

/**
 * Props for the SelectInner component.
 * Contains the processed Select props and the built collection from React Aria's CollectionBuilder.
 * @interface SelectInnerProps
 * @internal
 */
interface SelectInnerProps {
  /** The processed Select component props */
  readonly props: SelectProps<object>;
  /** The built collection from React Aria's CollectionBuilder */
  readonly collection: unknown;
}

/**
 * Internal Select component that manages state and rendering after collection is built.
 * This component follows the architectural principle with a three-tier state strategy:
 * 1. If explicit state prop provided: Use it (hook owns state) ✅
 * 2. Otherwise: Use internal state for convenience (coordinator pattern)
 *
 * Flow:
 * 1. Processes props via useProps
 * 2. Maps user-facing API (value/defaultValue) to React Aria API (selectedKey/selectedKeys)
 * 3. Uses provided state or creates internal state with useSelectState
 * 4. Sets up overlay positioning and interactions
 * 5. Distributes props to slotted children through Container
 *
 * @param {SelectInnerProps} props - Props containing processed Select props and built collection
 * @returns {React.ReactElement} Complete Select with context provider and optional hidden select for form submission
 * @internal
 */
const SelectInner: React.FC<SelectInnerProps> = function SelectInner({ props, collection }) {
  const { props: processedProps } = useProps(props);
  const originalCollection = collection as AriaCollectionType<Node<object>> | undefined;

  //
  // Map user-friendly API (value, defaultValue, onValueChange) to React Aria's internal API
  // (selectedKey/selectedKeys, defaultSelectedKey/defaultSelectedKeys, onSelectionChange)
  // based on selection mode. This provides a more intuitive API for users while maintaining
  // compatibility with React Aria's collection hooks.
  //
  const isMultiple = processedProps.selectionMode === 'multiple';
  const ariaProps = {
    ...processedProps,
    // Map based on selection mode:
    // - Single mode: value → selectedKey (single Key)
    // - Multiple mode: value → selectedKeys (Set<Key>)
    ...(isMultiple
      ? {
          selectedKeys: processedProps.value ?? processedProps.selectedKeys,
          defaultSelectedKeys: processedProps.defaultValue ?? processedProps.defaultSelectedKeys,
          onSelectionChange: processedProps.onValueChange ?? processedProps.onSelectionChange
        }
      : {
          selectedKey: processedProps.value ?? processedProps.selectedKey,
          defaultSelectedKey: processedProps.defaultValue ?? processedProps.defaultSelectedKey,
          onSelectionChange: processedProps.onValueChange ?? processedProps.onSelectionChange
        }),
    collection: originalCollection,
    // Set children to undefined to prevent React Aria from trying to rebuild the collection
    // (collection is already built by CollectionBuilder in the parent component)
    children: undefined
  };

  //
  // State management follows architectural principle:
  // 1. If explicit state prop provided: Use it (hook owns state) ✅
  // 2. Otherwise: Use internal state for convenience (coordinator pattern)
  //
  // This provides flexibility while maintaining backward compatibility.
  //
  const internalState = useSelectState(ariaProps as any);
  const state = processedProps.state || internalState;

  //
  // Refs for DOM elements that need to be referenced by React Aria hooks.
  // These enable proper focus management, overlay positioning, and keyboard interactions.
  //
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  //
  // Get all necessary props from React Aria's useSelect hook.
  // This hook handles ARIA attributes, keyboard interactions, and accessibility compliance.
  //
  const { labelProps, triggerProps, valueProps, menuProps, descriptionProps, errorMessageProps, hiddenSelectProps } =
    useSelect(ariaProps, state, triggerRef);

  //
  // Handler for overlay dismiss events (Escape key, outside clicks, etc.).
  // This callback is passed to slotted popover components via Bento's slot context,
  // allowing them to trigger overlay closure without direct coupling to Select.
  //
  const handleOverlayClose = React.useCallback(
    function handleOverlayClose() {
      state.close();
    },
    [state]
  );

  //
  // Set up overlay behavior (dismissal on Escape, outside clicks, etc.).
  // useOverlay manages overlay dismiss interactions and provides props for the popover.
  //
  const { overlayProps } = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: handleOverlayClose,
      isDismissable: true
    },
    popoverRef
  );

  //
  // Calculate overlay positioning based on trigger and popover refs.
  // useOverlayPosition handles automatic placement, flipping when space is limited,
  // and collision detection with viewport edges. Uses customizable positioning props
  // with sensible defaults for common use cases.
  //
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef: popoverRef,
    placement: processedProps.placement ?? 'bottom start',
    offset: processedProps.offset ?? 4,
    crossOffset: processedProps.crossOffset,
    shouldFlip: processedProps.shouldFlip ?? true,
    containerPadding: processedProps.containerPadding ?? 12,
    isOpen: state.isOpen
  });

  //
  // Track focus and hover states for visual feedback and styling.
  // These hooks provide interaction states that are exposed via data attributes.
  //
  const { focusProps, isFocused, isFocusVisible } = useFocusRing();
  const { hoverProps, isHovered } = useHover({ isDisabled: processedProps.isDisabled });

  //
  // Prevent page scrolling when the select is open to maintain focus on the overlay.
  // This improves UX by keeping the select options in view during interaction.
  //
  usePreventScroll({ isDisabled: !state.isOpen });

  //
  // Retrieve selected item(s) from the collection for display in value slots.
  // Single mode: returns the selected Node or null
  // Multiple mode: returns array of selected Nodes
  //
  const selectedItem = state.selectedKey != null ? state.collection.getItem(state.selectedKey) : null;
  const selectedItems = isMultiple
    ? Array.from(state.selectionManager.selectedKeys)
        .map((key) => state.collection.getItem(key))
        .filter((item): item is Node<object> => item != null)
    : [];

  //
  // Merge trigger props from useSelect with focus and hover interaction props.
  // This combines accessibility attributes, keyboard handlers, and interaction states.
  //
  const buttonProps = mergeProps(triggerProps, focusProps, hoverProps);

  //
  // Normalize required prop to handle both HTML 'required' attribute and React Aria 'isRequired' prop.
  // This ensures form validation works correctly regardless of which prop the user provides.
  //
  const isRequired = (processedProps as any).required || processedProps.isRequired;

  //
  // Compose final trigger props with all necessary ARIA attributes and interaction handlers.
  // Ensures proper accessibility compliance by:
  // - Setting role="combobox" for screen reader compatibility
  // - Providing explicit aria-expanded state (boolean as string for consistency)
  // - Handling aria-invalid, aria-disabled, aria-required states
  // - Respecting user's aria-labelledby if explicitly provided (overrides React Aria's auto-concatenation)
  //
  const finalTriggerProps = {
    ...buttonProps,
    role: buttonProps.role || 'combobox',
    'aria-expanded': state.isOpen ? 'true' : 'false',
    'aria-invalid': processedProps.isInvalid ? 'true' : buttonProps['aria-invalid'],
    'aria-disabled': processedProps.isDisabled ? 'true' : buttonProps['aria-disabled'],
    'aria-required': isRequired ? 'true' : buttonProps['aria-required'],
    'data-open': state.isOpen ? 'true' : 'false',
    // If user explicitly provides aria-labelledby, use it exactly as provided.
    // This overrides React Aria's automatic ID concatenation behavior.
    ...(processedProps['aria-labelledby'] && { 'aria-labelledby': processedProps['aria-labelledby'] }),
    ref: triggerRef
  };

  //
  // Render the complete Select component structure:
  // 1. Wrap in ListStateContext.Provider to share state with ListBox children
  // 2. Use Container with slots to distribute props to slotted children
  // 3. Apply data attributes for styling hooks and state indication
  // 4. Optionally render hidden select element for native form submission
  //
  return (
    <ListStateContext.Provider value={state as any}>
      <Container
        className={processedProps.className}
        {...useDataAttributes({
          open: state.isOpen ? 'true' : 'false',
          disabled: processedProps.isDisabled ? 'true' : 'false',
          invalid: processedProps.isInvalid ? 'true' : 'false',
          required: processedProps.isRequired ? 'true' : 'false',
          focused: isFocused ? 'true' : 'false',
          'focus-visible': isFocusVisible ? 'true' : 'false',
          hovered: isHovered ? 'true' : 'false'
        })}
        slots={{
          // Trigger slot: receives all button props, accessibility attributes, and ref
          trigger: { ...finalTriggerProps, slot: 'trigger' },
          // Label slot: receives props for associating label with trigger
          label: { ...labelProps, as: 'label', slot: 'label' },
          // Value slots: support both nested (trigger.value) and standalone (value) placement
          // Receives selected item data and placeholder for display purposes
          'trigger.value': {
            ...valueProps,
            selectedItem,
            selectedItems,
            placeholder: processedProps.placeholder,
            slot: 'value'
          },
          value: {
            ...valueProps,
            selectedItem,
            selectedItems,
            placeholder: processedProps.placeholder,
            slot: 'value'
          },
          // Popover slot: receives overlay positioning, dismiss handlers, and open state
          // onClose must come AFTER spreads to ensure it's not overridden
          popover: {
            isOpen: state.isOpen,
            ref: popoverRef,
            slot: 'popover',
            ...overlayProps,
            ...positionProps,
            onClose: handleOverlayClose // Must come AFTER spreads to avoid being overridden
          },
          // ListBox slot: receives menu props for keyboard navigation and selection
          listbox: { ...menuProps, ref: listRef, slot: 'listbox' },
          // Description and error message slots for accessible help text
          description: { ...descriptionProps, slot: 'description' },
          error: { ...errorMessageProps, slot: 'error' },
          errorMessage: { ...errorMessageProps, slot: 'errorMessage' } // Legacy alias for backwards compatibility
        }}
      >
        {processedProps.children}
      </Container>
      {/*
        Hidden select for native form submission and autofill compatibility.
        Only rendered when 'name' prop is provided. React Aria's HiddenSelect
        handles SSR properly and syncs with the Select state automatically.
      */}
      {processedProps.name && (
        <HiddenSelect
          {...hiddenSelectProps}
          state={state}
          triggerRef={triggerRef}
          {...(processedProps.label && { label: processedProps.label })}
        />
      )}
    </ListStateContext.Provider>
  );
};
