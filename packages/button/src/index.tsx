import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { useDataAttributes } from '@bento/use-data-attributes';
import { useButton, useFocusRing, useHover, mergeProps, type AriaButtonProps, HoverEvents } from 'react-aria';
import { useObjectRef, mergeRefs } from '@react-aria/utils';
import React, { forwardRef, type ForwardedRef } from 'react';

export interface ButtonProps
  extends Omit<AriaButtonProps, 'children' | 'href' | 'target' | 'rel' | 'elementType'>,
    HoverEvents,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof AriaButtonProps | 'children'> {
  /** The content to display inside the button. */
  children: React.ReactNode | ((props: ButtonRenderProps) => React.ReactNode);
}

export interface ButtonRenderProps {
  /** Whether the button is currently pressed. */
  isPressed: boolean;
  /** Whether the button is currently hovered. */
  isHovered: boolean;
  /** Whether the button is focused. */
  isFocused: boolean;
  /** Whether the button is keyboard focused. */
  isFocusVisible: boolean;
}

/**
 * Resolves button children - either renders the function with state or returns static content.
 * @internal
 */
export function resolveChildren(
  children: React.ReactNode | ((props: ButtonRenderProps) => React.ReactNode),
  renderProps: ButtonRenderProps
): React.ReactNode {
  if (typeof children === 'function') {
    return children(renderProps);
  }
  return children;
}

/**
 * Props that parent components (like Select) can pass to Button via slots.
 * These override useButton's defaults when explicitly set.
 */
const SLOT_PASSTHROUGH_PROPS = [
  'className',
  'style',
  'type',
  'disabled',
  'name',
  'form',
  'value',
  'formAction',
  'formMethod',
  'formNoValidate',
  'formTarget',
  'role',
  'aria-labelledby',
  'aria-required',
  'aria-invalid',
  'aria-disabled',
  'aria-expanded',
  'aria-haspopup',
  'aria-controls'
] as const;

/**
 * JSX spreads undefined values, which override existing props. Filter them out.
 * @internal
 */
function pickDefined(obj: Record<string, unknown>, keys: readonly string[]): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of keys) {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * A button component built on React Aria's useButton.
 *
 * @example
 * <Button onPress={() => console.log('pressed')}>Click me</Button>
 *
 * @example
 * <Button>{({ isPressed }) => isPressed ? 'Pressing...' : 'Click me'}</Button>
 */
export const Button = withSlots(
  'BentoButton',
  forwardRef(function Button(args: ButtonProps, forwardedRef: ForwardedRef<HTMLButtonElement | null>) {
    const innerRef = React.useRef<HTMLButtonElement>(null);
    const { props, ref } = useProps(args, {});
    const buttonRef = useObjectRef(mergeRefs(innerRef, forwardedRef, ref));

    const { buttonProps, isPressed } = useButton(props as ButtonProps, buttonRef);
    const { focusProps, isFocused, isFocusVisible } = useFocusRing(props);
    const { hoverProps, isHovered } = useHover(props);

    const dataAttrs = useDataAttributes({
      pressed: isPressed,
      hovered: isHovered,
      focused: isFocused,
      focusVisible: isFocusVisible,
      disabled: props.isDisabled
    });

    // Use args.children to avoid useProps proxy executing render functions with wrong args
    const content = resolveChildren(args.children, { isPressed, isHovered, isFocused, isFocusVisible });
    const slotOverrides = pickDefined(props as Record<string, unknown>, SLOT_PASSTHROUGH_PROPS);

    return (
      <button {...mergeProps(buttonProps, focusProps, hoverProps, dataAttrs, slotOverrides)} ref={buttonRef}>
        {content}
      </button>
    );
  })
);
