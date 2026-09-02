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
 * Semantic grouping container. Layout/chrome come from a parent field's GroupContext when present.
 */
export const Group = forwardRef<HTMLDivElement, GroupProps>(function Group(props, ref) {
  [props, ref] = useContextProps(props, ref, GroupContext);
  return <Flex {...props} as={RACGroup} slot={null} ref={ref} />;
});
