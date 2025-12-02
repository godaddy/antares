import { SlotFunction } from '../examples/slot-function.tsx';
import { SlotProps } from '../examples/slot-props.tsx';
import { Button } from '../examples/button.tsx';
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
import React from 'react';

describe('@bento/slots examples', function bento() {
  describe('Button', function button() {
    it('should render a button', function test() {
      const { container } = render(<Button id="foo">Click me</Button>);
      const result = container.innerHTML;

      assume(result).equals('<button id="foo">Click me</button>');
    });
  });

  describe('Memo', function memo() {
    it('should render a memoized component', async function test() {
      const screen = render(<Memo />);
      const result = screen.container.innerHTML;
      const logger = console.log;
      let logs: any[] = [];

      console.log = function handleLog(...args) {
        logs = args;
      };

      assume(result).equals(
        '<div data-override="slot" data-slot="example-container" id=":r0:" class="example"><label for="example" data-slot="label">Hello World</label><button id=":r1:" data-override="slot" data-slot="button">Click Me</button></div>'
      );
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
      const result = container.innerHTML;

      assume(result).equals(
        '<div data-slot="example-container" class="example"><label for="example"><strong>Hello World</strong></label><button id=":r2:" data-slot="button">Click Me</button></div>'
      );
    });
  });

  describe('SlotProps', function slotprops() {
    it('should render a component with slot props, creating a red button', async function props() {
      const screen = render(<SlotProps />);
      const result = screen.container.innerHTML;
      const logger = console.log;
      let logs: any[] = [];

      console.log = function handleLog(...args) {
        logs = args;
      };

      assume(result).equals(
        '<div data-slot="example-container" class="example"><label for="example" data-slot="label">Hello World</label><button id=":r3:" data-override="style slot" data-slot="button" style="background: red; border: 2px solid black;">Click Me</button></div>'
      );
      await screen.getByRole('button', { name: 'Click me' }).click();

      console.log = logger;

      assume(logs).is.an('array');
      assume(logs[0]).equals('Button clicked!');
    });
  });

  describe('Merged', function merged() {
    it('should render a component with the correct merged slots', function test() {
      const { container } = render(<Merged />);
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
    it('should render all enhancement levels in correct order', function allLevels() {
      const { container } = render(<MergedFunction />);
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
    it('should render a component with slots', function test() {
      const { container } = render(<Namespace />);
      const result = container.innerHTML;

      assume(result).equals(
        '<label data-override="className slot" data-slot="title" class="title-1">title</label>' +
          '<label data-override="className slot" data-slot="title" class="description-1">title</label>'
      );
    });

    it('should render a component with correct slot names', function test() {
      const { container } = render(<NamespaceWithSlotNames />);
      const result = container.innerHTML;

      assume(result).equals(
        '<label data-override="className slot" data-slot="title" class="title-2">title</label>' +
          '<label data-override="className slot" data-slot="title" class="description-2">title</label>'
      );
    });

    it('should render a component with correct replacements', function test() {
      const { container } = render(<NamespaceWithReplacements />);
      const result = container.innerHTML;

      assume(result).equals(
        '<label data-override="className slot" data-slot="title" class="title-3">title</label>' +
          '<label data-override="className slot" data-slot="title" class="description-3">title</label>'
      );
    });

    it('should allow children to inherit root-level slots', function test() {
      const { container } = render(<NamespaceRootLevelInheritance />);
      const result = container.innerHTML;

      console.log('bbbb', result);

      assume(result).equals(
        '<div>' +
          '<label data-override="className slot" data-slot="title" class="inherited-title">title</label>Content</div>'
      );
    });
  });
});
