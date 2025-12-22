import React, { createContext } from 'react';

export type RootNode = ShadowRoot | Document | Node;

export interface EnvContext<Props> {
  /**
   * Mapping of the components that should be replaced.
   * Where the key if the unique identifier of the function
   * and the value the component it should be replaced with.
   *
   */
  components: Record<string, React.ComponentType<Props> | { props: Record<string, any> }>;

  /**
   * Get the window object for the rendering context.
   */
  window: () => Window & typeof globalThis;

  /**
   * Get the document object for the rendering context.
   */
  document: () => Document;

  /**
   * External sprite URL.
   */
  sprite: string;

  /**
   * Indicates if the environment is currently locked.
   * When locked, modifications applied after the lock are flagged with data-override.
   */
  locked: boolean;

  /**
   * Current lock generation number.
   * Increments each time a new Environment with lock={true} is created.
   * Used to determine if a slot was added before or after a lock boundary.
   */
  lockGeneration: number;

  [key: string]: any;
}

export interface SlotsContext {
  /**
   * Object where the keys are the namespaced slot names and the values are the slot components.
   */
  assigned: Record<string, any>;

  /**
   * Ordered list of parent slot names that will be used as namespace.
   */
  namespace: string[];

  /**
   * Indicator if a `components` override has been applied to the parent or current component.
   */
  override: boolean;

  /**
   * Tracks the lock generation for each slot.
   * Maps slot name to the lockGeneration value when the slot was first assigned.
   */
  slotGenerations: Record<string, number>;
}

export interface BoxContext<Props> {
  /**
   * Setup a custom environment for the component.
   */
  env: EnvContext<Props>;

  /**
   * Slots for the component.
   */
  slots: SlotsContext;
}

/**
 * Default values for the Box context.
 *
 * @param root - The root node of the component.
 * @returns The default values for the Box context.
 * @private
 */
export function defaults(root?: RootNode): BoxContext<any> {
  /**
   * Get the window object for the rendering context.
   *
   * @param root - The root node of the component.
   * @returns The window object for the rendering context.
   * @private
   */
  function getWindow(root: Node | ShadowRoot | Document | null | undefined): Window & typeof globalThis {
    if (root && 'host' in root) return getWindow(root.host);
    if (root && 'defaultView' in root) return root.defaultView ?? window;
    return root?.ownerDocument?.defaultView ?? window;
  }

  /**
   * Get the document object for the rendering context.
   *
   * @param root - The root node of the component.
   * @returns The document object for the rendering context.
   * @private
   */
  function getDocument(root: Element | Window | Node | Document | null | undefined): Document {
    if (root && 'nodeType' in root && root.nodeType === 9) return root as Document;
    if (root && 'document' in root) return root.document;
    return root?.ownerDocument ?? document;
  }

  return {
    env: {
      components: {},
      sprite: '',
      locked: false,
      lockGeneration: 0,
      document: () => getDocument(root),
      window: () => getWindow(root)
    },
    slots: {
      override: false,
      namespace: [],
      assigned: {},
      slotGenerations: {}
    }
  };
}

/**
 * Box context for managing component environment and slots.
 *
 * @public
 */
export const Box = createContext<BoxContext<any>>(defaults());

/**
 * Props for the Slot component.
 *
 * @public
 */
export interface SlotProps {
  /**
   * Slots to assign and pass to children via Box context.
   * These slots will be merged with any existing slots from parent context.
   */
  slots: Record<string, any>;

  /**
   * Children to render with the slot context.
   */
  children: React.ReactNode;
}

/**
 * Slot component that handles Box context setup for passing slots to children.
 * This component simplifies the pattern of merging slots into the Box context.
 *
 * @component
 * @param props - The properties {@link SlotProps} passed to the Slot component.
 *
 * @example
 * ```tsx
 * import { Slot } from '@bento/box';
 *
 * function MyComponent({ children }) {
 *   const slots = {
 *     trigger: { onClick: handleClick },
 *     content: { role: 'dialog' }
 *   };
 *
 *   return (
 *     <Slot slots={slots}>
 *       {children}
 *     </Slot>
 *   );
 * }
 * ```
 *
 * @public
 */
export function Slot({ slots, children }: SlotProps): React.ReactElement {
  const ctx = React.useContext<BoxContext<any>>(Box);

  // Create new context with slots merged in
  const newContext: BoxContext<any> = React.useMemo(
    function createContext() {
      return {
        env: { ...ctx.env },
        slots: {
          ...ctx.slots,
          assigned: {
            ...ctx.slots.assigned,
            ...slots
          }
        }
      };
    },
    [ctx, slots]
  );

  return <Box.Provider value={newContext}>{children}</Box.Provider>;
}
