import { WithCloseButtonExample } from '../examples/with-close-button.tsx';
import { CustomAnchorExample } from '../examples/custom-anchor.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, it, vi } from 'vitest';
import assume from 'assume';

describe('@godaddy/uxcore', function uxcore() {
  describe('#Popover', function popoverTests() {
    it('opens DefaultExample and renders popover content', async function defaultExample() {
      const { getByRole } = await render(<DefaultExample />);

      await getByRole('button', { name: 'Open popover' }).click();

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog', { name: 'Content' }).query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('This is the popover content!');
      });
    });

    it('opens DefaultExample with Enter key', async function keyboardOpen() {
      const { getByRole } = await render(<DefaultExample />);

      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Enter}');

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog', { name: 'Content' }).query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('This is the popover content!');
      });
    });

    it('closes DefaultExample with Escape key', async function keyboardClose() {
      const { getByRole } = await render(<DefaultExample />);

      await getByRole('button', { name: 'Open popover' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog', { name: 'Content' }).query()).is.not.equal(null);
      });

      await userEvent.keyboard('{Escape}');

      await vi.waitFor(async function close() {
        assume(getByRole('dialog', { name: 'Content' }).query()).equals(null);
      });
    });

    it('opens CustomAnchorExample from external trigger', async function customAnchorExample() {
      const { getByRole } = await render(<CustomAnchorExample />);

      await getByRole('button', { name: 'Open Popover' }).click();

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog', { name: 'Content' }).query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('Popover content!');
      });
    });

    it('closes WithCloseButtonExample when close button is pressed', async function withCloseButtonExample() {
      const { getByRole } = await render(<WithCloseButtonExample />);

      await getByRole('button', { name: 'Open popover' }).click();

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog').query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('This is the popover content!');
      });

      await getByRole('button', { name: 'Close' }).click();

      await vi.waitFor(async function close() {
        assume(getByRole('dialog', { name: 'Content' }).query()).equals(null);
      });
    });

    it('closes WithCloseButtonExample using keyboard on close button', async function withCloseButtonKeyboard() {
      const { getByRole } = await render(<WithCloseButtonExample />);

      await getByRole('button', { name: 'Open popover' }).click();

      await vi.waitFor(async function open() {
        assume(getByRole('dialog', { name: 'Content' }).query()).is.not.equal(null);
      });

      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Enter}');

      await vi.waitFor(async function close() {
        assume(getByRole('dialog', { name: 'Content' }).query()).equals(null);
      });
    });
  });
});
