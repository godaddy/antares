import { forwardRef, type ReactNode } from 'react';
import { NumberField as RACNumberField, type NumberFieldProps as RACNumberFieldProps } from 'react-aria-components';
import { Field, type FieldOwnProps } from '#components/_internal/field';
import { FieldError } from '#components/field-error';
import { Label } from '#components/label';
import { Text } from '#components/text';
import { Group, type FieldSize } from '#components/structure';
import { Button } from '#components/button';
import { Input } from '#components/input';
import { Icon } from '#components/icon';

export interface NumberFieldProps extends Omit<RACNumberFieldProps, 'children' | 'size'>, FieldOwnProps {
  /** When true, hides the increment/decrement stepper buttons. @default false */
  hideStepper?: boolean;

  /** Placeholder when the value is empty. */
  placeholder?: string;

  /** Visual size of the input. @default 'md' */
  size?: FieldSize;

  /**
   * Optional composed interior (Label, Group, Input, Button, FieldError).
   * When set, the default label / group / steppers layout is not rendered.
   */
  children?: ReactNode;
}

/**
 * Numeric input with label, description, error message, and optional stepper buttons.
 * Pass `children` to compose a custom interior instead of the default layout.
 *
 * @param props - {@link NumberFieldProps}
 */
export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(function NumberField(props, ref) {
  const { children, description, errorMessage, hideStepper, label, placeholder, size, ...racProps } = props;

  return (
    <Field as={RACNumberField} size={size} {...racProps}>
      {children ?? (
        <>
          {label ? <Label>{label}</Label> : null}
          <Group>
            {!hideStepper && (
              <Button slot="decrement" variant="control">
                <Icon icon="minus" />
              </Button>
            )}
            <Input ref={ref} placeholder={placeholder} />
            {!hideStepper && (
              <Button slot="increment" variant="control">
                <Icon icon="plus" />
              </Button>
            )}
          </Group>
          {description ? <Text slot="description">{description}</Text> : null}
          <FieldError>{errorMessage}</FieldError>
        </>
      )}
    </Field>
  );
});
