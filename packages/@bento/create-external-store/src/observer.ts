export type Observer = {
  subscribe: (callback: (changes: Record<string, any>) => void) => () => void;
  dispatch: (data: any) => void;
};

/**
 * Creates an observer object that allows subscribing to and dispatching events.
 *
 * @returns {Observer} An observer object with `subscribe` and `dispatch` methods.
 * @public
 */
export function observer(): Observer {
  const events = new Set<(...args: any[]) => void>();

  return {
    /**
     * Subscribes to the event with the given callback function.
     *
     * @param {function} fn - The callback function to be called when the event is emitted.
     * @returns {function} A function to unsubscribe from the event.
     * @public
     */
    subscribe(fn: (...args: any[]) => void): () => void {
      events.add(fn);

      /**
       * Unsubscribes from the event.
       *
       * @returns {void}
       * @public
       */
      return function unsubscribe(): void {
        events.delete(fn);
      };
    },

    /**
     * Emits the event with the given detail.
     *
     * @returns {void}
     * @public
     */
    dispatch(...args: any[]): void {
      events.forEach((fn) => fn(...args));
    }
  };
}
