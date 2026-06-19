import { TextField as RACTextField, type TextFieldProps as RACTextFieldProps } from 'react-aria-components';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  type FieldSize,
  Input,
  TextArea,
  type FieldOwnProps
} from '#components/field';
import { Flex } from '#components/layout/flex';

export interface TextFieldProps extends Omit<RACTextFieldProps, 'children' | 'className' | 'size'>, FieldOwnProps {
  /** Default value (uncontrolled). */
  defaultValue?: string;

  /** Current value (controlled). */
  value?: string;

  /** Visual size of the input. @default 'md' */
  size?: FieldSize;

  /** Additional class names applied to the field root. */
  className?: string;

  /** Text rendered before the input (leading adornment). */
  leadingText?: string;

  /** Text rendered after the input (trailing adornment). */
  trailingText?: string;

  /** When true, renders a textarea instead of a single-line input. */
  multiline?: boolean;

  /** Name of the input element, used when submitting a form. */
  name?: string;

  /** Placeholder text when the input value is empty. */
  placeholder?: string;

  /** Handler called when the value changes. */
  onChange?: RACTextFieldProps['onChange'];
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
  const { description, errorMessage, label, leadingText, multiline, placeholder, size, trailingText, ...racProps } =
    props;
  const { isDisabled, isRequired } = racProps;

  return (
    <Field as={RACTextField} {...racProps}>
      <FieldLabel isRequired={isRequired}>{label}</FieldLabel>
      <FieldGroup isDisabled={isDisabled} size={size} gap="sm">
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
