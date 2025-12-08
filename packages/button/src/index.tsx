import { withSlots } from '@bento/slots';
import { useProps, isEventListener } from '@bento/use-props';
import { useDataAttributes } from '@bento/use-data-attributes';
import { useButton, useFocusRing, useHover, mergeProps, type AriaButtonProps, HoverEvents } from 'react-aria';
import { useObjectRef, mergeRefs, filterDOMProps } from '@react-aria/utils';
/* v8 ignore next */
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
 * Extracts slot-provided DOM/ARIA/data-* props that should override useButton defaults.
 * Filters out event handlers (useButton handles those) and undefined values.
 * @internal
 */
function getSlotOverrides(props: ButtonProps): Record<string, unknown> {
  const overrides: Record<string, unknown> = {};

  // Iterate through all props
  for (const [key, value] of Object.entries(props)) {
    // Skip undefined values
    if (value === undefined) continue;

    // Skip event handlers - useButton handles those
    if (isEventListener(key)) continue;

    // Skip internal React Aria props
    if (
      key === 'isDisabled' ||
      key === 'excludeFromTabOrder' ||
      key === 'onPress' ||
      key === 'onPressStart' ||
      key === 'onPressEnd' ||
      key === 'onPressUp' ||
      key === 'onPressChange' ||
      key === 'onHoverStart' ||
      key === 'onHoverEnd' ||
      key === 'onHoverChange' ||
      key === 'children' ||
      key === 'ref'
    ) {
      continue;
    }

    // Always include aria-*, data-*, and common styling/semantic props that filterDOMProps misses
    if (
      key.startsWith('aria-') ||
      key.startsWith('data-') ||
      key === 'className' ||
      key === 'style' ||
      key === 'role' ||
      key === 'title'
    ) {
      overrides[key] = value;
      continue;
    }

    // Use filterDOMProps for standard HTML attributes (type, disabled, form*, name, value, etc.)
    const filtered = filterDOMProps({ [key]: value } as any, { labelable: true });
    if (Object.hasOwn(filtered, key)) {
      overrides[key] = value;
    }
  }

  return overrides;
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
    const slotOverrides = getSlotOverrides(props as ButtonProps);

    return (
      <button {...mergeProps(buttonProps, focusProps, hoverProps, dataAttrs, slotOverrides)} ref={buttonRef}>
        {content}
      </button>
    );
  })
);
