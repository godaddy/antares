import type {} from '@vitest/browser-playwright';
import { afterEach, describe, expect, it } from 'vitest';
import { cdp, page, server } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import { MobileExample } from '../examples/mobile.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#DatePicker touch', function touchTests() {
    afterEach(async function reset() {
      await cleanup();
      await page.viewport(1024, 768);
    });

    it.skipIf(server.browser !== 'chromium').each([false, true])(
      'scrolls over date cells without committing a selection, range=%s',
      async function swipe(range) {
        await page.viewport(320, 768);
        const screen = await render(<MobileExample range={range} keepOpen defaultOpen />);
        if (range) await screen.getByRole('button', { name: /September 15, 2026/ }).click();
        await expect
          .poll(function settled() {
            return getComputedStyle(screen.getByRole('dialog').element().parentElement!).transform;
          })
          .toBe('none');
        const viewport = document.querySelector('[data-calendar-month]')!.parentElement!;
        const start = viewport.scrollTop;
        const rect = screen
          .getByRole('button', { name: /September 25, 2026/ })
          .element()
          .getBoundingClientRect();
        const session = cdp();
        await session.send('Emulation.setTouchEmulationEnabled', { enabled: true });
        try {
          await session.send('Input.synthesizeScrollGesture', {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
            yDistance: -240,
            speed: 1400,
            gestureSourceType: 'touch'
          });
          await expect
            .poll(function position() {
              return viewport.scrollTop;
            })
            .toBeGreaterThan(start + 100);
          await expect.element(screen.getByLabelText('Selected dates')).toBeEmptyDOMElement();
          if (range) {
            await screen.getByRole('button', { name: /October 12, 2026/ }).click();
            await expect.element(screen.getByLabelText('Selected dates')).toHaveTextContent('2026-09-15/2026-10-12');
          }
        } finally {
          await session.send('Emulation.setTouchEmulationEnabled', { enabled: false });
        }
      }
    );
  });
});
