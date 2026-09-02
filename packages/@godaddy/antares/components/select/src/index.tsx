import { forwardRef, type ReactNode } from 'react';
import {
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  type SelectRenderProps as RACSelectRenderProps,
  type Key as RACKey,
  SelectValue as RACSelectValue,
  type SelectValueProps as RACSelectValueProps
} from 'react-aria-components';
import {
  Field,
  mapFieldChildren,
  normalizeFieldChildren,
  type FieldOwnProps,
  type FieldSize,
  type FieldSlots
} from '#components/_internal/field';
import { Button } from '#components/button';
import { Icon } from '#components/icon';
import { ListBox, ListBoxItem, type ListBoxItemProps } from '#components/listbox';
import { Popover } from '#components/popover';
import { Content, Group } from '#components/structure';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

type SelectionMode = 'single' | 'multiple';

/** The interior `Select` fills in: its own trigger, and loose `SelectItem`s wrapped in the popover. */
function selectSlots(variant: 'default' | 'control'): FieldSlots {
  return {
    control: <SelectControl variant={variant} />,
    items: function wrapItems(items) {
      return <SelectOptions>{items}</SelectOptions>;
    }
  };
}

export interface SelectProps<T, M extends SelectionMode = 'single'>
  extends Omit<RACSelectProps<T, M>, 'children' | 'size' | 'items'>,
    FieldOwnProps {
  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;

  /** Whether Select renders a complete field or a control inside another field. @default 'default' */
  variant?: 'default' | 'control';

  /**
   * The interior: a `Label`, the `SelectItem`s, an optional `Text slot="description"` and
   * `FieldError`, and whichever of the trigger and the popover you want to customize. Pass a
   * function to read state such as `isOpen` while composing.
   */
  children: ReactNode | ((renderProps: RACSelectRenderProps) => ReactNode);
}

/**
 * Antares Select. Write the pieces you want to customize - a `Label`, the `SelectItem`s, a
 * `Text slot="description"`, a `FieldError`, or a `Group` / `Popover` interior of your own - and the
 * field fills in the trigger and wraps loose items in the popover, in the order you wrote them. Use
 * `variant="control"` to share another field's `Group` without a second field shell; its interior is
 * filled in the same way, with a trigger that carries no `Group` of its own.
 *
 * @param props - {@link SelectProps}
 *
 * @example
 * ```tsx
 * <Select placeholder="Pick a drink">
 *   <Label>Coffee</Label>
 *   <SelectItem id="espresso">Espresso</SelectItem>
 * </Select>
 * ```
 */
export function Select<T extends object, M extends SelectionMode = 'single'>(props: SelectProps<T, M>) {
  const { children, size, variant = 'default', className, ...racProps } = props;
  const selectClass = composeClassName(className, styles.select);

  if (variant === 'control') {
    return (
      <RACSelect {...racProps} className={selectClass}>
        {mapFieldChildren(children, function fillInterior(node) {
          return normalizeFieldChildren(node, selectSlots('control'));
        })}
      </RACSelect>
    );
  }

  return (
    <Field
      as={RACSelect as typeof RACSelect<T, M>}
      interior="box"
      size={size}
      slots={selectSlots('default')}
      {...racProps}
      className={selectClass}
    >
      {children}
    </Field>
  );
}

interface SelectControlProps {
  /** Whether this is the field's own trigger, or a control inside another field's `Group`. @default 'default' */
  variant?: 'default' | 'control';
}

/**
 * Preset trigger for `Select`: a `Button` showing the current `SelectValue` and a chevron
 * `Icon`, wrapped in a `Group` unless `variant="control"`. `Select` inserts it when the interior has
 * no control of its own. Compose a `Group` with a `Button slot="trigger"` to replace it.
 *
 * @param props - {@link SelectControlProps}
 */
function SelectControl({ variant = 'default' }: SelectControlProps) {
  const button = (
    <Button slot={variant === 'control' ? 'control' : 'trigger'}>
      <SelectValue />
      <Icon icon="chevron-down" />
    </Button>
  );

  return variant === 'control' ? button : <Group alignItems="center">{button}</Group>;
}

interface SelectOptionsProps {
  /** `SelectItem`s. */
  children: ReactNode;
}

/**
 * Preset popover for `Select`: a `Popover` with a `ListBox` holding the options. `Select` wraps loose
 * `SelectItem`s in it. Compose `Popover` to replace it.
 *
 * @param props - {@link SelectOptionsProps}
 */
function SelectOptions({ children }: SelectOptionsProps) {
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
