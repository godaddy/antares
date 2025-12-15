import React, { useRef, ReactNode } from 'react';
import { useSelect, HiddenSelect, useFocusRing, useHover, usePopover, mergeProps } from 'react-aria';
import type { Placement } from 'react-aria';
import { useSelectState } from 'react-stately';
import type { ListState } from 'react-stately';
import { AriaSelectProps } from '@react-types/select';
import { CollectionBuilder, Collection as AriaCollection } from '@react-aria/collections';
import { Node, Collection as AriaCollectionType } from '@react-types/shared';
import { useProps } from '@bento/use-props';
import { useDataAttributes } from '@bento/use-data-attributes';
import { withSlots, Slots } from '@bento/slots';
import { Container } from '@bento/container';
import { ListStateContext } from '@bento/listbox';
import { BentoError } from '@bento/error';

export type SelectionMode = 'single' | 'multiple';

/**
 * Render props passed to render functions (e.g., renderEmptyState).
 * Provides access to selection state and collection information.
 * @public
 */
export interface SelectRenderProps {
  /** Whether the select is currently open */
  readonly isOpen: boolean;
  /** Whether the select is disabled */
  readonly isDisabled?: boolean;
  /** Whether the select is in an invalid state */
  readonly isInvalid?: boolean;
  /** Whether the select is required */
  readonly isRequired?: boolean;
  /** The currently selected item (single selection mode) */
  readonly selectedItem: Node<unknown> | null;
  /** All selected items (multiple selection mode) */
  readonly selectedItems: Node<unknown>[];
  /** Whether the collection is empty */
  readonly isEmpty: boolean;
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
 * Base props shared between static and dynamic Select configurations.
 * @template T The type of items in the select
 * @template M The selection mode ('single' | 'multiple')
 */
interface SelectBaseProps<T, M extends SelectionMode = 'single'>
  extends Omit<AriaSelectProps<T, M>, 'children' | 'placeholder' | 'items'>,
    Omit<React.ComponentProps<'div'>, keyof AriaSelectProps<T, M> | 'children'>,
    Slots {
  /**
   * Render function or element to display when the collection is empty.
   * Called with render props containing selection state and collection info.
   * @example
   * ```tsx
   * <Select renderEmptyState={() => <div>No options available</div>}>
   *   <ListBox slot="listbox" />
   * </Select>
   * ```
   */
  readonly renderEmptyState?: ((props: SelectRenderProps) => ReactNode) | ReactNode;
  /**
   * Position of the popover relative to the trigger.
   * @default 'bottom start'
   */
  readonly placement?: Placement;
  /**
   * Distance in pixels between the trigger and popover along the main axis.
   * @default 0
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
 * Props for Select with static collection (ListBoxItem children).
 * @template T The type of items in the select
 * @template M The selection mode ('single' | 'multiple')
 */
export interface SelectStaticProps<T, M extends SelectionMode = 'single'> extends SelectBaseProps<T, M> {
  /** Static children containing slot components and ListBoxItem elements */
  readonly children?: ReactNode;
  readonly items?: never;
  readonly renderItem?: never;
}

/**
 * Props for Select with dynamic collection (items array).
 * @template T The type of items in the select
 * @template M The selection mode ('single' | 'multiple')
 */
export interface SelectDynamicProps<T, M extends SelectionMode = 'single'> extends SelectBaseProps<T, M> {
  /** Array of items to render in the select */
  readonly items: Iterable<T>;
  /**
   * Render function for each item in the collection.
   * Receives the item and should return a ListBoxItem element.
   * @example
   * ```tsx
   * <Select
   *   items={fruits}
   *   renderItem={(fruit) => <ListBoxItem id={fruit.id}>{fruit.name}</ListBoxItem>}
   * >
   *   <Button slot="trigger">...</Button>
   *   <Popover slot="popover">
   *     <ListBox slot="listbox" />
   *   </Popover>
   * </Select>
   * ```
   */
  readonly renderItem: (item: T) => ReactNode;
  /** Slot components (Button, Popover, ListBox) - ListBox slot is presentational only for dynamic collections */
  readonly children?: ReactNode;
}

/**
 * Props for the Select component.
 * Supports both static collections (ListBoxItem children) and dynamic collections (items + renderItem).
 * @template T The type of items in the select
 * @template M The selection mode ('single' | 'multiple')
 */
export type SelectProps<T, M extends SelectionMode = 'single'> = SelectStaticProps<T, M> | SelectDynamicProps<T, M>;

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
 * ```
 * @public
 */
export const Select = withSlots('BentoSelect', function Select<
  T,
  M extends SelectionMode = 'single'
>(args: SelectProps<T, M>, forwardedRef?: React.Ref<HTMLDivElement>) {
  // Type cast: Erase generic type T to 'any' since SelectInner only works with keys and nodes.
  // React Aria's collection system handles type-specific items internally.
  const restArgs = args as any;

  // For dynamic collections (items prop), use CollectionBuilder with AriaCollection
  // to properly process the render function + items into a collection.
  // This matches how ListBox handles dynamic collections.
  if ('items' in restArgs && restArgs.items != null) {
    const renderFunc = restArgs.renderItem;

    // Error if renderItem is not provided
    if (!renderFunc) {
      throw new BentoError({
        name: 'select',
        method: 'Select',
        message:
          'When using `items` prop, you must provide a `renderItem` function. ' +
          'Example: <Select items={items} renderItem={(item) => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>}>'
      });
    }

    // Create collection props for AriaCollection
    const collectionProps = {
      items: restArgs.items,
      children: renderFunc
    };
    return (
      <CollectionBuilder
        content={
          // Type cast: AriaCollection requires specific type shape but we handle generic T
          <AriaCollection {...(collectionProps as unknown as Parameters<typeof AriaCollection>[0])} />
        }
      >
        {function buildCollection(collection: unknown) {
          return (
            <SelectInner
              // Type cast: Erase specific item type T to object for internal processing
              props={restArgs as unknown as SelectProps<object, SelectionMode>}
              collection={collection}
              forwardedRef={forwardedRef}
            />
          );
        }}
      </CollectionBuilder>
    );
  }

  // For static collections, use CollectionBuilder to process ListBoxItem elements
  return (
    <CollectionBuilder content={restArgs.children}>
      {function buildCollection(collection: unknown) {
        return (
          <SelectInner
            // Type cast: Erase specific item type T to object for internal processing
            props={restArgs as unknown as SelectProps<object, SelectionMode>}
            collection={collection}
            forwardedRef={forwardedRef}
          />
        );
      }}
    </CollectionBuilder>
  );
});

interface SelectInnerProps {
  readonly props: SelectProps<object, SelectionMode>;
  readonly collection: unknown;
  readonly forwardedRef?: React.Ref<HTMLDivElement>;
}

/**
 * Internal component that manages Select state and rendering after collection building.
 * Split from Select because CollectionBuilder requires a render callback.
 * @internal
 */
const SelectInner: React.FC<SelectInnerProps> = function SelectInner({ props, collection, forwardedRef }) {
  // Extract renderEmptyState before useProps processes it to avoid render prop corruption
  const originalRenderEmptyState = props.renderEmptyState;

  // Extract merged ref that combines forwardedRef, slot refs, and props.ref
  const { props: processedProps, ref: mergedRef } = useProps(props, {}, forwardedRef);
  const originalCollection = collection as AriaCollectionType<Node<object>> | undefined;

  // Destructure to remove children: CollectionBuilder already processed them in parent.
  // React Aria's useCollection won't rebuild when collection is provided, but children
  // is in the useMemo dependency array, triggering re-renders on every reference change.
  const { children: _, ...propsWithoutChildren } = processedProps;
  // Type cast: Convert processed Bento props to React Aria's AriaSelectProps interface.
  // Collection is pre-built by CollectionBuilder, so we pass it directly to React Aria.
  const ariaProps = {
    ...propsWithoutChildren,
    collection: originalCollection
  } as unknown as AriaSelectProps<object>;

  const state = useSelectState(ariaProps);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { labelProps, triggerProps, valueProps, menuProps, descriptionProps, errorMessageProps, hiddenSelectProps } =
    useSelect(ariaProps, state, triggerRef);

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

  const { focusProps, isFocused, isFocusVisible } = useFocusRing();
  const { hoverProps, isHovered } = useHover({ isDisabled: processedProps.isDisabled });

  // For dynamic collections (items prop), Node.value holds the original item object.
  const selectedItem = state.selectedItem as Node<object> | null;
  // Fallback never executes (React Stately always provides selectedItems), but satisfies TypeScript.
  /* v8 ignore next */
  const selectedItems = (state.selectedItems ?? []) as Node<object>[];

  const isEmpty = state.collection.size === 0;

  // Support both HTML `required` attribute and React Aria `isRequired` prop
  // for maximum compatibility with form libraries and native validation.
  const isRequired = processedProps.required || processedProps.isRequired;

  // React Aria provides aria-haspopup, aria-expanded, and aria-controls via useOverlayTrigger.
  // We add role="combobox" (not provided by React Aria) and augment with aria-required,
  // aria-invalid, aria-disabled. String conversion of aria-expanded enables CSS attribute selectors.
  const finalTriggerProps = React.useMemo(
    () => ({
      ...mergeProps(triggerProps, focusProps, hoverProps),
      role: 'combobox',
      'aria-expanded': state.isOpen ? 'true' : 'false',
      ...(isRequired && { 'aria-required': 'true' }),
      ...(processedProps.isInvalid && { 'aria-invalid': 'true' }),
      ...(processedProps.isDisabled && { 'aria-disabled': 'true' }),
      ...(state.isOpen && { 'data-open': true }),
      // Allow explicit aria-labelledby to override React Aria's auto-concatenation
      // for cases where consumers need precise control over label associations.
      ...(processedProps['aria-labelledby'] && { 'aria-labelledby': processedProps['aria-labelledby'] }),
      ref: triggerRef
    }),
    [
      triggerProps,
      focusProps,
      hoverProps,
      state.isOpen,
      isRequired,
      processedProps.isInvalid,
      processedProps.isDisabled,
      processedProps['aria-labelledby']
    ]
  );

  // Memoize slots object to prevent unnecessary re-renders of slotted children.
  // Slots only need to update when their actual prop values change, not on every render.
  // Manual dependency tracking is necessary for performance - each dependency must be
  // listed explicitly to ensure memoization invalidates only when needed.
  const slots = React.useMemo(
    () => ({
      trigger: { ...finalTriggerProps, slot: 'trigger' },
      label: { ...labelProps, as: 'label', slot: 'label' },
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
        isOpen: state.isOpen,
        ref: popoverRef,
        slot: 'popover',
        ...(state.isOpen && { 'data-open': true }),
        ...popoverProps,
        onClose: state.close
      },
      listbox: { ...menuProps, ref: listRef, slot: 'listbox' },
      description: { ...descriptionProps, slot: 'description' },
      error: { ...errorMessageProps, slot: 'error' }
    }),
    [
      finalTriggerProps,
      labelProps,
      valueProps,
      selectedItem,
      selectedItems,
      state.isOpen,
      state.close,
      popoverProps,
      menuProps,
      descriptionProps,
      errorMessageProps
    ]
  );

  // Required for React Aria's ListBox coordination.
  const renderProps: SelectRenderProps = {
    isOpen: state.isOpen,
    isDisabled: processedProps.isDisabled,
    isInvalid: processedProps.isInvalid,
    isRequired: processedProps.isRequired,
    selectedItem,
    selectedItems,
    isEmpty
  };

  const emptyStateContent =
    isEmpty && originalRenderEmptyState
      ? typeof originalRenderEmptyState === 'function'
        ? originalRenderEmptyState(renderProps)
        : originalRenderEmptyState
      : null;

  return (
    // Type cast: SelectState extends ListState. Context only needs the ListState portion for ListBox coordination.
    <ListStateContext.Provider value={state as ListState<unknown>}>
      <Container
        ref={mergedRef}
        className={processedProps.className}
        {...useDataAttributes({
          open: state.isOpen,
          disabled: processedProps.isDisabled,
          invalid: processedProps.isInvalid,
          required: processedProps.isRequired,
          focused: isFocused,
          'focus-visible': isFocusVisible,
          hovered: isHovered,
          empty: isEmpty
        })}
        slots={slots}
      >
        {emptyStateContent || processedProps.children}
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
