import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { DefaultExample } from '../examples/default.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { WithActionsExample } from '../examples/with-actions.tsx';
import { WithMediaExample } from '../examples/with-media.tsx';
import { AlignmentExample } from '../examples/alignment.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Modal', function modalTests() {
    it('opens modal on trigger click', async function openModal() {
      await render(<DefaultExample />);

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));

      await expect.element(page.getByRole('dialog')).toBeVisible();
      await expect.element(page.getByText('Modal title')).toBeVisible();
      await expect.element(page.getByText('This is the children content')).toBeVisible();
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

    it('controls open state externally', async function controlled() {
      await render(<ControlledExample />);

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      await userEvent.keyboard('{Escape}');
      await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders action buttons in footer', async function actionButtons() {
      await render(<WithActionsExample />);

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      await expect.element(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
      await expect.element(page.getByRole('button', { name: 'Confirm' })).toBeVisible();
    });

    it('closes modal via footer action button', async function closeViaAction() {
      await render(<WithActionsExample />);

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      await userEvent.click(page.getByRole('button', { name: 'Confirm' }));
      await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders media element in modal', async function withMedia() {
      await render(<WithMediaExample />);

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();
      await expect.element(page.getByText('This is the children content')).toBeVisible();
    });

    it('renders alignment example with actions', async function alignment() {
      await render(<AlignmentExample />);

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));

      await expect.element(page.getByRole('dialog')).toBeVisible();
      await expect.element(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
      await expect.element(page.getByRole('button', { name: 'Confirm' })).toBeVisible();
    });
  });
});
