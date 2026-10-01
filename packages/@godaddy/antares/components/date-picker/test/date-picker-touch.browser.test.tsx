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

    it.skipIf(server.browser !== 'chromium').each([undefined, 'select', 'reset'] as const)(
      'dismisses a pending range with commitBehavior=%s',
      async function dismiss(commitBehavior) {
        await page.viewport(320, 768);
        const screen = await render(<MobileExample range commitBehavior={commitBehavior} selectedDate="2026-09-05" />);
        const trigger = screen.getByRole('button', { name: /Calendar Event dates/ });
        await trigger.click();
        await expect
          .poll(function settled() {
            return getComputedStyle(screen.getByRole('dialog').element().parentElement!).transform;
          })
          .toBe('none');
        const session = cdp();
        await session.send('Emulation.setTouchEmulationEnabled', { enabled: true });
        try {
          const day = screen.getByRole('button', { name: /September 15, 2026/ });
          await expect.element(day).toHaveFocus();
          const rect = day.element().getBoundingClientRect();
          const frame = window.frameElement?.getBoundingClientRect();
          // CDP targets the outer page; Vitest scales the test iframe to fit.
          const scale = frame ? frame.width / window.innerWidth : 1;
          await session.send('Input.dispatchTouchEvent', {
            type: 'touchStart',
            touchPoints: [
              {
                x: (rect.x + rect.width / 2) * scale + (frame?.left ?? 0),
                y: (rect.y + rect.height / 2) * scale + (frame?.top ?? 0)
              }
            ]
          });
          await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
          expect(document.activeElement).toBe(day.element());
          await expect.element(screen.getByRole('dialog')).toBeVisible();
          await session.send('Input.dispatchTouchEvent', {
            type: 'touchStart',
            touchPoints: [{ x: 10 * scale + (frame?.left ?? 0), y: 10 * scale + (frame?.top ?? 0) }]
          });
          await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
          await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
          if (commitBehavior === 'select') {
            await expect.element(screen.getByLabelText('Selected dates')).toHaveTextContent('2026-09-15/2026-09-15');
          } else {
            await expect.element(screen.getByLabelText('Selected dates')).toBeEmptyDOMElement();
            await expect.element(trigger).toHaveTextContent('Sep 5, 2026 - Sep 8, 2026');
            await trigger.click();
            await screen.getByRole('button', { name: /September 18, 2026/ }).click();
            await screen.getByRole('button', { name: /September 19, 2026/ }).click();
            await expect.element(screen.getByLabelText('Selected dates')).toHaveTextContent('2026-09-18/2026-09-19');
          }
        } finally {
          await session.send('Emulation.setTouchEmulationEnabled', { enabled: false });
        }
      }
    );

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
