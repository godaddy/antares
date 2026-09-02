import { forwardRef, type ReactNode } from 'react';
import {
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  type SelectRenderProps as RACSelectRenderProps,
  type Key as RACKey,
  SelectValue as RACSelectValue,
  type SelectValueProps as RACSelectValueProps
} from 'react-aria-components';
import { Field, type FieldOwnProps, type FieldSize } from '#components/_internal/field';
import { Button } from '#components/button';
import { Icon } from '#components/icon';
import { ListBox, ListBoxItem, type ListBoxItemProps } from '#components/listbox';
import { Popover } from '#components/popover';
import { Content, Group } from '#components/structure';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

type SelectionMode = 'single' | 'multiple';

export interface SelectProps<T, M extends SelectionMode = 'single'>
  extends Omit<RACSelectProps<T, M>, 'children' | 'size' | 'items'>,
    FieldOwnProps {
  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;

  /** Whether Select renders a complete field or a control inside another field. @default 'default' */
  variant?: 'default' | 'control';

  /**
   * The interior: a `Label`, `SelectControl`, `SelectOptions` holding `SelectItem`s,
   * `Text slot="description"`, and `FieldError`. Pass a function to read state such as
   * `isOpen` while composing.
   */
  children: ReactNode | ((renderProps: RACSelectRenderProps) => ReactNode);
}

/**
 * Antares Select. Compose from `Label`, `SelectControl`, `SelectOptions` holding `SelectItem`s,
 * `Text slot="description"`, and `FieldError`. Use `variant="control"` to share another field's
 * `Group` without a second field shell.
 *
 * @param props - {@link SelectProps}
 *
 * @example
 * ```tsx
 * <Select placeholder="Pick a drink">
 *   <Label>Coffee</Label>
 *   <SelectControl />
 *   <SelectOptions>
 *     <SelectItem id="espresso">Espresso</SelectItem>
 *   </SelectOptions>
 * </Select>
 * ```
 */
export function Select<T extends object, M extends SelectionMode = 'single'>(props: SelectProps<T, M>) {
  const { children, size, variant = 'default', className, ...racProps } = props;
  const selectClass = composeClassName(className, styles.select);

  if (variant === 'control') {
    return (
      <RACSelect {...racProps} className={selectClass}>
        {children}
      </RACSelect>
    );
  }

  return (
    <Field as={RACSelect as typeof RACSelect<T, M>} interior="box" size={size} {...racProps} className={selectClass}>
      {children}
    </Field>
  );
}

export interface SelectControlProps {
  /** Whether this is the field's own trigger, or a control inside another field's `Group`. @default 'default' */
  variant?: 'default' | 'control';
}

/**
 * Preset trigger for `Select`: a `Button` showing the current `SelectValue` and a chevron
 * `Icon`, wrapped in a `Group` unless `variant="control"`.
 *
 * @param props - {@link SelectControlProps}
 */
export function SelectControl({ variant = 'default' }: SelectControlProps) {
  const button = (
    <Button slot={variant === 'control' ? 'control' : 'trigger'}>
      <SelectValue />
      <Icon icon="chevron-down" />
    </Button>
  );

  return variant === 'control' ? button : <Group alignItems="center">{button}</Group>;
}

export interface SelectOptionsProps {
  /** `SelectItem`s. */
  children: ReactNode;
}

/**
 * Preset popover for `Select`: a `Popover` with a `ListBox` holding the options.
 *
 * @param props - {@link SelectOptionsProps}
 */
export function SelectOptions({ children }: SelectOptionsProps) {
  return (
    <Popover hideArrow>
      <Content blockPadding="xs" inlinePadding="0">
        <ListBox>{children}</ListBox>
      </Content>
    </Popover>
  );
}

export interface SelectValueProps extends RACSelectValueProps<object> {}

/**
 * Displays the selected option, or the Select placeholder when no option is selected.
 */
export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(function SelectValue(props, ref) {
  const { className, ...rest } = props;

  return <RACSelectValue {...rest} ref={ref} className={composeClassName(className, styles.value)} />;
});

export interface SelectItemProps extends ListBoxItemProps {}

/** One option inside a Select. Thin wrapper over `ListBoxItem`. */
export function SelectItem(props: SelectItemProps) {
  return <ListBoxItem {...props} />;
}

export type SelectKey = RACKey;
