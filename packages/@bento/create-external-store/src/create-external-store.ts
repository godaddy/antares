import { observer, type Observer } from './observer.ts';

export interface Store {
  /**
   * Subscribe to changes in the store. The callback is called anytime a item in the store changes.
   * @default subscribe((changes) => {})
   */
  subscribe: (callback: (changes: Record<string, any>) => void) => () => void;

  /**
   * Registers an async loader function to be called when data is requested for an unknown key.
   * @default ondemand(async (key) => {})
   */
  ondemand: (fn: (key: string) => Promise<unknown>) => () => void;

  /**
   * Creates a function that listens for changes to a specific key.
   * @default subscribe = only(key)
   */
  only: (key: string | string[]) => (fn: (changes: Record<string, any>) => void) => () => void;

  /**
   * Returns a function that retrieves the value associated with the specified key from the store.
   * @default getSnapshot = pick(key)
   */
  pick: (key: string) => () => unknown;

  /**
   * Notify subscribers of changes in the store. This is automatically called when a item in the store changes.
   * @default dispatch(changes)
   */
  dispatch: (data: unknown) => void;

  /**
   * Adds data to the store, updates the snapshot, and calls the subscribers.
   * @default set({ data: here })
   */
  set: (data: unknown) => void;

  /**
   * Returns the current snapshot of the store.
   * @default getSnapshot()
   */
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
  const loaded = new Set<string>();
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
   * @returns {function} A function that, when called, unregisters the loader function.
   * @public
   */
  function ondemand(fn: (key: string) => Promise<any>) {
    loaders.push(fn);

    return function unregister() {
      const index = loaders.indexOf(fn);
      if (~index) loaders.splice(index, 1);
    };
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
      if (!loaded.has(key)) load(key);
      return undefined;
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
      if (value === undefined || value === null) {
        loaded.delete(key);
        state.delete(key);
      } else {
        state.set(key, value);
      }
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
    //
    // Track which keys have been loaded to prevent multiple requests to be
    // send out for the same key. This loaded cache is automatically cleared
    // when the data is set to undefined or null.
    //
    loaded.add(key);

    for (const loader of loaders) {
      try {
        const data = await loader(key);

        if (!data) continue;
        return set({ [key]: data });
      } catch (_) {
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
