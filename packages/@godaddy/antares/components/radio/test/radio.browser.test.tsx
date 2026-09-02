import { DescriptionExample } from '../examples/radio-description.tsx';
import { HorizontalExample } from '../examples/radio-horizontal.tsx';
import { ControlledExample } from '../examples/radio-controlled.tsx';
import { PlaygroundExample } from '../examples/radio-playground.tsx';
import { AriaLabelExample } from '../examples/radio-aria-label.tsx';
import { DisabledExample } from '../examples/radio-disabled.tsx';
import { RequiredExample } from '../examples/radio-required.tsx';
import { ErrorExample } from '../examples/radio-error.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { FormExample } from '../examples/radio-form.tsx';
import { render } from 'vitest-browser-react';
import { describe, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import assume from 'assume';

describe('@godaddy/antares', function antares() {
  describe('#RadioGroup', function radioGroupTests() {
    it('renders DefaultExample', async function basicRender() {
      await render(<DefaultExample />);

      assume(page.getByRole('radiogroup')).exists();
      assume(page.getByRole('radio', { name: 'Basic' })).exists();
    });

    it('renders ControlledExample with interaction', async function controlledRender() {
      await render(<ControlledExample />);

      await page.getByRole('radio', { name: 'Premium' }).click({ force: true });
      await vi.waitFor(function checkSelection() {
        assume(document.body.textContent).includes('premium');
      });
    });

    it('renders HorizontalExample', async function horizontalRender() {
      await render(<HorizontalExample />);

      assume(page.getByRole('radiogroup')).exists();
    });

    it('renders DisabledExample with disabled states', async function disabledRender() {
      await render(<DisabledExample />);

      assume(page.getByRole('radiogroup', { name: 'Disabled group' })).exists();
      assume(page.getByRole('radiogroup', { name: 'Individual disabled options' })).exists();
    });

    it('renders AriaLabelExample', async function ariaLabelRender() {
      await render(<AriaLabelExample />);

      assume(page.getByRole('radiogroup', { name: 'Sort order' })).exists();
    });

    it('renders DescriptionExample', async function descriptionRender() {
      await render(<DescriptionExample />);

      assume(page.getByText("Choose how you'd like to receive updates")).exists();
    });

    it('renders ErrorExample', async function errorRender() {
      await render(<ErrorExample />);

      assume(page.getByText('Please select a shipping method')).exists();
    });

    it('renders RequiredExample', async function requiredRender() {
      await render(<RequiredExample />);

      assume(page.getByRole('radiogroup', { name: 'Payment method' })).exists();
    });

    it('renders PlaygroundExample with default props', async function playgroundRender() {
      await render(<PlaygroundExample />);

      assume(page.getByRole('radiogroup')).exists();
    });

    it('renders FormExample', async function formRender() {
      await render(<FormExample />);

      assume(page.getByRole('radiogroup')).exists();
    });
  });
});
