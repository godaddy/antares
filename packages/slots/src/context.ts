import React, { createContext } from 'react';

/**
 * Slot context
 *
 * @interface SlotContext
 * @property {object} components Object that contains components that should be replaced.
 * @property {array} namespace Ordered list of parent slot names that will be used as namespace.
 * @property {boolean} override Indication of a global component based override for the current component.
 * @property {object} slots Object where the key are the namespaced slot names and the value are the slot components.
 */
export interface SlotContext<Props> {
  components: Record<string, React.ComponentType<Props>>;
  slots: Record<string, any>;
  namespace: string[];
  override: boolean;
}

export const Slot = createContext<SlotContext<any>>({
  override: false,
  components: {},
  namespace: [],
  slots: {}
});
