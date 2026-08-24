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
import { ScrollableExample } from '../examples/scrollable.tsx';
import { LayerPropsExample } from '../examples/layer-props.tsx';

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
      if (!overlay) throw new Error('Expected overlay element to exist');
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

    it('scrolls the Content region while the title row stays pinned', async function scrollableContent() {
      const { getByRole } = await render(<ScrollableExample />);

      await getByRole('button', { name: 'Open drawer' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog', { name: 'Terms' }).query()).is.not.equal(null);
      });

      const dialog = getByRole('dialog', { name: 'Terms' }).element();
      const content = dialog.querySelector('section') as HTMLElement;
      assume(getComputedStyle(content).overflowY).equals('auto');

      // The title row is a content-sized grid track, so it cannot be squeezed by the content:
      // the scrolling region ends inside the panel rather than overflowing it.
      const title = dialog.querySelector('[slot="title"]') as HTMLElement;
      assume(title.getBoundingClientRect().bottom <= content.getBoundingClientRect().top).is.true();
      assume(content.getBoundingClientRect().bottom <= dialog.getBoundingClientRect().bottom).is.true();
    });

    it('routes className and each layer bag to its own element', async function layerProps() {
      const { getByRole } = await render(<LayerPropsExample />);

      await getByRole('button', { name: 'Open drawer' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      const dialog = document.querySelector('.custom-dialog');
      const container = document.querySelector('.custom-container');
      const overlay = document.querySelector('.custom-overlay');

      // Three distinct nested elements: overlay > container > dialog.
      assume(dialog?.getAttribute('role')).equals('dialog');
      assume(container?.contains(dialog as Node)).is.true();
      assume(overlay?.contains(container as Node)).is.true();

      // The panel keeps its own classes and the slide vars alongside the consumer's class.
      const panel = container as HTMLElement;
      assume(panel.className.split(' ').length).is.above(1);
      assume(panel.style.getPropertyValue('--_slide')).is.not.equal('');
    });
  });
});
