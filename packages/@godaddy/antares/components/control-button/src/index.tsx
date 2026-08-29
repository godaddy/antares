import { createContext, forwardRef } from 'react';
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  useContextProps,
  type ContextValue
} from 'react-aria-components';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

export interface ControlButtonProps extends RACButtonProps, FlexOwnProps {}

/** Context for configuring descendant ControlButton components. */
export const ControlButtonContext = createContext<ContextValue<ControlButtonProps, HTMLButtonElement>>(null);

/**
 * Pressable control for use inside a {@link Group}.
 *
 * @param props - {@link ControlButtonProps}
 */
export const ControlButton = forwardRef<HTMLButtonElement, ControlButtonProps>(function ControlButton(props, ref) {
  [props, ref] = useContextProps(props, ref, ControlButtonContext);
  const { className, ...rest } = props;

  return (
    <Flex
      alignItems="center"
      {...rest}
      as={RACButton}
      ref={ref}
      className={composeClassName(className, styles.controlButton)}
      data-control-button
    />
  );
});
