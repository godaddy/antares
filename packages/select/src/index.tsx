import React, { useRef, ReactNode, useMemo, useState, useCallback } from 'react';
import { useSelect, HiddenSelect, useFocusRing, useHover, usePopover, mergeProps } from 'react-aria';
import type { Placement } from 'react-aria';
import { useSelectState } from 'react-stately';
import type { ListState } from 'react-stately';
import { AriaSelectProps } from '@react-types/select';
import { CollectionBuilder } from '@react-aria/collections';
import type { Node, Collection } from '@react-types/shared';
import { filterDOMProps, useResizeObserver } from '@react-aria/utils';
import { useProps } from '@bento/use-props';
import { useDataAttributes } from '@bento/use-data-attributes';
import { withSlots, Slots } from '@bento/slots';
import { Container } from '@bento/container';
import { ListStateContext } from '@bento/listbox';

export type SelectionMode = 'single' | 'multiple';

/**
 * Render props passed to render functions (e.g., renderEmptyState).
 * Provides access to selection state and collection information.
 * @public
 */
export interface SelectRenderProps {
  /** Whether the select is currently open */
  readonly isOpen: boolean;
  /** Whether the select is focused, either via a mouse or keyboard */
  readonly isFocused: boolean;
  /** Whether the select is keyboard focused */
  readonly isFocusVisible: boolean;
  /** Whether the select is disabled */
  readonly isDisabled: boolean;
  /** Whether the select is in an invalid state */
  readonly isInvalid: boolean;
  /** Whether the select is required */
  readonly isRequired: boolean;
}

export interface SelectTriggerSlotProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly ref?: React.RefObject<HTMLButtonElement>;
}

export interface SelectValueSlotProps extends React.HTMLAttributes<HTMLElement> {
  readonly placeholder?: string;
  /**
   * First selected item node from React Aria SelectState.
   * For dynamic collections (items prop), `selectedItem?.value` is the original item object.
   */
  readonly selectedItem?: Node<unknown> | null;
  /**
   * All selected item nodes from React Aria SelectState.
   * For dynamic collections (items prop), `selectedItems[i].value` is the original item object.
   */
  readonly selectedItems?: Node<unknown>[];
}

export interface SelectPopoverSlotProps extends React.HTMLAttributes<HTMLElement> {
  readonly ref?: React.RefObject<HTMLElement>;
  readonly isOpen: boolean;
  readonly onClose?: () => void;
  readonly style?: React.CSSProperties;
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
 * @template T The type of items in the select
 * @template M The selection mode ('single' | 'multiple')
 */
export interface SelectProps<T, M extends SelectionMode = 'single'>
  extends Omit<AriaSelectProps<T, M>, 'children' | 'placeholder' | 'items'>,
    Omit<React.ComponentProps<'div'>, keyof AriaSelectProps<T, M> | 'children'>,
    Slots {
  /**
   * Render function or element to display when the collection is empty.
   */
  readonly renderEmptyState?: ((props: SelectRenderProps) => ReactNode) | ReactNode;
  /**
   * Position of the popover relative to the trigger.
   * @default 'bottom start'
   */
  readonly placement?: Placement;
  /** Distance in pixels between the trigger and popover along the main axis. */
  readonly offset?: number;
  /** Additional offset along the cross axis in pixels. */
  readonly crossOffset?: number;
  /** Whether the popover should automatically flip when there is insufficient space. */
  readonly shouldFlip?: boolean;
  /** Minimum padding required between the popover and the viewport edge in pixels. */
  readonly containerPadding?: number;
  /**
   * Whether the popover should automatically match the trigger width.
   * When true, sets a CSS variable `--trigger-width` on the popover.
   * @default false
   */
  readonly matchTriggerWidth?: boolean;
  /** Slot components and ListBox with collection */
  readonly children?: ReactNode | ((props: SelectRenderProps) => ReactNode);
}

/**
 * Root Select component that coordinates overlay, state, and form integration.
 * This component uses slot-based composition where it finds children by `slot` attribute
 * and applies appropriate props using `cloneElement`. Users can bring custom components
 * (Button, Popover, ListBox, etc.) for maximum flexibility.
 *
 * **Architecture:**
 * Select is a coordinator component that manages:
 * - Selection state (via useSelectState)
 * - Overlay positioning
 * - Form integration
 * - Keyboard navigation coordination
 *
 * ListBox handles its own collection building and rendering.
 *
 * Select always manages state internally.
 * For external control, use props: `value`/`onChange` (controlled).
 *
 * @component
 * @template T The type of items in the select
 * @example
 * ```tsx
 * // Single select (controlled)
 * <Select value={selectedKey} onChange={setSelectedKey} name="fruit">
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
 * // Multiple select (controlled)
 * <Select selectionMode="multiple" value={selectedKeys} onChange={setSelectedKeys} name="fruits">
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
 *
 * // Dynamic collection
 * <Select value={selectedKey} onChange={setSelectedKey}>
 *   <Button slot="trigger">
 *     <Text slot="value" placeholder="Select a fruit" />
 *   </Button>
 *   <Popover slot="popover">
 *     <ListBox slot="listbox" items={fruits}>
 *       {(fruit) => <ListBoxItem id={fruit.id}>{fruit.name}</ListBoxItem>}
 *     </ListBox>
 *   </Popover>
 * </Select>
 * ```
 * @public
 */
export const Select = withSlots('BentoSelect', function Select<
  T,
  M extends SelectionMode = 'single'
>(props: SelectProps<T, M>, forwardedRef?: React.Ref<HTMLDivElement>) {
  const { isDisabled = false, isInvalid = false, isRequired = false } = props;

  // Resolve children if it's a render function
  const content = useMemo(
    () =>
      typeof props.children === 'function'
        ? props.children({
            isOpen: false,
            isFocused: false,
            isFocusVisible: false,
            isDisabled,
            isInvalid,
            isRequired
          })
        : props.children,
    [props.children, isDisabled, isInvalid, isRequired]
  );

  return (
    <CollectionBuilder content={content}>
      {(collection) => (
        <SelectInner props={props} collection={collection as Collection<Node<object>>} forwardedRef={forwardedRef} />
      )}
    </CollectionBuilder>
  );
});

interface SelectInnerProps {
  props: SelectProps<any, SelectionMode>;
  collection: Collection<Node<object>>;
  forwardedRef?: React.Ref<HTMLDivElement>;
}

function SelectInner({ props, collection, forwardedRef }: SelectInnerProps) {
  const { props: processedProps, ref: mergedRef } = useProps(props, {}, forwardedRef ?? null);

  const state = useSelectState({
    ...processedProps,
    collection,
    children: undefined,
    // Support validationBehavior if provided (from FormContext or props)
    validationBehavior: processedProps.validationBehavior
  } as unknown as AriaSelectProps<object>);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const listBoxRef = useRef<HTMLDivElement>(null);

  // Track trigger width for matching popover width
  const [triggerWidth, setTriggerWidth] = useState<string | null>(null);
  const onResize = useCallback(
    function onResizeCallback() {
      if (triggerRef.current && processedProps.matchTriggerWidth) {
        setTriggerWidth(triggerRef.current.offsetWidth + 'px');
      }
    },
    [processedProps.matchTriggerWidth]
  );

  useResizeObserver({
    ref: triggerRef,
    onResize
  });

  // Check if we need a label for accessibility
  const needsLabel = !processedProps['aria-label'] && !processedProps['aria-labelledby'];
  const label = needsLabel ? processedProps.label : undefined;

  const {
    labelProps,
    triggerProps,
    valueProps,
    menuProps,
    descriptionProps,
    errorMessageProps,
    hiddenSelectProps,
    isInvalid
  } = useSelect(
    {
      ...processedProps,
      label
    } as unknown as AriaSelectProps<object>,
    state,
    triggerRef
  );

  const { popoverProps } = usePopover(
    {
      triggerRef,
      popoverRef,
      placement: processedProps.placement ?? 'bottom start',
      offset: processedProps.offset,
      crossOffset: processedProps.crossOffset,
      shouldFlip: processedProps.shouldFlip ?? true,
      containerPadding: processedProps.containerPadding ?? 12,
      isNonModal: true
    },
    state
  );

  const { focusProps, isFocusVisible } = useFocusRing({ within: true });
  const { hoverProps, isHovered } = useHover({ isDisabled: processedProps.isDisabled });

  const selectedItem = state.selectedItem as Node<object> | null;
  const selectedItems = state.selectedItems as Node<object>[];
  const isEmpty = state.collection.size === 0;

  // Memoize slots to prevent unnecessary re-renders
  const slots = useMemo(
    () => ({
      trigger: {
        ...mergeProps(triggerProps, focusProps, hoverProps),
        ref: triggerRef,
        slot: 'trigger'
      },
      label: { ...labelProps, slot: 'label' },
      value: {
        ...valueProps,
        selectedItem,
        selectedItems,
        slot: 'value'
      },
      'trigger.value': {
        ...valueProps,
        selectedItem,
        selectedItems,
        slot: 'value'
      },
      popover: {
        ...popoverProps,
        isOpen: state.isOpen,
        ref: popoverRef,
        slot: 'popover',
        ...(state.isOpen && { 'data-open': true }),
        onClose: state.close,
        ...(triggerWidth && {
          style: {
            '--trigger-width': triggerWidth,
            ...popoverProps.style
          } as React.CSSProperties
        })
      },
      listbox: { ...menuProps, ref: listBoxRef, slot: 'listbox' },
      description: { ...descriptionProps, slot: 'description' },
      error: { ...errorMessageProps, slot: 'error' }
    }),
    [
      triggerProps,
      focusProps,
      hoverProps,
      labelProps,
      valueProps,
      selectedItem,
      selectedItems,
      popoverProps,
      state.isOpen,
      state.close,
      menuProps,
      descriptionProps,
      errorMessageProps,
      triggerWidth
    ]
  );

  const renderProps: SelectRenderProps = useMemo(
    () => ({
      isOpen: state.isOpen,
      isFocused: state.isFocused,
      isFocusVisible,
      isDisabled: processedProps.isDisabled || false,
      isInvalid: isInvalid || false,
      isRequired: processedProps.isRequired || false
    }),
    [state.isOpen, state.isFocused, isFocusVisible, processedProps.isDisabled, isInvalid, processedProps.isRequired]
  );

  const emptyStateContent =
    isEmpty && props.renderEmptyState
      ? typeof props.renderEmptyState === 'function'
        ? props.renderEmptyState(renderProps)
        : props.renderEmptyState
      : null;

  // Extract DOM props (data-*, aria-*, etc) to apply to root element
  const DOMProps = filterDOMProps(processedProps);

  return (
    <ListStateContext.Provider value={state as ListState<unknown>}>
      <Container
        ref={mergedRef}
        {...DOMProps}
        className={processedProps.className}
        {...useDataAttributes({
          open: state.isOpen,
          disabled: processedProps.isDisabled,
          invalid: isInvalid,
          required: processedProps.isRequired,
          focused: state.isFocused,
          'focus-visible': isFocusVisible,
          hovered: isHovered,
          empty: isEmpty
        })}
        slots={slots}
      >
        {emptyStateContent || processedProps.children}
      </Container>
      {processedProps.name && (
        <HiddenSelect {...hiddenSelectProps} state={state} triggerRef={triggerRef} label={processedProps.label} />
      )}
    </ListStateContext.Provider>
  );
}

// Re-export hooks and state management
export { useSelectState } from 'react-stately';
export type { SelectState } from 'react-stately';

// Re-export Placement type
export type { Placement };
