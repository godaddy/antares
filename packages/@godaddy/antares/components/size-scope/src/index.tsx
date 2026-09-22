import { createContext, forwardRef, useContext, type ElementType, type ReactNode } from 'react';
import { surfaceClassName } from '#components/_internal/typography';
import type { PolymorphicComponent, PolymorphicProps, PolymorphicRef } from '#types/polymorphic-react.ts';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

/** Coordinated size of text, controls, and default spacing. */
export type ScaleSize = 'sm' | 'md' | 'lg';

const DeclaredSizeContext = createContext<ScaleSize | undefined>(undefined);

/**
 * The size a portaled surface applies: its own explicit size, otherwise the nearest one declared
 * above it in React. CSS inheritance cannot cross a portal, so the surface re-applies it.
 */
export function useDeclaredSize(size?: ScaleSize): ScaleSize | undefined {
  const declared = useContext(DeclaredSizeContext);
  return size ?? declared;
}

const SCALE: Record<ScaleSize, string> = {
  sm: styles.scaleSm,
  md: styles.scaleMd,
  lg: styles.scaleLg
};

/** Class that sets the size scale on an element. Nothing when no size is declared. */
export function sizeScaleClassName(size?: ScaleSize) {
  return size && SCALE[size];
}

export interface DeclaredSizeProps {
  /** Size to publish. When omitted, the enclosing declared size passes through. */
  size?: ScaleSize;

  children?: ReactNode;
}

/** Publishes an explicit size to portaled descendants. */
export function DeclaredSize({ size, children }: DeclaredSizeProps) {
  const resolved = useDeclaredSize(size);
  return <DeclaredSizeContext.Provider value={resolved}>{children}</DeclaredSizeContext.Provider>;
}

export interface SizeScopeOwnProps {
  /** Size of everything inside. Inherits the enclosing size when omitted. */
  size?: ScaleSize;

  /** Content to size. */
  children?: ReactNode;
}

/** Polymorphic SizeScope props. `as` picks the element to render. @default 'div' */
export type SizeScopeProps<C extends ElementType = 'div'> = PolymorphicProps<C, SizeScopeOwnProps>;

/**
 * Sizes a section. Text, controls, and default spacing inside it follow `size`, including content
 * rendered in a portal. A component's own `size` prop still wins for that component.
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
    <DeclaredSize size={size}>
      <Component
        {...rest}
        ref={ref}
        className={composeClassName(className, surfaceClassName, sizeScaleClassName(size))}
      >
        {children}
      </Component>
    </DeclaredSize>
  );
}) as PolymorphicComponent<SizeScopeOwnProps>;
