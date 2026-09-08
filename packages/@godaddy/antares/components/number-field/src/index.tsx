import { NumberField as RACNumberField, type NumberFieldProps as RACNumberFieldProps } from 'react-aria-components';
import { Field, type FieldOwnProps, type FieldSize } from '#components/_internal/field';
import { Icon } from '#components/icon';

export interface NumberFieldProps extends Omit<RACNumberFieldProps, 'children' | 'size'>, FieldOwnProps {
  /** Field interior. Pass a function to read field state. */
  children: RACNumberFieldProps['children'];

  /** Visual size of the input. @default 'md' */
  size?: FieldSize;
}

/** Faces for stepper `Button`s left empty. Local children replace them. */
const STEPPER_SLOTS = {
  decrement: { children: <Icon icon="minus" /> },
  increment: { children: <Icon icon="plus" /> }
};

/**
 * Numeric input field. Compose `Label`, the control, description, and `FieldError`.
 *
 * An empty `Button slot="decrement"` / `slot="increment"` picks up its icon, `variant`, and `size`
 * from the field, so a stepper needs no icon imports.
 *
 * @example
 * ```tsx
 * <NumberField minValue={0} maxValue={100}>
 *   <Label>Quantity</Label>
 *   <Group>
 *     <Button slot="decrement" />
 *     <Input />
 *     <Button slot="increment" />
 *   </Group>
 *   <FieldError />
 * </NumberField>
 * ```
 */
export function NumberField(props: NumberFieldProps) {
  const { children, size, ...racProps } = props;

  return (
    <Field as={RACNumberField} interior="box" size={size} slotDefaults={{ buttons: STEPPER_SLOTS }} {...racProps}>
      {children}
    </Field>
  );
}
