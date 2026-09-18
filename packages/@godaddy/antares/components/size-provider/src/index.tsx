import { createContext, type ReactNode, useContext } from 'react';

/** Coordinated size of participating controls and surfaces. */
export type InterfaceSize = 'sm' | 'md' | 'lg';

const SizeContext = createContext<InterfaceSize>('md');

export interface SizeProviderProps {
  /** Defaults for participating descendants. Inherits when omitted. */
  size?: InterfaceSize;

  /** Content to receive the size defaults. No wrapper is rendered. */
  children?: ReactNode;
}

export function useSize(size?: InterfaceSize | null): InterfaceSize {
  const inherited = useContext(SizeContext);
  return size ?? inherited;
}

/** Supplies interface-size defaults without styling bare text or adding a DOM element. */
export function SizeProvider({ size, children }: SizeProviderProps) {
  const resolvedSize = useSize(size);
  return <SizeContext.Provider value={resolvedSize}>{children}</SizeContext.Provider>;
}
