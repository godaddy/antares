import { CheckboxBasic } from '../examples/basic';
import { CheckboxGroupControlled } from '../examples/controlled';
import { CheckboxGroupDisabled } from '../examples/disabled';
import { CheckboxGroupBasic } from '../examples/group';
import { CheckboxIndeterminate } from '../examples/indeterminate';
import { CheckboxGroupInvalid } from '../examples/invalid';
import { CheckboxGroupRequired } from '../examples/required';
import { CheckboxGroupHorizontal } from '../examples/horizontal';
import { PlaygroundExample } from '../examples/playground';
import { render } from 'vitest-browser-react';
import { describe, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import assume from 'assume';

describe('@godaddy/uxcore', function uxcore() {
  describe('#Checkbox', function checkboxTests() {
    it('renders CheckboxBasic', async function basicRender() {
      await render(<CheckboxBasic />);

      const checkbox = page.getByRole('checkbox', { name: 'One checkbox' });
      assume(checkbox).is.not.equal(null);
    });

    it('renders CheckboxGroupControlled', async function controlledRender() {
      await render(<CheckboxGroupControlled />);

      const checkboxGroup = page.getByRole('group');
      assume(checkboxGroup).is.not.equal(null);

      const input = page.getByRole('checkbox', { name: 'Basketball' });
      await input.click({ force: true });

      await vi.waitFor(function checkSelection() {
        assume((input.element() as HTMLInputElement).checked).is.true();
      });
    });

    it('renders CheckboxGroupDisabled', async function disabledRender() {
      await render(<CheckboxGroupDisabled />);

      const checkboxGroup = page.getByRole('group', { disabled: true });
      assume(checkboxGroup).is.not.equal(null);
    });

    it('renders CheckboxGroupBasic', async function groupRender() {
      await render(<CheckboxGroupBasic />);

      const checkboxGroup = page.getByRole('group');
      assume(checkboxGroup).is.not.equal(null);
    });

    it('renders CheckboxIndeterminate', async function indeterminateRender() {
      await render(<CheckboxIndeterminate />);

      // React aria checkbox does not use aria properties for indeterminate state, so we need to wait for the async icon to be rendered
      await vi.waitFor(function checkIndeterminateIcon() {
        const indeterminateIcon = document.querySelector('[data-icon="minus"]');
        assume(indeterminateIcon).is.not.equal(null);
      });
    });

    it('renders CheckboxGroupInvalid', async function invalidRender() {
      await render(<CheckboxGroupInvalid />);

      const checkboxGroup = page.getByRole('group');
      assume(checkboxGroup).is.not.equal(null);

      const description = page.getByText('Choose your favorite color');
      assume(description).is.not.equal(null);
    });

    it('renders CheckboxGroupRequired', async function requiredRender() {
      await render(<CheckboxGroupRequired />);

      const checkboxGroup = page.getByRole('group', { name: 'Favorite colors' });
      assume(checkboxGroup).is.not.equal(null);
    });

    it('renders CheckboxGroupHorizontal', async function horizontalRender() {
      await render(<CheckboxGroupHorizontal />);

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
