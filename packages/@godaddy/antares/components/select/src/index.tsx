import { cx } from 'cva';
import {
  Select as RACSelect,
  SelectValue as RACSelectValue,
  type SelectProps as RACSelectProps
} from 'react-aria-components';
import { Button } from '#components/button';
import { FieldFrame, type FieldFrameProps } from '#components/_internal/field-frame';
import { Icon } from '#components/icon';
import { Popover } from '#components/popover';
import { ListBox, ListBoxItem, type ListBoxItemProps } from '#components/listbox';
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
export interface SelectProps<T, M extends SelectionMode = 'single'>
  extends RACSelectProps<T, M>,
    Pick<FieldFrameProps, 'description' | 'errorMessage' | 'label'> {}

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
    <RACSelect {...racProps}>
      <FieldFrame
        description={description}
        errorMessage={errorMessage}
        isDisabled={isDisabled}
        isRequired={isRequired}
        label={label}
      >
        <Button className={styles.button}>
          <RACSelectValue className={styles.value} />
          <Icon icon="chevron-down" className={styles.chevron} aria-hidden="true" />
        </Button>
      </FieldFrame>
      <Popover hideArrow contentProps={{ padding: '0' }} className={styles.popover}>
        <ListBox>{children}</ListBox>
      </Popover>
    </RACSelect>
  );
}

export type SelectItemProps = ListBoxItemProps;

/**
 * One option inside a Select. Thin wrapper over `ListBoxItem` so consumers can
 * read `<Select><SelectItem ... /></Select>` cohesively.
 */
export function SelectItem(props: SelectItemProps) {
  return <ListBoxItem {...props} />;
}
