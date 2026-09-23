import { createContext, useContext, type ReactNode } from 'react';
import styles from './index.module.css';

/** Coordinated size of text, controls, and default spacing. */
export type ScaleSize = 'sm' | 'md' | 'lg';

const DeclaredSizeContext = createContext<ScaleSize | undefined>(undefined);

/** The explicit size, otherwise the nearest scope's. */
export function useDeclaredSize(size?: ScaleSize): ScaleSize | undefined {
  const declared = useContext(DeclaredSizeContext);
  return size ?? declared;
}

const SCALE: Record<ScaleSize, string> = {
  sm: styles.scaleSm,
  md: styles.scaleMd,
  lg: styles.scaleLg
};

/** Class that sets the size scale on a component's own element. */
export function sizeScaleClassName(size?: ScaleSize) {
  return size && SCALE[size];
}

export interface SizeScopeProps {
  /** Size of everything inside. Inherits when omitted. */
  size?: ScaleSize;

  /** Content to size. */
  children?: ReactNode;
}

/**
 * Sizes the text, controls, and default spacing of the components inside it, portaled content
 * included. It renders no element, so plain HTML inside keeps its own typography.
 *
 * @example
 * ```tsx
 * <SizeScope size="sm">
 *   <Text>Compact copy</Text>
 *   <Button>Save</Button>
 * </SizeScope>
 * ```
 */
export function SizeScope({ size, children }: SizeScopeProps) {
  const resolved = useDeclaredSize(size);
  return <DeclaredSizeContext.Provider value={resolved}>{children}</DeclaredSizeContext.Provider>;
}
