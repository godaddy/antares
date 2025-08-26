import React, { useContext, useRef, useMemo } from 'react';
import { Control, ControlProps } from '@bento/control';
import { Icon } from '@bento/icon';
import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { useFocusRing, useHover, type AriaCheckboxProps, useCheckboxGroupItem, useCheckbox } from 'react-aria';
import { mergeProps, mergeRefs, useObjectRef } from '@react-aria/utils';
import { useToggleState } from 'react-stately';
import { useDataAttributes } from '@bento/use-data-attributes';
import { CheckboxGroupStateContext } from './checkbox-group-state';

export interface CheckboxProps extends AriaCheckboxProps, Partial<Omit<ControlProps, keyof AriaCheckboxProps>> {
  /** The value of the checkbox, used when submitting an HTML form. */
  value?: string;

  /** The name of the checkbox. */
  name?: string;

  /** A ref for the HTML input element. */
  inputRef?: React.Ref<HTMLInputElement>;

  /** The label for the checkbox. Accepts any renderable node. */
  children?: React.ReactNode;

  /** Whether the checkbox is required or not. */
  isRequired?: boolean;

  /** Whether the input can be selected but not changed by the user. */
  isReadOnly?: boolean;

  /**
   * Whether the checkbox is disabled or not. Shows that a selection exists,
   * but is not available in that circumstance.
   */
  isDisabled?: boolean;

  /** Whether the element should receive focus on render. */
  autoFocus?: boolean;

  /** Whether the checkbox is in an indeterminate state. */
  isIndeterminate?: boolean;

  /** Whether the checkbox is in a selected state. */
  isSelected?: boolean;
}

/**
 * The `Checkbox` is a single checkbox option that can be selected by the user.
 *
 * @component
 * @param {CheckboxProps} args - The props passed to the Checkbox component.
 *
 * @public
 */
export const Checkbox = withSlots('BentoCheckbox', function Checkbox(args: CheckboxProps) {
  const { props, apply } = useProps(args);
  const {
    isRequired = false,
    isIndeterminate = false,
    isDisabled: isDisabledProp = false,
    isSelected: isSelectedProp = false,
    isReadOnly: isReadOnlyProp = false
  } = props;

  const groupState = useContext(CheckboxGroupStateContext);

  const ref = useRef<HTMLInputElement>(null);
  const inputRef = useObjectRef(useMemo(() => mergeRefs(ref, props.inputRef), [ref, props.inputRef]));

  let { labelProps, inputProps, isSelected, isReadOnly, isDisabled, isPressed, isInvalid } = groupState
    ? useCheckboxGroupItem(
        {
          ...props,
          // Value is optional for standalone checkboxes, but required for CheckboxGroup items;
          // it's passed explicitly here to avoid typescript error (requires ignore)(recommendation from React Aria).
          value: (props as Required<Pick<typeof props, 'value'>>).value
        },
        groupState,
        inputRef
      )
    : useCheckbox(
        {
          ...props
        },
        useToggleState(props),
        inputRef
      );

  const interactionDisabled = isDisabledProp || isDisabled || isReadOnly || isReadOnlyProp;
  const { hoverProps, isHovered } = useHover({
    ...props,
    isDisabled: interactionDisabled
  });
  const { isFocused, isFocusVisible, focusProps } = useFocusRing();

  return (
    <Control
      slot="control"
      labelProps={mergeProps(labelProps, hoverProps)}
      inputProps={mergeProps(inputProps, focusProps)}
      label={props.children}
      inputRef={inputRef}
      aria-checked={isIndeterminate ? 'mixed' : undefined}
      {...apply(props, ['isReadOnly', 'isSelected', 'isIndeterminate', 'isDisabled', 'value', 'autoFocus'])}
      {...useDataAttributes({
        selected: isSelected || isSelectedProp,
        pressed: isPressed,
        hovered: isHovered,
        focused: isFocused,
        focusVisible: isFocusVisible,
        disabled: interactionDisabled,
        readOnly: isReadOnly || isReadOnlyProp,
        invalid: isInvalid,
        required: isRequired,
        indeterminate: isIndeterminate
      })}
    >
      {isIndeterminate ? (
        <Icon slot="icon-indeterminate" icon="checkboxIndeterminate">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="11" width="12" height="2" fill="currentColor" />
          </svg>
        </Icon>
      ) : isSelected ? (
        <Icon slot="icon-checked" icon="checkboxChecked">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9,16.2L4.8,12l-1.4,1.4L9,19L21,7l-1.4-1.4L9,16.2z" fill="currentColor" />
          </svg>
        </Icon>
      ) : (
        <Icon slot="icon-unchecked" icon="checkboxUnchecked">
          <svg width={24} height={24} aria-hidden="true">
            <rect x={4} y={4} width={16} height={16} rx={3} fill="none" stroke="gray" strokeWidth={2} />
          </svg>
        </Icon>
      )}
    </Control>
  );
});
