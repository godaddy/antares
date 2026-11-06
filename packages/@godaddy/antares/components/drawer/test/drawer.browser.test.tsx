import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import assume from 'assume';
import { DefaultExample } from '../examples/default.tsx';
import { BottomSheetExample } from '../examples/bottom-sheet.tsx';
import { PlaygroundExample } from '../examples/drawer-playground.tsx';
import { PreventDismissalExample } from '../examples/prevent-dismissal.tsx';
import { NestedExample } from '../examples/nested.tsx';
import { FilteredDismissExample } from '../examples/filtered-dismiss.tsx';
import { NestedPopoverExample } from '../examples/nested-popover.tsx';
import { ScrollableExample } from '../examples/scrollable.tsx';
import { LayerPropsExample } from '../examples/layer-props.tsx';

/** Sheet only takes focus and handles Escape once its slide settles. */
async function waitForEntered(name?: string) {
  await vi.waitFor(function entered() {
    const dialog = name ? page.getByRole('dialog', { name }).query() : document.querySelector('[role="dialog"]');
    assume(dialog?.contains(document.activeElement)).is.true();
  });
}

describe('@godaddy/antares', function antares() {
  describe('#Drawer', function drawerTests() {
    describe.each(['left', 'right', 'top', 'bottom'] as const)('%s sizing', function oversizedTests(placement) {
      it.each(['Escape', 'close button', 'swipe'])(
        'closes an oversized drawer with %s and restores focus',
        async function oversizedClose(method) {
          const viewport = { width: innerWidth, height: innerHeight };
          await page.viewport(800, 600);
          try {
            const { getByRole } = await render(<PlaygroundExample placement={placement} minSize={1000} />);
            const trigger = getByRole('button', { name: 'Open drawer' });
            await trigger.click();
            await waitForEntered();

            const dialog = getByRole('dialog');
            const panel = dialog.element().parentElement!;
            const horizontal = placement === 'left' || placement === 'right';
            expect(horizontal ? panel.offsetWidth : panel.offsetHeight).toBe(horizontal ? innerWidth : innerHeight);
            await expect
              .poll(function entered() {
                const box = panel.getBoundingClientRect();
                return box.left >= 0 && box.top >= 0 && box.right <= innerWidth && box.bottom <= innerHeight;
              })
              .toBe(true);

            if (method === 'Escape') {
              await userEvent.keyboard('{Escape}');
            } else if (method === 'close button') {
              await getByRole('button', { name: 'Close' }).click();
            } else {
              const scroller = panel.closest<HTMLElement>('[data-sheet-scroll]')!;
              const end = placement === 'left' || placement === 'top';
              scroller.scrollTo({ top: end ? scroller.scrollHeight : 0, left: end ? scroller.scrollWidth : 0 });
            }

            await expect.element(dialog).not.toBeInTheDocument();
            await expect.element(trigger).toHaveFocus();
          } finally {
            await page.viewport(viewport.width, viewport.height);
          }
        }
      );
    });

    it('opens DefaultExample and renders drawer content', async function openDefault() {
      const { getByRole } = await render(<DefaultExample />);

      await getByRole('button', { name: 'Open drawer' }).click();

      await vi.waitFor(async function open() {
        const dialog = getByRole('dialog').query();
        assume(dialog).is.not.equal(null);
        assume(dialog?.textContent).includes('Drawer content goes here.');
      });
      await waitForEntered();
    });

    it('opens DefaultExample with Enter key', async function keyboardOpen() {
      const { getByRole } = await render(<DefaultExample />);

      await userEvent.keyboard('{Tab}');
      await userEvent.keyboard('{Enter}');

      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });
      await waitForEntered();
    });

    it('closes DefaultExample with Escape key', async function keyboardClose() {
      const { getByRole } = await render(<DefaultExample />);

      await getByRole('button', { name: 'Open drawer' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });
      await waitForEntered();

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
      await waitForEntered();

      await getByRole('button', { name: 'Close' }).click();
      await vi.waitFor(async function close() {
        assume(getByRole('dialog').query()).equals(null);
      });
    });

    it.each([
      ['right', undefined, undefined],
      ['right', 'min-content', 'min-content'],
      ['bottom', 'min-content', 'min-content'],
      ['right', 'max-content', 'max-content'],
      ['bottom', 'max-content', 'max-content'],
      ['right', 'fit-content', 'fit-content'],
      ['bottom', 'fit-content', 'fit-content'],
      ['right', 'max-content', 40]
    ] as const)(
      'opens PlaygroundExample with %s sizing (%s, %s)',
      async function playground(placement, minSize, maxSize) {
        const { getByRole } = await render(
          <PlaygroundExample placement={placement} minSize={minSize} maxSize={maxSize} />
        );

        await getByRole('button', { name: 'Open drawer' }).click();
        await waitForEntered();

        const dialog = getByRole('dialog');
        await expect.element(dialog).toHaveTextContent('Drawer content!');
        const panel = dialog.element().parentElement!;
        const style = getComputedStyle(panel);
        const horizontal = placement === 'right';
        if (minSize) expect(horizontal ? style.minInlineSize : style.minBlockSize).toBe(minSize);
        if (typeof maxSize === 'string') expect(horizontal ? style.maxInlineSize : style.maxBlockSize).toBe(maxSize);
        if (maxSize === 40) expect(panel.offsetWidth).toBeGreaterThan(40);
        if (maxSize === 'min-content' && horizontal) {
          const range = document.createRange();
          range.selectNodeContents(dialog.getByText('Drawer content!').element());
          expect(range.getClientRects().length).toBeGreaterThan(1);
        }
      }
    );

    it('closes DefaultExample when the backdrop is pressed', async function backdropClose() {
      const { getByRole } = await render(<DefaultExample />);

      await getByRole('button', { name: 'Open drawer' }).click();
      await waitForEntered();

      await userEvent.click(document.body, { position: { x: 10, y: 10 } });
      await vi.waitFor(async function close() {
        assume(getByRole('dialog').query()).equals(null);
      });
    });

    it('prevents backdrop dismiss with preventDismissal', async function noBackdropClose() {
      const { getByRole } = await render(<PreventDismissalExample />);

      await getByRole('button', { name: 'Open' }).click();
      await waitForEntered();

      await userEvent.click(document.body, { position: { x: 10, y: 10 } });
      await new Promise(function settle(r) {
        setTimeout(r, 600);
      });
      assume(getByRole('dialog').query()).is.not.equal(null);
    });

    it('prevents Escape dismiss with preventDismissal', async function noEscape() {
      const { getByRole } = await render(<PreventDismissalExample />);

      await getByRole('button', { name: 'Open' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });
      await waitForEntered();

      await userEvent.keyboard('{Escape}');
      await new Promise(function settle(r) {
        setTimeout(r, 600);
      });
      assume(getByRole('dialog').query()).is.not.equal(null);

      await getByRole('button', { name: 'Close' }).click();
      await vi.waitFor(async function close() {
        assume(getByRole('dialog').query()).equals(null);
      });
    });

    it('stacks a nested drawer and returns to the parent on close', async function nested() {
      const { getByRole } = await render(<NestedExample />);

      await getByRole('button', { name: 'Open settings' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog', { name: 'Settings' }).query()).is.not.equal(null);
      });
      await waitForEntered();

      await getByRole('button', { name: 'Account' }).click();
      await vi.waitFor(async function nestedOpen() {
        assume(getByRole('dialog', { name: 'Account' }).query()).is.not.equal(null);
      });
      await waitForEntered('Account');

      const parent = getByRole('dialog', { name: 'Settings', includeHidden: true })
        .element()
        .closest('[data-stack-index]');
      const child = getByRole('dialog', { name: 'Account' }).element().closest('[data-stack-index]');
      assume(parent?.getAttribute('data-stack-index')).equals('0');
      assume(parent?.hasAttribute('data-has-descendants')).is.true();
      assume(child?.getAttribute('data-stack-index')).equals('1');

      await userEvent.keyboard('{Escape}');
      await vi.waitFor(async function nestedClose() {
        assume(getByRole('dialog', { name: 'Account' }).query()).equals(null);
      });
      assume(getByRole('dialog', { name: 'Settings' }).query()).is.not.equal(null);
    });

    it('shouldCloseOnInteractOutside filters dismiss', async function filteredDismiss() {
      const { getByRole } = await render(<FilteredDismissExample />);

      await getByRole('button', { name: 'Open' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });
      await waitForEntered();

      await userEvent.click(document.body, { position: { x: 10, y: 10 } });

      await new Promise(function settle(r) {
        setTimeout(r, 600);
      });
      assume(getByRole('dialog').query()).is.not.equal(null);
    });

    it('popover inside drawer does not close drawer', async function nestedPopover() {
      const { getByRole, getByText } = await render(<NestedPopoverExample />);

      await getByRole('button', { name: 'Open drawer' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog', { name: 'Nested popover' }).query()).is.not.equal(null);
      });
      await waitForEntered();

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
      await waitForEntered();

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
      await waitForEntered();

      const dialog = document.querySelector('.custom-dialog');
      const container = document.querySelector('.custom-container');
      const overlay = document.querySelector('.custom-overlay');

      assume(dialog?.getAttribute('role')).equals('dialog');
      assume(container?.contains(dialog as Node)).is.true();
      assume(overlay?.contains(container as Node)).is.false();

      assume((container as HTMLElement).className.split(' ').length).is.above(1);
      assume((overlay as HTMLElement).className.split(' ').length).is.above(1);
    });
  });
});
