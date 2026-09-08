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
import { Field, type FieldOwnProps } from '#components/_internal/field';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import type { GroupProps } from '#components/structure';
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
 * Presentational checkbox indicator (box + check/minus glyph).
 * Decorative (`aria-hidden`); carries its own selected/indeterminate data attrs for use outside Checkbox.
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
 * Checkbox with an associated label.
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

/** Layout an item `Group` inherits. `presentation` keeps it out of the checkboxgroup's a11y tree. */
function itemGroup(orientation: 'horizontal' | 'vertical'): GroupProps {
  const horizontal = orientation === 'horizontal';

  return { role: 'presentation', direction: horizontal ? 'row' : 'column', gap: horizontal ? 'lg' : 'md' };
}

export interface CheckboxGroupProps extends Omit<RACCheckboxGroupProps, 'children'>, FieldOwnProps {
  /** Layout axis for the checkbox items. @default 'vertical' */
  orientation?: 'horizontal' | 'vertical';

  /** Field interior (`Label`, checkboxes, description, `FieldError`). */
  children: ReactNode | ((renderProps: RACCheckboxGroupRenderProps) => ReactNode);
}

/**
 * Checkbox group. Compose `Label`, a `Group` of checkboxes, description, and `FieldError`. The
 * `Group` picks up its axis, gap, and presentational role from `orientation`.
 *
 * @example
 * ```tsx
 * <CheckboxGroup>
 *   <Label>Favorite colors</Label>
 *   <Group>
 *     <Checkbox value="blue">Blue</Checkbox>
 *   </Group>
 *   <FieldError />
 * </CheckboxGroup>
 * ```
 */
export function CheckboxGroup({ children, className, orientation = 'vertical', ...rest }: CheckboxGroupProps) {
  return (
    <Field
      as={RACCheckboxGroup}
      data-orientation={orientation}
      slotDefaults={{ group: itemGroup(orientation) }}
      {...rest}
      className={composeClassName(className, styles.checkboxGroup)}
    >
      {children}
    </Field>
  );
}
