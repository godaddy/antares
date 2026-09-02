import { type ElementType, type ReactNode, forwardRef, useContext } from 'react';
import { mergeProps } from 'react-aria';
import {
  CheckboxGroup as RACCheckboxGroup,
  DEFAULT_SLOT,
  Provider as RACProvider,
  type ContextValue
} from 'react-aria-components';
import type { PolymorphicComponent, PolymorphicProps, PolymorphicRef } from '#types/polymorphic-react.ts';
import { composeClassName } from '#utils/render-props.ts';
import { ButtonContext, type ButtonProps } from '#components/button';
import { FieldErrorContext } from '#components/field-error';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { InputContext } from '#components/input';
import { LabelContext } from '#components/label';
import { GroupContext } from '#components/structure';
import { TextAreaContext } from '#components/text-area';
import styles from './index.module.css';

type ButtonContextValue = NonNullable<ContextValue<ButtonProps, HTMLButtonElement>>;

function buildBoxButtonContext(
  inherited: ContextValue<ButtonProps, HTMLButtonElement>,
  size: FieldSize | undefined,
  isDisabled: boolean | undefined
): ButtonContextValue {
  const base = (inherited ?? {}) as ButtonContextValue & { slots?: Record<string | symbol, object | undefined> };
  const slots = base.slots ?? {};
  const chrome = { size, isDisabled };
  // `variant` + field className: Button owns the look; field className lets Group CSS target the face.
  const control = mergeProps(slots.control ?? {}, { ...chrome, variant: 'control' as const, className: styles.control });
  const trigger = mergeProps(slots.trigger ?? {}, { ...chrome, variant: 'trigger' as const, className: styles.trigger });

  return {
    ...base,
    slots: {
      [DEFAULT_SLOT]: mergeProps(slots[DEFAULT_SLOT] ?? {}, chrome),
      ...slots,
      control,
      trigger,
      decrement: mergeProps(slots.decrement ?? {}, { ...chrome, variant: 'control' as const, className: styles.control }),
      increment: mergeProps(slots.increment ?? {}, { ...chrome, variant: 'control' as const, className: styles.control }),
      previous: mergeProps(slots.previous ?? {}, chrome),
      next: mergeProps(slots.next ?? {}, chrome)
    }
  };
}

export { wrapBareFieldControl } from './wrap-bare-control.tsx';

/** Size for controls inside a field group. @default 'md' */
export type FieldSize = 'sm' | 'md';

/** What the field's `Group` is for. Omitted means the field provides no GroupContext. */
type FieldInterior = 'box' | 'stack';

/** Item axis when `interior` is `'stack'`. */
type FieldOrientation = 'horizontal' | 'vertical';

/** Field shell props: layout plus interior configuration. */
export interface FieldOwnProps extends Omit<FlexOwnProps, 'as'> {
  /** Whether the field is disabled. Inherited by composed controls via context. @default false */
  isDisabled?: boolean;

  /** Visual size of the controls. Inherited by composed controls via context. @default 'md' */
  size?: FieldSize;

  /** What the field's `Group` is for. Omitted means no GroupContext chrome. */
  interior?: FieldInterior;

  /** Item axis when `interior` is `'stack'`. @default 'vertical' */
  orientation?: FieldOrientation;
}

export type FieldProps<C extends ElementType = 'div'> = PolymorphicProps<C, FieldOwnProps>;

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
          elevation: 'card',
          isDisabled,
          isInvalid,
          'data-size': size === 'sm' ? 'sm' : undefined
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

/**
 * Internal field shell: column layout plus merged RAC contexts.
 *
 * @param props - {@link FieldProps}
 */
export const Field = forwardRef(function Field(props: FieldProps<ElementType>, ref: PolymorphicRef<ElementType>) {
  const { as, children, gap = 'sm', className, size, isDisabled, interior, orientation = 'vertical', ...rest } = props;
  const rootProps =
    interior === 'stack' && as !== RACCheckboxGroup ? { ...rest, isDisabled, orientation } : { ...rest, isDisabled };
  const contextProps = { interior, orientation, isDisabled, size };

  return (
    <Flex
      direction="column"
      gap={gap}
      {...rootProps}
      as={as}
      ref={ref}
      className={composeClassName(className, styles.field)}
    >
      {typeof children === 'function' ? (
        (renderProps: never) => <FieldContexts {...contextProps}>{children(renderProps)}</FieldContexts>
      ) : (
        <FieldContexts {...contextProps}>{children}</FieldContexts>
      )}
    </Flex>
  );
}) as PolymorphicComponent<FieldOwnProps>;
