import { Box, defaults, type BoxContext, type EnvContext } from '@bento/box';
import React, { useContext, type ReactElement } from 'react';
import { useDeepCompareMemo } from 'use-deep-compare';
import { merge } from 'ts-deepmerge';

interface EnvironmentProps {
  root?: Document | ShadowRoot | Node;
  /**
   * The child components that will have access to the configured context.
   */
  children: ReactElement;
  /**
   * Object that contains components that should be replaced.
   */
  components?: Record<string, React.ComponentType<any> | { props: Record<string, any> }>;

  /**
   * Get the window object for the rendering context.
   */
  window?: () => Window & typeof globalThis;

  /**
   * Get the document object for the rendering context.
   */
  document?: () => Document;

  /**
   * External sprite URL.
   */
  sprite?: string;

  //
  // Catch all, to allow users specify custom configuration that can be shared
  // between Bento component that does need strong typing.
  //
  [key: string]: any;
}

/**
 * The `Environment` component is responsible for configuring and providing
 * a context to its children. It merges the provided configuration into the
 * existing context and ensures that the environment (`env`) is properly set up.
 *
 * @param {EnvironmentProps} props - The props for the `Environment` component.
 * @param {React.ReactNode} props.children - The child components that will have access to the configured context.
 * @param {Record<string, any>} props.config - The configuration object containing key-value pairs to be merged into the context.
 *
 * @returns {JSX.Element} A `Box.Provider` component that wraps the children with the configured context.
 *
 * @remarks
 * - If a value in the configuration is an array, it will be concatenated with the existing array in the context.
 * - If a value in the configuration is an object, it will be deeply merged with the existing object in the context.
 * - Primitive values in the configuration will overwrite the existing values in the context.
 *
 * @example
 * ```tsx
 * <Environment someKey="value" anotherKey={{ nested: true }}>
 *   <ChildComponent />
 * </Environment>
 * ```
 */
export function Environment({ children, ...config }: EnvironmentProps) {
  let ctx = { ...useContext<BoxContext<Record<string, any>>>(Box) };

  const context = useDeepCompareMemo(
    function configureContext() {
      const { root, ...options } = config;

      ctx.env = merge(ctx.env, options) as EnvContext<Record<string, any>>;

      if (root) {
        const { document, window } = defaults(root).env;
        ctx.env = merge(ctx.env, { document, window }) as EnvContext<Record<string, any>>;
      }

      return ctx;
    },
    [ctx, config]
  );

  return <Box.Provider value={context}>{children}</Box.Provider>;
}
