import { type ReactNode, useContext } from 'react';
import { mergeProps } from 'react-aria';
import {
  DEFAULT_SLOT,
  NumberField as RACNumberField,
  type NumberFieldProps as RACNumberFieldProps
} from 'react-aria-components';
import { Field, mapFieldChildren, type FieldOwnProps, type FieldSize } from '#components/_internal/field';
import { ButtonContext } from '#components/button';
import { Icon } from '#components/icon';

export interface NumberFieldProps extends Omit<RACNumberFieldProps, 'children' | 'size'>, FieldOwnProps {
  /**
   * The interior of the field: a `Label`, an `Input` (optionally inside a `Group` with stepper
   * `Button`s), a `Text slot="description"`, and a `FieldError`. Pass a function to read field state.
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
 * Numeric input field. Compose from `Label`, `Input`, optional stepper `Button`s inside a
 * `Group`, `Text slot="description"`, and `FieldError`. A bare `Input` picks up field box chrome
 * directly, with no `Group` required. Empty `slot="increment"` / `slot="decrement"` buttons pick
 * up icons and `variant="control"` from field context.
 *
 * @param props - {@link NumberFieldProps}
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
  const { children, size, isDisabled, ...racProps } = props;

  return (
    <Field as={RACNumberField} interior="box" size={size} isDisabled={isDisabled} {...racProps}>
      {mapFieldChildren(children, (node) => (
        <NumberFieldStepperContext>{node}</NumberFieldStepperContext>
      ))}
    </Field>
  );
}
