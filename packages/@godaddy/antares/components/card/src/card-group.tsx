import { createContext, forwardRef, useContext, type ForwardedRef, type ReactNode } from 'react';
import { GridList as RACGridList, type GridListProps as RACGridListProps } from 'react-aria-components';
import { Grid, type GridOwnProps } from '#components/layout/grid';

/** True while rendering inside a CardGroup, so Card renders as a collection row. */
const CardGroupContext = createContext(false);

/** Whether the surrounding CardGroup owns this Card's selection, action, and navigation. */
export function useIsInCardGroup() {
  return useContext(CardGroupContext);
}

/** Renders children as if outside any CardGroup, so a nested Card is not another row. */
export function OutsideCardGroup({ children }: { children: ReactNode }) {
  return <CardGroupContext.Provider value={false}>{children}</CardGroupContext.Provider>;
}

/** Props for CardGroup. */
export interface CardGroupProps<T extends object>
  extends Omit<RACGridListProps<T>, 'layout'>,
    Omit<GridOwnProps, 'as'> {}

/**
 * A collection of Cards. React Aria owns selection, row actions, focus, and arrow navigation.
 *
 * @param props - {@link CardGroupProps}
 */
export const CardGroup = forwardRef(function CardGroup<T extends object>(
  props: CardGroupProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <CardGroupContext.Provider value={true}>
      <Grid
        columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))"
        alignItems="start"
        gap="lg"
        {...props}
        ref={ref}
        as={RACGridList<T>}
        layout="grid"
      />
    </CardGroupContext.Provider>
  );
}) as <T extends object>(props: CardGroupProps<T> & { ref?: React.Ref<HTMLDivElement> }) => React.ReactElement | null;
