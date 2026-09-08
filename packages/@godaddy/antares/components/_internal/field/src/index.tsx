import { type ElementType, type ReactNode, forwardRef, useContext } from 'react';
import { mergeProps } from 'react-aria';
import { DEFAULT_SLOT, Provider as RACProvider } from 'react-aria-components';
import type { PolymorphicComponent, PolymorphicProps, PolymorphicRef } from '#types/polymorphic-react.ts';
import { composeClassName } from '#utils/render-props.ts';
import { ButtonContext, type ButtonProps } from '#components/button';
import { InputContext } from '#components/input';
import { LabelContext } from '#components/label';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { GroupContext } from '#components/structure';
import { TextAreaContext } from '#components/text-area';
import { normalizeFieldChildren, type FieldSlots } from './normalize-field-children.tsx';
import styles from './index.module.css';

export { normalizeFieldChildren, type FieldSlots };

type ButtonSlots = Record<string | symbol, ButtonProps>;

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

/** Shell config passed to `Field` by a field root (not a public props type). */
interface FieldShellOwnProps extends FieldOwnProps {
  /** Visual size of the controls. Inherited via context. @default 'md' */
  size?: FieldSize;

  /** Box chrome around the control. Omitted means no chrome. */
  interior?: 'box';

  /** Presets filled in when the consumer leaves a slot empty. */
  slots?: FieldSlots;

  /** Button props per slot the root owns, such as a stepper. Merged over the field's control chrome. */
  buttonSlots?: Record<string, object>;
}

export type FieldProps<C extends ElementType = 'div'> = PolymorphicProps<C, FieldShellOwnProps>;

/** Apply `wrap` to `children`, including render-fn children. */
export function mapFieldChildren<R>(
  children: ReactNode | ((renderProps: R) => ReactNode),
  wrap: (node: ReactNode) => ReactNode
): ReactNode | ((renderProps: R) => ReactNode) {
  return typeof children === 'function' ? (renderProps: R) => wrap(children(renderProps)) : wrap(children);
}

function FieldContexts({
  children,
  interior,
  isDisabled,
  size,
  buttonSlots
}: {
  children: ReactNode;
  interior?: 'box';
  isDisabled?: boolean;
  size?: FieldSize;
  buttonSlots?: FieldShellOwnProps['buttonSlots'];
}) {
  const label = useContext(LabelContext);
  const group = useContext(GroupContext);
  const input = useContext(InputContext);
  const textArea = useContext(TextAreaContext);
  const button = useContext(ButtonContext) as (ButtonProps & { slots?: ButtonSlots }) | null;
  const { slots: inheritedSlots, ...inheritedProps } = button ?? {};
  const buttonProps = mergeProps(inheritedProps, { size, isDisabled });
  const control = { ...buttonProps, variant: 'control' as const, className: styles.control };
  const trigger = { ...buttonProps, variant: 'trigger' as const, className: styles.trigger };
  const slots: ButtonSlots = {
    ...inheritedSlots,
    [DEFAULT_SLOT]: mergeProps(inheritedSlots?.[DEFAULT_SLOT] ?? {}, buttonProps),
    control: mergeProps(inheritedSlots?.control ?? {}, control),
    trigger: mergeProps(inheritedSlots?.trigger ?? {}, trigger)
  };

  for (const [slot, props] of Object.entries(buttonSlots ?? {})) {
    slots[slot] = mergeProps(inheritedSlots?.[slot] ?? {}, control, props);
  }

  return (
    <RACProvider
      values={[
        [LabelContext, mergeProps(label ?? {}, { className: styles.label })],

        // The box group owns the chrome, so it carries the disabled state instead of each child dimming itself.
        [GroupContext, mergeProps(group ?? {}, interior === 'box' ? { isDisabled, className: styles.group } : {})],
        [InputContext, mergeProps(input ?? {}, { className: styles.input })],
        [TextAreaContext, mergeProps(textArea ?? {}, { className: styles.textarea })],
        [ButtonContext, { slots }]
      ]}
    >
      {children}
    </RACProvider>
  );
}

/** Internal field shell: layout, chrome contexts, and empty-slot presets. */
export const Field = forwardRef(function Field(props: FieldProps<ElementType>, ref: PolymorphicRef<ElementType>) {
  const { as, children, gap = 'sm', className, size, isDisabled, interior, slots, buttonSlots, ...rest } = props;
  const contextProps = { interior, isDisabled, size, buttonSlots };

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
        <FieldContexts {...contextProps}>{normalizeFieldChildren(node, slots)}</FieldContexts>
      ))}
    </Flex>
  );
}) as PolymorphicComponent<FieldShellOwnProps>;
