import {
  usePress,
  useFocusRing,
  useHover,
  mergeProps,
  type PressProps,
  useFocusable,
  type PressEvent
} from 'react-aria';
import { mergeRefs } from '@react-aria/utils';
import { useDataAttributes } from '@bento/use-data-attributes';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import React, { type HTMLAttributes, useRef } from 'react';
import style from './pressable.module.css';

export interface PressableProps extends PressProps, Omit<HTMLAttributes<HTMLElement>, keyof PressProps> {
  /** A single React element that will be made pressable. */
  children: React.ReactElement;

  /**
   * Handler that is called when the pressable is pressed.
   * Similar to the standard `onClick` event, but normalized to handle all interaction methods consistently.
   */
  onPress?: (e: PressEvent) => void;

  /** Handler that is called when a press interaction starts. */
  onPressStart?: (e: PressEvent) => void;

  /**
   * Handler that is called when a press interaction ends, either
   * over the target or when the pointer leaves the target.
   */
  onPressEnd?: (e: PressEvent) => void;

  /** Handler that is called when the press state changes. */
  onPressChange?: (isPressed: boolean) => void;

  /**
   * Handler that is called when a press is released over the target, regardless of
   * whether it started on the target or not.
   */
  onPressUp?: (e: PressEvent) => void;
}

/**
 *
 * A behavioral primitive that can be used to make any element pressable while maintaining
 * consistent behavior across devices (mouse, touch, keyboard). It handles edge cases like
 * touch movement and quick releases, and provides proper ARIA attributes for accessibility.
 *
 * @example
 * ```tsx
 * // Make a div pressable
 * <Pressable onPress={handlePress}>
 *   <div>Click here</div>
 * </Pressable>
 * ```
 */
export const Pressable = withSlots('BentoPressable', function Pressable(args: PressableProps) {
  const { props, apply } = useProps(args);
  const ref = useRef<HTMLElement | null>(null);
  const { children, ...restProps } = props;
  const child = React.Children.only(children);
  const { focusableProps } = useFocusable(restProps, ref);
  const { focusProps, isFocused, isFocusVisible } = useFocusRing(restProps);
  const { hoverProps, isHovered } = useHover(restProps);
  const { pressProps, isPressed } = usePress({ ...restProps, ref });

  return React.cloneElement(child, {
    ...apply(
      {
        ...mergeProps(pressProps, focusProps, focusableProps, hoverProps),
        className: style.pressable
      },
      ['onPress', 'onPressStart', 'onPressEnd', 'onPressUp', 'onPressChange', 'children']
    ),
    ...useDataAttributes({
      pressed: isPressed,
      hovered: isHovered,
      focused: isFocused,
      focusVisible: isFocusVisible
    }),
    ref: mergeRefs((child as { ref?: React.Ref<HTMLElement> }).ref, ref)
  });
});
