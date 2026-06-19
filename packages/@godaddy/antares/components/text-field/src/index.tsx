import { TextField as RACTextField, type TextFieldProps as RACTextFieldProps } from 'react-aria-components';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  TextArea,
  type FieldOwnProps
} from '#components/_internal/field';
import { Flex } from '#components/layout/flex';

export interface TextFieldProps extends Omit<RACTextFieldProps, 'children'>, FieldOwnProps {
  /** Default value (uncontrolled). */
  defaultValue?: string;

  /** Whether the input is disabled. */
  isDisabled?: boolean;

  /** Whether the value is invalid. Use with errorMessage for validation. */
  isInvalid?: boolean;

  /** Whether user input is required before form submission. */
  isRequired?: boolean;

  /** Text rendered before the input (leading adornment). */
  leadingText?: string;

  /** When true, renders a textarea instead of a single-line input. */
  multiline?: boolean;

  /** Name of the input element, used when submitting a form. */
  name?: string;

  /** Handler called when the value changes. */
  onChange?: RACTextFieldProps['onChange'];

  /** Placeholder text when the input value is empty. */
  placeholder?: string;

  /** Text rendered after the input (trailing adornment). */
  trailingText?: string;

  /** Current value (controlled). */
  value?: string;
}

/**
 * TextField composes React Aria TextField with the field primitives (Field, FieldLabel,
 * FieldGroup, FieldError) and optional leading/trailing text adornments. Use for
 * single-line or multiline text input with label, description, and error message.
 *
 * @param props - {@link TextFieldProps}
 * @returns JSX element
 *
 * @example
 * ```tsx
 * <TextField label="Email" placeholder="you@example.com" />
 * <TextField label="Amount" leadingText="$" trailingText=".00" />
 * <TextField label="Comment" multiline placeholder="Enter a comment" />
 * ```
 */
export function TextField(props: TextFieldProps) {
  const { description, errorMessage, label, leadingText, multiline, placeholder, trailingText, ...racProps } = props;
  const { isDisabled, isRequired } = racProps;

  return (
    <Field as={RACTextField} {...racProps}>
      <FieldLabel isRequired={isRequired}>{label}</FieldLabel>
      <FieldGroup isDisabled={isDisabled} gap="sm">
        {leadingText && (
          <Flex as="span" alignItems="center" inlinePaddingStart="md" data-field-group-start>
            {leadingText}
          </Flex>
        )}
        {multiline ? (
          <TextArea
            placeholder={placeholder}
            data-field-group-start={!leadingText || undefined}
            data-field-group-end={!trailingText || undefined}
          />
        ) : (
          <Input
            placeholder={placeholder}
            data-field-group-start={!leadingText || undefined}
            data-field-group-end={!trailingText || undefined}
          />
        )}
        {trailingText && (
          <Flex as="span" alignItems="center" inlinePaddingEnd="md" data-field-group-end>
            {trailingText}
          </Flex>
        )}
      </FieldGroup>
      <FieldDescription>{description}</FieldDescription>
      <FieldError>{errorMessage}</FieldError>
    </Field>
  );
}
