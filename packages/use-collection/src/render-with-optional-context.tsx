/* v8 ignore next */
import React, { type Context, type ReactNode } from 'react';

/**
 * Renders content with optional context provider wrapper.
 * If no context state exists, wraps the content in the provided StateContext.Provider.
 * This allows collection components to work both standalone and as part of a larger component tree.
 *
 * @template TState - The type of the collection state
 * @param {React.ReactNode} content - The React content to render
 * @param {TState} state - The collection state to provide via context
 * @param {TState | null} contextState - Existing context state, if any
 * @param {React.Context<TState | null>} StateContext - The React context to use for wrapping
 * @returns {React.ReactNode} The content, optionally wrapped in a context provider
 * @public
 */
export function renderWithOptionalContext<TState>(
  content: ReactNode,
  state: TState,
  contextState: TState | null,
  StateContext: Context<TState | null>
): ReactNode {
  return contextState ? content : <StateContext.Provider value={state}>{content}</StateContext.Provider>;
}
