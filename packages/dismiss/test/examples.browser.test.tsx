import React from 'react';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import { userEvent } from '@testing-library/user-event';
import { Basic } from '../examples/basic.tsx';
import { CustomLabel } from '../examples/custom-label.tsx';
import { SlotCustomization } from '../examples/slot-customization.tsx';

describe('@bento/dismiss', function bento() {
  describe('Examples', function examplesTests() {
    it('should render basic example in closed state initially', function test() {
      const { container } = render(<Basic />);
      const openButton = container.querySelector('button');

      assume(openButton).is.not.null();
      assume(openButton.textContent).equals('Open Dialog');

      // Dialog should not be visible
      const dialog = container.querySelector('.dialog');
      assume(dialog).is.null();
    });

    it('should open and close basic example', async function test() {
      const { container } = render(<Basic />);

      // Click to open
      const openButton = container.querySelector('button');
      await userEvent.click(openButton);

      // Dialog should now be visible
      const dialog = container.querySelector('.dialog');
      assume(dialog).is.not.null();
      assume(dialog.textContent).includes('Dialog Title');

      // Check dismiss buttons are present
      const dismissButtons = container.querySelectorAll('[aria-label="Dismiss"]');
      assume(dismissButtons.length).equals(2);

      // Click first dismiss button to close
      await userEvent.click(dismissButtons[0]);

      // Dialog should be gone, back to initial state
      const newDialog = container.querySelector('.dialog');
      assume(newDialog).is.null();

      const newOpenButton = container.querySelector('button');
      assume(newOpenButton.textContent).equals('Open Dialog');
    });

    it('should close basic example with second dismiss button', async function test() {
      const { container } = render(<Basic />);

      // Open dialog
      await userEvent.click(container.querySelector('button'));

      // Click the second dismiss button (at the end)
      const dismissButtons = container.querySelectorAll('[aria-label="Dismiss"]');
      await userEvent.click(dismissButtons[1]);

      // Should be back to initial state
      const dialog = container.querySelector('.dialog');
      assume(dialog).is.null();
    });

    it('should close basic example with close button', async function test() {
      const { container } = render(<Basic />);

      // Open dialog
      await userEvent.click(container.querySelector('button'));

      // Click the visible close button
      const closeButton = Array.from(container.querySelectorAll('button')).find((btn) => btn.textContent === 'Close');
      await userEvent.click(closeButton);

      // Should be back to initial state
      const dialog = container.querySelector('.dialog');
      assume(dialog).is.null();
    });

    it('should render custom label example in closed state initially', function test() {
      const { container } = render(<CustomLabel />);
      const openButton = container.querySelector('button');

      assume(openButton).is.not.null();
      assume(openButton.textContent).equals('Open Dialog');
    });

    it('should open and close custom label example with custom aria-label', async function test() {
      const { container } = render(<CustomLabel />);

      // Open dialog
      await userEvent.click(container.querySelector('button'));

      // Check dialog is open with custom label dismiss buttons
      const dialog = container.querySelector('.dialog');
      assume(dialog).is.not.null();
      assume(dialog.textContent).includes('Dialog with Custom Label');

      const dismissButtons = container.querySelectorAll('[aria-label="Close dialog"]');
      assume(dismissButtons.length).equals(2);

      // Close with first dismiss button
      await userEvent.click(dismissButtons[0]);

      const newDialog = container.querySelector('.dialog');
      assume(newDialog).is.null();
    });

    it('should close custom label example with second dismiss button', async function test() {
      const { container } = render(<CustomLabel />);

      // Open dialog
      await userEvent.click(container.querySelector('button'));

      // Close with second dismiss button
      const dismissButtons = container.querySelectorAll('[aria-label="Close dialog"]');
      await userEvent.click(dismissButtons[1]);

      const newDialog = container.querySelector('.dialog');
      assume(newDialog).is.null();
    });

    it('should render slot customization example in closed state initially', function test() {
      const { container } = render(<SlotCustomization />);
      const openButton = container.querySelector('button');

      assume(openButton).is.not.null();
      assume(openButton.textContent).equals('Open Dialog');
    });

    it('should open and close slot customization example', async function test() {
      const { container } = render(<SlotCustomization />);

      // Open dialog
      await userEvent.click(container.querySelector('button'));

      // Check dialog is open
      const dialog = container.querySelector('.dialog');
      assume(dialog).is.not.null();
      assume(dialog.textContent).includes('Dialog with Slot Customization');

      // Check custom class is applied (2 dismiss buttons in the dialog)
      const dismissButtons = dialog.querySelectorAll('[aria-label="Dismiss"]');
      assume(dismissButtons.length).equals(2);

      // Verify dismiss buttons have custom visually hidden wrappers
      const customHiddenElements = container.querySelectorAll('.custom-visually-hidden');
      assume(customHiddenElements.length).is.at.least(2);

      // Close with first dismiss button
      await userEvent.click(dismissButtons[0]);

      const newDialog = container.querySelector('.dialog');
      assume(newDialog).is.null();
    });

    it('should close slot customization example with second dismiss button', async function test() {
      const { container } = render(<SlotCustomization />);

      // Open dialog
      await userEvent.click(container.querySelector('button'));

      // Close with second dismiss button
      const dismissButtons = container.querySelectorAll('[aria-label="Dismiss"]');
      await userEvent.click(dismissButtons[1]);

      const newDialog = container.querySelector('.dialog');
      assume(newDialog).is.null();
    });
  });
});
