import type { ReactNode } from 'react';
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

  /** Content rendered before the input (leading adornment) — text or an icon. */
  leadingText?: ReactNode;

  /** Content rendered after the input (trailing adornment) — text or an icon. */
  trailingText?: ReactNode;

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

  // ReactNode includes Promise, so coerce to booleans before using as conditions.
  const hasLeading = Boolean(leadingText);
  const hasTrailing = Boolean(trailingText);

  // The fill control sits at whichever edge isn't taken by an adornment: middle when both
  // are present, the opposite edge when one is, and a lone control (both edges) when neither.
  const controlEdge = hasLeading && hasTrailing ? 'middle' : hasLeading ? 'end' : hasTrailing ? 'start' : undefined;

  return (
    <Field as={RACTextField} {...racProps}>
      <FieldLabel isRequired={isRequired}>{label}</FieldLabel>
      <FieldGroup isDisabled={isDisabled} size={size} gap="sm">
        {hasLeading && (
          <Flex as="span" alignItems="center" inlinePaddingStart="md">
            {leadingText}
          </Flex>
        )}
        {multiline ? (
          <TextArea placeholder={placeholder} edge={controlEdge} />
        ) : (
          <Input placeholder={placeholder} edge={controlEdge} />
        )}
        {hasTrailing && (
          <Flex as="span" alignItems="center" inlinePaddingEnd="md">
            {trailingText}
          </Flex>
        )}
      </FieldGroup>
      <FieldDescription>{description}</FieldDescription>
      <FieldError>{errorMessage}</FieldError>
    </Field>
  );
}
