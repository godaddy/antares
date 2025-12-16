import pkg from '../package.json' with { type: 'json' };
import { dirname, resolve, join } from 'node:path';
import { describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import assume from 'assume';
import { renderToString } from 'react-dom/server';
import React, { forwardRef, createContext } from 'react';
import { useSafeObjectRef, useCollectionState, renderWithOptionalContext } from '../src';

describe('@bento/use-collection', function bento() {
  it('exports all public APIs', async function test() {
    const mod = await import('../src/index');

    assume(mod.useSafeObjectRef).exists();
    assume(mod.useSafeObjectRef).is.a('function');

    assume(mod.useCollectionState).exists();
    assume(mod.useCollectionState).is.a('function');

    assume(mod.renderWithOptionalContext).exists();
    assume(mod.renderWithOptionalContext).is.a('function');

    assume(mod.useKeyboardDelegate).exists();
    assume(mod.useKeyboardDelegate).is.a('function');
  });

  describe('Public API', function packageSuite() {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    describe('#exports', function exportsSuite() {
      Object.keys(pkg.exports).forEach(function each(subpaths) {
        describe(`${subpaths}`, function subpathsSuite() {
          const exportPath = (pkg.exports as any)[subpaths];

          if (typeof exportPath === 'string') {
            return it(`exports ${subpaths} exists`, async function exportedTest() {
              const path = resolve(__dirname, '..', exportPath);
              await fs.access(path, fs.constants.F_OK);
            });
          }

          Object.keys(exportPath).forEach(function each(exported) {
            Object.keys(exportPath[exported]).forEach(function each(key) {
              it(`conditional export "${exported}.${key}" exists for ${join(pkg.name, subpaths)}`, async function exportedTest() {
                const path = resolve(__dirname, '..', exportPath[exported][key]);
                await fs.access(path, fs.constants.F_OK);
              });
            });
          });
        });
      });
    });
  });

  describe('SSR Safety', function ssrSuite() {
    describe('useSafeObjectRef', function ssrRef() {
      it('handles SSR rendering without DOM', function test() {
        const TestComponent = forwardRef<HTMLDivElement>(function TestComponent(props, ref) {
          const safeRef = useSafeObjectRef(ref);
          return <div ref={safeRef}>SSR Test</div>;
        });

        // Should not throw during SSR
        const html = renderToString(<TestComponent />);
        assume(html).includes('SSR Test');
      });

      it('handles null ref during SSR', function test() {
        const TestComponent = forwardRef<HTMLDivElement>(function TestComponent(props, ref) {
          const safeRef = useSafeObjectRef(ref);
          // Verify ref exists and current is null during SSR
          assume(safeRef).is.an('object');
          assume(safeRef.current).equals(null);

          return <div>SSR</div>;
        });

        renderToString(<TestComponent />);
      });

      it('handles function ref during SSR', function test() {
        const TestComponent = forwardRef<HTMLDivElement>(function TestComponent(props, ref) {
          const safeRef = useSafeObjectRef(ref);
          return <div ref={safeRef}>Function Ref SSR</div>;
        });

        const refCallback = function refCallback() {
          // Intentionally empty - testing that ref callback doesn't break SSR
        };

        const html = renderToString(<TestComponent ref={refCallback} />);
        assume(html).includes('Function Ref SSR');
      });

      it('handles object ref during SSR', function test() {
        const objectRef = { current: null as HTMLDivElement | null };

        const TestComponent = forwardRef<HTMLDivElement>(function TestComponent(props, ref) {
          const safeRef = useSafeObjectRef(ref);
          return <div ref={safeRef}>Object Ref SSR</div>;
        });

        const html = renderToString(<TestComponent ref={objectRef} />);
        assume(html).includes('Object Ref SSR');
        // Object ref should remain null during SSR (useEffect doesn't run)
        assume(objectRef.current).equals(null);
      });
    });

    describe('useCollectionState', function ssrState() {
      it('calls state hook unconditionally during SSR', function test() {
        const TestContext = createContext<{ value: string } | null>(null);
        let hookCalled = false;

        const TestComponent = function TestComponent() {
          const { state } = useCollectionState({
            props: {},
            context: TestContext,
            useStateHook: function useStateHook() {
              hookCalled = true;
              return { value: 'internal' };
            }
          });

          return <div>{state.value}</div>;
        };

        const html = renderToString(<TestComponent />);
        assume(hookCalled).equals(true);
        assume(html).includes('internal');
      });

      it('uses context state over internal state during SSR', function test() {
        const TestContext = createContext<{ value: string } | null>({ value: 'context' });
        let hookCalled = false;

        const TestComponent = function TestComponent() {
          const { state } = useCollectionState({
            props: {},
            context: TestContext,
            useStateHook: function useStateHook() {
              hookCalled = true;
              return { value: 'internal' };
            }
          });

          return <div>{state.value}</div>;
        };

        const html = renderToString(
          <TestContext.Provider value={{ value: 'context' }}>
            <TestComponent />
          </TestContext.Provider>
        );

        assume(hookCalled).equals(true);
        assume(html).includes('context');
      });

      it('returns contextState null when no provider during SSR', function test() {
        const TestContext = createContext<{ value: string } | null>(null);
        let contextStateValue: { value: string } | null = null;

        const TestComponent = function TestComponent() {
          const { state, contextState } = useCollectionState({
            props: {},
            context: TestContext,
            useStateHook: function useStateHook() {
              return { value: 'internal' };
            }
          });

          contextStateValue = contextState;
          return <div>{state.value}</div>;
        };

        renderToString(<TestComponent />);
        assume(contextStateValue).equals(null);
      });
    });

    describe('renderWithOptionalContext', function ssrContext() {
      it('wraps content in provider during SSR when no context', function test() {
        const TestContext = createContext<{ value: string } | null>(null);
        const state = { value: 'ssr-state' };
        const content = <div>Content</div>;

        const result = renderWithOptionalContext(content, state, null, TestContext);
        const html = renderToString(result);

        assume(html).includes('Content');
      });

      it('renders content directly during SSR when context exists', function test() {
        const TestContext = createContext<{ value: string } | null>(null);
        const state = { value: 'ssr-state' };
        const contextState = { value: 'existing' };
        const content = <div>Direct Content</div>;

        const result = renderWithOptionalContext(content, state, contextState, TestContext);
        const html = renderToString(result);

        assume(html).includes('Direct Content');
      });

      it('allows consuming context in nested components during SSR', function test() {
        const TestContext = createContext<{ value: string } | null>(null);
        const state = { value: 'provided-value' };

        const ConsumerComponent = function ConsumerComponent() {
          const contextValue = React.useContext(TestContext);
          return <div>{contextValue?.value || 'no-value'}</div>;
        };

        const result = renderWithOptionalContext(<ConsumerComponent />, state, null, TestContext);
        const html = renderToString(result);

        assume(html).includes('provided-value');
      });
    });
  });
});
