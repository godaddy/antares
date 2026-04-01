import { TextField, type TextFieldProps } from '@godaddy/antares';

/** Props for the text field playground example. */
export interface PlaygroundExampleProps
  extends Pick<
    TextFieldProps,
    | 'label'
    | 'description'
    | 'errorMessage'
    | 'placeholder'
    | 'isDisabled'
    | 'isInvalid'
    | 'isRequired'
    | 'multiline'
    | 'leadingText'
    | 'trailingText'
  > {}

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
  trailingText
}: PlaygroundExampleProps) {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      description={description}
      errorMessage={errorMessage}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isRequired={isRequired}
      multiline={multiline}
      leadingText={leadingText}
      trailingText={trailingText}
    />
  );
}
