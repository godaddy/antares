import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { useButton, type AriaButtonProps, type HoverEvents } from 'react-aria';
/* v8 ignore next */
import React, { ComponentProps } from 'react';

export interface ButtonProps
  extends Omit<AriaButtonProps, 'children' | 'href' | 'target' | 'rel' | 'elementType'>,
    HoverEvents,
    Omit<ComponentProps<'button'>, keyof AriaButtonProps | 'children' | 'ref'> {
  /** The content to display inside the button. */
  children?: React.ReactNode;
}

/**
 * A complete button component built on React Aria's useButton.
 * Renders as a native button element with all accessibility and interaction features.
 *
 * @example
 * ```tsx
 * <Button onPress={() => console.log('Button pressed!')}>Click me</Button>
 * ```
 */
export const Button = withSlots(
  'BentoButton',
  function Button(args: ButtonProps, forwardedRef: React.ForwardedRef<HTMLButtonElement>) {
    const { props, ref, apply } = useProps(args, {}, forwardedRef);
    const { buttonProps } = useButton(props, ref as React.RefObject<HTMLButtonElement>);

    return (
      <button {...apply(buttonProps)} ref={ref}>
        {props.children}
      </button>
    );
  }
);
