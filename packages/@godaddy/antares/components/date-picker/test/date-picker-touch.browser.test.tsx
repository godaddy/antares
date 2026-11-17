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

    it.skipIf(server.browser !== 'chromium')(
      'keeps a tapped date focused and commits the pending range when dismissed',
      async function dismiss() {
        const session = cdp();
        await session.send('Emulation.setTouchEmulationEnabled', { enabled: true });
        try {
          await page.viewport(320, 768);
          const screen = await render(<MobileExample range />);
          const trigger = screen.getByRole('button', { name: /Calendar Event dates/ });
          await trigger.click();
          const day = screen.getByRole('button', { name: /September 15, 2026/ });
          await expect.element(day).toHaveFocus();
          const panel = day.element().closest('[data-placement="bottom"]')!;
          // CDP input bypasses the actionability checks used by locator interactions.
          await expect
            .poll(function readyToTap() {
              const { x, y, width, height } = day.element().getBoundingClientRect();
              return (
                document.elementFromPoint(x + width / 2, y + height / 2) === day.element() &&
                panel.getAnimations().length === 0
              );
            })
            .toBe(true);
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
          await expect.element(day).toHaveAttribute('data-selection-start');
          await expect.element(day).toHaveFocus();
          await expect.element(screen.getByRole('dialog')).toBeVisible();
          await session.send('Input.dispatchTouchEvent', {
            type: 'touchStart',
            touchPoints: [{ x: 10 * scale + (frame?.left ?? 0), y: 10 * scale + (frame?.top ?? 0) }]
          });
          await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
          await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
          await expect.element(screen.getByLabelText('Selected dates')).toMatchTextContent('2026-09-15/2026-09-15');
        } finally {
          await session.send('Emulation.setTouchEmulationEnabled', { enabled: false });
        }
      }
    );
  });
});
