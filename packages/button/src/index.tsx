import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { useDataAttributes } from '@bento/use-data-attributes';
import { useButton, useFocusRing, useHover, mergeProps, type AriaButtonProps, type HoverEvents } from 'react-aria';
import { mergeRefs } from '@react-aria/utils';
/* v8 ignore next */
import React from 'react';

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
  function Button(args: ButtonProps, forwardedRef: React.Ref<HTMLButtonElement>) {
    // First pass: merge slot props so React Aria hooks see complete props
    const { props: mergedProps, ref: mergedRef } = useProps(args, {}, forwardedRef);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    // React Aria hooks receive slot-merged props and internal ref
    const { buttonProps, isPressed } = useButton(mergedProps, buttonRef);
    const { focusProps, isFocused, isFocusVisible } = useFocusRing(mergedProps);
    const { hoverProps, isHovered } = useHover(mergedProps);

    // Render state for children render function
    const renderState: ButtonRenderProps = {
      isPressed,
      isHovered,
      isFocused,
      isFocusVisible
    };

    // Execute children render prop explicitly (before useProps to prevent incorrect execution)
    const content = typeof args.children === 'function' ? args.children(renderState) : args.children;

    // Second pass: apply user props with render state via apply()
    // Apply merges React Aria props as defaults that slots can override
    const { apply } = useProps(args, renderState);

    const dataAttrs = useDataAttributes({
      pressed: isPressed,
      hovered: isHovered,
      focused: isFocused,
      focusVisible: isFocusVisible,
      disabled: mergedProps.isDisabled
    });

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
        {content}
      </button>
    );
  }
);
