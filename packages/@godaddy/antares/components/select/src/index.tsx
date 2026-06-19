import {
  Select as RACSelect,
  SelectValue as RACSelectValue,
  type SelectProps as RACSelectProps,
  type Key as RACKey
} from 'react-aria-components';
import {
  Field,
  FieldButton,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  type FieldOwnProps
} from '#components/_internal/field';
import { Icon } from '#components/icon';
import { Popover } from '#components/popover';
import { ListBox, ListBoxItem, type ListBoxItemProps } from '#components/listbox';
import styles from './index.module.css';

type SelectionMode = 'single' | 'multiple';

export interface SelectProps<T, M extends SelectionMode = 'single'> extends RACSelectProps<T, M>, FieldOwnProps {}

/**
 * Antares Select. Single or multiple selection dropdown built on React Aria's Select,
 * laid out with the field primitives so it matches TextField and NumberField.
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
    <Field as={RACSelect} {...racProps}>
      <FieldLabel isRequired={isRequired}>{label}</FieldLabel>
      <FieldGroup isDisabled={isDisabled} alignItems="center">
        <FieldButton
          flex={1}
          justifyContent="space-between"
          data-field-group-start
          data-field-group-middle
          data-field-group-end
        >
          <RACSelectValue className={styles.selectValue} />
          <Icon icon="chevron-down" className={styles.selectIcon} />
        </FieldButton>
      </FieldGroup>
      <FieldDescription>{description}</FieldDescription>
      <FieldError>{errorMessage}</FieldError>

      <Popover hideArrow contentProps={{ inlinePadding: '0', blockPadding: 'xs' }}>
        <ListBox>{children}</ListBox>
      </Popover>
    </Field>
  );
}

export interface SelectItemProps extends ListBoxItemProps {}

/**
 * One option inside a Select. Thin wrapper over `ListBoxItem` so consumers can
 * read `<Select><SelectItem ... /></Select>` cohesively.
 */
export function SelectItem(props: SelectItemProps) {
  return <ListBoxItem {...props} />;
}

export type SelectKey = RACKey;
