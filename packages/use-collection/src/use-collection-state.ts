import { useContext } from 'react';

/**
 * Generic state hook for collection components (ListBox, Menu).
 *
 * **Rules-of-Hooks Compliance**: This hook always calls `useStateHook` unconditionally,
 * then chooses `contextState ?? internalState`. This pattern:
 * - Complies with React's rules of hooks (unconditional calls)
 * - Does NOT maintain parallel state (the internal state is discarded when context provides state)
 * - Matches React Stately patterns where hooks are called unconditionally
 *
 * **Why This Fix Matters**: The previous pattern (`contextState ?? useListState(props)`)
 * conditionally called the hook based on `contextState`, which violates React's rules.
 * While it worked in practice (context values are stable), it's technically incorrect.
 *
 * @template TState - The type of the collection state (e.g., ListState<T>, TreeState<T>)
 * @param {Record<string, unknown>} props - Props to pass to the state hook (with children/items stripped)
 * @param {React.Context<TState | null>} context - React context that may provide state
 * @param {(props: Record<string, unknown>) => TState} useStateHook - State hook to call (e.g., useListState, useTreeState)
 * @returns {{ state: TState; contextState: TState | null }} The state to use and whether it came from context
 * @public
 */
export function useCollectionState<TState>({
  props,
  context,
  useStateHook
}: {
  props: Record<string, unknown>;
  context: React.Context<TState | null>;
  useStateHook: (props: Record<string, unknown>) => TState;
}): { state: TState; contextState: TState | null } {
  const contextState = useContext(context);

  // Always call useStateHook unconditionally (rules-of-hooks compliance)
  const internalState = useStateHook(props);

  // Choose contextState if available, otherwise use internalState
  const state = contextState ?? internalState;

  return { state, contextState };
}
