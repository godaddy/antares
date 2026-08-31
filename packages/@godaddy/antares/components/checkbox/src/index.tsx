import type { ReactNode } from 'react';
import {
  CheckboxButton as RACCheckboxButton,
  type CheckboxButtonProps as RACCheckboxButtonProps,
  CheckboxField as RACCheckboxField,
  type CheckboxFieldProps as RACCheckboxFieldProps,
  CheckboxGroup as RACCheckboxGroup,
  type CheckboxGroupProps as RACCheckboxGroupProps,
  type CheckboxGroupRenderProps as RACCheckboxGroupRenderProps
} from 'react-aria-components';
import { Field, isComposedInterior, type FieldOwnProps } from '#components/_internal/field';
import { FieldError } from '#components/field-error';
import { Label } from '#components/label';
import { Text } from '#components/text';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { Icon } from '#components/icon';
import { cx } from 'cva';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

export interface CheckboxIndicatorProps {
  /** Whether the control is selected. */
  isSelected?: boolean;

  /** Whether the control is in an indeterminate state. */
  isIndeterminate?: boolean;

  /** Additional CSS class for the indicator. */
  className?: string;
}

/**
 * Presentational checkbox indicator: the box plus its check/minus glyph.
 *
 * Decorative by default (`aria-hidden`) - the surrounding control owns
 * interaction and accessibility. It carries its own `data-selected` /
 * `data-indeterminate` so it renders correctly outside an interactive
 * `Checkbox` (e.g. as a selection indicator inside a menu item).
 *
 * @param props - {@link CheckboxIndicatorProps}
 */
export function CheckboxIndicator({ isSelected, isIndeterminate, className }: CheckboxIndicatorProps) {
  return (
    <Flex
      aria-hidden="true"
      alignItems="center"
      justifyContent="center"
      data-selected={isSelected || undefined}
      data-indeterminate={isIndeterminate || undefined}
      className={cx(styles.indicator, className)}
    >
      {isIndeterminate ? (
        <Icon icon="minus" className={styles.indeterminateIcon} aria-hidden="true" />
      ) : (
        isSelected && <Icon icon="checkmark" className={styles.selectedIcon} aria-hidden="true" />
      )}
    </Flex>
  );
}

interface CheckboxButtonProps extends Omit<RACCheckboxButtonProps, 'className' | 'children'>, Omit<FlexOwnProps, 'as'> {
  children?: RACCheckboxButtonProps['children'];
  className?: string;
}

function CheckboxButton(props: CheckboxButtonProps) {
  const { className, children, ...rest } = props;

  return (
    <Flex {...rest} as={RACCheckboxButton} className={composeClassName(className, styles.checkbox)}>
      {children}
    </Flex>
  );
}

export interface CheckboxProps extends Omit<RACCheckboxFieldProps, 'children'>, FlexOwnProps {
  /** Label text shown next to the indicator. */
  children?: ReactNode;
}

/**
 * Antares Checkbox component. Renders a checkbox input with an associated label.
 *
 * @param props - {@link CheckboxProps}
 */
export function Checkbox(props: CheckboxProps) {
  const { children, ...rest } = props;

  return (
    <Flex {...rest} as={RACCheckboxField}>
      <CheckboxButton>
        {function renderCheckbox({ isSelected, isIndeterminate }) {
          return (
            <Flex alignItems="center" gap="sm">
              <CheckboxIndicator isSelected={isSelected} isIndeterminate={isIndeterminate} />
              {children}
            </Flex>
          );
        }}
      </CheckboxButton>
    </Flex>
  );
}

const GROUP_INTERIOR_PARTS = new Set<unknown>([FieldError, Label, Text]);

export interface CheckboxGroupProps extends Omit<RACCheckboxGroupProps, 'children'>, FieldOwnProps {
  /** Item checkboxes, or a composed interior. */
  children?: ReactNode | ((renderProps: RACCheckboxGroupRenderProps) => ReactNode);

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
  const classNames = composeClassName(className, styles.checkboxGroup);

  if (typeof children === 'function' || isComposedInterior(children, GROUP_INTERIOR_PARTS)) {
    return (
      <Field as={RACCheckboxGroup} {...rest} className={classNames}>
        {children}
      </Field>
    );
  }

  return (
    <Field as={RACCheckboxGroup} {...rest} className={classNames}>
      {label ? <Label>{label}</Label> : null}
      <Flex
        direction={orientation === 'horizontal' ? 'row' : 'column'}
        gap={orientation === 'horizontal' ? 'lg' : 'md'}
      >
        {children}
      </Flex>
      {description ? <Text slot="description">{description}</Text> : null}
      <FieldError>{errorMessage}</FieldError>
    </Field>
  );
}
