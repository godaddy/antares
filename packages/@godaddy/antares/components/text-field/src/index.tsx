import {
  Input as RACInput,
  TextArea as RACTextArea,
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps
} from 'react-aria-components';
import { FieldFrame, type FieldFrameProps } from '#components/_internal/field-frame';
import { Flex } from '#components/layout/flex';
import { Text } from '#components/text';
import styles from './index.module.css';

/**
 * Extended props for the TextField component.
 * Adds leading/trailing adornments and multiline support.
 * Extends RAC TextFieldProps.
 */
export interface TextFieldProps
  extends Omit<RACTextFieldProps, 'children'>,
    Pick<FieldFrameProps, 'description' | 'errorMessage' | 'label'> {
  /** Helper text shown below the frame. */
  description?: string;

  /** Default value (uncontrolled). */
  defaultValue?: string;

  /** Error message shown when invalid. Use with isInvalid. */
  errorMessage?: string;

  /** Whether the input is disabled. */
  isDisabled?: boolean;

  /** Whether the value is invalid. Use with errorMessage for validation. */
  isInvalid?: boolean;

  /** Whether user input is required before form submission. */
  isRequired?: boolean;

  /** Label text shown above the frame. */
  label?: string;

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
 * TextField composes React Aria TextField with FieldFrame and optional leading/trailing
 * text adornments. Use for single-line or multiline text input with label, description,
 * and error message.
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
  const { isDisabled, isRequired, isReadOnly } = racProps;

  return (
    <RACTextField {...racProps}>
      <FieldFrame
        description={description}
        errorMessage={errorMessage}
        isDisabled={isDisabled}
        isRequired={isRequired}
        isReadOnly={isReadOnly}
        label={label}
        gap="sm"
      >
        {leadingText && (
          <Flex as={Text} alignItems="center" inlinePaddingStart="md">
            {leadingText}
          </Flex>
        )}
        {multiline ? (
          <RACTextArea placeholder={placeholder} className={styles.multiline} />
        ) : (
          <RACInput placeholder={placeholder} />
        )}
        {trailingText && (
          <Flex as={Text} alignItems="center" inlinePaddingEnd="md">
            {trailingText}
          </Flex>
        )}
      </FieldFrame>
    </RACTextField>
  );
}
