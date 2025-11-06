import React, { useRef, forwardRef, type ForwardedRef } from 'react';
import { ListBoxAria, useSelect, type AriaSelectProps } from 'react-aria';
import { OverlayTriggerStateContext, PopoverContext } from 'react-aria-components';
import { useSelectState } from 'react-stately';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing, useHover } from 'react-aria';
import { Container } from '@bento/container';
import { ListStateContext } from '@bento/listbox';
import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { useDataAttributes } from '@bento/use-data-attributes';
import { useOverlayPosition, useOverlay } from '@react-aria/overlays';
import type { GlobalDOMAttributes, forwardRefType } from '@react-types/shared';
import { CollectionBuilder } from '@react-aria/collections';
import { Collection, Node } from 'react-stately';

type SelectionMode = 'single' | 'multiple';

export interface SelectProps<T extends object = {}, M extends SelectionMode = 'single'>
  extends Omit<
      AriaSelectProps<T, M>,
      'children' | 'label' | 'description' | 'errorMessage' | 'validationState' | 'validationBehavior' | 'items'
    >,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.
   * @default 'react-aria-Select'
   */
  className?: string;
  /**
   * Temporary text that occupies the select when it is empty.
   * @default 'Select an item' (localized)
   */
  placeholder?: string;
  children?: React.ReactNode;
}

export const Select = /*#__PURE__*/ (forwardRef as forwardRefType)(function Select<
  T extends object = {},
  M extends SelectionMode = 'single'
>(props: SelectProps<T, M>, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <CollectionBuilder content={props.children}>
      {(collection) => <SelectInner args={props} collection={collection} selectRef={ref} />}
    </CollectionBuilder>
  );
});

interface SelectInnerProps<T extends object> {
  args: SelectProps<T, SelectionMode>;
  selectRef: ForwardedRef<HTMLDivElement>;
  collection: Collection<Node<T>>;
}

/**
 * A complete Select component built on top of the ListBox primitive.
 * Provides a dropdown interface for selecting a single option from a list.
 *
 * @example
 * ```tsx
 * <Select aria-label="Choose a fruit">
 *   <ListBoxItem id="apple" textValue="Apple">Apple</ListBoxItem>
 *   <ListBoxItem id="banana" textValue="Banana">Banana</ListBoxItem>
 * </Select>
 * ```
 */
export const SelectInner = withSlots('BentoSelect', function SelectInner<
  T extends object
>({ args, selectRef: ref, collection }: SelectInnerProps<T>) {
  const { props } = useProps(args);
  const { placeholder, children, ...restProps } = props;

  const state = useSelectState({ ...restProps, collection, children: undefined });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<ListBoxAria>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  const { triggerProps, valueProps, menuProps } = useSelect(restProps, state, triggerRef);

  const { overlayProps } = useOverlay(
    {
      onClose: () => state.close(),
      isOpen: state.isOpen,
      isDismissable: true
    },
    popoverRef
  );

  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef: popoverRef,
    placement: 'bottom start',
    offset: 4,
    isOpen: state.isOpen
  });

  const { focusProps, isFocused, isFocusVisible } = useFocusRing();
  const isDisabled = props.isDisabled ?? false;
  const { hoverProps, isHovered } = useHover({
    isDisabled
  });

  const buttonProps = mergeProps(triggerProps, focusProps, hoverProps);

  return (
    <OverlayTriggerStateContext.Provider value={state}>
      <PopoverContext.Provider
        value={{
          trigger: 'Select',
          triggerRef: triggerRef,
          scrollRef,
          placement: 'bottom start'
        }}
      >
        <ListStateContext.Provider value={state}>
          <Container
            slots={{
              trigger: { ...buttonProps, ref: triggerRef },
              popover: { ...overlayProps, ...positionProps, ref: popoverRef },
              list: { ...menuProps, ref: listRef },
              'trigger.value': {
                ...valueProps,
                children: state.selectedItems[0]?.textValue ?? placeholder,
                ref: valueRef
              },
              value: { children: state.selectedItems[0]?.textValue },
              description: {},
              errorMessage: {}
            }}
            {...useDataAttributes({
              disabled: isDisabled,
              isFocused,
              isFocusVisible,
              isHovered,
              required: props.isRequired ?? false,
              invalid: props.isInvalid ?? false,
              open: state.isOpen
            })}
          >
            {children}
          </Container>
        </ListStateContext.Provider>
      </PopoverContext.Provider>
    </OverlayTriggerStateContext.Provider>
  );
});
