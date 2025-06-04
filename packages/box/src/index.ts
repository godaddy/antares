import React, { createContext } from 'react';

export type RootNode = ShadowRoot | Document | Node;

export type EnvContext<Props> = {
  /**
   * Object that contains components that should be replaced.
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

  [key: string]: any;
};

export type SlotsContext = {
  /**
   * Object where the keys are the namespaced slot names and the value are the slot components.
   */
  assigned: Record<string, any>;

  /**
   * Ordered list of parent slot names that will be used as namespace.
   */
  namespace: string[];

  /**
   * Indication of a global component based override for the current component.
   */
  override: boolean;
};

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
 * @param {RootNode} [root] - The root node of the component.
 * @returns {BoxContext} The default values for the Box context.
 * @private
 */
export function defaults(root?: RootNode): BoxContext<any> {
  /**
   * Get the window object for the rendering context.
   *
   * @param {Node | ShadowRoot | Document | null | undefined} root - The root node of the component.
   * @returns {Window & typeof globalThis} The window object for the rendering context.
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
   * @param {Node | ShadowRoot | Document | null | undefined} root - The root node of the component.
   * @returns {Document} The document object for the rendering context.
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
      document: () => getDocument(root),
      window: () => getWindow(root)
    },
    slots: {
      override: false,
      namespace: [],
      assigned: {}
    }
  };
}

/**
 * Box context for managing component environment and slots.
 *
 * @type {BoxContext}
 * @public
 */
export const Box = createContext<BoxContext<any>>(defaults());
