import { createContext, forwardRef, useContext } from 'react';
import {
  Group as RACGroup,
  GroupContext as RACGroupContext,
  type GroupProps as RACGroupProps
} from 'react-aria-components';
import { FieldErrorContext } from '#components/field-error';
import { Flex, type FlexOwnProps } from '#components/layout/flex';

export const GroupContext = RACGroupContext;

/** Size for controls inside a field group. @default 'md' */
export type FieldSize = 'sm' | 'md';

export interface GroupProps extends RACGroupProps, FlexOwnProps {
  /** Size for the controls inside the group. @default 'md' */
  size?: FieldSize;
}

/**
 * True when the nearest ancestor is an Antares {@link Group}. Used by Select
 * to omit its own Field/Group wrapper inside a shared box.
 */
export const InGroupContext = createContext(false);

/**
 * Boxed row for field controls. Field injects chrome via GroupContext.
 *
 * @param props - {@link GroupProps}
 */
export const Group = forwardRef<HTMLDivElement, GroupProps>(function Group(props, ref) {
  const { className, isInvalid, size, ...rest } = props;
  const validation = useContext(FieldErrorContext);
  const isInvalidResolved = isInvalid ?? validation?.isInvalid;

  return (
    <InGroupContext.Provider value={true}>
      <Flex
        direction="row"
        wrap="nowrap"
        alignSelf="stretch"
        alignItems="stretch"
        elevation="card"
        isInvalid={isInvalidResolved}
        data-size={size === 'sm' ? 'sm' : undefined}
        {...rest}
        as={RACGroup}
        ref={ref}
        className={className}
      />
    </InGroupContext.Provider>
  );
});
