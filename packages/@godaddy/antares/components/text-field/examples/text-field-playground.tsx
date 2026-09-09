import {
  FieldError,
  Flex,
  Group,
  Input,
  Label,
  Text,
  TextArea,
  TextField,
  type TextFieldProps
} from '@godaddy/antares';

/** Props for the text field playground example. */
export interface PlaygroundExampleProps
  extends Pick<TextFieldProps, 'isDisabled' | 'isInvalid' | 'isRequired' | 'size'> {
  /** Label text for the field. */
  label?: string;

  /** Helper text below the field. */
  description?: string;

  /** Error message shown when the field is invalid. */
  errorMessage?: string;

  /** Placeholder for the control. */
  placeholder?: string;

  /** Compose a TextArea instead of an Input. */
  multiline?: boolean;

  /** Fixed text before the control. */
  leadingText?: string;

  /** Fixed text after the control. */
  trailingText?: string;
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
    <TextField isDisabled={isDisabled} isInvalid={isInvalid} isRequired={isRequired} size={size}>
      <Label>{label}</Label>
      <Group>
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
