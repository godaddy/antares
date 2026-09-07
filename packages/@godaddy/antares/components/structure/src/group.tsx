import { forwardRef } from 'react';
import {
  Group as RACGroup,
  GroupContext as RACGroupContext,
  useContextProps,
  type GroupProps as RACGroupProps
} from 'react-aria-components';
import { Flex, type FlexOwnProps } from '#components/layout/flex';

export const GroupContext = RACGroupContext;

export interface GroupProps extends RACGroupProps, Omit<FlexOwnProps, 'as'> {}

/**
 * Semantic grouping container. `data-group` lets a surrounding field's CSS style it as
 * the field box; RAC's own group context supplies the field's aria wiring.
 */
export const Group = forwardRef<HTMLDivElement, GroupProps>(function Group(props, ref) {
  [props, ref] = useContextProps(props, ref, GroupContext);
  return <Flex {...props} as={RACGroup} slot={null} ref={ref} data-group="" />;
});
