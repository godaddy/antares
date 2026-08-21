import React, { forwardRef, type HTMLAttributes, type ReactElement } from 'react';
import { Pressable as RACPressable } from 'react-aria-components';
import type { PressableProps as RACPressableProps } from 'react-aria/Pressable';
import { composeClassName, type ClassNameProp } from '../../../utils/render-props.ts';
import styles from './index.module.css';

/** Props for {@link Pressable}. */
export interface PressableProps extends RACPressableProps {}

interface PressableChildProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
  className?: ClassNameProp<unknown>;
}

/**
 * Makes one child interactive with pointer, touch, and keyboard support.
 * Adds Antares styles for hover, pressed, focus, and disabled behavior without a DOM wrapper.
 * The child must forward its ref and DOM props.
 *
 * @param props - The properties {@link PressableProps} passed to the component.
 *
 * @example
 * ```tsx
 * <Pressable aria-label="Account menu" onPress={openAccountMenu}>
 *   <Avatar role="button">
 *     <Text>UT</Text>
 *   </Avatar>
 * </Pressable>
 * ```
 */
export const Pressable = forwardRef<HTMLElement, PressableProps>(function Pressable(props, ref) {
  const { children, isDisabled, ...rest } = props;
  const child = React.Children.only(children) as ReactElement<PressableChildProps>;
  const styledChild = React.cloneElement(child, {
    className: composeClassName(child.props.className, styles.pressable)
  });

  return (
    <RACPressable {...rest} isDisabled={isDisabled} ref={ref}>
      {styledChild as RACPressableProps['children']}
    </RACPressable>
  );
});
