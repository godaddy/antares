import {
  FieldError as RACFieldError,
  type FieldErrorProps as RACFieldErrorProps,
  Label as RACLabel,
  Radio as RACRadio,
  RadioGroup as RACRadioGroup,
  type RadioGroupProps as RACRadioGroupProps,
  type RadioProps as RACRadioProps
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import styles from './index.module.css';
import { Icon } from '#components/icon';
import { Text, type TextProps } from '#components/text';
import { type ReactNode } from 'react';
import { cx } from 'cva';

/**
 * Props for the RadioGroup component
 */
export interface RadioGroupProps extends Omit<RACRadioGroupProps, 'children' | 'className'> {
  /** The content to display as the label */
  label?: ReactNode;

  /** Radio elements */
  children: ReactNode;

  /** Additional class names applied to the root element. */
  className?: string;

  /** Help text below the radio group */
  description?: ReactNode;

  /** Props for the description text */
  descriptionProps?: TextProps;

  /** Error message shown when invalid */
  errorMessage?: ReactNode;

  /** Props for the error message text */
  errorMessageProps?: RACFieldErrorProps;
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
  descriptionProps,
  errorMessageProps,
  ...props
}: RadioGroupProps) {
  return (
    <Flex
      as={RACRadioGroup}
      direction="column"
      gap="sm"
      orientation={orientation}
      {...props}
      className={cx(styles.radioGroup, className)}
    >
      {label && (
        <Flex as={RACLabel} className={cx(props.isRequired && styles['label--required'])}>
          {label}
        </Flex>
      )}

      <Flex
        direction={orientation === 'horizontal' ? 'row' : 'column'}
        gap={orientation === 'horizontal' ? 'lg' : 'md'}
      >
        {children}
      </Flex>

      {description && (
        <Text slot="description" {...descriptionProps}>
          {description}
        </Text>
      )}

      {errorMessage && (
        <Flex
          as={RACFieldError}
          gap="sm"
          alignItems="center"
          {...errorMessageProps}
          className={cx(styles.error, errorMessageProps?.className)}
        >
          <Icon icon="alert" width={24} height={24} className={styles.errorIcon} aria-hidden="true" />
          <span>{errorMessage}</span>
        </Flex>
      )}
    </Flex>
  );
}

/**
 * Props for the Radio component
 */
export interface RadioProps extends Omit<RACRadioProps, 'children'> {
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
    <Flex as={RACRadio} alignItems="center" gap="sm" {...props} className={cx(styles.radio, className)}>
      <div className={styles.indicator} />
      <span className={styles.radioLabel}>{children}</span>
    </Flex>
  );
}
