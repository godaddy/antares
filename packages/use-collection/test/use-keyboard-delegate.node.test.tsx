import React, { createRef } from 'react';
import { describe, it, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { useKeyboardDelegate } from '../src/use-keyboard-delegate';
import { ListKeyboardDelegate } from 'react-aria';
import assume from 'assume';

describe('useKeyboardDelegate', function bento() {
  describe('SSR Safety', function ssrSuite() {
    it('creates ListKeyboardDelegate when no delegate provided', function test() {
      const ref = createRef<HTMLDivElement>();
      const mockCollection = {
        getFirstKey: vi.fn(),
        getLastKey: vi.fn(),
        getKeyBefore: vi.fn(),
        getKeyAfter: vi.fn()
      } as any;
      const collator = new Intl.Collator('en-US');
      let delegateResult: ListKeyboardDelegate<unknown> | null = null;

      const TestComponent = function TestComponent() {
        delegateResult = useKeyboardDelegate({
          collection: mockCollection,
          collator,
          ref,
          selectionManager: {
            disabledBehavior: 'selection',
            disabledKeys: new Set()
          },
          direction: 'ltr',
          layout: 'stack',
          orientation: 'vertical'
        });

        return <div>Test</div>;
      };

      renderToString(<TestComponent />);

      // Verify delegate was created
      assume(delegateResult).exists();
      assume(delegateResult).is.instanceOf(ListKeyboardDelegate);
    });

    it('returns provided delegate when keyboardDelegate is specified', function test() {
      const ref = createRef<HTMLDivElement>();
      const mockCollection = {
        getFirstKey: vi.fn(),
        getLastKey: vi.fn(),
        getKeyBefore: vi.fn(),
        getKeyAfter: vi.fn()
      } as any;
      const collator = new Intl.Collator('en-US');
      const providedDelegate = new ListKeyboardDelegate({
        collection: mockCollection,
        collator,
        ref,
        disabledKeys: new Set(),
        disabledBehavior: 'all',
        direction: 'rtl'
      });
      let delegateResult: ListKeyboardDelegate<unknown> | null = null;

      const TestComponent = function TestComponent() {
        delegateResult = useKeyboardDelegate({
          collection: mockCollection,
          collator,
          ref,
          selectionManager: {
            disabledBehavior: 'selection',
            disabledKeys: new Set()
          },
          direction: 'ltr',
          keyboardDelegate: providedDelegate
        });

        return <div>Test</div>;
      };

      renderToString(<TestComponent />);

      // Verify the provided delegate was returned
      assume(delegateResult).equals(providedDelegate);
    });

    it('passes all configuration to ListKeyboardDelegate', function test() {
      const ref = createRef<HTMLDivElement>();
      const mockCollection = {
        getFirstKey: vi.fn(),
        getLastKey: vi.fn(),
        getKeyBefore: vi.fn(),
        getKeyAfter: vi.fn()
      } as any;
      const collator = new Intl.Collator('en-US');
      const disabledKeys = new Set(['key1', 'key2']);
      let delegateResult: ListKeyboardDelegate<unknown> | null = null;

      const TestComponent = function TestComponent() {
        delegateResult = useKeyboardDelegate({
          collection: mockCollection,
          collator,
          ref,
          selectionManager: {
            disabledBehavior: 'all',
            disabledKeys
          },
          direction: 'rtl',
          layout: 'grid',
          orientation: 'horizontal'
        });

        return <div>Test</div>;
      };

      renderToString(<TestComponent />);

      // Verify delegate was created with configuration
      assume(delegateResult).exists();
      assume(delegateResult).is.instanceOf(ListKeyboardDelegate);
    });

    it('handles minimal configuration without optional fields', function test() {
      const ref = createRef<HTMLDivElement>();
      const mockCollection = {
        getFirstKey: vi.fn(),
        getLastKey: vi.fn(),
        getKeyBefore: vi.fn(),
        getKeyAfter: vi.fn()
      } as any;
      const collator = new Intl.Collator('en-US');
      let delegateResult: ListKeyboardDelegate<unknown> | null = null;

      const TestComponent = function TestComponent() {
        delegateResult = useKeyboardDelegate({
          collection: mockCollection,
          collator,
          ref,
          selectionManager: {},
          direction: 'ltr'
        });

        return <div>Test</div>;
      };

      renderToString(<TestComponent />);

      // Verify delegate was created even without optional fields
      assume(delegateResult).exists();
      assume(delegateResult).is.instanceOf(ListKeyboardDelegate);
    });
  });
});
