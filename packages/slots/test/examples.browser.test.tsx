import { SlotFunction } from '../examples/slot-function.tsx';
import { SlotProps } from '../examples/slot-props.tsx';
import { Button } from '../examples/button.tsx';
import { ForwardRefExample } from '../examples/forward-ref.tsx';
import { render } from 'vitest-browser-react';
import { Memo } from '../examples/memo.tsx';
import { Merged } from '../examples/merged.tsx';
import { MergedFunction } from '../examples/merged-function.tsx';
import {
  Namespace,
  NamespaceWithSlotNames,
  NamespaceWithReplacements,
  NamespaceRootLevelInheritance
} from '../examples/namespace.tsx';
import { describe, it, expect } from 'vitest';
import assume from 'assume';
import React from 'react';

describe('@bento/slots examples', function bento() {
  describe('Button', function button() {
    it('should render a button', function test() {
      const { container } = render(<Button id="foo">Click me</Button>);
      expect(container.innerHTML).toMatchSnapshot();
    });
  });

  describe('Memo', function memo() {
    it('should render a memoized component', async function test() {
      const screen = render(<Memo />);
      const logger = console.log;
      let logs: any[] = [];

      console.log = function handleLog(...args) {
        logs = args;
      };

      expect(screen.container.innerHTML).toMatchSnapshot();
      await screen.getByRole('button', { name: 'Click me' }).click();

      console.log = logger;

      assume(logs).is.an('array');
      assume(logs[0]).equals('Button ref:');
      assume(logs[1]).is.instanceOf(HTMLButtonElement);
    });
  });

  describe('SlotFunction', function slotfn() {
    it('should render a slot function override', function slotted() {
      const { container } = render(<SlotFunction />);
      expect(container.innerHTML).toMatchSnapshot();
    });
  });

  describe('SlotProps', function slotprops() {
    it('should render a component with slot props, creating a red button', async function props() {
      const screen = render(<SlotProps />);
      const logger = console.log;
      let logs: any[] = [];

      console.log = function handleLog(...args) {
        logs = args;
      };

      expect(screen.container.innerHTML).toMatchSnapshot();
      await screen.getByRole('button', { name: 'Click me' }).click();

      console.log = logger;

      assume(logs).is.an('array');
      assume(logs[0]).equals('Button clicked!');
    });
  });

  describe('Merged', function merged() {
    it('should render a component with the correct merged slots', function test() {
      const { container } = render(<Merged />);
      expect(container.innerHTML).toMatchSnapshot();
    });
  });

  describe('MergedFunction', function mergedFunction() {
    it('should render all enhancement levels in correct order', function allLevels() {
      const { container } = render(<MergedFunction />);
      expect(container.innerHTML).toMatchSnapshot();
    });
  });

  describe('Namespace', function namespace() {
    it('should render a component with slots', function test() {
      const { container } = render(<Namespace />);
      expect(container.innerHTML).toMatchSnapshot();
    });

    it('should render a component with correct slot names', function test() {
      const { container } = render(<NamespaceWithSlotNames />);
      expect(container.innerHTML).toMatchSnapshot();
    });

    it('should render a component with correct replacements', function test() {
      const { container } = render(<NamespaceWithReplacements />);
      expect(container.innerHTML).toMatchSnapshot();
    });

    it('should allow children to inherit root-level slots', function test() {
      const { container } = render(<NamespaceRootLevelInheritance />);
      expect(container.innerHTML).toMatchSnapshot();
    });
  });

  describe('ForwardRefExample', function forwardRef() {
    it('forwards refs to the rendered element', function forwardsRefs() {
      const ref = React.createRef<HTMLDivElement>();

      render(
        <ForwardRefExample ref={ref} data-testid="panel">
          Forwarded
        </ForwardRefExample>
      );

      assume(ref.current).exist();
      assume(ref.current?.tagName).equals('DIV');
      assume(ref.current?.textContent).equals('Forwarded');
    });

    it('merges slot-provided refs with forwarded refs', async function mergesRefs() {
      const forwardedRef = React.createRef<HTMLDivElement>();
      const slotRef = React.createRef<HTMLDivElement>();

      const slots = {
        panel: { ref: slotRef }
      };

      render(
        <ForwardRefExample slots={slots}>
          <ForwardRefExample slot="panel" ref={forwardedRef} data-testid="slot-target">
            Combined
          </ForwardRefExample>
        </ForwardRefExample>
      );

      assume(forwardedRef.current).exist();
      assume(forwardedRef.current).equals(slotRef.current);
      assume(forwardedRef.current?.textContent).equals('Combined');
    });
  });
});
