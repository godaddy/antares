import { DatePicker, FieldError, Label, Text } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  label?: string;
  description?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}

export function PlaygroundExample({
  label = 'Event date',
  description,
  placeholder,
  isDisabled,
  isRequired,
  isInvalid,
  errorMessage
}: PlaygroundExampleProps) {
  return (
    <DatePicker
      isDisabled={isDisabled}
      isRequired={isRequired}
      isInvalid={isInvalid}
      placeholder={placeholder}
    >
      <Label>{label}</Label>
      {description ? <Text slot="description">{description}</Text> : null}
      <FieldError>{errorMessage}</FieldError>
    </DatePicker>
  );
}
