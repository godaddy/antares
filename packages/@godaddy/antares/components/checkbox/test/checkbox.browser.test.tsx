import { DefaultExample } from '../examples/default';
import { CheckboxGroupControlledExample } from '../examples/controlled';
import { CheckboxGroupDisabledExample } from '../examples/disabled';
import { CheckboxGroupBasicExample } from '../examples/group';
import { CheckboxIndeterminateExample } from '../examples/indeterminate';
import { CheckboxGroupInvalidExample } from '../examples/invalid';
import { CheckboxGroupRequiredExample } from '../examples/required';
import { CheckboxGroupHorizontalExample } from '../examples/horizontal';
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

    it('renders CheckboxGroupControlledExample', async function controlledRender() {
      await render(<CheckboxGroupControlledExample />);

      const checkboxGroup = page.getByRole('group');
      assume(checkboxGroup).is.not.equal(null);

      const input = page.getByRole('checkbox', { name: 'Basketball' });
      await input.click({ force: true });

      await vi.waitFor(function checkSelection() {
        assume((input.element() as HTMLInputElement).checked).is.true();
      });
    });

    it('renders CheckboxGroupDisabledExample', async function disabledRender() {
      await render(<CheckboxGroupDisabledExample />);

      const checkboxGroup = page.getByRole('group', { disabled: true });
      assume(checkboxGroup).is.not.equal(null);
    });

    it('renders CheckboxGroupBasicExample', async function groupRender() {
      await render(<CheckboxGroupBasicExample />);

      const checkboxGroup = page.getByRole('group');
      assume(checkboxGroup).is.not.equal(null);
    });

    it('renders CheckboxIndeterminateExample', async function indeterminateRender() {
      await render(<CheckboxIndeterminateExample />);

      // React aria checkbox does not use aria properties for indeterminate state, so we need to wait for the async icon to be rendered
      await vi.waitFor(function checkIndeterminateIcon() {
        const indeterminateIcon = document.querySelector('[data-icon="minus"]');
        assume(indeterminateIcon).is.not.equal(null);
      });
    });

    it('renders CheckboxGroupInvalidExample', async function invalidRender() {
      await render(<CheckboxGroupInvalidExample />);

      const checkboxGroup = page.getByRole('group');
      assume(checkboxGroup).is.not.equal(null);

      const description = page.getByText('Choose your favorite color');
      assume(description).is.not.equal(null);
    });

    it('renders CheckboxGroupRequiredExample', async function requiredRender() {
      await render(<CheckboxGroupRequiredExample />);

      const checkboxGroup = page.getByRole('group', { name: 'Favorite colors' });
      assume(checkboxGroup).is.not.equal(null);
    });

    it('renders CheckboxGroupHorizontalExample', async function horizontalRender() {
      await render(<CheckboxGroupHorizontalExample />);

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
