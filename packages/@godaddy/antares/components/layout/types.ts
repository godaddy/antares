import type { Spacing } from './tokens.ts';

export interface SharedFlexGridProps {
  /** The distribution of space around children along the main axis in flex or inline axis in grid */
  justifyContent?:
    | 'normal'
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | (string & {});

  /** The distribution of space around children along the cross axis in flex or block axis in grid */
  alignContent?:
    | 'normal'
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | 'baseline'
    | (string & {});

  /** Defines the default justify-self for all children in a grid container. */
  justifyItems?: 'normal' | 'start' | 'end' | 'center' | 'stretch' | 'legacy' | (string & {});

  /** Sets the align-self property for each child. */
  alignItems?: 'normal' | 'start' | 'end' | 'center' | 'stretch' | 'baseline' | (string & {});

  /** The gap between children. */
  gap?: Spacing | Spacing[];

  /** The gap between columns. */
  columnGap?: Spacing;

  /** The gap between rows. */
  rowGap?: Spacing;
}
