import { DefaultExample } from '../examples/default';
import { ControlledExample } from '../examples/controlled';
import { DisabledExample } from '../examples/disabled';
import { GroupExample } from '../examples/group';
import { IndeterminateExample } from '../examples/indeterminate';
import { InvalidExample } from '../examples/invalid';
import { RequiredExample } from '../examples/required';
import { HorizontalExample } from '../examples/horizontal';
import { PlaygroundExample } from '../examples/checkbox-playground';
import { render } from 'vitest-browser-react';
import { describe, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import assume from 'assume';

describe('@godaddy/antares', function antares() {
  describe('#Checkbox', function checkboxTests() {
    it('renders DefaultExample', async function basicRender() {
      await render(<DefaultExample />);

      const checkbox = page.getByRole('checkbox', { name: 'One checkbox' });
      assume(checkbox).is.not.equal(null);
    });

    it('renders ControlledExample', async function controlledRender() {
      await render(<ControlledExample />);

      const checkboxGroup = page.getByRole('group');
      assume(checkboxGroup).is.not.equal(null);

      const input = page.getByRole('checkbox', { name: 'Basketball' });
      await input.click({ force: true });

      await vi.waitFor(function checkSelection() {
        assume((input.element() as HTMLInputElement).checked).is.true();
      });
    });

    it('renders DisabledExample', async function disabledRender() {
      await render(<DisabledExample />);

      const checkboxGroup = page.getByRole('group', { disabled: true });
      assume(checkboxGroup).is.not.equal(null);
    });

    it('renders GroupExample', async function groupRender() {
      await render(<GroupExample />);

      const checkboxGroup = page.getByRole('group');
      assume(checkboxGroup).is.not.equal(null);
    });

    it('renders IndeterminateExample', async function indeterminateRender() {
      await render(<IndeterminateExample />);

      // React aria checkbox does not use aria properties for indeterminate state, so we need to wait for the async icon to be rendered
      await vi.waitFor(function checkIndeterminateIcon() {
        const indeterminateIcon = document.querySelector('[data-icon="minus"]');
        assume(indeterminateIcon).is.not.equal(null);
      });
    });

    it('renders InvalidExample', async function invalidRender() {
      await render(<InvalidExample />);

      const checkboxGroup = page.getByRole('group');
      assume(checkboxGroup).is.not.equal(null);

      const description = page.getByText('Choose your favorite color');
      assume(description).is.not.equal(null);

      const error = page.getByText('At least one color must be selected');
      assume(error.element().getAttribute('slot')).equals('errorMessage');
      assume(checkboxGroup.element().getAttribute('data-invalid')).equals('true');
    });

    it('renders RequiredExample', async function requiredRender() {
      await render(<RequiredExample />);

      const checkboxGroup = page.getByRole('group', { name: 'Favorite colors' });
      assume(checkboxGroup).is.not.equal(null);
    });

    it('renders HorizontalExample', async function horizontalRender() {
      await render(<HorizontalExample />);

      const checkboxGroup = page.getByRole('group');
      assume(checkboxGroup).is.not.equal(null);
    });

    it('renders PlaygroundExample', async function playgroundRender() {
      await render(<PlaygroundExample />);

      const checkboxGroup = page.getByRole('group');
      assume(checkboxGroup).is.not.equal(null);
    });
  });
});
