import { useDataAttributes } from '@bento/use-data-attributes';
import { useUNSAFE_PortalContext } from '@react-aria/overlays';
import { withSlots, type Slots } from '@bento/slots';
import { useProps } from '@bento/use-props';
/* v8 ignore next */
import React, { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

/**
 * Base props for the Portal component.
 *
 * @public
 */
export interface PortalBaseProps extends Slots {
  /**
   * The container to render the portal content into.
   * If not provided, Portal will check for React ARIA's PortalProvider,
   * and fall back to document.body.
   */
  container?: Element;

  /**
   * Should the portal content be mounted.
   * Set to false by default for server-side rendering compatibility.
   * Portal will not render children if not mounted.
   *
   * @default false
   */
  mounted?: boolean;

  /**
   * The content to render inside the portal.
   * Can be a React node or a render prop function that receives props.
   */
  children: ReactNode | ((data: { props: { mounted?: boolean } }) => ReactNode);
}

/**
 * Props for the Portal component.
 *
 * @public
 */
export type PortalProps = PortalBaseProps;

/**
 * Portal renders children into a target DOM container (default `document.body`) to avoid
 * clipping and establish consistent layering for overlays, drawers, popovers, toasts, etc.
 *
 * The Portal primitive integrates with React ARIA's `UNSAFE_PortalProvider` while remaining
 * independent and flexible. Container priority:
 * 1. Explicit `container` prop (highest priority)
 * 2. React ARIA's `UNSAFE_PortalProvider` container (via `useUNSAFE_PortalContext`)
 * 3. `document.body` (fallback)
 *
 * @component
 * @param args - The properties {@link PortalProps} passed to the Portal component.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Portal mounted={true}>
 *   <Container>
 *     <Text>This renders to document.body</Text>
 *   </Container>
 * </Portal>
 * ```
 *
 * @example
 * ```tsx
 * // With custom container
 * const containerRef = useRef(null);
 * <Portal container={containerRef.current} mounted={true}>
 *   <Container>Custom container content</Container>
 * </Portal>
 * ```
 *
 * @example
 * ```tsx
 * // With React ARIA PortalProvider
 * import { UNSAFE_PortalProvider } from 'react-aria';
 *
 * const containerRef = useRef(null);
 * <UNSAFE_PortalProvider getContainer={() => containerRef.current}>
 *   <Portal mounted={true}>
 *     <Container>Uses PortalProvider's container</Container>
 *   </Portal>
 * </UNSAFE_PortalProvider>
 * ```
 *
 * @public
 */
export const Portal = withSlots('BentoPortal', function Portal(args: PortalProps) {
  const { props, apply } = useProps(args);
  const { container: containerProp, mounted = false, children } = props;

  // Check for React ARIA's PortalProvider (optional)
  const portalContext = useUNSAFE_PortalContext();
  const portalContainer = portalContext?.getContainer?.();

  //
  // Generate data attributes for portal state. These will be applied to the
  // children of the portal as the Portal itself doesn't render DOM elements.
  //
  const data = useDataAttributes({
    portal: true,
    mounted
  });

  // Determine the target container with priority:
  // 1. Explicit container prop
  // 2. React ARIA PortalProvider container
  // 3. document.body (fallback)
  const container = containerProp || portalContainer || (typeof document !== 'undefined' ? document.body : null);

  // Don't render if not mounted (SSR safety)
  if (!mounted || container == null || children == null) return null;

  // Apply data attributes to all children (whether single element, array, or other)
  const attributes = apply(data, ['container', 'mounted', 'children']);

  return createPortal(
    React.Children.map(children, function applyAttributes(child) {
      return React.isValidElement(child) ? React.cloneElement(child as React.ReactElement, attributes) : child;
    }),
    container
  );
}) as (props: PortalProps) => React.ReactElement | null;
