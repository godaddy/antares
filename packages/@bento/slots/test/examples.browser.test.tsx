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
import { describe, it } from 'vitest';
import assume from 'assume';
import { createRef } from 'react';

describe('@bento/slots examples', function bento() {
  describe('Button', function button() {
    it('should render a button', async function test() {
      const { container } = await render(<Button id="foo">Click me</Button>);
      const result = container.innerHTML;

      assume(result).equals('<button id="foo">Click me</button>');
    });
  });

  describe('Memo', function memo() {
    it('should render a memoized component', async function test() {
      const screen = await render(<Memo />);
      const result = screen.container.innerHTML;
      const logger = console.log;
      let logs: any[] = [];

      console.log = function handleLog(...args) {
        logs = args;
      };

      assume(result).equals(
        '<div data-override="slot" data-slot="example-container" id="_r_0_" class="example"><label for="example" data-slot="label">Hello World</label><button id="_r_1_" data-override="slot" data-slot="button">Click Me</button></div>'
      );
      await screen.getByRole('button', { name: 'Click me' }).click();

      console.log = logger;

      assume(logs).is.an('array');
      assume(logs[0]).equals('Button ref:');
      assume(logs[1]).is.instanceOf(HTMLButtonElement);
    });
  });

  describe('SlotFunction', function slotfn() {
    it('should render a slot function override', async function slotted() {
      const { container } = await render(<SlotFunction />);
      const result = container.innerHTML;

      assume(result).equals(
        '<div data-slot="example-container" class="example"><label for="example" data-slot="label"><strong>Hello World</strong></label><button id="_r_2_" data-slot="button">Click Me</button></div>'
      );
    });
  });

  describe('SlotProps', function slotprops() {
    it('should render a component with slot props, creating a red button', async function props() {
      const screen = await render(<SlotProps />);
      const result = screen.container.innerHTML;
      const logger = console.log;
      let logs: any[] = [];

      console.log = function handleLog(...args) {
        logs = args;
      };

      assume(result).equals(
        '<div data-slot="example-container" class="example"><label for="example" data-slot="label">Hello World</label><button id="_r_3_" data-override="style slot" data-slot="button" style="background: red; border: 2px solid black;">Click Me</button></div>'
      );
      await screen.getByRole('button', { name: 'Click me' }).click();

      console.log = logger;

      assume(logs).is.an('array');
      assume(logs[0]).equals('Button clicked!');
    });
  });

  describe('Merged', function merged() {
    it('should render a component with the correct merged slots', async function test() {
      const { container } = await render(<Merged />);
      const result = container.innerHTML;

      assume(result).equals(
        [
          '<p data-slot="description">',
          '  <span>Description: </span>',
          '  <label data-override="className slot" data-slot="label" class="merged-class" title="better-title" id="merged">',
          '  </label>',
          '  <span>Merged summary</span>',
          '  <span>Better error</span>',
          '  Expect class "merged-class", id "merged" and title "better-title".',
          '</p>'
        ]
          .join('\n')
          .replace(/^\s+/gm, '')
          .replace(/\n/g, '')
      );
    });
  });

  describe('MergedFunction', function mergedFunction() {
    it('should render all enhancement levels in correct order', async function allLevels() {
      const { container } = await render(<MergedFunction />);
      const result = container.innerHTML;

      assume(result).equals(
        '<div>' +
          '<div>First Enhancement</div>' +
          '<div>Second Enhancement</div>' +
          '<div>Third Enhancement: merged-fn</div>' +
          '</div>'
      );
    });
  });

  describe('Namespace', function namespace() {
    it('should render a component with slots', async function test() {
      const { container } = await render(<Namespace />);
      const result = container.innerHTML;

      assume(result).equals(
        '<label data-override="className slot" data-slot="title" class="title-1">title</label>' +
          '<label data-override="className slot" data-slot="title" class="description-1">title</label>'
      );
    });

    it('should render a component with correct slot names', async function test() {
      const { container } = await render(<NamespaceWithSlotNames />);
      const result = container.innerHTML;

      assume(result).equals(
        '<label data-override="className slot" data-slot="title" class="title-2">title</label>' +
          '<label data-override="className slot" data-slot="title" class="description-2">title</label>'
      );
    });

    it('should render a component with correct replacements', async function test() {
      const { container } = await render(<NamespaceWithReplacements />);
      const result = container.innerHTML;

      assume(result).equals(
        '<label data-override="className slot" data-slot="title" class="title-3">title</label>' +
          '<label data-override="className slot" data-slot="title" class="description-3">title</label>'
      );
    });

    it('should allow children to inherit root-level slots', async function test() {
      const { container } = await render(<NamespaceRootLevelInheritance />);
      const result = container.innerHTML;

      console.log('bbbb', result);

      assume(result).equals(
        '<div>' +
          '<label data-override="className slot" data-slot="title" class="inherited-title">title</label>Content</div>'
      );
    });
  });

  describe('ForwardRefExample', function forwardRef() {
    it('forwards refs to the rendered element', async function forwardsRefs() {
      const ref = createRef<HTMLDivElement>();

      await render(
        <ForwardRefExample ref={ref} data-testid="panel">
          Forwarded
        </ForwardRefExample>
      );

      assume(ref.current).exist();
      assume(ref.current?.tagName).equals('DIV');
      assume(ref.current?.textContent).equals('Forwarded');
    });

    it('merges slot-provided refs with forwarded refs', async function mergesRefs() {
      const forwardedRef = createRef<HTMLDivElement>();
      const slotRef = createRef<HTMLDivElement>();

      const slots = {
        panel: { ref: slotRef }
      };

      await render(
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
