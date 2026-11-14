import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { DefaultExample } from '../examples/default.tsx';
import { NestedExample } from '../examples/nested.tsx';
import { PlacementsExample } from '../examples/placements.tsx';
import { PreventDismissalExample } from '../examples/prevent-dismissal.tsx';
import { RejectedDismissalExample } from '../examples/rejected-dismissal.tsx';

const NativeObserver = window.IntersectionObserver;

/** Withholds the off-screen report for the sheet content, as Sheet misses it in adobe/react-spectrum#10897. */
class WithholdingObserver extends NativeObserver {
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    let hasEntered = false;
    super(function withhold(entries, observer) {
      const kept = entries.filter(function keep(entry) {
        if (!(entry.target as HTMLElement).hasAttribute('data-sheet-content')) return true;
        hasEntered ||= entry.intersectionRatio > 0;
        return !hasEntered || entry.intersectionRatio > 0;
      });
      if (kept.length) callback(kept, observer);
    }, options);
  }
}

describe('@godaddy/antares', function antares() {
  describe('#Drawer finish close', function finishCloseTests() {
    beforeEach(function withhold() {
      window.IntersectionObserver = WithholdingObserver;
    });

    afterEach(function restore() {
      window.IntersectionObserver = NativeObserver;
    });

    it.each(['Escape', 'swipe'])(
      'unmounts and restores focus when Sheet misses the %s exit',
      async function missedExit(method) {
        const { getByRole } = await render(<DefaultExample />);
        const trigger = getByRole('button', { name: 'Open drawer' });

        await trigger.click();
        const dialog = getByRole('dialog');
        await expect.element(dialog).toHaveFocus();

        if (method === 'Escape') {
          await userEvent.keyboard('{Escape}');
        } else {
          dialog.element().closest<HTMLElement>('[data-sheet-scroll]')!.scrollTo({ top: 0, left: 0 });
        }
        await expect.element(dialog).not.toBeInTheDocument();
        await expect.element(trigger).toHaveFocus();
      }
    );

    it.each(['left', 'right', 'top', 'bottom'] as const)(
      'recovers a missed swipe exit from a controlled %s drawer',
      async function missedControlledExit(placement) {
        const { getByRole } = await render(<PlacementsExample />);
        const trigger = getByRole('button', { name: `Open ${placement}` });

        await trigger.click();
        const dialog = getByRole('dialog', { name: `${placement} drawer` });
        await expect.element(dialog).toHaveFocus();

        const scroller = dialog.element().closest<HTMLElement>('[data-sheet-scroll]')!;
        await expect
          .poll(function entered() {
            const box = dialog.element().getBoundingClientRect();
            return box.left >= 0 && box.top >= 0 && box.right <= innerWidth && box.bottom <= innerHeight;
          })
          .toBe(true);
        const end = placement === 'top' || placement === 'left';
        scroller.scrollTo({
          top: end ? scroller.scrollHeight : 0,
          left: end ? scroller.scrollWidth : 0
        });

        await expect.element(dialog).not.toBeInTheDocument();
        await expect.element(trigger).toHaveFocus();
      }
    );

    it('recovers only the top nested drawer when Sheet misses its swipe exit', async function missedNestedExit() {
      const { getByRole } = await render(<NestedExample />);

      await getByRole('button', { name: 'Open settings' }).click();
      const parent = getByRole('dialog', { name: 'Settings' });
      await expect.element(parent).toHaveFocus();

      const trigger = getByRole('button', { name: 'Account' });
      await trigger.click();
      const child = getByRole('dialog', { name: 'Account' });
      await expect.element(child).toHaveFocus();

      child.element().closest<HTMLElement>('[data-sheet-scroll]')!.scrollTo({ top: 0 });

      await expect.element(child).not.toBeInTheDocument();
      await expect.element(parent).toBeVisible();
      await expect.element(trigger).toHaveFocus();
    });

    it('restores a rejected swipe when Sheet misses its exit', async function missedRejectedExit() {
      const { getByRole } = await render(<RejectedDismissalExample />);

      await getByRole('button', { name: 'Open' }).click();
      const dialog = getByRole('dialog', { name: 'Guarded' });
      await expect.element(dialog).toHaveFocus();

      const scroller = dialog.element().closest<HTMLElement>('[data-sheet-scroll]')!;
      const rest = scroller.scrollLeft;
      scroller.scrollTo({ left: 0 });
      expect(scroller.scrollLeft).toBe(0);
      await expect
        .poll(function restored() {
          return scroller.scrollLeft;
        })
        .toBe(rest);

      await getByRole('button', { name: 'Discard' }).click();
      await expect.element(dialog).not.toBeInTheDocument();
    });

    it('preserves preventDismissal when observer reports are withheld', async function preventedExit() {
      const { getByRole } = await render(<PreventDismissalExample />);

      await getByRole('button', { name: 'Open' }).click();
      const dialog = getByRole('dialog', { name: 'Unsaved changes' });
      await expect.element(dialog).toHaveFocus();

      const scroller = dialog.element().closest<HTMLElement>('[data-sheet-scroll]')!;
      scroller.scrollTo({ left: 0 });
      await new Promise(function settle(resolve) {
        setTimeout(resolve, 600);
      });
      await expect.element(dialog).toBeVisible();

      await getByRole('button', { name: 'Close' }).click();
      await expect.element(dialog).not.toBeInTheDocument();
    });
  });
});
