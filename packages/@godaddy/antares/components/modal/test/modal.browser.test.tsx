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

    it('positions actions with justify-content: start', async function actionsJustifyStart() {
      await render(<AlignmentExample />);

      const actionsAlignment = page.getByRole('radiogroup', { name: 'Actions alignment' });
      await actionsAlignment.getByRole('radio', { name: 'Start' }).click({ force: true });

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      const cancel = await page.getByRole('button', { name: 'Cancel' }).element();
      expect((cancel.parentElement as HTMLElement).style.justifyContent).toBe('start');
    });

    it('positions actions with justify-content: center', async function actionsJustifyCenter() {
      await render(<AlignmentExample />);

      const actionsAlignment = page.getByRole('radiogroup', { name: 'Actions alignment' });
      await actionsAlignment.getByRole('radio', { name: 'Centered' }).click({ force: true });

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      const cancel = await page.getByRole('button', { name: 'Cancel' }).element();
      expect((cancel.parentElement as HTMLElement).style.justifyContent).toBe('center');
    });

    it('positions actions with justify-content: end (default)', async function actionsJustifyEnd() {
      await render(<AlignmentExample />);

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      const cancel = await page.getByRole('button', { name: 'Cancel' }).element();
      expect((cancel.parentElement as HTMLElement).style.justifyContent).toBe('end');
    });

    it('lays out actions in a row (default)', async function actionsRow() {
      await render(<AlignmentExample />);

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      const cancel = await page.getByRole('button', { name: 'Cancel' }).element();
      expect((cancel.parentElement as HTMLElement).style.flexDirection).toBe('row');
    });

    it('lays out actions in a column', async function actionsColumn() {
      await render(<AlignmentExample />);

      const actionsDirection = page.getByRole('radiogroup', { name: 'Actions direction' });
      await actionsDirection.getByRole('radio', { name: 'Column' }).click({ force: true });

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      const cancel = await page.getByRole('button', { name: 'Cancel' }).element();
      expect((cancel.parentElement as HTMLElement).style.flexDirection).toBe('column');
    });

    it('lays out media in a column (default)', async function mediaColumn() {
      await render(<WithMediaExample />);

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      const dialog = await page.getByRole('dialog').element();
      expect((dialog as HTMLElement).style.flexDirection).toBe('column');
    });

    it('lays out media in a row', async function mediaRow() {
      await render(<WithMediaExample />);

      const direction = page.getByRole('radiogroup', { name: 'Direction' });
      await direction.getByRole('radio', { name: 'Row' }).click({ force: true });

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      const dialog = await page.getByRole('dialog').element();
      expect((dialog as HTMLElement).style.flexDirection).toBe('row');
    });

    it('renders media at the start (default) in row layout', async function mediaStart() {
      await render(<WithMediaExample />);

      const direction = page.getByRole('radiogroup', { name: 'Direction' });
      await direction.getByRole('radio', { name: 'Row' }).click({ force: true });

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      const dialog = await page.getByRole('dialog').element();
      expect((dialog as HTMLElement).style.flexDirection).toBe('row');
    });

    it('renders media at the end in row layout', async function mediaEnd() {
      await render(<WithMediaExample />);

      const direction = page.getByRole('radiogroup', { name: 'Direction' });
      await direction.getByRole('radio', { name: 'Row' }).click({ force: true });

      const position = page.getByRole('radiogroup', { name: 'Position' });
      await position.getByRole('radio', { name: 'End' }).click({ force: true });

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await expect.element(page.getByRole('dialog')).toBeVisible();

      const dialog = await page.getByRole('dialog').element();
      expect((dialog as HTMLElement).style.flexDirection).toBe('row-reverse');
    });
  });
});
