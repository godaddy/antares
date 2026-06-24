import { NumberField, type NumberFieldProps } from '@godaddy/antares';

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
  size?: NumberFieldProps['size'];
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
  size = 'md',
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
      size={size}
      step={step}
    />
  );
}
