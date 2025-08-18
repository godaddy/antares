import React, { useMemo } from 'react';
import { ControlGroup, ControlGroupProps } from '@bento/control';
import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { useRadioGroup, type AriaRadioGroupProps } from 'react-aria';
import { useRadioGroupState } from 'react-stately';
import { RadioGroupStateContext } from './radio-group-state';
import { useDataAttributes } from '@bento/use-data-attributes';
import { type ValidationResult } from '@react-types/shared';

export interface RadioGroupProps
  extends AriaRadioGroupProps,
    Partial<Omit<ControlGroupProps, keyof AriaRadioGroupProps>> {
  /** The current value (controlled). */
  value?: string;

  /** The default value (uncontrolled). */
  defaultValue?: string;

  /** Whether the input is disabled. */
  isDisabled?: boolean;

  /** Whether the input can be selected but not changed by the user. */
  isReadOnly?: boolean;

  /** Whether user input is required on the input before form submission. */
  isRequired?: boolean;

  /** Whether the input value is invalid. */
  isInvalid?: boolean;

  /** The name of the input element, used when submitting an HTML form. */
  name?: string;

  /**
   * The <form> element to associate the input with.
   * The value of this attribute must be the id of a <form> in the same document.
   */
  form?: string;

  /** Radio children. */
  children: React.ReactNode;

  /** Error message for the radio group. */
  errorMessage?: React.ReactNode | ((val: ValidationResult) => React.ReactNode);
}

/**
 * The `RadioGroup` allows a user to select a single item from a list of `Radio` components.
 *
 * @component
 * @param {RadioGroupProps} args - The props passed to the RadioGroup component.
 *
 * @public
 */
export const RadioGroup = withSlots('BentoRadioGroup', function RadioGroup(args: RadioGroupProps) {
  const { errorMessage, ...restArgs } = args;
  const { props } = useProps(restArgs);
  const { isInvalid, isDisabled, isReadOnly, isRequired, ...restProps } = props;
  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps, descriptionProps, errorMessageProps, ...validationResult } = useRadioGroup(
    props,
    state
  );

  const displayedErrorMessage = useMemo(
    function getErrorMessage() {
      return typeof errorMessage === 'function'
        ? errorMessage(validationResult)
        : errorMessage || validationResult.validationErrors.join(', ');
    },
    [errorMessage, validationResult]
  );

  return (
    <ControlGroup
      slot="group"
      labelProps={labelProps}
      descriptionProps={descriptionProps}
      errorMessage={displayedErrorMessage}
      errorMessageProps={errorMessageProps}
      {...radioGroupProps}
      {...restProps}
      {...useDataAttributes({
        orientation: props.orientation || 'vertical',
        invalid: state.isInvalid,
        disabled: state.isDisabled,
        readonly: state.isReadOnly,
        required: state.isRequired
      })}
    >
      <RadioGroupStateContext.Provider value={state}>{props.children}</RadioGroupStateContext.Provider>
    </ControlGroup>
  );
});
