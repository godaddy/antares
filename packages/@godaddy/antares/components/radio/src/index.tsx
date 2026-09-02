import type { ReactNode } from 'react';
import {
  RadioButton as RACRadioButton,
  type RadioButtonProps as RACRadioButtonProps,
  RadioField as RACRadioField,
  type RadioFieldProps as RACRadioFieldProps,
  RadioGroup as RACRadioGroup,
  type RadioGroupProps as RACRadioGroupProps,
  type RadioGroupRenderProps as RACRadioGroupRenderProps
} from 'react-aria-components';
import { composeClassName } from '#utils/render-props.ts';
import { Field, type FieldOwnProps } from '#components/_internal/field';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import styles from './index.module.css';

interface RadioButtonProps extends Omit<RACRadioButtonProps, 'className' | 'children'>, Omit<FlexOwnProps, 'as'> {
  children?: RACRadioButtonProps['children'];
  className?: string;
}

function RadioButton(props: RadioButtonProps) {
  const { className, children, ...rest } = props;

  return (
    <Flex
      alignItems="center"
      gap="sm"
      {...rest}
      as={RACRadioButton}
      className={composeClassName(className, styles.radio)}
    >
      {children}
    </Flex>
  );
}

export interface RadioProps extends Omit<RACRadioFieldProps, 'children'>, FlexOwnProps {
  /** Label text shown next to the indicator. */
  children?: ReactNode;
}

/**
 * Antares Radio component
 *
 * @param props - {@link RadioProps}
 * @returns Radio button with indicator and label
 */
export function Radio({ children, ...props }: RadioProps) {
  return (
    <Flex {...props} as={RACRadioField}>
      <RadioButton>
        <div className={styles.indicator} />
        {children}
      </RadioButton>
    </Flex>
  );
}

export interface RadioGroupProps extends Omit<RACRadioGroupProps, 'children'>, FieldOwnProps {
  /**
   * The interior: a `Label`, a layout (`Flex`) holding `Radio`s, a `Text slot="description"`,
   * and a `FieldError`. Pass a function to read field state.
   *
   * RAC's `orientation` only sets keyboard-navigation direction and ARIA — match the layout's
   * `direction` to it yourself.
   */
  children: ReactNode | ((renderProps: RACRadioGroupRenderProps) => ReactNode);
}

/**
 * Antares RadioGroup component
 *
 * @param props - {@link RadioGroupProps}
 *
 * @example
 * ```tsx
 * <RadioGroup>
 *   <Label>Select your plan</Label>
 *   <Flex direction="column" gap="md">
 *     <Radio value="basic">Basic</Radio>
 *   </Flex>
 *   <FieldError />
 * </RadioGroup>
 * ```
 */
export function RadioGroup({ children, className, ...props }: RadioGroupProps) {
  return (
    <Field as={RACRadioGroup} {...props} className={composeClassName(className, styles.radioGroup)}>
      {children}
    </Field>
  );
}
