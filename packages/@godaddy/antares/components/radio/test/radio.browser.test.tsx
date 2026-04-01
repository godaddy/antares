import { RadioDescriptionExample } from '../examples/radio-description.tsx';
import { RadioHorizontalExample } from '../examples/radio-horizontal.tsx';
import { RadioControlledExample } from '../examples/radio-controlled.tsx';
import { PlaygroundExample } from '../examples/radio-playground.tsx';
import { RadioAriaLabelExample } from '../examples/radio-aria-label.tsx';
import { RadioDisabledExample } from '../examples/radio-disabled.tsx';
import { RadioRequiredExample } from '../examples/radio-required.tsx';
import { RadioErrorExample } from '../examples/radio-error.tsx';
import { RadioBasicExample } from '../examples/radio-basic.tsx';
import { RadioFormExample } from '../examples/radio-form.tsx';
import { render } from 'vitest-browser-react';
import { describe, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import assume from 'assume';

describe('@godaddy/uxcore', function uxcore() {
  describe('#RadioGroup', function radioGroupTests() {
    it('renders RadioBasicExample', async function basicRender() {
      render(<RadioBasicExample />);

      assume(page.getByRole('radiogroup')).exists();
      assume(page.getByRole('radio', { name: 'Basic' })).exists();
    });

    it('renders RadioControlledExample with interaction', async function controlledRender() {
      render(<RadioControlledExample />);

      await page.getByRole('radio', { name: 'Premium' }).click({ force: true });
      await vi.waitFor(function checkSelection() {
        assume(document.body.textContent).includes('premium');
      });
    });

    it('renders RadioHorizontalExample', async function horizontalRender() {
      render(<RadioHorizontalExample />);

      assume(page.getByRole('radiogroup')).exists();
    });

    it('renders RadioDisabledExample with disabled states', async function disabledRender() {
      render(<RadioDisabledExample />);

      assume(page.getByRole('radiogroup', { name: 'Disabled group' })).exists();
      assume(page.getByRole('radiogroup', { name: 'Individual disabled options' })).exists();
    });

    it('renders RadioAriaLabelExample', async function ariaLabelRender() {
      render(<RadioAriaLabelExample />);

      assume(page.getByRole('radiogroup', { name: 'Sort order' })).exists();
    });

    it('renders RadioDescriptionExample', async function descriptionRender() {
      render(<RadioDescriptionExample />);

      assume(page.getByText("Choose how you'd like to receive updates")).exists();
    });

    it('renders RadioErrorExample', async function errorRender() {
      render(<RadioErrorExample />);

      assume(page.getByText('Please select a shipping method')).exists();
    });

    it('renders RadioRequiredExample', async function requiredRender() {
      render(<RadioRequiredExample />);

      assume(page.getByRole('radiogroup', { name: 'Payment method' })).exists();
    });

    it('renders PlaygroundExample with default props', async function playgroundRender() {
      render(<PlaygroundExample />);

      assume(page.getByRole('radiogroup')).exists();
    });

    it('renders RadioFormExample', async function formRender() {
      render(<RadioFormExample />);

      assume(page.getByRole('radiogroup')).exists();
    });
  });
});
