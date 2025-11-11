import React from 'react';
import { withSlots } from '@bento/slots';
import { Container, type ContainerProps } from '@bento/container';
import { useProps } from '@bento/use-props';
import { useCheckboxGroup, type AriaCheckboxGroupProps } from 'react-aria';
import { useCheckboxGroupState } from 'react-stately';
import { CheckboxGroupStateContext } from './checkbox-group-state';
import { useDataAttributes } from '@bento/use-data-attributes';

export interface CheckboxGroupProps extends AriaCheckboxGroupProps, Omit<ContainerProps, keyof AriaCheckboxGroupProps> {
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
   * The `<form>` element to associate the input with.
   * The value of this attribute must be the id of a `<form>` in the same document.
   */
  form?: string;

  /** Checkbox children. */
  children?: React.ReactNode;
}

/**
 * The `CheckboxGroup` allows a user to select items from a list of `Checkbox` components.
 */
export const CheckboxGroup = withSlots('BentoCheckboxGroup', function CheckboxGroup(args: CheckboxGroupProps) {
  const { props, apply } = useProps(args);
  const state = useCheckboxGroupState(props);
  const { groupProps, labelProps, descriptionProps, errorMessageProps, ...validationResult } = useCheckboxGroup(
    { ...props, label: props.label ?? 'Checkbox Group', description: props.description ?? 'Description' },
    state
  );

  return (
    <CheckboxGroupStateContext.Provider value={state}>
      <Container
        {...apply(groupProps)}
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
    </CheckboxGroupStateContext.Provider>
  );
});
