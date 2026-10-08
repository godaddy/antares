import { createContext, useContext } from 'react';
import type { ProgressBarRenderProps } from 'react-aria-components';

export const ProgressBarStateContext = createContext<ProgressBarRenderProps | null>(null);

export function useProgressBarState() {
  const state = useContext(ProgressBarStateContext);
  if (!state) throw new Error('ProgressBar parts must be rendered inside a ProgressBar.');
  return state;
}
