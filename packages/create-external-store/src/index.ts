import { observer, type Observer } from './observer.ts';

export interface Store {
  subscribe: (callback: (changes: Record<string, any>) => void) => () => void;
  ondemand: (fn: (key: string) => Promise<unknown>) => void;
  only: (key: string) => (fn: (changes: Record<string, any>) => void) => () => void;
  pick: (key: string) => () => unknown;
  dispatch: (data: unknown) => void;
  set: (data: unknown) => void;
  getSnapshot: () => object;
}

/**
 * Creates a new store with the specified name.
 *
 * @returns {Store} The created store.
 * @public
 */
type InitialState = Record<string, unknown>;
export function createStore<T extends InitialState>(initial = {} as T): Store {
  const { subscribe, dispatch }: Observer = observer();
  const loaders: Array<(key: string) => Promise<any>> = [];

  //
  // We are maintaining the state as a Map to ensure that we can store any type
  // without risking prototype pollution attacks.
  //
  const state = new Map(Object.entries(initial));
  let snapshot = Object.fromEntries(state);

  /**
   * Retrieves the current snapshot.
   *
   * @returns {any} The current snapshot.
   * @public
   */
  function getSnapshot(): any {
    return snapshot;
  }

  /**
   * Registers a loader function to be called on demand.
   *
   * @param {function} fn - The loader function that takes a key and returns a promise.
   * @public
   */
  function ondemand(fn: (key: string) => Promise<any>) {
    loaders.push(fn);
  }

  /**
   * Creates a function that retrieves the value associated with the specified key from the state.
   *
   * @param {string} key - The key to retrieve the value for.
   * @returns {() => any} A function that, when called, returns the value associated with the key from the state.
   * @public
   */
  function pick(key: string): () => any {
    return function pickSnapshot() {
      if (state.has(key)) return state.get(key);
      load(key);
    };
  }

  /**
   * Creates a subscriber function that listens for changes to a specific key.
   *
   * @param {string|array} key - The key(s) to listen for changes.
   * @returns {() => void} A function that takes a callback and subscribes it to changes for the specified key.
   * @public
   */
  function only(key: string | string[]): (fn: (changes: Record<string, any>) => void) => () => void {
    const keys = Array.isArray(key) ? key : [key];

    return function subscriber(fn) {
      const unsubscribe = subscribe(function subscribed(changes: Record<string, any>) {
        if (keys.some((key) => key in changes)) fn(changes);
      });

      return unsubscribe;
    };
  }

  /**
   * Adds data to the state and updates the snapshot.
   *
   * @param {object} data - The data to be added to the state.
   * @public
   */
  function set(data: any) {
    for (const [key, value] of Object.entries(data)) {
      if (value === undefined || value === null) state.delete(key);
      else state.set(key, value);
    }

    snapshot = Object.fromEntries(state);
    dispatch(data);
  }

  /**
   * Asynchronously loads data for the given key using the previous supplied
   * loaders. If a loader fails, it continues to the next loader. When the data
   * is loaded, it is introduced as state.
   *
   * @param {string} key - The key for which data needs to be loaded.
   * @returns {Promise<void>} A promise that resolves when the data is loaded.
   * @private
   */
  async function load(key: string) {
    for (const loader of loaders) {
      try {
        return set({ [key]: await loader(key) });
      } catch (_) {
        continue;
      }
    }
  }

  return {
    getSnapshot,
    subscribe,
    ondemand,
    dispatch,
    pick,
    only,
    set
  };
}
