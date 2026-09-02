import {
  Button,
  FieldError,
  Group,
  Icon,
  Input,
  Label,
  NumberField,
  Text,
  type NumberFieldProps
} from '@godaddy/antares';

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
  label = 'Quantity',
  maxValue,
  minValue,
  placeholder,
  size = 'md',
  step
}: NumberFieldPlaygroundExampleProps) {
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
        {hideStepper ? null : (
          <Button slot="decrement" variant="control">
            <Icon icon="minus" />
          </Button>
        )}
        <Input placeholder={placeholder} />
        {hideStepper ? null : (
          <Button slot="increment" variant="control">
            <Icon icon="plus" />
          </Button>
        )}
      </Group>
      {description ? <Text slot="description">{description}</Text> : null}
      <FieldError>{errorMessage}</FieldError>
    </NumberField>
  );
}
