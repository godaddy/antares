import { NumberField as RACNumberField, type NumberFieldProps as RACNumberFieldProps } from 'react-aria-components';
import { Field, type FieldOwnProps } from '#components/_internal/field';
import type { FieldSize } from '#components/structure';

export interface NumberFieldProps extends Omit<RACNumberFieldProps, 'children' | 'size'>, FieldOwnProps {
  /**
   * The interior of the field: a `Label`, a `Group` with an `Input` and optional stepper
   * `Button`s (`slot="decrement"` / `slot="increment"`), a `Text slot="description"`, and a
   * `FieldError`. Pass a function to read field state.
   */
  children: RACNumberFieldProps['children'];

  /** Visual size of the input. @default 'md' */
  size?: FieldSize;
}

/**
 * Numeric input field. Compose the interior from `Label`, `Group`, `Input`, optional stepper
 * `Button`s, `Text slot="description"`, and `FieldError`. A composed `Group` inherits `size` and
 * `isDisabled` from the field, so set those here and leave the structure to the markup.
 *
 * @param props - {@link NumberFieldProps}
 *
 * @example
 * ```tsx
 * <NumberField minValue={0} maxValue={100}>
 *   <Label>Quantity</Label>
 *   <Group>
 *     <Button slot="decrement" variant="control"><Icon icon="minus" /></Button>
 *     <Input />
 *     <Button slot="increment" variant="control"><Icon icon="plus" /></Button>
 *   </Group>
 *   <FieldError />
 * </NumberField>
 * ```
 */
export function NumberField(props: NumberFieldProps) {
  const { children, size, ...racProps } = props;

  return (
    <Field as={RACNumberField} size={size} {...racProps}>
      {children}
    </Field>
  );
}
