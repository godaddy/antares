import { useState } from 'react';
import { describe, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { cdp, page } from 'vitest/browser';
import assume from 'assume';
import { Button, Content, Drawer, DrawerTrigger, Text } from '@godaddy/antares';
import { NestedExample } from '../examples/nested.tsx';
import { PreventDismissalExample } from '../examples/prevent-dismissal.tsx';

async function waitForEntered(name: string) {
  await vi.waitFor(function entered() {
    assume(page.getByRole('dialog', { name }).query()?.contains(document.activeElement)).is.true();
  });
}

/** The swipe gesture is a native scroll of the sheet's scroll container. */
function getScroller(name: string): HTMLElement {
  const scroller = page.getByRole('dialog', { name, includeHidden: true }).element().closest('[data-sheet-scroll]');
  if (!scroller) throw new Error('Expected the sheet scroll container');
  return scroller as HTMLElement;
}

function swipeAway(name: string) {
  getScroller(name).scrollTo({ top: 0, left: 0 });
}

function wait(ms: number) {
  return new Promise(function settle(r) {
    setTimeout(r, ms);
  });
}

/** A drawer that rejects dismissal, as an unsaved-changes guard would. */
function RejectedDismiss() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open
      </Button>
      <Drawer
        placement="right"
        isOpen={open}
        onOpenChange={function keepOpen(next) {
          if (next) setOpen(true);
        }}
        aria-label="Guarded"
      >
        <Content>
          <Button variant="secondary" onPress={() => setOpen(false)}>
            Discard
          </Button>
        </Content>
      </Drawer>
    </>
  );
}

describe('@godaddy/antares', function antares() {
  describe('#Drawer swipe', function swipeTests() {
    it('closes a drawer swiped off screen', async function swipeClose() {
      await render(
        <DrawerTrigger>
          <Button variant="primary">Open</Button>
          <Drawer placement="right" aria-label="Swiped">
            <Content>
              <Text>Swipe me</Text>
            </Content>
          </Drawer>
        </DrawerTrigger>
      );

      await page.getByRole('button', { name: 'Open' }).click();
      await waitForEntered('Swiped');

      swipeAway('Swiped');
      await vi.waitFor(function closed() {
        assume(page.getByRole('dialog', { name: 'Swiped' }).query()).equals(null);
      });
    });

    it('closes only the top nested drawer when it is swiped away', async function swipeNested() {
      await render(<NestedExample />);

      await page.getByRole('button', { name: 'Open settings' }).click();
      await waitForEntered('Settings');
      await page.getByRole('button', { name: 'Account' }).click();
      await waitForEntered('Account');

      swipeAway('Account');
      await vi.waitFor(function childClosed() {
        assume(page.getByRole('dialog', { name: 'Account' }).query()).equals(null);
      });
      await wait(300);
      assume(page.getByRole('dialog', { name: 'Settings' }).query()).is.not.equal(null);
    });

    it('keeps a preventDismissal drawer on screen when swiped', async function swipePrevented() {
      await render(<PreventDismissalExample />);

      await page.getByRole('button', { name: 'Open' }).click();
      await waitForEntered('Unsaved changes');

      swipeAway('Unsaved changes');
      await wait(600);
      const dialog = page.getByRole('dialog', { name: 'Unsaved changes' }).element();
      assume(dialog.getBoundingClientRect().right <= window.innerWidth + 1).is.true();
    });

    it('slides a drawer back when its swipe dismissal is rejected', async function swipeRejected() {
      await render(<RejectedDismiss />);

      await page.getByRole('button', { name: 'Open' }).click();
      await waitForEntered('Guarded');

      swipeAway('Guarded');
      await vi.waitFor(
        function restored() {
          const box = page.getByRole('dialog', { name: 'Guarded' }).element().getBoundingClientRect();
          assume(Math.abs(box.right - window.innerWidth) <= 1).is.true();
        },
        { timeout: 2000 }
      );

      await page.getByRole('button', { name: 'Discard' }).click();
      await vi.waitFor(function closed() {
        assume(page.getByRole('dialog', { name: 'Guarded' }).query()).equals(null);
      });
    });

    it('restores a rejected swipe instantly under reduced motion', async function swipeRejectedReduced() {
      const session = cdp() as unknown as { send: (method: string, params: unknown) => Promise<void> };
      await session.send('Emulation.setEmulatedMedia', {
        features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
      });
      try {
        await render(<RejectedDismiss />);

        await page.getByRole('button', { name: 'Open' }).click();
        await waitForEntered('Guarded');

        const scroller = getScroller('Guarded');
        const rest = scroller.scrollLeft;
        const positions: number[] = [];
        scroller.addEventListener('scroll', () => positions.push(scroller.scrollLeft));

        swipeAway('Guarded');
        await vi.waitFor(function restored() {
          assume(scroller.scrollLeft).equals(rest);
        });
        // Instant: no scroll frames between the swiped-away position and rest.
        assume(positions.filter((x) => x !== 0 && x !== rest)).is.length(0);
      } finally {
        await session.send('Emulation.setEmulatedMedia', { features: [] });
      }
    });

    it('finishes entering on touch devices under reduced motion', async function touchReducedEnter() {
      const session = cdp() as unknown as { send: (method: string, params: unknown) => Promise<void> };
      // Touch support makes React Aria defer the sheet's entry until after the keyboard check.
      await session.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
      await session.send('Emulation.setEmulatedMedia', {
        features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
      });
      try {
        await render(<RejectedDismiss />);

        await page.getByRole('button', { name: 'Open' }).click();
        await waitForEntered('Guarded');
        assume(page.getByRole('dialog', { name: 'Guarded' }).element().closest('[data-entering]')).equals(null);
      } finally {
        await session.send('Emulation.setEmulatedMedia', { features: [] });
        await session.send('Emulation.setTouchEmulationEnabled', { enabled: false });
      }
    });

    it('fades the backdrop as the drawer is swiped', async function backdropTimeline() {
      await render(<NestedExample />);

      await page.getByRole('button', { name: 'Open settings' }).click();
      await waitForEntered('Settings');

      const scroller = getScroller('Settings');
      const backdrop = scroller.parentElement?.querySelector(':scope > [data-stack-index]') as HTMLElement;
      assume(Number(getComputedStyle(backdrop).opacity)).is.above(0.99);

      // Snapping would settle a half swipe back.
      const dialog = page.getByRole('dialog', { name: 'Settings' }).element();
      scroller.style.scrollSnapType = 'none';
      scroller.scrollTop -= dialog.getBoundingClientRect().height / 2;
      await vi.waitFor(function faded() {
        const opacity = Number(getComputedStyle(backdrop).opacity);
        assume(opacity).is.below(0.9);
        assume(opacity).is.above(0.1);
      });
    });
  });
});
