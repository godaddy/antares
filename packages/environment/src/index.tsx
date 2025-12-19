import { Box, defaults, type BoxContext, type EnvContext } from '@bento/box';
import React, { useContext, type ReactElement } from 'react';
import { useDeepCompareMemo } from 'use-deep-compare';
import { merge } from 'ts-deepmerge';

export interface EnvironmentProps {
  /**
   * The root node (Document, ShadowRoot, or Node) to use for the environment context.
   * This will automatically update the `window` and `document` props.
   */
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

  /**
   * When true, creates a lock boundary. Slot modifications applied after this
   * lock will be detected and flagged with data-override attributes.
   * This is used by design systems to distinguish between internal composition
   * and consumer modifications.
   *
   * @defaultValue false
   */
  lock?: boolean;

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
 * @param props - The props for the `Environment` component.
 *
 * @returns A `Box.Provider` component that wraps the children with the configured context.
 *
 * @remarks
 * - If a value in the configuration is an array, it will be concatenated with the existing array in the context.
 * - If a value in the configuration is an object, it will be deeply merged with the existing object in the context.
 * - Primitive values in the configuration will overwrite the existing values in the context.
 * - When `lock={true}`, the lockGeneration is incremented, creating a boundary for detecting consumer modifications.
 *
 * @example
 * ```tsx
 * <Environment someKey="value" anotherKey={{ nested: true }}>
 *   <ChildComponent />
 * </Environment>
 * ```
 *
 * @example
 * ```tsx
 * // Create a lock boundary for a design system component
 * <Environment lock={true}>
 *   <MyComponent />
 * </Environment>
 * ```
 */
export function Environment({ children, lock = false, ...config }: EnvironmentProps) {
  let ctx = { ...useContext<BoxContext<Record<string, any>>>(Box) };

  const context = useDeepCompareMemo(
    function configureContext() {
      const { root, ...options } = config;

      ctx.env = merge(ctx.env, options) as EnvContext<Record<string, any>>;
      ctx.slots = { ...ctx.slots };

      // Handle lock generation
      if (lock && !ctx.env.locked) {
        // First lock in the tree
        // IMPORTANT: Before incrementing generation, tag ALL existing slots
        // with the current (pre-lock) generation. This marks them as "consumer slots"
        // that were passed before the lock boundary.
        const preLockGeneration = ctx.env.lockGeneration;
        ctx.slots.slotGenerations = { ...ctx.slots.slotGenerations };

        for (const slotKey in ctx.slots.assigned) {
          if (!(slotKey in ctx.slots.slotGenerations)) {
            ctx.slots.slotGenerations[slotKey] = preLockGeneration;
          }
        }

        // Now set locked and increment generation
        ctx.env.locked = true;
        ctx.env.lockGeneration = ctx.env.lockGeneration + 1;
      } else if (lock && ctx.env.locked) {
        // Nested lock - tag existing slots and increment generation
        const preLockGeneration = ctx.env.lockGeneration;
        ctx.slots.slotGenerations = { ...ctx.slots.slotGenerations };

        for (const slotKey in ctx.slots.assigned) {
          if (!(slotKey in ctx.slots.slotGenerations)) {
            ctx.slots.slotGenerations[slotKey] = preLockGeneration;
          }
        }

        ctx.env.lockGeneration = ctx.env.lockGeneration + 1;
      }
      // If lock={false}, don't increment generation (inherit parent's generation)

      if (root) {
        const { document, window } = defaults(root).env;
        ctx.env = merge(ctx.env, { document, window }) as EnvContext<Record<string, any>>;
      }

      return ctx;
    },
    [ctx, config, lock]
  );

  return <Box.Provider value={context}>{children}</Box.Provider>;
}

export { withLock } from './with-lock.tsx';
