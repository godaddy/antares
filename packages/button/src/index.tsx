import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { Pressable, type PressableProps } from '@bento/pressable';
import { useButton } from 'react-aria';
import React, { ComponentProps } from 'react';

export interface ButtonProps
  extends Omit<PressableProps, 'children'>,
    Omit<ComponentProps<'button'>, keyof PressableProps> {
  childRef?: React.Ref<HTMLButtonElement>;
  children: React.ReactNode;
}

/**
 * A complete button component built on top of the Pressable primitive.
 * Renders as a native button element with all accessibility and interaction features.
 *
 * @component
 * @param {ButtonProps} args - The properties passed to the Button component.
 * @param {React.ReactNode} args.children - The content to display inside the button.
 *
 * @example
 * ```tsx
 * <Button onPress={() => console.log('Button pressed!')}>Click me</Button>
 * ```
 *
 * @public
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
