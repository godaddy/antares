import { TextField as RACTextField, type TextFieldProps as RACTextFieldProps } from 'react-aria-components';
import { Field, type FieldOwnProps } from '#components/_internal/field';
import type { FieldSize } from '#components/structure';

export interface TextFieldProps extends Omit<RACTextFieldProps, 'size'>, FieldOwnProps {
  /**
   * The interior of the field: a `Label`, a `Group` wrapping an `Input` or `TextArea`,
   * a `Text slot="description"`, and a `FieldError`. Pass a function to read field state.
   */
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
 * Text input field. Compose the interior from `Label`, `Group`, `Input` or `TextArea`,
 * `Text slot="description"`, and `FieldError`. A composed `Group` inherits `size` and
 * `isDisabled` from the field, so set those here and leave the structure to the markup.
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
 *   <Text slot="description">We won't share it.</Text>
 *   <FieldError />
 * </TextField>
 * ```
 */
export function TextField(props: TextFieldProps) {
  const { children, size, ...racProps } = props;

  return (
    <Field as={RACTextField} size={size} {...racProps}>
      {children}
    </Field>
  );
}
