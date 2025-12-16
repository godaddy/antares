import { describe, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import React, { forwardRef, useEffect, useState } from 'react';
import { useSafeObjectRef } from '../src/use-safe-object-ref';
import { useObjectRef } from '@react-aria/utils';
import * as useCollectionModule from '../src';
import assume from 'assume';

describe('useSafeObjectRef', function bento() {
  it('handles all ref types with useSafeObjectRef hook', function test() {
    const TestRefComponent = forwardRef<HTMLDivElement, { testProp?: string }>(function TestRefComponent(props, ref) {
      const safeRef = useSafeObjectRef(ref);
      const [count, setCount] = useState(0);

      useEffect(function useEffectTestRef() {
        setCount((prev) => prev + 1);
      }, []);

      return (
        <div ref={safeRef} data-testid="ref-test" data-count={count}>
          {props.testProp}
        </div>
      );
    });

    const functionRef = vi.fn();
    const { container, rerender } = render(<TestRefComponent ref={functionRef} testProp="test" />);
    const result = container.innerHTML;

    assume(result).includes('data-testid="ref-test"');
    assume(functionRef).is.a('function');

    const objectRef = { current: null as HTMLDivElement | null };
    rerender(<TestRefComponent ref={objectRef} key="obj" />);
    assume(objectRef.current).exists();

    rerender(<TestRefComponent ref={null} key="null" />);
    rerender(<TestRefComponent ref={undefined} key="undef" />);

    const finalResult = container.innerHTML;
    assume(finalResult).includes('data-testid="ref-test"');
  });

  it('imports and uses utility functions correctly', function test() {
    assume(useCollectionModule.useSafeObjectRef).exists();

    const TestImportComponent = forwardRef<HTMLDivElement, { testProp?: string }>(
      function TestImportComponent(props, ref) {
        const [count, setCount] = useState(0);

        useEffect(function useEffectTestImport() {
          setCount((prev) => prev + 1);
        }, []);

        const safeRef = useCollectionModule.useSafeObjectRef(ref);

        return (
          <div ref={safeRef} data-testid="import-test" data-count={count}>
            {props.testProp}
          </div>
        );
      }
    );

    const functionRef = vi.fn();
    const { container } = render(<TestImportComponent ref={functionRef} testProp="import test" />);
    const result = container.innerHTML;

    assume(result).includes('data-testid="import-test"');
    assume(result).includes('data-count="1"');
  });

  describe('Frozen Object Handling', function frozenSuite() {
    it('logs dev warning when frozen ref is encountered', function test() {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(function mockWarn() {
        // Intentionally empty - we just want to spy on the call
      });

      const TestComponentWithWarning = forwardRef<HTMLDivElement>(function TestComponentWithWarning(props, ref) {
        const safeRef = useSafeObjectRef(ref);
        return (
          <div ref={safeRef} data-testid="warning-test">
            Warning Test
          </div>
        );
      });

      const frozenRef = Object.freeze({ current: null as HTMLDivElement | null });
      render(<TestComponentWithWarning ref={frozenRef} />);

      // Verify warning was called with expected message
      assume(consoleWarnSpy.mock.calls.length).is.above(0);
      const warnCall = consoleWarnSpy.mock.calls[0];
      assume(warnCall[0]).includes('useSafeObjectRef');
      assume(warnCall[0]).includes('frozen/sealed');

      consoleWarnSpy.mockRestore();
    });

    it('handles frozen ref objects gracefully', function test() {
      const TestComponentWithFrozenRef = forwardRef<HTMLDivElement>(function TestComponentWithFrozenRef(props, ref) {
        const safeRef = useSafeObjectRef(ref);
        return (
          <div ref={safeRef} data-testid="frozen-test">
            Frozen Test
          </div>
        );
      });

      // Create a frozen ref object (simulates Vitest browser mode behavior)
      const frozenRef = Object.freeze({ current: null as HTMLDivElement | null });

      // This should NOT throw even with a frozen ref
      const { container } = render(<TestComponentWithFrozenRef ref={frozenRef} />);
      const result = container.innerHTML;

      assume(result).includes('data-testid="frozen-test"');
      // The frozen ref's current will remain null (can't be updated), but the component still renders
      assume(frozenRef.current).equals(null);
    });

    it('handles sealed ref objects gracefully', function test() {
      const TestComponentWithSealedRef = forwardRef<HTMLDivElement>(function TestComponentWithSealedRef(props, ref) {
        const safeRef = useSafeObjectRef(ref);
        return (
          <div ref={safeRef} data-testid="sealed-test">
            Sealed Test
          </div>
        );
      });

      // Create a sealed ref object
      const sealedRef = Object.seal({ current: null as HTMLDivElement | null });

      // This should NOT throw even with a sealed ref
      const { container } = render(<TestComponentWithSealedRef ref={sealedRef} />);
      const result = container.innerHTML;

      assume(result).includes('data-testid="sealed-test"');
    });

    it('handles non-extensible ref objects gracefully', function test() {
      const TestComponentWithNonExtensibleRef = forwardRef<HTMLDivElement>(
        function TestComponentWithNonExtensibleRef(props, ref) {
          const safeRef = useSafeObjectRef(ref);
          return (
            <div ref={safeRef} data-testid="non-ext-test">
              Non-Extensible Test
            </div>
          );
        }
      );

      // Create a non-extensible ref object
      const nonExtensibleRef = Object.preventExtensions({ current: null as HTMLDivElement | null });

      // This should NOT throw even with a non-extensible ref
      const { container } = render(<TestComponentWithNonExtensibleRef ref={nonExtensibleRef} />);
      const result = container.innerHTML;

      assume(result).includes('data-testid="non-ext-test"');
    });

    it('demonstrates React Aria useObjectRef FAILS with frozen refs', function test() {
      const TestComponentWithReactAriaRef = forwardRef<HTMLDivElement>(
        function TestComponentWithReactAriaRef(props, ref) {
          // Use React Aria's useObjectRef for comparison
          const ariaRef = useObjectRef(ref);
          return (
            <div ref={ariaRef} data-testid="aria-test">
              React Aria Test
            </div>
          );
        }
      );

      const frozenRef = Object.freeze({ current: null as HTMLDivElement | null });

      // React Aria's useObjectRef DOES throw with frozen refs, validating our need for useSafeObjectRef
      assume(function testReactAriaWithFrozenRef() {
        render(<TestComponentWithReactAriaRef ref={frozenRef} />);
      }).throws(/Cannot assign to read only property|Cannot set property current/);
    });

    it('verifies direct assignment to frozen ref throws', function test() {
      const frozenRef = Object.freeze({ current: null as HTMLDivElement | null });

      // This should throw when trying to assign to a frozen object
      assume(function testDirectAssignmentToFrozenRef() {
        (frozenRef as any).current = document.createElement('div');
      }).throws(/Cannot assign to read only property|Cannot set property current|object is not extensible/);
    });

    it('compares behavior: safe works, React Aria fails with frozen refs', function test() {
      const TestComponentWithSafe = forwardRef<HTMLDivElement>(function TestComponentWithSafe(props, ref) {
        const safeRef = useSafeObjectRef(ref);
        return (
          <div ref={safeRef} data-testid="safe-compare">
            Safe Compare
          </div>
        );
      });

      const TestComponentWithReactAria = forwardRef<HTMLDivElement>(function TestComponentWithReactAria(props, ref) {
        const ariaRef = useObjectRef(ref);
        return (
          <div ref={ariaRef} data-testid="aria-compare">
            Aria Compare
          </div>
        );
      });

      const frozenRefForSafe = Object.freeze({ current: null as HTMLDivElement | null });
      const frozenRefForReactAria = Object.freeze({ current: null as HTMLDivElement | null });

      // useSafeObjectRef handles frozen refs gracefully
      const { container } = render(<TestComponentWithSafe ref={frozenRefForSafe} />);
      assume(container.innerHTML).includes('data-testid="safe-compare"');

      // React Aria's useObjectRef throws with frozen refs
      assume(function testReactAriaComparison() {
        render(<TestComponentWithReactAria ref={frozenRefForReactAria} />);
      }).throws(/Cannot assign to read only property|Cannot set property current/);
    });
  });
});
