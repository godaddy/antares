import { type ElementType, type ReactNode, forwardRef, useContext } from 'react';
import { mergeProps } from 'react-aria';
import { DEFAULT_SLOT, Provider as RACProvider, type ContextValue } from 'react-aria-components';
import type { PolymorphicComponent, PolymorphicProps, PolymorphicRef } from '#types/polymorphic-react.ts';
import { composeClassName } from '#utils/render-props.ts';
import { ButtonContext, type ButtonProps } from '#components/button';
import { FieldErrorContext } from '#components/field-error';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { InputContext } from '#components/input';
import { LabelContext } from '#components/label';
import { GroupContext } from '#components/structure';
import { TextAreaContext } from '#components/text-area';
import { normalizeFieldChildren, type FieldSlots } from './normalize-field-children.tsx';
import styles from './index.module.css';

export { normalizeFieldChildren, type FieldSlots };

type ButtonContextValue = NonNullable<ContextValue<ButtonProps, HTMLButtonElement>>;

function buildBoxButtonContext(
  inherited: ContextValue<ButtonProps, HTMLButtonElement>,
  size: FieldSize | undefined,
  isDisabled: boolean | undefined
): ButtonContextValue {
  const base = (inherited ?? {}) as ButtonContextValue & { slots?: Record<string | symbol, object | undefined> };
  const slots = base.slots ?? {};
  const chrome = { size, isDisabled };
  // Button owns the look; field className lets Group CSS target the face.
  const control = { ...chrome, variant: 'control' as const, className: styles.control };
  const trigger = { ...chrome, variant: 'trigger' as const, className: styles.trigger };

  return {
    ...base,
    slots: {
      ...slots,
      [DEFAULT_SLOT]: mergeProps(slots[DEFAULT_SLOT] ?? {}, chrome),
      control: mergeProps(slots.control ?? {}, control),
      trigger: mergeProps(slots.trigger ?? {}, trigger),
      decrement: mergeProps(slots.decrement ?? {}, control),
      increment: mergeProps(slots.increment ?? {}, control),
      previous: mergeProps(slots.previous ?? {}, chrome),
      next: mergeProps(slots.next ?? {}, chrome)
    }
  };
}

/** Size for controls inside a field group. @default 'md' */
export type FieldSize = 'sm' | 'md';

/** Group role for this field. Omitted means no GroupContext. */
type FieldInterior = 'box' | 'stack';

/** Item axis when `interior` is `'stack'`. */
type FieldOrientation = 'horizontal' | 'vertical';

/** Field props re-exported by public field roots. */
export interface FieldOwnProps extends Omit<FlexOwnProps, 'as'> {
  /** Whether the field is disabled. Inherited via context. @default false */
  isDisabled?: boolean;
}

/** Shell config passed to `Field` by a field root (not a public props type). */
interface FieldShellOwnProps extends FieldOwnProps {
  /** Visual size of the controls. Inherited via context. @default 'md' */
  size?: FieldSize;

  /** Item axis when `interior` is `'stack'`. @default 'vertical' */
  orientation?: FieldOrientation;

  /** Group role. Omitted means no GroupContext chrome. */
  interior?: FieldInterior;

  /**
   * Forward `orientation` to the RAC root for keyboard/ARIA.
   * Off for roots that reject it (e.g. RAC `CheckboxGroup`). @default false
   */
  forwardOrientation?: boolean;

  /** Presets filled in when the consumer leaves a slot empty. */
  slots?: FieldSlots;
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
  orientation = 'vertical',
  isDisabled,
  size
}: {
  children: ReactNode;
  interior?: FieldInterior;
  orientation?: FieldOrientation;
  isDisabled?: boolean;
  size?: FieldSize;
}) {
  const label = useContext(LabelContext);
  const group = useContext(GroupContext);
  const button = useContext(ButtonContext);
  const input = useContext(InputContext);
  const textArea = useContext(TextAreaContext);
  const validation = useContext(FieldErrorContext);
  const isInvalid = validation?.isInvalid;
  const groupContext =
    interior === 'box'
      ? mergeProps(group ?? {}, {
          className: styles.group,
          direction: 'row',
          wrap: 'nowrap',
          alignSelf: 'stretch',
          alignItems: 'stretch',
          isDisabled,
          isInvalid
        })
      : interior === 'stack'
        ? mergeProps(group ?? {}, {
            role: 'presentation',
            ...(orientation === 'horizontal' ? { direction: 'row', gap: 'lg' } : { direction: 'column', gap: 'md' })
          })
        : (group ?? {});

  const buttonContext = interior === 'box' ? buildBoxButtonContext(button, size, isDisabled) : (button ?? {});

  return (
    <RACProvider
      values={[
        [LabelContext, mergeProps(label ?? {}, { className: styles.label })],
        [GroupContext, groupContext],
        [ButtonContext, buttonContext],
        [InputContext, mergeProps(input ?? {}, { className: styles.input })],
        [TextAreaContext, mergeProps(textArea ?? {}, { className: styles.textarea })]
      ]}
    >
      {children}
    </RACProvider>
  );
}

/** Internal field shell: layout, RAC contexts, and empty-slot presets. */
export const Field = forwardRef(function Field(props: FieldProps<ElementType>, ref: PolymorphicRef<ElementType>) {
  const {
    as,
    children,
    gap = 'sm',
    className,
    size,
    isDisabled,
    interior,
    orientation = 'vertical',
    forwardOrientation,
    slots,
    ...rest
  } = props;
  const rootProps =
    interior === 'stack' && forwardOrientation ? { ...rest, isDisabled, orientation } : { ...rest, isDisabled };
  const contextProps = { interior, orientation, isDisabled, size };

  return (
    <Flex
      direction="column"
      gap={gap}
      {...rootProps}
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
