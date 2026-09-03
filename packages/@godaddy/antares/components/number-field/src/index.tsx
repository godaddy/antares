import { type ReactNode, useContext } from 'react';
import { mergeProps } from 'react-aria';
import {
  DEFAULT_SLOT,
  NumberField as RACNumberField,
  type NumberFieldProps as RACNumberFieldProps
} from 'react-aria-components';
import { Field, type FieldOwnProps, type FieldSize } from '#components/_internal/field';
import { Button, ButtonContext } from '#components/button';
import { Icon } from '#components/icon';
import { Input } from '#components/input';
import { Group } from '#components/structure';

export interface NumberFieldProps extends Omit<RACNumberFieldProps, 'children' | 'size'>, FieldOwnProps {
  /** Field interior. Pass a function to read field state. */
  children: RACNumberFieldProps['children'];

  /** Visual size of the input. @default 'md' */
  size?: FieldSize;
}

type ButtonContextValue = {
  slots?: Record<string | symbol, object | undefined>;
  [key: string]: unknown;
};

/** Default stepper icons on ButtonContext slots. */
function NumberFieldStepperContext({ children }: { children: ReactNode }) {
  const inherited = (useContext(ButtonContext) ?? {}) as ButtonContextValue;
  const slots = inherited.slots ?? {};

  return (
    <ButtonContext.Provider
      value={{
        ...inherited,
        slots: {
          [DEFAULT_SLOT]: slots[DEFAULT_SLOT] ?? {},
          ...slots,
          decrement: mergeProps(slots.decrement ?? {}, { children: <Icon icon="minus" /> }),
          increment: mergeProps(slots.increment ?? {}, { children: <Icon icon="plus" /> })
        }
      }}
    >
      {children}
    </ButtonContext.Provider>
  );
}

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
    <NumberFieldStepperContext>
      <Field
        as={RACNumberField}
        interior="box"
        size={size}
        isDisabled={isDisabled}
        slots={{ control: <NumberFieldControl /> }}
        {...racProps}
      >
        {children}
      </Field>
    </NumberFieldStepperContext>
  );
}
