import {
  Button,
  FieldError,
  Group,
  Input,
  Label,
  NumberField,
  Text,
  type NumberFieldProps
} from '@godaddy/antares';

export interface PlaygroundExampleProps {
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

export function PlaygroundExample({
  description,
  errorMessage,
  hideStepper,
  isDisabled,
  isInvalid,
  isRequired,
  label = 'Quantity',
  maxValue,
  minValue,
  placeholder,
  size = 'md',
  step
}: PlaygroundExampleProps) {
  return (
    <NumberField
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isRequired={isRequired}
      maxValue={maxValue}
      minValue={minValue}
      size={size}
      step={step}
    >
      <Label>{label}</Label>
      <Group>
        {hideStepper ? null : <Button slot="decrement" />}
        <Input placeholder={placeholder} />
        {hideStepper ? null : <Button slot="increment" />}
      </Group>
      {description ? <Text slot="description">{description}</Text> : null}
      <FieldError>{errorMessage}</FieldError>
    </NumberField>
  );
}
