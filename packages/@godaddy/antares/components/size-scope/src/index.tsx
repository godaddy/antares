import { createContext, forwardRef, useContext, type ElementType, type ReactNode } from 'react';
import { surfaceClassName } from '#components/_internal/typography';
import type { PolymorphicComponent, PolymorphicProps, PolymorphicRef } from '#types/polymorphic-react.ts';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

/** Coordinated size of text, controls, and default spacing. */
export type ScaleSize = 'sm' | 'md' | 'lg';

const DeclaredSizeContext = createContext<ScaleSize | undefined>(undefined);

/** The explicit size, otherwise the nearest declared one. For surfaces rendered in a portal. */
export function useDeclaredSize(size?: ScaleSize): ScaleSize | undefined {
  const declared = useContext(DeclaredSizeContext);
  return size ?? declared;
}

const SCALE: Record<ScaleSize, string> = {
  sm: styles.scaleSm,
  md: styles.scaleMd,
  lg: styles.scaleLg
};

/** Class that sets the size scale on an element. */
export function sizeScaleClassName(size?: ScaleSize) {
  return size && SCALE[size];
}

export interface DeclaredSizeProviderProps {
  /** Size to publish. Passes the enclosing size through when omitted. */
  size?: ScaleSize;

  children?: ReactNode;
}

/** Publishes a size to portaled descendants. Sets no CSS; pair it with `sizeScaleClassName`. */
export function DeclaredSizeProvider({ size, children }: DeclaredSizeProviderProps) {
  const resolved = useDeclaredSize(size);
  return <DeclaredSizeContext.Provider value={resolved}>{children}</DeclaredSizeContext.Provider>;
}

export interface SizeScopeOwnProps {
  /** Size of everything inside. Inherits when omitted. */
  size?: ScaleSize;

  /** Content to size. */
  children?: ReactNode;
}

/** SizeScope props. `as` picks the element. @default 'div' */
export type SizeScopeProps<C extends ElementType = 'div'> = PolymorphicProps<C, SizeScopeOwnProps>;

/**
 * Sizes the text, controls, and default spacing inside it, portaled content included.
 *
 * @example
 * ```tsx
 * <SizeScope size="sm">
 *   <Text>Compact copy</Text>
 *   <Button>Save</Button>
 * </SizeScope>
 * ```
 */
export const SizeScope = forwardRef(function SizeScope(
  props: SizeScopeProps<ElementType>,
  ref: PolymorphicRef<ElementType>
) {
  const { size, as: Component = 'div', className, children, ...rest } = props;

  return (
    <DeclaredSizeProvider size={size}>
      <Component
        {...rest}
        ref={ref}
        className={composeClassName(className, surfaceClassName, sizeScaleClassName(size))}
      >
        {children}
      </Component>
    </DeclaredSizeProvider>
  );
}) as PolymorphicComponent<SizeScopeOwnProps>;
