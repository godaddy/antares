import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { DefaultExample } from '../examples/default.tsx';
import { EmptyExample } from '../examples/empty.tsx';
import { LayerPropsExample } from '../examples/layer-props.tsx';
import { NoStepsExample } from '../examples/no-steps.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Wizard', function wizardTests() {
    it('opens a named full-screen dialog with the first labeled static step and restores focus on close', async function openAndClose() {
      await render(<DefaultExample />);
      const trigger = page.getByRole('button', { name: 'Start setup' });
      await userEvent.click(trigger);

      const dialog = page.getByRole('dialog', { name: 'Setup' });
      await expect.element(dialog).toBeVisible();
      await expect.element(dialog.getByRole('region', { name: 'Details' })).toBeVisible();
      await expect.element(dialog.getByRole('region', { name: 'Review', includeHidden: true })).not.toBeVisible();
      expect(getComputedStyle(dialog.element()).inlineSize).toBe(`${window.innerWidth}px`);
      expect(getComputedStyle(dialog.element()).blockSize).toBe(`${window.innerHeight}px`);

      await userEvent.click(dialog.getByRole('button', { name: 'Close' }));
      await expect.element(dialog).not.toBeInTheDocument();
      await expect.element(trigger).toHaveFocus();
    });

    it('closes on Escape and does not dismiss on backdrop interaction', async function dismissal() {
      await render(<DefaultExample />);
      await userEvent.click(page.getByRole('button', { name: 'Start setup' }));
      const dialog = page.getByRole('dialog', { name: 'Setup' });
      const backdrop = dialog.element().parentElement?.parentElement;
      if (!backdrop) throw new Error('Missing backdrop');
      backdrop.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }));
      backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }));
      await expect.element(dialog).toBeVisible();

      await userEvent.keyboard('{Escape}');
      await expect.element(dialog).not.toBeInTheDocument();
      await expect.element(page.getByRole('button', { name: 'Start setup' })).toHaveFocus();
    });

    it('opens with an empty collection and accessible dialog name', async function emptySteps() {
      await render(<EmptyExample />);
      await userEvent.click(page.getByRole('button', { name: 'Open empty wizard' }));
      const dialog = page.getByRole('dialog', { name: 'Empty workflow' });
      await expect.element(dialog).toBeVisible();
      expect(dialog.element().querySelectorAll('[role="region"]')).toHaveLength(0);
    });

    it('opens without a step collection', async function missingSteps() {
      await render(<NoStepsExample />);
      await userEvent.click(page.getByRole('button', { name: 'Open without steps' }));
      await expect.element(page.getByRole('dialog', { name: 'No steps yet' })).toBeVisible();
    });

    it('routes the primary props to the dialog and the layer bags to their layers', async function layers() {
      await render(<LayerPropsExample />);
      await userEvent.click(page.getByRole('button', { name: 'Open custom wizard' }));
      const dialog = page.getByRole('dialog', { name: 'Custom workflow' }).element();
      expect(dialog.classList.contains('custom-dialog')).toBe(true);
      expect(dialog.parentElement?.classList.contains('custom-container')).toBe(true);
      expect(dialog.parentElement?.parentElement?.classList.contains('custom-overlay')).toBe(true);
      await expect.element(page.getByRole('region', { name: 'First step' })).toBeVisible();
    });
  });
});
