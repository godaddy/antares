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
import { Node, Collection as AriaCollectionType } from '@react-types/shared';
import { useProps } from '@bento/use-props';
import { useDataAttributes } from '@bento/use-data-attributes';
import { withSlots, Slots } from '@bento/slots';
import { Container } from '@bento/container';
import { ListStateContext } from '@bento/listbox';
import type { PressableProps } from '@bento/pressable';

export type SelectionMode = 'single' | 'multiple';

export interface SelectTriggerSlotProps extends PressableProps {
  readonly ref?: React.RefObject<HTMLElement>;
}

export interface SelectValueSlotProps extends React.HTMLAttributes<HTMLElement> {
  readonly placeholder?: string;
  readonly selectedItem?: Node<unknown> | null;
  readonly selectedItems?: Node<unknown>[];
}

export interface SelectPopoverSlotProps extends React.HTMLAttributes<HTMLElement> {
  readonly ref?: React.RefObject<HTMLElement>;
  readonly isOpen: boolean;
  readonly onClose?: () => void;
}

export interface SelectListSlotProps extends React.HTMLAttributes<HTMLElement> {
  readonly ref?: React.RefObject<HTMLElement>;
}

/**
 * Slot type map for Select component.
 * Provides type safety for custom slot components.
 * @public
 */
export type SelectSlots = {
  trigger: SelectTriggerSlotProps;
  label: React.HTMLAttributes<HTMLLabelElement>;
  value: SelectValueSlotProps;
  popover: SelectPopoverSlotProps;
  listbox: SelectListSlotProps;
  description: React.HTMLAttributes<HTMLElement>;
  error: React.HTMLAttributes<HTMLElement>;
};

/**
 * Utility type for extracting slot prop types.
 * Enables type-safe slot component implementations without importing individual interfaces.
 * @template S The slot name
 * @public
 */
export type PropsFromSelectSlot<S extends keyof SelectSlots> = SelectSlots[S];

/**
 * Props for the Select component.
 * Extends React Aria's AriaSelectProps with additional layout and styling props.
 * @template T The type of items in the select
 * @template M The selection mode ('single' | 'multiple')
 */
export interface SelectProps<T, M extends SelectionMode = 'single'>
  extends Omit<AriaSelectProps<T, M>, 'children' | 'placeholder'>,
    Omit<React.ComponentProps<'div'>, keyof AriaSelectProps<T, M> | 'children'>,
    Slots {
  /** Children of the Select component (items/collection must stay here for React Aria) */
  readonly children?: ReactNode;
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
 * Select always manages state internally.
 * For external control, use props: `selectedKey`/`onSelectionChange` (controlled).
 *
 * @component
 * @template T The type of items in the select
 * @example
 * ```tsx
 * // Single select (internal state)
 * <Select selectedKey={selectedKey} onSelectionChange={setSelectedKey} name="fruit">
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
 * <Select selectionMode="multiple" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys} name="fruits">
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
export const Select = withSlots('BentoSelect', function Select<
  T,
  M extends SelectionMode = 'single'
>(args: SelectProps<T, M>) {
  return (
    <CollectionBuilder content={args.children}>
      {function buildCollection(collection: unknown) {
        return <SelectInner props={args as unknown as SelectProps<object, SelectionMode>} collection={collection} />;
      }}
    </CollectionBuilder>
  );
});

/**
 * Internal component props after collection building.
 * @interface SelectInnerProps
 * @internal
 */
interface SelectInnerProps {
  readonly props: SelectProps<object, SelectionMode>;
  readonly collection: unknown;
}

/**
 * SelectInner manages state and DOM rendering after React Aria builds the collection.
 * Split into two components (Select → SelectInner) because CollectionBuilder requires
 * a render function callback, necessitating this architecture for collection processing.
 *
 * State ownership: Select always manages its own state via useSelectState.
 * External control happens via props (selectedKey, onSelectionChange), not context.
 * Select provides state to children (ListBox) via ListStateContext for React Aria orchestration.
 *
 * @param {SelectInnerProps} props - Props containing processed Select props and built collection
 * @returns {React.ReactElement} Complete Select with context provider and optional hidden select for form submission
 * @internal
 */
const SelectInner: React.FC<SelectInnerProps> = function SelectInner({ props, collection }) {
  const { props: processedProps } = useProps(props);
  const originalCollection = collection as AriaCollectionType<Node<object>> | undefined;

  // Set children to undefined because CollectionBuilder already processed them in parent.
  // Passing children here would cause React Aria to rebuild the collection unnecessarily.
  const ariaProps = {
    ...processedProps,
    collection: originalCollection,
    children: undefined
  } as unknown as AriaSelectProps<object>;

  const state = useSelectState(ariaProps);
  const isMultiple = processedProps.selectionMode === 'multiple';

  // React Aria hooks require refs to DOM elements for accessibility features
  // (focus management, overlay positioning, ARIA attribute wiring).
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // useSelect provides all props needed for ARIA-compliant select behavior:
  // labelProps (associates label), triggerProps (button behavior), valueProps (selected display),
  // menuProps (listbox behavior), descriptionProps/errorMessageProps (help text).
  const { labelProps, triggerProps, valueProps, menuProps, descriptionProps, errorMessageProps, hiddenSelectProps } =
    useSelect(ariaProps, state, triggerRef);

  // Expose close handler via slot props to allow custom popover components
  // to dismiss the overlay without tight coupling to Select internals.
  const handleOverlayClose = React.useCallback(
    function handleOverlayClose() {
      state.close();
    },
    [state]
  );

  // useOverlay handles dismiss behavior (Escape key, outside clicks).
  // isDismissable allows users to close by clicking outside the popover.
  // shouldCloseOnBlur is false because Select manages focus differently.
  const { overlayProps } = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: handleOverlayClose,
      isDismissable: true,
      shouldCloseOnBlur: false
    },
    popoverRef
  );

  // useOverlayPosition calculates optimal popover placement relative to trigger,
  // automatically flipping to opposite side when space is limited.
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

  // Expose interaction states via data attributes for CSS styling hooks.
  const { focusProps, isFocused, isFocusVisible } = useFocusRing();
  const { hoverProps, isHovered } = useHover({ isDisabled: processedProps.isDisabled });

  // Prevent body scroll when open to keep options in viewport during keyboard navigation.
  usePreventScroll({ isDisabled: !state.isOpen });

  // Retrieve selected item(s) from collection to pass to value slots for display.
  // Single mode: Uses state.selectedKey to get one Node or null.
  // Multiple mode: Uses selectionManager.selectedKeys to get array of Nodes.
  const selectedItem = state.selectedKey != null ? state.collection.getItem(state.selectedKey) : null;
  const selectedItems = isMultiple
    ? Array.from(state.selectionManager.selectedKeys)
        .map((key) => state.collection.getItem(key))
        .filter((item): item is Node<object> => item != null)
    : [];

  // Combine trigger props from useSelect with interaction states (focus, hover)
  // for complete button behavior and styling hooks.
  const buttonProps = mergeProps(triggerProps, focusProps, hoverProps);

  // Support both HTML `required` attribute and React Aria `isRequired` prop
  // for maximum compatibility with form libraries and native validation.
  const isRequired = processedProps.required || processedProps.isRequired;

  // Compose final trigger props with normalized ARIA attributes.
  // Convert booleans to strings ('true'/'false') for consistency with HTML attributes
  // and to ensure proper styling via attribute selectors like [aria-expanded="true"].
  const finalTriggerProps = {
    ...buttonProps,
    role: buttonProps.role || 'combobox',
    'aria-expanded': state.isOpen ? 'true' : 'false',
    'aria-invalid': processedProps.isInvalid ? 'true' : buttonProps['aria-invalid'],
    'aria-disabled': processedProps.isDisabled ? 'true' : buttonProps['aria-disabled'],
    'aria-required': isRequired ? 'true' : buttonProps['aria-required'],
    'data-open': state.isOpen ? 'true' : 'false',
    // Allow explicit aria-labelledby to override React Aria's auto-concatenation
    // for cases where consumers need precise control over label associations.
    ...(processedProps['aria-labelledby'] && { 'aria-labelledby': processedProps['aria-labelledby'] }),
    ref: triggerRef
  };

  // ListStateContext shares selection state with ListBox/ListBoxItem children,
  // enabling reuse of existing Bento listbox primitives without duplication.
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
          value: {
            ...valueProps,
            selectedItem,
            selectedItems,
            slot: 'value'
          },
          // onClose positioned after spreads to prevent accidental override by consumer props.
          popover: {
            isOpen: state.isOpen,
            ref: popoverRef,
            slot: 'popover',
            'data-open': state.isOpen ? 'true' : 'false',
            ...overlayProps,
            ...positionProps,
            onClose: handleOverlayClose
          },
          listbox: { ...menuProps, ref: listRef, slot: 'listbox' },
          description: { ...descriptionProps, slot: 'description' },
          error: { ...errorMessageProps, slot: 'error' }
        }}
      >
        {processedProps.children}
      </Container>
      {/* HiddenSelect enables form submission and autofill. Only rendered when `name` prop provided. */}
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
