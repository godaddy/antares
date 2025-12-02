import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { useDataAttributes } from '@bento/use-data-attributes';
import { useButton, useFocusRing, useHover, mergeProps, type AriaButtonProps, HoverEvents } from 'react-aria';
import { useObjectRef, mergeRefs } from '@react-aria/utils';
import React, { forwardRef, type ForwardedRef } from 'react';

export interface ButtonProps
  extends Omit<AriaButtonProps, 'children' | 'href' | 'target' | 'rel' | 'elementType'>,
    HoverEvents {
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
 * A complete button component built on top of React Aria's useButton.
 * Renders as a native button element with all accessibility and interaction features.
 *
 * @example
 * ```tsx
 * <Button onPress={() => console.log('Button pressed!')}>Click me</Button>
 * ```
 */
export const Button = withSlots(
  'BentoButton',
  forwardRef(function Button(args: ButtonProps, forwardedRef: ForwardedRef<HTMLButtonElement | null>) {
    const innerRef = React.useRef<HTMLButtonElement>(null);

    // Extract merged props first (includes slot props from context)
    // We need this to get the ref and onPress that might come from slots
    const { props: mergedProps } = useProps(args, {});

    // Merge all refs (slot ref, forwarded ref, inner ref) into a stable RefObject.
    // useObjectRef handles both callback refs and RefObjects safely.
    const buttonRef = useObjectRef(mergeRefs(innerRef, forwardedRef, (mergedProps as any).ref));

    // Use mergedProps (which includes slot props) for React Aria hooks
    const { buttonProps, isPressed } = useButton(mergedProps as ButtonProps, buttonRef);
    const { focusProps, isFocused, isFocusVisible } = useFocusRing(mergedProps);
    const { hoverProps, isHovered } = useHover(mergedProps);

    const renderProps: ButtonRenderProps = {
      isPressed,
      isHovered,
      isFocused,
      isFocusVisible
    };

    // Re-extract props with renderProps for children resolution
    const { props, apply } = useProps(args, renderProps);

    const dataAttrs = useDataAttributes({
      pressed: isPressed,
      hovered: isHovered,
      focused: isFocused,
      focusVisible: isFocusVisible,
      disabled: props.isDisabled
    });

    const content = resolveChildren(props.children, renderProps);

    return (
      <button
        {...apply(mergeProps(buttonProps, focusProps, hoverProps, dataAttrs), [
          'children',
          'onPress',
          'onPressStart',
          'onPressEnd',
          'onPressUp',
          'onPressChange'
        ])}
        ref={buttonRef}
      >
        {content}
      </button>
    );
  })
);
