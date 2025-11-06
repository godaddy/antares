import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { useButton, type AriaButtonProps, HoverEvents } from 'react-aria';
import React, { ForwardedRef, forwardRef } from 'react';

export interface ButtonProps
  extends Omit<AriaButtonProps, 'children' | 'href' | 'target' | 'rel' | 'elementType'>,
    HoverEvents {
  /** The content to display inside the button. */
  children: React.ReactNode;
}

/**
 * A complete button component built on top of the Pressable primitive.
 * Renders as a native button element with all accessibility and interaction features.
 *
 * @example
 * ```tsx
 * <Button onPress={() => console.log('Button pressed!')}>Click me</Button>
 * ```
 */
export const Button = withSlots(
  'BentoButton',
  forwardRef(function Button(args: ButtonProps, ref: ForwardedRef<HTMLButtonElement | null>) {
    const {
      props: { children, ref: slotRef, ...props }
    } = useProps(args);
    const { buttonProps } = useButton(props, slotRef);

    return (
      <button {...buttonProps} ref={slotRef}>
        {children}
      </button>
    );
  })
);
