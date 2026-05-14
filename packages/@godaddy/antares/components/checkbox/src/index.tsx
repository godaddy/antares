import type { ReactNode } from 'react';
import {
  FieldError as RACFieldError,
  Label as RACLabel,
  Checkbox as RACCheckbox,
  type CheckboxProps as RACCheckboxProps,
  CheckboxGroup as RACCheckboxGroup,
  type CheckboxGroupProps as RACCheckboxGroupProps
} from 'react-aria-components';
import { Box } from '#components/layout/box';
import { Flex } from '#components/layout/flex';
import { Icon } from '#components/icon';
import { Text } from '#components/text';
import { cx } from 'cva';
import styles from './index.module.css';

export interface CheckboxProps extends RACCheckboxProps {
  /** The content of the checkbox label. */
  children?: ReactNode;

  /** Additional class names to apply to the checkbox component. */
  className?: string;
}

export interface CheckboxGroupProps extends RACCheckboxGroupProps {
  /** The checkboxes within the group. */
  children?: ReactNode;

  /** Additional class names to apply to the checkbox group container. */
  className?: string;

  /** An error message to display below the group. */
  errorMessage?: string;

  /** The directionality of the checkbox group. @default 'column' */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';

  /** The label for the checkbox group. */
  label?: string;

  /** A description for the checkbox group. */
  description?: string;
}

/**
 * Antares Checkbox component. Renders a checkbox input with an associated label.
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
 * Antares CheckboxGroup component. Renders a group meant to hold checkboxes with shared state.
 *
 * @param props - {@link CheckboxGroupProps}
 */
export function CheckboxGroup(props: CheckboxGroupProps) {
  const { children, className, errorMessage, label, direction = 'column', description, ...rest } = props;

  return (
    <Flex as={RACCheckboxGroup} {...rest} className={cx(styles.checkboxGroup, className)} direction="column" gap="sm">
      {label && (
        <RACLabel className={cx(styles.label, props.isRequired && styles['label--required'])}>{label}</RACLabel>
      )}
      <Flex direction={direction} gap={direction === 'row' || direction === 'row-reverse' ? 'lg' : 'md'}>
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
  );
}
