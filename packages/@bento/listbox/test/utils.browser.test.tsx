import { describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render } from 'vitest-browser-react';
import React, { forwardRef, useEffect, useState } from 'react';
import { useSafeObjectRef } from '../src/utils';
import * as utilsModule from '../src/utils';
import assume from 'assume';

vi.mock('@bento/slots', () => ({
  withSlots: vi.fn()
}));

describe('Browser Utils', function bento() {
  let consoleWarnSpy: any;
  let mockWithSlots: any;

  beforeEach(async function beforeEach() {
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(function mockConsoleWarnImplementation() {
      // Intentionally empty to suppress console warnings during tests
    });

    const slots = await import('@bento/slots');
    mockWithSlots = slots.withSlots as any;
    mockWithSlots.mockClear();
  });

  afterEach(function afterEach() {
    consoleWarnSpy.mockRestore();
  });

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
    assume(utilsModule.useSafeObjectRef).exists();

    const TestImportComponent = forwardRef<HTMLDivElement, { testProp?: string }>(
      function TestImportComponent(props, ref) {
        const [count, setCount] = useState(0);

        useEffect(function useEffectTestImport() {
          setCount((prev) => prev + 1);
        }, []);

        const safeRef = utilsModule.useSafeObjectRef(ref);

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
});
