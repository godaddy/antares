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
import { Group } from '#components/structure';
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

/** Radio with an associated label. */
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

  /** Field interior (`Label`, radios, description, `FieldError`). */
  children: ReactNode | ((renderProps: RACRadioGroupRenderProps) => ReactNode);
}

/**
 * Radio group. Loose radios are wrapped in a Group when omitted.
 *
 * @example
 * ```tsx
 * <RadioGroup>
 *   <Label>Select your plan</Label>
 *   <Radio value="basic">Basic</Radio>
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
      slots={{
        items: function wrapItems(items) {
          return <Group>{items}</Group>;
        }
      }}
      {...props}
      className={composeClassName(className, styles.radioGroup)}
    >
      {children}
    </Field>
  );
}
