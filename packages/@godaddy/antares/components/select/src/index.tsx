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
import { classifySelectChildren } from './classify-select-children.tsx';
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
   * Semi-composed: `Label`, `SelectItem`s, `Text slot="description"`, `FieldError`.
   * Composed: full interior with `Group`, `Button`, `Popover`, and `ListBox`.
   */
  children: ReactNode | ((renderProps: RACSelectRenderProps) => ReactNode);
}

function DefaultSelectInterior({
  label,
  description,
  error,
  items,
  withGroup
}: {
  label: ReactNode[];
  description: ReactNode[];
  error: ReactNode[];
  items: ReactNode[];
  withGroup: boolean;
}) {
  const face = withGroup ? (
    <Button slot="trigger">
      <SelectValue />
      <Icon icon="chevron-down" />
    </Button>
  ) : (
    <Button slot="control">
      <SelectValue />
      <Icon icon="chevron-down" />
    </Button>
  );

  return (
    <>
      {label}
      {withGroup ? <Group alignItems="center">{face}</Group> : face}
      {description}
      {error}
      <Popover hideArrow>
        <Content blockPadding="xs" inlinePadding="0">
          <ListBox>{items}</ListBox>
        </Content>
      </Popover>
    </>
  );
}

function renderSelectChildren(
  children: SelectProps<object>['children'],
  withGroup: boolean
): ReactNode | ((renderProps: RACSelectRenderProps) => ReactNode) {
  const classified = classifySelectChildren(children);
  if (classified.mode === 'composed') return classified.children;

  return (
    <DefaultSelectInterior
      label={classified.label}
      description={classified.description}
      error={classified.error}
      items={classified.items}
      withGroup={withGroup}
    />
  );
}

/**
 * Antares Select. Default usage is semi-composed (`Label` + items). Pass a full interior
 * (`Group`, `Button`, `Popover`, `ListBox`) when you need to customize layout. Use
 * `variant="control"` to share another field's Group without a second field shell.
 *
 * @param props - {@link SelectProps}
 *
 * @example
 * ```tsx
 * <Select placeholder="Pick a drink">
 *   <Label>Coffee</Label>
 *   <SelectItem id="espresso">Espresso</SelectItem>
 *   <Text slot="description">Select your favorite coffee</Text>
 * </Select>
 * ```
 */
export function Select<T extends object, M extends SelectionMode = 'single'>(props: SelectProps<T, M>) {
  const { children, size, variant = 'default', className, ...racProps } = props;
  const selectClass = composeClassName(className, styles.select);
  const interior = renderSelectChildren(children, variant !== 'control');

  if (variant === 'control') {
    return (
      <RACSelect {...racProps} className={selectClass}>
        {interior}
      </RACSelect>
    );
  }

  return (
    <Field as={RACSelect as typeof RACSelect<T, M>} interior="box" size={size} {...racProps} className={selectClass}>
      {interior}
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
