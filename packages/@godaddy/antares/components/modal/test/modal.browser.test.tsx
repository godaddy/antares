import { describe, it, expect, beforeAll } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { preloadTestIcons } from '../../../utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { ScrollableExample } from '../examples/scrollable.tsx';
import { PlaygroundExample } from '../examples/modal-playground.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Modal', function modalTests() {
    beforeAll(preloadTestIcons);

    it('opens the modal on trigger click', async function openModal() {
      await render(<DefaultExample />);

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));

      await expect.element(page.getByRole('dialog')).toBeVisible();
    });

    it('labels the dialog via a Heading slot="title"', async function labelledDialog() {
      await render(<DefaultExample />);

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));

      // The accessible name comes from <Heading slot="title">, proving the RAC
      // HeadingContext wiring flows through our Heading preset.
      await expect.element(page.getByRole('dialog', { name: 'Delete file?' })).toBeVisible();
    });

    it('closes the modal via the CloseButton', async function closeViaButton() {
      await render(<DefaultExample />);

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      await userEvent.click(page.getByRole('button', { name: 'Close' }));
      await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
    });

    it('closes the modal via a footer action button', async function closeViaAction() {
      await render(<DefaultExample />);

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      await userEvent.click(page.getByRole('button', { name: 'Delete' }));
      await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
    });

    it('closes the modal via the Escape key', async function closeViaEscape() {
      await render(<DefaultExample />);

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      await userEvent.keyboard('{Escape}');
      await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
    });

    it('controls the open state externally', async function controlled() {
      await render(<ControlledExample />);

      await userEvent.click(page.getByRole('button', { name: 'Open from outside' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      await userEvent.keyboard('{Escape}');
      await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
    });

    it('makes the content region scrollable while the header stays pinned', async function scrollableContent() {
      await render(<ScrollableExample />);

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog', { name: 'Terms of service' })).toBeVisible();

      const dialog = await page.getByRole('dialog').element();
      const content = dialog.querySelector('section') as HTMLElement;

      expect(getComputedStyle(dialog).overflow).toBe('hidden');
      expect(getComputedStyle(content).overflowY).toBe('auto');
    });

    it('does not dismiss when isDismissable is false', async function notDismissable() {
      await render(<PlaygroundExample isDismissable={false} />);

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      await userEvent.keyboard('{Escape}');
      await expect.element(page.getByRole('dialog')).toBeVisible();
    });
  });
});
