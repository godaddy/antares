/* v8 ignore next */
import React, { forwardRef } from 'react';

/**
 * Wraps a component with forwardRef if needed for React 18 compatibility.
 * In React 19, components can receive refs as props without wrapping.
 *
 * This utility automatically detects:
 * - Whether the component is a function (not already wrapped with forwardRef)
 * - Whether the component might accept a ref parameter (by checking function.length !== 1)
 * - The current React version
 *
 * Components already wrapped with forwardRef are objects, not functions, so they
 * will be returned unchanged.
 *
 * Wrapping occurs in React 18 when:
 * - Component.length > 1 (explicit ref parameter like: function(props, ref))
 * - Component.length === 0 (rest parameters like: function(...args) for useProps(...args) pattern)
 *
 * No wrapping when:
 * - Component.length === 1 (only props parameter, no ref needed)
 *
 * @param Component - The component to wrap
 * @returns The component, optionally wrapped with forwardRef for React 18
 * @public
 *
 * @example
 * ```tsx
 * // Component with 2 parameters will be automatically wrapped in React 18
 * const MyComponent = withForwardRef(function MyComponent(props, ref) {
 *   return <div ref={ref}>{props.children}</div>;
 * });
 *
 * // Component with rest parameters will be wrapped in React 18
 * const MyComponent = withForwardRef(function MyComponent(...args) {
 *   const { props, ref } = useProps(args);
 *   return <div ref={ref}>{props.children}</div>;
 * });
 *
 * // Component with only props will NOT be wrapped (no ref forwarding needed)
 * const MyComponent = withForwardRef(function MyComponent(props) {
 *   return <div>{props.children}</div>;
 * });
 *
 * // Already using forwardRef (an object, not a function) - returned unchanged
 * const MyComponent = withForwardRef(
 *   React.forwardRef(function MyComponent(props, ref) {
 *     return <div ref={ref}>{props.children}</div>;
 *   })
 * );
 * ```
 */
export function withForwardRef<Props extends object>(
  Component: React.ComponentType<Props>
): React.ComponentType<Props> {
  // forwardRef returns an object, not a function, so checking typeof === 'function'
  // automatically excludes components already wrapped with forwardRef
  const isFunction = typeof Component === 'function';

  // Check if it's a class component (has prototype.isReactComponent or extends Component)
  const isClass = isFunction && (Component.prototype?.isReactComponent || Component.prototype?.render);

  // In React 18, we need to wrap functional components that might accept refs.
  // We wrap if Component.length !== 1:
  // - length > 1: explicit ref parameter (function(props, ref))
  // - length === 0: rest parameters (function(...args)) or no params
  // We don't wrap if length === 1: only accepts props, no ref
  const mayAcceptRef = isFunction && !isClass && Component.length !== 1;
  const reactMajorVersion = Number.parseInt(React.version.split('.')[0], 10);
  const needsWrapping = reactMajorVersion < 19 && mayAcceptRef;

  if (!needsWrapping) {
    return Component;
  }

  return forwardRef(Component as any) as any;
}
