import React, { useMemo } from 'react';
import { Control, type ControlProps } from '@bento/control';
import { useDataAttributes } from '@bento/use-data-attributes';
import { Icon } from '@bento/icon';
import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { mergeProps, mergeRefs, useObjectRef } from '@react-aria/utils';
import { useFocusRing, useHover, useRadio, type AriaRadioProps } from 'react-aria';
import { RadioGroupStateContext } from './radio-group-state';

export interface RadioProps extends AriaRadioProps, Partial<Omit<ControlProps, keyof AriaRadioProps>> {
  /** The value of the radio button, used when submitting an HTML form. */
  value: string;

  /** A ref for the HTML input element. */
  inputRef?: React.Ref<HTMLInputElement>;

  /** The label for the Radio. Accepts any renderable node. */
  children?: React.ReactNode;

  /**
   * Whether the radio button is disabled or not. Shows that a selection exists,
   * but is not available in that circumstance.
   */
  isDisabled?: boolean;

  /** Whether the element should receive focus on render. */
  autoFocus?: boolean;
}

/**
 * The `Radio` is a single radio option that can be selected by the user.
 *
 * @component
 * @param {RadioProps} args - The props passed to the Radio component.
 *
 * @public
 */
export const Radio = withSlots('BentoRadio', function Radio(args: RadioProps) {
  const { props } = useProps(args);
  const { isDisabled, value, autoFocus, ...restProps } = props;
  const state = React.useContext(RadioGroupStateContext)!;
  const ref = React.useRef<HTMLInputElement>(null);
  const inputRef = useObjectRef(useMemo(() => mergeRefs(ref, props.inputRef), [ref, props.inputRef]));
  const { isFocused, isFocusVisible, focusProps } = useFocusRing();
  const { inputProps, labelProps, isSelected, isPressed } = useRadio(props as RadioProps, state, inputRef);
  const interactionDisabled = props.isDisabled || state.isReadOnly;
  const { hoverProps, isHovered } = useHover({
    ...props,
    isDisabled: interactionDisabled
  });

  return (
    <Control
      slot="control"
      label={props.children}
      labelProps={mergeProps(labelProps, hoverProps)}
      inputRef={inputRef}
      inputProps={mergeProps(inputProps, focusProps)}
      {...restProps}
      {...useDataAttributes({
        selected: isSelected,
        pressed: isPressed,
        hovered: isHovered,
        focused: isFocused,
        focusVisible: isFocusVisible,
        disabled: isDisabled,
        readonly: state.isReadOnly,
        invalid: state.isInvalid,
        required: state.isRequired
      })}
    >
      {isSelected ? (
        <Icon slot="icon-checked" icon="radioChecked">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx={12} cy={12} r={8 - 6 / 2} fill="none" stroke="orange" strokeWidth={6} />
          </svg>
        </Icon>
      ) : (
        <Icon slot="icon-unchecked" icon="radioUnchecked">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx={12} cy={12} r={8} fill="none" stroke="gray" strokeWidth={2} />
          </svg>
        </Icon>
      )}
    </Control>
  );
});
