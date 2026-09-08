import { forwardRef, useContext, type ReactNode } from 'react';
import {
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  type SelectRenderProps as RACSelectRenderProps,
  type Key as RACKey,
  SelectValue as RACSelectValue,
  type SelectValueProps as RACSelectValueProps,
  useSlottedContext
} from 'react-aria-components';
import { Field, FieldSlots, mapFieldChildren, type FieldOwnProps, type FieldSize } from '#components/_internal/field';
import { ButtonContext, type ButtonProps } from '#components/button';
import { Icon } from '#components/icon';
import { ListBox, ListBoxItem, type ListBoxItemProps, type ListBoxProps } from '#components/listbox';
import { Popover, type PopoverProps } from '#components/popover';
import { Content, GroupContext } from '#components/structure';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

type SelectionMode = 'single' | 'multiple';

/** Selected value beside a chevron. Declared as a component so it can precede `SelectValue`. */
function TriggerFace() {
  return (
    <>
      <SelectValue />
      <Icon icon="chevron-down" />
    </>
  );
}

/** Face for a `Button slot="trigger"` left empty. Local children replace it. */
const TRIGGER_SLOTS = { trigger: { children: <TriggerFace /> } };

export interface SelectProps<T, M extends SelectionMode = 'single'>
  extends Omit<RACSelectProps<T, M>, 'children' | 'size' | 'items'>,
    FieldOwnProps {
  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;

  /** Complete field, or a control inside another field's Group. @default 'default' */
  variant?: 'default' | 'control';

  /** Field interior. Pass a function to read render props such as `isOpen`. */
  children: ReactNode | ((renderProps: RACSelectRenderProps) => ReactNode);
}

/**
 * Select field. Compose `Label`, a `Button slot="trigger"`, `SelectOptions`, description, and
 * `FieldError`. An empty trigger picks up the selected value and a chevron from the field.
 *
 * Use `variant="control"` to compose inside another field's Group.
 *
 * @example
 * ```tsx
 * <Select placeholder="Pick a drink">
 *   <Label>Coffee</Label>
 *   <Button slot="trigger" />
 *   <SelectOptions>
 *     <SelectItem id="espresso">Espresso</SelectItem>
 *   </SelectOptions>
 * </Select>
 * ```
 */
export function Select<T extends object, M extends SelectionMode = 'single'>(props: SelectProps<T, M>) {
  const { children, size, variant = 'default', className, ...racProps } = props;
  const selectClass = composeClassName(className, styles.select);
  const group = useSlottedContext(GroupContext);

  // RAC's Select replaces ButtonContext for its interior, so read the parent field's state here.
  const inherited = useContext(ButtonContext) as { slots?: Record<string, ButtonProps> } | null;

  if (variant === 'control') {
    const parent = inherited?.slots?.control;
    const isDisabled = racProps.isDisabled ?? group?.isDisabled;
    const trigger = { chrome: 'control' as const, ...TRIGGER_SLOTS.trigger };

    // A control Select is its own small shell: it publishes control chrome for the trigger it holds.
    return (
      <RACSelect {...racProps} isDisabled={isDisabled} className={selectClass}>
        {mapFieldChildren(children, function publish(node) {
          return (
            <FieldSlots size={size ?? parent?.size ?? undefined} isDisabled={isDisabled} buttons={{ trigger }}>
              {node}
            </FieldSlots>
          );
        })}
      </RACSelect>
    );
  }

  return (
    <Field
      as={RACSelect as typeof RACSelect<T, M>}
      interior="box"
      size={size}
      slotDefaults={{ buttons: TRIGGER_SLOTS }}
      {...racProps}
      className={selectClass}
    >
      {children}
    </Field>
  );
}

export interface SelectOptionsProps<T extends object = object> extends Omit<ListBoxProps<T>, 'slot'> {
  /** Props for the popover layer that positions the list. */
  popoverProps?: Omit<PopoverProps, 'children'>;
}

/**
 * The options of a Select, in the popover it opens. `SelectItem`s go here, or pass `items` with a
 * render function for a dynamic collection. Write `Popover`, `Content`, and `ListBox` yourself to
 * replace the whole overlay.
 */
export function SelectOptions<T extends object = object>(props: SelectOptionsProps<T>) {
  const { popoverProps, ...listBoxProps } = props;

  return (
    <Popover hideArrow {...popoverProps}>
      <Content blockPadding="xs" inlinePadding="0">
        <ListBox {...listBoxProps} />
      </Content>
    </Popover>
  );
}

export interface SelectValueProps extends RACSelectValueProps<object> {}

/** Selected option, or the Select placeholder. */
export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(function SelectValue(props, ref) {
  const { className, ...rest } = props;

  return <RACSelectValue {...rest} ref={ref} className={composeClassName(className, styles.value)} />;
});

export interface SelectItemProps extends ListBoxItemProps {}

/** One option inside a Select. */
export function SelectItem(props: SelectItemProps) {
  return <ListBoxItem {...props} />;
}

export type SelectKey = RACKey;
