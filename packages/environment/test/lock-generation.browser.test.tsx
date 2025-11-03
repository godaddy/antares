import { LockNoOverride } from '../examples/lock-no-override.tsx';
import { LockWithOverride } from '../examples/lock-with-override.tsx';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
/* v8 ignore next */
import React from 'react';

describe('@bento/environment lock generation examples', function lockTests() {
  describe('LockNoOverride', function lockNoOverride() {
    it('should render without any data-override attributes', function test() {
      const { container } = render(<LockNoOverride />);
      const result = container.innerHTML;

      // EXPECTED: NO data-override anywhere
      // All slots (trigger, label, description) are internal composition at generation 1
      const overrideMatches = result.match(/data-override/g);

      assume(overrideMatches).is.null('Should have NO data-override attributes');
    });

    it('should render button without data-override', function test() {
      const { container } = render(<LockNoOverride />);
      const button = container.querySelector('button');

      assume(button).is.not.null();
      assume(button?.getAttribute('data-override')).is.null();
      assume(button?.textContent).equals('Click Me');
    });

    it('should render label without data-override', function test() {
      const { container } = render(<LockNoOverride />);
      const label = container.querySelector('.label');

      assume(label).is.not.null();
      assume(label?.getAttribute('data-override')).is.null();
    });

    it('should render description without data-override', function test() {
      const { container } = render(<LockNoOverride />);
      const description = container.querySelector('.describe');

      assume(description).is.not.null();
      assume(description?.getAttribute('data-override')).is.null();
    });
  });

  describe('LockWithOverride', function lockWithOverride() {
    it('should have exactly ONE data-override on the button only', function test() {
      const { container } = render(<LockWithOverride />);
      const result = container.innerHTML;

      // EXPECTED: data-override ONLY on button
      // Consumer's trigger slot added at generation 0 (before lock)
      // Internal label/description slots added at generation 1 (after lock)
      const overrideMatches = result.match(/data-override/g);

      assume(overrideMatches).is.not.null();
      assume(overrideMatches?.length).equals(1, 'Should have exactly ONE data-override');
    });

    it('should have data-override="slot" on button', function test() {
      const { container } = render(<LockWithOverride />);
      const button = container.querySelector('button');

      assume(button).is.not.null();
      assume(button?.getAttribute('data-override')).is.not.null();
      assume(button?.getAttribute('data-override')).equals('slot');
    });

    it('should render button with consumer text', function test() {
      const { container } = render(<LockWithOverride />);
      const button = container.querySelector('button');

      assume(button?.textContent).equals('Hello World');
    });

    it('should NOT have data-override on label', function test() {
      const { container } = render(<LockWithOverride />);
      const label = container.querySelector('.label');

      assume(label).is.not.null();
      assume(label?.getAttribute('data-override')).is.null();
    });

    it('should NOT have data-override on description', function test() {
      const { container } = render(<LockWithOverride />);
      const description = container.querySelector('.describe');

      assume(description).is.not.null();
      assume(description?.getAttribute('data-override')).is.null();
    });
  });
});
