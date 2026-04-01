import { NumberField } from '@godaddy/antares';

export interface NumberFieldPlaygroundExampleProps {
  description?: string;
  errorMessage?: string;
  hideStepper?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  label?: string;
  maxValue?: number;
  minValue?: number;
  placeholder?: string;
  step?: number;
}

export function NumberFieldPlaygroundExample({
  description,
  errorMessage,
  hideStepper,
  isDisabled,
  isInvalid,
  isRequired,
  label,
  maxValue,
  minValue,
  placeholder,
  step
}: NumberFieldPlaygroundExampleProps) {
  return (
    <NumberField
      description={description}
      errorMessage={errorMessage}
      hideStepper={hideStepper}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isRequired={isRequired}
      label={label}
      maxValue={maxValue}
      minValue={minValue}
      placeholder={placeholder}
      step={step}
    />
  );
}
