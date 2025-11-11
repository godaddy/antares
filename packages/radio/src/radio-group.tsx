import React from 'react';
import { withSlots } from '@bento/slots';
import { Container, type ContainerProps } from '@bento/container';
import { useProps } from '@bento/use-props';
import { useRadioGroup, type AriaRadioGroupProps } from 'react-aria';
import { useRadioGroupState } from 'react-stately';
import { RadioGroupStateContext } from './radio-group-state';
import { useDataAttributes } from '@bento/use-data-attributes';

export interface RadioGroupProps extends AriaRadioGroupProps, Omit<ContainerProps, keyof AriaRadioGroupProps> {
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
   * The `<form>` element to associate the input with.
   * The value of this attribute must be the id of a `<form>` in the same document.
   */
  form?: string;

  /** Radio children. */
  children: React.ReactNode;
}

/**
 * The `RadioGroup` allows a user to select a single item from a list of `Radio` components.
 */
export const RadioGroup = withSlots('BentoRadioGroup', function RadioGroup(args: RadioGroupProps) {
  const { props, apply } = useProps(args);
  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps, descriptionProps, errorMessageProps, ...validationResult } = useRadioGroup(
    { ...props, label: props.label ?? 'Radio Group', description: props.description ?? 'Description' },
    state
  );

  return (
    <RadioGroupStateContext.Provider value={state}>
      <Container
        {...apply(radioGroupProps)}
        {...useDataAttributes({
          orientation: props.orientation || 'vertical',
          invalid: state.isInvalid,
          disabled: state.isDisabled,
          readonly: state.isReadOnly,
          required: state.isRequired
        })}
        slots={{
          label: { ...labelProps },
          description: { ...descriptionProps },
          error: { ...errorMessageProps, ...validationResult }
        }}
      >
        {props.children}
      </Container>
    </RadioGroupStateContext.Provider>
  );
});
