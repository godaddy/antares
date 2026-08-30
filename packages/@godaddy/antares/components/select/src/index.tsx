import {
  forwardRef,
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
  type RefAttributes,
  useContext
} from 'react';
import {
  Select as RACSelect,
  type SelectProps as RACSelectProps,
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

export interface SelectProps<T, M extends SelectionMode = 'single'>
  extends Omit<RACSelectProps<T, M>, 'children' | 'size'>,
    FieldOwnProps {
  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;

  /** Options shown in the popover. */
  options?: ListBoxProps<T>['children'];

  /**
   * Composed interior (Label, Group, ControlButton, SelectValue, Popover, Content,
   * ListBox, Text, FieldError). When set, the default layout is not rendered.
   */
  children?: ReactNode;
}

/**
 * Antares Select. Standalone it is a labeled field. Inside a {@link Group} it is
 * box-less (own Select provider only) so it can share a box with an {@link Input}.
 *
 * @example
 * ```tsx
 * <Select label="Coffee" options={<SelectItem id="espresso">Espresso</SelectItem>} />
 * ```
 */
export function Select<T extends object, M extends SelectionMode = 'single'>(props: SelectProps<T, M>) {
  const inGroup = useContext(InGroupContext);
  const { label, description, errorMessage, children, options, size, className, ...racProps } = props;

  if (inGroup) {
    return (
      <RACSelect {...racProps} className={composeClassName(className, styles.select)}>
        {children ?? (
          <>
            <SelectTrigger />
            <SelectPopover>{options}</SelectPopover>
          </>
        )}
      </RACSelect>
    );
  }

  return (
    <Field as={RACSelect} size={size} {...racProps} className={composeClassName(className, styles.select)}>
      {children ?? (
        <>
          {label ? <Label>{label}</Label> : null}
          <Group alignItems="center">
            <SelectTrigger variant="select" />
          </Group>
          {description ? <Text slot="description">{description}</Text> : null}
          <FieldError>{errorMessage}</FieldError>
          <SelectPopover>{options}</SelectPopover>
        </>
      )}
    </Field>
  );
}

export interface SelectValueProps<T extends object = object> extends RACSelectValueProps<T> {}

/**
 * Displays the selected option, or the Select placeholder when no option is selected.
 */
export const SelectValue = forwardRef(function SelectValue<T extends object = object>(
  props: SelectValueProps<T>,
  ref: ForwardedRef<HTMLSpanElement>
) {
  const { className, ...rest } = props;

  return <RACSelectValue {...rest} ref={ref} className={composeClassName(className, styles.value)} />;
}) as <T extends object = object>(props: SelectValueProps<T> & RefAttributes<HTMLSpanElement>) => ReactElement;

export interface SelectItemProps extends ListBoxItemProps {}

/** One option inside a Select. Thin wrapper over `ListBoxItem`. */
export function SelectItem(props: SelectItemProps) {
  return <ListBoxItem {...props} />;
}

export type SelectKey = RACKey;
