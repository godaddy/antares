import React, { forwardRef, type HTMLAttributes, type ReactElement } from 'react';
import { Pressable as RACPressable } from 'react-aria-components';
import type { PressableProps as RACPressableProps } from 'react-aria/Pressable';
import styles from './index.module.css';

export interface PressableProps extends RACPressableProps {}

/**
 * A wrapperless interaction primitive that makes a single child element pressable.
 * It applies Antares ghost interaction styles (hover/focus/press outlines) directly
 * to the child without introducing an extra DOM node.
 *
 * @param props - The properties {@link PressableProps} passed to the component.
 */
export const Pressable = forwardRef<HTMLElement, PressableProps>(function Pressable(props, ref) {
  const { children, isDisabled, ...rest } = props;
  const child = React.Children.only(children) as ReactElement<HTMLAttributes<HTMLElement>>;
  const styledChild = React.cloneElement(child, {
    className: [styles.pressable, child.props.className].filter(Boolean).join(' ')
  });

  return (
    <RACPressable {...rest} isDisabled={isDisabled} ref={ref}>
      {styledChild as RACPressableProps['children']}
    </RACPressable>
  );
});
