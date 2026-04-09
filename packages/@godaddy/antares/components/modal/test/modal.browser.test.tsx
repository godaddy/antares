import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { DefaultExample } from '../examples/default.tsx';
import { WithActionsExample } from '../examples/with-actions.tsx';
import { HorizontalMediaExample } from '../examples/horizontal-media.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Modal', function modalTests() {
    it('opens modal on trigger click', async function openModal() {
      await render(<DefaultExample />);

      const trigger = page.getByRole('button', { name: 'Open modal' });
      await userEvent.click(trigger);

      await expect.element(page.getByRole('dialog')).toBeVisible();
      await expect.element(page.getByText('Modal title')).toBeVisible();
    });

    it('closes modal via close button', async function closeViaButton() {
      await render(<DefaultExample />);

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      await userEvent.click(page.getByRole('button', { name: 'Close' }));
      await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
    });

    it('closes modal via Escape key', async function closeViaEscape() {
      await render(<DefaultExample />);

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      await userEvent.keyboard('{Escape}');
      await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders action buttons in footer', async function actionButtons() {
      await render(<WithActionsExample />);

      await userEvent.click(page.getByRole('button', { name: 'Confirm action' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      await expect.element(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
      await expect.element(page.getByRole('button', { name: 'Save changes' })).toBeVisible();
    });

    it('closes modal via footer action button', async function closeViaAction() {
      await render(<WithActionsExample />);

      await userEvent.click(page.getByRole('button', { name: 'Confirm action' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      await userEvent.click(page.getByRole('button', { name: 'Cancel' }));
      await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders horizontal media layout', async function horizontalMedia() {
      await render(<HorizontalMediaExample />);

      await userEvent.click(page.getByRole('button', { name: 'Product details' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();
      await expect.element(page.getByRole('img', { name: 'Product' })).toBeVisible();
    });
  });
});
