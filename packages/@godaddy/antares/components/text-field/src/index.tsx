import type { ReactNode } from 'react';
import { TextField as RACTextField, type TextFieldProps as RACTextFieldProps } from 'react-aria-components';
import { Field } from '#components/_internal/field';

export interface TextFieldProps extends Omit<RACTextFieldProps, 'children'> {
  /** Default value (uncontrolled). */
  defaultValue?: string;

  /** Current value (controlled). */
  value?: string;

  /** Name of the input element, used when submitting a form. */
  name?: string;

  /** Handler called when the value changes. */
  onChange?: RACTextFieldProps['onChange'];

  /** Composed interior: Label, Group, Input or TextArea, description Text, FieldError. */
  children?: ReactNode;
}

/**
 * RAC TextField plus the Field shell. Compose Label, Group, Input, and FieldError as children.
 *
 * @param props - {@link TextFieldProps}
 *
 * @example
 * ```tsx
 * <TextField>
 *   <Label>Email</Label>
 *   <Group>
 *     <Input placeholder="you@example.com" />
 *   </Group>
 * </TextField>
 * ```
 */
export function TextField(props: TextFieldProps) {
  const { children, ...racProps } = props;

  return (
    <Field as={RACTextField} {...racProps}>
      {children}
    </Field>
  );
}
