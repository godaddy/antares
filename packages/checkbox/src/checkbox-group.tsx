import React, { useMemo } from 'react';
import { useProps } from '@bento/use-props';
import { ControlGroup, ControlGroupProps } from '@bento/control';
import { useDataAttributes } from '@bento/use-data-attributes';
import { type ValidationResult } from '@react-types/shared';
import { AriaCheckboxGroupProps, useCheckboxGroup } from 'react-aria';
import { useCheckboxGroupState } from 'react-stately';
import { withSlots } from '@bento/slots';
import { CheckboxGroupStateContext } from './checkbox-group-state';

export interface CheckboxGroupProps
  extends AriaCheckboxGroupProps,
    Partial<Omit<ControlGroupProps, keyof AriaCheckboxGroupProps>> {
  /** The current value of the checkbox group (controlled). */
  value?: string[];

  /** The default value of the checkbox group (uncontrolled). */
  defaultValue?: string[];

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

  /** Description for the checkbox group. */
  description?: string;

  /** Checkbox children. */
  children?: React.ReactNode;

  /** Error message for the checkbox group. */
  errorMessage?: React.ReactNode | ((val: ValidationResult) => React.ReactNode);
}

/**
 * The `CheckboxGroup` allows a user to select items from a list of `Checkbox` components.
 *
 * @component
 * @param {CheckboxGroupProps} args - The props passed to the CheckboxGroup component.
 *
 * @public
 */
export const CheckboxGroup = withSlots('BentoCheckboxGroup', function CheckboxGroup(args: CheckboxGroupProps) {
  const { errorMessage, ...restArgs } = args;
  const { props, apply } = useProps(restArgs);
  const state = useCheckboxGroupState(props);
  const { children } = props;
  const { groupProps, labelProps, descriptionProps, errorMessageProps, ...validationResult } = useCheckboxGroup(
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
      {...groupProps}
      {...apply(props, ['isInvalid', 'isDisabled', 'isReadOnly', 'isRequired', 'validationBehavior'])}
      {...useDataAttributes({
        orientation: props.orientation || 'vertical',
        invalid: state.isInvalid,
        disabled: state.isDisabled,
        readonly: state.isReadOnly,
        required: state.isRequired
      })}
    >
      <CheckboxGroupStateContext.Provider value={state}>{children}</CheckboxGroupStateContext.Provider>
    </ControlGroup>
  );
});
