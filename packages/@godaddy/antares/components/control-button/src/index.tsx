import { createContext, forwardRef } from 'react';
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  useContextProps,
  type ContextValue
} from 'react-aria-components';
import { Flex, type FlexOwnProps } from '#components/layout/flex';

export interface ControlButtonProps extends RACButtonProps, FlexOwnProps {}

/** Lets Field inject in-group button chrome without restyling {@link Button}. */
export const ControlButtonContext = createContext<ContextValue<ControlButtonProps, HTMLButtonElement>>(null);

/**
 * Unstyled RAC `Button` for use inside a {@link Group}. Field paints it via {@link ControlButtonContext}.
 *
 * @param props - {@link ControlButtonProps}
 */
export const ControlButton = forwardRef<HTMLButtonElement, ControlButtonProps>(function ControlButton(props, ref) {
  [props, ref] = useContextProps(props, ref, ControlButtonContext);

  return <Flex alignItems="center" {...props} as={RACButton} ref={ref} />;
});
