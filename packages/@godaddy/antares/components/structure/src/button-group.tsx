import { createContext, forwardRef } from 'react';
import { useContextProps, type ContextValue } from 'react-aria-components';
import { Flex, type FlexProps } from '#components/layout/flex';

export interface ButtonGroupProps extends Omit<FlexProps, 'as'> {}

/** Lets a parent style/space every `ButtonGroup` it renders. Optional. */
export const ButtonGroupContext = createContext<ContextValue<ButtonGroupProps, HTMLDivElement>>(null);

/**
 * Generic button cluster: a group of related actions. Use it as a component's actions region
 * directly (e.g. at the bottom of a `Modal`) or nested inside a `Footer`.
 * Defaults to an end-aligned, wrapping row (`role="group"`).
 *
 * @param props - {@link ButtonGroupProps}
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(props, ref) {
  [props, ref] = useContextProps(props, ref, ButtonGroupContext);

  return <Flex as="div" direction="row" gap="sm" wrap="wrap" {...props} role="group" ref={ref} />;
});
