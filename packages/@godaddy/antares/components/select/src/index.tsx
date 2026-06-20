import { Select as RACSelect, type SelectProps as RACSelectProps, type Key as RACKey } from 'react-aria-components';
import {
  Field,
  FieldSelectFragment,
  type FieldSelectFragmentProps,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  type FieldOwnProps,
  type FieldSize
} from '#components/field';
import { Popover } from '#components/popover';
import { ListBox, ListBoxItem, type ListBoxItemProps } from '#components/listbox';

type SelectionMode = 'single' | 'multiple';

type FieldSelectTriggerProps<T extends object, M extends SelectionMode> = Omit<FieldSelectFragmentProps, 'children'> & {
  children?: RACSelectProps<T, M>['children'];
};

// Trigger (value + chevron), popover, and listbox — no Select provider. Rendered inside
// whichever Select wraps it (the public Select, or FieldSelect's own). Wrapping the listbox
// in a component is collection-safe: RAC builds the collection by rendering children.
function FieldSelectTrigger<T extends object, M extends SelectionMode = 'single'>({
  children,
  ...props
}: FieldSelectTriggerProps<T, M>) {
  return (
    <>
      <FieldSelectFragment {...props} />
      <Popover hideArrow contentProps={{ inlinePadding: '0', blockPadding: 'xs' }}>
        <ListBox>{children}</ListBox>
      </Popover>
    </>
  );
}

export interface FieldSelectProps<T extends object, M extends SelectionMode = 'single'>
  extends Omit<RACSelectProps<T, M>, 'className'> {
  /** Additional class names merged onto the Select wrapper. */
  className?: string;
}

/**
 * Box-less select for a {@link FieldGroup}.
 * Brings its own Select provider but no field/label/description/error wrapper, so it composes
 * inside a shared box (e.g. amount input + currency select). Give it an `aria-label`. For a
 * standalone, fully-decorated select use {@link Select}.
 *
 * @example
 * ```tsx
 * <FieldGroup aria-labelledby={priceLabelId}>
 *   <FieldInput aria-label="Amount" />
 *   <FieldSelect aria-label="Currency" defaultValue="usd">
 *     <SelectItem id="usd">USD</SelectItem>
 *   </FieldSelect>
 * </FieldGroup>
 * ```
 */
export function FieldSelect<T extends object, M extends SelectionMode = 'single'>(props: FieldSelectProps<T, M>) {
  const { children, ...selectProps } = props;

  return (
    <RACSelect {...selectProps}>
      <FieldSelectTrigger<T, M>>{children}</FieldSelectTrigger>
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
        <FieldSelectTrigger<T, M> variant="select">{children}</FieldSelectTrigger>
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
