import React from 'react';
import { Environment, type EnvironmentProps } from './index.tsx';

/**
 * Higher-order component that wraps a component with a locked Environment.
 * This creates a "lock boundary" that flags any slot modifications applied
 * from outside the lock as consumer overrides (with data-override attributes).
 *
 * This is useful for design system components that want to distinguish between:
 * - Internal composition (slots added inside the locked component) - not flagged
 * - Consumer modifications (slots passed from outside) - flagged with data-override
 *
 * @param Component - The component to wrap with a locked environment
 * @param displayName - Optional display name for the wrapped component
 * @returns A new component wrapped with Environment lock={true}
 *
 * @example
 * ```tsx
 * // Create a design system component with lock boundary
 * const MyDesignComponent = withLock(function MyComponent(props) {
 *   return (
 *     <Container>
 *       <Button slot="trigger">Click Me</Button>
 *     </Container>
 *   );
 * });
 *
 * // Consumer usage - any slots passed here will be flagged
 * <MyDesignComponent slots={{ trigger: { className: 'custom' } }} />
 * // The trigger button will have data-override="className slot"
 * ```
 */
export function withLock<Props extends object>(
  Component: React.ComponentType<Props>,
  displayName?: string
): React.ComponentType<Props & Partial<EnvironmentProps>> {
  function LockedComponent(props: Props & Partial<EnvironmentProps>) {
    const { components, window, document, sprite, root, ...componentProps } = props as Props &
      Partial<EnvironmentProps>;

    const envProps: Partial<EnvironmentProps> = {
      lock: true,
      ...(components && { components }),
      ...(window && { window }),
      ...(document && { document }),
      ...(sprite && { sprite }),
      ...(root && { root })
    };

    return (
      <Environment {...envProps}>
        <Component {...(componentProps as Props)} />
      </Environment>
    );
  }

  LockedComponent.displayName = displayName || `withLock(${Component.displayName || Component.name || 'Component'})`;

  return LockedComponent;
}
