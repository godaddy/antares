import { cx } from 'cva';
import type { ReactNode } from 'react';
import {
  Button as RACButton,
  ListBox as RACListBox,
  ListBoxItem as RACListBoxItem,
  // Popover as RACPopover,
  Select as RACSelect,
  SelectValue as RACSelectValue,
  type Key,
  type ListBoxItemProps as RACListBoxItemProps,
  type SelectProps as RACSelectProps
} from 'react-aria-components';
import { FieldFrame, type FieldFrameProps } from '#components/_internal/field-frame';
import { Icon } from '#components/icon';
import { Popover } from '#components/popover';
import styles from './index.module.css';

type SelectionMode = 'single' | 'multiple';

/**
 * Props for the Select component. Wraps React Aria's Select with antares' FieldFrame
 * for label, description, and error message rendering.
 *
 * Either `label` or `aria-label` must be provided for accessibility.
 *
 * @typeParam T - Item type rendered inside the listbox.
 * @typeParam M - Selection mode. Drives the type of `value`, `defaultValue`, and `onChange`.
 */
export interface SelectProps<T extends object, M extends SelectionMode = 'single'>
  extends Omit<RACSelectProps<T, M>, 'children' | 'items'>,
    Pick<FieldFrameProps, 'description' | 'errorMessage' | 'label'> {
  /** SelectItem children. */
  children: ReactNode;

  /** Helper text shown below the frame. */
  description?: string;

  /** Error message shown when invalid. Use with `isInvalid`. */
  errorMessage?: string;

  /** Visible label above the frame. Required if `aria-label` is not provided. */
  label?: string;
}

/**
 * Antares Select. Single or multiple selection dropdown built on React Aria's Select,
 * laid out with FieldFrame so it matches TextField and NumberField.
 *
 * @example
 * ```tsx
 * <Select label="Coffee">
 *   <SelectItem id="espresso">Espresso</SelectItem>
 *   <SelectItem id="latte">Latte</SelectItem>
 * </Select>
 * ```
 */
export function Select<T extends object, M extends SelectionMode = 'single'>(props: SelectProps<T, M>) {
  const { label, description, errorMessage, children, className, ...racProps } = props;
  const { isDisabled, isRequired } = racProps;

  return (
    <RACSelect {...racProps} className={cx(styles.select, className)}>
      <FieldFrame
        description={description}
        errorMessage={errorMessage}
        isDisabled={isDisabled}
        isRequired={isRequired}
        label={label}
      >
        <RACButton data-trigger="" className={styles.trigger}>
          <RACSelectValue className={styles.value} />
          <Icon icon="chevron-down" className={styles.chevron} aria-hidden="true" />
        </RACButton>
      </FieldFrame>
      <Popover hideArrow className={styles.popover} contentProps={{ inlinePadding: '0' }}>
        <RACListBox className={styles.listbox}>{children}</RACListBox>
      </Popover>
    </RACSelect>
  );
}

/**
 * Props for SelectItem. Forwards every React Aria ListBoxItem prop.
 */
export interface SelectItemProps extends RACListBoxItemProps {}

/**
 * One option inside a Select. Auto-derives `textValue` from string children when not
 * provided, so typeahead and the trigger's selected-text display work without extra props.
 */
export function SelectItem(props: SelectItemProps) {
  const { textValue, children, className, ...rest } = props;
  return (
    <RACListBoxItem
      {...rest}
      textValue={textValue ?? (typeof children === 'string' ? children : undefined)}
      className={cx(styles.item, className)}
    >
      {children}
    </RACListBoxItem>
  );
}

export type { Key };
