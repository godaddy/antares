/// <reference types="vite/client" />
import React, { useContext, memo } from 'react';
import { useDeepCompareMemo } from 'use-deep-compare';
import { Box, type BoxContext } from '@bento/box';
import { BentoError } from '@bento/error';
import { override } from './override.ts';
import { replace } from './replace.ts';

/**
 * Interface representing a collection of slots.
 */
export interface Slots {
  /**
   * A named part of a component that can be customized. This is implemented by the consuming component.
   * The exposed slot names of a component are available in the components documentation.
   */
  slot?: string;
  /**
   * An object that contains the customizations for the slots.
   * The main way you interact with the slot system as a consumer.
   */
  slots?: Record<string, object | Function>;
}

//
// A list of libraries that are currently registered by the system. This is
// needed to prevent duplicate component names from being registered as the
// names are used to target the correct component with slot overrides.
//
export const library = new Set<string>();

/**
 * Higher-order component that wraps a given component with slot functionality.
 * This allows components to be dynamically replaced or overridden based on the provided context and slots.
 *
 * @param name - The unique name of the component. This is used to identify the component for slot overrides.
 * @param Component - The component that should be rendered.
 * @param modifiers - The modifier functions that should be applied to the component.
 * @returns The wrapped component.
 * @public
 *
 * @throws {BentoError} If the component name has already been registered (in development mode).
 * @throws {BentoError} If any of the supplied modifiers are not functions.
 *
 * @example
 * ```tsx
 * const MyComponent = () => <div>My Component</div>;
 * const SlottedMyComponent = withSlots('MyComponent', MyComponent);
 * ```
 */
export function withSlots<Props extends object>(
  name: string,
  Component: React.ComponentType<Props>,
  modifiers = [replace, override]
) {
  function WrappedComponent(propsAndSlots: Props & Slots) {
    const { slot = '', slots = {}, ...restProps } = propsAndSlots;
    let props = { ...restProps } as Props;
    let Element = Component;

    //
    // We need to create a new context object to prevent introducing properties
    // to a context that is shared across components. Without cloning the context
    // properties like `namespace` will become corrupted as they would start to
    // include the slot name of siblings instead of just being a pure parent/child
    // relationship.
    let ctx = { ...useContext<BoxContext<Props>>(Box) };
    ctx.env = { ...ctx.env };
    ctx.slots = { ...ctx.slots };
    ctx.slots.namespace = [...ctx.slots.namespace, slot].filter(Boolean);

    const currentNamespace = ctx.slots.namespace.join('.');
    const inheritedSlots: Record<string, any> = {};
    const inheritedGenerations: Record<string, number> = {};
    const prefix = `${currentNamespace}.`;

    //
    // Only inherit slots from the parent that match the current namespace.
    // If the current namespace is empty (root level), inherit all slots
    // that don't contain a dot (i.e., slots at the root level only).
    //
    for (const key in ctx.slots.assigned) {
      if (currentNamespace === '' && !key.includes('.')) {
        inheritedSlots[key] = ctx.slots.assigned[key];
        if (ctx.slots.slotGenerations && key in ctx.slots.slotGenerations) {
          inheritedGenerations[key] = ctx.slots.slotGenerations[key];
        }
      } else if (key === currentNamespace || key.startsWith(prefix)) {
        inheritedSlots[key] = ctx.slots.assigned[key];
        if (ctx.slots.slotGenerations && key in ctx.slots.slotGenerations) {
          inheritedGenerations[key] = ctx.slots.slotGenerations[key];
        }
      }
    }

    ctx.slots.assigned = inheritedSlots;
    ctx.slots.slotGenerations = inheritedGenerations;

    //
    // merge the new slots with the assigned slots,
    // parent component slots should take precedence over child ones.
    //
    const currentGeneration = ctx.env.lockGeneration || 0;

    for (const slotKey in slots) {
      // Build the fully qualified slot key by prefixing with current namespace
      const namespacedKey = ctx.slots.namespace.length > 0 ? `${currentNamespace}.${slotKey}` : slotKey;
      const assignedSlot = ctx.slots.assigned[namespacedKey];
      const newSlot = slots[slotKey];

      //
      // New slots are assigned if none exist, or merged with the new slots.
      // If the assigned slot exists and is an object, keep it as is.
      //
      if (!assignedSlot) {
        ctx.slots.assigned[namespacedKey] = newSlot;
        // Tag new slot with current generation
        ctx.slots.slotGenerations = ctx.slots.slotGenerations || {};
        ctx.slots.slotGenerations[namespacedKey] = currentGeneration;
      } else if (typeof assignedSlot === 'object') {
        ctx.slots.assigned[namespacedKey] = { ...newSlot, ...assignedSlot };
        // Keep the earliest (lowest) generation when merging
        // If the slot doesn't have a generation yet, use current generation
        ctx.slots.slotGenerations = ctx.slots.slotGenerations || {};
        if (!(namespacedKey in ctx.slots.slotGenerations)) {
          ctx.slots.slotGenerations[namespacedKey] = currentGeneration;
        }
        // If newSlot is from an earlier generation (consumer slot), update the tag
        // We assume parent slots (assignedSlot) are from consumer, so keep their generation
      } else if (typeof assignedSlot === 'function') {
        const existingPrevious = assignedSlot.__slotPrevious || [];
        const newPrevious = [newSlot, ...existingPrevious];
        const mergedFnSlot = function mergedFnSlot({ props, original, previous }: any) {
          return assignedSlot({ props, original, previous: previous || newPrevious });
        };

        mergedFnSlot.__slotPrevious = newPrevious;
        ctx.slots.assigned[namespacedKey] = mergedFnSlot;
        // For functions, keep the parent function's generation (it takes precedence)
        ctx.slots.slotGenerations = ctx.slots.slotGenerations || {};
        if (!(namespacedKey in ctx.slots.slotGenerations)) {
          ctx.slots.slotGenerations[namespacedKey] = currentGeneration;
        }
      }
    }

    //
    // Modifiers allow you to manipulate the context, props, and component with
    // a single function. This makes it easier to turn on or off functionality
    // that you might not need for your components.
    //
    // For Bento based components we supply the following modifiers by default:
    // - replace: Allows you to replace the component with another component
    //   based on the slots and provided context.
    // - override: Makes a note of potential design or functional overrides
    //   that are applied to the component. Making it easier to provide support
    //   to find common overrides in your application.
    //
    modifiers.forEach(function forEach(modifier) {
      const mods: {
        Component?: React.ComponentType<Props>;
        context?: Partial<BoxContext<Props>> | Record<string, any>;
        props?: object;
      } =
        modifier({
          Component: Element,
          context: ctx,
          props,
          name
        }) || {};

      if (typeof mods.context === 'object')
        ctx = {
          env: { ...ctx.env, ...mods.context?.env },
          slots: { ...ctx.slots, ...mods.context?.slots }
        };

      if (typeof mods.props === 'object') props = { ...props, ...mods.props };
      if (mods.Component) Element = mods.Component;
    });

    const context = useDeepCompareMemo(() => ctx, [ctx]);
    const rendered = (
      <Box.Provider value={context}>
        <Element {...props} />
      </Box.Provider>
    );

    const slotted = ctx.slots.assigned[ctx.slots.namespace.join('.')];

    if (typeof slotted !== 'function') return rendered;
    return slotted({ props, original: rendered.props.children });
  }

  const SlottedComponent = memo<Props & Slots>(WrappedComponent);
  SlottedComponent.displayName = `Slotted(${name})`;

  if (process.env.NODE_ENV !== 'production') {
    //
    // This enables re-render tracking for every Bento based component using the
    // `@welldone-software/why-did-you-render` package.
    //
    (SlottedComponent as any).whyDidYouRender = true;

    //
    // We want to throw the following error only in a development environment.
    //
    // While the requirement is to have unique components so each component can
    // be individually and correctly targeted using our provided context we
    // want to be mindful that we're breaking an application for the right
    // reasons. We should only throw in production if an application cannot
    // recover from this error.
    //
    // In the case of these overrides
    //
    if (library.has(name) && !import.meta.hot)
      throw new BentoError({
        message: 'The supplied component %s has already been registered.',
        args: [name],
        method: 'withSlots',
        name: 'slots'
      });

    library.add(name);
  }

  modifiers.forEach(function forEach(modifier) {
    if (typeof modifier !== 'function')
      throw new BentoError({
        message: 'The supplied component modifier is not a function.',
        method: 'withSlots',
        name: 'slots'
      });
  });

  return SlottedComponent;
}
