import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { Pressable, type PressableProps } from '@bento/pressable';
import { useButton } from 'react-aria';
import React, { ComponentProps } from 'react';

export interface ButtonProps
  extends Omit<PressableProps, 'children'>,
    Omit<ComponentProps<'button'>, keyof PressableProps> {
  /** A ref to the button element. This is useful if you want to access the button element directly. */
  childRef?: React.Ref<HTMLButtonElement>;

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
export const Button = withSlots('BentoButton', function Button(args: ButtonProps) {
  const { props } = useProps(args);
  const { children, childRef, ...restProps } = props;
  const { buttonProps } = useButton(restProps, childRef);

  return (
    <Pressable {...restProps} slot="pressable">
      <button {...buttonProps} ref={childRef}>
        {children}
      </button>
    </Pressable>
  );
});
