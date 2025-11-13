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
import { useSelectState } from 'react-stately';
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
 * Selection mode for Select component
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
  extends Omit<
      AriaSelectProps<T>,
      | 'children'
      | 'selectedKey'
      | 'defaultSelectedKey'
      | 'onSelectionChange'
      | 'selectedKeys'
      | 'defaultSelectedKeys'
      | 'selectionMode'
      | 'value'
      | 'defaultValue'
      | 'onValueChange'
    >,
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
 * @component
 * @template T The type of items in the select
 * @example
 * ```tsx
 * // Single select
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
 * // Multiple select
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
 * SelectInner - Creates state after collection is built, then applies props to slotted children
 * @internal
 */
interface SelectInnerProps {
  readonly props: SelectProps<object>;
  readonly collection: unknown;
}

const SelectInner: React.FC<SelectInnerProps> = function SelectInner({ props, collection }) {
  const { props: processedProps } = useProps(props);
  const originalCollection = collection as AriaCollectionType<Node<object>> | undefined;

  // Map user-friendly API to React Aria API
  // Handle both single and multiple selection modes
  const isMultiple = processedProps.selectionMode === 'multiple';
  const ariaProps = {
    ...processedProps,
    // Map value/defaultValue/onValueChange based on selection mode
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
    children: undefined
  };

  const state = useSelectState(ariaProps);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { labelProps, triggerProps, valueProps, menuProps, descriptionProps, errorMessageProps, hiddenSelectProps } =
    useSelect(ariaProps, state, triggerRef);

  // Handler for overlay dismiss (called by React Aria on Escape, outside click, etc.)
  const handleOverlayClose = React.useCallback(
    function handleOverlayClose() {
      state.close();
    },
    [state]
  );

  // Overlay positioning for popover
  const { overlayProps } = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: handleOverlayClose,
      isDismissable: true
    },
    popoverRef
  );

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

  // Add focus and hover interactions
  const { focusProps, isFocused, isFocusVisible } = useFocusRing();
  const { hoverProps, isHovered } = useHover({ isDisabled: processedProps.isDisabled });

  // Prevent scroll when open
  usePreventScroll({ isDisabled: !state.isOpen });

  // Get selected item(s) for value slots
  const selectedItem = state.selectedKey != null ? state.collection.getItem(state.selectedKey) : null;
  const selectedItems = isMultiple
    ? Array.from(state.selectionManager.selectedKeys)
        .map((key) => state.collection.getItem(key))
        .filter((item): item is Node<object> => item != null)
    : [];

  // Merge trigger props with focus and hover props
  const buttonProps = mergeProps(triggerProps, focusProps, hoverProps);

  // Handle both `required` (HTML attribute) and `isRequired` (React Aria prop)
  const isRequired = (processedProps as any).required || processedProps.isRequired;

  // Ensure trigger has proper ARIA attributes
  const finalTriggerProps = {
    ...buttonProps,
    role: buttonProps.role || 'combobox',
    'aria-expanded': state.isOpen ? 'true' : 'false',
    'aria-invalid': processedProps.isInvalid ? 'true' : buttonProps['aria-invalid'],
    'aria-disabled': processedProps.isDisabled ? 'true' : buttonProps['aria-disabled'],
    'aria-required': isRequired ? 'true' : buttonProps['aria-required'],
    'data-open': state.isOpen ? 'true' : 'false',
    // If user explicitly provides aria-labelledby, use it exactly as provided
    // This overrides React Aria's automatic ID concatenation
    ...(processedProps['aria-labelledby'] && { 'aria-labelledby': processedProps['aria-labelledby'] }),
    ref: triggerRef
  };

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
          trigger: { ...finalTriggerProps, slot: 'trigger' },
          label: { ...labelProps, as: 'label', slot: 'label' },
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
          popover: {
            isOpen: state.isOpen,
            ref: popoverRef,
            slot: 'popover',
            ...overlayProps,
            ...positionProps,
            onClose: handleOverlayClose // Must come AFTER spreads to avoid being overridden
          },
          listbox: { ...menuProps, ref: listRef, slot: 'listbox' },
          description: { ...descriptionProps, slot: 'description' },
          error: { ...errorMessageProps, slot: 'error' },
          errorMessage: { ...errorMessageProps, slot: 'errorMessage' }
        }}
      >
        {processedProps.children}
      </Container>
      {/* Hidden select for form submission - React Aria's HiddenSelect supports SSR */}
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
