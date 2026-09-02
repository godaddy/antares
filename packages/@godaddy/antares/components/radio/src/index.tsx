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
  /** Layout axis for the radio items. @default 'vertical' */
  orientation?: 'horizontal' | 'vertical';

  /** `Label`, a `Group` of `Radio`s, optional `Text slot="description"`, and `FieldError`. */
  children: ReactNode | ((renderProps: RACRadioGroupRenderProps) => ReactNode);
}

/**
 * Radio group field. Compose from `Label`, a `Group` of `Radio`s, `Text slot="description"`,
 * and `FieldError`. `orientation` sets keyboard navigation, ARIA, and item layout.
 *
 * @param props - {@link RadioGroupProps}
 *
 * @example
 * ```tsx
 * <RadioGroup>
 *   <Label>Select your plan</Label>
 *   <Group>
 *     <Radio value="basic">Basic</Radio>
 *   </Group>
 *   <FieldError />
 * </RadioGroup>
 * ```
 */
export function RadioGroup({ children, className, orientation = 'vertical', ...props }: RadioGroupProps) {
  return (
    <Field
      as={RACRadioGroup}
      interior="stack"
      orientation={orientation}
      forwardOrientation
      {...props}
      className={composeClassName(className, styles.radioGroup)}
    >
      {children}
    </Field>
  );
}
