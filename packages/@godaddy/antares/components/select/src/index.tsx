import { forwardRef, type ReactNode } from 'react';
import {
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  type SelectRenderProps as RACSelectRenderProps,
  type Key as RACKey,
  SelectValue as RACSelectValue,
  type SelectValueProps as RACSelectValueProps
} from 'react-aria-components';
import { Field, type FieldOwnProps } from '#components/_internal/field';
import type { FieldSize } from '#components/structure';
import { ListBoxItem, type ListBoxItemProps } from '#components/listbox';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

type SelectionMode = 'single' | 'multiple';

/** State passed to a composed Select interior. */
export interface SelectRenderProps extends RACSelectRenderProps {}

export interface SelectProps<T, M extends SelectionMode = 'single'>
  extends Omit<RACSelectProps<T, M>, 'children' | 'size' | 'items'>,
    FieldOwnProps {
  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;

  /** Whether Select renders a complete field or a control inside another field. @default 'default' */
  variant?: 'default' | 'control';

  /**
   * The interior: `Label`, `Group` with a `Button` (`SelectValue` plus an `Icon`), `Popover`
   * with `Content` and `ListBox` holding `SelectItem`s, `Text slot="description"`, and
   * `FieldError`. Pass a function to read state such as `isOpen` while composing.
   */
  children: ReactNode | ((renderProps: SelectRenderProps) => ReactNode);
}

/**
 * Antares Select. By default it is a labeled field. Use `variant="control"` to
 * share another field's {@link Group} without rendering a second field shell.
 *
 * @param props - {@link SelectProps}
 *
 * @example
 * ```tsx
 * <Select>
 *   <Label>Coffee</Label>
 *   <Group alignItems="center">
 *     <Button variant="trigger">
 *       <SelectValue />
 *       <Icon icon="chevron-down" />
 *     </Button>
 *   </Group>
 *   <Popover hideArrow>
 *     <Content blockPadding="xs" inlinePadding="0">
 *       <ListBox>
 *         <SelectItem id="espresso">Espresso</SelectItem>
 *       </ListBox>
 *     </Content>
 *   </Popover>
 * </Select>
 *
 * <Select>{({ isOpen }) => <>{'…'}</>}</Select>
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
    <Field as={RACSelect as typeof RACSelect<T, M>} size={size} {...racProps} className={selectClass}>
      {children}
    </Field>
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
