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
  /**
   * The interior of the field: a `Label`, a `Text slot="description"`, a `FieldError`, and the
   * control when you want something other than the stepper preset - an `Input` on its own, or a
   * `Group` of `Input` and stepper `Button`s. Pass a function to read field state.
   */
  children: RACNumberFieldProps['children'];

  /** Visual size of the input. @default 'md' */
  size?: FieldSize;
}

type ButtonContextValue = {
  slots?: Record<string | symbol, object | undefined>;
  [key: string]: unknown;
};

/** Publish default stepper icons on {@link ButtonContext} slots. */
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

/**
 * Preset control for `NumberField`: a `Group` holding stepper `Button`s around the `Input`.
 * `NumberField` inserts it when the interior has no control of its own - write a bare `Input` for a
 * field with no steppers, or compose the `Group` yourself to change their order or content.
 */
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
 * Numeric input field. Write the pieces you want to customize - a `Label`, a
 * `Text slot="description"`, a `FieldError`, a bare `Input` for a field with no steppers, or a
 * `Group` of your own - and the field fills in the stepper control it doesn't find, in the order you
 * wrote them. Empty `slot="increment"` / `slot="decrement"` buttons pick up icons and
 * `variant="control"` from field context.
 *
 * @param props - {@link NumberFieldProps}
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
