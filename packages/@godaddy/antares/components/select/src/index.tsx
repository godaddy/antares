import { cx } from 'cva';
import {
  Select as RACSelect,
  SelectValue as RACSelectValue,
  type SelectProps as RACSelectProps,
  type Key as RACKey
} from 'react-aria-components';
import {
  Field,
  FieldButton,
  type FieldButtonProps,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  type FieldOwnProps,
  type FieldSize
} from '#components/field';
import { Icon } from '#components/icon';
import { Popover } from '#components/popover';
import { ListBox, ListBoxItem, type ListBoxItemProps } from '#components/listbox';
import styles from './index.module.css';

type SelectionMode = 'single' | 'multiple';

type FieldSelectTriggerProps<T extends object, M extends SelectionMode> = Omit<FieldButtonProps, 'children'> & {
  children?: RACSelectProps<T, M>['children'];
};

// Trigger (value + chevron), popover, and listbox — no Select provider. Rendered inside
// whichever Select wraps it (the public Select, or FieldSelect's own). Wrapping the listbox
// in a component is collection-safe: RAC builds the collection by rendering children.
function FieldSelectTrigger<T extends object, M extends SelectionMode = 'single'>({
  children,
  ...buttonProps
}: FieldSelectTriggerProps<T, M>) {
  return (
    <>
      <FieldButton justifyContent="space-between" {...buttonProps}>
        <RACSelectValue className={styles.selectValue} />
        <Icon icon="chevron-down" className={styles.selectIcon} />
      </FieldButton>
      <Popover hideArrow contentProps={{ inlinePadding: '0', blockPadding: 'xs' }}>
        <ListBox>{children}</ListBox>
      </Popover>
    </>
  );
}

export interface FieldSelectProps<T extends object, M extends SelectionMode = 'single'>
  extends Omit<RACSelectProps<T, M>, 'className' | 'children'> {
  /** Additional class names merged onto the Select wrapper. */
  className?: string;

  /** Position within a {@link FieldGroup}. Omit for a lone control (both edges round). */
  edge?: FieldButtonProps['edge'];

  /** Forwarded to the trigger. Pass `flex={1}` to fill the group (a lone select). */
  flex?: FieldButtonProps['flex'];

  /** The options, e.g. `<SelectItem>`. */
  children?: RACSelectProps<T, M>['children'];
}

/**
 * Box-less select for a {@link FieldGroup} — the select-flavored analog of {@link FieldButton}.
 * Brings its own Select provider but no field/label/description/error wrapper, so it composes
 * inside a shared box (e.g. amount input + currency select). Give it an `aria-label`. For a
 * standalone, fully-decorated select use {@link Select}.
 *
 * @example
 * ```tsx
 * <FieldGroup aria-labelledby={priceLabelId}>
 *   <Input edge="start" aria-label="Amount" />
 *   <FieldSelect edge="end" aria-label="Currency" defaultValue="usd">
 *     <SelectItem id="usd">USD</SelectItem>
 *   </FieldSelect>
 * </FieldGroup>
 * ```
 */
export function FieldSelect<T extends object, M extends SelectionMode = 'single'>(props: FieldSelectProps<T, M>) {
  const { edge, flex, children, className, ...selectProps } = props;

  // RACSelect stays the outer element to keep its <T, M> generics (Flex as={RACSelect} drops
  // them); display: contents keeps the trigger button as the FieldGroup's direct flex child.
  return (
    <RACSelect {...selectProps} className={cx(styles.fieldSelect, className)}>
      <FieldSelectTrigger<T, M> edge={edge} flex={flex}>
        {children}
      </FieldSelectTrigger>
    </RACSelect>
  );
}

export interface SelectProps<T, M extends SelectionMode = 'single'>
  extends Omit<RACSelectProps<T, M>, 'className' | 'size'>,
    FieldOwnProps {
  /** Additional class names applied to the field root. */
  className?: string;

  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;
}

/**
 * Antares Select. Single or multiple selection dropdown built on React Aria's Select, laid
 * out with the field primitives. Keeps the Select provider at the field root so React Aria
 * wires label/description/error automatically; shares its trigger with {@link FieldSelect}.
 * For a box-less select inside a shared {@link FieldGroup}, use {@link FieldSelect}.
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
  const { label, description, errorMessage, children, size, ...racProps } = props;
  const { isDisabled, isRequired } = racProps;

  return (
    <Field as={RACSelect} {...racProps}>
      <FieldLabel isRequired={isRequired}>{label}</FieldLabel>
      <FieldGroup isDisabled={isDisabled} size={size} alignItems="center">
        <FieldSelectTrigger<T, M> flex={1}>{children}</FieldSelectTrigger>
      </FieldGroup>
      <FieldDescription>{description}</FieldDescription>
      <FieldError>{errorMessage}</FieldError>
    </Field>
  );
}

export interface SelectItemProps extends ListBoxItemProps {}

/** One option inside a Select. Thin wrapper over `ListBoxItem`. */
export function SelectItem(props: SelectItemProps) {
  return <ListBoxItem {...props} />;
}

export type SelectKey = RACKey;
