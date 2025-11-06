import React, { createContext, useContext, useRef, ReactNode } from 'react';
import { useSelect, HiddenSelect, useOverlay, useOverlayPosition } from 'react-aria';
import { useSelectState, SelectState } from 'react-stately';
import { AriaSelectProps } from '@react-types/select';
import { CollectionBuilder, Collection as AriaCollection } from '@react-aria/collections';
import { Node, Collection as AriaCollectionType } from '@react-types/shared';
import { useProps } from '@bento/use-props';
import { useDataAttributes } from '@bento/use-data-attributes';
import { withSlots, Slots } from '@bento/slots';
import { Container } from '@bento/container';
import { ListStateContext } from '@bento/listbox';
import type { PressableProps } from '@bento/pressable';
import type { ListBoxProps } from '@bento/listbox';

/**
 * Context value for Select component, providing state and refs.
 * Kept minimal for backwards compatibility, but slot-based composition is preferred.
 * @interface SelectContextValue
 * @internal
 */
interface SelectContextValue {
  /** The select state from useSelectState */
  readonly state: SelectState<unknown>;
  /** Ref to the trigger button element */
  readonly triggerRef: React.RefObject<HTMLButtonElement>;
  /** Ref to the popover/content element */
  readonly popoverRef: React.RefObject<HTMLDivElement>;
}

/**
 * Context for Select component.
 * @internal
 */
const SelectContext = createContext<SelectContextValue | null>(null);

/**
 * Hook to access Select context.
 * @throws {Error} If used outside of a Select component
 * @returns {SelectContextValue} The Select context value
 * @internal
 */
export function useSelectContext(): SelectContextValue {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within a Select root component');
  }
  return context;
}

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
  /** Currently selected item */
  readonly selectedItem?: Node<unknown> | null;
}

/**
 * Popover slot receives overlay positioning props
 */
export interface SelectPopoverSlotProps {
  /** Props from useOverlay */
  readonly overlayProps: React.HTMLAttributes<HTMLElement>;
  /** Props from useOverlayPosition */
  readonly positionProps: React.HTMLAttributes<HTMLElement>;
  /** Ref to the popover element */
  readonly ref?: React.RefObject<HTMLElement>;
  /** Whether the popover is open */
  readonly isOpen: boolean;
}

/**
 * List slot must implement ListBox interface
 */
export interface SelectListSlotProps extends Omit<ListBoxProps<unknown>, 'children' | 'items'> {
  /** Props from useSelect for the menu/listbox */
  readonly menuProps: React.HTMLAttributes<HTMLElement>;
}

/**
 * Render props for dynamic chrome (e.g., conditional error messages).
 * Items/collection must stay in children for React Aria to discover them.
 * @interface SelectRenderProps
 * @template T The type of items in the select
 */
export interface SelectRenderProps<T = unknown> {
  /** Whether the select is open */
  readonly isOpen: boolean;
  /** Whether the select is in an invalid state */
  readonly isInvalid?: boolean;
  /** Whether the select is disabled */
  readonly isDisabled?: boolean;
  /** The select state from useSelectState */
  readonly state: SelectState<T>;
}

/**
 * Slot type map for Select component.
 * Provides type safety for custom slot components.
 * @public
 */
export type SelectSlots = {
  trigger: SelectTriggerSlotProps;
  'trigger.value': SelectValueSlotProps;
  value: SelectValueSlotProps;
  popover: SelectPopoverSlotProps;
  list: SelectListSlotProps;
  listbox: SelectListSlotProps;
  description: React.HTMLAttributes<HTMLElement>;
  errorMessage: React.HTMLAttributes<HTMLElement>;
};

/**
 * Helper to extract slot prop types (inspired by MUI's PropsFromSlot).
 * @template S The slot name
 * @public
 */
export type PropsFromSelectSlot<S extends keyof SelectSlots> = SelectSlots[S];

/**
 * Props for the Select component.
 * @interface SelectProps
 * @template T The type of items in the select
 */
export interface SelectProps<T> extends Omit<AriaSelectProps<T>, 'children'>, Slots {
  /** Children of the Select component (items/collection must stay here for React Aria) */
  readonly children?: ReactNode;
  /** Optional render prop for dynamic chrome (e.g., conditional errors) */
  readonly render?: (props: SelectRenderProps<T>) => ReactNode;
  /** CSS className for the root container */
  readonly className?: string;
}

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
 * <Select value={value} onValueChange={setValue} name="fruit">
 *   <Button slot="trigger">
 *     <Text slot="value" placeholder="Select a fruit" />
 *   </Button>
 *   <Popover slot="popover">
 *     <ListBox slot="list">
 *       <SelectOption value="apple">Apple</SelectOption>
 *       <SelectOption value="orange">Orange</SelectOption>
 *     </ListBox>
 *   </Popover>
 * </Select>
 * ```
 * @public
 */
export const Select = withSlots('BentoSelect', function Select<T>(args: SelectProps<T>) {
  return (
    <CollectionBuilder content={<AriaCollection {...(args as unknown as Parameters<typeof AriaCollection>[0])} />}>
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
  const state = useSelectState({
    ...processedProps,
    collection: originalCollection
  });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const { triggerProps, valueProps, menuProps, descriptionProps, errorMessageProps, hiddenSelectProps } = useSelect(
    processedProps,
    state,
    triggerRef
  );

  // Overlay positioning - Select coordinates this and applies to popover slot
  const { overlayProps } = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: function handleClose() {
        state.close();
      },
      isDismissable: true
    },
    popoverRef
  );
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef: popoverRef,
    placement: 'bottom start',
    offset: 8,
    isOpen: state.isOpen
  });

  // Helper to convert CSSStyleDeclaration or style objects to plain objects
  // Preserves numeric CSS values for React to auto-add units (e.g., top: 123 -> "123px")
  function convertStyleToPlainObject(style: unknown): Record<string, string | number> {
    if (!style || typeof style !== 'object' || Array.isArray(style)) {
      return {};
    }

    // If it's a CSSStyleDeclaration, iterate via indexed access
    if ('cssText' in style && 'length' in style && typeof (style as any).length === 'number') {
      const cssStyle = style as CSSStyleDeclaration;
      const plainObj: Record<string, string | number> = {};
      for (let i = 0; i < cssStyle.length; i++) {
        const prop = cssStyle[i];
        const value = cssStyle.getPropertyValue(prop);
        if (value) {
          plainObj[prop] = value;
        }
      }
      return plainObj;
    }

    // Plain object - copy only enumerable own properties that aren't functions
    const plainObj: Record<string, string | number> = {};
    for (const key in style as Record<string, unknown>) {
      if (Object.hasOwn(style, key)) {
        const value = (style as Record<string, unknown>)[key];
        if (value != null && typeof value !== 'function') {
          plainObj[key] = typeof value === 'number' ? value : String(value);
        }
      }
    }
    return plainObj;
  }

  // Merge overlay and position props with safe style handling
  const overlayStyle = 'style' in overlayProps ? overlayProps.style : undefined;
  const positionStyle = 'style' in positionProps ? positionProps.style : undefined;
  const { style: _omitted1, ...overlayPropsWithoutStyle } = overlayProps;
  const { style: _omitted2, ...positionPropsWithoutStyle } = positionProps;

  // Create a completely plain style object for React
  const createCompletelyPlainStyle = (styles: Record<string, string | number>): Record<string, string | number> => {
    const plain = Object.create(null) as Record<string, string | number>;
    for (const [key, value] of Object.entries(styles)) {
      if (typeof value === 'string' || typeof value === 'number') {
        plain[key] = value;
      }
    }
    return plain;
  };

  const overlayStyleObj = convertStyleToPlainObject(overlayStyle);
  const positionStyleObj = convertStyleToPlainObject(positionStyle);
  const mergedStyleObj = { ...overlayStyleObj, ...positionStyleObj };

  const mergedStyle = Object.keys(mergedStyleObj).length > 0 ? createCompletelyPlainStyle(mergedStyleObj) : undefined;

  const mergedOverlayPropsWithStyle = {
    ...overlayPropsWithoutStyle,
    ...positionPropsWithoutStyle,
    ...(mergedStyle && { style: mergedStyle })
  };

  // Get selected item for value slots
  const selectedItem = state.selectedKey != null ? state.collection.getItem(state.selectedKey) : null;

  // Prepare trigger props with explicit ARIA attributes
  const triggerPropsAsHtml = triggerProps as React.HTMLAttributes<HTMLElement>;
  const finalTriggerProps = {
    ...triggerProps,
    role: triggerPropsAsHtml.role || 'combobox',
    'aria-disabled': processedProps.isDisabled ? true : triggerPropsAsHtml['aria-disabled'],
    'aria-invalid': processedProps.isInvalid ? true : triggerPropsAsHtml['aria-invalid'],
    'aria-required': processedProps.isRequired ? true : triggerPropsAsHtml['aria-required'],
    ref: triggerRef
  };

  // Optional render prop for dynamic chrome (e.g., conditional error messages)
  const dynamic = props.render?.({
    isOpen: state.isOpen,
    isInvalid: processedProps.isInvalid,
    isDisabled: processedProps.isDisabled,
    state: state as SelectState<any>
  });

  return (
    <SelectContext.Provider value={{ state, triggerRef, popoverRef }}>
      <ListStateContext.Provider value={state as any}>
        <Container
          className={processedProps.className}
          {...useDataAttributes({
            open: state.isOpen,
            disabled: processedProps.isDisabled,
            invalid: processedProps.isInvalid,
            required: processedProps.isRequired
          })}
          slots={{
            trigger: finalTriggerProps,
            'trigger.value': {
              ...valueProps,
              selectedItem,
              placeholder: processedProps.placeholder
            },
            value: {
              ...valueProps,
              selectedItem,
              placeholder: processedProps.placeholder
            },
            popover: {
              ...mergedOverlayPropsWithStyle,
              isOpen: state.isOpen,
              ref: popoverRef
            },
            list: { ...menuProps },
            listbox: { ...menuProps },
            description: descriptionProps,
            errorMessage: errorMessageProps
          }}
        >
          {processedProps.children}
        </Container>
        {dynamic}
      </ListStateContext.Provider>
      {processedProps.name && (
        <>
          {/* Use HiddenSelect for client-side rendering only */}
          {typeof window !== 'undefined' && (
            <HiddenSelect
              {...hiddenSelectProps}
              state={state}
              triggerRef={triggerRef}
              {...(processedProps.label && { label: processedProps.label })}
            />
          )}
          {/* Manually create hidden select for SSR compatibility
              HiddenSelect in React Aria may not properly render options in SSR,
              so we create a fallback hidden select with manually rendered options.
              Match React Aria's HiddenSelect implementation exactly.
              Use originalCollection if state.collection is empty in SSR */}
          {typeof window === 'undefined' && (originalCollection || state.collection) && (
            <div
              style={{
                border: 0,
                clip: 'rect(0 0 0 0)',
                clipPath: 'inset(50%)',
                height: '1px',
                margin: '-1px',
                overflow: 'hidden',
                padding: 0,
                position: 'fixed',
                width: '1px',
                whiteSpace: 'nowrap',
                top: 0,
                left: 0
              }}
              aria-hidden="true"
              data-react-aria-prevent-focus="true"
              data-a11y-ignore="aria-hidden-focus"
              data-testid="hidden-select-container"
            >
              <label>
                <select tabIndex={-1} name={processedProps.name} value={String(state.selectedKey ?? '')}>
                  {/* Match React Aria's HiddenSelect implementation exactly
                      Use originalCollection if state.collection is empty in SSR */}
                  {(function renderHiddenSelectOptions() {
                    // In SSR, if we have selectedKey or value, always render at least that option for form submission
                    // This ensures form submission works even if collection iteration fails
                    // React Aria uses state.value for the select value, but state.selectedKey for the key
                    const selectedKey = state.selectedKey ?? (state.value as string | number | null);
                    if (selectedKey) {
                      // Render option with the selectedKey value - ensures form submission works
                      // This is the minimal fallback that always works
                      const selectedKeyStr = String(selectedKey);

                      // Try to use state.collection first, then fallback to originalCollection
                      let collection: typeof state.collection | typeof originalCollection | null = state.collection;
                      if (!collection || collection.size === 0) {
                        collection = originalCollection || null;
                      }

                      // Try to get the item from the collection if available
                      if (collection && typeof collection.getItem === 'function') {
                        try {
                          const item = collection.getItem(selectedKey);
                          if (item && (item.type === 'item' || item.type === undefined)) {
                            return (
                              <option key={item.key} value={selectedKeyStr}>
                                {item.textValue || selectedKeyStr}
                              </option>
                            );
                          }
                        } catch {
                          // Fall through to render with just the key
                        }
                      }
                      // Render option with the selectedKey value - ensures form submission works
                      return (
                        <option key={selectedKey} value={selectedKeyStr}>
                          {selectedKeyStr}
                        </option>
                      );
                    }

                    // If no selectedKey, try to render all items from collection
                    let collection: typeof state.collection | typeof originalCollection | null = state.collection;
                    if (!collection || collection.size === 0) {
                      collection = originalCollection || null;
                    }
                    if (!collection) return null;

                    // Try React Aria collection API first (getKeys/getItem)
                    if (typeof collection.getKeys === 'function' && typeof collection.getItem === 'function') {
                      try {
                        const keys = [...collection.getKeys()];
                        const options = keys
                          .map(function mapOption(key) {
                            const item = collection.getItem(key);
                            // Match React Aria's HiddenSelect: only render items with type === 'item'
                            if (item && item.type === 'item') {
                              return (
                                <option key={item.key} value={String(item.key)}>
                                  {item.textValue || ''}
                                </option>
                              );
                            }
                            return null;
                          })
                          .filter(Boolean);
                        // If we got options, return them
                        if (options.length > 0) return options;
                      } catch {
                        // Fall through to direct iteration
                      }
                    }

                    // Fallback: try direct iteration
                    try {
                      const options = [...collection]
                        .map(function mapOptionDirect(item) {
                          if (item && item.type === 'item') {
                            return (
                              <option key={item.key} value={String(item.key)}>
                                {item.textValue || ''}
                              </option>
                            );
                          }
                          return null;
                        })
                        .filter(Boolean);
                      if (options.length > 0) return options;
                    } catch {
                      // Fall through
                    }

                    return null;
                  })()}
                </select>
              </label>
            </div>
          )}
        </>
      )}
    </SelectContext.Provider>
  );
};
