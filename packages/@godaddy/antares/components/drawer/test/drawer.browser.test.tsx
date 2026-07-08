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
import { RTLExample } from '../examples/rtl.tsx';

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

    it('disables transitions when animate is false', async function animateOff() {
      const { getByRole } = await render(<PlaygroundExample animate={false} />);

      await getByRole('button', { name: 'Open drawer' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      assume(document.querySelector('[data-animate="false"]')).is.not.equal(null);
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

      const overlay = getByRole('dialog').element().parentElement?.parentElement;
      assume(overlay).is.not.equal(null);
      await userEvent.click(overlay as HTMLElement);

      // Wait past the 0.2s exit transition; the filter returns false so it
      // must stay open.
      await new Promise(function settle(r) {
        setTimeout(r, 400);
      });
      assume(getByRole('dialog').query()).is.not.equal(null);
    });

    // In RTL the panel must both dock at the mirrored physical edge AND slide in
    // from that same edge. A prior double-flip left it docked correctly but
    // sliding from the opposite side, so assert position and transform together.
    it('docks and slides from the left edge for placement="right" in RTL', async function rtlRight() {
      const { getByRole } = await render(<RTLExample />);

      await getByRole('button', { name: 'Open right' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });
      await new Promise(function settle(r) {
        setTimeout(r, 400);
      });

      const panel = document.querySelector('[data-placement]') as HTMLElement;
      assume(Math.round(panel.getBoundingClientRect().left)).equals(0);
      assume(getComputedStyle(panel).getPropertyValue('--_slide').trim()).equals('translateX(-100%)');
    });

    it('docks and slides from the right edge for placement="left" in RTL', async function rtlLeft() {
      const { getByRole } = await render(<RTLExample />);

      await getByRole('button', { name: 'Open left' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });
      await new Promise(function settle(r) {
        setTimeout(r, 400);
      });

      const panel = document.querySelector('[data-placement]') as HTMLElement;
      assume(Math.round(panel.getBoundingClientRect().right)).equals(window.innerWidth);
      assume(getComputedStyle(panel).getPropertyValue('--_slide').trim()).equals('translateX(100%)');
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
