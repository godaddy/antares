import { FieldError, Flex, Group, Input, Label, Text, TextArea, TextField, type FieldSize } from '@godaddy/antares';

/** Props for the text field playground example. */
export interface PlaygroundExampleProps {
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  multiline?: boolean;
  leadingText?: string;
  trailingText?: string;
  size?: FieldSize;
}

export function PlaygroundExample({
  label = 'Label',
  placeholder = 'Enter text',
  description,
  errorMessage,
  isDisabled = false,
  isInvalid = false,
  isRequired = false,
  multiline = false,
  leadingText,
  trailingText,
  size = 'md'
}: PlaygroundExampleProps) {
  return (
    <TextField isDisabled={isDisabled} isInvalid={isInvalid} isRequired={isRequired}>
      {label ? <Label>{label}</Label> : null}
      <Group size={size}>
        {leadingText ? (
          <Flex as="span" alignItems="center" inlinePaddingStart="md">
            {leadingText}
          </Flex>
        ) : null}
        {multiline ? <TextArea placeholder={placeholder} /> : <Input placeholder={placeholder} />}
        {trailingText ? (
          <Flex as="span" alignItems="center" inlinePaddingEnd="md">
            {trailingText}
          </Flex>
        ) : null}
      </Group>
      {description ? <Text slot="description">{description}</Text> : null}
      <FieldError>{errorMessage}</FieldError>
    </TextField>
  );
}
