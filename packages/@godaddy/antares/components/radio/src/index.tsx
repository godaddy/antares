import {
  FieldError as RACFieldError,
  Label as RACLabel,
  Radio as RACRadio,
  RadioGroup as RACRadioGroup,
  type RadioGroupProps as RACRadioGroupProps,
  type RadioProps as RACRadioProps
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import styles from './index.module.css';
import { Icon } from '#components/icon';
import { Text } from '#components/text';
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
  description?: string;

  /** Error message shown when invalid */
  errorMessage?: string;
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
    <RACRadioGroup {...props} orientation={orientation} className={cx(styles.radioGroup, className)}>
      <Flex direction="column" gap="sm">
        {label && (
          <RACLabel className={cx(styles.label, props.isRequired && styles['label--required'])}>{label}</RACLabel>
        )}
        <Flex
          direction={orientation === 'horizontal' ? 'row' : 'column'}
          gap={orientation === 'horizontal' ? 'lg' : 'md'}
        >
          {children}
        </Flex>
        {description && (
          <Text slot="description" className={styles.description}>
            {description}
          </Text>
        )}
        {errorMessage && (
          <Flex as={RACFieldError} className={styles.error}>
            <Flex alignItems="center" gap="sm">
              <Icon icon="alert" width={24} height={24} className={styles.errorIcon} aria-hidden="true" />
              <span>{errorMessage}</span>
            </Flex>
          </Flex>
        )}
      </Flex>
    </RACRadioGroup>
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
    <RACRadio {...props} className={cx(styles.radio, className)}>
      <div className={styles.indicator} />
      <span className={styles.radioLabel}>{children}</span>
    </RACRadio>
  );
}
