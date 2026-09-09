import { forwardRef, useContext, type ReactNode } from 'react';
import { mergeProps } from 'react-aria';
import {
  DEFAULT_SLOT,
  Provider as RACProvider,
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  type SelectRenderProps as RACSelectRenderProps,
  type Key as RACKey,
  SelectValue as RACSelectValue,
  type SelectValueProps as RACSelectValueProps,
  composeRenderProps,
  useSlottedContext
} from 'react-aria-components';
import { ButtonContext, type ButtonProps } from '#components/button';
import { Icon } from '#components/icon';
import { LabelContext } from '#components/label';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { ListBox, ListBoxItem, type ListBoxItemProps, type ListBoxProps } from '#components/listbox';
import { Popover, type PopoverProps } from '#components/popover';
import { Content, GroupContext, type GroupProps } from '#components/structure';
import { composeClassName } from '#utils/render-props.ts';
import fieldStyles from '../../_internal/field-styles/index.module.css';
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
const TRIGGER_FACE = <TriggerFace />;

export interface SelectProps<T, M extends SelectionMode = 'single'>
  extends Omit<RACSelectProps<T, M>, 'children' | 'size' | 'items'>,
    Omit<FlexOwnProps, 'as' | 'className'> {
  /** Visual size of the trigger. @default 'md' */
  size?: 'sm' | 'md';

  /** Complete field, or a control inside another field's Group. @default 'default' */
  variant?: 'default' | 'control';

  /** Field interior. Pass a function to read render props such as `isOpen`. */
  children: ReactNode | ((renderProps: RACSelectRenderProps) => ReactNode);
}

/** The control size an enclosing field published, whether or not it slots its buttons. */
function useInheritedControlSize(): 'sm' | 'md' | undefined {
  const context = useContext(ButtonContext) as (ButtonProps & { slots?: Record<string, ButtonProps> }) | null;
  const control = context?.slots ? context.slots.control : context;

  // cva types a variant as nullable, but a field only ever publishes a size or nothing.
  return control?.size ?? undefined;
}

interface SelectBodyProps {
  /** Chrome for the trigger this Select holds. */
  trigger: ButtonProps;

  /** Chrome for a `Group` composed inside, when this Select is a field of its own. */
  group?: GroupProps;

  /** Visual size of the trigger. */
  size?: 'sm' | 'md';

  /** Whether the field is disabled. */
  isDisabled?: boolean;

  children: ReactNode;
}

/**
 * Styles the parts a Select owns and fills its trigger face. It runs inside `RACSelect`, which
 * publishes its trigger props unslotted, so that one value stands in for the trigger and for a
 * plain `Button`.
 */
function SelectBody({ trigger, group, size, isDisabled, children }: SelectBodyProps) {
  const label = useSlottedContext(LabelContext) ?? {};
  const inheritedGroup = useSlottedContext(GroupContext) ?? {};
  const triggerProps = (useContext(ButtonContext) ?? {}) as ButtonProps;
  const control: ButtonProps = { variant: 'control', size, isDisabled, className: fieldStyles.control };

  return (
    <RACProvider
      values={[
        [LabelContext, { ...label, className: composeClassName(label.className, fieldStyles.label) }],
        [GroupContext, { ...inheritedGroup, ...group }],
        [
          ButtonContext,
          {
            slots: {
              // React Aria publishes the trigger unslotted, so the same props stand in for a
              // `Button` with no slot. `control` is here so a Select nested in this one can read it.
              [DEFAULT_SLOT]: triggerProps,
              control,
              trigger: mergeProps(triggerProps, trigger, { children: TRIGGER_FACE })
            }
          }
        ]
      ]}
    >
      {children}
    </RACProvider>
  );
}

type SelectRootProps<T, M extends SelectionMode> = Omit<SelectProps<T, M>, 'variant'>;

/** A Select that is a field of its own: a column whose trigger carries the box chrome. */
function FieldSelect<T extends object, M extends SelectionMode>(props: SelectRootProps<T, M>) {
  const { children, size, className, gap = 'sm', isDisabled, ...racProps } = props;

  return (
    <Flex
      direction="column"
      gap={gap}
      {...racProps}
      isDisabled={isDisabled}
      as={RACSelect as typeof RACSelect<T, M>}
      data-interior="box"
      data-size={size}
      className={composeClassName(className, fieldStyles.field, styles.select)}
    >
      {composeRenderProps(children, function body(node) {
        return (
          <SelectBody
            size={size}
            isDisabled={isDisabled}
            trigger={{ variant: 'trigger', size, className: fieldStyles.trigger }}
            group={{ isDisabled, className: fieldStyles.group }}
          >
            {node}
          </SelectBody>
        );
      })}
    </Flex>
  );
}

/**
 * A Select composed inside another field's `Group`. It renders no field column, and its trigger
 * takes the control chrome so it reads as one segment of the field around it.
 */
function ControlSelect<T extends object, M extends SelectionMode>(props: SelectRootProps<T, M>) {
  const { children, size, className, isDisabled, ...racProps } = props;
  const inheritedGroup = useSlottedContext(GroupContext);
  const inheritedSize = useInheritedControlSize();
  const controlDisabled = isDisabled ?? inheritedGroup?.isDisabled;
  const controlSize = size ?? inheritedSize;

  return (
    <RACSelect
      {...(racProps as RACSelectProps<T, M>)}
      isDisabled={controlDisabled}
      className={composeClassName(className, styles.select)}
    >
      {composeRenderProps(children, function body(node) {
        return (
          <SelectBody
            size={controlSize}
            isDisabled={controlDisabled}
            trigger={{ variant: 'control', size: controlSize, className: fieldStyles.control }}
          >
            {node}
          </SelectBody>
        );
      })}
    </RACSelect>
  );
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
  const { variant = 'default', ...rest } = props;
  const Root = variant === 'control' ? ControlSelect : FieldSelect;

  return <Root<T, M> {...rest} />;
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
