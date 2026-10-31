import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import assume from 'assume';
import { DefaultExample } from '../examples/default.tsx';

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

    it('unmounts and restores focus when Sheet misses the exit', async function missedExit() {
      const { getByRole } = await render(<DefaultExample />);
      const trigger = getByRole('button', { name: 'Open drawer' });

      await trigger.click();
      await vi.waitFor(function entered() {
        assume(page.getByRole('dialog').query()?.contains(document.activeElement)).is.true();
      });

      await userEvent.keyboard('{Escape}');
      await vi.waitFor(function closed() {
        assume(getByRole('dialog').query()).equals(null);
      });
      assume(document.activeElement).equals(trigger.element());
    });
  });
});
