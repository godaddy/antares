import { useContext } from 'react';
import {
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  type Key as RACKey,
  SelectValue as RACSelectValue
} from 'react-aria-components';
import { Field, type FieldOwnProps } from '#components/_internal/field';
import { FieldError } from '#components/field-error';
import { Label, Text } from '#components/text';
import { Content, Group, InGroupContext, type FieldSize } from '#components/structure';
import { ControlButton } from '#components/control-button';
import { Box } from '#components/layout/box';
import { Icon } from '#components/icon';
import { Popover } from '#components/popover';
import { ListBox, ListBoxItem, type ListBoxItemProps } from '#components/listbox';
import styles from './index.module.css';

type SelectionMode = 'single' | 'multiple';

function SelectTrigger({ variant }: { variant?: 'select' | 'control' }) {
  return (
    <ControlButton flex={1} gap="sm" data-variant={variant} className={styles.trigger}>
      <Box as={RACSelectValue} className={styles.value} flex={1} />
      <Icon icon="chevron-down" />
    </ControlButton>
  );
}

function SelectPopover<T extends object, M extends SelectionMode>({
  children
}: {
  children?: RACSelectProps<T, M>['children'];
}) {
  return (
    <Popover hideArrow>
      <Content blockPadding="xs" inlinePadding="0">
        <ListBox>{children}</ListBox>
      </Content>
    </Popover>
  );
}

export interface SelectProps<T, M extends SelectionMode = 'single'>
  extends Omit<RACSelectProps<T, M>, 'size'>,
    FieldOwnProps {
  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;
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
  const { label, description, errorMessage, children, size, ...racProps } = props;

  if (inGroup) {
    return (
      <RACSelect {...racProps}>
        <SelectTrigger />
        <SelectPopover>{children}</SelectPopover>
      </RACSelect>
    );
  }

  return (
    <Field as={RACSelect} size={size} {...racProps}>
      {label ? <Label>{label}</Label> : null}
      <Group alignItems="center">
        <SelectTrigger variant="select" />
      </Group>
      {description ? <Text slot="description">{description}</Text> : null}
      <FieldError>{errorMessage}</FieldError>
      <SelectPopover>{children}</SelectPopover>
    </Field>
  );
}

export interface FieldSelectProps<T extends object, M extends SelectionMode = 'single'> extends SelectProps<T, M> {}

/** Compatibility wrapper for {@link Select}. Prefer Select for new code. */
export function FieldSelect<T extends object, M extends SelectionMode = 'single'>(props: FieldSelectProps<T, M>) {
  return <Select {...props} />;
}

export interface SelectItemProps extends ListBoxItemProps {}

/** One option inside a Select. Thin wrapper over `ListBoxItem`. */
export function SelectItem(props: SelectItemProps) {
  return <ListBoxItem {...props} />;
}

export type SelectKey = RACKey;
