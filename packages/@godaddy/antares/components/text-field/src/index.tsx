import { TextField as RACTextField, type TextFieldProps as RACTextFieldProps } from 'react-aria-components';
import { Field, type FieldOwnProps, type FieldSize } from '#components/_internal/field';

export interface TextFieldProps extends Omit<RACTextFieldProps, 'size'>, FieldOwnProps {
  /** Field interior. Pass a function to read field state. */
  children: RACTextFieldProps['children'];

  /** Default value (uncontrolled). */
  defaultValue?: string;

  /** Current value (controlled). */
  value?: string;

  /** Visual size of the input. @default 'md' */
  size?: FieldSize;

  /** Name of the input element, used when submitting a form. */
  name?: string;

  /** Handler called when the value changes. */
  onChange?: RACTextFieldProps['onChange'];
}

/**
 * Text input field. Compose `Label`, `Input`/`TextArea`, optional `Group`, description, and `FieldError`.
 *
 * @example
 * ```tsx
 * <TextField>
 *   <Label>Email</Label>
 *   <Input placeholder="you@example.com" />
 *   <Text slot="description">We won't share it.</Text>
 *   <FieldError />
 * </TextField>
 * ```
 */
export function TextField(props: TextFieldProps) {
  const { children, size, ...racProps } = props;

  return (
    <Field as={RACTextField} interior="box" size={size} {...racProps}>
      {children}
    </Field>
  );
}
