import React, { createContext } from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithOptionalContext } from '../src/render-with-optional-context';

describe('renderWithOptionalContext', function bento() {
  const TestContext = createContext<{ value: string } | null>(null);

  it('wraps content when no context exists', function test() {
    const state = { value: 'test' };
    const content = <div>Test</div>;
    const result = renderWithOptionalContext(content, state, null, TestContext);

    // Verify it returns a Provider wrapping the content
    expect(result).toMatchObject({
      type: TestContext.Provider,
      props: { value: state, children: content }
    });
  });

  it('returns content unwrapped when context exists', function test() {
    const state = { value: 'test' };
    const contextState = { value: 'from-context' };
    const content = <div>Test</div>;
    const result = renderWithOptionalContext(content, state, contextState, TestContext);

    // Verify it returns content directly without wrapping
    expect(result).toBe(content);
  });
});
