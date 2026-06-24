import type { ReactNode } from 'react';
import {
  CheckboxButton as RACCheckboxButton,
  CheckboxField as RACCheckboxField,
  type CheckboxFieldProps as RACCheckboxFieldProps,
  CheckboxGroup as RACCheckboxGroup,
  type CheckboxGroupProps as RACCheckboxGroupProps
} from 'react-aria-components';
import { Field, FieldDescription, FieldError, FieldLabel, type FieldOwnProps } from '#components/field';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { Icon } from '#components/icon';
import { cx } from 'cva';
import styles from './index.module.css';

export interface CheckboxProps extends RACCheckboxFieldProps, FlexOwnProps {
  /** The content of the checkbox label. */
  children?: ReactNode;
}

/**
 * Antares Checkbox component. Renders a checkbox input with an associated label.
 *
 * @param props - {@link CheckboxProps}
 */
export function Checkbox(props: CheckboxProps) {
  const { children, className, ...rest } = props;
  return (
    <Flex {...rest} as={RACCheckboxField}>
      <Flex as={RACCheckboxButton} className={cx(styles.checkbox, className)}>
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
              {children}
            </Flex>
          );
        }}
      </Flex>
    </Flex>
  );
}

export interface CheckboxGroupProps extends RACCheckboxGroupProps, FieldOwnProps {
  /** The checkboxes within the group. */
  children?: ReactNode;

  /** Layout orientation of the checkboxes. @default 'vertical' */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Antares CheckboxGroup component. Renders a group meant to hold checkboxes with shared state.
 *
 * @param props - {@link CheckboxGroupProps}
 */
export function CheckboxGroup({
  children,
  className,
  errorMessage,
  label,
  orientation = 'vertical',
  description,
  ...rest
}: CheckboxGroupProps) {
  return (
    <Field as={RACCheckboxGroup} {...rest} className={cx(styles.checkboxGroup, className)}>
      <FieldLabel isRequired={rest.isRequired}>{label}</FieldLabel>
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
