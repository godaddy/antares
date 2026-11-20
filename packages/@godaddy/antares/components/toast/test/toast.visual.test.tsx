import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { EmphasesExample } from '../examples/emphases.tsx';
import { PlaygroundExample } from '../examples/toast-playground.tsx';

const HOST = '[data-antares-toast-host="1"]';

async function settle() {
  await new Promise(function waitForEntry(resolve) {
    setTimeout(resolve, 300);
  });
}

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);

  beforeAll(async function viewport() {
    await page.viewport(1024, 640);
  });

  // A toast without a close button clears itself through its timeout.
  afterEach(async function closeAll() {
    await vi.waitFor(
      function empty() {
        for (const close of document.querySelectorAll<HTMLButtonElement>(`${HOST} [slot="close"]`)) close.click();
        expect(document.querySelectorAll(`${HOST} [role="alertdialog"]`).length).toBe(0);
      },
      { timeout: 5000 }
    );
  });

  describe('#Toast', function toastTests() {
    it('emphases', async function emphases() {
      await render(<EmphasesExample />);
      for (const emphasis of ['warning', 'critical', 'success', 'none']) {
        await userEvent.click(page.getByRole('button', { name: `Show ${emphasis}` }));
      }
      await resetHover();
      await settle();

      await expect(document.querySelector(`${HOST} [role="region"]`) as HTMLElement).toMatchScreenshot('emphases');
    });

    it('message only, not dismissible', async function messageOnly() {
      await render(<PlaygroundExample title="" message="Copied to clipboard" dismissible={false} timeout={2000} />);
      await userEvent.click(page.getByRole('button', { name: 'Show toast' }));
      await resetHover();
      await settle();

      await expect(document.querySelector(`${HOST} [role="region"]`) as HTMLElement).toMatchScreenshot('message-only');
    });

    it('focus ring', async function focusRing() {
      await render(<PlaygroundExample timeout={0} />);
      await userEvent.click(page.getByRole('button', { name: 'Show toast' }));
      await resetHover();
      await settle();
      // F6 moves keyboard focus into the region, and Tab onto the toast.
      await userEvent.keyboard('{F6}{Tab}');
      await expect.element(page.getByRole('alertdialog')).toHaveAttribute('data-focus-visible');

      await expect(document.querySelector(HOST) as HTMLElement).toMatchScreenshot('focus-ring');
    });

    // This project runs with reduced motion, which only fades the toasts.
    it('keeps the stack still under reduced motion', async function reducedMotion() {
      await render(<PlaygroundExample timeout={0} />);
      await userEvent.click(page.getByRole('button', { name: 'Show toast' }));
      await settle();
      const first = document.querySelector(`${HOST} [role="alertdialog"]`) as HTMLElement;

      await userEvent.click(page.getByRole('button', { name: 'Show toast' }));
      await vi.waitFor(function two() {
        expect(document.querySelectorAll(`${HOST} [role="alertdialog"]`).length).toBe(2);
      });
      const top = first.getBoundingClientRect().top;
      const newest = document.querySelector(`${HOST} [role="alertdialog"]`)?.firstElementChild?.firstElementChild;
      expect(getComputedStyle(newest as HTMLElement).translate).toBe('0px');
      await settle();

      expect(first.getBoundingClientRect().top).toBe(top);
    });
  });
});
