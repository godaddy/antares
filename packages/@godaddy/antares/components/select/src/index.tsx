import { forwardRef, type ReactNode, useContext } from 'react';
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

/** State passed to a composed Select interior. */
export interface SelectRenderProps extends RACSelectRenderProps {}

export interface SelectProps<T, M extends SelectionMode = 'single'>
  extends Omit<RACSelectProps<T, M>, 'children' | 'size'>,
    FieldOwnProps {
  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;

  /**
   * The options to choose from, rendered by the default layout.
   *
   * Pass a function instead to compose the whole interior yourself out of Label,
   * Group, ControlButton, SelectValue, Popover, Content, ListBox, Text, and
   * FieldError. It receives the current {@link SelectRenderProps}.
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
 * ```
 */
export function Select<T extends object, M extends SelectionMode = 'single'>(props: SelectProps<T, M>) {
  const inGroup = useContext(InGroupContext);
  const { label, description, errorMessage, children, size, className, ...racProps } = props;
  const isComposed = typeof children === 'function';

  if (inGroup) {
    return (
      <RACSelect {...racProps} className={composeClassName(className, styles.select)}>
        {isComposed ? (
          children
        ) : (
          <>
            <SelectTrigger />
            <SelectPopover>{children}</SelectPopover>
          </>
        )}
      </RACSelect>
    );
  }

  return (
    <Field as={RACSelect} size={size} {...racProps} className={composeClassName(className, styles.select)}>
      {isComposed ? (
        children
      ) : (
        <>
          {label ? <Label>{label}</Label> : null}
          <Group alignItems="center">
            <SelectTrigger variant="select" />
          </Group>
          {description ? <Text slot="description">{description}</Text> : null}
          <FieldError>{errorMessage}</FieldError>
          <SelectPopover>{children}</SelectPopover>
        </>
      )}
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
