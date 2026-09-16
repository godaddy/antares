import { createContext, forwardRef } from 'react';
import { useContextProps, type ContextValue } from 'react-aria-components';
import { Flex, type FlexProps } from '#components/layout/flex';

export interface CornerActionsProps extends Omit<FlexProps, 'as'> {}

/** Lets a parent style/space every CornerActions region it renders. */
export const CornerActionsContext = createContext<ContextValue<CornerActionsProps, HTMLDivElement>>(null);

/** Always-visible trailing actions region for composed surfaces. */
export const CornerActions = forwardRef<HTMLDivElement, CornerActionsProps>(function CornerActions(props, ref) {
  [props, ref] = useContextProps(props, ref, CornerActionsContext);

  return <Flex direction="row" alignItems="center" gap="sm" {...props} as="div" data-corner-actions="true" ref={ref} />;
});
