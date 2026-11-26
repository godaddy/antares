import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { resetHover } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { PlacementsExample } from '../examples/placements.tsx';

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

    it.each([
      { name: 'placements-with-arrow', hideArrow: false },
      { name: 'placements-without-arrow', hideArrow: true }
    ])('captures $name', async function capturePlacements({ name, hideArrow }) {
      const viewport = [window.innerWidth, window.innerHeight] as const;
      await page.viewport(960, 660);

      try {
        const { getByRole, unmount } = await render(<PlacementsExample hideArrow={hideArrow} />);

        try {
          await expect.poll(() => getByRole('tooltip').all().length).toBe(12);
          await new Promise<void>((resolve) => setTimeout(resolve, 200));

          // Capture the triggers and all tooltips portaled into the body.
          await expect(document.body).toMatchScreenshot(name);
        } finally {
          await unmount();
        }
      } finally {
        await page.viewport(...viewport);
      }
    });
  });
});
