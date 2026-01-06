import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { useDataAttributes } from '@bento/use-data-attributes';
import { useButton, useFocusRing, useHover, mergeProps, type AriaButtonProps, type HoverEvents } from 'react-aria';
import { mergeRefs } from '@react-aria/utils';
import React from 'react';

export interface ButtonProps
  extends Omit<AriaButtonProps, 'children' | 'href' | 'target' | 'rel' | 'elementType'>,
    HoverEvents,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof AriaButtonProps | 'children'> {
  /** The content to display inside the button. */
  children?: React.ReactNode;
}

/**
 * A button component built on React Aria's useButton.
 *
 * @example
 * ```tsx
 * <Button onPress={() => console.log('Button pressed!')}>Click me</Button>
 * ```
 */
export const Button = withSlots(
  'BentoButton',
  function Button(args: ButtonProps, forwardedRef: React.Ref<HTMLButtonElement>) {
    // First pass: merge slot props so React Aria hooks see complete props
    const { props: mergedProps, ref: mergedRef } = useProps(args, {}, forwardedRef);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    // React Aria hooks receive slot-merged props and internal ref
    const { buttonProps, isPressed } = useButton(mergedProps, buttonRef);
    const { focusProps, isFocused, isFocusVisible } = useFocusRing(mergedProps);
    const { hoverProps, isHovered } = useHover(mergedProps);

    // Second pass: apply user props with interaction state via apply()
    // Apply merges React Aria props as defaults that slots can override
    const { props, apply } = useProps(args, {
      isPressed,
      isHovered,
      isFocused,
      isFocusVisible
    });

    const dataAttrs = useDataAttributes({
      pressed: isPressed,
      hovered: isHovered,
      focused: isFocused,
      focusVisible: isFocusVisible,
      disabled: mergedProps.isDisabled
    });

    const { children } = props;

    return (
      <button
        {...apply(
          {
            ...mergeProps(buttonProps, focusProps, hoverProps)
          },
          [
            'ref',
            'children',
            'isDisabled',
            'excludeFromTabOrder',
            'preventFocusOnPress',
            'onPress',
            'onPressStart',
            'onPressEnd',
            'onPressUp',
            'onPressChange',
            'onHoverStart',
            'onHoverEnd',
            'onHoverChange',
            'onFocusChange'
          ]
        )}
        {...dataAttrs}
        ref={mergeRefs(buttonRef, mergedRef)}
      >
        {children}
      </button>
    );
  }
);
