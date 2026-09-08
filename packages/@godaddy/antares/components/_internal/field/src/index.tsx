import { type ElementType, type ReactNode, type Ref, forwardRef, useContext } from 'react';
import { mergeProps } from 'react-aria';
import { DEFAULT_SLOT, Provider as RACProvider } from 'react-aria-components';
import type { PolymorphicComponent, PolymorphicProps, PolymorphicRef } from '#types/polymorphic-react.ts';
import { composeClassName } from '#utils/render-props.ts';
import { ButtonContext, type ButtonProps } from '#components/button';
import { InputContext } from '#components/input';
import { LabelContext } from '#components/label';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { GroupContext, type GroupProps } from '#components/structure';
import { TextAreaContext } from '#components/text-area';
import styles from './index.module.css';

type ButtonSlots = Record<string | symbol, ButtonProps>;

interface ButtonContextValue extends ButtonProps {
  slots?: ButtonSlots;
}

/** Size for controls inside a field group. */
export type FieldSize = 'sm' | 'md';

/** Field props re-exported by public field roots. A field owns its own interior axis. */
export interface FieldOwnProps
  extends Omit<
    FlexOwnProps,
    'as' | 'display' | 'direction' | 'wrap' | 'justifyContent' | 'alignContent' | 'alignItems' | 'justifyItems'
  > {
  /** Whether the field is disabled. Inherited via context. @default false */
  isDisabled?: boolean;
}

/**
 * What a root fills into the parts it owns: a stepper's icons, a trigger's value, a selection
 * group's axis. The field owns chrome (`variant`, `size`, `isDisabled`, class hooks); a root owns
 * content. Consumer props beat both.
 */
export interface FieldSlotDefaults {
  /**
   * Props per button slot name. A slot takes control chrome, except `trigger`, which takes trigger
   * chrome; set `chrome` to choose, as a Select composed inside another field's Group does.
   */
  buttons?: Record<string, ButtonProps & { ref?: Ref<HTMLButtonElement>; chrome?: 'control' | 'trigger' }>;

  /** Props for a composed `Group`. */
  group?: GroupProps;
}

/** Shell config passed to `Field` by a field root (not a public props type). */
interface FieldShellOwnProps extends FieldOwnProps {
  /** Visual size of the controls. Inherited via context. @default 'md' */
  size?: FieldSize;

  /** Box chrome around the control. Omitted means no chrome. */
  interior?: 'box';

  /** What this root fills into its own parts. */
  slotDefaults?: FieldSlotDefaults;
}

export type FieldProps<C extends ElementType = 'div'> = PolymorphicProps<C, FieldShellOwnProps>;

/** Apply `wrap` to `children`, including render-fn children. */
export function mapFieldChildren<R>(
  children: ReactNode | ((renderProps: R) => ReactNode),
  wrap: (node: ReactNode) => ReactNode
): ReactNode | ((renderProps: R) => ReactNode) {
  return typeof children === 'function' ? (renderProps: R) => wrap(children(renderProps)) : wrap(children);
}

interface FieldSlotsProps extends FieldSlotDefaults {
  children: ReactNode;

  /** Box chrome around the control. Omitted means no chrome. */
  interior?: 'box';

  isDisabled?: boolean;

  size?: FieldSize;
}

/**
 * Publishes everything a field's interior reads: chrome for the parts the field styles, and the
 * root's own content for the parts it fills. Merge order is React Aria's wiring, then chrome, then
 * the root's defaults; the consumer's own props win last, in each part's `useContextProps`.
 *
 * A root that renders no `Field`, such as a Select composed inside another field's Group, publishes
 * with this directly.
 */
export function FieldSlots(props: FieldSlotsProps) {
  const { children, buttons, group, interior, isDisabled, size } = props;
  const label = useContext(LabelContext);
  const inheritedGroup = useContext(GroupContext);
  const input = useContext(InputContext);
  const textArea = useContext(TextAreaContext);
  const button = useContext(ButtonContext) as ButtonContextValue | null;
  const { slots: inherited, ...unslotted } = button ?? {};
  const chrome = { size, isDisabled };

  // What React Aria wired, per slot. A root that owns a single trigger publishes it unslotted, so
  // that value stands in for both the trigger and the default slot.
  const wiring: ButtonSlots = {
    ...inherited,
    [DEFAULT_SLOT]: inherited?.[DEFAULT_SLOT] ?? unslotted,
    trigger: inherited?.trigger ?? unslotted
  };

  // The two shapes a button takes inside a field. A root picks one per slot it fills.
  const shapes = {
    control: { ...chrome, variant: 'control' as const, className: styles.control },
    trigger: { ...chrome, variant: 'trigger' as const, className: styles.trigger }
  };

  const slots: ButtonSlots = {
    ...wiring,
    [DEFAULT_SLOT]: mergeProps(wiring[DEFAULT_SLOT], chrome),
    control: mergeProps(inherited?.control ?? {}, shapes.control),
    trigger: mergeProps(wiring.trigger, shapes.trigger)
  };

  for (const [slot, { chrome: kind, ...content }] of Object.entries(buttons ?? {})) {
    const shape = shapes[kind ?? (slot === 'trigger' ? 'trigger' : 'control')];
    slots[slot] = mergeProps(wiring[slot] ?? {}, shape, content);
  }

  return (
    <RACProvider
      values={[
        [LabelContext, mergeProps(label ?? {}, { className: styles.label })],

        // The box group owns the chrome, so it carries the disabled state instead of each child dimming itself.
        [
          GroupContext,
          mergeProps(
            inheritedGroup ?? {},
            interior === 'box' ? { isDisabled, className: styles.group } : {},
            group ?? {}
          )
        ],
        [InputContext, mergeProps(input ?? {}, { className: styles.input })],
        [TextAreaContext, mergeProps(textArea ?? {}, { className: styles.textarea })],
        [ButtonContext, { slots }]
      ]}
    >
      {children}
    </RACProvider>
  );
}

/** Internal field shell: layout, plus the contexts its interior reads. */
export const Field = forwardRef(function Field(props: FieldProps<ElementType>, ref: PolymorphicRef<ElementType>) {
  const { as, children, gap = 'sm', className, size, isDisabled, interior, slotDefaults, ...rest } = props;
  const slots = { interior, isDisabled, size, ...slotDefaults };

  return (
    <Flex
      direction="column"
      gap={gap}
      {...rest}
      isDisabled={isDisabled}
      as={as}
      ref={ref}
      data-interior={interior}
      data-size={size}
      className={composeClassName(className, styles.field)}
    >
      {mapFieldChildren(children, (node) => (
        <FieldSlots {...slots}>{node}</FieldSlots>
      ))}
    </Flex>
  );
}) as PolymorphicComponent<FieldShellOwnProps>;
