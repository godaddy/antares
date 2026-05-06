import React, { type ReactNode } from 'react';
import {
  FieldError as RACFieldError,
  type FieldErrorProps as RACFieldErrorProps,
  Label as RACLabel,
  Checkbox as RACCheckbox,
  type CheckboxProps as RACCheckboxProps,
  CheckboxGroup as RACCheckboxGroup,
  type CheckboxGroupProps as RACCheckboxGroupProps
} from 'react-aria-components';
import { Box } from '#components/layout/box';
import { Flex } from '#components/layout/flex';
import { Icon } from '#components/icon';
import { Text, type TextProps } from '#components/text';
import { cx } from 'cva';
import styles from './index.module.css';

export interface CheckboxProps extends RACCheckboxProps {
  /** The content of the checkbox label. */
  children?: React.ReactNode;

  /** Additional class names to apply to the checkbox component. */
  className?: string;
}

export interface CheckboxGroupProps extends RACCheckboxGroupProps {
  /** The checkboxes within the group. */
  children?: ReactNode;

  /** Additional class names to apply to the checkbox group container. */
  className?: string;

  /** An error message to display below the group. */
  errorMessage?: ReactNode;

  /** Props for the error message text */
  errorMessageProps?: RACFieldErrorProps;

  /** The directionality of the checkbox group. @default 'column' */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';

  /** The label for the checkbox group. */
  label?: ReactNode;

  /** A description for the checkbox group. */
  description?: ReactNode;

  /** Props for the description text */
  descriptionProps?: TextProps;
}

/**
 * UXCore Checkbox component. Renders a checkbox input with an associated label.
 *
 * @param props - {@link CheckboxProps}
 */
export function Checkbox(props: CheckboxProps) {
  const { children, className, ...rest } = props;
  return (
    <Flex as={RACCheckbox} {...rest} className={cx(styles.checkbox, className)}>
      {function renderCheckbox({ isSelected, isIndeterminate }) {
        return (
          <Flex alignItems="center" gap="sm">
            <Flex
              alignItems="center"
              justifyContent="center"
              className={cx(styles.indicator, isIndeterminate && styles.indeterminate)}
            >
              {isIndeterminate ? (
                <Icon icon="minus" className={styles.indeterminateIcon} aria-hidden="true" />
              ) : (
                isSelected && <Icon icon="checkmark" className={styles.selectedIcon} aria-hidden="true" />
              )}
            </Flex>
            <Box className={styles.checkboxLabel}>{children}</Box>
          </Flex>
        );
      }}
    </Flex>
  );
}

/**
 * UXCore CheckboxGroup component. Renders a group meant to hold checkboxes with shared state.
 *
 * @param props - {@link CheckboxGroupProps}
 */
export function CheckboxGroup({
  children,
  className,
  errorMessage,
  label,
  direction = 'column',
  description,
  descriptionProps,
  errorMessageProps,
  ...rest
}: CheckboxGroupProps) {
  return (
    <Flex as={RACCheckboxGroup} direction="column" gap="sm" {...rest} className={cx(styles.checkboxGroup, className)}>
      {label && (
        <Flex as={RACLabel} className={cx(rest.isRequired && styles['label--required'])}>
          {label}
        </Flex>
      )}

      <Flex direction={direction} gap={direction === 'row' || direction === 'row-reverse' ? 'lg' : 'md'}>
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
          alignItems="center"
          gap="sm"
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
