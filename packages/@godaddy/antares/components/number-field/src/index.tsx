import { forwardRef } from 'react';
import { NumberField as RACNumberField, type NumberFieldProps as RACNumberFieldProps } from 'react-aria-components';
import {
  Field,
  FieldButton,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  type FieldSize,
  Input,
  type FieldOwnProps
} from '#components/_internal/field';
import { Icon } from '#components/icon';

export interface NumberFieldProps extends Omit<RACNumberFieldProps, 'children' | 'className' | 'size'>, FieldOwnProps {
  /** Additional class names applied to the field root. */
  className?: string;

  /** When true, hides the increment/decrement stepper buttons. @default false */
  hideStepper?: boolean;

  /** Placeholder when the value is empty. */
  placeholder?: string;

  /** Visual size of the input. @default 'md' */
  size?: FieldSize;
}

/**
 * Antares NumberField component. Renders a numeric input with label, description, error message, and optional stepper buttons.
 *
 * @param props - {@link NumberFieldProps}
 * @param ref - Ref for the input element.
 * @returns JSX element
 *
 * @example
 * ```tsx
 * <NumberField label="Quantity" placeholder="0" minValue={0} maxValue={100} />
 * <NumberField label="Amount" value={amount} onChange={setAmount} minValue={0} />
 * <NumberField label="Guests" hideStepper description="Enter a whole number." />
 * ```
 */
export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(function NumberField(props, ref) {
  const { description, errorMessage, hideStepper, label, placeholder, size, ...racProps } = props;
  const { isDisabled, isRequired } = racProps;

  return (
    <Field as={RACNumberField} {...racProps}>
      <FieldLabel isRequired={isRequired}>{label}</FieldLabel>
      <FieldGroup isDisabled={isDisabled} size={size}>
        {!hideStepper && (
          <FieldButton slot="decrement" data-field-group-start>
            <Icon icon="minus" />
          </FieldButton>
        )}
        <Input
          ref={ref}
          placeholder={placeholder}
          data-field-group-start={hideStepper || undefined}
          data-field-group-end={hideStepper || undefined}
        />
        {!hideStepper && (
          <FieldButton slot="increment" data-field-group-end>
            <Icon icon="plus" />
          </FieldButton>
        )}
      </FieldGroup>
      <FieldDescription>{description}</FieldDescription>
      <FieldError>{errorMessage}</FieldError>
    </Field>
  );
});
