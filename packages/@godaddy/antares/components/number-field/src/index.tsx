import { forwardRef } from 'react';
import {
  Input as RACInput,
  NumberField as RACNumberField,
  type NumberFieldProps as RACNumberFieldProps
} from 'react-aria-components';
import { FieldFrame, type FieldFrameProps } from '#components/_internal/field-frame';
import { Button } from '#components/button';
import { Icon } from '#components/icon';

export interface NumberFieldProps
  extends Omit<RACNumberFieldProps, 'children'>,
    Pick<FieldFrameProps, 'description' | 'errorMessage' | 'label'> {
  /** When true, hides the increment/decrement stepper buttons. @default false */
  hideStepper?: boolean;

  /** Placeholder when the value is empty. */
  placeholder?: string;
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
  const { description, errorMessage, hideStepper, label, ...racProps } = props;
  const { isDisabled, isRequired, isReadOnly } = racProps;

  return (
    <RACNumberField {...racProps}>
      <FieldFrame
        description={description}
        errorMessage={errorMessage}
        isDisabled={isDisabled}
        isRequired={isRequired}
        isReadOnly={isReadOnly}
        label={label}
      >
        {!hideStepper && (
          <Button slot="decrement">
            <Icon icon="minus" />
          </Button>
        )}
        <RACInput ref={ref} />
        {!hideStepper && (
          <Button slot="increment">
            <Icon icon="plus" />
          </Button>
        )}
      </FieldFrame>
    </RACNumberField>
  );
});
