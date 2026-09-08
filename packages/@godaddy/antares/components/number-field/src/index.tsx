import { NumberField as RACNumberField, type NumberFieldProps as RACNumberFieldProps } from 'react-aria-components';
import { Field, type FieldOwnProps, type FieldSize } from '#components/_internal/field';
import { Button } from '#components/button';
import { Icon } from '#components/icon';
import { Input } from '#components/input';
import { Group } from '#components/structure';

export interface NumberFieldProps extends Omit<RACNumberFieldProps, 'children' | 'size'>, FieldOwnProps {
  /** Field interior. Pass a function to read field state. */
  children: RACNumberFieldProps['children'];

  /** Visual size of the input. @default 'md' */
  size?: FieldSize;
}

/** Stepper faces and default icons. */
const STEPPER_SLOTS = {
  decrement: { variant: 'control', children: <Icon icon="minus" /> },
  increment: { variant: 'control', children: <Icon icon="plus" /> }
};

/** Preset stepper Group; replace with a bare Input or custom Group. */
function NumberFieldControl() {
  return (
    <Group>
      <Button slot="decrement" />
      <Input />
      <Button slot="increment" />
    </Group>
  );
}

/**
 * Numeric input field. Fills in the stepper control when omitted.
 *
 * @example
 * ```tsx
 * <NumberField minValue={0} maxValue={100}>
 *   <Label>Quantity</Label>
 *   <FieldError />
 * </NumberField>
 * ```
 */
export function NumberField(props: NumberFieldProps) {
  const { children, size, isDisabled, ...racProps } = props;

  return (
    <Field
      as={RACNumberField}
      interior="box"
      size={size}
      isDisabled={isDisabled}
      slots={{ control: <NumberFieldControl /> }}
      buttonSlots={STEPPER_SLOTS}
      {...racProps}
    >
      {children}
    </Field>
  );
}
