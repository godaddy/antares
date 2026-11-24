import { createContext } from 'react';
import type { CollectionBuilder } from 'react-aria-components';

export type StepCollection = Parameters<Parameters<typeof CollectionBuilder>[0]['children']>[0];

/** Publishes the single collection snapshot to sibling regions without rendering them in the collection builder. */
export function createWizardCollectionStore() {
  const sources = new Map<object, StepCollection>();
  const listeners = new Set<() => void>();
  let snapshot: readonly StepCollection[] = [];

  function notify() {
    snapshot = [...sources.values()];
    for (const listener of listeners) listener();
  }

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot: () => snapshot,
    publish(source: object, collection: StepCollection) {
      if (sources.get(source) !== collection) {
        sources.set(source, collection);
        notify();
      }
    },
    remove(source: object) {
      if (sources.delete(source)) notify();
    }
  };
}

export const WizardCollectionContext = createContext<ReturnType<typeof createWizardCollectionStore> | null>(null);
