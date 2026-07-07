import { describe, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import assume from 'assume';
import { DefaultExample } from '../examples/default.tsx';
import { BottomSheetExample } from '../examples/bottom-sheet.tsx';
import { PlaygroundExample } from '../examples/drawer-playground.tsx';
import { NoEscapeDismissExample } from '../examples/no-escape-dismiss.tsx';
import { FilteredDismissExample } from '../examples/filtered-dismiss.tsx';
import { NestedPopoverExample } from '../examples/nested-popover.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Drawer', function drawerTests() {
    it('opens DefaultExample and renders drawer content', async function openDefault() {
      const { getByRole } = await render(<DefaultExample />);

      await getByRole('button', { name: 'Open drawer' }).click();

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog').query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('Drawer content goes here.');
      });
    });

    it('opens DefaultExample with Enter key', async function keyboardOpen() {
      const { getByRole } = await render(<DefaultExample />);

      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Enter}');

      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });
    });

    it('closes DefaultExample with Escape key', async function keyboardClose() {
      const { getByRole } = await render(<DefaultExample />);

      await getByRole('button', { name: 'Open drawer' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      await userEvent.keyboard('{Escape}');
      await vi.waitFor(async function close() {
        assume(getByRole('dialog').query()).equals(null);
      });
    });

    it('closes BottomSheetExample when close button is pressed', async function closeButton() {
      const { getByRole } = await render(<BottomSheetExample />);

      await getByRole('button', { name: 'Open bottom sheet' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      await getByRole('button', { name: 'Close' }).click();
      await vi.waitFor(async function close() {
        assume(getByRole('dialog').query()).equals(null);
      });
    });

    it('opens PlaygroundExample and renders drawer', async function playground() {
      const { getByRole } = await render(<PlaygroundExample placement="right" isDismissable />);

      await getByRole('button', { name: 'Open drawer' }).click();
      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog').query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('Drawer content!');
      });
    });

    it('opens with placement="left"', async function leftPlacement() {
      const { getByRole } = await render(<PlaygroundExample placement="left" />);

      await getByRole('button', { name: 'Open drawer' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      const panel = document.querySelector('[data-placement]');
      assume(panel?.getAttribute('data-placement')).equals('left');
    });

    it('opens with placement="top"', async function topPlacement() {
      const { getByRole } = await render(<PlaygroundExample placement="top" />);

      await getByRole('button', { name: 'Open drawer' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      const panel = document.querySelector('[data-placement]');
      assume(panel?.getAttribute('data-placement')).equals('top');
    });

    it('prevents escape dismiss when isKeyboardDismissDisabled', async function noEscape() {
      const { getByRole } = await render(<NoEscapeDismissExample />);

      await getByRole('button', { name: 'Open' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      await userEvent.keyboard('{Escape}');
      // Wait past the 0.2s exit transition; a non-blocked Escape would have
      // fully closed and unmounted the dialog by now.
      await new Promise(function settle(r) {
        setTimeout(r, 400);
      });
      assume(getByRole('dialog').query()).is.not.equal(null);
    });

    it('shouldCloseOnInteractOutside filters dismiss', async function filteredDismiss() {
      const { getByRole } = await render(<FilteredDismissExample />);

      await getByRole('button', { name: 'Open' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      const overlay = getByRole('dialog').element().parentElement!.parentElement!;
      await userEvent.click(overlay);

      // Wait past the 0.2s exit transition; the filter returns false so it
      // must stay open.
      await new Promise(function settle(r) {
        setTimeout(r, 400);
      });
      assume(getByRole('dialog').query()).is.not.equal(null);
    });

    it('popover inside drawer does not close drawer', async function nestedPopover() {
      const { getByRole, getByText } = await render(<NestedPopoverExample />);

      await getByRole('button', { name: 'Open drawer' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog', { name: 'Nested popover' }).query()).is.not.equal(null);
      });

      await getByRole('button', { name: 'Open popover' }).click();
      await vi.waitFor(async function popoverOpen() {
        assume(getByText('Popover inside drawer').query()).is.not.equal(null);
      });

      assume(getByRole('dialog', { name: 'Nested popover' }).query()).is.not.equal(null);
    });
  });
});
