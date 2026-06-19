import {
  RadioButton as RACRadioButton,
  RadioField as RACRadioField,
  type RadioFieldProps as RACRadioFieldProps,
  RadioGroup as RACRadioGroup,
  type RadioGroupProps as RACRadioGroupProps
} from 'react-aria-components';
import { Field, FieldDescription, FieldError, FieldLabel, type FieldOwnProps } from '#components/_internal/field';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import styles from './index.module.css';
import type { ReactNode } from 'react';
import { cx } from 'cva';

export interface RadioProps extends RACRadioFieldProps, FlexOwnProps {
  /** Label text for the radio button */
  children: ReactNode;

  /** Additional class names applied to the root element. */
  className?: string;
}

/**
 * Antares Radio component
 *
 * @param props - {@link RadioProps}
 * @returns Radio button with indicator and label
 */
export function Radio({ className, children, ...props }: RadioProps) {
  return (
    <Flex {...props} as={RACRadioField}>
      <Flex as={RACRadioButton} alignItems="center" gap="sm" className={cx(styles.radio, className)}>
        <div className={styles.indicator} />
        {children}
      </Flex>
    </Flex>
  );
}

export interface RadioGroupProps extends RACRadioGroupProps, FieldOwnProps {
  /** Radio elements */
  children: ReactNode;
}

/**
 * Antares RadioGroup component
 *
 * @param props - {@link RadioGroupProps}
 * @returns RadioGroup component with label, radios, description, and error message
 */
export function RadioGroup({
  label,
  description,
  errorMessage,
  children,
  className,
  orientation = 'vertical',
  ...props
}: RadioGroupProps) {
  return (
    <Field as={RACRadioGroup} orientation={orientation} {...props} className={cx(styles.radioGroup, className)}>
      <FieldLabel isRequired={props.isRequired}>{label}</FieldLabel>
      <Flex
        direction={orientation === 'horizontal' ? 'row' : 'column'}
        gap={orientation === 'horizontal' ? 'lg' : 'md'}
      >
        {children}
      </Flex>
      <FieldDescription>{description}</FieldDescription>
      <FieldError>{errorMessage}</FieldError>
    </Field>
  );
}
