import type { ReactNode } from 'react';
import { Virtualizer as RACVirtualizer, type VirtualizerProps as RACVirtualizerProps } from 'react-aria-components';

export interface VirtualizerProps<O> extends Omit<RACVirtualizerProps<O>, 'children'> {
  /** Supported collection whose items are positioned by the selected layout. */
  children: ReactNode;
}

/**
 * Renders the visible portion of a React Aria collection.
 * The child collection owns its DOM surface, label, selection, style, and ref.
 * @typeParam O - Options accepted by the selected layout.
 */
export function Virtualizer<O>(props: VirtualizerProps<O>) {
  return <RACVirtualizer {...props} />;
}

export {
  ListLayout,
  GridLayout,
  WaterfallLayout,
  TableLayout,
  Size,
  type ListLayoutOptions,
  type GridLayoutOptions,
  type WaterfallLayoutOptions,
  type TableLayoutProps
} from 'react-aria-components';
