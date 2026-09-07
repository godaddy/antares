import { type ElementType, type ReactNode, forwardRef, useContext } from 'react';
import { mergeProps } from 'react-aria';
import { ButtonContext, DEFAULT_SLOT, type ButtonProps, type ContextValue } from 'react-aria-components';
import type { PolymorphicComponent, PolymorphicProps, PolymorphicRef } from '#types/polymorphic-react.ts';
import { composeClassName } from '#utils/render-props.ts';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { normalizeFieldChildren, type FieldSlots } from './normalize-field-children.tsx';
import styles from './index.module.css';

export { normalizeFieldChildren, type FieldSlots };

type ButtonContextValue = NonNullable<ContextValue<ButtonProps, HTMLButtonElement>>;

type ButtonSlots = Record<string | symbol, object | undefined>;

/** Button props a field root publishes for the slots it owns, keyed by slot name. */
export type FieldButtonSlots = Record<string, object>;

/**
 * Field chrome on `ButtonContext`, merged over whatever the RAC root published.
 *
 * Roots that publish un-slotted props (`Select`, `DatePicker`) mean them for whichever
 * button the interior composes, so every entry keeps them. `slots` entries a root passed
 * are merged as-is: the field adds chrome and reads nothing.
 */
function buildButtonContext(
  inherited: ContextValue<ButtonProps, HTMLButtonElement>,
  size: FieldSize | undefined,
  isDisabled: boolean | undefined,
  buttonSlots: FieldButtonSlots | undefined
): ButtonContextValue {
  const { slots: inheritedSlots, ...inheritedProps } = (inherited ?? {}) as ButtonContextValue & {
    slots?: ButtonSlots;
  };
  const chrome = { ...inheritedProps, size, isDisabled };
  const slots: Record<string | symbol, object> = { ...inheritedSlots } as Record<string | symbol, object>;

  slots[DEFAULT_SLOT] = mergeProps(inheritedSlots?.[DEFAULT_SLOT] ?? {}, chrome);
  slots.control = mergeProps(inheritedSlots?.control ?? {}, chrome, { variant: 'control' as const });
  slots.trigger = mergeProps(inheritedSlots?.trigger ?? {}, chrome, { variant: 'trigger' as const });

  for (const [slot, props] of Object.entries(buttonSlots ?? {})) {
    slots[slot] = mergeProps(inheritedSlots?.[slot] ?? {}, chrome, props);
  }

  return { slots } as ButtonContextValue;
}

/** Size for controls inside a field group. @default 'md' */
export type FieldSize = 'sm' | 'md';

/** Field interior. Omitted means no box chrome. */
type FieldInterior = 'box';

/**
 * Field props re-exported by public field roots. A field owns its own interior axis, so
 * the props that would redefine it are not offered; placement props still are.
 */
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
  interior?: FieldInterior;

  /** Presets filled in when the consumer leaves a slot empty. */
  slots?: FieldSlots;

  /** Button props per slot the root owns (e.g. a stepper). Merged with field chrome. */
  buttonSlots?: FieldButtonSlots;
}

export type FieldProps<C extends ElementType = 'div'> = PolymorphicProps<C, FieldShellOwnProps>;

/** Apply `wrap` to `children`, including render-fn children. */
export function mapFieldChildren<R>(
  children: ReactNode | ((renderProps: R) => ReactNode),
  wrap: (node: ReactNode) => ReactNode
): ReactNode | ((renderProps: R) => ReactNode) {
  return typeof children === 'function' ? (renderProps: R) => wrap(children(renderProps)) : wrap(children);
}

/**
 * Button chrome for the interior. Label, description, input and box looks are CSS: the
 * field's stylesheet reaches them through `data-*` hooks the parts stamp themselves.
 */
function FieldContexts({
  children,
  interior,
  isDisabled,
  size,
  buttonSlots
}: {
  children: ReactNode;
  interior?: FieldInterior;
  isDisabled?: boolean;
  size?: FieldSize;
  buttonSlots?: FieldButtonSlots;
}) {
  const button = useContext(ButtonContext);

  if (interior !== 'box' && buttonSlots === undefined) {
    return children;
  }

  return (
    <ButtonContext.Provider value={buildButtonContext(button, size, isDisabled, buttonSlots)}>
      {children}
    </ButtonContext.Provider>
  );
}

/** Internal field shell: layout, button chrome, and empty-slot presets. */
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
