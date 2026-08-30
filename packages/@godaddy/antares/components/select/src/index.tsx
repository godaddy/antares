import { forwardRef, isValidElement, type ReactNode, useContext } from 'react';
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
import { Content, Group, InGroupContext, type FieldSize } from '#components/structure';
import { ControlButton } from '#components/control-button';
import { Icon } from '#components/icon';
import { Popover } from '#components/popover';
import { ListBox, ListBoxItem, type ListBoxItemProps, type ListBoxProps } from '#components/listbox';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

type SelectionMode = 'single' | 'multiple';

function SelectTrigger({ variant }: { variant?: 'select' | 'control' }) {
  return (
    <ControlButton flex={1} gap="sm" variant={variant === 'select' ? 'select' : 'default'}>
      <SelectValue />
      <Icon icon="chevron-down" />
    </ControlButton>
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
 * The field primitives a composed interior is built from. Seeing one of these as a
 * direct child is what tells Select the children are an interior and not options.
 * Items are the open set (any component may render a SelectItem), so the closed set
 * of our own primitives is the side worth recognizing.
 */
const INTERIOR_PARTS = new Set<unknown>([Content, ControlButton, FieldError, Group, Label, ListBox, Popover, Text]);

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
  extends Omit<RACSelectProps<T, M>, 'children' | 'size'>,
    FieldOwnProps {
  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;

  /**
   * `SelectItem` options for the default layout, an interior composed from Label,
   * Group, ControlButton, SelectValue, Popover, Content, ListBox, Text, and
   * FieldError, or a function returning that interior.
   *
   * A function receives the current {@link SelectRenderProps}, which is the only way
   * to read state such as `isOpen` while composing.
   */
  children?: ReactNode | ((renderProps: SelectRenderProps) => ReactNode);
}

/**
 * Antares Select. Standalone it is a labeled field. Inside a {@link Group} it is
 * box-less (own Select provider only) so it can share a box with an {@link Input}.
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
  const inGroup = useContext(InGroupContext);
  const { label, description, errorMessage, children, size, className, ...racProps } = props;
  const selectClass = composeClassName(className, styles.select);

  // A composed interior owns everything inside, so Select only supplies the RAC root
  // (plus the field shell when it is not sharing someone else's Group).
  if (typeof children === 'function' || isComposedInterior(children)) {
    return inGroup ? (
      <RACSelect {...racProps} className={selectClass}>
        {children}
      </RACSelect>
    ) : (
      <Field as={RACSelect} size={size} {...racProps} className={selectClass}>
        {children}
      </Field>
    );
  }

  const options = children as ListBoxProps<T>['children'];

  if (inGroup) {
    return (
      <RACSelect {...racProps} className={selectClass}>
        <SelectTrigger />
        <SelectPopover>{options}</SelectPopover>
      </RACSelect>
    );
  }

  return (
    <Field as={RACSelect} size={size} {...racProps} className={selectClass}>
      {label ? <Label>{label}</Label> : null}
      <Group alignItems="center">
        <SelectTrigger variant="select" />
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
