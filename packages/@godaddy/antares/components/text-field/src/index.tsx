import type { ReactNode } from 'react';
import { TextField as RACTextField, type TextFieldProps as RACTextFieldProps } from 'react-aria-components';
import { Field, type FieldOwnProps } from '#components/_internal/field';
import { FieldError } from '#components/field-error';
import { Label } from '#components/label';
import { Text } from '#components/text';
import { Group, type FieldSize } from '#components/structure';
import { Input } from '#components/input';
import { TextArea } from '#components/text-area';
import { Flex } from '#components/layout/flex';

export interface TextFieldProps extends Omit<RACTextFieldProps, 'children' | 'size'>, FieldOwnProps {
  /** Default value (uncontrolled). */
  defaultValue?: string;

  /** Current value (controlled). */
  value?: string;

  /** Visual size of the input. @default 'md' */
  size?: FieldSize;

  /** Content rendered before the input (leading adornment) - text or an icon. */
  leadingText?: ReactNode;

  /** Content rendered after the input (trailing adornment) - text or an icon. */
  trailingText?: ReactNode;

  /** When true, renders a textarea instead of a single-line input. */
  multiline?: boolean;

  /** Name of the input element, used when submitting a form. */
  name?: string;

  /** Placeholder text when the input value is empty. */
  placeholder?: string;

  /** Handler called when the value changes. */
  onChange?: RACTextFieldProps['onChange'];

  /**
   * Optional composed interior (Label, Group, Input, Button, FieldError).
   * When set, the default label / group / input layout is not rendered.
   */
  children?: ReactNode;
}

/**
 * TextField with label, description, error, optional adornments, and multiline.
 * Pass `children` to compose a custom interior instead of the default layout.
 *
 * @param props - {@link TextFieldProps}
 *
 * @example
 * ```tsx
 * <TextField label="Email" placeholder="you@example.com" />
 * <TextField label="Amount" leadingText="$" trailingText=".00" />
 * <TextField label="Comment" multiline placeholder="Enter a comment" />
 * ```
 */
export function TextField(props: TextFieldProps) {
  const {
    children,
    description,
    errorMessage,
    label,
    leadingText,
    multiline,
    placeholder,
    size,
    trailingText,
    ...racProps
  } = props;
  const hasLeading = leadingText != null && leadingText !== false;
  const hasTrailing = trailingText != null && trailingText !== false;

  return (
    <Field as={RACTextField} size={size} {...racProps}>
      {children ?? (
        <>
          {label ? <Label>{label}</Label> : null}
          <Group>
            {hasLeading ? (
              <Flex as="span" alignItems="center" inlinePaddingStart="md">
                {leadingText}
              </Flex>
            ) : null}
            {multiline ? <TextArea placeholder={placeholder} /> : <Input placeholder={placeholder} />}
            {hasTrailing ? (
              <Flex as="span" alignItems="center" inlinePaddingEnd="md">
                {trailingText}
              </Flex>
            ) : null}
          </Group>
          {description ? <Text slot="description">{description}</Text> : null}
          <FieldError>{errorMessage}</FieldError>
        </>
      )}
    </Field>
  );
}
