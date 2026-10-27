import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { resetHover } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  beforeEach(resetHover);

  describe('#Tooltip', function tooltipTests() {
    it('open tooltip', async function openTooltip() {
      const originalViewport = { width: window.innerWidth, height: window.innerHeight };
      await page.viewport(320, 120);

      try {
        const { getByRole, unmount } = await render(
          <DefaultExample tooltipTriggerProps={{ defaultOpen: true }} tooltipProps={{ placement: 'bottom' }} />
        );

        await vi.waitFor(async function visible() {
          await expect.element(getByRole('tooltip')).toBeVisible();
        });

        await new Promise(function settleTransition(resolve) {
          setTimeout(resolve, 200);
        });

        // The arrow extends beyond the tooltip's bounds, so capture the page to include both.
        await expect(document.body).toMatchScreenshot('open');
        await unmount();
      } finally {
        await page.viewport(originalViewport.width, originalViewport.height);
      }
    });
  });
});
