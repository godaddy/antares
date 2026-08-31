import { forwardRef, isValidElement, type ReactNode } from 'react';
import {
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  type SelectRenderProps as RACSelectRenderProps,
  type Key as RACKey,
  SelectValue as RACSelectValue,
  type SelectValueProps as RACSelectValueProps
} from 'react-aria-components';
import { Field, type FieldOwnProps } from '#components/_internal/field';
import { FieldError } from '#components/field-error';
import { Label } from '#components/label';
import { Text } from '#components/text';
import { Content, Group, type FieldSize } from '#components/structure';
import { Button } from '#components/button';
import { Icon } from '#components/icon';
import { Popover } from '#components/popover';
import { ListBox, ListBoxItem, type ListBoxItemProps, type ListBoxProps } from '#components/listbox';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

type SelectionMode = 'single' | 'multiple';

function SelectTrigger({ variant = 'trigger' }: { variant?: 'trigger' | 'control' }) {
  return (
    <Button variant={variant}>
      <SelectValue />
      <Icon icon="chevron-down" />
    </Button>
  );
}

function SelectPopover<T extends object>({ children }: { children?: ListBoxProps<T>['children'] }) {
  return (
    <Popover hideArrow>
      <Content blockPadding="xs" inlinePadding="0">
        <ListBox>{children}</ListBox>
      </Content>
    </Popover>
  );
}

/**
 * The components a composed interior is built from. Seeing one of these as a
 * direct child is what tells Select the children are an interior and not options.
 * Items are the open set (any component may render a SelectItem), so the closed set
 * of our own components is the side worth recognizing.
 */
const INTERIOR_PARTS = new Set<unknown>([Button, Content, FieldError, Group, Label, ListBox, Popover, Text]);

function isComposedInterior(children: ReactNode): boolean {
  if (Array.isArray(children)) {
    return children.some(function containsInteriorPart(child) {
      return isComposedInterior(child);
    });
  }

  if (!isValidElement(children)) {
    return false;
  }

  if (INTERIOR_PARTS.has(children.type)) {
    return true;
  }

  // Built-ins such as Fragment carry a symbol type rather than a component, so look
  // through them to reach the parts a consumer actually wrote.
  return typeof children.type === 'symbol' && isComposedInterior((children.props as { children?: ReactNode }).children);
}

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
   * `SelectItem` options for the default layout, an interior composed from Label,
   * Group, Button, SelectValue, Popover, Content, ListBox, Text, and
   * FieldError, or a function returning that interior.
   *
   * A function receives the current {@link SelectRenderProps}, which is the only way
   * to read state such as `isOpen` while composing.
   */
  children?: ReactNode | ((renderProps: SelectRenderProps) => ReactNode);
}

/**
 * Antares Select. By default it is a labeled field. Use `variant="control"` to
 * share another field's {@link Group} without rendering a second field shell.
 *
 * @example
 * ```tsx
 * <Select label="Coffee">
 *   <SelectItem id="espresso">Espresso</SelectItem>
 * </Select>
 *
 * <Select>
 *   <Label>Coffee</Label>
 *   <Group>{'…'}</Group>
 *   <Popover>{'…'}</Popover>
 * </Select>
 *
 * <Select>{({ isOpen }) => <>{'…'}</>}</Select>
 * ```
 */
export function Select<T extends object, M extends SelectionMode = 'single'>(props: SelectProps<T, M>) {
  const { label, description, errorMessage, children, size, variant = 'default', className, ...racProps } = props;
  const selectClass = composeClassName(className, styles.select);

  // A composed interior owns everything inside, so Select only supplies the RAC root
  // (plus the field shell for the default variant).
  if (typeof children === 'function' || isComposedInterior(children)) {
    return variant === 'control' ? (
      <RACSelect {...racProps} className={selectClass}>
        {children}
      </RACSelect>
    ) : (
      <Field as={RACSelect as typeof RACSelect<T, M>} size={size} {...racProps} className={selectClass}>
        {children}
      </Field>
    );
  }

  const options = children as ListBoxProps<T>['children'];

  if (variant === 'control') {
    return (
      <RACSelect {...racProps} className={selectClass}>
        <SelectTrigger variant="control" />
        <SelectPopover>{options}</SelectPopover>
      </RACSelect>
    );
  }

  return (
    <Field as={RACSelect as typeof RACSelect<T, M>} size={size} {...racProps} className={selectClass}>
      {label ? <Label>{label}</Label> : null}
      <Group alignItems="center">
        <SelectTrigger />
      </Group>
      {description ? <Text slot="description">{description}</Text> : null}
      <FieldError>{errorMessage}</FieldError>
      <SelectPopover>{options}</SelectPopover>
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
